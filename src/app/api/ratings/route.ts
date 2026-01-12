import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { sessionCookie, verifySession } from "@/lib/auth";

const MIN_COMMENT = 20;

async function requireUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookie.name)?.value;
  if (!token) return null;
  try {
    const session = await verifySession(token);
    return session.userId as string;
  } catch {
    return null;
  }
}

function jsonError(msg: string, status = 400) {
  return NextResponse.json({ error: msg }, { status });
}

export async function POST(req: Request) {
  const userId = await requireUserId();
  if (!userId) return jsonError("Nicht eingeloggt.", 401);

  let body: any = null;
  try {
    body = await req.json();
  } catch {
    return jsonError("Ungültiger JSON-Body.", 400);
  }

  const professorId = String(body?.professorId ?? "").trim();
  const courseId = String(body?.courseId ?? "").trim();
  const stars = Number(body?.stars ?? 0);
  const comment = String(body?.comment ?? "").trim();

  if (!professorId) return jsonError("Fehlende professorId.", 400);
  if (!courseId) return jsonError("Fehlende courseId.", 400);

  if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
    return jsonError("Bitte stars (1-5) angeben.", 400);
  }
  if (comment.length < MIN_COMMENT) {
    return jsonError(`Bitte Kommentar (mind. ${MIN_COMMENT} Zeichen) angeben.`, 400);
  }

  // ✅ Upsert: pro User+Prof+Kurs nur eine Bewertung (Spam-Schutz)
  const rating = await prisma.rating.upsert({
    where: {
      userId_professorId_courseId: { userId, professorId, courseId },
    },
    update: { stars, comment },
    create: { userId, professorId, courseId, stars, comment },
    select: {
      id: true,
      stars: true,
      comment: true,
      createdAt: true,
      updatedAt: true,
      firstCreatedAt: true,
      professorId: true,
      courseId: true,
    },
  });

  return NextResponse.json({ ok: true, rating }, { status: 200 });
}