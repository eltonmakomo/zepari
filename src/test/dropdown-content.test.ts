import { describe, expect, it } from "vitest";
import { clients, testimonials } from "@/content/organization";
import { livePublications } from "@/content/live";
import { publicationsForType } from "@/content/publication-archive";
import { getPublication } from "@/content/queries";

describe("live dropdown destination content", () => {
  it("includes the live client directory rather than reusing partners", () => {
    const names = clients.groups.flatMap((group) => group.names);
    expect(names).toHaveLength(35);
    expect(names).toContain("Parliament of Zimbabwe");
    expect(names).toContain("Delta Corporation");
  });

  it("retains all nine live testimonials including the joint entry", () => {
    expect(testimonials).toHaveLength(9);
    expect(testimonials.find((item) => item.slug === "victor-gatsi-eusebia-mashiringwane")?.paragraphs.length).toBe(1);
  });

  it.each(["Policy Brief", "Research Study", "Press Release", "Economic Barometer", "Report"])("keeps every live %s discoverable and its detail resolvable", (type) => {
    const source = livePublications.filter((item) => item.type === type);
    expect(source.length).toBeGreaterThan(0);
    const results = publicationsForType(type);
    const key = (title: string) => title.toLowerCase().replace(/[^a-z0-9]/g, "");
    for (const item of source) {
      expect(results.some((result) => key(result.title) === key(item.title) && result.type === item.type)).toBe(true);
      expect(getPublication(item.slug)).toBeDefined();
    }
  });

  it("retains separate brief and study variants for the same live title", () => {
    const brief = publicationsForType("Policy Brief").find((item) => item.title === "Multidimensional Poverty in Zimbabwe: A Gender Perspective");
    const study = publicationsForType("Research Study").find((item) => item.title === "Multidimensional Poverty in Zimbabwe: A Gender Perspective");
    expect(brief?.type).toBe("Policy Brief");
    expect(study?.type).toBe("Research Study");
    expect(brief?.slug).not.toBe(study?.slug);
  });

  it("preserves free access and the original PDF when opening a live study slug", () => {
    const source = livePublications.find((item) => item.title === "Banking Industry Competition, Efficiency and Stability in Zimbabwe");
    expect(source).toBeDefined();
    const result = getPublication(source?.slug ?? "");
    expect(result?.access.mode).toBe("free");
    expect(result?.publicFile).toBe("https://zepari.co.zw/sites/default/files/2026-10/Banking%20Industry%20Competition%20Combined_1.pdf");
  });
});