import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { sessionCookie, verifySession } from "@/lib/auth";
import UserMenu from "@/app/components/UserMenu";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "campusbuddy",
  description: "Professor:innen bewerten – campusbuddy",
};

async function getViewerEmail() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookie.name)?.value;
  if (!token) return null;

  try {
    const session = await verifySession(token);
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { email: true },
    });
    return user?.email ?? null;
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const viewerEmail = await getViewerEmail();

  return (
    <html lang="de">
      <body>
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
            <Link
              href="/"
              className="flex items-center gap-2 font-extrabold tracking-tight"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white">
                🎓
              </span>
              <span className="text-lg">
                <span className="text-slate-900">campus</span>
                <span className="text-blue-600">buddy</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
              <Link className="hover:text-slate-900" href="/">
                Home
              </Link>
              <Link className="hover:text-slate-900" href="/professoren">
                Professor:innen
              </Link>
              <Link className="hover:text-slate-900" href="/#kontakt">
                Kontakt
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="#"
                className="hidden rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 md:inline-flex"
              >
                Discord
              </a>

              {/* Profil Dropdown / Login Button */}
              <UserMenu email={viewerEmail} />

              {/* Mobile Menü ohne JS (Details/summary) */}
              <details className="md:hidden">
                <summary className="cursor-pointer list-none rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800">
                  ☰
                </summary>
                <div className="absolute right-4 mt-3 w-56 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg">
                  <div className="flex flex-col gap-3 text-sm font-semibold text-slate-700">
                    <Link href="/">Home</Link>
                    <Link href="/professoren">Professor:innen</Link>
                    <Link href="/#kontakt">Kontakt</Link>
                    <a
                      href="#"
                      className="inline-flex w-fit rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white"
                    >
                      Discord
                    </a>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 py-6">
  <div className="grid grid-cols-12 gap-6">
    {/* LINKS: Hochschul-Leaderboard */}
    <aside className="col-span-12 md:col-span-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="text-sm font-extrabold text-slate-900">
          🏫 Hochschulen
        </div>
        <div className="mt-3 space-y-2 text-sm text-slate-700">
          <div className="flex justify-between">
            <span>1. Uni A</span>
            <span className="font-semibold text-slate-500">4.6</span>
          </div>
          <div className="flex justify-between">
            <span>2. Uni B</span>
            <span className="font-semibold text-slate-500">4.4</span>
          </div>
          <div className="flex justify-between">
            <span>3. Uni C</span>
            <span className="font-semibold text-slate-500">4.2</span>
          </div>
        </div>
      </div>
    </aside>

    {/* MITTE: Euer bisheriger Content */}
    <main className="col-span-12 md:col-span-6">{children}</main>

    {/* RECHTS: Professoren-Leaderboard */}
    <aside className="col-span-12 md:col-span-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="text-sm font-extrabold text-slate-900">
          👨‍🏫 Professor:innen
        </div>
        <div className="mt-3 space-y-2 text-sm text-slate-700">
          <div className="flex justify-between">
            <span>1. Prof. X</span>
            <span className="font-semibold text-slate-500">4.9</span>
          </div>
          <div className="flex justify-between">
            <span>2. Prof. Y</span>
            <span className="font-semibold text-slate-500">4.7</span>
          </div>
          <div className="flex justify-between">
            <span>3. Prof. Z</span>
            <span className="font-semibold text-slate-500">4.6</span>
          </div>
        </div>
      </div>
    </aside>
  </div>
</div>


        <Footer />
      </body>
    </html>
  );
}
