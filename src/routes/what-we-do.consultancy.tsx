import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHeader, banners } from "@/components/site/Layout";
import { ContactBand, Eyebrow, WhatWeDoNext, tints } from "@/components/site/WhatWeDo";
import { consultancy } from "@/content/whatWeDo";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/what-we-do/consultancy")({
  head: () => seo("Consultancy", "Professional consultancy from ZEPARI: economic research, policy analysis, market surveys, strategic planning, M&E and data collection."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader image={banners.meeting} eyebrow="What we do · Consultancy" title="Consultancy" />
      <section className="container-z grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Eyebrow>Our services</Eyebrow>
          <p className="text-xl leading-relaxed">{consultancy.intro}</p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 md:col-span-7">
          {consultancy.services.map((s, i) => (
            <li key={s} className={`${tints[i % tints.length]} flex items-center gap-3 border border-border/60 px-5 py-4 font-medium`}>
              <Check className="h-4 w-4 shrink-0 text-accent" />{s}
            </li>
          ))}
        </ul>
      </section>
      <section className="border-t bg-tint-2/50">
        <div className="container-z py-16 md:py-20">
          <Eyebrow>Selected assignments</Eyebrow>
          <p className="mb-12 max-w-3xl text-lg text-muted-foreground">{consultancy.casesLead}</p>
          <div className="grid gap-6 lg:grid-cols-2">
            {consultancy.cases.map((c, i) => (
              <article key={c.title} className="flex flex-col border bg-card p-8 transition hover:shadow-card">
                <span className="font-display text-4xl text-accent/30">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-3 text-xl leading-snug md:text-2xl">{c.title}</h2>
                <div className="mt-4 flex-1 space-y-3 text-sm leading-relaxed text-muted-foreground">{c.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
                {c.url && (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 self-start rounded-full border px-4 py-2 text-sm font-semibold transition hover:border-accent hover:text-accent">
                    Read the study <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
      <ContactBand text={consultancy.contact.split(", or email")[0] + "."} emails={["administration@zepari.co.zw", "chigumirag@zepari.co.zw"]} />
      <WhatWeDoNext current="/what-we-do/consultancy" />
    </>
  );
}
