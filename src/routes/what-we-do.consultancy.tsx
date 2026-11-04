import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHeader, banners } from "@/components/site/Layout";
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
      <section className="container-z py-16 md:py-20">
        <p className="max-w-3xl text-lg text-muted-foreground">{consultancy.intro}</p>
        <ul className="mt-8 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          {consultancy.services.map((s) => <li key={s} className="border-t py-5 font-medium">{s}</li>)}
        </ul>
        <p className="mt-16 max-w-3xl text-lg text-muted-foreground">{consultancy.casesLead}</p>
        <div className="mt-10 space-y-12">
          {consultancy.cases.map((c) => (
            <article key={c.title} className="max-w-3xl border-l-2 border-accent pl-6">
              <h2 className="text-2xl">
                {c.url ? <a href={c.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">{c.title} <ArrowUpRight className="inline h-5 w-5" /></a> : c.title}
              </h2>
              <div className="mt-4 space-y-4 text-muted-foreground">{c.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
            </article>
          ))}
        </div>
        <p className="mt-16 max-w-3xl border-t pt-8">{consultancy.contact}</p>
      </section>
    </>
  );
}
