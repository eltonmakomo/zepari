import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHeader, banners } from "@/components/site/Layout";
import { publications, themes } from "@/content/data";
import { researchPage } from "@/content/whatWeDo";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/research/")({
  head: () => seo("Research", "ZEPARI's commissioned and core economic policy research across 14 broad thematic areas."),
  component: () => (
    <>
      <PageHeader image={banners.dialogue} eyebrow="What we do · Research" title="Research" intro={researchPage.intro} />
      <section className="container-z py-16">
        <h2 className="mb-8 text-3xl">{researchPage.areasLead}</h2>
        <ol className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          {researchPage.areas.map((a, i) => (
            <li key={a} className="flex gap-4 border-t py-5">
              <span className="font-display text-muted-foreground">{String(i + 1).padStart(2, "0")}</span><span>{a}</span>
            </li>
          ))}
        </ol>
        <div className="mt-14 max-w-3xl space-y-3 text-lg">
          <p>{researchPage.mission}</p>
          <p className="text-muted-foreground">{researchPage.contactLead}{" "}
            {researchPage.emails.map((e, i) => <span key={e}>{i > 0 && " or "}<a href={`mailto:${e}`} className="text-accent underline-offset-4 hover:underline">{e}</a></span>)}
          </p>
        </div>
      </section>
      <section className="container-z pb-16">
        <h2 className="mb-2 text-3xl">Browse publications by topic</h2>
        {themes.map((t) => {
          const n = publications.filter((p) => p.themes.includes(t.id)).length;
          return (
            <Link key={t.id} to="/research/$theme" params={{ theme: t.id }} className="group grid gap-2 border-b py-6 md:grid-cols-12 md:items-center">
              <h3 className="text-xl group-hover:text-accent md:col-span-6">{t.name}</h3>
              <span className="flex items-center gap-2 text-sm font-semibold md:col-span-6 md:justify-end">{n} publications <ArrowUpRight className="h-4 w-4" /></span>
            </Link>
          );
        })}
      </section>
    </>
  ),
});
