import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { sessionCookie, verifySession } from "@/lib/auth";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

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

  const rating = await prisma.rating.findUnique({
    where: { id },
    select: { id: true, userId: true },
  });

  if (!rating) {
    return NextResponse.json({ error: "Bewertung nicht gefunden." }, { status: 404 });
  }

  if (rating.userId !== userId) {
    return NextResponse.json({ error: "Nicht erlaubt." }, { status: 403 });
  }

  await prisma.rating.delete({ where: { id } });
  return NextResponse.json({ ok: true }, { status: 200 });
}