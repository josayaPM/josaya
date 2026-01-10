import Link from "next/link";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { sessionCookie, verifySession } from "@/lib/auth";
import RatingForm from "./RatingForm";
import RatingDeleteButton from "./RatingDeleteButton";

export default async function ProfessorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Wer bin ich? (optional)
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
    select: { id: true, name: true, department: true, school: true },
  });

  if (!prof) {
    return (
      <main style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
        <Link href="/" style={{ opacity: 0.8 }}>
          ← Zurück
        </Link>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginTop: 12 }}>
          Professor nicht gefunden
        </h1>
      </main>
    );
  }

  const ratings = await prisma.rating.findMany({
    where: { professorId: prof.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      userId: true,
      stars: true,
      comment: true,
      createdAt: true,
      user: { select: { email: true } },
    },
  });

  const avg =
    ratings.length === 0
      ? null
      : ratings.reduce((s, r) => s + r.stars, 0) / ratings.length;

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
      <Link href="/" style={{ opacity: 0.8 }}>
        ← Zurück
      </Link>

      <h1 style={{ fontSize: 28, fontWeight: 800, marginTop: 12 }}>
        {prof.name}
      </h1>
      <p style={{ marginTop: 6, opacity: 0.8 }}>
        {prof.department} • {prof.school}
      </p>

      <div style={{ marginTop: 14, opacity: 0.85 }}>
        {avg === null ? "Noch keine Bewertungen." : `Ø ${avg.toFixed(1)} / 5 (${ratings.length})`}
      </div>

      <div
        style={{
          marginTop: 18,
          border: "1px solid #eee",
          borderRadius: 12,
          padding: 14,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>
          Bewertung abgeben
        </h2>
        <p style={{ marginTop: 6, opacity: 0.75 }}>(Du musst eingeloggt sein.)</p>
        <div style={{ marginTop: 10 }}>
          <RatingForm professorId={prof.id} />
        </div>
      </div>

      <h2 style={{ marginTop: 22, fontSize: 18, fontWeight: 800 }}>
        Bewertungen
      </h2>

      {ratings.length === 0 ? (
        <p style={{ marginTop: 10, opacity: 0.75 }}>Noch keine Bewertungen.</p>
      ) : (
        <ul style={{ marginTop: 10, display: "grid", gap: 10, paddingLeft: 0 }}>
          {ratings.map((r) => (
            <li
              key={r.id}
              style={{
                listStyle: "none",
                border: "1px solid #eee",
                borderRadius: 12,
                padding: 12,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div style={{ fontWeight: 800 }}>
                  {"★".repeat(r.stars)}
                  {"☆".repeat(5 - r.stars)}
                </div>

                {viewerUserId && viewerUserId === r.userId ? (
                  <RatingDeleteButton ratingId={r.id} />
                ) : null}
              </div>

              <div style={{ marginTop: 6, opacity: 0.9 }}>{r.comment}</div>

              <div style={{ marginTop: 8, fontSize: 12, opacity: 0.6 }}>
                von {r.user.email} • {new Date(r.createdAt).toLocaleString("de-DE")}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}