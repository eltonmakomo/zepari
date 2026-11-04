import { publications } from "./data";
import { livePublications } from "./live";

const titleKey = (title: string) => title.toLowerCase().replace(/[^a-z0-9]/g, "");

/** Keep source study/brief variants discoverable without changing curated title overrides in the main archive. */
export function publicationsForType(type?: string) {
  if (!type) return publications;
  const curatedAndMerged = publications.filter((publication) => publication.type === type);
  const existingTitles = new Set(curatedAndMerged.map((publication) => titleKey(publication.title)));
  return [
    ...curatedAndMerged,
    ...livePublications.filter((publication) => publication.type === type && !existingTitles.has(titleKey(publication.title))),
  ];
}