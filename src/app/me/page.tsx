import Link from "next/link";
import { cookies } from "next/headers";
import { sessionCookie, verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function MePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookie.name)?.value;

  if (!token) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-2xl font-bold">Mein Bereich</h1>
        <p className="mt-2 text-slate-600">Du bist nicht eingeloggt.</p>
        <Link className="mt-4 inline-block underline" href="/login">
          Zum Login
        </Link>
      </main>
    );
  }

  let email: string | null = null;
  try {
    const session = await verifySession(token);
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { email: true },
    });
    email = user?.email ?? null;
  } catch {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-2xl font-bold">Mein Bereich</h1>
        <p className="mt-2 text-slate-600">Session abgelaufen. Bitte neu einloggen.</p>
        <Link className="mt-4 inline-block underline" href="/login">
          Zum Login
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Mein Bereich</h1>
          <p className="mt-1 text-slate-600">{email}</p>
        </div>
        <Link className="text-sm underline" href="/">
          Zurück
        </Link>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Link
          href="/me/bewertungen"
          className="rounded-2xl border border-slate-200 bg-white p-5 hover:bg-slate-50"
        >
          <div className="text-sm font-semibold text-slate-900">Meine Bewertungen</div>
          <div className="mt-1 text-sm text-slate-600">Deine abgegebenen Ratings verwalten.</div>
        </Link>

        <Link
          href="/me/nachrichten"
          className="rounded-2xl border border-slate-200 bg-white p-5 hover:bg-slate-50"
        >
          <div className="text-sm font-semibold text-slate-900">Nachrichten</div>
          <div className="mt-1 text-sm text-slate-600">Direkte Nachrichten (kommt als nächstes).</div>
        </Link>
      </div>
    </main>
  );
}