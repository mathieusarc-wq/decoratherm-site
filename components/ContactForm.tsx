"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type Status = "idle" | "loading" | "sent" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [project, setProject] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, project }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error ?? "Erreur");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Erreur inconnue");
    }
  };

  if (status === "sent") {
    return (
      <div className="py-10 sm:py-12" role="status" aria-live="polite">
        <motion.div
          initial={reduced ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="grid place-items-center w-16 h-16 rounded-full bg-[var(--color-red)] text-white"
        >
          <Check size={28} strokeWidth={3} aria-hidden="true" />
        </motion.div>
        <motion.h3
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-7 sm:mt-8 text-2xl sm:text-3xl font-extrabold tracking-[-0.5px] text-[var(--color-navy)]"
        >
          Demande envoyée.
        </motion.h3>
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-3 text-[15px] leading-relaxed text-[var(--color-muted)] max-w-md"
        >
          Nous vous rappelons sous 24 heures ouvrées.
        </motion.p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-2" noValidate>
      <div>
        <label htmlFor="cf-name" className="block text-[11px] font-bold tracking-[2px] uppercase text-[var(--color-muted)] mt-6">
          Nom
        </label>
        <input
          id="cf-name"
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-underline"
          placeholder="Votre nom"
          autoComplete="name"
          autoCapitalize="words"
          enterKeyHint="next"
        />
      </div>

      <div>
        <label htmlFor="cf-phone" className="block text-[11px] font-bold tracking-[2px] uppercase text-[var(--color-muted)] mt-6">
          Téléphone
        </label>
        <input
          id="cf-phone"
          required
          type="tel"
          inputMode="tel"
          pattern="[0-9+\-\s().]{8,20}"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input-underline"
          placeholder="06 ..."
          autoComplete="tel"
          enterKeyHint="next"
        />
      </div>

      <div>
        <label htmlFor="cf-project" className="block text-[11px] font-bold tracking-[2px] uppercase text-[var(--color-muted)] mt-6">
          Votre projet
        </label>
        <textarea
          id="cf-project"
          required
          rows={4}
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="input-underline resize-none"
          placeholder="Décrivez votre besoin (type de travaux, surface, localisation...)"
          enterKeyHint="send"
        />
      </div>

      {errorMsg && (
        <p className="text-sm text-[var(--color-red)] mt-4" role="alert">
          Une erreur est survenue. Réessayez ou appelez-nous.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-8 sm:mt-10 btn btn-red btn-block-mobile disabled:opacity-50 disabled:cursor-wait"
      >
        {status === "loading" ? "Envoi..." : "Envoyer"}
        <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
      </button>
    </form>
  );
}
