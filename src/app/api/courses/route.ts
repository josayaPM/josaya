import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { sessionCookie, verifySession } from "@/lib/auth";

async function requireUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookie.name)?.value;
  if (!token) return null;
  try {
    const session = await verifySession(token);
    return session;
  } catch {
    return null;
  }
}

function jsonError(msg: string, status = 400) {
  return NextResponse.json({ error: msg }, { status });
}

/**
 * POST /api/courses
 * Body: { profId, name, code?, schoolName }
 * - upsert School by name
 * - upsert Course by (schoolId, name)
 * - connect Professor <-> Course via ProfessorCourse
 */
export async function POST(req: Request) {
  const session = await requireUser();
  if (!session) return jsonError("Nicht eingeloggt.", 401);

  let body: any;
  try {
    body = await req.json();
  } catch {
    return jsonError("Ungültiger JSON-Body.", 400);
  }

  const profId = String(body?.profId ?? "").trim();
  const name = String(body?.name ?? "").trim();
  const code = body?.code ? String(body.code).trim() : null;
  const schoolName = String(body?.schoolName ?? "").trim();

  if (!profId) return jsonError("Fehlende profId.", 400);
  if (name.length < 3) return jsonError("Bitte Kursname (mind. 3 Zeichen) angeben.", 400);
  if (schoolName.length < 2) return jsonError("Bitte Universität/Hochschule angeben.", 400);

  const prof = await prisma.professor.findUnique({
    where: { id: profId },
    select: { id: true },
  });
  if (!prof) return jsonError("Professor nicht gefunden.", 404);

  // 1) School upsert (kein createdAt select!)
  const school = await prisma.school.upsert({
    where: { name: schoolName },
    update: {},
    create: { name: schoolName },
    select: { id: true, name: true },
  });

  // 2) Course upsert by unique(schoolId, name)
  const course = await prisma.course.upsert({
    where: { schoolId_name: { schoolId: school.id, name } },
    update: { code: code ?? undefined },
    create: { name, code, schoolId: school.id },
    select: { id: true, name: true },
  });

  // 3) Link Professor <-> Course
  await prisma.professorCourse.upsert({
    where: { professorId_courseId: { professorId: profId, courseId: course.id } },
    update: {},
    create: { professorId: profId, courseId: course.id },
    select: { professorId: true, courseId: true },
  });

  return NextResponse.json({ ok: true, course, school }, { status: 200 });
}