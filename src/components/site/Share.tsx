import { Facebook, Link2, Linkedin, Mail } from "lucide-react";
import { toast } from "sonner";
import { XIcon } from "./Layout";
import type { ThemeId } from "@/content/types";
import { relatedTo } from "@/content/queries";
import { ArticleCard, EventCard, PublicationCard, SectionHead } from "./Cards";

export function ShareBar({ title }: { title: string }) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const open = (href: string) => window.open(href, "_blank", "noopener,noreferrer,width=640,height=560");
  const btn = "grid h-9 w-9 place-items-center border transition hover:border-accent hover:text-accent";
  return (
    <div className="flex items-center gap-2" aria-label="Share">
      <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Share</span>
      <button className={btn} aria-label="Share on LinkedIn" onClick={() => open(`https://www.linkedin.com/sharing/share-offsite/?url=${u}`)}><Linkedin className="h-4 w-4" /></button>
      <button className={btn} aria-label="Share on X" onClick={() => open(`https://twitter.com/intent/tweet?url=${u}&text=${t}`)}><XIcon className="h-4 w-4" /></button>
      <button className={btn} aria-label="Share on Facebook" onClick={() => open(`https://www.facebook.com/sharer/sharer.php?u=${u}`)}><Facebook className="h-4 w-4" /></button>
      <a className={btn} aria-label="Share by email" href={`mailto:?subject=${t}&body=${u}`}><Mail className="h-4 w-4" /></a>
      <button className={btn} aria-label="Copy link" onClick={() => navigator.clipboard.writeText(window.location.href).then(() => toast.success("Link copied"))}><Link2 className="h-4 w-4" /></button>
    </div>
  );
}

export function RelatedContent({ themes, exclude }: { themes: ThemeId[]; exclude?: string }) {
  const r = relatedTo(themes, exclude);
  if (!r.publications.length && !r.articles.length) return null;
  return (
    <section className="border-t bg-paper py-20">
      <div className="container-z">
        <SectionHead eyebrow="Related" title="Continue exploring" />
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="grid gap-10 sm:grid-cols-3">{r.publications.map((p) => <PublicationCard key={p.slug} p={p} />)}</div>
          </div>
          <div className="space-y-8">
            {r.articles.slice(0, 2).map((a) => <ArticleCard key={a.slug} a={a} noImage />)}
            {r.events.slice(0, 1).map((e) => <EventCard key={e.slug} e={e} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
