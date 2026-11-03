import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Paginated } from "@/components/site/Pager";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { z } from "zod";
import { PageHeader, SocialLinks, banners } from "@/components/site/Layout";
import { MediaCard } from "@/components/site/Cards";
import { media } from "@/content/data";
import { gallery } from "@/content/live";
import { byDateDesc } from "@/content/queries";
import type { GalleryAlbum } from "@/content/types";
import { seo } from "@/lib/seo";

const kinds = ["All", "Video", "Podcast", "Photo gallery"] as const;

export const Route = createFileRoute("/media")({
  validateSearch: z.object({ kind: z.enum(kinds).optional() }),
  head: () => seo("Media", "Videos, podcasts and photo galleries from ZEPARI dialogues and workshops."),
  component: Media,
});

function Media() {
  const { kind = "All" } = Route.useSearch();
  const navigate = useNavigate({ from: "/media" });
  const list = media.filter((m) => kind === "All" || m.kind === kind).sort(byDateDesc);
  // The former featured video now leads the grid instead of sitting in its own big embed.
  const leadId = media.find((m) => m.youtubeId)!.id;
  const ordered = (() => {
    const lead = list.find((m) => m.id === leadId);
    return lead ? [lead, ...list.filter((m) => m.id !== leadId)] : list;
  })();
  const showGallery = kind === "All" || kind === "Photo gallery";
  const showMedia = kind !== "Photo gallery";
  const [album, setAlbum] = useState<GalleryAlbum | null>(null);
  return (
    <>
      <PageHeader image={banners.workshop} eyebrow="Media" title="Watch, listen and look back." intro="Recordings of dialogues and workshops, our Policy in Plain Terms podcast, and photo galleries from ZEPARI events.">
        <SocialLinks className="mt-8" />
      </PageHeader>
      <section className="container-z py-16">
        <div className="aspect-video overflow-hidden bg-ink">
          <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${lead.youtubeId}`} title={lead.title} allowFullScreen loading="lazy" />
        </div>
        <p className="mt-4 font-display text-2xl">{lead.title}</p>
      </section>
      <section className="container-z">
        <div role="tablist" className="mb-10 flex flex-wrap gap-2 border-b pb-6">
          {kinds.map((k) => (
            <button key={k} role="tab" aria-selected={kind === k} onClick={() => navigate({ search: { kind: k === "All" ? undefined : k } })}
              className={`rounded-full px-4 py-2 text-sm font-medium ${kind === k ? "bg-ink text-ink-foreground" : "bg-muted hover:bg-gold/30"}`}>{k === "All" || k === "Photo gallery" ? k : k + "s"}</button>
          ))}
        </div>
        {showMedia && <Paginated items={list} perPage={9} className="grid gap-10 md:grid-cols-3" render={(m) => <MediaCard key={m.id} m={m} />} />}
        {showGallery && (
          <div className={showMedia ? "mt-20" : ""}>
            <h2 className="mb-8 text-3xl">Photo gallery</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((g) => (
                <button key={g.slug} onClick={() => setAlbum(g)} className="group text-left">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    {g.cover && <img src={g.cover} alt={g.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />}
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-ink/80 px-2.5 py-1 text-xs font-semibold text-ink-foreground"><Images className="h-3.5 w-3.5" /> {g.images.length} photos</span>
                  </div>
                  <h3 className="mt-3 text-lg leading-snug group-hover:text-accent">{g.title}</h3>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
      {album && <Lightbox album={album} onClose={() => setAlbum(null)} />}
    </>
  );
}

function Lightbox({ album, onClose }: { album: GalleryAlbum; onClose: () => void }) {
  const imgs = album.images.filter((i): i is string => !!i);
  const [i, setI] = useState(0);
  const go = (d: number) => setI((n) => (n + d + imgs.length) % imgs.length);
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  });
  return (
    <div role="dialog" aria-modal aria-label={album.title} className="fixed inset-0 z-50 flex flex-col bg-ink/95 text-ink-foreground">
      <div className="container-z flex items-center justify-between gap-4 py-4">
        <p className="font-display text-lg">{album.title} <span className="ml-2 text-sm text-ink-foreground/60">{i + 1} / {imgs.length}</span></p>
        <button onClick={onClose} aria-label="Close gallery" className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink-foreground/10"><X /></button>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-14 pb-6">
        <img src={imgs[i]} alt={`${album.title} — photo ${i + 1}`} className="max-h-full max-w-full object-contain" />
        {imgs.length > 1 && <>
          <button onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-2 grid h-11 w-11 place-items-center rounded-full bg-ink-foreground/10 hover:bg-ink-foreground/20"><ChevronLeft /></button>
          <button onClick={() => go(1)} aria-label="Next photo" className="absolute right-2 grid h-11 w-11 place-items-center rounded-full bg-ink-foreground/10 hover:bg-ink-foreground/20"><ChevronRight /></button>
        </>}
      </div>
    </div>
  );
}
