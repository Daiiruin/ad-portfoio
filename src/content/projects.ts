// ============================================================
// PLACEHOLDER — Replace with your real projects
// Add as many entries as you want. Minimum recommended: 4.
// Images go in public/projects/ (e.g. /projects/myproject.jpg)
// ============================================================
import type { Project } from "../types/content";

export const projects: Project[] = [
  {
    id: "p1",
    year: 2026,
    title: { fr: "Nom du projet 1", en: "Project Name 1" },
    summary: {
      fr: "Description courte du projet. Ce qu'il fait, le problème qu'il résout.",
      en: "Short project description. What it does, what problem it solves.",
    },
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    image: "/projects/placeholder.jpg",
    links: { live: "https://example.com", github: "https://github.com" },
  },
  {
    id: "p2",
    year: 2025,
    title: { fr: "Nom du projet 2", en: "Project Name 2" },
    summary: {
      fr: "Description courte du projet. Ce qu'il fait, le problème qu'il résout.",
      en: "Short project description. What it does, what problem it solves.",
    },
    stack: ["Next.js", "Prisma", "Tailwind CSS"],
    image: "/projects/placeholder.jpg",
    links: { github: "https://github.com" },
  },
  {
    id: "p3",
    year: 2025,
    title: { fr: "Nom du projet 3", en: "Project Name 3" },
    summary: {
      fr: "Description courte du projet. Ce qu'il fait, le problème qu'il résout.",
      en: "Short project description. What it does, what problem it solves.",
    },
    stack: ["Vue.js", "Golang", "Docker"],
    image: "/projects/placeholder.jpg",
    links: { live: "https://example.com" },
  },
  {
    id: "p4",
    year: 2024,
    title: { fr: "Nom du projet 4", en: "Project Name 4" },
    summary: {
      fr: "Description courte du projet. Ce qu'il fait, le problème qu'il résout.",
      en: "Short project description. What it does, what problem it solves.",
    },
    stack: ["React Native", "Firebase", "TypeScript"],
    image: "/projects/placeholder.jpg",
    links: { github: "https://github.com" },
  },
];
