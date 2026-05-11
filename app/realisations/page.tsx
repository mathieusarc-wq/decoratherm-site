import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import RealisationsGallery from "@/components/RealisationsGallery";

export const metadata: Metadata = {
  title: "Réalisations — chantiers ITE et ravalement de façade",
  description:
    "Galerie des chantiers DECORATHERM : isolation thermique extérieure et ravalement de façade. Comparaison avant / après sur des opérations menées en France entière.",
};

export default function RealisationsPage() {
  return (
    <>
      <section className="bg-white pt-hero pb-8 sm:pb-12 lg:pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <ScrollReveal>
            <p className="eyebrow mb-5">Portfolio · {new Date().getFullYear()}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="h-hero max-w-4xl">Réalisations.</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-5 sm:mt-6 max-w-2xl text-base lg:text-lg leading-relaxed text-[var(--color-muted)]">
              Une sélection de chantiers livrés. Glissez la poignée pour comparer l&apos;avant et
              l&apos;après. Plus de 500 chantiers à l&apos;actif des équipes DECORATHERM.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <ScrollReveal>
            <RealisationsGallery />
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-[var(--color-bg-soft)] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 sm:gap-6">
          <ScrollReveal>
            <div>
              <p className="eyebrow mb-3">Votre chantier</p>
              <h2 className="text-[clamp(24px,6vw,40px)] font-extrabold tracking-[-0.5px] text-[var(--color-navy)] leading-tight">
                Le prochain projet pourrait être le vôtre.
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
