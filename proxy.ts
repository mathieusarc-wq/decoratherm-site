import { NextResponse, type NextRequest } from "next/server";

// Hôtes autorisés à servir le site en production.
// Toute autre origine déclenchera la page de maintenance (anti-cloning).
const ALLOWED_HOSTS = new Set<string>([
  "decoratherm.com",
  "www.decoratherm.com",
  "decoratherm.vercel.app",
]);

// Page HTML de maintenance servie inline (pas de dépendance au layout / Header / Footer).
const MAINTENANCE_HTML = `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex,nofollow" />
  <title>Site temporairement indisponible</title>
  <style>
    *,*::before,*::after{box-sizing:border-box}
    html,body{margin:0;padding:0;height:100%}
    body{font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#0e1a2c;color:#fff;min-height:100vh;display:grid;place-items:center;padding:24px;-webkit-font-smoothing:antialiased}
    .box{max-width:520px;width:100%;text-align:center}
    .eyebrow{font-size:11px;font-weight:700;letter-spacing:3px;color:#c8102e;text-transform:uppercase;margin:0 0 18px}
    h1{font-size:clamp(28px,5vw,40px);font-weight:800;letter-spacing:-0.5px;line-height:1.1;margin:0 0 16px}
    p{color:rgba(255,255,255,0.72);line-height:1.6;margin:0 0 12px;font-size:15px}
    .bar{display:inline-block;width:48px;height:2px;background:#c8102e;margin:24px 0}
    .small{margin-top:32px;font-size:12px;color:rgba(255,255,255,0.45);letter-spacing:0.3px}
  </style>
</head>
<body>
  <main class="box" role="main">
    <p class="eyebrow">Maintenance</p>
    <h1>Site temporairement indisponible.</h1>
    <p>Nous serons de retour très prochainement.</p>
    <span class="bar" aria-hidden="true"></span>
    <p class="small">Pour toute question, contactez votre interlocuteur habituel.</p>
  </main>
</body>
</html>`;

function maintenanceResponse() {
  return new NextResponse(MAINTENANCE_HTML, {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, must-revalidate",
      "Retry-After": "3600",
    },
  });
}

export function proxy(request: NextRequest) {
  // Bypass en dev local + sur les requêtes système Next (chunks, images, etc.).
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  const host = (request.headers.get("host") || "").split(":")[0].toLowerCase();

  // Localhost / vercel.app preview deployments (toutes celles qui commencent par le slug "decoratherm-")
  const isLocal = host === "localhost" || host.endsWith(".local");
  const isVercelPreview = host.startsWith("decoratherm-") && host.endsWith(".vercel.app");
  const isAllowedHost = ALLOWED_HOSTS.has(host) || isLocal || isVercelPreview;

  // Anti-cloning : domaine inconnu → maintenance.
  if (!isAllowedHost) {
    return maintenanceResponse();
  }

  // Kill-switch maître via variable d'environnement Vercel.
  // Pour activer la maintenance : `vercel env add SITE_ACTIVE production` puis valeur "false".
  if (process.env.SITE_ACTIVE === "false") {
    return maintenanceResponse();
  }

  return NextResponse.next();
}

export const config = {
  // Exclut les assets statiques pour éviter d'intercepter chunks JS/CSS/images.
  matcher: "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|chantiers/).*)",
};
