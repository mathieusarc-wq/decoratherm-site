import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Logo from "@/components/Logo";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Espace donneur d'ordre — accès réservé",
  description:
    "Espace réservé aux donneurs d'ordre DECORATHERM : accès aux documents de chantier, suivi d'opérations, attestations.",
  robots: { index: false, follow: false },
};

export default function EspaceDOPage() {
  return (
    <section className="min-h-dvh bg-[var(--color-bg-soft)] flex flex-col pt-safe pb-safe">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12">
        {/* Left — brand panel (desktop) */}
        <aside className="hidden lg:flex lg:col-span-5 bg-[var(--color-navy)] text-white p-12 xl:p-16 flex-col justify-between relative overflow-hidden">
          <div
            className="absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full bg-[var(--color-red)] opacity-[0.08] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute top-1/4 -left-20 w-[280px] h-[280px] rounded-full bg-white opacity-[0.04] pointer-events-none"
            aria-hidden="true"
          />

          <Link href="/" className="relative z-10 inline-block">
            <Logo variant="light" className="h-14 w-auto" />
          </Link>

          <div className="relative z-10">
            <p className="text-xs font-bold tracking-[3px] uppercase text-[var(--color-red)] mb-5">
              Espace donneur d&apos;ordre
            </p>
            <h1 className="text-[clamp(34px,3.6vw,52px)] font-extrabold tracking-[-1px] leading-[1.05]">
              Pilotez vos chantiers DECORATHERM en un seul endroit.
            </h1>
            <ul className="mt-10 space-y-4 text-[15px] text-white/85">
              <li className="flex items-start gap-3 border-l-2 border-[var(--color-red)] pl-5">
                Suivi d&apos;avancement temps réel
              </li>
              <li className="flex items-start gap-3 border-l-2 border-[var(--color-red)] pl-5">
                Documents de chantier (PV, attestations, photos)
              </li>
              <li className="flex items-start gap-3 border-l-2 border-[var(--color-red)] pl-5">
                Facturation et planning consolidés
              </li>
            </ul>
          </div>

          <div className="relative z-10 flex items-center gap-3 text-xs text-white/60">
            <ShieldCheck size={14} strokeWidth={2} className="text-[var(--color-red)]" aria-hidden="true" />
            Accès chiffré · Données hébergées en France
          </div>
        </aside>

        {/* Mobile compact brand banner */}
        <div className="lg:hidden bg-[var(--color-navy)] text-white px-5 sm:px-6 pt-6 pb-7 relative overflow-hidden">
          <div
            className="absolute -bottom-24 -right-24 w-[260px] h-[260px] rounded-full bg-[var(--color-red)] opacity-[0.10] pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative z-10 flex items-center justify-between gap-4">
            <Link href="/" aria-label="Retour à l'accueil DECORATHERM">
              <Logo variant="light" className="h-10 w-auto" />
            </Link>
            <Link
              href="/"
              className="text-[10px] font-bold tracking-[2px] uppercase text-white/70 hover:text-white min-h-[44px] inline-flex items-center"
            >
              ← Retour
            </Link>
          </div>
          <p className="relative z-10 mt-5 text-[10px] font-bold tracking-[2.5px] uppercase text-[var(--color-red)]">
            Espace donneur d&apos;ordre
          </p>
          <h1 className="relative z-10 mt-2 text-[clamp(22px,6.5vw,32px)] font-extrabold tracking-[-0.5px] leading-[1.15]">
            Pilotez vos chantiers en un seul endroit.
          </h1>
        </div>

        {/* Right — login form */}
        <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-8 lg:p-16">
          <div className="w-full max-w-md">
            <p className="eyebrow mb-3 sm:mb-4">Connexion sécurisée</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.5px] leading-tight text-[var(--color-navy)] bar-red">
              Accès donneur d&apos;ordre.
            </h2>
            <p className="mt-4 sm:mt-5 text-[15px] leading-relaxed text-[var(--color-muted)]">
              Cet espace est en cours de déploiement. Pour obtenir vos identifiants ou un accès
              temporaire, contactez l&apos;exploitation.
            </p>

            <form
              className="mt-8 sm:mt-10 space-y-2"
              action="#"
              method="post"
              aria-label="Connexion espace donneur d'ordre"
              noValidate
            >
              <div>
                <label
                  htmlFor="edo-email"
                  className="block text-[11px] font-bold tracking-[2px] uppercase text-[var(--color-muted)] mt-6"
                >
                  Email professionnel
                </label>
                <input
                  id="edo-email"
                  type="email"
                  inputMode="email"
                  placeholder="vous@entreprise.fr"
                  autoComplete="email"
                  autoCapitalize="off"
                  spellCheck={false}
                  disabled
                  className="input-underline disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label
                  htmlFor="edo-password"
                  className="block text-[11px] font-bold tracking-[2px] uppercase text-[var(--color-muted)] mt-6"
                >
                  Mot de passe
                </label>
                <input
                  id="edo-password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled
                  className="input-underline disabled:cursor-not-allowed"
                />
              </div>

              <div className="mt-7 sm:mt-8 flex items-center justify-between gap-4">
                <button
                  type="button"
                  disabled
                  className="btn btn-red flex-1 justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-disabled
                >
                  Se connecter
                  <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
                </button>
              </div>
            </form>

            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[var(--color-line)]">
              <p className="text-xs font-bold tracking-[2.5px] uppercase text-[var(--color-red)] mb-3">
                Demander un accès
              </p>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                Contactez-nous par téléphone ou email — nous activerons votre compte sous 24h
                ouvrées.
              </p>
              <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm">
                <a
                  href={`tel:${SITE.phoneTel}`}
                  aria-label={`Appeler DECORATHERM au ${SITE.phone}`}
                  className="font-extrabold text-[var(--color-navy)] hover:text-[var(--color-red)] transition-colors min-h-[44px] inline-flex items-center"
                >
                  {SITE.phone}
                </a>
                <a
                  href={`mailto:${SITE.email}?subject=Acc%C3%A8s%20Espace%20DO`}
                  className="text-[var(--color-navy)] hover:text-[var(--color-red)] transition-colors break-all min-h-[44px] inline-flex items-center"
                >
                  {SITE.email}
                </a>
              </div>
            </div>

            <Link
              href="/"
              className="hidden lg:inline-flex mt-12 items-center gap-2 text-xs font-bold tracking-[2px] uppercase text-[var(--color-muted)] hover:text-[var(--color-navy)] transition-colors min-h-[44px]"
            >
              ← Retour au site
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
