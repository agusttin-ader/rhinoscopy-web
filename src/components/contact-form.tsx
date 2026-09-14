"use client";

import { useLocaleData } from "@/hooks/use-locale-data";
import { site } from "@/data/site";
import { useState } from "react";

function buildMessage(nombre: string, email: string, mensaje: string) {
  return [
    `Hola, soy ${nombre.trim()}.`,
    email.trim() ? `Email: ${email.trim()}` : "",
    "",
    mensaje.trim(),
  ]
    .filter(Boolean)
    .join("\n");
}

export function ContactForm() {
  const { contactCopy } = useLocaleData();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  function validate(): boolean {
    return (
      nombre.trim().length > 0 &&
      email.trim().length > 0 &&
      mensaje.trim().length > 0
    );
  }

  function onWhatsApp(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    const url = `${site.whatsapp.href}?text=${encodeURIComponent(
      buildMessage(nombre, email, mensaje),
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function onEmail(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent(
      `Consulta Rhinoscopy — ${nombre.trim()}`,
    );
    const body = encodeURIComponent(buildMessage(nombre, email, mensaje));
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  const inputClass =
    "mt-2 w-full border-b border-navy/15 bg-transparent py-3 text-navy outline-none transition-colors duration-200 focus:border-cyan-600";
  const labelClass =
    "text-[0.65rem] font-medium tracking-[0.2em] text-slate-400 uppercase";

  return (
    <form className="grid gap-6" onSubmit={onWhatsApp}>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>{contactCopy.nameLabel}</span>
          <input
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={inputClass}
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className={labelClass}>{contactCopy.emailLabel}</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            autoComplete="email"
          />
        </label>
      </div>
      <label className="block">
        <span className={labelClass}>{contactCopy.messageLabel}</span>
        <textarea
          required
          rows={4}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className={`${inputClass} resize-y`}
        />
      </label>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="submit"
          className="w-full rounded-full bg-navy px-8 py-3.5 text-[0.72rem] font-bold tracking-[0.18em] text-white uppercase transition hover:bg-navy/90 sm:w-auto"
        >
          {contactCopy.whatsappCta}
        </button>
        <button
          type="button"
          onClick={onEmail}
          className="w-full rounded-full border border-navy/20 bg-white px-8 py-3.5 text-[0.72rem] font-bold tracking-[0.18em] text-navy uppercase transition hover:border-navy/35 hover:bg-navy/[0.03] sm:w-auto"
        >
          {contactCopy.emailCta}
        </button>
      </div>
    </form>
  );
}
