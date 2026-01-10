import Link from "next/link";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { sessionCookie, verifySession } from "@/lib/auth";

export default async function BenachrichtigungenPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookie.name)?.value;

  if (!token) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-2xl font-bold">Postfach</h1>
        <p className="mt-2 text-slate-600">Du bist nicht eingeloggt.</p>
        <Link className="mt-4 inline-block underline" href="/login">
          Zum Login
        </Link>
      </main>
    );
  }

  let userId: string;
  try {
    const session = await verifySession(token);
    userId = session.userId;
  } catch {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-2xl font-bold">Postfach</h1>
        <p className="mt-2 text-slate-600">Session abgelaufen. Bitte neu einloggen.</p>
        <Link className="mt-4 inline-block underline" href="/login">
          Zum Login
        </Link>
      </main>
    );
  }

  const items = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      id: true,
      title: true,
      body: true,
      href: true,
      readAt: true,
      createdAt: true,
    },
  });

  const unreadCount = items.filter((n) => !n.readAt).length;

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Postfach</h1>
          <p className="mt-1 text-slate-600">
            {unreadCount > 0 ? `${unreadCount} ungelesen` : "Alles gelesen"}
          </p>
        </div>
        <Link className="text-sm underline" href="/me">
          Zurück
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 text-slate-600">
          Noch keine Benachrichtigungen.
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {items.map((n) => (
            <li
              key={n.id}
              className={`rounded-xl border border-slate-200 bg-white p-4 ${
                n.readAt ? "opacity-80" : "ring-1 ring-blue-200"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold">{n.title}</div>
                  {n.body ? (
                    <div className="mt-1 text-sm text-slate-600">{n.body}</div>
                  ) : null}
                  <div className="mt-2 text-xs text-slate-500">
                    {new Date(n.createdAt).toLocaleString("de-DE")}
                    {!n.readAt ? " • ungelesen" : ""}
                  </div>
                </div>

                {n.href ? (
                  <Link
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50"
                    href={n.href}
                  >
                    Öffnen
                  </Link>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}