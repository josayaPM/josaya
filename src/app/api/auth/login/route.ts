import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signSession, sessionCookie, verifyPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");

    if (!email || !password) {
      return NextResponse.json(
        { error: "Bitte Email und Passwort angeben." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, passwordHash: true },
    });

    if (!user) {
      return NextResponse.json({ error: "Login fehlgeschlagen." }, { status: 401 });
    }

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: "Login fehlgeschlagen." }, { status: 401 });
    }

    const token = await signSession({ userId: user.id, email: user.email });

    const res = NextResponse.json({ ok: true, user: { id: user.id, email: user.email } });
    res.cookies.set(sessionCookie.name, token, {
      ...sessionCookie.options,
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Serverfehler." }, { status: 500 });
  }
}