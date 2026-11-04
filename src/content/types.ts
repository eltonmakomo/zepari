// CMS-friendly content model. Every record references others by id/slug only,
// so staff enter an author, theme or file once and it is linked everywhere.

export type ThemeId =
  | "macro"
  | "finance"
  | "trade"
  | "poverty"
  | "agriculture"
  | "governance"
  | "energy";

export interface Theme {
  id: ThemeId;
  name: string;
  short: string;
  description: string;
  questions: string[];
}

export interface Person {
  slug: string;
  name: string;
  role: string;
  group: "team" | "board";
  affiliation?: string;
  photo?: string;
  bio: string;
  themes?: ThemeId[];
}

export type PubType =
  | "Research Study"
  | "Policy Brief"
  | "Working Paper"
  | "Economic Barometer"
  | "Report"
  | "Press Release";

export interface Access {
  /** Free items are fully readable; paid items show a preview only. */
  mode: "free" | "paid";
  priceUSD?: number;
  /** Optional price tiers (e.g. individual / institutional licence). */
  tiers?: { id: string; label: string; priceUSD: number; note: string }[];
}

export interface Publication {
  slug: string;
  title: string;
  type: PubType;
  date: string; // ISO
  authors: string[]; // Person slugs or free-text names
  themes: ThemeId[];
  abstract: string;
  keyFindings: string[];
  recommendations: string[];
  pages?: number;
  cover?: string;
  /** Public file URL — only ever set for FREE items. Paid files live in private storage. */
  publicFile?: string;
  access: Access;
  featured?: boolean;
}

export type ArticleKind = "News" | "Blog";

export interface Article {
  slug: string;
  title: string;
  kind: ArticleKind;
  date: string;
  author: string;
  themes: ThemeId[];
  excerpt: string;
  body: string[];
  image?: string | undefined;
  relatedPublication?: string;
  access: Access;
}

export interface EventItem {
  slug: string;
  title: string;
  date: string;
  endDate?: string;
  format: "Policy Dialogue" | "Workshop" | "Webinar" | "Launch" | "Training";
  location: string;
  themes: ThemeId[];
  summary: string;
  agenda?: { time: string; item: string }[];
  video?: string; // YouTube id
  relatedPublication?: string;
  /** Extra body paragraphs (e.g. imported from the live site). */
  details?: string[];
  image?: string;
}

export interface MediaItem {
  id: string;
  kind: "Video" | "Newsletter" | "Photo";
  title: string;
  date?: string;
  youtubeId?: string;
  thumbnail?: string;
  url?: string;
  description: string;
  themes: ThemeId[];
}

export interface GalleryAlbum {
  slug: string;
  title: string;
  cover?: string | null;
  images: (string | null)[];
}

export interface Partner {
  name: string;
  logo: string;
  url?: string;
}
