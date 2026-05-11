import type { Metadata } from "next";
import { Phone, Mail, ShieldCheck } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact — devis et prise de rendez-vous",
  description:
    "Contactez DECORATHERM pour un devis ITE ou ravalement de façade. Réponse sous 24h ouvrées. Téléphone : 06 21 91 30 01 — France entière.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-white pt-hero pb-8 sm:pb-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <ScrollReveal>
            <p className="eyebrow mb-5">Nous contacter</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="h-hero max-w-4xl">Contact.</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-5 sm:mt-6 max-w-2xl text-base lg:text-lg leading-relaxed text-[var(--color-muted)]">
              Une question, un projet ? Nous répondons sous 24h ouvrées.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white pb-28 lg:pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Direct contact (TOP on mobile, RIGHT on desktop).
                Order swap: phone-first on mobile is the highest-conversion pattern. */}
            <ScrollReveal delay={0.15} className="order-1 lg:order-2">
              <div className="bg-[var(--color-navy)] text-white p-7 sm:p-10 lg:p-16 h-full flex flex-col">
                <p className="text-xs font-bold tracking-[2.5px] uppercase text-[var(--color-red)] mb-3 sm:mb-4">
                  Direct
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.5px] leading-tight">
                  Téléphone.
                </h2>

                <div className="mt-8 sm:mt-12">
                  <a
                    href={`tel:${SITE.phoneTel}`}
                    aria-label={`Appeler DECORATHERM au ${SITE.phone}`}
                    className="block text-[clamp(28px,9vw,64px)] font-extrabold tracking-[-1px] sm:tracking-[-2px] leading-none text-white hover:text-[var(--color-red)] transition-colors min-h-[48px] break-words"
                  >
                    {SITE.phone}
                  </a>
                  <p className="mt-3 sm:mt-4 text-white/60 text-sm">
                    Lundi - vendredi · 8h - 18h
                  </p>
                </div>

                <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/15 space-y-4 sm:space-y-5">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <Mail
                      size={18}
                      strokeWidth={1.8}
                      className="mt-0.5 text-[var(--color-red)] shrink-0"
                      aria-hidden="true"
                    />
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-white/85 text-sm hover:text-white transition-colors break-all min-h-[44px] inline-flex items-center"
                    >
                      {SITE.email}
                    </a>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <Phone
                      size={18}
                      strokeWidth={1.8}
                      className="mt-0.5 text-[var(--color-red)] shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-white/85 text-sm">{SITE.zone}</span>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <ShieldCheck
                      size={18}
                      strokeWidth={1.8}
                      className="mt-0.5 text-[var(--color-red)] shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-white/85 text-sm">
                      Qualibat RGE · Décennale · RC Pro
                    </span>
                  </div>
                </div>

                <div className="mt-auto pt-10 sm:pt-12">
                  <p className="text-xs text-white/50 leading-relaxed">
                    Installateur certifié pour donneurs d&apos;ordre, maîtres d&apos;œuvre et
                    entreprises générales. Marchés publics et privés, France entière.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Form */}
            <ScrollReveal className="order-2 lg:order-1">
              <div className="bg-[var(--color-bg-soft)] p-7 sm:p-10 lg:p-16">
                <p className="eyebrow mb-3 sm:mb-4">Formulaire</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.5px] leading-tight text-[var(--color-navy)] bar-red">
                  Écrivez-nous.
                </h2>
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mobile sticky bottom CTA — direct call shortcut */}
      <div className="sticky-cta">
        <a
          href={`tel:${SITE.phoneTel}`}
          aria-label={`Appeler DECORATHERM au ${SITE.phone}`}
          className="btn btn-red flex-1"
        >
          <Phone size={16} strokeWidth={2.4} aria-hidden="true" />
          Appeler maintenant
        </a>
      </div>
    </>
  );
}
