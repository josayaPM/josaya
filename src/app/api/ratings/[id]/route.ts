// src/app/api/ratings/[id]/route.ts
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

/**
 * DELETE /api/ratings/[id]
 * Löscht eine Bewertung (nur Owner)
 */
export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const userId = await requireUserId();
  if (!userId) return jsonError("Nicht eingeloggt.", 401);

  const { id } = await ctx.params;
  if (!id) return jsonError("Fehlende ID.", 400);

  const rating = await prisma.rating.findUnique({
    where: { id },
    select: { id: true, userId: true },
  });

  if (!rating) return jsonError("Bewertung nicht gefunden.", 404);
  if (rating.userId !== userId) return jsonError("Keine Berechtigung.", 403);

  await prisma.rating.delete({ where: { id } });

  return NextResponse.json({ ok: true }, { status: 200 });
}

/**
 * PATCH /api/ratings/[id]
 * Body: { stars: number (1-5), comment: string (>=20) }
 *
 * Speichert:
 * - firstCreatedAt: ursprünglicher Zeitpunkt (wird beim ersten Edit gesetzt)
 * - updatedAt: wird automatisch gesetzt, wenn du @updatedAt im Schema hast
 */
export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const userId = await requireUserId();
  if (!userId) return jsonError("Nicht eingeloggt.", 401);

  const { id } = await ctx.params;
  if (!id) return jsonError("Fehlende ID.", 400);

  let body: any;
  try {
    body = await req.json();
  } catch {
    return jsonError("Ungültiger JSON-Body.", 400);
  }

  const stars = Number(body?.stars ?? 0);
  const comment = String(body?.comment ?? "").trim();

  if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
    return jsonError("Bitte stars (1-5) angeben.", 400);
  }
  if (comment.length < MIN_COMMENT) {
    return jsonError(`Bitte Kommentar (mind. ${MIN_COMMENT} Zeichen) angeben.`, 400);
  }

  const existing = await prisma.rating.findUnique({
    where: { id },
    select: { id: true, userId: true, createdAt: true, firstCreatedAt: true },
  });

  if (!existing) return jsonError("Bewertung nicht gefunden.", 404);
  if (existing.userId !== userId) return jsonError("Keine Berechtigung.", 403);

  // Beim ersten Edit: ursprüngliche Zeit sichern
  const firstCreatedAt = existing.firstCreatedAt ?? existing.createdAt;

  const updated = await prisma.rating.update({
    where: { id },
    data: {
      stars,
      comment,
      firstCreatedAt, // bleibt danach fix
      // updatedAt setzt Prisma automatisch (wenn @updatedAt im Schema)
    },
    select: {
      id: true,
      stars: true,
      comment: true,
      createdAt: true,
      firstCreatedAt: true,
      updatedAt: true,
      professorId: true,
      // courseId: true, // falls vorhanden
    },
  });

  return NextResponse.json({ ok: true, rating: updated }, { status: 200 });
}