import { describe, expect, it } from "vitest";
import { articles, publications } from "@/content/data";

describe("paid content rules", () => {
  it("never exposes a public file URL for a paid publication", () => {
    const leaks = publications.filter((p) => p.access.mode === "paid" && p.publicFile);
    expect(leaks.map((p) => p.slug)).toEqual([]);
  });

  it("gives every paid item a price", () => {
    const missing = [...publications, ...articles].filter((i) => i.access.mode === "paid" && !(i.access.priceUSD! > 0));
    expect(missing.map((i) => i.slug)).toEqual([]);
  });
});
