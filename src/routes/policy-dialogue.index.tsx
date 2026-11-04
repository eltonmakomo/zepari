import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, banners } from "@/components/site/Layout";
import { EventCard, SectionHead } from "@/components/site/Cards";
import { pastEvents, upcomingEvents } from "@/content/queries";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/policy-dialogue/")({
  head: () => seo("Policy Dialogue & Events", "ZEPARI policy dialogues, validation workshops, webinars, launches and training for government economists."),
  component: () => (
    <>
      <PageHeader image={banners.dialogue} eyebrow="Policy Dialogue" title="Where evidence meets decision-makers." intro="ZEPARI convenes government, business, academia and development partners to debate findings, validate research and shape implementable policy." />
      <section className="container-z grid gap-16 py-20 lg:grid-cols-2">
        <div><SectionHead eyebrow="Upcoming" title="Upcoming events" />{upcomingEvents().map((e) => <EventCard key={e.slug} e={e} />)}</div>
        <div><SectionHead eyebrow="Archive" title="Past dialogues" />{pastEvents().map((e) => <EventCard key={e.slug} e={e} />)}</div>
      </section>
    </>
  ),
});
