import Image from "next/image";

const MEET_LOGO_DARK = "/images/LOGO-RHINOSCOPY-MEET-3-FONDO-OSCURO.png";

type VisualSize = "teaser" | "page";

const LOGO_SHADOW =
  "drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)]";

function meetLogoClassName(emphasis: "page" | "teaser") {
  return emphasis === "page"
    ? `h-auto w-full max-w-[min(100%,20rem)] object-contain sm:max-w-md lg:max-w-xl xl:max-w-2xl ${LOGO_SHADOW}`
    : `h-auto w-full max-w-[min(100%,22rem)] object-contain sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl ${LOGO_SHADOW}`;
}

type CertificateVisualProps = {
  size?: VisualSize;
  /** `meet-logo`: logo Meet fondo oscuro (página certificados). `meet-text`: mismo logo en home. */
  layout?: "meet-text" | "meet-logo";
};

export function CertificateVisual({
  size = "teaser",
  layout = "meet-text",
}: CertificateVisualProps) {
  const emphasis =
    size === "page" || layout === "meet-logo" ? "page" : "teaser";

  return (
    <div
      className="pointer-events-none flex w-full select-none justify-center lg:justify-end"
      aria-hidden="true"
    >
      <Image
        src={MEET_LOGO_DARK}
        alt=""
        width={1200}
        height={520}
        priority={emphasis === "page"}
        className={meetLogoClassName(emphasis)}
      />
    </div>
  );
}
