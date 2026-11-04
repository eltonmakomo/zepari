import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search as SearchIcon } from "lucide-react";
import { z } from "zod";
import { ArticleCard, EventCard, PublicationCard } from "@/components/site/Cards";
import { searchAll } from "@/content/queries";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/search")({
  validateSearch: z.object({ q: z.string().default("") }),
  head: () => ({ meta: [...seo("Search", "Search ZEPARI research, insights and events.").meta, { name: "robots", content: "noindex" }] }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const r = searchAll(q);
  const total = r.publications.length + r.articles.length + r.events.length;
  return (
    <section className="container-z py-16">
      <h1 className="text-4xl">Search</h1>
      <div className="mt-6 flex max-w-2xl items-center border bg-card px-4">
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
        <input autoFocus aria-label="Search" value={q} onChange={(e) => navigate({ search: { q: e.target.value }, replace: true })} placeholder="Try 'banking', 'devolution', 'poverty'…" className="w-full bg-transparent px-3 py-4 text-lg outline-none" />
      </div>
      {q && <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">{total} results for “{q}”</p>}
      {r.publications.length > 0 && <div className="mt-12"><h2 className="text-2xl">Publications</h2>{r.publications.map((p) => <PublicationCard key={p.slug} p={p} layout="row" />)}</div>}
      {r.articles.length > 0 && <div className="mt-12"><h2 className="mb-6 text-2xl">Insights</h2><div className="grid gap-10 md:grid-cols-3">{r.articles.map((a) => <ArticleCard key={a.slug} a={a} />)}</div></div>}
      {r.events.length > 0 && <div className="mt-12"><h2 className="mb-2 text-2xl">Events</h2>{r.events.map((e) => <EventCard key={e.slug} e={e} />)}</div>}
    </section>
  );
}
