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
