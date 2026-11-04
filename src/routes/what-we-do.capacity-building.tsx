import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { PageHeader, banners } from "@/components/site/Layout";
import { Eyebrow, TintGrid, WhatWeDoNext } from "@/components/site/WhatWeDo";
import { capacityBuilding } from "@/content/whatWeDo";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/what-we-do/capacity-building")({
  head: () => seo("Capacity Building", "ZEPARI's long-term sponsorships and short courses building capacity for economic policy research and analysis in Zimbabwe."),
  component: Page,
});

const stats = [
  { n: "25", label: "officers sponsored for the MSc in Economics at the University of Zimbabwe" },
  { n: "2", label: "UZ staff fellows funded for PhDs at the University of Cape Town" },
  { n: "4", label: "senior economists funded for PhDs at South African universities" },
];

function Page() {
  const [p1, p2, p3] = capacityBuilding.paragraphs;
  return (
    <>
      <PageHeader image={banners.workshop} eyebrow="What we do · Capacity building" title="Capacity Building" />
      <section className="container-z py-16 md:py-20">
        <div className="grid gap-px border bg-border sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.n} className="bg-card p-8">
              <p className="font-display text-6xl text-accent">{s.n}</p>
              <p className="mt-3 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4"><Eyebrow>Long-term programmes</Eyebrow><GraduationCap className="h-12 w-12 text-gold" /></div>
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground md:col-span-8"><p>{p1}</p><p>{p2}</p></div>
        </div>
      </section>
      <section className="border-t bg-tint-1/50">
        <div className="container-z py-16 md:py-20">
          <Eyebrow>Short-term courses</Eyebrow>
          <p className="mb-10 max-w-3xl text-lg text-muted-foreground">{p3}</p>
          <TintGrid items={capacityBuilding.courses} />
        </div>
      </section>
      <WhatWeDoNext current="/what-we-do/capacity-building" />
    </>
  );
}
