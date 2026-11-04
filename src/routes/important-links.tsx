import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHeader, banners } from "@/components/site/Layout";
import { afdbBulletins, importantLinks } from "@/content/whatWeDo";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/important-links")({
  head: () => seo("Important Links", "Government ministries and entities, economic resources and economists' blogs recommended by ZEPARI."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader image={banners.research} eyebrow="Resources" title="Important Links" />
      <section className="container-z py-16 md:py-20">
        <nav aria-label="Link groups" className="flex flex-wrap gap-3">
          {importantLinks.map((g) => <a key={g.id} href={`#${g.id}`} className="rounded-full border px-4 py-2 text-sm hover:bg-muted">{g.title}</a>)}
          <a href={afdbBulletins.url} target="_blank" rel="noopener noreferrer" className="rounded-full border px-4 py-2 text-sm hover:bg-muted">{afdbBulletins.title} ↗</a>
        </nav>
        {importantLinks.map((g) => (
          <div key={g.id} id={g.id} className="mt-14 scroll-mt-28">
            <h2 className="mb-6 text-3xl">{g.title}</h2>
            <ul className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
              {g.links.map((l) => (
                <li key={l.title} className="border-t">
                  <a href={l.url} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-3 py-5 hover:text-accent">
                    <span>{l.title}</span><ArrowUpRight className="mt-1 h-4 w-4 shrink-0 opacity-50 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}
