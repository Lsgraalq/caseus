export const translations = {
  en: {
    jellyCursor: "What we do",
    preloader: "Loading…",
    hero: {
      impactText: "Making impact visible.",
      mainParagraph: "We make your impact visible. We handle websites, videos, and promotion, freeing up your time for what matters most — changing this world for the better."
    },
    whyUs: [
      {
        title: "Presence",
        description: "Building a professional digital identity that earns public trust."
      },
      {
        title: "Storytelling",
        description: "Crafting compelling content that brings your mission to life."
      },
      {
        title: "Outreach",
        description: "Strategic campaigns to engage new donors and volunteers."
      },
      {
        title: "Impact",
        description: "Measuring results to maximize your social reach and awareness."
      },
      {
        title: "Community",
        description: "Fostering active engagement with your supporters and stakeholders."
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
      followUs: "Follow us :"
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
    jellyCursor: "Was wir tun",
    preloader: "Wird geladen…",
    hero: {
      impactText: "Wirkung sichtbar machen.",
      mainParagraph: "Wir machen Ihre Wirkungen sichtbar. Wir übernehmen Webseiten, Videos und Promotion und halten Ihnen den Rücken frei für das Wesentliche — diese Welt zum Besseren zu verändern."
    },
    whyUs: [
      {
        title: "Profile",
        description: "Professionelle Präsenz aufbauen, die Vertrauen schafft."
      },
      {
        title: "Inhalte",
        description: "Storytelling, das bewegt und Ihre Mission sichtbar macht."
      },
      {
        title: "Sichtbarkeit",
        description: "Gezielte Kampagnen zur Gewinnung von Spendern und Ehrenamtlichen."
      },
      {
        title: "Wirkung",
        description: "Ergebnisse messen, um die soziale Reichweite zu maximieren."
      },
      {
        title: "Community",
        description: "Aktiven Austausch mit Unterstützern und Förderern fördern."
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
      followUs: "Folge uns:"
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
