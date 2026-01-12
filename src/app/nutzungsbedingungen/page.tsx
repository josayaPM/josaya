import Link from "next/link";

export default function NutzungsbedingungenPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-4xl font-extrabold tracking-tight">Nutzungsbedingungen</h1>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">1. Allgemeines</h2>
        <p className="mt-3 text-slate-700">
          Diese Nutzungsbedingungen regeln die Nutzung der Website campusbuddy.
          Mit der Nutzung unserer Website erklären Sie sich mit diesen
          Nutzungsbedingungen einverstanden.
        </p>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">2. Nutzung der Plattform</h2>
        <p className="mt-3 text-slate-700">
          campusbuddy ist eine Plattform zur Bewertung von Professor:innen und
          Lehrveranstaltungen. Die Nutzung ist kostenlos und setzt die Einhaltung
          dieser Nutzungsbedingungen voraus.
        </p>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">3. Verhaltensregeln</h2>
        <p className="mt-3 text-slate-700">Bei der Nutzung verpflichten Sie sich insbesondere:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
          <li>Keine beleidigenden, diffamierenden oder rechtswidrigen Inhalte zu veröffentlichen</li>
          <li>Sachliche und konstruktive Bewertungen abzugeben</li>
          <li>Die Privatsphäre anderer Nutzer:innen und Lehrpersonen zu respektieren</li>
          <li>Keine falschen oder irreführenden Informationen zu verbreiten</li>
        </ul>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">4. Bewertungen</h2>
        <p className="mt-3 text-slate-700">
          Bewertungen sollten fair, sachlich und konstruktiv sein. Wir behalten uns
          das Recht vor, Inhalte zu moderieren und gegebenenfalls zu entfernen,
          wenn sie gegen diese Nutzungsbedingungen oder geltendes Recht verstoßen.
        </p>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">5. Haftungsausschluss</h2>
        <p className="mt-3 text-slate-700">
          Wir übernehmen keine Gewähr für die Richtigkeit, Vollständigkeit und
          Aktualität der bereitgestellten Informationen. Die Nutzung der Plattform
          erfolgt auf eigenes Risiko.
        </p>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">6. Änderungen der Nutzungsbedingungen</h2>
        <p className="mt-3 text-slate-700">
          Wir behalten uns das Recht vor, diese Nutzungsbedingungen jederzeit zu
          ändern. Die jeweils aktuelle Version wird auf dieser Seite veröffentlicht.
        </p>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">7. Kontakt</h2>
        <p className="mt-3 text-slate-700">
          Bei Fragen zu diesen Nutzungsbedingungen können Sie uns kontaktieren.
        </p>
      </section>

      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 text-base font-semibold text-slate-700 hover:text-slate-900"
      >
        <span aria-hidden>←</span> Zurück zur Startseite
      </Link>
    </main>
  );
}