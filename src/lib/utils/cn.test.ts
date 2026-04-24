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
