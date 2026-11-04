import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, banners } from "@/components/site/Layout";
import { clients } from "@/content/organization";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about/clients")({
  head: () => seo("Our Clients", "The government departments, development partners, businesses and academic institutions served by ZEPARI."),
  component: Clients,
});

function Clients() {
  return (
    <>
      <PageHeader image={banners.people} eyebrow="About · Our clients" title="Our Clients" />
      <section className="container-z py-16 md:py-20">
        <div className="max-w-3xl space-y-5 text-lg text-muted-foreground">
          {clients.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        {clients.groups.map((group) => (
          <div key={group.title} className="mt-12">
            <h2 className="mb-8 text-3xl">{group.title}</h2>
            <ul className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
              {group.names.map((name) => <li key={name} className="border-t py-5 text-base leading-relaxed">{name}</li>)}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}