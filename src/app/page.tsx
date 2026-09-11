import { CertificateTeaser } from "@/components/certificate-teaser";
import { CongressSection } from "@/components/congress-section";
import { WebinarsSection } from "@/components/webinars-section";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader variant="bar" />
      <main className="flex-1">
        <Hero />
        <CongressSection />
        <WebinarsSection />
        <CertificateTeaser />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
