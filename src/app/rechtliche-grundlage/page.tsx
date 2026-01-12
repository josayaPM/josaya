import Link from "next/link";

export default function RechtlicheGrundlagePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-4xl font-extrabold tracking-tight">Rechtliche Grundlage</h1>
      <p className="mt-3 text-slate-600">
        Warum Bewertungen von Professor:innen rechtlich zulässig sind – in Kurzform,
        verständlich und transparent.
      </p>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">Meinungsfreiheit und öffentliches Interesse</h2>
        <p className="mt-3 text-slate-700">
          Professor:innen sind Personen des öffentlichen Lebens, die eine besondere
          Rolle in der Gesellschaft einnehmen. Als Lehrende an (häufig) öffentlichen
          Einrichtungen sind sie Teil des öffentlichen Diskurses und unterliegen
          damit einer erhöhten öffentlichen Aufmerksamkeit.
        </p>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">Vergleich mit etablierten Bewertungsplattformen</h2>
        <p className="mt-3 text-slate-700">
          Ähnlich wie bei Trustpilot, wo Unternehmen und Dienstleister bewertet
          werden können, ist es auch bei Professor:innen zulässig, deren Lehrtätigkeit
          zu bewerten. Die Rechtsprechung hat in zahlreichen Fällen bestätigt, dass
          Bewertungsplattformen einen wichtigen Beitrag zur Transparenz und zum
          Verbraucherschutz leisten.
        </p>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">Rechtliche Grundlagen</h2>
        <div className="mt-5 space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="font-semibold">Art. 5 GG (Meinungsfreiheit)</div>
            <div className="mt-2 text-slate-700">
              Das Grundrecht auf freie Meinungsäußerung schützt auch Bewertungen und
              Kritik, solange sie sachlich und nicht beleidigend sind.
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="font-semibold">§ 823 BGB (Persönlichkeitsrecht)</div>
            <div className="mt-2 text-slate-700">
              Das Persönlichkeitsrecht von Professor:innen wird durch sachliche Bewertungen
              nicht verletzt, da diese im öffentlichen Interesse liegen.
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="font-semibold">Hochschulgesetze</div>
            <div className="mt-2 text-slate-700">
              Die Bewertung von Lehre ist ein wichtiger Bestandteil der Qualitätssicherung an
              Hochschulen und wird von den Hochschulgesetzen der Länder unterstützt.
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">Qualitätssicherung und Transparenz</h2>
        <p className="mt-3 text-slate-700">
          Die Bewertung von Lehre dient nicht nur der Meinungsfreiheit, sondern auch
          der Qualitätssicherung im Hochschulbereich. Studierende haben ein berechtigtes
          Interesse daran, sich über die Qualität der Lehre zu informieren, ähnlich wie
          Verbraucher:innen bei der Auswahl von Produkten oder Dienstleistungen.
        </p>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">Verantwortungsvoller Umgang</h2>
        <p className="mt-3 text-slate-700">Wir legen großen Wert auf einen verantwortungsvollen Umgang:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
          <li>Alle Bewertungen müssen von verifizierten Studierenden stammen</li>
          <li>Beleidigungen und unsachliche Kritik werden nicht toleriert</li>
          <li>Professor:innen haben die Möglichkeit, auf Bewertungen zu reagieren</li>
          <li>Wir prüfen Inhalte auf Einhaltung unserer Richtlinien</li>
        </ul>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">Recht auf Information und Auskunft</h2>
        <p className="mt-3 text-slate-700">
          Bewertungen sind ausschließlich durch verifizierte Studierende mit gültiger
          Hochschul-E-Mail-Adresse möglich. Eine anonyme Teilnahme ist nicht möglich.
        </p>
        <p className="mt-4 text-slate-700">
          Für jede bewertbare Lehrperson wird die offizielle dienstliche E-Mail-Adresse
          gespeichert, um Informations- und Auskunftsansprüche gemäß Art. 12 ff. DSGVO
          erfüllen zu können.
        </p>
        <p className="mt-4 text-slate-700">
          Lehrpersonen können jederzeit Einsicht in alle sie betreffenden Bewertungen beantragen.
          Die Übermittlung erfolgt auf sicherem, elektronischem Weg. Eine postalische
          Benachrichtigung ist nicht erforderlich.
        </p>
        <p className="mt-4 text-slate-700">
          Alle Inhalte sind von der Meinungsfreiheit nach Art. 5 GG gedeckt. Es werden keine
          personenbezogenen Daten veröffentlicht und keine Bewertungen zugelassen, die gegen
          Persönlichkeitsrechte oder andere gesetzliche Bestimmungen verstoßen.
        </p>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">Fazit</h2>
        <p className="mt-3 text-slate-700">
          Die Bewertung von Professor:innen ist rechtlich zulässig und ein Beitrag zur Transparenz
          und Qualitätssicherung im Hochschulbereich. Ähnlich wie bei anderen Bewertungsplattformen
          besteht ein berechtigtes öffentliches Interesse, das durch die Meinungsfreiheit geschützt ist.
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