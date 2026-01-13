// src/app/professor-neu/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfessorNeuPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [schoolName, setSchoolName] = useState("");

  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    const n = name.trim();
    const d = departmentName.trim();
    const s = schoolName.trim();

    if (!n || !d || !s) {
      setMsg("Bitte Name, Fachbereich und Hochschule ausfüllen.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/professors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: n, departmentName: d, schoolName: s }),
    });

    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setMsg(data?.error ?? `Fehler beim Speichern (Status ${res.status})`);
      return;
    }

    // Erfolg
    const id = data?.prof?.id as string | undefined;
    if (id) router.push(`/professor/${id}`);
    else router.push("/professoren");
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <Link className="text-sm underline" href="/professoren">
        ← Zurück
      </Link>

      <h1 className="mt-4 text-4xl font-extrabold text-slate-900">
        Professor hinzufügen
      </h1>

      <form onSubmit={onSubmit} className="mt-8 grid gap-5">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name (z.B. Prof. Mustermann)"
          className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-lg shadow-sm outline-none"
        />

        <input
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          placeholder="Fachbereich (z.B. Informatik)"
          className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-lg shadow-sm outline-none"
        />

        <input
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
          placeholder="Hochschule / Universität (z.B. TU Berlin)"
          className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-lg shadow-sm outline-none"
        />

        <button
          disabled={loading}
          className="mt-2 rounded-2xl border border-slate-900 bg-white px-5 py-4 text-lg font-extrabold shadow-sm hover:bg-slate-50 disabled:opacity-60"
        >
          {loading ? "Speichern..." : "Speichern"}
        </button>

        {msg ? (
          <div className={`text-sm font-semibold ${msg.includes("✅") ? "text-green-600" : "text-red-600"}`}>
            {msg}
          </div>
        ) : null}

        <div className="text-sm text-slate-600">Hinweis: Du musst eingeloggt sein.</div>
      </form>
    </main>
  );
}