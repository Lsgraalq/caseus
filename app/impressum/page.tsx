import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Impressum | Caseus Studio",
  description: "Rechtliche Angaben gemäß § 5 TMG — Caseus Studio, Roman Kulikov",
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-white text-black px-6 py-24 md:px-20 lg:px-40">

      {/* Back link */}
      <Link
        href="/de"
        className="inline-flex items-center gap-2 text-sm text-[#0802E2] font-medium mb-16 hover:opacity-70 transition-opacity"
      >
        ← Zurück zur Startseite
      </Link>

      {/* Header */}
      <div className="mb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-[#0802E2] font-medium mb-4">
          Rechtliche Angaben
        </p>
        <h1 className="text-6xl md:text-8xl font-bold leading-none tracking-tight">
          Impressum
        </h1>
      </div>

      {/* Divider */}
      <div className="h-px bg-black/10 mb-16" />

      {/* Sections */}
      <div className="flex flex-col gap-16 max-w-2xl">

        {/* Angaben gemäß § 5 TMG */}
        <section>
          <p className="text-xs uppercase tracking-[0.25em] text-[#0802E2] font-medium mb-4">
            § 5 TMG
          </p>
          <h2 className="text-2xl font-bold mb-4">Angaben</h2>
          <div className="text-lg leading-relaxed text-black/70 space-y-1">
            <p className="font-semibold text-black">Caseus Studio</p>
            <p>Matthias-Grünewald-Str. 6</p>
            <p>06124 Halle (Saale)</p>
            <p>Germany</p>
          </div>
          <div className="mt-6 text-lg leading-relaxed text-black/70">
            <span className="text-black/40 text-sm uppercase tracking-widest mr-2">Vertreten durch</span>
            <span className="font-semibold text-black">Roman Kulikov</span>
          </div>
        </section>

        <div className="h-px bg-black/10" />

        {/* Kontakt */}
        <section>
          <p className="text-xs uppercase tracking-[0.25em] text-[#0802E2] font-medium mb-4">
            Kontakt
          </p>
          <h2 className="text-2xl font-bold mb-4">Erreichbarkeit</h2>
          <ul className="space-y-3 text-lg text-black/70">
            <li className="flex gap-4">
              <span className="text-black/40 w-20 shrink-0">Telefon</span>
              <a href="tel:+4917668188204" className="text-black hover:text-[#0802E2] transition-colors">
                +49 176 68188204
              </a>
            </li>
            <li className="flex gap-4">
              <span className="text-black/40 w-20 shrink-0">E-Mail</span>
              <a href="mailto:caseusdigitalagency@gmail.com" className="text-black hover:text-[#0802E2] transition-colors break-all">
                caseusdigitalagency@gmail.com
              </a>
            </li>
            <li className="flex gap-4">
              <span className="text-black/40 w-20 shrink-0">Website</span>
              <a href="https://www.caseus.studio" target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#0802E2] transition-colors">
                www.caseus.studio
              </a>
            </li>
          </ul>
        </section>

        <div className="h-px bg-black/10" />

        {/* Umsatzsteuer */}
        <section>
          <p className="text-xs uppercase tracking-[0.25em] text-[#0802E2] font-medium mb-4">
            Steuer
          </p>
          <h2 className="text-2xl font-bold mb-4">Umsatzsteuer-ID</h2>
          <p className="text-lg text-black/70 leading-relaxed">
            Es erfolgt kein Ausweis der Umsatzsteuer aufgrund der Anwendung der
            Kleinunternehmerregelung gemäß{" "}
            <span className="text-black font-medium">§ 19 UStG</span>.
          </p>
        </section>

        <div className="h-px bg-black/10" />

        {/* EU-Streitschlichtung */}
        <section>
          <p className="text-xs uppercase tracking-[0.25em] text-[#0802E2] font-medium mb-4">
            EU
          </p>
          <h2 className="text-2xl font-bold mb-4">EU-Streitschlichtung</h2>
          <p className="text-lg text-black/70 leading-relaxed mb-4">
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:
          </p>
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[#0802E2] font-medium hover:opacity-70 transition-opacity break-all"
          >
            https://ec.europa.eu/consumers/odr
          </a>
          <p className="mt-4 text-lg text-black/70 leading-relaxed">
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>
        </section>

        <div className="h-px bg-black/10" />

        {/* Verbraucherstreitbeilegung */}
        <section>
          <p className="text-xs uppercase tracking-[0.25em] text-[#0802E2] font-medium mb-4">
            Schlichtung
          </p>
          <h2 className="text-2xl font-bold mb-4">
            Verbraucherstreitbeilegung
          </h2>
          <p className="text-lg text-black/70 leading-relaxed">
            Wir sind nicht bereit oder verpflichtet, an
            Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

      </div>

      {/* Footer note */}
      <div className="mt-24 pt-8 border-t border-black/10">
        <p className="text-sm text-black/30">
          © {new Date().getFullYear()} Caseus Studio · Alle Rechte vorbehalten
        </p>
      </div>

    </main>
  );
}