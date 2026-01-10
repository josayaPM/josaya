import Link from "next/link";
import { getDemoProfessorById } from "@/lib/demoData";

export default async function ProfessorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prof = getDemoProfessorById(id);

  if (!prof) {
    return (
      <main style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
        <Link href="/" style={{ opacity: 0.8 }}>
          ← Zurück
        </Link>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginTop: 12 }}>
          Professor nicht gefunden
        </h1>
        <p style={{ marginTop: 8, opacity: 0.75 }}>
          Keine Demo-Daten für: <b>{id}</b>
        </p>
      </main>
    );
  }

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

      <h2 style={{ marginTop: 22, fontSize: 18, fontWeight: 700 }}>
        Bewertungen
      </h2>
      <ul style={{ marginTop: 10, display: "grid", gap: 10, paddingLeft: 0 }}>
        {["Sehr fair und klar", "Anspruchsvoll, aber hilfreich"].map((t) => (
          <li
            key={t}
            style={{
              listStyle: "none",
              border: "1px solid #eee",
              borderRadius: 12,
              padding: 12,
            }}
          >
            <div style={{ fontWeight: 800 }}>★★★★☆</div>
            <div style={{ marginTop: 6, opacity: 0.85 }}>{t}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}