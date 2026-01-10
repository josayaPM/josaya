"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfessorNeuPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [school, setSchool] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!name.trim() || !department.trim() || !school.trim()) {
      setMsg("Bitte alle Felder ausfüllen.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/professors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, department, school }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setMsg(data?.error ?? "Fehler");
      return;
    }

    // Weiterleitung zur neuen Professor-Seite
    router.push(`/professor/${data.prof.id}`);
    router.refresh();
  }

  return (
    <main style={{ maxWidth: 520, margin: "40px auto", padding: 16 }}>
      <h1 style={{ fontSize: 26, fontWeight: 800 }}>Professor hinzufügen</h1>

      <form onSubmit={submit} style={{ marginTop: 16, display: "grid", gap: 10 }}>
        <input
          placeholder="Name (z.B. Prof. Mustermann)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: 12, border: "1px solid #ccc", borderRadius: 10 }}
        />
        <input
          placeholder="Fachbereich (z.B. Informatik)"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={{ padding: 12, border: "1px solid #ccc", borderRadius: 10 }}
        />
        <input
          placeholder="Hochschule (z.B. TU Berlin)"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          style={{ padding: 12, border: "1px solid #ccc", borderRadius: 10 }}
        />

        <button
          disabled={loading}
          style={{
            padding: 12,
            borderRadius: 10,
            border: "1px solid #111",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {loading ? "..." : "Speichern"}
        </button>
      </form>

      {msg && <p style={{ marginTop: 12, color: "crimson" }}>{msg}</p>}

      <p style={{ marginTop: 14, fontSize: 13, opacity: 0.7 }}>
        Hinweis: Du musst eingeloggt sein.
      </p>
    </main>
  );
}