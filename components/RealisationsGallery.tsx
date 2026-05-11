"use client";

import { useMemo, useState } from "react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import ScrollReveal from "./ScrollReveal";
import { PROJECTS, type Project } from "@/lib/config";

type Filter = "TOUS" | "ITE" | "ITI" | "RAVALEMENT";
const FILTERS: Filter[] = ["TOUS", "ITE", "ITI", "RAVALEMENT"];

export default function RealisationsGallery() {
  const [filter, setFilter] = useState<Filter>("TOUS");

  const items: Project[] = useMemo(() => {
    if (filter === "TOUS") return PROJECTS;
    return PROJECTS.filter((p) => p.type === filter);
  }, [filter]);

  return (
    <>
      {/* Filter row — horizontal scroll on small screens, full row on tablet+ */}
      <div
        className="flex items-center gap-1 border-b border-[var(--color-line)] -mx-5 px-5 sm:mx-0 sm:px-0 overflow-x-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
        role="tablist"
        aria-label="Filtres réalisations"
      >
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              role="tab"
              aria-selected={active}
              className={`relative flex-shrink-0 filter-pill transition-colors ${
                active
                  ? "text-[var(--color-navy)]"
                  : "text-[var(--color-muted)] active:text-[var(--color-navy)] hover:text-[var(--color-navy)]"
              }`}
            >
              {f}
              <span
                className={`absolute left-3 right-3 sm:left-5 sm:right-5 -bottom-px h-0.5 transition-all ${
                  active ? "bg-[var(--color-red)]" : "bg-transparent"
                }`}
                style={{ transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)" }}
                aria-hidden="true"
              />
            </button>
          );
        })}
        <span className="ml-auto pl-3 pr-1 text-xs text-[var(--color-muted)] tabular-nums whitespace-nowrap">
          {items.length} projet{items.length > 1 ? "s" : ""}
        </span>
      </div>

      <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 sm:gap-y-16">
        {items.map((p, i) => (
          <ScrollReveal key={p.slug} delay={(i % 2) * 0.1}>
            <article>
              <BeforeAfterSlider
                beforeSrc={p.before}
                afterSrc={p.after}
                beforeAlt={`${p.title} — avant`}
                afterAlt={`${p.title} — après`}
              />
              <div className="mt-5 sm:mt-6 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <span className="eyebrow">{p.type}</span>
                  <h3 className="mt-2 text-xl sm:text-2xl font-extrabold tracking-[-0.4px] sm:tracking-[-0.5px] text-[var(--color-navy)] leading-tight">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{p.location}</p>
                </div>
                <div className="text-right text-xs text-[var(--color-muted)] flex flex-col gap-1 shrink-0">
                  <span>
                    <strong className="text-[var(--color-navy)]">{p.surface}</strong>
                  </span>
                  <span>{p.duration}</span>
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </>
  );
}
