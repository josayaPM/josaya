import Link from "next/link";
import { demoProfessors } from "@/lib/demoData";

export default function Home() {
  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 800 }}>campusbuddy</h1>
          <p style={{ marginTop: 6, opacity: 0.8 }}>
            Professoren bewerten – MVP (Demo-Daten).
          </p>
        </div>
        <nav style={{ display: "flex", gap: 10 }}>
          <Link href="/hochschule/demo-uni">Hochschule</Link>
        </nav>
      </header>

      <div style={{ marginTop: 24 }}>
        <input
          placeholder="Professor suchen…"
          style={{
            width: "100%",
            padding: 12,
            border: "1px solid #ccc",
            borderRadius: 8,
          }}
        />
      </div>

      <h2 style={{ marginTop: 28, fontSize: 20, fontWeight: 700 }}>
        Professoren
      </h2>

      <ul style={{ marginTop: 12, display: "grid", gap: 10, paddingLeft: 0 }}>
        {demoProfessors.map((p) => (
          <li
            key={p.id}
            style={{
              listStyle: "none",
              border: "1px solid #eee",
              borderRadius: 10,
              padding: 14,
            }}
          >
            <Link
              href={`/professor/${p.id}`}
              style={{ fontWeight: 700, textDecoration: "none" }}
            >
              {p.name}
            </Link>
            <div style={{ fontSize: 14, opacity: 0.7 }}>
              {p.department} • {p.school}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}