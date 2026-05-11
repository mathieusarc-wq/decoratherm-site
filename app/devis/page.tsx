import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import DevisSimulator from "@/components/DevisSimulator";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Devis gratuit — simulateur ITE et ravalement",
  description:
    "Estimez votre projet d'isolation thermique extérieure ou de ravalement de façade en 30 secondes. Simulateur gratuit, prix indicatif, visite technique gratuite sous 48h.",
};

export default function DevisPage() {
  return (
    <>
      <section className="bg-white pt-hero pb-8 sm:pb-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <ScrollReveal>
            <p className="eyebrow mb-5">Estimation gratuite</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="h-hero max-w-4xl">Simulateur de devis.</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-5 sm:mt-6 max-w-2xl text-base lg:text-lg leading-relaxed text-[var(--color-muted)]">
              Une estimation indicative en quelques clics. Pour un prix ferme, visite technique
              gratuite sous 48h.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white pb-28 lg:pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
            <div className="lg:col-span-8">
              <ScrollReveal>
                <DevisSimulator />
              </ScrollReveal>
            </div>

            <aside className="lg:col-span-4">
              <ScrollReveal delay={0.15}>
                <div className="bg-[var(--color-bg-soft)] p-7 sm:p-8 lg:p-10 sticky top-28">
                  <p className="eyebrow mb-3 sm:mb-4">Préférez le téléphone ?</p>
                  <h3 className="text-2xl font-extrabold tracking-[-0.5px] text-[var(--color-navy)] leading-tight">
                    Parlez à un expert.
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                    Notre équipe vous rappelle gratuitement et vous accompagne dans la définition de
                    votre projet.
                  </p>
                  <a
                    href={`tel:${SITE.phoneTel}`}
                    aria-label={`Appeler DECORATHERM au ${SITE.phone}`}
                    className="mt-5 sm:mt-6 inline-flex items-center gap-3 text-[var(--color-navy)] hover:text-[var(--color-red)] transition-colors group min-h-[48px]"
                  >
                    <span className="grid place-items-center w-10 h-10 bg-[var(--color-red)] text-white rounded-full transition-transform group-hover:scale-105">
                      <Phone size={16} strokeWidth={2.4} aria-hidden="true" />
                    </span>
                    <span className="text-xl font-extrabold tracking-[-0.3px]">{SITE.phone}</span>
                  </a>

                  <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-[var(--color-line)]">
                    <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                      Vous pouvez aussi nous{" "}
                      <Link
                        href="/contact"
                        className="text-[var(--color-red)] font-bold hover:underline underline-offset-4"
                      >
                        écrire directement
                      </Link>
                      . Nous répondons sous 24h ouvrées.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </aside>
          </div>
        </div>
      </section>

      {/* Mobile sticky CTA — quick call shortcut, never blocks the simulator */}
      <div className="sticky-cta">
        <a
          href={`tel:${SITE.phoneTel}`}
          aria-label={`Appeler DECORATHERM au ${SITE.phone}`}
          className="btn btn-outline-navy flex-1"
        >
          <Phone size={16} strokeWidth={2.4} aria-hidden="true" />
          Appeler
        </a>
        <Link href="/contact" className="btn btn-red flex-1">
          Être rappelé
        </Link>
      </div>
    </>
  );
}
