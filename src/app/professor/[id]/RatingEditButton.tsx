"use client";

import { useState } from "react";

export default function RatingEditButton({
  ratingId,
  initialStars,
  initialComment,
  onUpdated,
}: {
  ratingId: string;
  initialStars: number;
  initialComment: string;
  onUpdated?: (updated: { stars: number; comment: string; updatedAt?: string; firstCreatedAt?: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [stars, setStars] = useState(initialStars);
  const [comment, setComment] = useState(initialComment);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function save() {
    setSaving(true);
    setErr(null);
    try {
      const res = await fetch(`/api/ratings/${ratingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stars, comment }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Fehler beim Speichern.");
      onUpdated?.({
        stars: data.rating.stars,
        comment: data.rating.comment,
        updatedAt: data.rating.updatedAt,
        firstCreatedAt: data.rating.firstCreatedAt,
      });
      setOpen(false);
    } catch (e: any) {
      setErr(e?.message ?? "Fehler.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
      >
        Bearbeiten
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-extrabold">Bewertung bearbeiten</div>
                <div className="mt-1 text-sm text-slate-600">Ändere Sterne & Kommentar.</div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                ✕
              </button>
            </div>

            <div className="mt-4">
              <label className="text-sm font-semibold text-slate-800">Sterne (1–5)</label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
                type="number"
                min={1}
                max={5}
                value={stars}
                onChange={(e) => setStars(Number(e.target.value))}
              />
            </div>

            <div className="mt-3">
              <label className="text-sm font-semibold text-slate-800">Kommentar</label>
              <textarea
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            {err ? <div className="mt-3 text-sm text-red-600">{err}</div> : null}

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                Abbrechen
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={save}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {saving ? "Speichern…" : "Speichern"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}