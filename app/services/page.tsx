import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Services — ITE et ravalement de façade",
  description:
    "Détails des prestations DECORATHERM : isolation thermique extérieure (PSE, laine de roche, bardage ventilé) et ravalement de façade (enduit projeté, gratté, taloché, ribbé).",
};

const SERVICES = [
  {
    id: "ite",
    num: "01",
    tag: "ITE",
    title: "Isolation thermique extérieure",
    description:
      "Solution complète pour supprimer les ponts thermiques, améliorer le confort d'été comme d'hiver, et embellir la façade en une seule opération. Travaux compatibles avec les aides MaPrimeRénov' et CEE.",
    benefits: [
      "PSE (polystyrène expansé) — performant, léger, économique",
      "Laine de roche — incombustible, hautes performances acoustiques",
      "Bardage ventilé — finition contemporaine, durabilité maximale",
      "Suppression des ponts thermiques périphériques",
      "Compatible MaPrimeRénov' et certificats CEE",
      "Visite technique et calcul thermique avant chantier",
    ],
  },
  {
    id: "isolation-interieure",
    num: "02",
    tag: "ISOLATION INTÉRIEURE",
    title: "Isolation intérieure",
    description:
      "Traitement des déperditions par l'intérieur : combles perdus, rampants de toiture et murs intérieurs. Solution idéale lorsque l'ITE n'est pas réalisable (façade classée, contraintes techniques, copropriété).",
    benefits: [
      "Combles perdus — soufflage de laine minérale (R≥7)",
      "Rampants de toiture — pose de laine en panneaux ou rouleaux",
      "Murs intérieurs — doublage thermique avec frein-vapeur",
      "Compatible MaPrimeRénov' Sérénité et CEE",
      "Réduction immédiate de la facture énergétique",
      "Mise en œuvre rapide, sans gêne pour la façade",
    ],
  },
  {
    id: "ravalement",
    num: "03",
    tag: "RAVALEMENT",
    title: "Ravalement de façade",
    description:
      "Restauration et protection durable de la façade. Diagnostic des supports, traitement des pathologies, finition au choix selon l'esthétique souhaitée et la nature du bâti.",
    benefits: [
      "Enduit projeté, gratté, taloché ou ribbé",
      "Traitement anti-mousse et hydrofuge",
      "Imperméabilisation des supports poreux",
      "Réparation des fissures et reprises ponctuelles",
      "Durabilité 15 à 20 ans selon exposition",
      "Préparation soignée du support — ponçage, lavage, fixation",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-white pt-hero pb-10 sm:pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <ScrollReveal>
            <p className="eyebrow mb-5">Nos prestations</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="h-hero max-w-4xl">Services.</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-5 sm:mt-6 max-w-2xl text-base lg:text-lg leading-relaxed text-[var(--color-muted)]">
              Deux savoir-faire complémentaires, exécutés avec la même rigueur. Visite technique
              gratuite, devis détaillé et suivi de chantier dédié.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white pb-8 sm:pb-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          {SERVICES.map((s, idx) => (
            <ScrollReveal key={s.id} delay={idx * 0.1}>
              <div
                id={s.id}
                className={`scroll-mt-24 sm:scroll-mt-32 grid grid-cols-12 gap-y-6 gap-x-6 lg:gap-12 py-12 sm:py-16 lg:py-24 ${
                  idx > 0 ? "border-t border-[var(--color-line)]" : ""
                }`}
              >
                <div className="col-span-12 lg:col-span-2">
                  <span className="block text-[clamp(56px,18vw,128px)] font-extrabold leading-[0.85] text-[var(--color-line)] tracking-[-2px] sm:tracking-[-3px]">
                    {s.num}
                  </span>
                </div>

                <div className="col-span-12 lg:col-span-6">
                  <span className="eyebrow">{s.tag}</span>
                  <h2 className="mt-3 text-[clamp(24px,6vw,42px)] font-extrabold tracking-[-0.6px] sm:tracking-[-1px] leading-[1.08] text-[var(--color-navy)]">
                    {s.title}
                  </h2>
                  <p className="mt-4 sm:mt-6 text-[15px] lg:text-base leading-relaxed text-[var(--color-muted)] max-w-xl">
                    {s.description}
                  </p>
                </div>

                <div className="col-span-12 lg:col-span-4">
                  <ul className="border-l-2 border-[var(--color-red)] pl-5 sm:pl-6 space-y-3.5 sm:space-y-4">
                    {s.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 text-[14px] leading-relaxed text-[var(--color-navy)]"
                      >
                        <Check
                          size={16}
                          strokeWidth={3}
                          className="mt-1 shrink-0 text-[var(--color-red)]"
                          aria-hidden="true"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-navy)] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
          <ScrollReveal>
            <div>
              <p className="text-xs font-bold tracking-[2.5px] uppercase text-[var(--color-red)] mb-3">
                Démarrer un projet
              </p>
              <h2 className="text-[clamp(26px,6.5vw,44px)] font-extrabold tracking-[-0.5px] leading-[1.1] text-white">
                Un projet en tête ?
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <Link href="/devis" className="btn btn-red btn-block-mobile">
              Simuler mon devis <ArrowRight size={16} strokeWidth={2.4} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
