import { searchConstancias } from "@/lib/constancias";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { nombre?: string; apellido?: string }
    | null;

  const nombre = body?.nombre?.trim() ?? "";
  const apellido = body?.apellido?.trim() ?? "";

  if (nombre.length < 2 || apellido.length < 2) {
    return NextResponse.json(
      { error: "Ingresá nombre y apellido." },
      { status: 400 },
    );
  }

  const results = await searchConstancias(nombre, apellido);
  return NextResponse.json({ results });
}
