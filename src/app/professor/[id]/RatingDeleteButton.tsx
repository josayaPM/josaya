"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RatingDeleteButton({ ratingId }: { ratingId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function del() {
    if (!confirm("Bewertung wirklich löschen?")) return;

    setLoading(true);
    const res = await fetch(`/api/ratings/${ratingId}`, { method: "DELETE" });
    setLoading(false);

    if (!res.ok) {
      alert("Löschen hat nicht geklappt.");
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={del}
      disabled={loading}
      style={{
        padding: "6px 10px",
        borderRadius: 10,
        border: "1px solid #111",
        background: "transparent",
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      {loading ? "..." : "Löschen"}
    </button>
  );
}