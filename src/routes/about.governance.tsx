import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, banners } from "@/components/site/Layout";
import { PersonCard } from "@/components/site/PersonCard";
import { people } from "@/content/data";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about/governance")({
  head: () => seo("Governance & Board of Trustees", "ZEPARI is managed by an independent Board of Trustees under its Deed of Trust."),
  component: () => (
    <>
      <PageHeader image={banners.meeting} eyebrow="About · Governance" title="Board of Trustees" intro="The Deed of Trust that ZEPARI was established under stipulates that ZEPARI will be managed by an independent Board of Trustees." />
      <section className="container-z grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-4">
        {people.filter((p) => p.group === "board").map((p) => <PersonCard key={p.slug} p={p} />)}
      </section>
      <section className="container-z">
        <div className="grid gap-8 bg-paper p-10 md:grid-cols-3">
          {[["Independence", "Research agendas and findings are set by ZEPARI's researchers and peer review, not funders."], ["Accountability", "Audited accounts and annual reporting to the Board of Trustees."], ["Quality", "Technical validation workshops and peer review before publication."]].map(([t, d]) => (
            <div key={t}><h3 className="text-xl">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{d}</p></div>
          ))}
        </div>
      </section>
    </>
  ),
});
