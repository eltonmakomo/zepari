import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHeader, banners } from "@/components/site/Layout";
import { publications, themes } from "@/content/data";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/research/")({
  head: () => seo("Research Areas", "ZEPARI's research programme: macroeconomy, finance, trade, poverty and gender, agriculture, governance and energy."),
  component: () => (
    <>
      <PageHeader image={banners.dialogue} eyebrow="Research" title="Seven areas. One question: what works for Zimbabwe?" intro="Our applied research programme responds to the priorities of government, the private sector and citizens — from currency stability to household resilience." />
      <section className="container-z py-16">
        {themes.map((t, i) => {
          const n = publications.filter((p) => p.themes.includes(t.id)).length;
          return (
            <Link key={t.id} to="/research/$theme" params={{ theme: t.id }} className="group grid gap-4 border-b py-10 md:grid-cols-12 md:items-center">
              <span className="font-display text-2xl text-muted-foreground md:col-span-1">0{i + 1}</span>
              <h2 className="text-3xl group-hover:text-accent md:col-span-5">{t.name}</h2>
              <p className="text-muted-foreground md:col-span-4">{t.description}</p>
              <span className="flex items-center justify-end gap-2 text-sm font-semibold md:col-span-2">{n} publications <ArrowUpRight className="h-4 w-4" /></span>
            </Link>
          );
        })}
      </section>
    </>
  ),
});
