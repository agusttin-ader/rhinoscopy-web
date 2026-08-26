import { About } from "@/components/about";
import { CertificateTeaser } from "@/components/certificate-teaser";
import { Contact } from "@/components/contact";
import { Events } from "@/components/events";
import { Hero } from "@/components/hero";
import { Partners } from "@/components/partners";
import { Professionals } from "@/components/professionals";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <About />
        <Professionals />
        <Events />
        <CertificateTeaser />
        <Partners />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
