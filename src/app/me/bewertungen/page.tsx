import Link from "next/link";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { sessionCookie, verifySession } from "@/lib/auth";

async function getViewerUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookie.name)?.value;
  if (!token) return null;

  try {
    const session = await verifySession(token);
    return session.userId;
  } catch {
    return null;
  }
}

export default async function MyRatingsPage() {
  const userId = await getViewerUserId();

  if (!userId) {
    return (
      <main className="py-10">
        <h1 className="text-2xl font-extrabold text-slate-900">Meine Bewertungen</h1>
        <p className="mt-2 text-slate-600">Bitte einloggen, um deine Bewertungen zu sehen.</p>
        <Link className="mt-4 inline-block underline" href="/login">
          Zum Login
        </Link>
      </main>
    );
  }

  const ratings = await prisma.rating.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      stars: true,
      comment: true,
      createdAt: true,
      professor: { select: { id: true, name: true } },
    },
  });

  return (
    <main className="py-10">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Meine Bewertungen</h1>
          <p className="mt-1 text-sm text-slate-600">Alle Bewertungen, die du abgegeben hast.</p>
        </div>
        <Link className="text-sm font-semibold underline" href="/me">
          Zurück
        </Link>
      </div>

      {ratings.length === 0 ? (
        <p className="mt-6 text-sm text-slate-600">Noch keine Bewertungen abgegeben.</p>
      ) : (
        <ul className="mt-6 grid gap-3">
          {ratings.map((r) => (
            <li key={r.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <Link className="font-extrabold text-slate-900 hover:underline" href={`/professor/${r.professor.id}`}>
                  {r.professor.name}
                </Link>
                <div className="text-sm font-semibold text-slate-700">{r.stars}★</div>
              </div>

              {r.comment ? (
                <p className="mt-2 text-sm text-slate-700">{r.comment}</p>
              ) : (
                <p className="mt-2 text-sm text-slate-400">Kein Kommentar</p>
              )}

              <div className="mt-3 text-xs text-slate-500">
                {new Date(r.createdAt).toLocaleString("de-DE")}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}