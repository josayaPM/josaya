"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function KursNeuPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const profId = sp.get("profId") ?? "";

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMsg(null);
  }, [name, code, schoolName]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!profId) {
      setMsg("Fehlende profId in der URL.");
      return;
    }
    if (name.trim().length < 3) {
      setMsg("Bitte Kursname (mind. 3 Zeichen) angeben.");
      return;
    }
    if (schoolName.trim().length < 2) {
      setMsg("Bitte Universität/Hochschule angeben.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profId,
        name: name.trim(),
        code: code.trim() || null,
        schoolName: schoolName.trim(),
      }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setMsg(data?.error ?? `Fehler (Status ${res.status})`);
      return;
    }

    // zurück zum Professor
    router.push(`/professor/${profId}`);
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <Link className="text-sm underline" href={profId ? `/professor/${profId}` : "/professoren"}>
        ← Zurück
      </Link>

      <h1 className="mt-3 text-3xl font-extrabold text-slate-900">Kurs hinzufügen</h1>
      <p className="mt-1 text-sm text-slate-600">
        Lege einen Kurs an und verknüpfe ihn mit einem Professor und einer Universität/Hochschule.
      </p>

      <form onSubmit={submit} className="mt-6 grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-800">Kursname</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="z.B. Buchführung"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-800">Kurs-Code (optional)</span>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="z.B. BWL-101"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-800">Universität / Hochschule</span>
          <input
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            placeholder="z.B. HTW Berlin"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm outline-none"
          />
        </label>

        <button
          disabled={loading}
          className="mt-2 rounded-2xl border border-slate-900 bg-white px-5 py-3 font-extrabold hover:bg-slate-50 disabled:opacity-60"
        >
          {loading ? "..." : "Speichern"}
        </button>

        {msg ? (
          <div className={`text-sm ${msg.includes("✅") ? "text-green-700" : "text-red-600"}`}>
            {msg}
          </div>
        ) : null}
      </form>
    </main>
  );
}