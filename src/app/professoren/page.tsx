import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ProfessorinnenPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  const profs = await prisma.professor.findMany({
    where: query
      ? {
          OR: [
            { name: { contains: query } },
            { department: { contains: query } },
            { school: { contains: query } },
          ],
        }
      : undefined,
    orderBy: { name: "asc" },
    select: { id: true, name: true, department: true, school: true },
  });

  return (
    <main className="py-10">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Professor:innen</h1>
          <p className="mt-1 text-sm text-slate-600">
            Suche nach Name, Fachbereich oder Hochschule.
          </p>
        </div>

        <Link
          href="/professor-neu"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
        >
          + Professor hinzufügen
        </Link>
      </div>

      <form action="/professorinnen" method="GET" className="mt-6">
        <div className="flex w-full items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          <input
            name="q"
            defaultValue={query}
            placeholder="z.B. Müller, Informatik, TU Berlin…"
            className="w-full rounded-xl px-3 py-2 text-slate-900 outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Suchen
          </button>
        </div>
      </form>

      <div className="mt-3 text-sm text-slate-600">
        {query ? (
          <>
            Treffer für <span className="font-semibold">{query}</span> ({profs.length}) •{" "}
            <Link className="underline" href="/professorinnen">
              Suche löschen
            </Link>
          </>
        ) : (
          <>Alle Professor:innen ({profs.length})</>
        )}
      </div>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {profs.map((p) => (
          <li key={p.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <Link
              href={`/professor/${p.id}`}
              className="text-base font-extrabold text-slate-900 hover:underline"
            >
              {p.name}
            </Link>
            <div className="mt-1 text-sm text-slate-600">
              {p.department} • {p.school}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}