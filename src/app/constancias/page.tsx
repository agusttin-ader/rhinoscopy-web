import { CertificateSearch } from "@/components/certificate-search";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Constancias | Rhinoscopy",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};

export default function ConstanciasPage() {
  return (
    <>
      <SiteHeader variant="bar" />
      <main className="relative isolate flex-1 overflow-hidden bg-navy">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-10 h-[28rem] w-[28rem] rounded-full bg-violet-500/15 blur-3xl" />
          <div className="absolute right-0 top-40 h-[26rem] w-[26rem] rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-16 md:pt-24">
          <p className="text-center text-[0.7rem] tracking-[0.32em] text-cyan-200/80 uppercase">
            Lorem ipsum
          </p>
          <h1 className="font-display mx-auto mt-4 max-w-3xl text-center text-4xl text-white sm:text-6xl">
            Lorem ipsum dolor sit
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-center leading-relaxed text-slate-400">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>

          <div className="mt-14">
            <CertificateSearch />
          </div>

          <p className="mx-auto mt-16 max-w-lg text-center text-xs leading-relaxed text-slate-500">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
