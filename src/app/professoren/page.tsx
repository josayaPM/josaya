import Link from "next/link";
import { prisma } from "@/lib/prisma";
import RatingStars from "@/app/components/RatingStars";

function ratingColorClass(v: number) {
  if (v <= 1) return "text-red-600";
  if (v <= 2) return "text-orange-500";
  if (v <= 3) return "text-yellow-500";
  if (v < 4.5) return "text-green-500";
  return "text-emerald-700";
}

export default async function ProfessorenPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  // 1) Professor:innen (mit Department + School) laden
  const profsRaw = await prisma.professor.findMany({
    where: query
      ? {
          OR: [
            { name: { contains: query } },
            { department: { name: { contains: query } } },
            { department: { school: { name: { contains: query } } } },
          ],
        }
      : undefined,
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      department: {
        select: {
          name: true,
          school: { select: { name: true } },
        },
      },
    },
  });

  // 2) Rating-Stats (avg + count) in einem Rutsch holen
  const profIds = profsRaw.map((p) => p.id);

  const stats =
    profIds.length > 0
      ? await prisma.rating.groupBy({
          by: ["professorId"],
          where: { professorId: { in: profIds } },
          _avg: { stars: true },
          _count: { _all: true },
        })
      : [];

  const statsMap = new Map(
    stats.map((s) => [
      s.professorId,
      { avg: s._avg.stars ?? 0, count: s._count._all ?? 0 },
    ])
  );

  const profs = profsRaw.map((p) => {
    const st = statsMap.get(p.id) ?? { avg: 0, count: 0 };
    return {
      ...p,
      avgStars: st.avg,
      ratingCount: st.count,
    };
  });

  return (
    <main className="py-10">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Professor:innen
          </h1>
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

      <form action="/professoren" method="GET" className="mt-6">
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
            Treffer für <span className="font-semibold">{query}</span> (
            {profs.length}) •{" "}
            <Link className="underline" href="/professoren">
              Suche löschen
            </Link>
          </>
        ) : (
          <>Alle Professor:innen ({profs.length})</>
        )}
      </div>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {profs.map((p) => (
          <li
            key={p.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <Link
                href={`/professor/${p.id}`}
                className="text-base font-extrabold text-slate-900 hover:underline"
              >
                {p.name}
              </Link>

              {p.ratingCount > 0 ? (
                <div className="flex items-center gap-2">
                  <RatingStars value={p.avgStars} size="sm" />
                  <span
                    className={`text-sm font-extrabold ${ratingColorClass(
                      p.avgStars
                    )}`}
                    title={`${p.avgStars.toFixed(1)} / 5`}
                  >
                    {p.avgStars.toFixed(1)}
                  </span>
                  <span className="text-xs text-slate-500">
                    ({p.ratingCount})
                  </span>
                </div>
              ) : (
                <span className="text-xs font-semibold text-slate-400">neu</span>
              )}
            </div>

            <div className="mt-2 text-sm text-slate-600">
              {p.department.school.name}
              {p.department.name ? ` • ${p.department.name}` : ""}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}