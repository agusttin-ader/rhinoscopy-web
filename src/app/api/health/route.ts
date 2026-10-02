import { getSiteUrl } from "@/lib/site-url";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

/** Comprobación rápida de que el deploy responde (soporte / médicos en el exterior). */
export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      site: getSiteUrl(),
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
