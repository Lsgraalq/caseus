import React from "react";
import Link from "next/link";

interface ImpressumContentProps {
  locale: "de" | "en";
}

const content = {
  de: {
    back: "← Zurück zur Startseite",
    backHref: "/de",
    legalLabel: "Rechtliche Angaben",
    title: "Impressum",
    sections: [
      {
        tag: "§ 5 TMG",
        heading: "Angaben",
        body: (
          <>
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
          </>
        ),
      },
      {
        tag: "Kontakt",
        heading: "Erreichbarkeit",
        body: (
          <ul className="space-y-3 text-lg text-black/70">
            <li className="flex gap-4">
              <span className="text-black/40 w-20 shrink-0">Telefon</span>
              <a href="tel:+4917668188204" className="text-black hover:text-[#0802E2] transition-colors">+49 176 68188204</a>
            </li>
            <li className="flex gap-4">
              <span className="text-black/40 w-20 shrink-0">E-Mail</span>
              <a href="mailto:caseusdigitalagency@gmail.com" className="text-black hover:text-[#0802E2] transition-colors break-all">caseusdigitalagency@gmail.com</a>
            </li>
            <li className="flex gap-4">
              <span className="text-black/40 w-20 shrink-0">Website</span>
              <a href="https://www.caseus.studio" target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#0802E2] transition-colors">www.caseus.studio</a>
            </li>
          </ul>
        ),
      },
      {
        tag: "Steuer",
        heading: "Umsatzsteuer-ID",
        body: (
          <p className="text-lg text-black/70 leading-relaxed">
            Es erfolgt kein Ausweis der Umsatzsteuer aufgrund der Anwendung der Kleinunternehmerregelung gemäß{" "}
            <span className="text-black font-medium">§ 19 UStG</span>.
          </p>
        ),
      },
      {
        tag: "EU",
        heading: "EU-Streitschlichtung",
        body: (
          <>
            <p className="text-lg text-black/70 leading-relaxed mb-4">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
            </p>
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="inline-block text-[#0802E2] font-medium hover:opacity-70 transition-opacity break-all">
              https://ec.europa.eu/consumers/odr
            </a>
            <p className="mt-4 text-lg text-black/70 leading-relaxed">
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </>
        ),
      },
      {
        tag: "Schlichtung",
        heading: "Verbraucherstreitbeilegung",
        body: (
          <p className="text-lg text-black/70 leading-relaxed">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        ),
      },
    ],
    copyright: `© ${new Date().getFullYear()} Caseus Studio · Alle Rechte vorbehalten`,
  },
  en: {
    back: "← Back to homepage",
    backHref: "/en",
    legalLabel: "Legal Notice",
    title: "Imprint",
    sections: [
      {
        tag: "§ 5 TMG",
        heading: "Company Details",
        body: (
          <>
            <div className="text-lg leading-relaxed text-black/70 space-y-1">
              <p className="font-semibold text-black">Caseus Studio</p>
              <p>Matthias-Grünewald-Str. 6</p>
              <p>06124 Halle (Saale)</p>
              <p>Germany</p>
            </div>
            <div className="mt-6 text-lg leading-relaxed text-black/70">
              <span className="text-black/40 text-sm uppercase tracking-widest mr-2">Represented by</span>
              <span className="font-semibold text-black">Roman Kulikov</span>
            </div>
          </>
        ),
      },
      {
        tag: "Contact",
        heading: "Get in touch",
        body: (
          <ul className="space-y-3 text-lg text-black/70">
            <li className="flex gap-4">
              <span className="text-black/40 w-20 shrink-0">Phone</span>
              <a href="tel:+4917668188204" className="text-black hover:text-[#0802E2] transition-colors">+49 176 68188204</a>
            </li>
            <li className="flex gap-4">
              <span className="text-black/40 w-20 shrink-0">E-Mail</span>
              <a href="mailto:caseusdigitalagency@gmail.com" className="text-black hover:text-[#0802E2] transition-colors break-all">caseusdigitalagency@gmail.com</a>
            </li>
            <li className="flex gap-4">
              <span className="text-black/40 w-20 shrink-0">Website</span>
              <a href="https://www.caseus.studio" target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#0802E2] transition-colors">www.caseus.studio</a>
            </li>
          </ul>
        ),
      },
      {
        tag: "Tax",
        heading: "VAT",
        body: (
          <p className="text-lg text-black/70 leading-relaxed">
            VAT is not charged as this business operates under the small business regulation pursuant to{" "}
            <span className="text-black font-medium">§ 19 UStG</span> (German tax law).
          </p>
        ),
      },
      {
        tag: "EU",
        heading: "EU Dispute Resolution",
        body: (
          <>
            <p className="text-lg text-black/70 leading-relaxed mb-4">
              The European Commission provides a platform for online dispute resolution (ODR):
            </p>
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="inline-block text-[#0802E2] font-medium hover:opacity-70 transition-opacity break-all">
              https://ec.europa.eu/consumers/odr
            </a>
            <p className="mt-4 text-lg text-black/70 leading-relaxed">
              Our e-mail address can be found in the contact section above.
            </p>
          </>
        ),
      },
      {
        tag: "Disputes",
        heading: "Consumer Dispute Resolution",
        body: (
          <p className="text-lg text-black/70 leading-relaxed">
            We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.
          </p>
        ),
      },
    ],
    copyright: `© ${new Date().getFullYear()} Caseus Studio · All rights reserved`,
  },
};

export default function ImpressumContent({ locale }: ImpressumContentProps) {
  const t = content[locale];

  return (
    <main className="min-h-screen bg-white text-black px-6 py-24 md:px-20 lg:px-40">
      {/* Back link */}
      <Link href={t.backHref} className="inline-flex items-center gap-2 text-sm text-[#0802E2] font-medium mb-16 hover:opacity-70 transition-opacity">
        {t.back}
      </Link>

      {/* Header */}
      <div className="mb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-[#0802E2] font-medium mb-4">
          {t.legalLabel}
        </p>
        <h1 className="text-6xl md:text-8xl font-bold leading-none tracking-tight">
          {t.title}
        </h1>
      </div>

      <div className="h-px bg-black/10 mb-16" />

      {/* Sections */}
      <div className="flex flex-col gap-16 max-w-2xl">
        {t.sections.map((section, i) => (
          <React.Fragment key={i}>
            <section>
              <p className="text-xs uppercase tracking-[0.25em] text-[#0802E2] font-medium mb-4">
                {section.tag}
              </p>
              <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
              {section.body}
            </section>
            {i < t.sections.length - 1 && <div className="h-px bg-black/10" />}
          </React.Fragment>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-24 pt-8 border-t border-black/10">
        <p className="text-sm text-black/30">{t.copyright}</p>
      </div>
    </main>
  );
}
