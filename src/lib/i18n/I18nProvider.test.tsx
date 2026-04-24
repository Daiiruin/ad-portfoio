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
