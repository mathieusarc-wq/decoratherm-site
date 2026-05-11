"use client";

import { useState } from "react";
import { ArrowRight, Calculator, Check, Loader2, MapPin, Mail, Phone as PhoneIcon, User } from "lucide-react";
import { PRICING } from "@/lib/config";

type WorkType = "ite" | "isoInt" | "ravalement";
type Storey = "rdc" | "r+1" | "r+2+";
type LeadPhase = "idle" | "transitioning" | "form" | "sending" | "sent" | "error";

const STOREY_OPTIONS: { value: Storey; label: string }[] = [
  { value: "rdc", label: "Plain-pied" },
  { value: "r+1", label: "R+1" },
  { value: "r+2+", label: "R+2 ou plus" },
];

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n);
}

export default function DevisSimulator() {
  const [type, setType] = useState<WorkType | null>(null);
  const [surface, setSurface] = useState<string>("");
  const [storey, setStorey] = useState<Storey | "">("");
  const [result, setResult] = useState<{
    low: number;
    high: number;
    cee: number;
    netLow: number;
    netHigh: number;
  } | null>(null);

  // Lead form state
  const [leadPhase, setLeadPhase] = useState<LeadPhase>("idle");
  const [leadName, setLeadName] = useState("");
  const [leadPhoneVal, setLeadPhoneVal] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadCity, setLeadCity] = useState("");
  const [leadError, setLeadError] = useState<string | null>(null);

  const surfaceNum = Number(surface);
  const valid = type !== null && surfaceNum > 0 && storey !== "";

  const compute = () => {
    if (!valid) return;
    const pricing = PRICING[type!];
    const coef = PRICING.storeyCoef[storey as Storey];
    const low = Math.round(surfaceNum * pricing.base * PRICING.spread.low * coef);
    const high = Math.round(surfaceNum * pricing.base * PRICING.spread.high * coef);
    const cee = Math.round(surfaceNum * pricing.ceeRate);
    setResult({
      low,
      high,
      cee,
      netLow: Math.max(0, low - cee),
      netHigh: Math.max(0, high - cee),
    });
    setLeadPhase("idle"); // reset lead form on new computation
    // Smooth scroll to result on mobile
    requestAnimationFrame(() => {
      const el = document.getElementById("devis-result");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  };

  const startLead = () => {
    if (!result || !type || !storey) return;
    setLeadPhase("transitioning");
    setLeadError(null);
    // small loading delay for UX feedback
    setTimeout(() => {
      setLeadPhase("form");
      requestAnimationFrame(() => {
        const el = document.getElementById("lead-form");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }, 900);
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!result || !type || !storey) return;
    if (!leadName.trim() || !leadPhoneVal.trim() || !leadEmail.trim() || !leadCity.trim()) {
      setLeadError("Merci de remplir tous les champs.");
      return;
    }

    const storeyLabel = STOREY_OPTIONS.find((s) => s.value === storey)?.label ?? "";
    const typeLabel = PRICING[type].label;

    const subject = encodeURIComponent(`Demande de devis ${typeLabel} - ${leadName.trim()}`);
    const body = encodeURIComponent(
      `Nouvelle demande de devis DECORATHERM\n\n` +
      `--- Coordonnées ---\n` +
      `Nom : ${leadName.trim()}\n` +
      `Téléphone : ${leadPhoneVal.trim()}\n` +
      `Email : ${leadEmail.trim()}\n` +
      `Ville : ${leadCity.trim()}\n\n` +
      `--- Simulation ---\n` +
      `Type : ${typeLabel}\n` +
      `Surface : ${surfaceNum} m²\n` +
      `Étages : ${storeyLabel}\n` +
      `Estimation : ${fmt(result.low)} € — ${fmt(result.high)} € HT\n` +
      (result.cee > 0 ? `Aide CEE : − ${fmt(result.cee)} €\n` : ``) +
      (result.cee > 0 ? `Reste à charge : ${fmt(result.netLow)} € — ${fmt(result.netHigh)} € HT\n` : ``)
    );

    window.open(`mailto:exploitation@decoratherm.com?subject=${subject}&body=${body}`);
    setLeadPhase("sent");
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Step 1 — type of work */}
      <div>
        <p className="text-xs font-bold tracking-[2.5px] uppercase text-[var(--color-red)] mb-3">
          Étape 1 — Type de travaux
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(["ite", "isoInt", "ravalement"] as WorkType[]).map((t) => {
            const active = type === t;
            const tagLabel = t === "ite" ? "ITE" : t === "isoInt" ? "ISO INTÉRIEURE" : "RAVALEMENT";
            return (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setType(t);
                  setResult(null);
                }}
                aria-pressed={active}
                className={`text-left p-5 sm:p-6 transition-all duration-200 border-2 min-h-[88px] active:scale-[0.99] ${
                  active
                    ? "bg-[var(--color-navy)] text-white border-[var(--color-red)]"
                    : "bg-white text-[var(--color-navy)] border-[var(--color-line)] hover:border-[var(--color-navy)]"
                }`}
                style={{ transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)" }}
              >
                <p className="text-[10px] font-bold tracking-[2.5px] uppercase mb-2 text-[var(--color-red)]">
                  {tagLabel}
                </p>
                <h3 className="text-base font-extrabold tracking-[-0.3px] leading-tight">
                  {PRICING[t].label}
                </h3>
                <p className={`mt-2 text-sm ${active ? "text-white/70" : "text-[var(--color-muted)]"}`}>
                  {PRICING[t].starting}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2 — surface and storey */}
      <div>
        <p className="text-xs font-bold tracking-[2.5px] uppercase text-[var(--color-red)] mb-3">
          Étape 2 — Caractéristiques
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-6">
          <label className="block">
            <span className="block text-[11px] font-bold tracking-[2px] uppercase text-[var(--color-muted)] mb-3">
              Surface de façade
            </span>
            <div className="flex items-baseline gap-2 border-b border-[#c9ced8] pb-3 focus-within:border-[var(--color-red)] transition-colors min-h-[48px]">
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                min={0}
                step={1}
                placeholder="120"
                value={surface}
                onChange={(e) => {
                  setSurface(e.target.value);
                  setResult(null);
                }}
                aria-label="Surface de façade en mètres carrés"
                className="w-full bg-transparent text-2xl font-extrabold tracking-[-0.5px] text-[var(--color-navy)] outline-none placeholder:text-[#a8aebb]"
              />
              <span className="text-sm font-semibold text-[var(--color-muted)]" aria-hidden="true">
                m²
              </span>
            </div>
          </label>

          <label className="block">
            <span className="block text-[11px] font-bold tracking-[2px] uppercase text-[var(--color-muted)] mb-3">
              Nombre d&apos;étages
            </span>
            <select
              value={storey}
              onChange={(e) => {
                setStorey(e.target.value as Storey);
                setResult(null);
              }}
              aria-label="Nombre d'étages"
              className="w-full bg-transparent border-b border-[#c9ced8] pb-3 text-lg font-bold text-[var(--color-navy)] outline-none focus:border-[var(--color-red)] transition-colors appearance-none cursor-pointer min-h-[48px]"
            >
              <option value="">— Sélectionner</option>
              {STOREY_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <button
        type="button"
        onClick={compute}
        disabled={!valid}
        className="w-full btn btn-red justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none"
      >
        <Calculator size={16} strokeWidth={2.4} />
        Estimer mon projet
        <ArrowRight size={16} strokeWidth={2.4} />
      </button>

      {result && (
        <div
          id="devis-result"
          role="status"
          aria-live="polite"
          className="bg-[var(--color-navy)] text-white p-7 sm:p-10 lg:p-12 mt-4"
        >
          <p className="text-xs font-bold tracking-[2.5px] uppercase text-[var(--color-red)] mb-3 sm:mb-4">
            Estimation travaux
          </p>
          <h3 className="text-[clamp(28px,8vw,56px)] font-extrabold tracking-[-1px] sm:tracking-[-1.5px] leading-[1.05] sm:leading-none break-words">
            {fmt(result.low)} € — {fmt(result.high)} €
          </h3>
          <p className="mt-3 sm:mt-4 text-white/70 text-sm leading-relaxed">
            Fourchette indicative pour {surfaceNum} m² ·{" "}
            {STOREY_OPTIONS.find((s) => s.value === storey)?.label} · {PRICING[type!].label}
          </p>

          {result.cee > 0 && (
            <>
              {/* CEE — mise en avant de l'aide déductible */}
              <div className="mt-6 sm:mt-8 bg-[var(--color-red)] text-white p-5 sm:p-6 flex items-start sm:items-center gap-4 flex-col sm:flex-row">
                <div className="shrink-0">
                  <p className="text-[10px] font-bold tracking-[2.5px] uppercase text-white/80">
                    Aide CEE déductible
                  </p>
                  <p className="mt-1 text-[clamp(28px,6vw,40px)] font-extrabold tracking-[-1px] leading-none">
                    − {fmt(result.cee)} €
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed sm:border-l sm:border-white/30 sm:pl-5">
                  <strong className="font-extrabold">Certificats d&apos;Économie d&apos;Énergie</strong> — aide d&apos;État cumulable, déduite directement de votre devis. Forfait 10 €/m² appliqué sur {surfaceNum} m² éligibles, <strong className="font-extrabold">sous réserve d&apos;acceptation du dossier</strong>.
                </p>
              </div>

              {/* Net après CEE */}
              <div className="mt-5 sm:mt-6 bg-white/[0.04] border border-white/15 p-5 sm:p-6">
                <p className="text-[10px] font-bold tracking-[2.5px] uppercase text-white/60">
                  Reste à charge estimé après CEE
                </p>
                <p className="mt-2 text-[clamp(24px,6vw,40px)] font-extrabold tracking-[-0.5px] leading-tight">
                  {fmt(result.netLow)} € — {fmt(result.netHigh)} €
                </p>
              </div>
            </>
          )}

          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/15 text-xs text-white/60 leading-relaxed">
            Estimation indicative. Prix définitif après visite technique gratuite. CEE octroyés
            sous réserve d&apos;acceptation du dossier par l&apos;obligé ; montant définitif
            validé après instruction. Aides MaPrimeRénov&apos; cumulables non déduites de cette
            simulation.
          </div>

          {/* CTA — passer à la demande de devis */}
          {leadPhase === "idle" && (
            <button
              type="button"
              onClick={startLead}
              className="mt-7 sm:mt-8 w-full inline-flex items-center justify-center gap-3 bg-white text-[var(--color-navy)] py-4 sm:py-5 font-extrabold text-base sm:text-lg tracking-[-0.3px] active:scale-[0.99] hover:bg-white/95 transition-all min-h-[56px]"
              style={{ borderRadius: 2 }}
            >
              Faire ma demande de devis
              <ArrowRight size={18} strokeWidth={2.6} />
            </button>
          )}

          {leadPhase === "transitioning" && (
            <div
              className="mt-7 sm:mt-8 w-full bg-white/[0.06] border border-white/15 py-6 flex items-center justify-center gap-3 text-white"
              role="status"
              aria-live="polite"
            >
              <Loader2 size={20} className="animate-spin text-[var(--color-red)]" aria-hidden="true" />
              <span className="text-sm font-semibold tracking-wide">Préparation de votre demande...</span>
            </div>
          )}
        </div>
      )}

      {/* Lead form — affiché après le clic sur "Faire ma demande de devis" */}
      {result && (leadPhase === "form" || leadPhase === "sending" || leadPhase === "error") && (
        <div
          id="lead-form"
          className="bg-[var(--color-bg-soft)] p-7 sm:p-10 lg:p-12 mt-4 lead-fade-in"
        >
          <p className="text-xs font-bold tracking-[2.5px] uppercase text-[var(--color-red)] mb-3 sm:mb-4">
            Étape finale — Vos coordonnées
          </p>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.5px] leading-tight text-[var(--color-navy)] bar-red">
            Recevez votre devis détaillé.
          </h3>
          <p className="mt-4 sm:mt-5 text-[15px] leading-relaxed text-[var(--color-muted)] max-w-2xl">
            Nos équipes vous contactent sous 24h pour valider l&apos;estimation et planifier la visite technique gratuite. Votre simulation est jointe automatiquement à la demande.
          </p>

          {/* Recap simulation read-only */}
          <div className="mt-7 sm:mt-8 bg-white p-5 sm:p-6 border-l-2 border-[var(--color-red)]">
            <p className="text-[10px] font-bold tracking-[2.5px] uppercase text-[var(--color-muted)] mb-3">
              Récapitulatif simulation
            </p>
            <ul className="space-y-1.5 text-sm text-[var(--color-navy)]">
              <li>
                <span className="text-[var(--color-muted)] font-semibold">Type :</span>{" "}
                <strong className="font-extrabold">{PRICING[type!].label}</strong>
              </li>
              <li>
                <span className="text-[var(--color-muted)] font-semibold">Surface :</span>{" "}
                <strong className="font-extrabold">{surfaceNum} m²</strong> ·{" "}
                {STOREY_OPTIONS.find((s) => s.value === storey)?.label}
              </li>
              <li>
                <span className="text-[var(--color-muted)] font-semibold">Estimation :</span>{" "}
                <strong className="font-extrabold">
                  {fmt(result.low)} € — {fmt(result.high)} €
                </strong>
              </li>
              {result.cee > 0 && (
                <li>
                  <span className="text-[var(--color-muted)] font-semibold">Aide CEE déduite :</span>{" "}
                  <strong className="font-extrabold text-[var(--color-red)]">− {fmt(result.cee)} €</strong>
                </li>
              )}
            </ul>
          </div>

          {/* Form */}
          <form onSubmit={submitLead} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2" noValidate>
            <label className="block">
              <span className="block text-[11px] font-bold tracking-[2px] uppercase text-[var(--color-muted)] mt-6 mb-1">
                <User size={12} strokeWidth={2.5} className="inline mr-1.5 -mt-0.5" aria-hidden="true" />
                Nom complet
              </span>
              <input
                type="text"
                required
                autoComplete="name"
                autoCapitalize="words"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                disabled={leadPhase === "sending"}
                className="input-underline disabled:opacity-50"
                placeholder="Votre nom"
              />
            </label>

            <label className="block">
              <span className="block text-[11px] font-bold tracking-[2px] uppercase text-[var(--color-muted)] mt-6 mb-1">
                <PhoneIcon size={12} strokeWidth={2.5} className="inline mr-1.5 -mt-0.5" aria-hidden="true" />
                Téléphone
              </span>
              <input
                type="tel"
                inputMode="tel"
                pattern="[0-9+\-\s().]{8,20}"
                required
                autoComplete="tel"
                value={leadPhoneVal}
                onChange={(e) => setLeadPhoneVal(e.target.value)}
                disabled={leadPhase === "sending"}
                className="input-underline disabled:opacity-50"
                placeholder="06 ..."
              />
            </label>

            <label className="block">
              <span className="block text-[11px] font-bold tracking-[2px] uppercase text-[var(--color-muted)] mt-6 mb-1">
                <Mail size={12} strokeWidth={2.5} className="inline mr-1.5 -mt-0.5" aria-hidden="true" />
                Email
              </span>
              <input
                type="email"
                inputMode="email"
                required
                autoComplete="email"
                autoCapitalize="off"
                spellCheck={false}
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                disabled={leadPhase === "sending"}
                className="input-underline disabled:opacity-50"
                placeholder="vous@email.fr"
              />
            </label>

            <label className="block">
              <span className="block text-[11px] font-bold tracking-[2px] uppercase text-[var(--color-muted)] mt-6 mb-1">
                <MapPin size={12} strokeWidth={2.5} className="inline mr-1.5 -mt-0.5" aria-hidden="true" />
                Ville
              </span>
              <input
                type="text"
                required
                autoComplete="address-level2"
                value={leadCity}
                onChange={(e) => setLeadCity(e.target.value)}
                disabled={leadPhase === "sending"}
                className="input-underline disabled:opacity-50"
                placeholder="La Rochelle"
              />
            </label>

            {leadError && (
              <p className="sm:col-span-2 text-sm text-[var(--color-red)] mt-4" role="alert">
                {leadError}
              </p>
            )}

            <div className="sm:col-span-2 mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
              <button
                type="submit"
                disabled={leadPhase === "sending"}
                className="btn btn-red flex-1 sm:flex-initial sm:px-8 disabled:opacity-50 disabled:cursor-wait"
              >
                {leadPhase === "sending" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer ma demande
                    <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
                  </>
                )}
              </button>
              <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                Vos données restent confidentielles. Nous vous recontactons sous 24h ouvrées.
              </p>
            </div>
          </form>
        </div>
      )}

      {/* Lead form — état envoyé */}
      {result && leadPhase === "sent" && (
        <div
          id="lead-form"
          className="bg-[var(--color-bg-soft)] p-7 sm:p-10 lg:p-12 mt-4 lead-fade-in"
          role="status"
          aria-live="polite"
        >
          <div className="grid place-items-center w-16 h-16 rounded-full bg-[var(--color-red)] text-white">
            <Check size={28} strokeWidth={3} aria-hidden="true" />
          </div>
          <h3 className="mt-7 sm:mt-8 text-2xl sm:text-3xl font-extrabold tracking-[-0.5px] text-[var(--color-navy)]">
            Demande envoyée.
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-muted)] max-w-md">
            Nos équipes vous recontactent sous 24h ouvrées pour valider votre estimation et planifier la visite technique gratuite.
          </p>
          <p className="mt-6 text-xs text-[var(--color-muted)]">
            En attendant, vous pouvez nous joindre directement au{" "}
            <a href="tel:+33628913001" className="font-extrabold text-[var(--color-navy)] hover:text-[var(--color-red)]">
              06 28 91 30 01
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
