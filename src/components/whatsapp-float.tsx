import { WhatsAppIcon } from "@/components/icons/social-icons";
import { site } from "@/data/site";

const DEFAULT_MESSAGE = "Hola, quisiera consultar sobre Rhinoscopy.";

export function WhatsappFloat() {
  const href = `${site.whatsapp.href}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_40px_-8px_rgba(37,211,102,0.65)] transition-transform duration-200 hover:scale-[1.04] hover:shadow-[0_16px_44px_-8px_rgba(37,211,102,0.75)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-navy max-sm:bottom-[max(1.25rem,env(safe-area-inset-bottom))] max-sm:right-[max(1.25rem,env(safe-area-inset-right))]"
      aria-label={`WhatsApp: ${site.whatsapp.display}`}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
