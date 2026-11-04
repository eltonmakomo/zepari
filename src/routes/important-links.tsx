import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, Building2, Globe2, Landmark } from "lucide-react";
import { PageHeader, banners } from "@/components/site/Layout";
import { Eyebrow, tints } from "@/components/site/WhatWeDo";
import { afdbBulletins, importantLinks } from "@/content/whatWeDo";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/important-links")({
  head: () => seo("Important Links", "Government ministries and entities, economic resources and economists' blogs recommended by ZEPARI."),
  component: Page,
});

const icons = { government: Landmark, economic: Globe2, blogs: BookOpen };

function host(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

function Page() {
  return (
    <>
      <PageHeader image={banners.research} eyebrow="Resources" title="Important Links" />
      <section className="container-z py-16 md:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {importantLinks.map((g, i) => {
            const Icon = icons[g.id];
            return (
              <a key={g.id} href={`#${g.id}`} className={`${tints[i]} group border border-border/60 p-6 transition hover:-translate-y-1 hover:shadow-card`}>
                <Icon className="h-7 w-7 text-accent" />
                <p className="mt-6 font-display text-xl leading-snug">{g.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{g.links.length} links</p>
              </a>
            );
          })}
          <a href={afdbBulletins.url} target="_blank" rel="noopener noreferrer" className="group border border-border/60 bg-tint-4 p-6 transition hover:-translate-y-1 hover:shadow-card">
            <Building2 className="h-7 w-7 text-accent" />
            <p className="mt-6 font-display text-xl leading-snug">{afdbBulletins.title}</p>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">afdb.org <ArrowUpRight className="h-3.5 w-3.5" /></p>
          </a>
        </div>
        {importantLinks.map((g) => (
          <div key={g.id} id={g.id} className="mt-20 scroll-mt-28">
            <Eyebrow>{g.links.length} links</Eyebrow>
            <h2 className="mb-8 text-3xl md:text-4xl">{g.title}</h2>
            <ul className="grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {g.links.map((l) => (
                <li key={l.title + l.url}>
                  <a href={l.url} target="_blank" rel="noopener noreferrer" className="group flex h-full items-start justify-between gap-3 bg-card p-5 transition hover:bg-muted">
                    <span>
                      <span className="block font-medium group-hover:text-accent">{l.title}</span>
                      <span className="mt-1 block text-xs text-muted-foreground">{host(l.url)}</span>
                    </span>
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 opacity-40 transition group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}
