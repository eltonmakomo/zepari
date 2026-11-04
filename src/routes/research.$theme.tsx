import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHeader, banners } from "@/components/site/Layout";
import { ArticleCard, EventCard, PublicationCard, SectionHead } from "@/components/site/Cards";
import { PersonCard } from "@/components/site/PersonCard";
import { articles, events, people, publications, themes } from "@/content/data";
import { byDateDesc } from "@/content/queries";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/research/$theme")({
  loader: ({ params }) => {
    const theme = themes.find((t) => t.id === params.theme);
    if (!theme) throw notFound();
    return { theme };
  },
  head: ({ loaderData }) => (loaderData ? seo(loaderData.theme.name, loaderData.theme.description) : { meta: [{ title: "Research area | ZEPARI" }, { name: "robots", content: "noindex" }] }),
  component: ThemePage,
});

function ThemePage() {
  const { theme } = Route.useLoaderData();
  const pubs = publications.filter((p) => p.themes.includes(theme.id)).sort(byDateDesc);
  const arts = articles.filter((a) => a.themes.includes(theme.id)).sort(byDateDesc);
  const evs = events.filter((e) => e.themes.includes(theme.id));
  const experts = people.filter((p) => p.group === "team" && p.themes?.includes(theme.id));
  return (
    <>
      <PageHeader image={banners.workshop} eyebrow="Research area" title={theme.name} intro={theme.description}>
        <ul className="mt-8 flex flex-wrap gap-2">
          {theme.questions.map((q) => <li key={q} className="border bg-card px-4 py-2 text-sm text-card-foreground">{q}</li>)}
        </ul>
      </PageHeader>
      <section className="container-z py-20">
        <SectionHead eyebrow="Publications" title={`${pubs.length} publications`} to="/publications" cta="Open in archive" />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">{pubs.map((p) => <PublicationCard key={p.slug} p={p} />)}</div>
      </section>
      {arts.length > 0 && (
        <section className="border-t bg-paper py-20"><div className="container-z">
          <SectionHead eyebrow="Insights" title="Analysis & news" />
          <div className="grid gap-10 md:grid-cols-3">{arts.map((a) => <ArticleCard key={a.slug} a={a} />)}</div>
        </div></section>
      )}
      <section className="container-z grid gap-16 py-20 lg:grid-cols-2">
        {evs.length > 0 && <div><SectionHead eyebrow="Events" title="Dialogues" />{evs.map((e) => <EventCard key={e.slug} e={e} />)}</div>}
        {experts.length > 0 && <div><SectionHead eyebrow="Experts" title="Researchers" /><div className="grid grid-cols-2 gap-8">{experts.map((p) => <PersonCard key={p.slug} p={p} />)}</div></div>}
      </section>
    </>
  );
}
