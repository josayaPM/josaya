import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const professorId = String(body.professorId ?? "").trim();
  const name = String(body.name ?? "").trim();
  const code = String(body.code ?? "").trim() || null;

  if (!professorId || !name) {
    return NextResponse.json({ error: "professorId + name erforderlich" }, { status: 400 });
  }

  const prof = await prisma.professor.findUnique({ where: { id: professorId }, select: { id: true } });
  if (!prof) return NextResponse.json({ error: "Professor nicht gefunden" }, { status: 404 });

  const course = await prisma.course.create({
    data: { professorId, name, code },
    select: { id: true },
  });

  return NextResponse.json({ ok: true, course }, { status: 200 });
}