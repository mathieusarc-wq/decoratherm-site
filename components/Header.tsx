"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogIn, Menu, X } from "lucide-react";
import Logo from "./Logo";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/devis", label: "Devis" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  // Close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  if (pathname?.startsWith("/espace-do")) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 pt-safe ${
        scrolled ? "shadow-[0_8px_24px_-12px_rgba(26,47,79,0.18)]" : ""
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)" }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 h-16 lg:h-[72px] flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center min-h-[44px]"
          aria-label="DECORATHERM accueil"
        >
          <Logo className="h-10 lg:h-12 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-semibold tracking-wide transition-colors ${
                  active ? "text-[var(--color-red)]" : "text-[var(--color-navy)] hover:text-[var(--color-red)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/espace-do"
            className="hidden lg:inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--color-navy)] text-white text-xs font-bold tracking-wider uppercase transition-all duration-200 hover:bg-[var(--color-navy-700)] hover:-translate-y-0.5 min-h-[44px]"
            style={{ borderRadius: 2 }}
          >
            <LogIn size={16} strokeWidth={2.4} aria-hidden="true" />
            Espace DO
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden grid place-items-center w-12 h-12 text-[var(--color-navy)] active:scale-95 transition-transform"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            style={{ touchAction: "manipulation" }}
          >
            {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Backdrop overlay (mobile only) — closes drawer on tap-outside */}
      <button
        type="button"
        aria-label="Fermer le menu"
        onClick={() => setMobileOpen(false)}
        tabIndex={mobileOpen ? 0 : -1}
        className={`lg:hidden fixed inset-0 top-16 z-40 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`lg:hidden fixed left-0 right-0 top-16 z-50 bg-white border-t border-[var(--color-line)] overflow-y-auto pb-safe transition-transform duration-300 origin-top ${
          mobileOpen ? "" : "pointer-events-none"
        }`}
        style={{
          maxHeight: "calc(100dvh - 64px)",
          transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
          transform: mobileOpen ? "translateY(0)" : "translateY(-110%)",
          visibility: mobileOpen ? "visible" : "hidden",
          transitionProperty: "transform, visibility",
        }}
        aria-hidden={!mobileOpen}
      >
        <nav className="px-5 sm:px-6 py-3 flex flex-col gap-1" aria-label="Navigation mobile">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                tabIndex={mobileOpen ? 0 : -1}
                className={`min-h-[48px] flex items-center text-base font-semibold border-b border-[var(--color-line)] last:border-b-0 transition-colors ${
                  active ? "text-[var(--color-red)]" : "text-[var(--color-navy)] active:text-[var(--color-red)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/espace-do"
            tabIndex={mobileOpen ? 0 : -1}
            className="mt-4 mb-3 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-navy)] text-white text-xs font-bold tracking-wider uppercase min-h-[48px] active:scale-[0.98] transition-transform"
            style={{ borderRadius: 2 }}
          >
            <LogIn size={16} strokeWidth={2.4} aria-hidden="true" />
            Espace donneur d&apos;ordre
          </Link>
        </nav>
      </div>
    </header>
  );
}
