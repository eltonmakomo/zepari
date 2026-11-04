import { describe, expect, it } from "vitest";
import { articles, publications } from "@/content/data";
import { liveArticles, livePublications } from "@/content/live";
import { getPublication } from "@/content/queries";
import { publicationReadUrl } from "@/lib/publication-files";

describe("authentic live content", () => {
  it("keeps all actual documents free without invented prices", () => {
    expect(publications.length).toBeGreaterThan(0);
    expect(publications.every((p) => p.access.mode === "free" && p.access.priceUSD === undefined && p.access.tiers === undefined)).toBe(true);
  });

  it("keeps only original live documents with their original file URLs", () => {
    expect(publications).toHaveLength(livePublications.length);
    for (const publication of publications) {
      const original = livePublications.find((source) => source.title === publication.title && source.type === publication.type && source.publicFile === publication.publicFile);
      expect(original).toBeDefined();
      expect(publication.abstract).toBe(original?.abstract);
      expect(publication.authors).toEqual(original?.authors);
    }
    expect(publications.some((p) => p.slug === "economic-barometer-q3-2026")).toBe(false);
    expect(publications.some((p) => p.slug === "working-paper-informality-jobs")).toBe(false);
    expect(publications.some((p) => p.slug === "afcfta-readiness-zimbabwe")).toBe(false);
  });

  it("keeps actual live articles, excluding invented paid samples", () => {
    expect(articles).toHaveLength(liveArticles.length);
    expect(articles.some((a) => a.slug === "inside-structural-transformation")).toBe(false);
    for (const article of articles) {
      const original = liveArticles.find((source) => source.title === article.title);
      expect(original).toBeDefined();
      expect(article.body).toEqual(original?.body);
      expect(article.access.mode).toBe("free");
    }
  });

  it("opens the actual banking PDF for Read online rather than the page abstract", () => {
    const publication = getPublication("banking-competition-efficiency-stability");
    expect(publication).toBeDefined();
    if (!publication) throw new Error("Banking study is missing");
    expect(publicationReadUrl(publication)).toBe("https://zepari.co.zw/sites/default/files/2026-10/Banking%20Industry%20Competition%20Combined_1.pdf#view=FitH");
  });
});

describe("paid content rules", () => {
  it("never exposes a public file URL for a paid publication", () => {
    const leaks = publications.filter((p) => p.access.mode === "paid" && p.publicFile);
    expect(leaks.map((p) => p.slug)).toEqual([]);
  });

  it("gives every paid item a price", () => {
    const missing = [...publications, ...articles].filter((i) => i.access.mode === "paid" && !((i.access.priceUSD ?? 0) > 0));
    expect(missing.map((i) => i.slug)).toEqual([]);
  });
});
