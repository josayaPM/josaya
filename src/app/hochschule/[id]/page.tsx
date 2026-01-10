import Link from "next/link";

export default async function HochschulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
      <Link href="/" style={{ opacity: 0.8 }}>
        ← Zurück
      </Link>

      <h1 style={{ fontSize: 28, fontWeight: 800, marginTop: 12 }}>
        Hochschule: {id}
      </h1>

      <p style={{ marginTop: 8, opacity: 0.75 }}>
        (Später: Professoren dieser Hochschule anzeigen)
      </p>
    </main>
  );
}