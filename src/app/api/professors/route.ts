// src/app/api/professors/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { sessionCookie, verifySession } from "@/lib/auth";

async function requireUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookie.name)?.value;
  if (!token) return null;
  try {
    return await verifySession(token);
  } catch {
    return null;
  }
}

function jsonError(msg: string, status = 400, extra?: any) {
  return NextResponse.json({ error: msg, ...(extra ? { extra } : {}) }, { status });
}

export async function GET() {
  const profs = await prisma.professor.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      createdAt: true,
      department: {
        select: {
          id: true,
          name: true,
          school: { select: { id: true, name: true } },
        },
      },
    },
  });

  return NextResponse.json({ ok: true, profs }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const session = await requireUser();
    if (!session) return jsonError("Nicht eingeloggt.", 401);

    let body: any;
    try {
      body = await req.json();
    } catch {
      return jsonError("Ungültiger JSON-Body.", 400);
    }

    const name = String(body?.name ?? "").trim();
    const schoolName = String(body?.schoolName ?? "").trim();
    const departmentName = String(body?.departmentName ?? "").trim();

    if (!name || !schoolName || !departmentName) {
      return jsonError("Bitte Name, Fachbereich und Hochschule ausfüllen.", 400);
    }

    const school = await prisma.school.upsert({
      where: { name: schoolName },
      update: {},
      create: { name: schoolName },
      select: { id: true, name: true },
    });

    const department = await prisma.department.upsert({
      where: { schoolId_name: { schoolId: school.id, name: departmentName } },
      update: {},
      create: { schoolId: school.id, name: departmentName },
      select: {
        id: true,
        name: true,
        school: { select: { id: true, name: true } },
      },
    });

    const prof = await prisma.professor.create({
      data: { name, departmentId: department.id },
      select: {
        id: true,
        name: true,
        department: {
          select: {
            id: true,
            name: true,
            school: { select: { id: true, name: true } },
          },
        },
      },
    });

    return NextResponse.json({ ok: true, prof }, { status: 200 });
  } catch (e: any) {
    // 👇 Das ist der Schlüssel: wir geben Prisma-Code/Message zurück (nur DEV)
    console.error("POST /api/professors crashed:", e);

    return jsonError("Serverfehler beim Speichern.", 500, {
      name: e?.name,
      code: e?.code,
      message: e?.message,
    });
  }
}