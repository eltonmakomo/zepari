import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { PageHeader, banners } from "@/components/site/Layout";
import { ArticleCard } from "@/components/site/Cards";
import { articles } from "@/content/data";
import { byDateDesc } from "@/content/queries";
import { seo } from "@/lib/seo";

const kinds = ["All", "News", "Blog", "Explainer", "Commentary"] as const;

export const Route = createFileRoute("/insights/")({
  validateSearch: z.object({ kind: z.enum(kinds).optional() }),
  head: () => seo("Insights", "News, blogs, explainers and commentary from ZEPARI researchers on Zimbabwe's economy."),
  component: Insights,
});

function Insights() {
  const { kind = "All" } = Route.useSearch();
  const navigate = useNavigate({ from: "/insights/" });
  const list = articles.filter((a) => kind === "All" || a.kind === kind).sort(byDateDesc);
  return (
    <>
      <PageHeader image={banners.research} eyebrow="Insights" title="Analysis for the moment." intro="Timely news, explainers, blogs and commentary that translate our research into clear arguments about Zimbabwe's economy." />
      <section className="container-z py-12">
        <div role="tablist" aria-label="Filter by type" className="mb-12 flex flex-wrap gap-2 border-b pb-6">
          {kinds.map((k) => (
            <button key={k} role="tab" aria-selected={kind === k} onClick={() => navigate({ search: { kind: k === "All" ? undefined : k } })}
              className={`rounded-full px-4 py-2 text-sm font-medium ${kind === k ? "bg-ink text-ink-foreground" : "bg-muted hover:bg-gold/30"}`}>{k}</button>
          ))}
        </div>
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">{list.map((a) => <ArticleCard key={a.slug} a={a} />)}</div>
        {list.length === 0 && <p className="text-muted-foreground">Nothing here yet.</p>}
      </section>
    </>
  );
}
