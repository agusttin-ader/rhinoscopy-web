import { SOMBRA_LOGO_PATH } from "@/lib/site-url";
import Image from "next/image";

type ComingSoonCopy = {
  titleScript: string;
  titleDisplay: string;
  statusLine: string;
};

type Props = {
  copy: ComingSoonCopy;
};

export function ConstanciasComingSoon({ copy }: Props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-2 pb-10 pt-4 text-center sm:pt-8 md:min-h-[min(54vh,540px)]">
      <div
        className="constancias-soon-enter constancias-soon-enter--1 relative h-[min(76vw,15rem)] w-[min(76vw,15rem)] sm:h-60 sm:w-60"
      >
        <svg
          className="constancias-soon-ring pointer-events-none absolute inset-0 h-full w-full text-brand-sky/45"
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden
        >
          <circle
            className="constancias-soon-ring-stroke"
            cx="100"
            cy="100"
            r="92"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>

        <span
          className="constancias-soon-orbit-dot constancias-soon-orbit-dot--1 absolute top-[2%] right-[12%] h-2 w-2 rounded-full bg-brand-sky shadow-[0_0_12px_rgba(95,198,238,0.45)]"
          aria-hidden
        />
        <span
          className="constancias-soon-orbit-dot constancias-soon-orbit-dot--2 absolute bottom-[10%] left-[4%] h-1.5 w-1.5 rounded-full bg-white/85"
          aria-hidden
        />
        <span
          className="constancias-soon-orbit-dot constancias-soon-orbit-dot--3 absolute top-[26%] right-[2%] h-1.5 w-1.5 rounded-full bg-fuchsia-300/70"
          aria-hidden
        />

        <div className="constancias-soon-logo absolute inset-[8%] flex items-center justify-center">
          <Image
            src={SOMBRA_LOGO_PATH}
            alt=""
            width={448}
            height={448}
            priority
            className="h-full w-full object-contain drop-shadow-[0_0_32px_rgba(95,198,238,0.28)]"
          />
        </div>
      </div>

      <h1 className="constancias-soon-enter constancias-soon-enter--2 mt-11 max-w-md sm:mt-14">
        <span className="constancias-soon-script font-script block text-[clamp(2.35rem,7.5vw,3.45rem)] leading-none">
          {copy.titleScript}
        </span>
        <span className="font-display mt-4 block text-[clamp(1.05rem,3.2vw,1.35rem)] leading-snug tracking-[0.14em] text-white uppercase">
          {copy.titleDisplay}
        </span>
        <span
          className="constancias-soon-rule mx-auto mt-5 block h-px w-28 max-w-[40%] rounded-full bg-gradient-to-r from-transparent via-cyan-400/80 to-fuchsia-400/70 sm:w-36"
          aria-hidden
        />
      </h1>

      <p className="constancias-soon-enter constancias-soon-enter--3 mt-9 flex items-center justify-center gap-0.5 text-[0.72rem] font-semibold tracking-[0.24em] text-white/50 uppercase">
        <span>{copy.statusLine}</span>
        <span className="constancias-soon-dots inline-flex w-[1.35em]" aria-hidden>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </p>
    </div>
  );
}
