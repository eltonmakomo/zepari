import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Layout";
import { PersonCard } from "@/components/site/PersonCard";
import { people } from "@/content/data";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about/team")({
  head: () => seo("Our Team", "Meet ZEPARI's researchers and staff."),
  component: () => (
    <>
      <PageHeader eyebrow="About · Our team" title="The people behind the evidence." intro="Economists, research fellows and professionals committed to rigorous, independent analysis." />
      <section className="container-z grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-4">
        {people.filter((p) => p.group === "team").map((p) => <PersonCard key={p.slug} p={p} />)}
      </section>
    </>
  ),
});
