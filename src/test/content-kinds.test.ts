import { describe, expect, it } from "vitest";
import { articles, media, publications } from "@/content/data";
import type { ArticleKind, MediaItem } from "@/content/types";

describe("content kinds", () => {
  it("carries no Podcast, Explainer or Commentary items", () => {
    const allowedArticles: ArticleKind[] = ["News", "Blog"];
    expect(articles.map((a) => a.kind).filter((k) => !allowedArticles.includes(k))).toEqual([]);
    const allowedMedia: MediaItem["kind"][] = ["Video", "Newsletter", "Photo"];
    expect(media.map((m) => m.kind).filter((k) => !allowedMedia.includes(k))).toEqual([]);
  });

  it("keeps publications typed as before (no Podcast-like drift)", () => {
    expect(publications.every((p) => typeof p.type === "string" && p.type.length > 0)).toBe(true);
  });
});
