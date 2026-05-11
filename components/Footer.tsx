"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { SITE } from "@/lib/config";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/espace-do")) return null;

  // Pages with sticky CTA need extra bottom padding so footer copyright doesn't get hidden
  const hasStickyCta = pathname === "/devis" || pathname === "/contact";

  return (
    <footer
      className={`bg-[var(--color-navy)] text-white pt-14 sm:pt-20 ${
        hasStickyCta ? "pb-24 lg:pb-8" : "pb-8"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-8">
          <div className="md:col-span-5">
            <Logo variant="light" className="h-12 w-auto" />
            <p className="mt-5 sm:mt-6 text-sm leading-relaxed text-white/70 max-w-md">
              DECORATHERM est un installateur certifié Qualibat RGE spécialisé en isolation
              thermique extérieure et ravalement de façade. Nous intervenons pour les donneurs
              d&apos;ordre, maîtres d&apos;œuvre et entreprises générales sur l&apos;ensemble du
              territoire français.
            </p>
            <div className="mt-5 sm:mt-6 h-px w-12 bg-[var(--color-red)]" />
          </div>

          <nav className="md:col-span-3" aria-label="Navigation pied de page">
            <h3 className="text-xs font-bold tracking-[2.5px] uppercase text-[var(--color-red)] mb-4 sm:mb-5">
              Navigation
            </h3>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-y-1 text-sm text-white/80">
              <li>
                <Link
                  href="/"
                  className="block py-2.5 hover:text-white transition-colors min-h-[44px] flex items-center"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="block py-2.5 hover:text-white transition-colors min-h-[44px] flex items-center"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/realisations"
                  className="block py-2.5 hover:text-white transition-colors min-h-[44px] flex items-center"
                >
                  Réalisations
                </Link>
              </li>
              <li>
                <Link
                  href="/a-propos"
                  className="block py-2.5 hover:text-white transition-colors min-h-[44px] flex items-center"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/devis"
                  className="block py-2.5 hover:text-white transition-colors min-h-[44px] flex items-center"
                >
                  Devis gratuit
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block py-2.5 hover:text-white transition-colors min-h-[44px] flex items-center"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h3 className="text-xs font-bold tracking-[2.5px] uppercase text-[var(--color-red)] mb-4 sm:mb-5">
              Contact
            </h3>
            <ul className="space-y-1 text-sm text-white/80">
              <li>
                <a
                  href={`tel:${SITE.phoneTel}`}
                  aria-label={`Appeler DECORATHERM au ${SITE.phone}`}
                  className="block py-2.5 hover:text-white transition-colors min-h-[44px] flex items-center font-semibold"
                >
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="block py-2.5 hover:text-white transition-colors min-h-[44px] flex items-center break-all"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="py-1.5">{SITE.zone}</li>
              <li className="pt-2 text-xs uppercase tracking-wider text-white/50 leading-relaxed">
                Qualibat RGE · Décennale · RC Pro
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 pt-5 sm:pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <p className="text-xs text-white/50 leading-relaxed">
            © {new Date().getFullYear()} DECORATHERM SAS · Capital 30 000 € · SIREN 942 177 171 · 21 Chemin du Prieuré, 17000 La Rochelle
          </p>
          <p className="text-xs text-white/50">
            <Link
              href="/a-propos"
              className="hover:text-white transition-colors min-h-[44px] inline-flex items-center"
            >
              Mentions légales
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
