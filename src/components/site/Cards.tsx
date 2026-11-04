import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Calendar, Lock, MapPin, Play } from "lucide-react";
import type { Article, EventItem, MediaItem, Publication, ThemeId } from "@/content/types";
import { authorName, fmtDate, getTheme } from "@/content/queries";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/site/VideoPlayer";

const covers = ["bg-cover-1", "bg-cover-2", "bg-cover-3", "bg-cover-4"];
/** Stable colourful gradient per item, so cards without a photo are never plain. */
export const coverFor = (key: string) => covers[[...key].reduce((n, c) => n + c.charCodeAt(0), 0) % covers.length];

export function ThemeTags({ ids }: { ids: ThemeId[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {ids.map((id) => (
        <Link key={id} to="/research/$theme" params={{ theme: id }} className="bg-muted px-2.5 py-0.5 text-[11px] font-medium text-secondary-foreground hover:bg-gold/30">
          {getTheme(id).short}
        </Link>
      ))}
    </div>
  );
}

export function AccessBadge({ mode, price }: { mode: "free" | "paid"; price?: number | undefined }) {
  return mode === "paid" ? (
    <span className="inline-flex items-center gap-1 bg-gold/25 px-2 py-0.5 text-[11px] font-semibold text-ink"><Lock className="h-3 w-3" /> US${price}</span>
  ) : (
    <span className="bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-success">Free</span>
  );
}

function Cover({ p }: { p: Publication }) {
  if (p.cover) return <img src={p.cover} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />;
  return (
    <div className={`flex h-full flex-col justify-between p-5 text-primary-foreground ${coverFor(p.slug)}`}>
      <span className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/80">ZEPARI · {p.type}</span>
      <span className="font-display text-lg leading-snug">{p.title}</span>
    </div>
  );
}

export function PublicationCard({ p, layout = "vertical" }: { p: Publication; layout?: "vertical" | "row" }) {
  if (layout === "row")
    return (
      <article className="group grid gap-5 border-b py-6 sm:grid-cols-[96px_1fr]">
        <Link to="/publications/$slug" params={{ slug: p.slug }} className="hidden aspect-[3/4] overflow-hidden sm:block" tabIndex={-1}>{p.cover ? <Cover p={p} /> : <div className={`grid h-full place-items-center font-display text-2xl text-primary-foreground ${coverFor(p.slug)}`}>Z</div>}</Link>
        <div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="font-semibold uppercase tracking-wider text-accent">{p.type}</span>
            <span>{fmtDate(p.date)}</span>
            <AccessBadge mode={p.access.mode} price={p.access.priceUSD} />
          </div>
          <h3 className="mt-2 text-xl leading-snug"><Link to="/publications/$slug" params={{ slug: p.slug }} className="hover:text-accent">{p.title}</Link></h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.abstract}</p>
          <p className="mt-2 text-xs text-muted-foreground">By {p.authors.map(authorName).join(", ")}</p>
        </div>
      </article>
    );
  return (
    <article className="group flex flex-col">
      <Link to="/publications/$slug" params={{ slug: p.slug }} className="block aspect-[4/5] overflow-hidden shadow-card">
        <Cover p={p} />
      </Link>
      <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="font-semibold uppercase tracking-wider text-accent">{p.type}</span>
        <AccessBadge mode={p.access.mode} price={p.access.priceUSD} />
      </div>
      <h3 className="mt-2 text-lg leading-snug"><Link to="/publications/$slug" params={{ slug: p.slug }} className="hover:text-accent">{p.title}</Link></h3>
      <p className="mt-1 text-xs text-muted-foreground">{fmtDate(p.date)}</p>
    </article>
  );
}

export function ArticleCard({ a, large, noImage }: { a: Article; large?: boolean; noImage?: boolean }) {
  return (
    <article className="group flex flex-col">
      {!noImage && (
        <Link to="/insights/$slug" params={{ slug: a.slug }} className={`mb-4 block overflow-hidden ${large ? "aspect-[16/10]" : "aspect-[16/9]"}`} tabIndex={-1}>
          {a.image ? (
            <img src={a.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          ) : (
            <div className={`flex h-full w-full flex-col justify-between p-6 text-primary-foreground transition duration-700 group-hover:scale-105 ${coverFor(a.slug)}`}>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/80">ZEPARI · {a.kind}</span>
              <span className="font-display text-xl leading-snug line-clamp-3">{a.title}</span>
            </div>
          )}
        </Link>
      )}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="font-semibold uppercase tracking-wider text-accent">{a.kind}</span>
        <span>{fmtDate(a.date)}</span>
        {a.access.mode === "paid" && <AccessBadge mode="paid" price={a.access.priceUSD} />}
      </div>
      <h3 className={`mt-2 leading-snug ${large ? "text-3xl" : "text-xl"}`}>
        <Link to="/insights/$slug" params={{ slug: a.slug }} className="hover:text-accent">{a.title}</Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{a.excerpt}</p>
    </article>
  );
}

export function EventCard({ e }: { e: EventItem }) {
  const d = new Date(e.date + "T00:00:00");
  return (
    <article className="group flex gap-5 border-t py-6">
      <div className="w-16 shrink-0 text-center">
        <div className="font-display text-4xl leading-none">{d.getDate()}</div>
        <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{d.toLocaleString("en-GB", { month: "short" })} {d.getFullYear()}</div>
      </div>
      <div className="flex-1">
        <span className="eyebrow">{e.format}</span>
        <h3 className="mt-1 text-xl leading-snug"><Link to="/policy-dialogue/$slug" params={{ slug: e.slug }} className="hover:text-accent">{e.title}</Link></h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> {e.location}</p>
      </div>
      <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition group-hover:text-accent" />
    </article>
  );
}

export function MediaCard({ m }: { m: MediaItem }) {
  const thumb = m.thumbnail ?? (m.youtubeId ? `https://i.ytimg.com/vi/${m.youtubeId}/hqdefault.jpg` : undefined);
  const content = (
    <>
      <span className="relative block aspect-video overflow-hidden bg-ink">
        {thumb ? <img src={thumb} alt="" loading="lazy" className="h-full w-full object-cover opacity-90 transition group-hover:scale-105" /> : <div className={`flex h-full w-full items-end p-5 font-display text-lg leading-snug text-primary-foreground ${coverFor(m.id)}`}><span className="ml-14 line-clamp-2">{m.title}</span></div>}
        <span className="absolute bottom-3 left-3 grid h-11 w-11 place-items-center bg-gold text-ink"><Play className="h-4 w-4" /></span>
      </span>
      <span className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><span className="font-semibold uppercase tracking-wider text-accent">{m.kind}</span>{m.date && <><Calendar className="h-3 w-3" />{fmtDate(m.date)}</>}</span>
      <span className="mt-1 block font-display text-lg font-medium leading-snug group-hover:text-accent">{m.title}</span>
    </>
  );
  if (m.kind === "Video") {
    return (
      <VideoPlayer title={m.title} youtubeId={m.youtubeId} url={m.url}>
        <Button variant="ghost" disabled={!m.youtubeId && !m.url} aria-label={`Play ${m.title}`} className="group block h-auto w-full whitespace-normal rounded-none p-0 text-left font-normal text-foreground hover:bg-transparent [&_svg]:size-auto">
          {content}
        </Button>
      </VideoPlayer>
    );
  }
  const external = m.url?.startsWith("http");
  return <a href={m.url} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group block">{content}</a>;
}

export function SectionHead({ eyebrow, title, to, cta }: { eyebrow: string; title: string; to?: string; cta?: string }) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="rule-gold mb-4" />
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 text-3xl md:text-4xl">{title}</h2>
      </div>
      {to && <Link to={to} className="inline-flex items-center gap-1 text-sm font-semibold text-foreground underline-offset-4 hover:text-accent hover:underline">{cta ?? "View all"} <ArrowUpRight className="h-4 w-4" /></Link>}
    </div>
  );
}
