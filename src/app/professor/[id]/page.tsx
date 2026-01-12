import Link from "next/link";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { sessionCookie, verifySession } from "@/lib/auth";
import RatingForm from "./RatingForm";
import RatingDeleteButton from "./RatingDeleteButton";
import RatingStars from "@/app/components/RatingStars";

export default async function ProfessorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Wer bin ich?
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookie.name)?.value;

  let viewerUserId: string | null = null;
  if (token) {
    try {
      const session = await verifySession(token);
      viewerUserId = session.userId;
    } catch {
      viewerUserId = null;
    }
  }

  const prof = await prisma.professor.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      courses: {
        select: {
          course: {
            select: {
              id: true,
              name: true,
              school: { select: { id: true, name: true } },
            },
          },
        },
      },
    },
  });

  if (!prof) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <Link className="text-sm underline" href="/professoren">
          ← Zurück
        </Link>
        <h1 className="mt-3 text-2xl font-extrabold">Professor nicht gefunden</h1>
      </main>
    );
  }

  // Kurse für Anzeige & fürs RatingForm (courseId selection)
  const courseList = prof.courses.map((pc) => pc.course);
  const coursesForForm = courseList.map((c) => ({
    id: c.id,
    name: c.name,
    schoolName: c.school.name,
  }));
  const hasCourses = coursesForForm.length > 0;

  // Unique Schools
  const schoolMap = new Map<string, { id: string; name: string }>();
  for (const c of courseList) schoolMap.set(c.school.id, c.school);
  const schools = Array.from(schoolMap.values());

  const ratings = await prisma.rating.findMany({
    where: { professorId: prof.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      userId: true,
      stars: true,
      comment: true,
      createdAt: true,
      updatedAt: true,
      firstCreatedAt: true,
      course: { select: { id: true, name: true } },
    },
  });

  const avg =
    ratings.length === 0
      ? null
      : ratings.reduce((s, r) => s + r.stars, 0) / ratings.length;

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <Link className="text-sm underline" href="/professoren">
        ← Zurück
      </Link>

      <h1 className="mt-3 text-3xl font-extrabold text-slate-900">{prof.name}</h1>

      <div className="mt-2 space-y-1 text-slate-600">
        {/* Schools */}
        <div className="text-sm">
          <span className="font-semibold">Universität/Hochschule:</span>{" "}
          {schools.length > 0 ? (
            schools.map((s, i) => (
              <span key={s.id}>
                <Link className="underline" href={`/hochschule/${s.id}`}>
                  {s.name}
                </Link>
                {i < schools.length - 1 ? ", " : ""}
              </span>
            ))
          ) : (
            <span className="text-slate-500">—</span>
          )}
        </div>

        {/* Courses */}
        <div className="text-sm">
          <span className="font-semibold">Kurse:</span>{" "}
          {courseList.length > 0 ? (
            courseList.map((c, i) => (
              <span key={c.id} className="text-slate-700">
                {c.name}
                {i < courseList.length - 1 ? " • " : ""}
              </span>
            ))
          ) : (
            <span className="text-slate-500">—</span>
          )}
        </div>
      </div>

      <div className="mt-4 text-sm text-slate-700">
        {avg === null ? (
          "Noch keine Bewertungen."
        ) : (
          <div className="flex items-center gap-2">
            <RatingStars value={avg} />
            <span className="font-semibold">{avg.toFixed(1)}</span>
            <span className="text-slate-500">({ratings.length})</span>
          </div>
        )}
      </div>

      {/* ✅ Bewertung abgeben: nur wenn Kurse existieren */}
      {!hasCourses ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-lg font-extrabold text-slate-900">
            Noch kein Kurs hinterlegt
          </div>
          <p className="mt-1 text-sm text-slate-600">
            Du musst erst einen Kurs anlegen, damit man den Professor pro Kurs bewerten kann.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              className="inline-flex rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              href={`/kurs-neu?profId=${prof.id}`}
            >
              + Kurs hinzufügen
            </Link>

            <span className="text-xs text-slate-500">
              Danach kannst du den Kurs im Bewertungsformular auswählen.
            </span>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-extrabold">Bewertung abgeben</h2>
          <p className="mt-1 text-sm text-slate-600">(Du musst eingeloggt sein.)</p>
          <div className="mt-4">
            {/* ✅ WICHTIG: courses prop */}
            <RatingForm professorId={prof.id} courses={coursesForForm} />
          </div>
        </div>
      )}

      <h2 className="mt-8 text-lg font-extrabold">Bewertungen</h2>

      {ratings.length === 0 ? (
        <p className="mt-3 text-slate-600">Noch keine Bewertungen.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {ratings.map((r) => {
            const originallyAt = r.firstCreatedAt ?? r.createdAt;
            const wasEdited =
              r.firstCreatedAt != null &&
              r.updatedAt != null &&
              r.updatedAt.getTime() !== originallyAt.getTime();

            return (
              <li
                key={r.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="text-lg">
                      <RatingStars value={r.stars} />
                    </div>
                    <div className="text-xs text-slate-500">
                      Kurs: <span className="text-slate-700">{r.course.name}</span>
                    </div>
                  </div>

                  {viewerUserId && viewerUserId === r.userId ? (
                    <div className="flex items-center gap-2">
                      {/* Edit Button kommt als nächstes */}
                      <RatingDeleteButton ratingId={r.id} />
                    </div>
                  ) : null}
                </div>

                <div className="mt-2 text-slate-800">{r.comment}</div>

                <div className="mt-2 text-xs text-slate-500">
                  {wasEdited ? (
                    <>
                      Ursprünglich bewertet am:{" "}
                      {new Date(originallyAt).toLocaleString("de-DE")}
                      <br />
                      Geändert am: {new Date(r.updatedAt!).toLocaleString("de-DE")}
                    </>
                  ) : (
                    <>{new Date(r.createdAt).toLocaleString("de-DE")}</>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}