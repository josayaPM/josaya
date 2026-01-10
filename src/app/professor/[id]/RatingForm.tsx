"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RatingForm({ professorId }: { professorId: string }) {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user))
      .catch(() => setUser(null));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (comment.trim().length < 3) {
      setMsg("Kommentar ist zu kurz (mind. 3 Zeichen).");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ professorId, stars, comment }),
    });

    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setMsg(data?.error ?? "Fehler");
      return;
    }

    setComment("");
    setMsg("Gespeichert ✅");
    router.refresh();
  }

  if (!user) {
    return (
      <div style={{ fontSize: 14 }}>
        Bitte <Link href="/login">einloggen</Link> oder{" "}
        <Link href="/register">registrieren</Link>, um zu bewerten.
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
      <div style={{ fontSize: 14, opacity: 0.8 }}>Eingeloggt als {user.email}</div>

      <label style={{ display: "grid", gap: 6 }}>
        <span style={{ fontWeight: 700 }}>Sterne</span>
        <select
          value={stars}
          onChange={(e) => setStars(Number(e.target.value))}
          style={{ padding: 10, border: "1px solid #ccc", borderRadius: 10 }}
        >
          <option value={5}>5 – Top</option>
          <option value={4}>4</option>
          <option value={3}>3</option>
          <option value={2}>2</option>
          <option value={1}>1 – Schlecht</option>
        </select>
      </label>

      <label style={{ display: "grid", gap: 6 }}>
        <span style={{ fontWeight: 700 }}>Kommentar</span>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Kurz ehrlich schreiben… (mind. 3 Zeichen)"
          rows={4}
          style={{ padding: 10, border: "1px solid #ccc", borderRadius: 10 }}
        />
      </label>

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
        {loading ? "..." : "Bewertung speichern"}
      </button>

      {msg && <div style={{ color: msg.includes("✅") ? "green" : "crimson" }}>{msg}</div>}
    </form>
  );
}