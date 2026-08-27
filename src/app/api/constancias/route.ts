import { searchConstancias } from "@/lib/constancias";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { matricula?: string }
    | null;

  const matricula = body?.matricula?.trim() ?? "";
  const digits = matricula.replace(/\D/g, "");

  if (digits.length < 3) {
    return NextResponse.json(
      { error: "Ingresá el número de matrícula." },
      { status: 400 },
    );
  }

  const results = await searchConstancias(matricula);
  return NextResponse.json({ results });
}
