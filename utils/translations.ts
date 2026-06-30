export const translations = {
  en: {
    jellyCursor: "why us?",
    preloader: "Loading…",
    recently: "Recently",
    hero: {
      impactText: "Making impact visible.",
      mainParagraph: "We make your impact visible. We handle websites, videos, and promotion, freeing up your time for what matters most — changing this world for the better."
    },
    whyUs: [
      {
        title: "Plannable",
        description: "Transparent fixed prices with no hidden costs: from €499 setup, €99 support."
      },
      {
        title: "Smart Briefing",
        description: "AI-powered onboarding in minutes — no lengthy meetings required."
      },
      {
        title: "Client Portal",
        description: "Submit tasks asynchronously and track their status live in your dashboard."
      },
      {
        title: "Reliability",
        description: "Smooth operations with 2 hours of included support every month."
      },
      {
        title: "Flexibility",
        description: "Modular growth: add new sections flexibly for just €100 each."
      }
    ],
    navbar: {
      home: "Home",
      homepage: "Homepage",
      projects: "Projects",
      services: "Services",
      contact: "Contact",
      menu: "Menu",
      langFrom: "EN",
      langTo: "DE",
      langLink: "/de",
      flagSrc: "/england.png"
    },
    footer: {
      heading: "Believing in \n people and the power \nof goodness",
      headingClass: "pt-30 md:pt-10 text-[45px] leading-12 2xl:text-[170px] 2xl:leading-40 xl md:text-[60px] xl:text-[100px] xl:leading-20",
      jobInquiry: "You got a work ?",
      followUs: "Follow us :",
      impressum: "Imprint",
      datenschutz: "Privacy Policy"
    },
    projectsPage: {
      title: "PROJECTS"
    },
    projectDetails: {
      notFound: "Project not found",
      home: "HOME",
      projects: "PROJECTS",
      client: "Client:",
      year: "Year:",
      services: "Services:",
      location: "Location:",
      moreProjects: "More Projects"
    }
  },
  de: {
    jellyCursor: "warum wir?",
    preloader: "Wird geladen…",
    recently: "Kürzlich",
    hero: {
      impactText: "Wirkung sichtbar machen.",
      mainParagraph: "Wir machen Ihre Wirkungen sichtbar. Wir übernehmen Webseiten, Videos und Promotion und halten Ihnen den Rücken frei für das Wesentliche — diese Welt zum Besseren zu verändern."
    },
    whyUs: [
      {
        title: "Planbarkeit",
        description: "Transparente Fixpreise ohne versteckte Kosten: ab 499\u20AC Setup, 99\u20AC Support."
      },
      {
        title: "Smart Briefing",
        description: "KI-gest\u00FCtztes Onboarding in wenigen Minuten \u2013 ganz ohne stundenlange Meetings."
      },
      {
        title: "Kundenportal",
        description: "Aufgaben asynchron einreichen und den Status im Dashboard live verfolgen."
      },
      {
        title: "Sicherheit",
        description: "Reibungsloser Betrieb durch 2 Stunden inkludierten Support jeden Monat."
      },
      {
        title: "Flexibilit\u00E4t",
        description: "Modulares Wachstum: Neue Sektionen flexibel f\u00FCr je 100 \u20AC hinzuf\u00FCgen."
      }
    ],
    navbar: {
      home: "Startseite",
      homepage: "Startseite",
      projects: "Projekte",
      services: "Leistungen",
      contact: "Kontakt",
      menu: "Menü",
      langFrom: "DE",
      langTo: "EN",
      langLink: "/en",
      flagSrc: "/germany.png"
    },
    footer: {
      heading: "Wir glauben an \nden Menschen und \ndie Kraft des Guten",
      headingClass: "pt-30 md:pt-10 text-[45px] leading-12 2xl:text-[140px] 2xl:leading-40 xl md:text-[60px] xl:text-[100px] xl:leading-20",
      jobInquiry: "Hast du ein Projekt?",
      followUs: "Folge uns:",
      impressum: "Impressum",
      datenschutz: "Datenschutz"
    },
    projectsPage: {
      title: "PROJEKTE"
    },
    projectDetails: {
      notFound: "Projekt nicht gefunden",
      home: "STARTSEITE",
      projects: "PROJEKTE",
      client: "Kunde:",
      year: "Jahr:",
      services: "Leistungen:",
      location: "Standort:",
      moreProjects: "Weitere Projekte"
    }
  }
} as const;

export type Locale = keyof typeof translations;
