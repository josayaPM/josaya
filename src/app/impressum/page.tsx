import Link from "next/link";

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-4xl font-extrabold tracking-tight">Impressum</h1>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">Angaben gemäß § 5 TMG</h2>

        <div className="mt-6 space-y-6 text-slate-700">
          <div>
            <div className="font-semibold">Verantwortlich für den Inhalt:</div>
            <div>Sarban Wahab</div>
            <div>Allee der Kosmonauten 24</div>
            <div>12681 Berlin</div>
            <div>Germany</div>
          </div>

          <div>
            <div className="font-semibold">Kontakt:</div>
            <div>E-Mail: kontakt@josaya.de</div>
          </div>

          <div>
            <div className="font-semibold">Umsatzsteuer-ID:</div>
            <div>DE123456789</div>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
            <div className="font-semibold">Hinweis:</div>
            <div>Keine Pakete oder Päckchen - Annahme wird verweigert!</div>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold">Haftung für Inhalte</h2>
        <p className="mt-3 text-slate-700">
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf
          diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8
          bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
          übermittelte oder gespeicherte fremde Informationen zu überwachen oder
          nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
          hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
          Informationen nach den allgemeinen Gesetzen bleiben hiervon
          unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
          der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
          Bekanntwerden von entsprechenden Rechtsverletzungen, insbesondere wenn
          Sie uns unter kontakt@josaya.de kontaktieren, werden wir diese Inhalte
          umgehend entfernen.
        </p>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold">Haftung für Links</h2>
        <p className="mt-3 text-slate-700">
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
          Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
          Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
          verantwortlich. Eine permanente inhaltliche Kontrolle der verlinkten
          Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
          zumutbar. Bei Bekanntwerden von Rechtsverletzungen, insbesondere wenn
          Sie uns unter kontakt@josaya.de kontaktieren, werden wir derartige Links
          umgehend entfernen.
        </p>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold">Urheberrecht</h2>
        <p className="mt-3 text-slate-700">
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
          Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
          sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden,
          werden die Urheberrechte Dritter beachtet. Sollten Sie trotzdem auf
          eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
          entsprechenden Hinweis an kontakt@josaya.de. Bei Bekanntwerden von
          Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
        </p>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold">Online-Streitbeilegung</h2>
        <p className="mt-3 text-slate-700">
          Plattform der EU-Kommission zur Online-Streitbeilegung:{" "}
          <a className="text-blue-600 hover:underline" href="https://ec.europa.eu/odr">
            https://ec.europa.eu/odr
          </a>
        </p>
        <p className="mt-4 text-slate-700">
          Wir sind weder bereit noch verpflichtet, an einem Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
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