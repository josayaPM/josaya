import Link from "next/link";

export default function NutzungsbedingungenPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-extrabold">Nutzungsbedingungen</h1>

      <div className="mt-6 space-y-4 text-slate-700">
        <h2 className="text-xl font-bold">1. Allgemeines</h2>
        <p>
          Diese Nutzungsbedingungen regeln die Nutzung der Website campusbuddy.
          Mit der Nutzung unserer Website erklären Sie sich mit diesen Nutzungsbedingungen
          einverstanden.
        </p>

        <h2 className="pt-4 text-xl font-bold">2. Nutzung der Plattform</h2>
        <p>
          campusbuddy ist eine Plattform zur Bewertung von Professor:innen und Lehrveranstaltungen.
          Die Nutzung ist kostenlos und setzt die Einhaltung dieser Nutzungsbedingungen voraus.
        </p>

        <h2 className="pt-4 text-xl font-bold">3. Verhaltensregeln</h2>
        <ul className="list-disc space-y-1 pl-6">
          <li>Keine beleidigenden, diffamierenden oder rechtswidrigen Inhalte veröffentlichen</li>
          <li>Sachliche und konstruktive Bewertungen abgeben</li>
          <li>Privatsphäre und Rechte anderer respektieren</li>
          <li>Keine falschen oder irreführenden Informationen verbreiten</li>
        </ul>

        <h2 className="pt-4 text-xl font-bold">4. Bewertungen & Moderation</h2>
        <p>
          Bewertungen sollten fair, sachlich und konstruktiv sein. Wir behalten uns vor,
          Inhalte zu moderieren und zu entfernen, wenn sie gegen diese Regeln oder gesetzliche
          Vorgaben verstoßen.
        </p>

        <h2 className="pt-4 text-xl font-bold">5. Haftungsausschluss</h2>
        <p>
          Wir übernehmen keine Gewähr für Richtigkeit, Vollständigkeit und Aktualität der
          bereitgestellten Informationen. Die Nutzung der Plattform erfolgt auf eigenes Risiko.
        </p>

        <h2 className="pt-4 text-xl font-bold">6. Änderungen</h2>
        <p>
          Wir behalten uns vor, diese Nutzungsbedingungen jederzeit zu ändern. Änderungen werden
          auf dieser Seite bekannt gegeben.
        </p>

        <h2 className="pt-4 text-xl font-bold">7. Kontakt</h2>
        <p>E-Mail: kontakt@josaya.de</p>
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