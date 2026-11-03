import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";
import { PageHeader, banners, SocialLinks } from "@/components/site/Layout";
import { MediaCard } from "@/components/site/Cards";
import { media } from "@/content/data";
import { byDateDesc } from "@/content/queries";
import { seo } from "@/lib/seo";

const kinds = ["All", "Video", "Podcast", "Newsletter"] as const;

export const Route = createFileRoute("/media")({
  validateSearch: z.object({ kind: z.enum(kinds).optional() }),
  head: () => seo("Media", "Videos, podcasts and newsletters from ZEPARI."),
  component: Media,
});

function Media() {
  const { kind = "All" } = Route.useSearch();
  const navigate = useNavigate({ from: "/media" });
  const list = media.filter((m) => kind === "All" || m.kind === kind).sort(byDateDesc);
  const lead = media.find((m) => m.youtubeId)!;
  return (
    <>
      <PageHeader image={banners.workshop} eyebrow="Media" title="Watch, listen and subscribe." intro="Recordings of dialogues and workshops, our Policy in Plain Terms podcast, and the monthly Policy Digest newsletter.">
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
              className={`rounded-full px-4 py-2 text-sm font-medium ${kind === k ? "bg-ink text-ink-foreground" : "bg-muted hover:bg-gold/30"}`}>{k === "All" ? k : k + "s"}</button>
          ))}
        </div>
        <div className="grid gap-10 md:grid-cols-3">{list.map((m) => <MediaCard key={m.id} m={m} />)}</div>
      </section>
    </>
  );
}
