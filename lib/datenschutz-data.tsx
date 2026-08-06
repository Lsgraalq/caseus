import React from "react";

export const datenschutzContentData = {
  de: {
    back: "← Zurück zur Startseite",
    backHref: "/de",
    legalLabel: "Rechtliche Angaben",
    title: "Datenschutzerklärung",
    sections: [
      {
        tag: "1. Überblick",
        heading: "Datenschutz auf einen Blick",
        body: (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Allgemeine Hinweise</h3>
              <p className="text-lg text-black/70 leading-relaxed">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Datenerfassung auf dieser Website</h3>
              <p className="text-lg text-black/70 leading-relaxed font-semibold mb-2">
                Wer ist verantwortlich für die Datenerfassung auf dieser Website?
              </p>
              <p className="text-lg text-black/70 leading-relaxed mb-4">
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
              </p>
              <p className="text-lg text-black/70 leading-relaxed font-semibold mb-2">
                Wie erfassen wir Ihre Daten?
              </p>
              <p className="text-lg text-black/70 leading-relaxed mb-4">
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei handelt es sich um Daten, die Sie in unser Kontaktformular eingeben oder uns per E-Mail senden.
              </p>
              <p className="text-lg text-black/70 leading-relaxed mb-4">
                Andere Daten (technische Daten wie Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs) werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
              <p className="text-lg text-black/70 leading-relaxed">
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
              </p>
            </div>
          </div>
        ),
      },
      {
        tag: "2. Controller",
        heading: "Verantwortlicher",
        body: (
          <div className="space-y-4">
            <p className="text-lg text-black/70 leading-relaxed">
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
            </p>
            <div className="text-lg leading-relaxed text-black/70 space-y-1">
              <p className="font-semibold text-black">Caseus Studio</p>
              <p>Roman Kulikov</p>
              <p>Matthias-Grünewald-Str. 6</p>
              <p>06124 Halle (Saale)</p>
              <p>Germany</p>
            </div>
            <ul className="space-y-2 pt-2 text-lg text-black/70">
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
          </div>
        ),
      },
      {
        tag: "3. Pflichten",
        heading: "Allgemeine Hinweise und Pflichtinformationen",
        body: (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
              <p className="text-lg text-black/70 leading-relaxed">
                Soweit eine Datenverarbeitung auf Ihrer Einwilligung beruht, können Sie diese jederzeit für die Zukunft widerrufen.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
              <p className="text-lg text-black/70 leading-relaxed">
                Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde zu.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Recht auf Auskunft, Löschung und Berichtigung</h3>
              <p className="text-lg text-black/70 leading-relaxed">
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten sowie ein Recht auf Berichtigung oder Löschung dieser Daten.
              </p>
            </div>
          </div>
        ),
      },
      {
        tag: "4. Datenerfassung",
        heading: "Datenerfassung auf unserer Website",
        body: (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Server-Log-Dateien</h3>
              <p className="text-lg text-black/70 leading-relaxed mb-4">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-lg text-black/70 leading-relaxed mb-4">
                <li>Browsertyp und Browserversion</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Referrer URL (die zuvor besuchte Seite)</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className="text-lg text-black/70 leading-relaxed">
                Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierfür müssen die Server-Log-Files erfasst werden.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Kontaktformular und E-Mail-Anfrage</h3>
              <p className="text-lg text-black/70 leading-relaxed mb-4">
                Wenn Sie uns per Kontaktformular oder E-Mail Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular bzw. Ihrer E-Mail inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
              </p>
              <p className="text-lg text-black/70 leading-relaxed">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
            </div>
            <div className="pt-4 border-t border-black/10">
              <p className="text-sm text-black/40 italic">
                Wenn Ihr Browser Web Fonts nicht unterstützt, wird eine Standardschrift Ihres Computers genutzt.
              </p>
            </div>
          </div>
        ),
      },
    ],
    copyright: `© ${new Date().getFullYear()} Caseus Studio · Alle Rechte vorbehalten`,
  },
  en: {
    back: "← Back to homepage",
    backHref: "/en",
    legalLabel: "Legal Disclosures",
    title: "Privacy Policy",
    sections: [
      {
        tag: "1. Overview",
        heading: "Privacy at a Glance",
        body: (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">General Information</h3>
              <p className="text-lg text-black/70 leading-relaxed">
                The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can be used to identify you personally.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Data Collection on This Website</h3>
              <p className="text-lg text-black/70 leading-relaxed font-semibold mb-2">
                Who is responsible for data collection on this website?
              </p>
              <p className="text-lg text-black/70 leading-relaxed mb-4">
                Data processing on this website is carried out by the website operator. You can find their contact details in the legal notice (imprint) of this website.
              </p>
              <p className="text-lg text-black/70 leading-relaxed font-semibold mb-2">
                How do we collect your data?
              </p>
              <p className="text-lg text-black/70 leading-relaxed mb-4">
                On one hand, your data is collected when you provide it to us. This refers to data that you enter into our contact form or send to us via email.
              </p>
              <p className="text-lg text-black/70 leading-relaxed mb-4">
                Other data (technical data such as internet browser, operating system, or time of page access) is collected automatically by our IT systems when you visit the website.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">What rights do you have regarding your data?</h3>
              <p className="text-lg text-black/70 leading-relaxed">
                You have the right at any time to receive free information about the origin, recipient, and purpose of your stored personal data. You also have the right to request the correction or deletion of this data.
              </p>
            </div>
          </div>
        ),
      },
      {
        tag: "2. Controller",
        heading: "Responsible Party",
        body: (
          <div className="space-y-4">
            <p className="text-lg text-black/70 leading-relaxed">
              The controller responsible for data processing on this website is:
            </p>
            <div className="text-lg leading-relaxed text-black/70 space-y-1">
              <p className="font-semibold text-black">Caseus Studio</p>
              <p>Roman Kulikov</p>
              <p>Matthias-Grünewald-Str. 6</p>
              <p>06124 Halle (Saale)</p>
              <p>Germany</p>
            </div>
            <ul className="space-y-2 pt-2 text-lg text-black/70">
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
          </div>
        ),
      },
      {
        tag: "3. Disclosures",
        heading: "General Information and Mandatory Disclosures",
        body: (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Revocation of Your Consent to Data Processing</h3>
              <p className="text-lg text-black/70 leading-relaxed">
                If data processing is based on your consent, you can revoke this consent at any time for the future.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Right to File a Complaint with the Competent Regulatory Authority</h3>
              <p className="text-lg text-black/70 leading-relaxed">
                In the event of violations of the GDPR, data subjects have the right to file a complaint with a supervisory authority.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Right to Information, Deletion, and Correction</h3>
              <p className="text-lg text-black/70 leading-relaxed">
                Within the framework of the applicable legal provisions, you have the right at any time to free information about your stored personal data, as well as the right to correction or deletion of this data.
              </p>
            </div>
          </div>
        ),
      },
      {
        tag: "4. Data Collection",
        heading: "Data Collection on Our Website",
        body: (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Server Log Files</h3>
              <p className="text-lg text-black/70 leading-relaxed mb-4">
                The provider of the pages automatically collects and stores information in so-called server log files, which your browser automatically transmits to us. These are:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-lg text-black/70 leading-relaxed mb-4">
                <li>Browser type and browser version</li>
                <li>Operating system used</li>
                <li>Referrer URL (previously visited page)</li>
                <li>Host name of the accessing computer</li>
                <li>Time of the server request</li>
                <li>IP address</li>
              </ul>
              <p className="text-lg text-black/70 leading-relaxed">
                This data is collected on the basis of Art. 6 Para. 1 lit. f GDPR. The website operator has a legitimate interest in the technically error-free presentation and optimization of their website – for this, server log files must be recorded.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Contact Form and Email Inquiry</h3>
              <p className="text-lg text-black/70 leading-relaxed mb-4">
                If you send us inquiries via contact form or email, your details from the inquiry form or email, including the contact details you provided there, will be stored by us for the purpose of processing the inquiry and in case of follow-up questions.
              </p>
              <p className="text-lg text-black/70 leading-relaxed">
                The processing of this data is based on Art. 6 Para. 1 lit. b GDPR, provided that your inquiry is related to the fulfillment of a contract or is necessary for the implementation of pre-contractual measures. In all other cases, processing is based on our legitimate interest in the effective handling of the inquiries addressed to us (Art. 6 Para. 1 lit. f GDPR).
              </p>
            </div>
            <div className="pt-4 border-t border-black/10">
              <p className="text-sm text-black/40 italic">
                If your browser does not support Web Fonts, a standard font from your computer will be used.
              </p>
            </div>
          </div>
        ),
      },
    ],
    copyright: `© ${new Date().getFullYear()} Caseus Studio · All rights reserved`,
  },
};
