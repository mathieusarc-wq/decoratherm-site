import Link from "next/link";
import { ArrowRight, ChevronRight, Phone, ShieldCheck } from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { SITE, STATS } from "@/lib/config";

const HERO = {
  before: "/hero_before.jpg",
  after: "/hero_after.jpg",
  caption: "Marché public · Rénovation lotissement maison · ITE + bardage · Secteur Bretagne",
};

export default function Home() {
  return (
    <>
      <section className="bg-white pt-hero pb-12 sm:pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <ScrollReveal>
            <p className="eyebrow mb-5">DECORATHERM · Qualibat RGE</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="h-hero max-w-5xl">{SITE.tagline}</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-base lg:text-lg leading-relaxed text-[var(--color-muted)]">
              Installateur spécialisé en isolation thermique extérieure et ravalement de façade.
              Nous intervenons en France entière pour les donneurs d&apos;ordre, maîtres d&apos;œuvre
              et entreprises générales, sur marchés publics et privés.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/devis"
                className="btn btn-red btn-block-mobile"
              >
                Demander un devis <ArrowRight size={16} strokeWidth={2.4} />
              </Link>
              <Link
                href="/realisations"
                className="btn btn-outline-navy btn-block-mobile"
              >
                Nos réalisations <ChevronRight size={16} strokeWidth={2.4} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-[var(--color-bg-soft)] pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <ScrollReveal>
            <div className="-mt-8 sm:-mt-12 lg:-mt-16">
              <BeforeAfterSlider
                beforeSrc={HERO.before}
                afterSrc={HERO.after}
                priority
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3 sm:gap-4">
              <p className="text-sm leading-relaxed text-[var(--color-navy)] font-semibold">
                {HERO.caption}
              </p>
              <Link
                href="/realisations"
                className="inline-flex items-center text-xs font-bold tracking-[2px] uppercase text-[var(--color-red)] hover:underline underline-offset-4 min-h-[44px]"
              >
                Voir toutes les réalisations →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20 border-y border-[var(--color-line)]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 sm:gap-8 lg:gap-4">
            {STATS.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.1}>
                <div className="flex flex-col">
                  <span className="text-[clamp(36px,9vw,68px)] font-extrabold tracking-[-1.5px] leading-none text-[var(--color-navy)]">
                    {s.textOverride ? s.textOverride : <AnimatedCounter to={s.value} suffix={s.suffix} />}
                  </span>
                  <span className="mt-3 h-px w-8 bg-[var(--color-red)]" />
                  <span className="mt-3 text-[11px] font-bold tracking-[2px] uppercase text-[var(--color-muted)] leading-snug">
                    {s.label}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <ScrollReveal>
            <p className="eyebrow mb-3 sm:mb-4">Nos savoir-faire</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="h-section bar-red max-w-3xl">
              Trois métiers, une exigence : la qualité d&apos;exécution.
            </h2>
          </ScrollReveal>
          <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                num: "01",
                tag: "ITE",
                title: "Isolation thermique extérieure",
                desc: "PSE, laine de roche, bardage ventilé. Suppression des ponts thermiques, finition enduit ou bardage. Compatible MaPrimeRénov' et CEE.",
                href: "/services#ite",
              },
              {
                num: "02",
                tag: "Iso. intérieure",
                title: "Isolation intérieure",
                desc: "Combles perdus, rampants de toiture, murs intérieurs. Solution idéale quand l'ITE n'est pas réalisable. Compatible MaPrimeRénov' Sérénité et CEE.",
                href: "/services#isolation-interieure",
              },
              {
                num: "03",
                tag: "Ravalement",
                title: "Ravalement de façade",
                desc: "Enduit projeté, gratté, taloché ou ribbé. Traitement anti-mousse, imperméabilisation, durabilité 15-20 ans.",
                href: "/services#ravalement",
              },
            ].map((svc, i) => (
              <ScrollReveal key={svc.num} delay={i * 0.15}>
                <Link
                  href={svc.href}
                  className="group block p-7 sm:p-10 lg:p-12 bg-[var(--color-bg-soft)] border-t-2 border-transparent transition-all duration-300 hover:border-[var(--color-red)] hover:bg-white hover:shadow-[0_24px_60px_-30px_rgba(26,47,79,0.25)] hover:-translate-y-1 active:scale-[0.99] h-full min-h-[44px]"
                  style={{ transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)" }}
                >
                  <div className="flex items-start justify-between mb-6 sm:mb-8">
                    <span className="text-[52px] sm:text-[64px] font-extrabold leading-none text-[var(--color-line)] group-hover:text-[var(--color-red)] transition-colors duration-300">
                      {svc.num}
                    </span>
                    <span className="eyebrow">{svc.tag}</span>
                  </div>
                  <h3 className="text-[22px] sm:text-[26px] lg:text-[28px] font-extrabold tracking-[-0.5px] text-[var(--color-navy)] leading-tight">
                    {svc.title}
                  </h3>
                  <p className="mt-4 sm:mt-5 text-[15px] leading-relaxed text-[var(--color-muted)]">
                    {svc.desc}
                  </p>
                  <span className="mt-6 sm:mt-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-red)] group-hover:gap-3 transition-all">
                    En savoir plus <ArrowRight size={14} strokeWidth={2.6} />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg-soft)] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center mb-10 sm:mb-14">
              <p className="eyebrow mb-4 sm:mb-5">Démarrer un projet</p>
              <h2 className="text-[clamp(30px,7.5vw,64px)] font-extrabold tracking-[-1px] sm:tracking-[-1.5px] leading-[1.04] text-[var(--color-navy)]">
                Un projet de façade ?
              </h2>
              <p className="mt-5 sm:mt-6 max-w-xl mx-auto text-base lg:text-lg leading-relaxed text-[var(--color-muted)]">
                Estimation indicative en 30 secondes. Visite technique gratuite sous 48 heures.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-line)] shadow-[0_24px_60px_-30px_rgba(26,47,79,0.15)]">
              <div className="bg-white p-7 sm:p-8 lg:p-10">
                <span className="grid place-items-center w-10 h-10 bg-[var(--color-red)] text-white text-sm font-extrabold mb-5 sm:mb-6">01</span>
                <h3 className="text-lg font-extrabold tracking-[-0.3px] text-[var(--color-navy)]">
                  Vous décrivez
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  Type de travaux, surface, étages — 30 secondes via le simulateur.
                </p>
              </div>
              <div className="bg-white p-7 sm:p-8 lg:p-10">
                <span className="grid place-items-center w-10 h-10 bg-[var(--color-red)] text-white text-sm font-extrabold mb-5 sm:mb-6">02</span>
                <h3 className="text-lg font-extrabold tracking-[-0.3px] text-[var(--color-navy)]">
                  Visite technique
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  Rendez-vous sur site sous 48h. Diagnostic et devis ferme et définitif.
                </p>
              </div>
              <div className="bg-white p-7 sm:p-8 lg:p-10">
                <span className="grid place-items-center w-10 h-10 bg-[var(--color-red)] text-white text-sm font-extrabold mb-5 sm:mb-6">03</span>
                <h3 className="text-lg font-extrabold tracking-[-0.3px] text-[var(--color-navy)]">
                  Chantier livré
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  Équipe dédiée, planning respecté, finitions soignées jusqu&apos;à la réception.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center sm:justify-center gap-3 sm:gap-4">
              <Link href="/devis" className="btn btn-red btn-block-mobile">
                <ShieldCheck size={16} strokeWidth={2.4} />
                Simuler mon devis
                <ArrowRight size={16} strokeWidth={2.4} />
              </Link>
              <a
                href={`tel:${SITE.phoneTel}`}
                aria-label={`Appeler DECORATHERM au ${SITE.phone}`}
                className="btn btn-outline-navy btn-block-mobile"
              >
                <Phone size={16} strokeWidth={2.4} />
                {SITE.phone}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
