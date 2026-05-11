import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const TO = "exploitation@decoratherm.com";
const FROM = process.env.RESEND_FROM ?? "DECORATHERM <onboarding@resend.dev>";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
const buckets = new Map<string, { count: number; resetAt: number }>();

function clientKey(req: Request) {
  const fwd = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return fwd || req.headers.get("x-real-ip") || "unknown";
}

function rateLimited(key: string) {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  if (bucket.count > RATE_LIMIT_MAX) return true;
  return false;
}

export async function POST(req: Request) {
  const key = clientKey(req);
  if (rateLimited(key)) {
    return NextResponse.json(
      { error: "Trop de demandes. Réessayez dans une minute." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  try {
    const data = await req.json();
    const name = String(data?.name ?? "").trim();
    const phone = String(data?.phone ?? "").trim();
    const project = String(data?.project ?? "").trim();
    const email = String(data?.email ?? "").trim();
    const city = String(data?.city ?? "").trim();
    const simulation = (data?.simulation && typeof data.simulation === "object")
      ? (data.simulation as Record<string, unknown>)
      : null;

    if (!name || !phone || !project) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    if (name.length > 200 || phone.length > 50 || project.length > 5000 || email.length > 200 || city.length > 200) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    if (!/^[0-9+\-\s().]{8,20}$/.test(phone)) {
      return NextResponse.json({ error: "Numéro de téléphone invalide" }, { status: 400 });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    if (!resend) {
      console.warn("[contact] RESEND_API_KEY missing — request received in dev mode");
      return NextResponse.json({ ok: true, dev: true });
    }

    // Construit la section simulation si présente.
    const simBlock = simulation
      ? `
        <h3 style="margin:24px 0 12px;color:#1a2f4f;font-size:16px;border-top:1px solid #e5e7ec;padding-top:18px">Contexte simulation devis</h3>
        <table style="border-collapse:collapse;width:100%;font-size:14px">
          ${Object.entries({
            "Type de travaux": simulation.typeLabel,
            Surface: simulation.surface ? `${simulation.surface} m²` : null,
            Étages: simulation.storeyLabel,
            "Estimation travaux": simulation.priceRange,
            "Aide CEE estimée": simulation.cee ? `− ${simulation.cee} €` : null,
            "Reste à charge estimé": simulation.netRange,
          })
            .filter(([, v]) => v != null && String(v).trim() !== "")
            .map(
              ([k, v]) =>
                `<tr><td style="padding:6px 12px 6px 0;color:#5b6678;width:40%">${escapeHtml(k)}</td><td style="padding:6px 0;font-weight:700;color:#1a2f4f">${escapeHtml(String(v))}</td></tr>`,
            )
            .join("")}
        </table>
      `
      : "";

    const isLead = !!simulation;
    const subject = isLead
      ? `🔥 Nouveau lead devis — ${name}${city ? ` (${city})` : ""}`
      : `Nouvelle demande — ${name}`;

    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email || undefined,
      subject,
      text: [
        `Nom : ${name}`,
        `Téléphone : ${phone}`,
        email ? `Email : ${email}` : "",
        city ? `Ville : ${city}` : "",
        "",
        `Message :`,
        project,
        simulation
          ? `\n--- Simulation ---\n${Object.entries({
              Type: simulation.typeLabel,
              Surface: simulation.surface ? `${simulation.surface} m²` : "",
              Étages: simulation.storeyLabel,
              Estimation: simulation.priceRange,
              CEE: simulation.cee ? `${simulation.cee} €` : "",
              "Reste à charge": simulation.netRange,
            })
              .filter(([, v]) => v)
              .map(([k, v]) => `${k} : ${v}`)
              .join("\n")}`
          : "",
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <div style="font-family:system-ui,sans-serif;color:#1a2f4f;max-width:600px;">
          <h2 style="margin:0 0 16px;color:#1a2f4f">${isLead ? "Nouveau lead devis" : "Nouvelle demande de contact"}</h2>
          <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
          <p><strong>Téléphone :</strong> <a href="tel:${escapeHtml(phone.replace(/\s/g, ""))}" style="color:#c8102e">${escapeHtml(phone)}</a></p>
          ${email ? `<p><strong>Email :</strong> <a href="mailto:${escapeHtml(email)}" style="color:#c8102e">${escapeHtml(email)}</a></p>` : ""}
          ${city ? `<p><strong>Ville :</strong> ${escapeHtml(city)}</p>` : ""}
          <p><strong>Message :</strong></p>
          <p style="white-space:pre-wrap;border-left:3px solid #c8102e;padding-left:12px;color:#5b6678">${escapeHtml(project)}</p>
          ${simBlock}
        </div>
      `,
    });

    if (error) {
      console.error("[contact] resend error");
      return NextResponse.json({ error: "Envoi impossible" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    console.error("[contact] route error");
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
