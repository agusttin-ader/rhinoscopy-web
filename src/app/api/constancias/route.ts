import { searchConstancias } from "@/lib/constancias";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { nombre?: string; query?: string }
    | null;

  const nombre = (body?.nombre ?? body?.query ?? "").trim();

  if (nombre.length < 2) {
    return NextResponse.json(
      { error: "Ingresá al menos 2 letras del nombre o apellido." },
      { status: 400 },
    );
  }

  const { results, total, truncated } = await searchConstancias(nombre);
  return NextResponse.json({ results, total, truncated });
}
