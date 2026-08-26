import { ContactForm } from "@/components/contact-form";
import { copy } from "@/data/copy";

export function Contact() {
  return (
    <section id="contacto" className="bg-paper px-6 py-28">
      <div className="mx-auto grid max-w-6xl gap-12 border border-navy/10 bg-white p-10 md:grid-cols-[0.9fr_1.1fr] md:p-16">
        <div>
          <p className="text-[0.7rem] tracking-[0.28em] text-indigo-500 uppercase">
            {copy.contactKicker}
          </p>
          <h2 className="font-display mt-4 text-4xl text-navy">
            {copy.contactTitle}
          </h2>
          <p className="mt-5 leading-relaxed text-slate-500">
            {copy.contactLead}
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
