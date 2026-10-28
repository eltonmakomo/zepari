import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { z } from "zod";
import { PageHeader } from "@/components/site/Layout";
import { PublicationCard } from "@/components/site/Cards";
import { publications, themes } from "@/content/data";
import { authorName, byDateDesc } from "@/content/queries";
import type { PubType } from "@/content/types";
import { seo } from "@/lib/seo";

const types: PubType[] = ["Research Study", "Policy Brief", "Working Paper", "Economic Barometer", "Report", "Press Release"];

const searchSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  theme: z.string().optional(),
  year: z.string().optional(),
  access: z.enum(["free", "paid"]).optional(),
});

export const Route = createFileRoute("/publications/")({
  validateSearch: searchSchema,
  head: () => seo("Publications", "Search ZEPARI research studies, policy briefs, working papers, reports and the Economic Barometer."),
  component: Archive,
});

function Archive() {
  const s = Route.useSearch();
  const navigate = useNavigate({ from: "/publications/" });
  const set = (patch: Partial<typeof s>) => navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });
  const years = [...new Set(publications.map((p) => p.date.slice(0, 4)))].sort().reverse();
  const q = (s.q ?? "").toLowerCase();

  const results = publications
    .filter((p) => !s.type || p.type === s.type)
    .filter((p) => !s.theme || p.themes.includes(s.theme as never))
    .filter((p) => !s.year || p.date.startsWith(s.year))
    .filter((p) => !s.access || p.access.mode === s.access)
    .filter((p) => !q || [p.title, p.abstract, p.authors.map(authorName).join(" ")].join(" ").toLowerCase().includes(q))
    .sort(byDateDesc);

  const sel = "w-full rounded border bg-card px-3 py-2.5 text-sm";
  const active = Object.values(s).some(Boolean);

  return (
    <>
      <PageHeader eyebrow="Publications" title="The research archive" intro="Research studies, policy briefs, working papers, reports, press releases and the Economic Barometer — searchable across two decades of ZEPARI work." />
      <section className="container-z grid gap-12 py-16 lg:grid-cols-12">
        <aside className="lg:col-span-3" aria-label="Filters">
          <div className="space-y-5 lg:sticky lg:top-28">
            <div className="flex items-center rounded border bg-card px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <label htmlFor="kw" className="sr-only">Keyword</label>
              <input id="kw" value={s.q ?? ""} onChange={(e) => set({ q: e.target.value || undefined })} placeholder="Keyword, title or author" className="w-full bg-transparent px-2 py-2.5 text-sm outline-none" />
            </div>
            <Field label="Publication type"><select className={sel} value={s.type ?? ""} onChange={(e) => set({ type: e.target.value || undefined })}><option value="">All types</option>{types.map((t) => <option key={t}>{t}</option>)}</select></Field>
            <Field label="Research area"><select className={sel} value={s.theme ?? ""} onChange={(e) => set({ theme: e.target.value || undefined })}><option value="">All areas</option>{themes.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}</select></Field>
            <Field label="Year"><select className={sel} value={s.year ?? ""} onChange={(e) => set({ year: e.target.value || undefined })}><option value="">All years</option>{years.map((y) => <option key={y}>{y}</option>)}</select></Field>
            <Field label="Access">
              <div className="flex gap-2">
                {([undefined, "free", "paid"] as const).map((a) => (
                  <button key={a ?? "all"} onClick={() => set({ access: a })} aria-pressed={s.access === a}
                    className={`flex-1 rounded border px-3 py-2 text-sm ${s.access === a ? "border-ink bg-ink text-ink-foreground" : "bg-card"}`}>{a ? a[0].toUpperCase() + a.slice(1) : "All"}</button>
                ))}
              </div>
            </Field>
            {active && <button onClick={() => navigate({ search: {}, replace: true })} className="text-sm font-semibold text-accent hover:underline">Clear all filters</button>}
          </div>
        </aside>
        <div className="lg:col-span-9">
          <p className="border-b pb-4 text-sm text-muted-foreground" aria-live="polite">{results.length} {results.length === 1 ? "result" : "results"}</p>
          {results.map((p) => <PublicationCard key={p.slug} p={p} layout="row" />)}
          {results.length === 0 && <p className="py-16 text-center text-muted-foreground">No publications match these filters.</p>}
        </div>
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>{children}</label>;
}
