import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, signSession, sessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");

    if (!email || !password || password.length < 6) {
      return NextResponse.json(
        { error: "Bitte Email und Passwort (mind. 6 Zeichen) angeben." },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: { email, passwordHash },
      select: { id: true, email: true },
    });

    const token = await signSession({ userId: user.id, email: user.email });

    const res = NextResponse.json({ ok: true, user });
    res.cookies.set(sessionCookie.name, token, {
      ...sessionCookie.options,
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (e: any) {
    if (e?.code === "P2002") {
      return NextResponse.json(
        { error: "Email ist schon registriert." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Serverfehler." }, { status: 500 });
  }
}