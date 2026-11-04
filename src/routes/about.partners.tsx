import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, banners } from "@/components/site/Layout";
import { partners } from "@/content/data";
import { partnerIntroduction } from "@/content/organization";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about/partners")({
  head: () => seo("Our Partners", "ZEPARI’s funding partners, including the African Capacity Building Foundation, Government of Zimbabwe and development institutions."),
  component: Partners,
});

function Partners() {
  return (
    <>
      <PageHeader image={banners.people} eyebrow="About · Partners" title="Our Partners" />
      <section className="container-z py-16 md:py-20">
        <div className="max-w-4xl space-y-5 text-lg leading-relaxed text-muted-foreground">
          {partnerIntroduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <ul className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => {
            const content = <>
              <div className="flex h-28 items-center justify-center">
                <img src={partner.logo} alt={partner.name} loading="lazy" className="max-h-24 max-w-full object-contain" />
              </div>
              <h2 className="mt-6 text-center text-xl leading-snug">{partner.name}</h2>
            </>;
            return <li key={partner.name} className="border-t pt-8">
              {partner.url ? <a href={partner.url} target="_blank" rel="noopener noreferrer" className="block transition hover:text-accent">{content}</a> : content}
            </li>;
          })}
        </ul>
      </section>
    </>
  );
}