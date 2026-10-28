import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import hero from "@/assets/hero.jpg";
import dialogue from "@/assets/dialogue.jpg";
import researcher from "@/assets/researcher.jpg";
import { articles, impactStats, media, publications, themes } from "@/content/data";
import { authorName, byDateDesc, fmtDate, upcomingEvents } from "@/content/queries";
import { AccessBadge, ArticleCard, EventCard, MediaCard, PublicationCard, SectionHead } from "@/components/site/Cards";
import { NewsletterForm } from "@/components/site/Newsletter";
import { GrowthChart } from "@/components/site/Charts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZEPARI — Evidence for Zimbabwe's economic future" },
      { name: "description", content: "ZEPARI is Zimbabwe's independent economic policy think tank: research, policy briefs, dialogues and data on growth, finance, trade and poverty." },
      { property: "og:title", content: "ZEPARI — Evidence for Zimbabwe's economic future" },
      { property: "og:description", content: "Independent economic policy research, policy dialogue and capacity building for Zimbabwe since 2003." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = publications.find((p) => p.featured)!;
  const latestPubs = [...publications].sort(byDateDesc).filter((p) => p.slug !== featured.slug).slice(0, 4);
  const latest = [...articles].sort(byDateDesc);
  const upcoming = upcomingEvents().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-ink relative -mt-[76px] overflow-hidden pt-[76px] text-ink-foreground">
        <div className="pattern-dzimbahwe pattern-fade absolute inset-0" aria-hidden />
        <div className="container-z relative grid items-center gap-12 pb-24 pt-14 lg:grid-cols-12 lg:pt-24">
          <div className="animate-rise lg:col-span-6">
            <span className="glass-dark inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold"><span className="h-1.5 w-1.5 bg-gold" /> Independent think tank · Since 2003</span>
            <h1 className="mt-7 text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
              Evidence that shapes <span className="text-gold">Zimbabwe's</span> economic future.
            </h1>
            <p className="mt-8 max-w-xl text-lg text-ink-foreground/75">
              ZEPARI produces independent, contextually relevant research and convenes the dialogues where policy is debated — so decisions are made on evidence, not assumption.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/publications" className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-card">Explore research <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/policy-dialogue" className="glass-dark inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition hover:text-gold">Upcoming dialogues</Link>
            </div>
          </div>
          <div className="relative lg:col-span-6">
            <img src={hero} alt="ZEPARI economists reviewing research findings" width={1600} height={1104} className="aspect-[4/3] w-full object-cover shadow-2xl ring-1 ring-ink-foreground/15" />
            <Link to="/publications/$slug" params={{ slug: featured.slug }}
              className="glass-dark animate-floaty group absolute -bottom-10 left-4 right-4 p-6 md:left-auto md:right-6 md:w-96">
              <div className="flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">New flagship study</span><AccessBadge mode={featured.access.mode} price={featured.access.priceUSD} /></div>
              <p className="mt-3 font-display text-xl leading-snug group-hover:text-gold">{featured.title}</p>
              <p className="mt-3 text-xs text-ink-foreground/60">{fmtDate(featured.date)} · {featured.pages} pages</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="container-z relative z-10 -mt-6">
        <div className="glass grid grid-cols-2 md:grid-cols-4">
          {impactStats.map((s) => (
            <div key={s.label} className="px-6 py-8 md:px-8">
              <div className="font-display text-4xl font-semibold text-ink md:text-5xl">{s.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest insights */}
      <section className="container-z py-24">
        <SectionHead eyebrow="Insights & News" title="The latest from our researchers" to="/insights" />
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">{latest[0] && <ArticleCard a={latest[0]} large />}</div>
          <div className="space-y-10 lg:col-span-5">
            {latest.slice(1, 4).map((a) => (
              <article key={a.slug} className="border-b pb-8 last:border-0">
                <div className="flex items-center gap-3 text-xs text-muted-foreground"><span className="font-semibold uppercase tracking-wider text-accent">{a.kind}</span>{fmtDate(a.date)}</div>
                <h3 className="mt-2 text-xl leading-snug"><Link to="/insights/$slug" params={{ slug: a.slug }} className="hover:text-accent">{a.title}</Link></h3>
                <p className="mt-1 text-xs text-muted-foreground">{authorName(a.author)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters + chart */}
      <section className="relative bg-ink text-ink-foreground">
        <div className="pattern-dzimbahwe pattern-fade absolute inset-0" aria-hidden />
        <div className="container-z relative grid gap-14 py-24 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-gold">Why our work matters</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">Growth has returned. The question is who it reaches.</h2>
            <p className="mt-6 max-w-lg text-ink-foreground/70">
              Zimbabwe's economy is recovering, but jobs, credit and incomes lag behind. ZEPARI's research follows the evidence from the national accounts to the household — informing government, business and development partners across Southern Africa.
            </p>
            <Link to="/insights/$slug" params={{ slug: "jobs-paradox" }} className="mt-8 inline-flex items-center gap-2 font-semibold text-gold hover:underline">Read: The Jobs Paradox <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          <div className="border border-ink-foreground/10 bg-ink-foreground/5 p-6">
            <GrowthChart />
          </div>
        </div>
      </section>

      {/* Research themes */}
      <section className="container-z py-24">
        <SectionHead eyebrow="Research areas" title="Where we focus" to="/research" cta="All research areas" />
        <div className="grid gap-px overflow-hidden border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {themes.map((t, i) => (
            <Link key={t.id} to="/research/$theme" params={{ theme: t.id }} className="group flex min-h-52 flex-col justify-between bg-card p-6 transition hover:bg-paper">
              <span className="font-display text-sm text-muted-foreground">0{i + 1}</span>
              <div>
                <h3 className="text-xl leading-snug group-hover:text-accent">{t.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{t.description}</p>
              </div>
            </Link>
          ))}
          <Link to="/publications" className="flex min-h-52 flex-col justify-end bg-accent p-6 text-accent-foreground">
            <h3 className="text-xl">Browse the full archive</h3>
            <ArrowRight className="mt-3 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Publications */}
      <section className="border-t bg-paper py-24">
        <div className="container-z">
          <SectionHead eyebrow="Publications" title="Recent research & policy briefs" to="/publications" />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">{latestPubs.map((p) => <PublicationCard key={p.slug} p={p} />)}</div>
        </div>
      </section>

      {/* Events */}
      <section className="container-z grid gap-14 py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <img src={dialogue} alt="Panel at a ZEPARI policy dialogue" loading="lazy" width={1408} height={912} className="aspect-[4/5] w-full object-cover" />
        </div>
        <div className="lg:col-span-7">
          <SectionHead eyebrow="Policy Dialogue" title="Upcoming events" to="/policy-dialogue" cta="All events" />
          {upcoming.map((e) => <EventCard key={e.slug} e={e} />)}
        </div>
      </section>

      {/* Media */}
      <section className="border-t py-24">
        <div className="container-z">
          <SectionHead eyebrow="Media" title="Watch, listen, read" to="/media" />
          <div className="grid gap-10 md:grid-cols-3">{media.slice(0, 3).map((m) => <MediaCard key={m.id} m={m} />)}</div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="container-z">
        <div className="grid overflow-hidden bg-paper lg:grid-cols-2">
          <div className="p-10 md:p-16">
            <p className="eyebrow">The Policy Digest</p>
            <h2 className="mt-4 text-4xl leading-tight">Evidence in your inbox, once a month.</h2>
            <p className="mt-4 max-w-md text-muted-foreground">New research, event invitations and the Economic Barometer — curated by ZEPARI's research team.</p>
            <div className="mt-8 max-w-md"><NewsletterForm /></div>
          </div>
          <img src={researcher} alt="A ZEPARI researcher analysing data" loading="lazy" width={1200} height={1408} className="hidden h-full max-h-[520px] w-full object-cover lg:block" />
        </div>
      </section>
    </>
  );
}
