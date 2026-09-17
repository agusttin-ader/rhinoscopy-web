import type { JsonLdGraph } from "@/lib/seo-json-ld";

type Props = {
  data: JsonLdGraph;
};

export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
