import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, banners } from "@/components/site/Layout";
import { Eyebrow, WhatWeDoNext } from "@/components/site/WhatWeDo";
import { ourImpact } from "@/content/whatWeDo";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/what-we-do/our-impact")({
  head: () => seo("Our Impact", "ZEPARI's commissioned research, high-level economic forums and policy dialogues with government and development partners."),
  component: Page,
});

const milestones = ["2006", "2012", "Dec 2012", "Network", "2015", "2015"];

function Page() {
  const [lead, ...rest] = ourImpact;
  return (
    <>
      <PageHeader image={banners.dialogue} eyebrow="What we do · Our impact" title="Our Impact" />
      <section className="container-z grid gap-10 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4"><Eyebrow>Commissioned research</Eyebrow><h2 className="text-3xl md:text-4xl">Trusted by government and partners.</h2></div>
        <p className="text-lg leading-relaxed text-muted-foreground md:col-span-8">{lead}</p>
      </section>
      <section className="border-t bg-tint-1/50">
        <div className="container-z py-16 md:py-20">
          <Eyebrow>Milestones</Eyebrow>
          <ol className="relative mt-8 space-y-10 border-l-2 border-accent/30 pl-8 md:ml-32">
            {rest.map((p, i) => (
              <li key={p} className="relative">
                <span className="absolute -left-[2.6rem] top-1.5 h-4 w-4 rounded-full border-4 border-background bg-accent" aria-hidden />
                <span className="mb-2 block font-display text-2xl text-accent md:absolute md:-left-44 md:top-0 md:mb-0 md:w-28 md:text-right">{milestones[i]}</span>
                <p className="max-w-3xl border bg-card p-6 leading-relaxed text-muted-foreground">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <WhatWeDoNext current="/what-we-do/our-impact" />
    </>
  );
}
