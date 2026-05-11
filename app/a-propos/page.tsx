import type { Metadata } from "next";
import { Award, ShieldCheck, FileCheck, MapPin } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { LEGAL } from "@/lib/config";

export const metadata: Metadata = {
  title: "À propos — installateur ITE et ravalement, Qualibat RGE",
  description:
    "DECORATHERM, installateur spécialiste de la réhabilitation de façade. Certifié Qualibat RGE, intervention France entière auprès des donneurs d'ordre, maîtres d'œuvre et entreprises générales. Siège : 21 Chemin du Prieuré, 17000 La Rochelle.",
};

const CERTS = [
  { icon: Award, title: "Qualibat RGE", desc: "Certification reconnue garante de l'environnement" },
  { icon: ShieldCheck, title: "Décennale", desc: "Couverture responsabilité civile décennale" },
  { icon: FileCheck, title: "RC Pro", desc: "Responsabilité civile professionnelle" },
  { icon: MapPin, title: "France entière", desc: "Intervention sur l'ensemble du territoire" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-white pt-hero pb-10 sm:pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <ScrollReveal>
            <p className="eyebrow mb-5">L&apos;entreprise</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="h-hero max-w-4xl">À propos.</h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <ScrollReveal>
              <div className="bg-[var(--color-bg-soft)] p-7 sm:p-10 lg:p-14 h-full">
                <p className="eyebrow mb-4 sm:mb-5">Notre métier</p>
                <h2 className="text-[clamp(22px,5.6vw,38px)] font-extrabold tracking-[-0.5px] leading-[1.12] text-[var(--color-navy)] bar-red">
                  Installateur spécialisé en réhabilitation de façade.
                </h2>
                <p className="mt-5 sm:mt-6 text-[15px] leading-relaxed text-[var(--color-muted)]">
                  DECORATHERM intervient pour les donneurs d&apos;ordre, maîtres d&apos;œuvre et
                  entreprises générales sur les marchés publics et privés. Notre cœur de métier :
                  l&apos;isolation thermique extérieure (ITE), l&apos;isolation intérieure et le
                  ravalement de façade.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-muted)]">
                  Nous mettons à disposition une équipe d&apos;installateurs formés et un encadrement
                  rigoureux pour piloter chaque chantier. Notre engagement : exécution technique
                  irréprochable — préparation, mise en œuvre, finitions.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="bg-[var(--color-navy)] p-7 sm:p-10 lg:p-14 h-full text-white">
                <p className="text-xs font-bold tracking-[2.5px] uppercase text-[var(--color-red)] mb-4 sm:mb-5">
                  Notre engagement
                </p>
                <h2 className="text-[clamp(22px,5.6vw,38px)] font-extrabold tracking-[-0.5px] leading-[1.12] text-white">
                  Une équipe formée, un suivi rigoureux, des chantiers livrés.
                </h2>
                <ul className="mt-7 sm:mt-8 space-y-4 text-[15px] leading-relaxed text-white/85">
                  <li className="border-l-2 border-[var(--color-red)] pl-4 sm:pl-5">
                    Des compagnons formés en interne, équipés et encadrés sur chaque chantier.
                  </li>
                  <li className="border-l-2 border-[var(--color-red)] pl-4 sm:pl-5">
                    Un chef de chantier dédié : un seul interlocuteur du démarrage à la réception.
                  </li>
                  <li className="border-l-2 border-[var(--color-red)] pl-4 sm:pl-5">
                    Respect des délais, propreté des ouvrages, finition soignée jusqu&apos;à la
                    livraison.
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg-soft)] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <ScrollReveal>
            <p className="eyebrow mb-3 sm:mb-4">Garanties</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="h-section bar-red max-w-3xl">
              Certifications & couvertures.
            </h2>
          </ScrollReveal>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {CERTS.map((c, i) => (
              <ScrollReveal key={c.title} delay={i * 0.08}>
                <div
                  className="group bg-white p-6 sm:p-8 h-full border-t-2 border-transparent transition-all duration-300 hover:border-[var(--color-red)] hover:shadow-[0_24px_60px_-30px_rgba(26,47,79,0.25)] hover:-translate-y-1"
                  style={{ transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)" }}
                >
                  <c.icon
                    size={28}
                    strokeWidth={1.6}
                    className="text-[var(--color-navy)] group-hover:text-[var(--color-red)] transition-colors"
                    aria-hidden="true"
                  />
                  <h3 className="mt-5 sm:mt-6 text-base font-extrabold tracking-[-0.3px] text-[var(--color-navy)]">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-muted)]">
                    {c.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24 border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <ScrollReveal>
            <p className="eyebrow mb-3 sm:mb-4">Informations légales</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="h-section bar-red max-w-3xl">Société DECORATHERM.</h2>
          </ScrollReveal>

          <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
            <ScrollReveal delay={0.15} className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 sm:gap-x-10 gap-y-7 sm:gap-y-8">
                <div>
                  <p className="text-[10px] font-bold tracking-[2.5px] uppercase text-[var(--color-muted)]">
                    Raison sociale
                  </p>
                  <p className="mt-2 text-base font-extrabold tracking-[-0.3px] text-[var(--color-navy)]">
                    {LEGAL.raisonSociale}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[2.5px] uppercase text-[var(--color-muted)]">
                    Forme juridique
                  </p>
                  <p className="mt-2 text-base font-extrabold tracking-[-0.3px] text-[var(--color-navy)]">
                    {LEGAL.formeJuridique} — capital de {LEGAL.capital}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[2.5px] uppercase text-[var(--color-muted)]">
                    SIREN
                  </p>
                  <p className="mt-2 text-base font-extrabold tracking-[-0.3px] text-[var(--color-navy)] tabular-nums">
                    {LEGAL.siren}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[2.5px] uppercase text-[var(--color-muted)]">
                    SIRET (siège)
                  </p>
                  <p className="mt-2 text-base font-extrabold tracking-[-0.3px] text-[var(--color-navy)] tabular-nums break-all">
                    {LEGAL.siret}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[2.5px] uppercase text-[var(--color-muted)]">
                    Code APE
                  </p>
                  <p className="mt-2 text-base font-extrabold tracking-[-0.3px] text-[var(--color-navy)]">
                    {LEGAL.apeCode}
                    <span className="block text-xs font-medium text-[var(--color-muted)] mt-1">
                      {LEGAL.apeLibelle}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[2.5px] uppercase text-[var(--color-muted)]">
                    Qualification RGE
                  </p>
                  <p className="mt-2 text-base font-extrabold tracking-[-0.3px] text-[var(--color-navy)] tabular-nums">
                    {LEGAL.rgeId}
                  </p>
                </div>

                <div className="sm:col-span-2 pt-5 sm:pt-6 border-t border-[var(--color-line)]">
                  <p className="text-[10px] font-bold tracking-[2.5px] uppercase text-[var(--color-muted)]">
                    Siège social
                  </p>
                  <address className="mt-2 not-italic text-base font-extrabold tracking-[-0.3px] text-[var(--color-navy)] leading-relaxed">
                    {LEGAL.adresse.rue}
                    <br />
                    {LEGAL.adresse.complement} · {LEGAL.adresse.cp} {LEGAL.adresse.ville}
                    <br />
                    {LEGAL.adresse.pays}
                  </address>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25} className="lg:col-span-5">
              <div className="bg-[var(--color-navy)] text-white p-8 sm:p-10 lg:p-12 h-full">
                <p className="text-xs font-bold tracking-[2.5px] uppercase text-[var(--color-red)] mb-5 sm:mb-6">
                  Direction
                </p>
                <ul className="space-y-5 sm:space-y-6">
                  {LEGAL.dirigeants.map((d) => (
                    <li key={d.nom} className="border-l-2 border-[var(--color-red)] pl-4 sm:pl-5">
                      <p className="text-lg font-extrabold tracking-[-0.3px]">{d.nom}</p>
                      <p className="text-sm text-white/70 mt-1">{d.fonction}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-white/15 text-xs text-white/60 leading-relaxed">
                  Données issues du registre INSEE / Sirene. Mise à jour automatique des
                  informations légales.
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
