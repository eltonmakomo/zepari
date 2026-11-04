import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHeader, banners } from "@/components/site/Layout";
import { ContactBand, Eyebrow, TintGrid, WhatWeDoNext } from "@/components/site/WhatWeDo";
import { publications, themes } from "@/content/data";
import { researchPage } from "@/content/whatWeDo";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/research/")({
  head: () => seo("Research", "ZEPARI's commissioned and core economic policy research across 14 broad thematic areas."),
  component: () => (
    <>
      <PageHeader image={banners.dialogue} eyebrow="What we do · Research" title="Research" />
      <section className="container-z grid gap-10 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5"><Eyebrow>How we work</Eyebrow><h2 className="text-3xl md:text-4xl">Two kinds of research, one purpose.</h2></div>
        <div className="md:col-span-7">
          <p className="text-lg leading-relaxed text-muted-foreground">{researchPage.intro}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="border-l-2 border-accent bg-tint-1 p-5"><p className="font-display text-xl">Commissioned research</p><p className="text-sm text-muted-foreground">Demand driven</p></div>
            <div className="border-l-2 border-gold bg-tint-3 p-5"><p className="font-display text-xl">Proactive core research</p><p className="text-sm text-muted-foreground">Supply driven</p></div>
          </div>
        </div>
      </section>
      <section className="container-z pb-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div><Eyebrow>Thematic areas</Eyebrow><h2 className="max-w-2xl text-3xl md:text-4xl">{researchPage.areasLead}</h2></div>
          <span className="font-display text-6xl text-accent/20">14</span>
        </div>
        <TintGrid items={researchPage.areas} />
        <blockquote className="mx-auto mt-20 max-w-3xl text-center font-display text-2xl leading-snug md:text-3xl">“{researchPage.mission}”</blockquote>
      </section>
      <section className="container-z pb-20">
        <Eyebrow>Browse publications by topic</Eyebrow>
        <div className="grid gap-px border bg-border sm:grid-cols-2">
          {themes.map((t) => {
            const n = publications.filter((p) => p.themes.includes(t.id)).length;
            return (
              <Link key={t.id} to="/research/$theme" params={{ theme: t.id }} className="group flex items-center justify-between gap-4 bg-card p-6 transition hover:bg-muted">
                <span className="text-lg font-medium group-hover:text-accent">{t.name}</span>
                <span className="flex shrink-0 items-center gap-1 text-sm text-muted-foreground">{n} <ArrowUpRight className="h-4 w-4" /></span>
              </Link>
            );
          })}
        </div>
      </section>
      <ContactBand text={researchPage.contactLead.replace(":", ".")} emails={researchPage.emails} />
      <WhatWeDoNext current="/research" />
    </>
  ),
});
