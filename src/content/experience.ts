// ============================================================
// PLACEHOLDER — Replace with your real experience
// period: display string e.g. "Jan 2024 – Present"
// ============================================================
import type { ExperienceItem } from "../types/content";

export const experience: ExperienceItem[] = [
  {
    id: "xp1",
    period: "2024 – Présent",
    role: { fr: "Développeur Fullstack Senior", en: "Senior Fullstack Developer" },
    company: "Nom de l'entreprise",
    location: "Paris, France",
    bullets: [
      {
        fr: "Développement de fonctionnalités fullstack sur un produit SaaS à forte croissance.",
        en: "Fullstack feature development on a high-growth SaaS product.",
      },
      {
        fr: "Mise en place d'une architecture microservices Node.js + Kubernetes.",
        en: "Setup of a Node.js + Kubernetes microservices architecture.",
      },
    ],
  },
  {
    id: "xp2",
    period: "2022 – 2024",
    role: { fr: "Développeur Frontend", en: "Frontend Developer" },
    company: "Nom de l'entreprise",
    location: "Remote",
    bullets: [
      {
        fr: "Refonte complète du front avec React + TypeScript, amélioration des perfs de 60%.",
        en: "Full frontend rewrite with React + TypeScript, 60% performance improvement.",
      },
      {
        fr: "Mise en place du design system et des tests automatisés.",
        en: "Setup of design system and automated tests.",
      },
    ],
  },
  {
    id: "xp3",
    period: "2021 – 2022",
    role: { fr: "Développeur Web Junior", en: "Junior Web Developer" },
    company: "Nom de l'entreprise",
    location: "Lyon, France",
    bullets: [
      {
        fr: "Développement de sites e-commerce sous Shopify et WordPress.",
        en: "Development of e-commerce sites on Shopify and WordPress.",
      },
    ],
  },
];
