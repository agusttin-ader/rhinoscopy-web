"use client";

import {
  InstagramCameraIcon,
  WhatsAppIcon,
} from "@/components/icons/social-icons";
import { footerCopy } from "@/data/footer-copy";
import { site } from "@/data/site";

const whatsappPrefill = `${site.whatsapp.href}?text=${encodeURIComponent(
  "Hola, quisiera consultar sobre Rhinoscopy.",
)}`;

export function FooterFollow() {
  return (
    <div className="mt-6">
      <p className="text-[0.65rem] font-semibold tracking-[0.28em] text-white/55 uppercase">
        {footerCopy.followTitle}
      </p>
      <div className="mt-4 flex items-center gap-3">
        <a
          href={whatsappPrefill}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_-10px_rgba(37,211,102,0.85)] transition-transform duration-200 hover:scale-[1.04]"
          aria-label={`WhatsApp ${site.whatsapp.display}`}
        >
          <WhatsAppIcon className="h-[1.35rem] w-[1.35rem]" />
        </a>
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#515bd4] text-white shadow-[0_10px_28px_-12px_rgba(238,42,123,0.55)] transition-transform duration-200 hover:scale-[1.04]"
          aria-label={`Instagram ${site.instagramHandle}`}
        >
          <InstagramCameraIcon className="h-[1.35rem] w-[1.35rem]" />
        </a>
      </div>
    </div>
  );
}
