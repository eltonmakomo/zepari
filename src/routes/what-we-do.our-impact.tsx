import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, banners } from "@/components/site/Layout";
import { ourImpact } from "@/content/whatWeDo";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/what-we-do/our-impact")({
  head: () => seo("Our Impact", "ZEPARI's commissioned research, high-level economic forums and policy dialogues with government and development partners."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader image={banners.dialogue} eyebrow="What we do · Our impact" title="Our Impact" />
      <section className="container-z py-16 md:py-20">
        <div className="max-w-3xl space-y-6 text-lg text-muted-foreground">
          {ourImpact.map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>
    </>
  );
}
