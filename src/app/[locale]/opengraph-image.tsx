import { openGraphImageAlt } from "@/lib/seo";
import { ImageResponse } from "next/og";

export const alt = "Rhinoscopy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ locale: string }> };

export default async function OpenGraphImage({ params }: Props) {
  const { locale } = await params;
  const subtitle = openGraphImageAlt(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #262454 0%, #1a1838 55%, #0f1028 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#67e8f9",
            marginBottom: 24,
          }}
        >
          Rhinoscopy
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            marginTop: 40,
            height: 4,
            width: 160,
            background: "linear-gradient(90deg, #22d3ee, #e879f9)",
            borderRadius: 999,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -80,
            top: -80,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "rgba(34, 211, 238, 0.12)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
