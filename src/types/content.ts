export type Lang = "fr" | "en";

export type LocalizedString = {
  fr: string;
  en: string;
};

export type Project = {
  id: string;
  year: number;
  title: LocalizedString;
  summary: LocalizedString;
  stack: string[];
  image: string;
  links: { live?: string; github?: string };
};

export type ExperienceItem = {
  id: string;
  period: string;
  role: LocalizedString;
  company: string;
  location: string;
  bullets: LocalizedString[];
};

export type SkillGroup = {
  label: LocalizedString;
  skills: string[];
};

export type Personal = {
  name: string;
  handle: string;
  role: LocalizedString;
  pitch: LocalizedString;
  about: LocalizedString;
  email: string;
  location: string;
  cvUrl: string;
  socials: {
    github?: string;
    linkedin?: string;
    x?: string;
  };
};
