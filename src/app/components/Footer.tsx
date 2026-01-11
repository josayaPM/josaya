import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-sm text-slate-500">© 2026 campusbuddy</div>

          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-semibold text-slate-600">
            <Link className="hover:text-slate-900" href="/impressum">
              Impressum
            </Link>
            <span className="text-slate-300">|</span>
            <Link className="hover:text-slate-900" href="/datenschutz">
              Datenschutz
            </Link>
            <span className="text-slate-300">|</span>
            <Link className="hover:text-slate-900" href="/nutzungsbedingungen">
              Nutzungsbedingungen
            </Link>
            <span className="text-slate-300">|</span>
            <Link className="hover:text-slate-900" href="/rechtliche-grundlage">
              Rechtliche Grundlage
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}