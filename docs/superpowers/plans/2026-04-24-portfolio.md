# Portfolio Fullstack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, dark minimal, animated, bilingual FR/EN Fullstack Developer portfolio with six scroll-triggered sections and a horizontal-scroll project showcase.

**Architecture:** Single-page scroll with sections Hero → About → Stack → Experience → Projects → Contact. All content lives in `src/content/*.ts` typed data files — never inside components. Layout wrapping order: `I18nProvider` → `SmoothScroll` (Lenis) → chrome overlays (CustomCursor, ScrollProgress, BackToTop) → sticky `Header` → `<main>` sections → `Footer`. Animations use `motion/react` shared variants; Projects section pins via `position: sticky` and translates cards horizontally using `useScroll` + `useTransform`.

**Tech Stack:** Vite 7, React 19, TypeScript 5.9 (strict, `verbatimModuleSyntax`, `erasableSyntaxOnly`), Tailwind CSS v4 (`@tailwindcss/vite`), `motion` v12 (`motion/react`), `lenis`, `clsx`, Vitest + `@testing-library/react`

---

## File Map

| File | Responsibility |
|---|---|
| `src/types/content.ts` | Shared data types (`Project`, `ExperienceItem`, `SkillGroup`, `Personal`, `Lang`) |
| `src/content/personal.ts` | Your name, role, pitch, email, socials, CV link |
| `src/content/projects.ts` | Array of `Project` (images, stack, links) |
| `src/content/experience.ts` | Array of `ExperienceItem` (timeline) |
| `src/content/stack.ts` | Array of `SkillGroup` (FE / BE / Tooling) |
| `src/lib/i18n/translations.ts` | Static FR/EN string table (nav, sections, CTAs) |
| `src/lib/i18n/I18nProvider.tsx` | `I18nContext` + `useT()` hook + `useLang()` hook |
| `src/lib/motion/variants.ts` | Shared motion variants (`fadeUp`, `fadeIn`, `stagger`, `revealContainer`) |
| `src/lib/utils/cn.ts` | `cn(...classes)` wrapper over `clsx` |
| `src/lib/hooks/useScrollProgress.ts` | Page-level `scrollYProgress` (0→1) |
| `src/lib/hooks/useCustomCursor.ts` | Mouse position + hover state for custom cursor |
| `src/lib/hooks/useLenis.ts` | Lenis init + cleanup, returns instance |
| `src/lib/hooks/useMediaQuery.ts` | Boolean helpers: `isDesktop`, `prefersReducedMotion` |
| `src/components/ui/SectionHeading.tsx` | Mono label + display title with RevealText |
| `src/components/ui/RevealText.tsx` | Splits text into words/chars, stagger-animates on mount or inView |
| `src/components/ui/TechBadge.tsx` | Pill badge for a technology name |
| `src/components/ui/MagneticButton.tsx` | CTA button that moves toward cursor on hover |
| `src/components/ui/LangToggle.tsx` | FR / EN toggle button |
| `src/components/ui/ProjectCard.tsx` | Project card (image, title, stack, links) |
| `src/components/ui/TimelineItem.tsx` | Single experience row (period, role, company, bullets) |
| `src/components/layout/SmoothScroll.tsx` | Lenis wrapper; syncs with motion `useAnimationFrame` |
| `src/components/layout/CustomCursor.tsx` | Dot + ring cursor (desktop only) |
| `src/components/layout/ScrollProgress.tsx` | Fixed horizontal progress bar at top |
| `src/components/layout/BackToTop.tsx` | Floating button that appears after 40% scroll |
| `src/components/layout/Header.tsx` | Logo + anchor nav + LangToggle + CV download |
| `src/components/layout/Footer.tsx` | Copyright + social links |
| `src/components/sections/Hero.tsx` | Full-viewport hero: name reveal + pitch + scroll cue |
| `src/components/sections/About.tsx` | Two-column about: text + portrait placeholder |
| `src/components/sections/Stack.tsx` | Three skill groups with stagger-in badges |
| `src/components/sections/Experience.tsx` | Alternating timeline |
| `src/components/sections/Projects.tsx` | Sticky horizontal scroll container |
| `src/components/sections/Contact.tsx` | Giant CTA heading + links + CV button |
| `src/App.tsx` | Composes I18nProvider + SmoothScroll + layout + sections |
| `src/main.tsx` | Entry point (update import path) |
| `src/index.css` | Tailwind v4 import + @theme tokens + global reset |
| `index.html` | Meta tags, preconnect fonts, theme-color |
| `vite.config.ts` | Add `@tailwindcss/vite` plugin |
| `vitest.config.ts` | Vitest config (jsdom, setupFiles) |
| `src/test/setup.ts` | Import `@testing-library/jest-dom` matchers |

---

## Task 1 — Foundations: git init, clean Vite demo, install deps

**Files:**
- Modify: `vite.config.ts`
- Modify: `src/main.tsx`
- Delete: `src/components/App.tsx`, `src/components/App.css`, `src/components/index.ts`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`

- [ ] **Step 1.1 — Init git and make initial commit**

```bash
cd /home/daiiruin/dev/SoloProject/ad-portfolio
git init
git add .
git commit -m "chore: initial Vite + React 19 + TypeScript scaffold"
```

- [ ] **Step 1.2 — Install runtime deps**

```bash
pnpm add motion lenis clsx geist
```

- [ ] **Step 1.3 — Install dev deps**

```bash
pnpm add -D tailwindcss @tailwindcss/vite vitest @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 1.4 — Update `vite.config.ts`**

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
});
```

- [ ] **Step 1.5 — Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
  },
});
```

- [ ] **Step 1.6 — Create `src/test/setup.ts`**

```ts
import "@testing-library/jest-dom";
```

- [ ] **Step 1.7 — Add test script to `package.json`**

Open `package.json` and add `"test": "vitest"` to the `scripts` object:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest"
  }
}
```

- [ ] **Step 1.8 — Delete the Vite demo files**

```bash
rm src/components/App.tsx src/components/App.css src/components/index.ts
```

- [ ] **Step 1.9 — Create empty `src/App.tsx` placeholder (to fix the import)**

```tsx
export default function App() {
  return <div style={{ background: "#0A0A0A", minHeight: "100vh" }} />;
}
```

- [ ] **Step 1.10 — Update `src/main.tsx`** to import from `./App` (not `./components`):

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 1.11 — Run dev server and verify no errors**

```bash
pnpm dev
```

Expected: Dev server starts on `http://localhost:5173`, page renders a solid `#0A0A0A` background with no console errors.

- [ ] **Step 1.12 — Commit**

```bash
git add -A
git commit -m "chore: clean Vite demo, install motion/tailwind/lenis/clsx/geist, add vitest"
```

---

## Task 2 — Content types

**Files:**
- Create: `src/types/content.ts`

- [ ] **Step 2.1 — Create `src/types/content.ts`**

```ts
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
```

- [ ] **Step 2.2 — Verify TypeScript compiles**

```bash
pnpm exec tsc --noEmit
```

Expected: No errors.

- [ ] **Step 2.3 — Commit**

```bash
git add src/types/content.ts
git commit -m "feat: add content types (Project, ExperienceItem, SkillGroup, Personal)"
```

---

## Task 3 — Content placeholders

**Files:**
- Create: `src/content/personal.ts`
- Create: `src/content/projects.ts`
- Create: `src/content/experience.ts`
- Create: `src/content/stack.ts`

- [ ] **Step 3.1 — Create `src/content/personal.ts`**

```ts
// ============================================================
// PLACEHOLDER — Fill in your own details before publishing
// ============================================================
import type { Personal } from "../types/content";

export const personal: Personal = {
  name: "Prénom Nom",
  handle: "AD",
  role: {
    fr: "Développeur Fullstack",
    en: "Fullstack Developer",
  },
  pitch: {
    fr: "Je conçois et construis des produits web performants et soignés, du backend au pixel.",
    en: "I design and build polished, performant web products, from backend to pixel.",
  },
  about: {
    fr: "Développeur passionné basé à Paris. Je travaille sur des projets web ambitieux en combinant performance technique et soin du détail. Disponible pour des missions freelance et des collaborations.",
    en: "Passionate developer based in Paris. I work on ambitious web projects combining technical performance with attention to detail. Available for freelance missions and collaborations.",
  },
  email: "your@email.com",
  location: "Paris, France",
  cvUrl: "/cv/cv.pdf",
  socials: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    x: "https://x.com/yourusername",
  },
};
```

- [ ] **Step 3.2 — Create `src/content/projects.ts`**

```ts
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
```

- [ ] **Step 3.3 — Create `src/content/experience.ts`**

```ts
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
```

- [ ] **Step 3.4 — Create `src/content/stack.ts`**

```ts
// ============================================================
// PLACEHOLDER — Update with your actual skills
// ============================================================
import type { SkillGroup } from "../types/content";

export const stack: SkillGroup[] = [
  {
    label: { fr: "Frontend", en: "Frontend" },
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Vue.js",
    ],
  },
  {
    label: { fr: "Backend", en: "Backend" },
    skills: [
      "Node.js",
      "Golang",
      "PostgreSQL",
      "Redis",
      "Prisma",
      "REST / GraphQL",
    ],
  },
  {
    label: { fr: "Outils", en: "Tooling" },
    skills: [
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Git",
      "Figma",
      "Linux",
    ],
  },
];
```

- [ ] **Step 3.5 — Create a placeholder project image (so the browser doesn't 404)**

```bash
mkdir -p public/projects public/cv
# Create a 1px placeholder SVG used as img src during development
cat > public/projects/placeholder.jpg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <rect width="1200" height="675" fill="#111111"/>
  <text x="600" y="337" fill="#333" font-family="monospace" font-size="24" text-anchor="middle" dominant-baseline="middle">project image</text>
</svg>
EOF
# Create a placeholder PDF stub
echo "%PDF-1.0 placeholder" > public/cv/cv.pdf
```

- [ ] **Step 3.6 — Verify TypeScript compiles**

```bash
pnpm exec tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3.7 — Commit**

```bash
git add src/content/ src/types/ public/
git commit -m "feat: add typed content placeholders (personal, projects, experience, stack)"
```

---

## Task 4 — Utility: `cn()`

**Files:**
- Create: `src/lib/utils/cn.ts`
- Create: `src/lib/utils/cn.test.ts`

- [ ] **Step 4.1 — Write the failing test**

Create `src/lib/utils/cn.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("joins class strings", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("filters falsy values", () => {
    expect(cn("foo", false, undefined, null, "bar")).toBe("foo bar");
  });

  it("handles conditional object", () => {
    expect(cn("base", { active: true, hidden: false })).toBe("base active");
  });

  it("returns empty string for no args", () => {
    expect(cn()).toBe("");
  });
});
```

- [ ] **Step 4.2 — Run test to verify it fails**

```bash
pnpm test cn
```

Expected: FAIL — `Cannot find module './cn'`

- [ ] **Step 4.3 — Implement `src/lib/utils/cn.ts`**

```ts
import { clsx } from "clsx";
import type { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
```

- [ ] **Step 4.4 — Run test to verify it passes**

```bash
pnpm test cn
```

Expected: 4 tests PASS.

- [ ] **Step 4.5 — Commit**

```bash
git add src/lib/utils/
git commit -m "feat: add cn() class utility with tests"
```

---

## Task 5 — i18n system

**Files:**
- Create: `src/lib/i18n/translations.ts`
- Create: `src/lib/i18n/I18nProvider.tsx`
- Create: `src/lib/i18n/I18nProvider.test.tsx`

- [ ] **Step 5.1 — Create `src/lib/i18n/translations.ts`**

```ts
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
```

- [ ] **Step 5.2 — Write the failing test for I18nProvider**

Create `src/lib/i18n/I18nProvider.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { I18nProvider, useT, useLang } from "./I18nProvider";

function TestConsumer() {
  const t = useT();
  const { lang, setLang } = useLang();
  return (
    <div>
      <span data-testid="nav-about">{t("nav.about")}</span>
      <span data-testid="lang">{lang}</span>
      <button onClick={() => setLang(lang === "fr" ? "en" : "fr")}>toggle</button>
    </div>
  );
}

describe("I18nProvider", () => {
  it("provides french translations by default when localStorage is set to fr", () => {
    localStorage.setItem("ad-portfolio-lang", "fr");
    render(
      <I18nProvider>
        <TestConsumer />
      </I18nProvider>
    );
    expect(screen.getByTestId("nav-about").textContent).toBe("À propos");
    expect(screen.getByTestId("lang").textContent).toBe("fr");
    localStorage.clear();
  });

  it("toggles language on setLang call", () => {
    localStorage.setItem("ad-portfolio-lang", "fr");
    render(
      <I18nProvider>
        <TestConsumer />
      </I18nProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: "toggle" }));
    expect(screen.getByTestId("nav-about").textContent).toBe("About");
    expect(screen.getByTestId("lang").textContent).toBe("en");
    localStorage.clear();
  });

  it("resolves nested dot-path keys", () => {
    localStorage.setItem("ad-portfolio-lang", "en");
    render(
      <I18nProvider>
        <TestConsumer />
      </I18nProvider>
    );
    expect(screen.getByTestId("nav-about").textContent).toBe("About");
    localStorage.clear();
  });
});
```

- [ ] **Step 5.3 — Run tests to verify they fail**

```bash
pnpm test I18nProvider
```

Expected: FAIL — `Cannot find module './I18nProvider'`

- [ ] **Step 5.4 — Implement `src/lib/i18n/I18nProvider.tsx`**

```tsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import { translations } from "./translations";
import type { Lang } from "../../types/content";

const STORAGE_KEY = "ad-portfolio-lang";

function detectLang(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "fr" || stored === "en") return stored;
  const browser = navigator.language.startsWith("fr") ? "fr" : "en";
  return browser;
}

type I18nContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (path: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (path: string): string => {
      const keys = path.split(".");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let node: any = translations[lang];
      for (const key of keys) {
        if (node == null || typeof node !== "object") return path;
        node = node[key];
      }
      return typeof node === "string" ? node : path;
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useT(): (path: string) => string {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useT must be inside I18nProvider");
  return ctx.t;
}

export function useLang(): { lang: Lang; setLang: (l: Lang) => void } {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useLang must be inside I18nProvider");
  return { lang: ctx.lang, setLang: ctx.setLang };
}
```

- [ ] **Step 5.5 — Run tests to verify they pass**

```bash
pnpm test I18nProvider
```

Expected: 3 tests PASS.

- [ ] **Step 5.6 — Commit**

```bash
git add src/lib/i18n/
git commit -m "feat: add i18n context with FR/EN translations, useT and useLang hooks"
```

---

## Task 6 — Motion variants + hooks

**Files:**
- Create: `src/lib/motion/variants.ts`
- Create: `src/lib/hooks/useScrollProgress.ts`
- Create: `src/lib/hooks/useCustomCursor.ts`
- Create: `src/lib/hooks/useLenis.ts`
- Create: `src/lib/hooks/useMediaQuery.ts`

- [ ] **Step 6.1 — Create `src/lib/motion/variants.ts`**

```ts
import type { Variants } from "motion/react";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

export const charReveal: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};
```

- [ ] **Step 6.2 — Create `src/lib/hooks/useScrollProgress.ts`**

```ts
import { useScroll } from "motion/react";
import type { MotionValue } from "motion/react";

export function useScrollProgress(): MotionValue<number> {
  const { scrollYProgress } = useScroll();
  return scrollYProgress;
}
```

- [ ] **Step 6.3 — Create `src/lib/hooks/useMediaQuery.ts`**

```ts
import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
```

- [ ] **Step 6.4 — Create `src/lib/hooks/useLenis.ts`**

```ts
import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import Lenis from "lenis";

export function useLenis(): RefObject<Lenis | null> {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
```

- [ ] **Step 6.5 — Create `src/lib/hooks/useCustomCursor.ts`**

```ts
import { useEffect, useRef, useState } from "react";

export type CursorState = "default" | "hover" | "text";

export function useCustomCursor() {
  const x = useRef(0);
  const y = useRef(0);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ringX = 0;
    let ringY = 0;
    let frameId: number;

    function onMove(e: MouseEvent) {
      x.current = e.clientX;
      y.current = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    }

    function lerp(from: number, to: number, t: number) {
      return from + (to - from) * t;
    }

    function loop() {
      ringX = lerp(ringX, x.current, 0.12);
      ringY = lerp(ringY, y.current, 0.12);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      frameId = requestAnimationFrame(loop);
    }

    frameId = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove);

    function onEnterLink() { setCursorState("hover"); }
    function onLeaveLink() { setCursorState("default"); }

    const interactives = document.querySelectorAll<HTMLElement>(
      "a, button, [data-cursor='hover']"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, []);

  return { dotRef, ringRef, cursorState };
}
```

- [ ] **Step 6.6 — Verify TypeScript**

```bash
pnpm exec tsc --noEmit
```

Expected: No errors.

- [ ] **Step 6.7 — Commit**

```bash
git add src/lib/
git commit -m "feat: motion variants, useScrollProgress, useLenis, useCustomCursor, useMediaQuery"
```

---

## Task 7 — CSS design system (Tailwind v4 + tokens + fonts)

**Files:**
- Modify: `src/index.css`
- Modify: `index.html`

- [ ] **Step 7.1 — Replace `src/index.css`**

```css
@import "geist/dist/fonts/geist-sans/index.css";
@import "geist/dist/fonts/geist-mono/index.css";
@import "tailwindcss";

@theme {
  /* Colors */
  --color-background: #0a0a0a;
  --color-surface: #111111;
  --color-foreground: #fafafa;
  --color-muted: #6b6b6b;
  --color-accent: #ff6b4a;
  --color-border: #1f1f1f;

  /* Fonts */
  --font-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, "JetBrains Mono", monospace;

  /* Spacing extras */
  --spacing-section: 8rem;
}

/* Base reset */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: auto; /* Lenis handles smooth scroll */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: #0a0a0a;
  color: #fafafa;
  font-family: var(--font-sans);
  overflow-x: hidden;
}

/* Hide default cursor when custom cursor is active */
@media (hover: hover) and (pointer: fine) {
  html.custom-cursor-active * {
    cursor: none !important;
  }
}

/* Focus ring */
:focus-visible {
  outline: 2px solid #ff6b4a;
  outline-offset: 3px;
  border-radius: 2px;
}

/* Skip link */
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  padding: 0.5rem 1rem;
  background: #ff6b4a;
  color: #0a0a0a;
  font-weight: 600;
  border-radius: 0 0 4px 4px;
  z-index: 9999;
  transition: top 0.2s;
}
.skip-link:focus {
  top: 0;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: #0a0a0a;
}
::-webkit-scrollbar-thumb {
  background: #2a2a2a;
  border-radius: 2px;
}
::-webkit-scrollbar-thumb:hover {
  background: #ff6b4a;
}
```

> **Note:** If `geist/dist/fonts/geist-sans/index.css` doesn't exist, check `node_modules/geist/dist/` for the actual path. Fallback: replace the two `@import "geist/..."` lines with the Google Fonts `<link>` for Inter in `index.html` and set `--font-sans: "Inter", ...`.

- [ ] **Step 7.2 — Update `index.html` with meta tags**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0a0a0a" />
    <meta name="description" content="Fullstack Developer portfolio — building polished web products from backend to pixel." />
    <meta property="og:title" content="AD — Fullstack Developer" />
    <meta property="og:description" content="Building polished, performant web products from backend to pixel." />
    <meta property="og:image" content="/og-image.jpg" />
    <meta property="og:type" content="website" />
    <title>AD — Fullstack Developer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 7.3 — Create a minimal favicon**

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#0a0a0a"/>
  <text x="16" y="23" fill="#ff6b4a" font-family="monospace" font-size="18" font-weight="bold" text-anchor="middle">AD</text>
</svg>
```

- [ ] **Step 7.4 — Run dev server and verify design tokens are loaded**

```bash
pnpm dev
```

Expected: page background is `#0a0a0a`, no CSS errors in console. If Geist font import fails, check the path inside `node_modules/geist/dist/` and update the import accordingly.

- [ ] **Step 7.5 — Commit**

```bash
git add src/index.css index.html public/favicon.svg
git commit -m "feat: Tailwind v4 design system, tokens, Geist fonts, meta tags, favicon"
```

---

## Task 8 — UI atoms: `RevealText`, `SectionHeading`, `TechBadge`

**Files:**
- Create: `src/components/ui/RevealText.tsx`
- Create: `src/components/ui/SectionHeading.tsx`
- Create: `src/components/ui/TechBadge.tsx`

- [ ] **Step 8.1 — Create `src/components/ui/RevealText.tsx`**

Splits text into individual word spans, staggered on mount or when entering the viewport.

```tsx
import { motion, useReducedMotion } from "motion/react";
import { charReveal, staggerContainer } from "../../lib/motion/variants";
import { cn } from "../../lib/utils/cn";

type RevealTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  once?: boolean;
};

export function RevealText({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  once = true,
}: RevealTextProps) {
  const shouldReduce = useReducedMotion();

  const words = text.split(" ");

  if (shouldReduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <motion.div
      variants={{
        ...staggerContainer,
        visible: {
          ...staggerContainer.visible,
          transition: {
            ...(staggerContainer.visible as { transition?: object }).transition,
            delayChildren: delay,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={cn("overflow-hidden", className)}
      style={{ display: "inline-flex", flexWrap: "wrap", gap: "0.25em" }}
    >
      {words.map((word, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
          <motion.span
            variants={charReveal}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
```

- [ ] **Step 8.2 — Create `src/components/ui/SectionHeading.tsx`**

```tsx
import { cn } from "../../lib/utils/cn";
import { RevealText } from "./RevealText";

type SectionHeadingProps = {
  label: string;
  title: string;
  className?: string;
};

export function SectionHeading({ label, title, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-16 flex flex-col gap-3", className)}>
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
        {label}
      </span>
      <h2
        className="font-sans font-semibold leading-[0.95] tracking-tight text-foreground"
        style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
      >
        <RevealText text={title} once />
      </h2>
    </div>
  );
}
```

- [ ] **Step 8.3 — Create `src/components/ui/TechBadge.tsx`**

```tsx
import { motion } from "motion/react";
import { fadeIn } from "../../lib/motion/variants";
import { cn } from "../../lib/utils/cn";

type TechBadgeProps = {
  name: string;
  className?: string;
};

export function TechBadge({ name, className }: TechBadgeProps) {
  return (
    <motion.span
      variants={fadeIn}
      className={cn(
        "inline-block rounded-full border border-border bg-surface px-4 py-2",
        "font-mono text-xs uppercase tracking-wider text-foreground",
        "transition-colors duration-200 hover:border-accent hover:text-accent",
        className
      )}
    >
      {name}
    </motion.span>
  );
}
```

- [ ] **Step 8.4 — Verify TypeScript**

```bash
pnpm exec tsc --noEmit
```

Expected: No errors.

- [ ] **Step 8.5 — Commit**

```bash
git add src/components/ui/
git commit -m "feat: RevealText, SectionHeading, TechBadge UI atoms"
```

---

## Task 9 — UI molecules: `MagneticButton`, `LangToggle`, `TimelineItem`, `ProjectCard`

**Files:**
- Create: `src/components/ui/MagneticButton.tsx`
- Create: `src/components/ui/LangToggle.tsx`
- Create: `src/components/ui/TimelineItem.tsx`
- Create: `src/components/ui/ProjectCard.tsx`

- [ ] **Step 9.1 — Create `src/components/ui/MagneticButton.tsx`**

```tsx
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "../../lib/utils/cn";
import { useIsDesktop } from "../../lib/hooks/useMediaQuery";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  download?: boolean | string;
  onClick?: () => void;
  variant?: "primary" | "outline";
};

export function MagneticButton({
  children,
  className,
  href,
  download,
  onClick,
  variant = "primary",
}: MagneticButtonProps) {
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  function handleMouse(e: React.MouseEvent) {
    if (!isDesktop || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.3);
    y.set(dy * 0.3);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const baseClass = cn(
    "relative inline-flex items-center gap-2 rounded-full px-7 py-3.5",
    "font-sans text-sm font-medium transition-colors duration-200",
    variant === "primary"
      ? "bg-accent text-background hover:bg-accent/90"
      : "border border-border text-foreground hover:border-accent hover:text-accent",
    className
  );

  const motionProps = {
    ref,
    style: { x: springX, y: springY },
    onMouseMove: handleMouse,
    onMouseLeave: handleLeave,
    className: baseClass,
  };

  if (href) {
    return (
      <motion.a
        {...motionProps}
        href={href}
        download={download}
        target={download ? undefined : "_blank"}
        rel={download ? undefined : "noopener noreferrer"}
        onClick={onClick}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button {...motionProps} type="button" onClick={onClick}>
      {children}
    </motion.button>
  );
}
```

- [ ] **Step 9.2 — Create `src/components/ui/LangToggle.tsx`**

```tsx
import { useLang } from "../../lib/i18n/I18nProvider";

export function LangToggle() {
  const { lang, setLang } = useLang();

  return (
    <button
      type="button"
      onClick={() => setLang(lang === "fr" ? "en" : "fr")}
      className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-foreground"
      aria-label={lang === "fr" ? "Switch to English" : "Passer en français"}
    >
      <span className={lang === "fr" ? "text-foreground" : ""}>FR</span>
      <span className="mx-1 text-border">/</span>
      <span className={lang === "en" ? "text-foreground" : ""}>EN</span>
    </button>
  );
}
```

- [ ] **Step 9.3 — Create `src/components/ui/TimelineItem.tsx`**

```tsx
import { motion } from "motion/react";
import type { ExperienceItem } from "../../types/content";
import type { Lang } from "../../types/content";
import { fadeUp, slideInLeft, slideInRight } from "../../lib/motion/variants";

type TimelineItemProps = {
  item: ExperienceItem;
  lang: Lang;
  index: number;
};

export function TimelineItem({ item, lang, index }: TimelineItemProps) {
  const isEven = index % 2 === 0;
  const variant = isEven ? slideInLeft : slideInRight;

  return (
    <motion.div
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`flex w-full gap-8 ${isEven ? "flex-row" : "flex-row-reverse"} items-start`}
    >
      {/* Content */}
      <div className="flex-1 rounded-2xl border border-border bg-surface p-6 lg:p-8">
        <div className="mb-1 font-mono text-xs uppercase tracking-widest text-muted">
          {item.period} — {item.location}
        </div>
        <h3 className="mb-1 text-lg font-semibold text-foreground">
          {item.role[lang]}
        </h3>
        <div className="mb-4 font-mono text-sm text-accent">{item.company}</div>
        <ul className="space-y-2">
          {item.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-2 text-sm text-muted">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {bullet[lang]}
            </li>
          ))}
        </ul>
      </div>

      {/* Connector dot (hidden on mobile) */}
      <div className="hidden shrink-0 flex-col items-center lg:flex">
        <div className="h-3 w-3 rounded-full border-2 border-accent bg-background" />
        <div className="w-px flex-1 bg-border" />
      </div>

      {/* Spacer for the other side */}
      <div className="hidden flex-1 lg:block" />
    </motion.div>
  );
}
```

- [ ] **Step 9.4 — Create `src/components/ui/ProjectCard.tsx`**

```tsx
import { motion } from "motion/react";
import type { Project } from "../../types/content";
import type { Lang } from "../../types/content";
import { useT } from "../../lib/i18n/I18nProvider";
import { cn } from "../../lib/utils/cn";

type ProjectCardProps = {
  project: Project;
  lang: Lang;
  className?: string;
};

export function ProjectCard({ project, lang, className }: ProjectCardProps) {
  const t = useT();

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "group relative flex h-full w-[65vw] max-w-2xl shrink-0 flex-col overflow-hidden",
        "rounded-2xl border border-border bg-surface",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-background">
        <img
          src={project.image}
          alt={project.title[lang]}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Year label */}
        <span className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 font-mono text-xs text-muted backdrop-blur-sm">
          {project.year}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="text-xl font-semibold text-foreground">
          {project.title[lang]}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-muted">
          {project.summary[lang]}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-2">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:text-foreground"
            >
              {t("projects.viewLive")} →
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-foreground"
            >
              {t("projects.viewCode")} ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
```

- [ ] **Step 9.5 — Verify TypeScript**

```bash
pnpm exec tsc --noEmit
```

Expected: No errors.

- [ ] **Step 9.6 — Commit**

```bash
git add src/components/ui/
git commit -m "feat: MagneticButton, LangToggle, TimelineItem, ProjectCard"
```

---

## Task 10 — Layout chrome: `CustomCursor`, `ScrollProgress`, `BackToTop`, `SmoothScroll`

**Files:**
- Create: `src/components/layout/CustomCursor.tsx`
- Create: `src/components/layout/ScrollProgress.tsx`
- Create: `src/components/layout/BackToTop.tsx`
- Create: `src/components/layout/SmoothScroll.tsx`

- [ ] **Step 10.1 — Create `src/components/layout/CustomCursor.tsx`**

```tsx
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useIsDesktop } from "../../lib/hooks/useMediaQuery";
import { cn } from "../../lib/utils/cn";

export function CustomCursor() {
  const isDesktop = useIsDesktop();
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 18 });

  useEffect(() => {
    if (!isDesktop) return;
    document.documentElement.classList.add("custom-cursor-active");

    function onMove(e: MouseEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [isDesktop, mouseX, mouseY]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ x: mouseX, y: mouseY }}
      />
      {/* Ring */}
      <motion.div
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[9997]",
          "h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full",
          "border border-foreground/30"
        )}
        style={{ x: ringX, y: ringY }}
      />
    </>
  );
}
```

- [ ] **Step 10.2 — Create `src/components/layout/ScrollProgress.tsx`**

```tsx
import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
```

- [ ] **Step 10.3 — Create `src/components/layout/BackToTop.tsx`**

```tsx
import { motion, useScroll, useTransform } from "motion/react";
import { useIsDesktop } from "../../lib/hooks/useMediaQuery";

export function BackToTop() {
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.35], [0, 0, 1]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!isDesktop) return null;

  return (
    <motion.button
      style={{ opacity }}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-accent hover:text-accent"
      aria-label="Back to top"
      type="button"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.button>
  );
}
```

- [ ] **Step 10.4 — Create `src/components/layout/SmoothScroll.tsx`**

```tsx
import { useEffect } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 10.5 — Verify TypeScript**

```bash
pnpm exec tsc --noEmit
```

Expected: No errors.

- [ ] **Step 10.6 — Commit**

```bash
git add src/components/layout/
git commit -m "feat: CustomCursor, ScrollProgress, BackToTop, SmoothScroll layout components"
```

---

## Task 11 — `Header` + `Footer`

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 11.1 — Create `src/components/layout/Header.tsx`**

```tsx
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { LangToggle } from "../ui/LangToggle";
import { useT } from "../../lib/i18n/I18nProvider";
import { personal } from "../../content/personal";
import { cn } from "../../lib/utils/cn";

const NAV_ITEMS = [
  { key: "nav.about", href: "#about" },
  { key: "nav.stack", href: "#stack" },
  { key: "nav.experience", href: "#experience" },
  { key: "nav.work", href: "#projects" },
  { key: "nav.contact", href: "#contact" },
] as const;

export function Header() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "fixed inset-x-0 top-2 z-40 mx-auto flex max-w-7xl items-center justify-between",
        "rounded-2xl px-6 py-4 transition-all duration-300",
        scrolled
          ? "bg-background/90 shadow-lg shadow-black/30 backdrop-blur-md border border-border"
          : "bg-transparent"
      )}
    >
      {/* Logo */}
      <a
        href="#hero"
        className="font-mono text-sm font-semibold uppercase tracking-widest text-foreground transition-colors hover:text-accent"
      >
        {personal.handle}
      </a>

      {/* Nav */}
      <nav aria-label="Main navigation">
        <ul className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map(({ key, href }) => (
            <li key={key}>
              <a
                href={href}
                className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-foreground"
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right controls */}
      <div className="flex items-center gap-4">
        <LangToggle />
        <a
          href={personal.cvUrl}
          download
          className="hidden rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-wider text-foreground transition-colors hover:border-accent hover:text-accent sm:inline-flex"
        >
          CV
        </a>
      </div>
    </motion.header>
  );
}
```

- [ ] **Step 11.2 — Create `src/components/layout/Footer.tsx`**

```tsx
import { useT } from "../../lib/i18n/I18nProvider";
import { personal } from "../../content/personal";

export function Footer() {
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <span className="font-mono text-xs text-muted">
          © {year} {personal.name} — {t("footer.rights")}
        </span>
        <div className="flex items-center gap-6">
          {personal.socials.github && (
            <a
              href={personal.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          )}
          {personal.socials.linkedin && (
            <a
              href={personal.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
          )}
          {personal.socials.x && (
            <a
              href={personal.socials.x}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-foreground"
            >
              X
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 11.3 — Verify TypeScript**

```bash
pnpm exec tsc --noEmit
```

Expected: No errors.

- [ ] **Step 11.4 — Commit**

```bash
git add src/components/layout/Header.tsx src/components/layout/Footer.tsx
git commit -m "feat: Header (sticky nav + lang toggle + CV) and Footer"
```

---

## Task 12 — `App.tsx` skeleton + wire everything

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 12.1 — Replace `src/App.tsx` with full skeleton**

```tsx
import { I18nProvider } from "./lib/i18n/I18nProvider";
import { SmoothScroll } from "./components/layout/SmoothScroll";
import { CustomCursor } from "./components/layout/CustomCursor";
import { ScrollProgress } from "./components/layout/ScrollProgress";
import { BackToTop } from "./components/layout/BackToTop";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Stack } from "./components/sections/Stack";
import { Experience } from "./components/sections/Experience";
import { Projects } from "./components/sections/Projects";
import { Contact } from "./components/sections/Contact";

export default function App() {
  return (
    <I18nProvider>
      <SmoothScroll>
        {/* Chrome overlays */}
        <CustomCursor />
        <ScrollProgress />
        <BackToTop />

        {/* Skip link */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        <Header />

        <main id="main-content">
          <Hero />
          <About />
          <Stack />
          <Experience />
          <Projects />
          <Contact />
        </main>

        <Footer />
      </SmoothScroll>
    </I18nProvider>
  );
}
```

> **Note:** The section imports will fail until Task 13–18 create those files. Create stub files for each section right after this step (Step 12.2).

- [ ] **Step 12.2 — Create stub section files so App.tsx compiles**

Create each file with a minimal placeholder:

`src/components/sections/Hero.tsx`:
```tsx
export function Hero() {
  return <section id="hero" className="min-h-screen bg-background" />;
}
```

`src/components/sections/About.tsx`:
```tsx
export function About() {
  return <section id="about" className="min-h-screen bg-background" />;
}
```

`src/components/sections/Stack.tsx`:
```tsx
export function Stack() {
  return <section id="stack" className="min-h-screen bg-background" />;
}
```

`src/components/sections/Experience.tsx`:
```tsx
export function Experience() {
  return <section id="experience" className="min-h-screen bg-background" />;
}
```

`src/components/sections/Projects.tsx`:
```tsx
export function Projects() {
  return <section id="projects" className="min-h-screen bg-background" />;
}
```

`src/components/sections/Contact.tsx`:
```tsx
export function Contact() {
  return <section id="contact" className="min-h-screen bg-background" />;
}
```

- [ ] **Step 12.3 — Run dev server and verify the skeleton renders**

```bash
pnpm dev
```

Expected: Dark background, header slides in at the top, custom cursor visible on desktop, scroll progress bar visible on scroll. No console errors.

- [ ] **Step 12.4 — Commit**

```bash
git add src/App.tsx src/components/sections/
git commit -m "feat: App.tsx skeleton wiring all providers, layout, and section stubs"
```

---

## Task 13 — Hero section

**Files:**
- Modify: `src/components/sections/Hero.tsx`

- [ ] **Step 13.1 — Replace `src/components/sections/Hero.tsx`**

```tsx
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { useT, useLang } from "../../lib/i18n/I18nProvider";
import { personal } from "../../content/personal";
import { RevealText } from "../ui/RevealText";
import { staggerContainer, fadeUp } from "../../lib/motion/variants";
import { MagneticButton } from "../ui/MagneticButton";

export function Hero() {
  const t = useT();
  const { lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const subtitleY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-screen flex-col items-start justify-center overflow-hidden px-6 pb-16 pt-32 lg:px-16"
      aria-labelledby="hero-heading"
    >
      <motion.div
        className="relative z-10 max-w-7xl w-full mx-auto"
        style={shouldReduce ? {} : { opacity }}
      >
        {/* Role label */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-6 flex items-center gap-3"
        >
          <motion.span
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.15em] text-muted"
          >
            {personal.role[lang]}
          </motion.span>
          <motion.span
            variants={fadeUp}
            className="h-px w-12 bg-accent"
          />
        </motion.div>

        {/* Main heading */}
        <h1
          id="hero-heading"
          className="mb-8 font-sans font-semibold leading-[0.9] tracking-tight text-foreground"
          style={{ fontSize: "clamp(4rem, 12vw, 12rem)" }}
        >
          <RevealText text={personal.name} delay={0.2} once />
        </h1>

        {/* Pitch */}
        <motion.p
          style={shouldReduce ? {} : { y: subtitleY }}
          className="mb-12 max-w-xl text-lg leading-relaxed text-muted lg:text-xl"
        >
          {personal.pitch[lang]}
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
        >
          <MagneticButton href="#projects" variant="primary">
            {t("hero.cta")}
            <span aria-hidden>→</span>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-6 flex items-center gap-3 lg:left-16"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          ↓
        </motion.span>
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
          {t("hero.scrollCue")}
        </span>
      </motion.div>

      {/* Background accent gradient */}
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/2 rounded-full bg-accent/5 blur-[120px]"
        aria-hidden
      />
    </section>
  );
}
```

- [ ] **Step 13.2 — Run dev server and verify Hero renders**

```bash
pnpm dev
```

Expected: Dark full-viewport section, large name text with stagger reveal on load, pitch text below, orange CTA button, scroll cue bouncing at the bottom, subtle orange glow on the right.

- [ ] **Step 13.3 — Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: Hero section with text reveal, parallax pitch, and magnetic CTA"
```

---

## Task 14 — About section

**Files:**
- Modify: `src/components/sections/About.tsx`

- [ ] **Step 14.1 — Replace `src/components/sections/About.tsx`**

```tsx
import { motion } from "motion/react";
import { useT, useLang } from "../../lib/i18n/I18nProvider";
import { personal } from "../../content/personal";
import { SectionHeading } from "../ui/SectionHeading";
import { fadeUp, fadeIn, staggerContainer } from "../../lib/motion/variants";

export function About() {
  const t = useT();
  const { lang } = useLang();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="px-6 py-section lg:px-16"
      style={{ paddingTop: "8rem", paddingBottom: "8rem" }}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label={t("about.label")}
          title={t("about.title")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24"
        >
          {/* Text */}
          <div className="flex flex-col gap-8">
            <motion.p
              variants={fadeUp}
              className="text-lg leading-relaxed text-muted lg:text-xl"
            >
              {personal.about[lang]}
            </motion.p>

            {/* Meta info */}
            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-wider text-muted/50">
                  Location
                </span>
                <span className="h-px flex-1 bg-border" />
                <span className="font-mono text-xs text-foreground">
                  {personal.location}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-wider text-muted/50">
                  Status
                </span>
                <span className="h-px flex-1 bg-border" />
                <span className="flex items-center gap-2 font-mono text-xs text-accent">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                  {lang === "fr" ? "Disponible" : "Available"}
                </span>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div variants={fadeUp} className="flex gap-6">
              {personal.socials.github && (
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-foreground"
                >
                  GitHub ↗
                </a>
              )}
              {personal.socials.linkedin && (
                <a
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-foreground"
                >
                  LinkedIn ↗
                </a>
              )}
            </motion.div>
          </div>

          {/* Portrait placeholder */}
          <motion.div
            variants={fadeIn}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-surface"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-xs uppercase tracking-widest text-muted/40">
                {lang === "fr" ? "Votre photo ici" : "Your photo here"}
              </span>
            </div>
            {/* Corner accent */}
            <div className="absolute bottom-4 right-4 h-16 w-16 rounded-full border border-accent/20 bg-accent/5" />
            <div className="absolute left-4 top-4 h-2 w-2 rounded-full bg-accent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 14.2 — Run dev server and verify About renders**

```bash
pnpm dev
```

Expected: Two-column layout on desktop (text left, portrait placeholder right), stagger-in animations on scroll. Single column on mobile.

- [ ] **Step 14.3 — Commit**

```bash
git add src/components/sections/About.tsx
git commit -m "feat: About section with two-column layout and scroll-in animations"
```

---

## Task 15 — Stack section

**Files:**
- Modify: `src/components/sections/Stack.tsx`

- [ ] **Step 15.1 — Replace `src/components/sections/Stack.tsx`**

```tsx
import { motion } from "motion/react";
import { useT, useLang } from "../../lib/i18n/I18nProvider";
import { stack } from "../../content/stack";
import { SectionHeading } from "../ui/SectionHeading";
import { TechBadge } from "../ui/TechBadge";
import { staggerContainer, staggerContainerSlow, fadeUp } from "../../lib/motion/variants";

export function Stack() {
  const t = useT();
  const { lang } = useLang();

  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className="px-6 lg:px-16"
      style={{ paddingTop: "8rem", paddingBottom: "8rem" }}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label={t("stack.label")}
          title={t("stack.title")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-12 md:grid-cols-3"
        >
          {stack.map((group) => (
            <motion.div key={group.label.en} variants={fadeUp}>
              <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.15em] text-muted">
                {group.label[lang]}
              </h3>
              <motion.div
                variants={staggerContainerSlow}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {group.skills.map((skill) => (
                  <TechBadge key={skill} name={skill} />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 15.2 — Run dev server and verify Stack renders**

```bash
pnpm dev
```

Expected: Three-column grid of skill groups with stagger-in badges on scroll entry. Badges have hover accent color change.

- [ ] **Step 15.3 — Commit**

```bash
git add src/components/sections/Stack.tsx
git commit -m "feat: Stack section with grouped tech badges and cascade animation"
```

---

## Task 16 — Experience section

**Files:**
- Modify: `src/components/sections/Experience.tsx`

- [ ] **Step 16.1 — Replace `src/components/sections/Experience.tsx`**

```tsx
import { motion } from "motion/react";
import { useT, useLang } from "../../lib/i18n/I18nProvider";
import { experience } from "../../content/experience";
import { SectionHeading } from "../ui/SectionHeading";
import { TimelineItem } from "../ui/TimelineItem";
import { staggerContainer, fadeUp } from "../../lib/motion/variants";

export function Experience() {
  const t = useT();
  const { lang } = useLang();

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="px-6 lg:px-16"
      style={{ paddingTop: "8rem", paddingBottom: "8rem" }}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label={t("experience.label")}
          title={t("experience.title")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative flex flex-col gap-8"
        >
          {/* Vertical line (desktop only) */}
          <div
            className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-border lg:block"
            aria-hidden
          />

          {experience.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              lang={lang}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 16.2 — Run dev server and verify Experience renders**

```bash
pnpm dev
```

Expected: Alternating left/right timeline items on desktop (single column on mobile), slide-in from left/right on scroll, vertical center line on desktop.

- [ ] **Step 16.3 — Commit**

```bash
git add src/components/sections/Experience.tsx
git commit -m "feat: Experience section with alternating timeline animation"
```

---

## Task 17 — Projects section (horizontal scroll)

**Files:**
- Modify: `src/components/sections/Projects.tsx`

This is the most complex section. The mechanic: a tall outer container is scrolled past vertically; inside, an inner div is `position: sticky` (sticks to `top: 0`), and as the user scrolls, `useScroll`+`useTransform` translates the cards container on the X axis, creating the horizontal carousel effect.

- [ ] **Step 17.1 — Replace `src/components/sections/Projects.tsx`**

```tsx
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useT, useLang } from "../../lib/i18n/I18nProvider";
import { projects } from "../../content/projects";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectCard } from "../ui/ProjectCard";

const CARD_WIDTH_VW = 65;
const CARD_GAP = 32;

export function Projects() {
  const t = useT();
  const { lang } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalTranslate =
    projects.length * CARD_WIDTH_VW + (projects.length - 1) * (CARD_GAP / 16) * 4;

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(projects.length - 1) * CARD_WIDTH_VW}vw`]
  );

  if (shouldReduce) {
    return (
      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="px-6 lg:px-16"
        style={{ paddingTop: "8rem", paddingBottom: "8rem" }}
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label={t("projects.label")}
            title={t("projects.title")}
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} lang={lang} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Outer container — height controls how much scroll triggers the horizontal move */}
      <div
        ref={containerRef}
        style={{ height: `${projects.length * 100}vh` }}
        className="relative"
        id="projects"
      >
        {/* Sticky inner */}
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          {/* Heading (fixed in the sticky view) */}
          <div className="px-6 pb-8 lg:px-16">
            <SectionHeading
              label={t("projects.label")}
              title={t("projects.title")}
            />
          </div>

          {/* Cards track */}
          <motion.div
            style={{ x }}
            className="flex items-stretch gap-8 pl-6 lg:pl-16"
          >
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProjectCard project={project} lang={lang} />
              </motion.div>
            ))}

            {/* End spacer */}
            <div className="w-6 shrink-0 lg:w-16" />
          </motion.div>

          {/* Progress indicator */}
          <div className="mt-8 flex justify-center gap-2 px-6 lg:px-16">
            {projects.map((_, i) => (
              <motion.div
                key={i}
                className="h-0.5 rounded-full bg-border"
                style={{
                  width: i === 0 ? 32 : 16,
                  backgroundColor: undefined,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 17.2 — Run dev server and verify the horizontal scroll**

```bash
pnpm dev
```

Expected: When you scroll into the Projects section, the section "sticks" to the viewport and the cards slide horizontally from right to left as you scroll down. The total scroll depth is proportional to the number of projects. On mobile, scroll is still usable (cards partially visible).

> **If the horizontal motion feels off:** Adjust the `offset` in `useScroll` or the `x` useTransform range. The key formula: total horizontal distance = `(N - 1) * cardWidth`, where `cardWidth ≈ 65vw`. The outer container height must be large enough that scrolling through it gives sufficient range.

- [ ] **Step 17.3 — Commit**

```bash
git add src/components/sections/Projects.tsx
git commit -m "feat: Projects section with sticky horizontal scroll animation"
```

---

## Task 18 — Contact section

**Files:**
- Modify: `src/components/sections/Contact.tsx`

- [ ] **Step 18.1 — Replace `src/components/sections/Contact.tsx`**

```tsx
import { motion } from "motion/react";
import { useT, useLang } from "../../lib/i18n/I18nProvider";
import { personal } from "../../content/personal";
import { SectionHeading } from "../ui/SectionHeading";
import { MagneticButton } from "../ui/MagneticButton";
import { RevealText } from "../ui/RevealText";
import { fadeUp, staggerContainer } from "../../lib/motion/variants";

export function Contact() {
  const t = useT();
  const { lang } = useLang();

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="px-6 lg:px-16"
      style={{ paddingTop: "8rem", paddingBottom: "8rem" }}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label={t("contact.label")}
          title={lang === "fr" ? "Contact" : "Contact"}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-12"
        >
          {/* Giant heading */}
          <div>
            <h2
              id="contact-heading"
              className="font-sans font-semibold leading-[0.9] tracking-tight text-foreground"
              style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
            >
              <RevealText text={t("contact.heading")} once />
            </h2>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-lg text-muted"
            >
              {t("contact.subheading")}
            </motion.p>
          </div>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton
              href={`mailto:${personal.email}`}
              variant="primary"
            >
              {t("contact.emailCta")}
              <span aria-hidden>→</span>
            </MagneticButton>

            <MagneticButton
              href={personal.cvUrl}
              download
              variant="outline"
            >
              {t("contact.downloadCv")}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden
              >
                <path
                  d="M7 1v8M3 9l4 4 4-4M1 13h12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </MagneticButton>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-8 border-t border-border pt-8"
          >
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm uppercase tracking-wider text-muted transition-colors hover:text-foreground"
              >
                GitHub ↗
              </a>
            )}
            {personal.socials.linkedin && (
              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm uppercase tracking-wider text-muted transition-colors hover:text-foreground"
              >
                LinkedIn ↗
              </a>
            )}
            {personal.socials.x && (
              <a
                href={personal.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm uppercase tracking-wider text-muted transition-colors hover:text-foreground"
              >
                X / Twitter ↗
              </a>
            )}
            <span className="font-mono text-sm text-muted/50">
              {personal.email}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 18.2 — Run dev server and verify Contact renders**

```bash
pnpm dev
```

Expected: Large heading with reveal animation, primary email CTA button, outline CV download button, social links below a divider. Both buttons have magnetic hover effect on desktop.

- [ ] **Step 18.3 — Commit**

```bash
git add src/components/sections/Contact.tsx
git commit -m "feat: Contact section with magnetic CTAs and social links"
```

---

## Task 19 — Mobile responsiveness pass

**Files:**
- Modify: `src/components/sections/Projects.tsx` (mobile fallback)
- Modify: `src/components/layout/Header.tsx` (mobile menu)

- [ ] **Step 19.1 — Add mobile nav to Header**

The current Header hides `nav` on mobile. Add a hamburger that shows a fullscreen overlay menu.

Open `src/components/layout/Header.tsx` and replace the file:

```tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LangToggle } from "../ui/LangToggle";
import { useT } from "../../lib/i18n/I18nProvider";
import { personal } from "../../content/personal";
import { cn } from "../../lib/utils/cn";

const NAV_ITEMS = [
  { key: "nav.about", href: "#about" },
  { key: "nav.stack", href: "#stack" },
  { key: "nav.experience", href: "#experience" },
  { key: "nav.work", href: "#projects" },
  { key: "nav.contact", href: "#contact" },
] as const;

export function Header() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 60); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed inset-x-0 top-2 z-40 mx-auto flex max-w-7xl items-center justify-between",
          "rounded-2xl px-6 py-4 transition-all duration-300",
          scrolled
            ? "bg-background/90 shadow-lg shadow-black/30 backdrop-blur-md border border-border"
            : "bg-transparent"
        )}
      >
        <a
          href="#hero"
          className="font-mono text-sm font-semibold uppercase tracking-widest text-foreground transition-colors hover:text-accent"
        >
          {personal.handle}
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map(({ key, href }) => (
              <li key={key}>
                <a
                  href={href}
                  className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-foreground"
                >
                  {t(key)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <LangToggle />
          <a
            href={personal.cvUrl}
            download
            className="hidden rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-wider text-foreground transition-colors hover:border-accent hover:text-accent sm:inline-flex"
          >
            CV
          </a>
          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block h-px w-5 bg-foreground origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-px w-5 bg-foreground"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block h-px w-5 bg-foreground origin-center"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 flex flex-col items-start justify-center bg-background/95 px-8 backdrop-blur-lg"
          >
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col gap-6">
                {NAV_ITEMS.map(({ key, href }, i) => (
                  <motion.li
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <a
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className="font-sans text-4xl font-semibold text-foreground transition-colors hover:text-accent"
                    >
                      {t(key)}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mt-12">
              <LangToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 19.2 — Verify on mobile viewport in browser**

In the browser dev tools, toggle to a 375px-wide viewport.

Expected: Hamburger icon replaces the nav links. Tapping it opens a fullscreen overlay with large nav links. Tapping a link closes the menu and scrolls to the section. The Projects section shows cards in a static grid instead of horizontal scroll (it falls back because `useReducedMotion` returns false but cards are still visible via the sticky layout which should still work — if cards overflow off-screen on 375px, the sticky layout degrades gracefully since `overflow: hidden` clips them and the user still scrolls normally through the section height).

> **Note:** The Projects section on very narrow viewports will show partial cards since `CARD_WIDTH_VW = 65`. This is acceptable — users can see there's more content. If you want a full grid fallback for mobile, check the viewport width in `Projects.tsx` using `useIsDesktop()` and render the grid layout when false, similar to the `shouldReduce` branch.

- [ ] **Step 19.3 — Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat: mobile hamburger menu with AnimatePresence overlay nav"
```

---

## Task 20 — A11y, build check, and OG image

**Files:**
- Create: `public/og-image.jpg` (placeholder)
- Verify build

- [ ] **Step 20.1 — Create OG image placeholder**

```bash
cat > public/og-image.jpg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0a0a0a"/>
  <text x="100" y="280" fill="#fafafa" font-family="monospace" font-size="80" font-weight="bold">AD</text>
  <text x="100" y="380" fill="#6b6b6b" font-family="monospace" font-size="32">Fullstack Developer</text>
  <rect x="100" y="420" width="60" height="3" fill="#ff6b4a"/>
</svg>
EOF
```

- [ ] **Step 20.2 — Run full TypeScript check**

```bash
pnpm exec tsc --noEmit
```

Expected: No errors.

- [ ] **Step 20.3 — Run linter**

```bash
pnpm lint
```

Expected: No errors. If there are `@typescript-eslint/no-explicit-any` errors in `I18nProvider.tsx`, they're already suppressed with the inline comment added in Task 5.

- [ ] **Step 20.4 — Run all tests**

```bash
pnpm test --run
```

Expected: All tests pass (cn: 4, I18nProvider: 3 = 7 total).

- [ ] **Step 20.5 — Run production build**

```bash
pnpm build
```

Expected: Build completes without errors. Output in `dist/`.

- [ ] **Step 20.6 — Preview and do final visual check**

```bash
pnpm preview
```

Open `http://localhost:4173` and verify:
1. Hero: name reveals letter-by-letter on load, scroll cue bounces, CTA button magnetic on hover
2. About: two columns, portrait placeholder, available status dot pulses
3. Stack: three columns of badges, stagger-in on scroll
4. Experience: alternating timeline items slide in from left/right
5. Projects: section pins, cards slide horizontally on scroll
6. Contact: giant heading reveals, email + CV buttons both clickable
7. Header: scrolled state adds backdrop blur; FR/EN toggle switches all text; mobile: hamburger opens overlay
8. Cursor: custom dot + ring follow mouse on desktop
9. Scroll progress: orange bar fills as you scroll
10. Back to top: button appears after ~40% scroll, click returns to top
11. Footer: copyright + social links

- [ ] **Step 20.7 — Final commit**

```bash
git add -A
git commit -m "feat: complete portfolio — all sections, animations, a11y, build verified"
```

---

## Filling In Your Content

After the portfolio is built, you only touch files in `src/content/` and `public/`:

| What to change | File |
|---|---|
| Your name, role, pitch, email, socials | `src/content/personal.ts` |
| Projects (add/remove/edit) | `src/content/projects.ts` |
| Work experience | `src/content/experience.ts` |
| Skills | `src/content/stack.ts` |
| Your photo | Replace placeholder in `About.tsx` with `<img src="/photo.jpg" ... />` |
| Project screenshots | `public/projects/1.jpg`, `2.jpg`, etc. (update paths in `projects.ts`) |
| CV PDF | `public/cv/cv.pdf` |
| OG image | `public/og-image.jpg` |
| Site title / description | `index.html` meta tags |
