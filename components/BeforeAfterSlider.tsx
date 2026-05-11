"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

type Props = {
  beforeSrc: string;
  afterSrc: string;
  /** Optional fixed height. If omitted, the slider uses an aspect-ratio (mobile-friendly). */
  height?: number | string;
  beforeAlt?: string;
  afterAlt?: string;
  /** Mark the LCP image as priority (only on the home hero) */
  priority?: boolean;
  /** Aspect ratio for fluid sizing (default 4/3 mobile-friendly, switches to 16/10 on lg) */
  aspect?: string;
};

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  height,
  beforeAlt = "Avant intervention",
  afterAlt = "Après intervention",
  priority = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, raw)));
  }, []);

  // Mouse handling (desktop)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      updateFromClientX(e.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [updateFromClientX]);

  // Touch handling: bind non-passive listeners so we can preventDefault and
  // block the page from scrolling while the user drags the slider.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      draggingRef.current = true;
      updateFromClientX(t.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!draggingRef.current) return;
      const t = e.touches[0];
      if (!t) return;
      // Prevent page scroll while interacting horizontally with the slider
      if (e.cancelable) e.preventDefault();
      updateFromClientX(t.clientX);
    };
    const onTouchEnd = () => {
      draggingRef.current = false;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [updateFromClientX]);

  const onMouseDown = (e: React.MouseEvent) => {
    draggingRef.current = true;
    document.body.style.userSelect = "none";
    updateFromClientX(e.clientX);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => Math.max(0, p - 4));
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => Math.min(100, p + 4));
    }
    if (e.key === "Home") setPos(0);
    if (e.key === "End") setPos(100);
  };

  // If a height was explicitly passed, use it. Otherwise, use a fluid aspect-ratio
  // that looks great on mobile (4/3) and progressively wider on bigger screens.
  const useFluid = height === undefined;
  // touch-action: pan-y → permet le scroll vertical de la page quand le doigt
  // touche le slider. Le drag horizontal est géré par les listeners JS (preventDefault)
  // sur le handle uniquement.
  const style: React.CSSProperties = {
    touchAction: "pan-y",
    borderRadius: 2,
    ...(useFluid ? {} : { height }),
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none bg-[var(--color-bg-soft)] ${
        useFluid ? "aspect-[4/3] sm:aspect-[3/2] lg:aspect-[16/10]" : ""
      }`}
      style={style}
      onMouseDown={onMouseDown}
    >
      {/* AFTER (base layer) */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
        priority={priority}
        className="object-cover"
        draggable={false}
        unoptimized
      />

      {/* BEFORE (clipped layer) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
          priority={priority}
          className="object-cover"
          draggable={false}
          unoptimized
        />
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-10 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[var(--color-navy)] text-white text-[10px] font-bold tracking-[2.5px] sm:tracking-[3px] uppercase">
        Avant
      </div>
      <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[var(--color-red)] text-white text-[10px] font-bold tracking-[2.5px] sm:tracking-[3px] uppercase">
        Après
      </div>

      {/* Vertical handle line */}
      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{
          left: `calc(${pos}% - 1px)`,
          width: 2,
          background: "#ffffff",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.05)",
        }}
      />

      {/* Drag handle — 48px touch target on mobile, 44px desktop */}
      <button
        type="button"
        aria-label="Glisser pour comparer avant/après"
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        role="slider"
        onKeyDown={onKeyDown}
        onMouseDown={(e) => {
          e.stopPropagation();
          draggingRef.current = true;
          document.body.style.userSelect = "none";
        }}
        className="absolute z-30 grid place-items-center bg-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)] cursor-ew-resize"
        style={{
          top: "50%",
          left: `${pos}%`,
          width: 48,
          height: 48,
          transform: "translate(-50%, -50%)",
          borderRadius: 999,
          touchAction: "none",
        }}
      >
        <span className="flex items-center text-[var(--color-navy)]" aria-hidden="true">
          <ChevronLeft size={16} strokeWidth={2.4} />
          <ChevronRight size={16} strokeWidth={2.4} />
        </span>
      </button>

      {/* Mobile hint (shown briefly via subtle bottom badge) */}
      <div className="md:hidden absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-black/55 text-white text-[10px] font-bold tracking-[2px] uppercase rounded-full pointer-events-none">
        Glisser pour comparer
      </div>
    </div>
  );
}
