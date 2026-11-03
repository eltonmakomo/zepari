import { createFileRoute, Link } from "@tanstack/react-router";
import harare from "@/assets/harare.jpg";
import field from "@/assets/field.jpg";
import { PageHeader, banners } from "@/components/site/Layout";
import { SectionHead } from "@/components/site/Cards";
import { impactStats, partners } from "@/content/data";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about/")({
  head: () => seo("About ZEPARI", "ZEPARI is an autonomous economic policy analysis and research think tank established in 2003 by a Deed of Trust."),
  component: About,
});

const objectives = [
  "To build research capacity for economic policy analysis and management",
  "To produce first rate and well-articulated applied economic policy research and analysis to inform government policy decisions in accordance with priorities and targets set by the government and the private sector",
  "To diffuse high quality research and policy analysis relevant to current and medium term economic policy issues in Zimbabwe",
  "To build capacity within Government to utilize economic policy research and analysis on a sustainable basis",
  "To assist the country to seize development opportunities and contribute to its emergence as a knowledge based economy",
  "To provide tailor made short and long term training in Economic Policy Management to Government economists in ministries dealing with economic issues",
  "To network with other policy analysis and research institutions",
  "To serve as a platform for collating best practices for national economic management, emerging as a gateway for sharing knowledge in applied economic policy research and analysis",
];

const work = [
  { t: "Research", d: "Needs-based, contextually relevant applied economic policy analysis and research." },
  { t: "Capacity Building", d: "Tailor-made training in economic policy management for government economists." },
  { t: "Consultancy", d: "Commissioned analysis for government, private sector and development partners." },
  { t: "Policy Dialogue", d: "Convening the platforms where evidence meets decision-makers." },
];

function About() {
  return (
    <>
      <PageHeader image={banners.people} eyebrow="About us" title="An independent think tank for evidence-based policy in Zimbabwe."
        intro="The Zimbabwe Economic Policy Analysis and Research Institute (ZEPARI) is an autonomous economic policy analysis and research think tank established in the year 2003 by a Deed of Trust.">
        <div className="mt-8 flex gap-4 text-sm font-semibold">
          <Link to="/about/team" className="text-accent hover:underline">Our team →</Link>
          <Link to="/about/governance" className="text-accent hover:underline">Governance →</Link>
        </div>
      </PageHeader>
      <img src={harare} alt="Harare skyline at golden hour" width={1600} height={912} className="h-[44vh] w-full object-cover" />
      <section className="container-z grid gap-16 py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="rule-gold mb-6" />
          <h2 className="text-3xl">Our mission</h2>
          <p className="mt-4 text-lg text-muted-foreground">To undertake customer driven research and capacity building activities to promote a culture of evidence based policy making and implementation processes in Zimbabwe, and to provide information to the investing public.</p>
          <h2 className="mt-12 text-3xl">Our vision</h2>
          <p className="mt-4 text-lg text-muted-foreground">To become the leading centre of excellence in economic policy research and analysis in Zimbabwe.</p>
        </div>
        <div className="lg:col-span-7">
          <p className="eyebrow">Objectives</p>
          <ol className="mt-6 divide-y border-y">
            {objectives.map((o, i) => (
              <li key={i} className="flex gap-6 py-4"><span className="font-display text-accent">{String(i + 1).padStart(2, "0")}</span><span>{o}</span></li>
            ))}
          </ol>
        </div>
      </section>
      <section className="border-y bg-paper py-24">
        <div className="container-z">
          <SectionHead eyebrow="What we do" title="Four ways we serve policy" />
          <div className="grid gap-8 md:grid-cols-4">
            {work.map((w) => <div key={w.t} className="border-t-2 border-ink pt-5"><h3 className="text-xl">{w.t}</h3><p className="mt-2 text-sm text-muted-foreground">{w.d}</p></div>)}
          </div>
          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {impactStats.map((s) => <div key={s.label}><div className="font-display text-4xl">{s.value}</div><div className="text-sm text-muted-foreground">{s.label}</div></div>)}
          </div>
        </div>
      </section>
      <section className="container-z grid items-center gap-16 py-24 lg:grid-cols-2">
        <img src={field} alt="ZEPARI researcher speaking with farmers" loading="lazy" width={1408} height={912} className="" />
        <div>
          <p className="eyebrow">Corporate identity</p>
          <h2 className="mt-3 text-3xl">The Eagle</h2>
          <p className="mt-4 text-muted-foreground">The ZEPARI logo is an Eagle. It connotes not the predator but the skilled, tactful achiever. Famous for its amazing eyesight and attention to detail, able to fly at great altitudes as it combs through vast terrain singling out its target with astounding precision — characteristics ZEPARI strives for in economic policy research and analysis.</p>
        </div>
      </section>
      <section className="container-z pb-8">
        <SectionHead eyebrow="Partners" title="Who we work with" />
        <div className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent md:w-28"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent md:w-28"
          />
          <ul className="grid grid-cols-2 items-center gap-x-10 gap-y-12 sm:grid-cols-3 lg:grid-cols-6">
            {partners.map((p) => {
              const img = (
                <img
                  src={p.logo}
                  alt={p.name}
                  title={p.name}
                  loading="lazy"
                  className="max-h-16 w-auto max-w-full object-contain opacity-50 grayscale transition duration-300 hover:scale-[1.05] hover:opacity-100 hover:grayscale-0"
                />
              );
              return (
                <li key={p.name} className="flex min-h-24 items-center justify-center">
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={p.name} className="flex items-center justify-center">
                      {img}
                    </a>
                  ) : (
                    img
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
