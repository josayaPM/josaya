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

// Optional: Liste (für später)
export async function GET() {
  const profs = await prisma.professor.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, department: true, school: true },
  });
  return NextResponse.json({ profs }, { status: 200 });
}

// Professor erstellen (nur wenn eingeloggt)
export async function POST(req: Request) {
  const session = await requireUser();
  if (!session) {
    return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
  }

  const body = await req.json();
  const name = String(body.name ?? "").trim();
  const department = String(body.department ?? "").trim();
  const school = String(body.school ?? "").trim();

  if (!name || !department || !school) {
    return NextResponse.json(
      { error: "Bitte Name, Fachbereich und Hochschule ausfüllen." },
      { status: 400 }
    );
  }

  const prof = await prisma.professor.create({
    data: { name, department, school },
    select: { id: true, name: true, department: true, school: true },
  });

  return NextResponse.json({ ok: true, prof }, { status: 200 });
}