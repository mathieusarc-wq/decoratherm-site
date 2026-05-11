"use client";

import { motion, useInView, useMotionValue, useReducedMotion, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  to: number;
  suffix?: string;
  duration?: number;
};

export default function AnimatedCounter({ to, suffix = "", duration = 1.6 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => unsub();
  }, [rounded]);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      mv.set(to);
      return;
    }
    const controls = animate(mv, to, {
      duration,
      ease: [0.4, 0, 0.2, 1],
    });
    return controls.stop;
  }, [inView, to, duration, reduced, mv]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
