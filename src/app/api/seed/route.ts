import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  const professors = [
    { id: "demo-prof", name: "Prof. Demo", department: "Informatik", school: "Demo-Uni" },
    { id: "mueller", name: "Prof. Müller", department: "Mathe", school: "Demo-Uni" },
    { id: "nguyen", name: "Prof. Nguyen", department: "BWL", school: "Demo-Uni" },
  ];

  for (const p of professors) {
    await prisma.professor.upsert({
      where: { id: p.id },
      update: { name: p.name, department: p.department, school: p.school },
      create: { id: p.id, name: p.name, department: p.department, school: p.school },
    });
  }

  const count = await prisma.professor.count();
  return NextResponse.json({ ok: true, count }, { status: 200 });
}