import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { sessionCookie, verifySession } from "@/lib/auth";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookie.name)?.value;
  if (!token) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  let userId: string;
  try {
    const session = await verifySession(token);
    userId = session.userId;
  } catch {
    return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
  }

  const body = await req.json();
  const professorId = String(body.professorId ?? "");
  const stars = Number(body.stars ?? 0);
  const comment = String(body.comment ?? "").trim();

  if (!professorId || !Number.isInteger(stars) || stars < 1 || stars > 5 || comment.length < 3) {
    return NextResponse.json(
      { error: "Bitte stars (1-5) + Kommentar (mind. 3 Zeichen)." },
      { status: 400 }
    );
  }

  const prof = await prisma.professor.findUnique({
    where: { id: professorId },
    select: { id: true, name: true },
  });
  if (!prof) return NextResponse.json({ error: "Professor nicht gefunden." }, { status: 404 });

  const rating = await prisma.rating.create({
    data: { professorId, userId, stars, comment },
    select: { id: true, stars: true, comment: true, createdAt: true },
  });

  return NextResponse.json({ ok: true, rating }, { status: 200 });
}