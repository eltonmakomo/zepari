import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, banners } from "@/components/site/Layout";
import { capacityBuilding } from "@/content/whatWeDo";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/what-we-do/capacity-building")({
  head: () => seo("Capacity Building", "ZEPARI's long-term sponsorships and short courses building capacity for economic policy research and analysis in Zimbabwe."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader image={banners.workshop} eyebrow="What we do · Capacity building" title="Capacity Building" />
      <section className="container-z py-16 md:py-20">
        <div className="max-w-3xl space-y-5 text-lg text-muted-foreground">
          {capacityBuilding.paragraphs.map((p) => <p key={p}>{p}</p>)}
        </div>
        <h2 className="mb-8 mt-14 text-3xl">Short-term courses</h2>
        <ul className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          {capacityBuilding.courses.map((c) => <li key={c} className="border-t py-5 leading-relaxed">{c}</li>)}
        </ul>
      </section>
    </>
  );
}
