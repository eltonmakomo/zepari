import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CalendarPlus, MapPin } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ThemeTags } from "@/components/site/Cards";
import { RelatedContent, ShareBar } from "@/components/site/Share";
import { fmtDate, getEvent, getPublication } from "@/content/queries";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/policy-dialogue/$slug")({
  loader: ({ params }) => {
    const e = getEvent(params.slug);
    if (!e) throw notFound();
    return { e };
  },
  head: ({ loaderData }) => (loaderData ? seo(loaderData.e.title, loaderData.e.summary) : { meta: [{ title: "Event | ZEPARI" }, { name: "robots", content: "noindex" }] }),
  component: EventPage,
});

const reg = z.object({ name: z.string().trim().min(2).max(100), email: z.string().trim().email().max(255), org: z.string().trim().max(150) });

function EventPage() {
  const { e } = Route.useLoaderData();
  const upcoming = e.date >= new Date().toISOString().slice(0, 10);
  const pub = e.relatedPublication ? getPublication(e.relatedPublication) : undefined;
  const [f, setF] = useState({ name: "", email: "", org: "" });
  const [done, setDone] = useState(false);
  const ics = () => {
    const d = e.date.replace(/-/g, "");
    const blob = new Blob([`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART;VALUE=DATE:${d}\nSUMMARY:${e.title}\nLOCATION:${e.location}\nEND:VEVENT\nEND:VCALENDAR`], { type: "text/calendar" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${e.slug}.ics`;
    a.click();
  };
  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!reg.safeParse(f).success) { toast.error("Please complete your name and a valid email."); return; }
    setDone(true);
    toast.success("Registration received — we'll email your confirmation.");
  };
  return (
    <>
      <section className="border-b bg-paper">
        <div className="container-z grid gap-12 py-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Link to="/policy-dialogue" className="text-sm text-muted-foreground hover:text-accent">← Policy Dialogue</Link>
            <p className="eyebrow mt-6">{e.format}</p>
            <h1 className="mt-3 text-4xl leading-tight md:text-5xl">{e.title}</h1>
            <p className="mt-6 text-lg text-muted-foreground">{e.summary}</p>
            <div className="mt-6 flex flex-wrap gap-6 text-sm">
              <span className="font-semibold">{fmtDate(e.date)}{e.endDate && ` – ${fmtDate(e.endDate)}`}</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{e.location}</span>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-6"><ThemeTags ids={e.themes} /><ShareBar title={e.title} /></div>
          </div>
          {upcoming && (
            <aside className="lg:col-span-4">
              <div className="rounded-sm bg-card p-6 shadow-card">
                <p className="font-display text-xl">Register to attend</p>
                {done ? <p className="mt-4 text-success">You're registered. See you there.</p> : (
                  <form onSubmit={submit} className="mt-4 space-y-3">
                    {(["name", "email", "org"] as const).map((k) => (
                      <input key={k} aria-label={k} type={k === "email" ? "email" : "text"} placeholder={k === "org" ? "Organisation" : k[0].toUpperCase() + k.slice(1)} value={f[k]} onChange={(x) => setF({ ...f, [k]: x.target.value })} className="w-full rounded border bg-background px-3 py-2.5 text-sm" />
                    ))}
                    <button className="w-full rounded bg-accent py-3 font-semibold text-accent-foreground hover:bg-ink">Register</button>
                  </form>
                )}
                <button onClick={ics} className="mt-3 flex w-full items-center justify-center gap-2 rounded border py-2.5 text-sm font-semibold"><CalendarPlus className="h-4 w-4" /> Add to calendar</button>
              </div>
            </aside>
          )}
        </div>
      </section>
      <section className="container-z grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {e.video && <div className="aspect-video overflow-hidden rounded-sm"><iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${e.video}`} title={e.title} allowFullScreen loading="lazy" /></div>}
          {e.agenda && (
            <><h2 className="mb-4 text-2xl">Programme</h2>
              <ol className="divide-y border-y">{e.agenda.map((x) => <li key={x.time} className="flex gap-8 py-4"><span className="w-16 font-mono text-sm text-accent">{x.time}</span>{x.item}</li>)}</ol></>
          )}
        </div>
        {pub && (
          <aside className="lg:col-span-4">
            <Link to="/publications/$slug" params={{ slug: pub.slug }} className="block rounded-sm border-l-4 border-gold bg-paper p-6 hover:bg-muted">
              <span className="eyebrow">Related publication</span><span className="mt-2 block font-display text-xl">{pub.title}</span>
            </Link>
          </aside>
        )}
      </section>
      <RelatedContent themes={e.themes} exclude={e.slug} />
    </>
  );
}
