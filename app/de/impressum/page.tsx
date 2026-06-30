import React from "react";
import ImpressumContent from "@/components/ImpressumContent";

export const metadata = {
  title: "Impressum | Caseus Studio",
  description: "Rechtliche Angaben gemäß § 5 TMG — Caseus Studio, Roman Kulikov",
};

export default function ImpressumDE() {
  return <ImpressumContent locale="de" />;
}
