export const translations = {
  fr: {
    nav: {
      about: "À propos",
      stack: "Stack",
      experience: "Expérience",
      work: "Projets",
      contact: "Contact",
    },
    hero: {
      scrollCue: "Défiler",
      cta: "Voir mes projets",
    },
    about: {
      label: "01",
      title: "À propos",
    },
    stack: {
      label: "02",
      title: "Stack",
    },
    experience: {
      label: "03",
      title: "Expérience",
    },
    projects: {
      label: "04",
      title: "Projets",
      viewLive: "Voir le site",
      viewCode: "Code",
    },
    contact: {
      label: "05",
      heading: "Travaillons ensemble.",
      subheading: "Disponible pour missions & collaborations",
      emailCta: "Envoyer un email",
      downloadCv: "Télécharger le CV",
    },
    footer: {
      rights: "Tous droits réservés",
    },
  },
  en: {
    nav: {
      about: "About",
      stack: "Stack",
      experience: "Experience",
      work: "Work",
      contact: "Contact",
    },
    hero: {
      scrollCue: "Scroll",
      cta: "View my work",
    },
    about: {
      label: "01",
      title: "About",
    },
    stack: {
      label: "02",
      title: "Stack",
    },
    experience: {
      label: "03",
      title: "Experience",
    },
    projects: {
      label: "04",
      title: "Work",
      viewLive: "View live",
      viewCode: "Code",
    },
    contact: {
      label: "05",
      heading: "Let's work together.",
      subheading: "Available for missions & collaborations",
      emailCta: "Send an email",
      downloadCv: "Download CV",
    },
    footer: {
      rights: "All rights reserved",
    },
  },
} as const;

export type Translations = typeof translations;
