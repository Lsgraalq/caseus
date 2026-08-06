"use client";

import React from "react";
import Link from "next/link";
import { datenschutzContentData } from "@/lib/datenschutz-data";

interface DatenschutzContentProps {
  locale: "de" | "en";
}

export default function DatenschutzContent({ locale }: DatenschutzContentProps) {
  const t = datenschutzContentData[locale];

  return (
    <main
      className="min-h-screen bg-white text-black px-6 py-24 md:px-20 lg:px-40"
      style={{ fontFamily: '"Courier New", Courier, monospace' }}
    >
      {/* Back link */}
      <Link
        href={t.backHref}
        className="inline-flex items-center gap-2 text-sm text-[#0802E2] font-semibold mb-16 hover:opacity-70 transition-opacity"
      >
        {t.back}
      </Link>

      {/* Header */}
      <div className="mb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-[#0802E2] font-semibold mb-4">
          {t.legalLabel}
        </p>
        <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tight">
          {t.title}
        </h1>
      </div>

      <div className="h-px bg-black/10 mb-16" />

      {/* Sections */}
      <div className="flex flex-col gap-16 max-w-2xl">
        {t.sections.map((section, i) => (
          <React.Fragment key={i}>
            <section>
              <p className="text-xs uppercase tracking-[0.25em] text-[#0802E2] font-semibold mb-4">
                {section.tag}
              </p>
              <h2 className="text-2xl font-bold mb-4 text-black">{section.heading}</h2>
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
