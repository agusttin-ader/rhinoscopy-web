"use client";

import { site } from "@/data/site";
import { useState } from "react";

export function ContactForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const text = [
      `Hola, soy ${nombre.trim()}.`,
      email.trim() ? `Email: ${email.trim()}` : "",
      "",
      mensaje.trim(),
    ]
      .filter(Boolean)
      .join("\n");

    const url = `${site.whatsapp.href}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-[0.65rem] tracking-[0.2em] text-slate-400 uppercase">
            Nombre
          </span>
          <input
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-2 w-full border-b border-navy/15 bg-transparent py-3 text-navy outline-none focus:border-navy"
          />
        </label>
        <label className="block">
          <span className="text-[0.65rem] tracking-[0.2em] text-slate-400 uppercase">
            Email
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full border-b border-navy/15 bg-transparent py-3 text-navy outline-none focus:border-navy"
          />
        </label>
      </div>
      <label className="block">
        <span className="text-[0.65rem] tracking-[0.2em] text-slate-400 uppercase">
          Mensaje
        </span>
        <textarea
          required
          rows={4}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className="mt-2 w-full resize-y border-b border-navy/15 bg-transparent py-3 text-navy outline-none focus:border-navy"
        />
      </label>
      <button
        type="submit"
        className="mt-2 w-full rounded-full bg-navy py-3.5 text-[0.72rem] font-semibold tracking-[0.18em] text-white uppercase transition hover:bg-navy/90 sm:w-auto sm:px-10"
      >
        Enviar por WhatsApp
      </button>
    </form>
  );
}
