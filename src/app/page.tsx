import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home({
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
            { name: { contains: query, mode: "insensitive" } },
            {
              department: {
                is: { name: { contains: query, mode: "insensitive" } },
              },
            },
            {
              department: {
                is: {
                  school: {
                    is: { name: { contains: query, mode: "insensitive" } },
                  },
                },
              },
            },
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

  return (
    <main className="py-10">
      <section className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
          Bewerte deine <span className="text-blue-600">Professor:innen</span>
        </h1>

        <p className="mt-5 max-w-2xl text-pretty text-base text-slate-600 sm:text-lg">
          Hilf anderen Studierenden, bessere Entscheidungen zu treffen. Teile
          deine Erfahrungen und finde hilfreiche Bewertungen.
        </p>

        <div className="mt-8 flex w-full max-w-2xl flex-col items-center gap-3 sm:flex-row">
          <form action="/" method="GET" className="w-full">
            <div className="flex w-full items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
              <input
                name="q"
                defaultValue={query}
                placeholder="Professor / Fachbereich / Hochschule suchen…"
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

          <Link
            href="#professoren"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:w-auto"
          >
            ⭐ Jetzt bewerten
          </Link>
        </div>

        <div className="mt-8 w-full max-w-3xl rounded-2xl border border-blue-100 bg-blue-50 p-4 text-left text-sm text-blue-900">
          <div className="font-semibold">🔒 Bewertungen bleiben anonym.</div>
          <div className="mt-1 text-blue-800/90">
            Wir nutzen den Login nur, um Spam zu verhindern. Auf der Seite zeigen
            wir nicht, von wem eine Bewertung stammt.
          </div>
        </div>
      </section>

      <section id="professoren" className="mt-12">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-xl font-extrabold text-slate-900">
            Professor:innen
          </h2>
          <Link
            href="/professor-neu"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            + Professor hinzufügen
          </Link>
        </div>

        <div className="mt-2 text-sm text-slate-600">
          {query ? (
            <>
              Treffer für <span className="font-semibold">{query}</span> (
              {profs.length}) •{" "}
              <Link className="underline" href="/">
                Suche löschen
              </Link>
            </>
          ) : (
            <>Alle Professor:innen ({profs.length})</>
          )}
        </div>

        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {profs.map((p) => (
            <li
              key={p.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <Link
                href={`/professor/${p.id}`}
                className="text-base font-extrabold text-slate-900 hover:underline"
              >
                {p.name}
              </Link>

              <div className="mt-1 text-sm text-slate-600">
                {p.department.school.name}
                {p.department.name ? ` • ${p.department.name}` : ""}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="kontakt"
        className="mt-16 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h3 className="text-lg font-extrabold text-slate-900">Kontakt</h3>
        <p className="mt-2 text-sm text-slate-600">
          Feedback oder Bug gefunden? Schreib uns:{" "}
          <a className="underline" href="mailto:hello@campusbuddy.local">
            hello@campusbuddy.local
          </a>
        </p>
      </section>

      <footer className="mt-10 pb-10 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} campusbuddy
      </footer>
    </main>
  );
}