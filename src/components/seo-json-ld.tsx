import { organizationJsonLdGraph } from "@/lib/seo-json-ld";
import { JsonLd } from "@/components/json-ld";

export function SeoJsonLd() {
  return <JsonLd data={organizationJsonLdGraph()} />;
}
