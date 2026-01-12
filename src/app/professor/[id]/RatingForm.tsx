"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MIN_COMMENT = 20;
const BOOST_COMMENT = 40;

type CourseOption = {
  id: string;
  name: string;
  schoolName: string;
};

export default function RatingForm({
  professorId,
  courses,
}: {
  professorId: string;
  courses: CourseOption[];
}) {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);

  const [courseId, setCourseId] = useState<string>(courses?.[0]?.id ?? "");
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const trimmedLen = useMemo(() => comment.trim().length, [comment]);
  const belowMin = trimmedLen > 0 && trimmedLen < MIN_COMMENT;

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user))
      .catch(() => setUser(null));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!courseId) {
      setMsg("Bitte erst einen Kurs auswählen.");
      return;
    }
    if (comment.trim().length < MIN_COMMENT) {
      setMsg(`Bitte mindestens ${MIN_COMMENT} Zeichen schreiben (damit es anderen hilft).`);
      return;
    }

    setLoading(true);

    const res = await fetch("/api/ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ professorId, courseId, stars, comment }),
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
        <span style={{ fontWeight: 700 }}>Kurs</span>
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          style={{ padding: 10, border: "1px solid #ccc", borderRadius: 10 }}
        >
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} • {c.schoolName}
            </option>
          ))}
        </select>
      </label>

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
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
          <span style={{ fontWeight: 700 }}>Kommentar</span>
          <span
            style={{
              fontSize: 12,
              opacity: 0.75,
              color: belowMin ? "crimson" : trimmedLen >= BOOST_COMMENT ? "green" : "#64748b",
            }}
            title={
              trimmedLen >= BOOST_COMMENT
                ? "Nice – das hilft anderen richtig!"
                : `Mindestens ${MIN_COMMENT} Zeichen. Ab ${BOOST_COMMENT} Zeichen besonders hilfreich.`
            }
          >
            {trimmedLen}/{BOOST_COMMENT}
          </span>
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={`Kurz ehrlich schreiben… (mind. ${MIN_COMMENT} Zeichen)`}
          rows={4}
          style={{
            padding: 10,
            border: belowMin ? "1px solid crimson" : "1px solid #ccc",
            borderRadius: 10,
          }}
        />

        <div style={{ fontSize: 12, opacity: 0.75, color: "#64748b" }}>
          Tipp: Ab <b>{BOOST_COMMENT}</b> Zeichen ist es für andere meist deutlich hilfreicher.
        </div>
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