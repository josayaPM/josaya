import Link from "next/link";

export default function RechtlicheGrundlagePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-extrabold">Rechtliche Grundlage</h1>

      <div className="mt-6 space-y-4 text-slate-700">
        <h2 className="text-xl font-bold">Warum Bewertungen zulässig sein können</h2>
        <p>
          Bewertungen von Lehrveranstaltungen und Lehrpersonen können unter die
          Meinungsfreiheit (Art. 5 GG) fallen, sofern sie als Meinungsäußerung
          erkennbar sind und keine unzulässigen Inhalte (z. B. Beleidigungen,
          unwahre Tatsachenbehauptungen) enthalten.
        </p>

        <h2 className="pt-4 text-xl font-bold">Sachliche Kritik vs. Tatsachenbehauptungen</h2>
        <p>
          Zulässig ist in der Regel sachliche Kritik. Unzulässig können insbesondere
          beleidigende Inhalte oder nachweislich falsche Tatsachenbehauptungen sein.
        </p>

        <h2 className="pt-4 text-xl font-bold">Moderation & Meldung</h2>
        <p>
          Wir setzen Regeln zur Nutzung durch und prüfen gemeldete Inhalte. Bei Hinweisen
          auf Rechtsverletzungen entfernen wir Inhalte im Rahmen der gesetzlichen Vorgaben
          zeitnah.
        </p>

        <h2 className="pt-4 text-xl font-bold">Hinweis</h2>
        <p className="text-slate-600">
          Diese Seite stellt keine Rechtsberatung dar.
        </p>
      </div>

      <Link className="mt-8 inline-block underline" href="/">
        Zurück zur Startseite
      </Link>
      <div className="mt-10 flex justify-center">
  <Link
    href="/"
    className="rounded-2xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-blue-700"
  >
    Zurück zur Startseite
  </Link>
</div>
    </main>
  );
}