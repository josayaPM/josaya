import Link from "next/link";

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-extrabold text-slate-900">{title}</h2>
      <div className="mt-3 space-y-3 text-slate-700">{children}</div>
    </section>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-3 text-base font-bold text-slate-900">{children}</h3>;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-2 pl-5 text-slate-700">
      {items.map((t, i) => (
        <li key={i} className="list-disc">
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function DatenschutzPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Datenschutzerklärung
        </h1>

        {/* klein & unaufdringlich */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
        >
          ← Zur Startseite
        </Link>
      </div>

      <p className="mt-4 text-slate-600">
        Die folgenden Hinweise geben einen Überblick darüber, was mit
        personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
        Personenbezogene Daten sind alle Daten, mit denen Sie persönlich
        identifiziert werden können.
      </p>

      <div className="mt-8 grid gap-4">
        <Card title="1. Datenschutz auf einen Blick">
          <SubTitle>Allgemeine Hinweise</SubTitle>
          <p>
            Diese Erklärung informiert über Art, Umfang und Zweck der Verarbeitung
            personenbezogener Daten im Rahmen der Nutzung dieser Website.
          </p>
        </Card>

        <Card title="2. Hosting und Content Delivery">
          <SubTitle>Hosting</SubTitle>
          <p>
            Wir hosten unsere Website bei <span className="font-semibold">[Hosting-Anbieter eintragen]</span>.
            Details zur Datenverarbeitung entnehmen Sie bitte der Datenschutzerklärung des Hosting-Anbieters.
          </p>

          <SubTitle>Content Delivery / Schutz</SubTitle>
          <p>
            Wir nutzen ggf. Dienste wie <span className="font-semibold">[CDN/Schutz-Anbieter eintragen]</span>, um unsere Website
            schneller und sicherer bereitzustellen.
          </p>
        </Card>

        <Card title="3. E-Mail-Versand">
          <p>
            Für den Versand von E-Mails (z. B. Verifizierung/Benachrichtigungen)
            nutzen wir ggf. <span className="font-semibold">[E-Mail-Anbieter eintragen]</span>.
            Details zur Datenverarbeitung finden Sie in der Datenschutzerklärung des jeweiligen Anbieters.
          </p>
        </Card>

        <Card title="4. Verantwortliche Stelle">
          <p>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          </p>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-800">
            <div className="font-semibold">[Name eintragen]</div>
            <div>[Adresse eintragen]</div>
            <div>[PLZ Ort]</div>
            <div>[Land]</div>
            <div className="mt-2">
              E-Mail: <span className="font-semibold">[datenschutz@deine-domain.de]</span>
            </div>
          </div>
        </Card>

        <Card title="5. Datenerfassung auf dieser Website">
          <SubTitle>Hochschul-E-Mail-Adressen</SubTitle>
          <p>
            Für die Nutzung unserer Bewertungsfunktion kann eine Verifizierung
            mittels Hochschul-E-Mail-Adresse erforderlich sein. Die E-Mail wird
            ausschließlich zur Verifizierung verwendet.
          </p>

          <SubTitle>Bewertungen</SubTitle>
          <p>
            Von Nutzer:innen abgegebene Bewertungen werden gespeichert. Die Darstellung
            auf der Website erfolgt anonymisiert (kein Anzeigen der Hochschul-E-Mail-Adresse).
          </p>

          <SubTitle>Gewinnspiele</SubTitle>
          <p>
            Wenn ihr Gewinnspiele anbietet, beschreibt hier kurz, welche Daten dafür
            benötigt werden (oder dass keine zusätzlichen Daten erhoben werden).
          </p>
        </Card>

        <Card title="6. Discord / Community">
          <p>
            Für Feedback und Community-Funktionen nutzen wir ggf. Discord. Bei Nutzung
            gelten zusätzlich die Datenschutzbestimmungen von Discord.
          </p>
        </Card>

        <Card title="7. Ihre Rechte">
          <p>Sie haben jederzeit das Recht:</p>
          <Bullets
            items={[
              "Auskunft über Ihre gespeicherten personenbezogenen Daten zu erhalten (Art. 15 DSGVO)",
              "Berichtigung oder Löschung zu verlangen (Art. 16, 17 DSGVO)",
              "Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO)",
              "Widerspruch gegen die Verarbeitung einzulegen (Art. 21 DSGVO)",
              "Datenübertragbarkeit zu verlangen (Art. 20 DSGVO)",
            ]}
          />
        </Card>

        <Card title="8. Kontakt">
          <p>
            Bei Fragen zum Datenschutz wenden Sie sich bitte an:
            <br />
            <span className="font-semibold">[datenschutz@deine-domain.de]</span>
          </p>
        </Card>
      </div>
    </main>
  );
}