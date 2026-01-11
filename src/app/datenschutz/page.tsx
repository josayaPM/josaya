import Link from "next/link";

export default function DatenschutzPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-extrabold">Datenschutzerklärung</h1>

      <div className="mt-6 space-y-4 text-slate-700">
        <h2 className="text-xl font-bold">1. Datenschutz auf einen Blick</h2>
        <p className="font-semibold">Allgemeine Hinweise</p>
        <p>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
          personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
          Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert
          werden können.
        </p>

        <h2 className="pt-4 text-xl font-bold">2. Hosting und Content Delivery</h2>
        <p className="font-semibold">Hosting</p>
        <p>
          Wir hosten unsere Website bei <strong>[Hosting-Anbieter eintragen]</strong>.
          Details zur Datenverarbeitung entnehmen Sie bitte der Datenschutzerklärung des
          Hosting-Anbieters.
        </p>

        <p className="font-semibold">Content Delivery / Schutz</p>
        <p>
          Wir nutzen ggf. Dienste wie <strong>[CDN/Schutz-Anbieter eintragen]</strong>,
          um unsere Website schneller und sicherer bereitzustellen.
        </p>

        <h2 className="pt-4 text-xl font-bold">3. E-Mail-Versand</h2>
        <p>
          Für den Versand von E-Mails (z. B. Verifizierung/Benachrichtigungen) nutzen wir
          ggf. <strong>[E-Mail-Anbieter eintragen]</strong>. Details zur Datenverarbeitung
          entnehmen Sie bitte der Datenschutzerklärung des jeweiligen Anbieters.
        </p>

        <h2 className="pt-4 text-xl font-bold">4. Verantwortliche Stelle</h2>
        <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="font-semibold">[Name / Firma]</div>
          <div>[Adresse]</div>
          <div>[PLZ Ort]</div>
          <div>Deutschland</div>
          <div className="mt-2">E-Mail: kontakt@josaya.de</div>
        </div>

        <h2 className="pt-4 text-xl font-bold">5. Datenerfassung auf dieser Website</h2>
        <p className="font-semibold">Accounts</p>
        <p>
          Für die Nutzung unserer Plattform können Sie ein Benutzerkonto anlegen.
          Dabei verarbeiten wir Ihre E-Mail-Adresse und ein Passwort (verschlüsselt/Hash).
        </p>

        <p className="font-semibold">Bewertungen</p>
        <p>
          Die von Ihnen abgegebenen Bewertungen werden in unserer Datenbank gespeichert.
          Die Anzeige erfolgt anonym (Alias). Bitte veröffentlichen Sie keine personenbezogenen
          Daten in Kommentaren.
        </p>

        <h2 className="pt-4 text-xl font-bold">6. Discord / Community</h2>
        <p>
          Für Feedback und Community-Funktionen nutzen wir ggf. Discord. Es gelten zusätzlich
          die Datenschutzbestimmungen von Discord.
        </p>

        <h2 className="pt-4 text-xl font-bold">7. Ihre Rechte</h2>
        <ul className="list-disc space-y-1 pl-6">
          <li>Auskunft (Art. 15 DSGVO)</li>
          <li>Berichtigung (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO)</li>
          <li>Einschränkung (Art. 18 DSGVO)</li>
          <li>Widerspruch (Art. 21 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        </ul>

        <h2 className="pt-4 text-xl font-bold">8. Kontakt</h2>
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