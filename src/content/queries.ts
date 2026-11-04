import { articles, events, people, publications, themes, media } from "./data";
import type { ThemeId } from "./types";
import { livePublications } from "./live";

export const byDateDesc = <T extends { date?: string | undefined }>(a: T, b: T) => (b.date ?? "").localeCompare(a.date ?? "");

export const getTheme = (id: ThemeId) => themes.find((t) => t.id === id)!;
export const getPerson = (slug: string) => people.find((p) => p.slug === slug);
export const authorName = (s: string) => getPerson(s)?.name ?? s;
export function getPublication(slug: string) {
  const publication = publications.find((p) => p.slug === slug);
  if (publication) return publication;
  const source = livePublications.find((p) => p.slug === slug);
  if (!source) return undefined;
  const titleKey = (title: string) => title.toLowerCase().replace(/[^a-z0-9]/g, "");
  // Legacy source slugs must respect curated access settings for the same document type.
  return publications.find((p) => p.type === source.type && titleKey(p.title) === titleKey(source.title)) ?? source;
}
export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const getEvent = (slug: string) => events.find((e) => e.slug === slug);

const overlap = (a: ThemeId[], b: ThemeId[]) => a.filter((x) => b.includes(x)).length;

/** Automatic related content: shared research themes, newest first. */
export function relatedTo(themeIds: ThemeId[], exclude?: string) {
  const score = <T extends { themes: ThemeId[]; date: string; slug?: string }>(items: T[]) =>
    items
      .filter((i) => i.slug !== exclude && overlap(i.themes, themeIds) > 0)
      .sort((a, b) => overlap(b.themes, themeIds) - overlap(a.themes, themeIds) || byDateDesc(a, b));
  return {
    publications: score(publications).slice(0, 3),
    articles: score(articles).slice(0, 3),
    events: score(events).slice(0, 2),
    media: media.filter((m) => overlap(m.themes, themeIds) > 0).slice(0, 2),
  };
}

export const upcomingEvents = (now = new Date().toISOString().slice(0, 10)) =>
  events.filter((e) => e.date >= now).sort((a, b) => a.date.localeCompare(b.date));
export const pastEvents = (now = new Date().toISOString().slice(0, 10)) =>
  events.filter((e) => e.date < now).sort(byDateDesc);

export const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export function searchAll(q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return { publications: [], articles: [], events: [] };
  const hit = (...f: string[]) => f.join(" ").toLowerCase().includes(s);
  return {
    publications: publications.filter((p) => hit(p.title, p.abstract, p.type, p.authors.map(authorName).join(" "))),
    articles: articles.filter((a) => hit(a.title, a.excerpt, a.kind)),
    events: events.filter((e) => hit(e.title, e.summary, e.location)),
  };
}
