import type { Publication } from "@/content/types";

/** Open the source PDF in the browser instead of jumping to the abstract. */
export function publicationReadUrl(publication: Publication): string | undefined {
  if (publication.access.mode !== "free" || !publication.publicFile) return undefined;
  return `${publication.publicFile.split("#")[0]}#view=FitH`;
}