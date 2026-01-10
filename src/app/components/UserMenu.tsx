"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function UserMenu({ email }: { email: string | null }) {
  const label = useMemo(() => {
    if (!email) return "Profil";
    // kurz anzeigen
    return email.length > 24 ? email.slice(0, 21) + "…" : email;
  }, [email]);

  // kleine UX: beim ESC schließen
  const [open, setOpen] = useState(false);
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!email) {
    return (
      <Link
        href="/login"
        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
      >
        Anmelden
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label} ▾
      </button>

      {open ? (
        <div
          className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg"
          role="menu"
        >
          <Link
            href="/me"
            className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            Mein Bereich
          </Link>
          <Link
            href="/me/bewertungen"
            className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            Meine Bewertungen
          </Link>
          <Link
            href="/me/nachrichten"
            className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            Nachrichten
          </Link>

          <div className="my-2 h-px bg-slate-200" />

          <form action="/api/auth/logout" method="POST" className="m-0">
            <button
              type="submit"
              className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Logout
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}