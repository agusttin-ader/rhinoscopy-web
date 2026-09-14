import Image from "next/image";

const MEET_ART = "/images/heromeet-art.png";
const BRAND_MARK = "/images/rhinoscopy-logo-hero-sombra.png";

type VisualSize = "teaser" | "page";

const LOGO_SHADOW =
  "drop-shadow-[0_0_2px_rgba(255,255,255,0.35),0_0_1px_rgba(95,198,238,0.5),0_0_40px_rgba(95,198,238,0.22),0_16px_48px_rgba(0,0,0,0.42)]";

function Meet2026Mark() {
  return (
    <div className="text-left leading-[0.92]">
      <p className="text-[0.52rem] font-bold tracking-[0.38em] text-white/85 uppercase sm:text-[0.62rem] sm:tracking-[0.44em]">
        Rhinoscopy
      </p>
      <p className="mt-1.5 text-[clamp(2.1rem,9vw,3.75rem)] font-extrabold tracking-[0.02em] text-white uppercase sm:mt-2.5">
        Meet
      </p>
      <p
        className="-mt-1 text-[clamp(2.5rem,10vw,4.5rem)] font-bold leading-none tracking-[0.04em] text-cyan-400 sm:-mt-1.5"
      >
        2026
      </p>
    </div>
  );
}

type CertificateVisualProps = {
  size?: VisualSize;
  /** Solo logo sombra (certificados); por defecto arte + tipografía Meet. */
  layout?: "meet-text" | "meet-logo";
};

const logoOnlyClassName = (emphasis: "page" | "teaser") =>
  emphasis === "page"
    ? `h-auto w-[min(100%,16rem)] object-contain sm:w-[min(100%,18rem)] md:w-[min(100%,20rem)] lg:w-[min(100%,26rem)] xl:w-[min(100%,30rem)] ${LOGO_SHADOW}`
    : `h-auto w-[min(100%,20rem)] object-contain sm:w-[min(100%,22rem)] md:w-[min(100%,24rem)] lg:w-[min(100%,28rem)] xl:w-[min(100%,32rem)] ${LOGO_SHADOW}`;

export function CertificateVisual({
  size = "teaser",
  layout = "meet-text",
}: CertificateVisualProps) {
  if (size === "page" || layout === "meet-logo") {
    const emphasis = size === "page" ? "page" : "teaser";
    return (
      <div
        className="pointer-events-none flex w-full select-none justify-center lg:justify-end"
        aria-hidden="true"
      >
        <Image
          src={BRAND_MARK}
          alt=""
          width={520}
          height={520}
          priority
          className={logoOnlyClassName(emphasis)}
        />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none relative mx-auto w-full max-w-[19rem] select-none sm:max-w-[23rem] lg:mx-0 lg:ml-auto lg:max-w-[25rem] xl:max-w-[27rem]"
      aria-hidden="true"
    >
      <div className="relative aspect-[5/4] w-full max-w-full">
        <div
          className="absolute bottom-0 left-0 z-10 w-[62%] max-w-[12rem] sm:max-w-[15rem] lg:w-[58%] lg:max-w-[16rem]"
        >
          <Image
            src={MEET_ART}
            alt=""
            width={525}
            height={569}
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 16rem"
            className="h-auto w-full max-w-full drop-shadow-[0_24px_48px_rgba(0,0,0,0.45)]"
          />
        </div>

        <div className="absolute right-0 top-[6%] z-20 sm:top-[10%] lg:top-[8%]">
          <Meet2026Mark />
        </div>

        <div
          className="absolute bottom-[17%] left-[48%] z-0 h-px w-[42%] bg-gradient-to-r from-cyan-400/25 via-white/10 to-transparent sm:bottom-[18%]"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
