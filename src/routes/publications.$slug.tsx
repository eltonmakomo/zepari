import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2, Download, Eye, FileText } from "lucide-react";
import { toast } from "sonner";
import { AccessBadge, ThemeTags } from "@/components/site/Cards";
import { Paywall } from "@/components/site/Paywall";
import { RelatedContent, ShareBar } from "@/components/site/Share";
import { authorName, fmtDate, getPerson, getPublication } from "@/content/queries";
import { useOwns } from "@/lib/purchases";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/publications/$slug")({
  loader: ({ params }) => {
    const p = getPublication(params.slug);
    if (!p) throw notFound();
    return { p };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Publication | ZEPARI" }, { name: "robots", content: "noindex" }] };
    const h = seo(loaderData.p.title, loaderData.p.abstract.slice(0, 155));
    return { meta: [...h.meta, { property: "og:type", content: "article" }] };
  },
  component: PublicationPage,
});

function PublicationPage() {
  const { p } = Route.useLoaderData();
  const owns = useOwns(p.slug);
  const unlocked = p.access.mode === "free" || owns;

  const download = () => {
    if (p.publicFile) { window.open(p.publicFile, "_blank", "noopener"); return; }
    // Paid files are never public: production requests a short-lived signed URL
    // from the server after verifying the buyer's entitlement.
    toast.success("Your secure download link has been generated (demo).");
  };

  return (
    <>
      <article>
        <header className="border-b bg-paper">
          <div className="container-z grid gap-12 py-16 lg:grid-cols-12">
            <div className="animate-rise lg:col-span-8">
              <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb"><Link to="/publications" className="hover:text-accent">Publications</Link> / <Link to="/publications" search={{ type: p.type }} className="hover:text-accent">{p.type}</Link></nav>
              <div className="mt-6 flex flex-wrap items-center gap-3"><span className="eyebrow">{p.type}</span><AccessBadge mode={p.access.mode} price={p.access.priceUSD} /></div>
              <h1 className="mt-4 text-4xl leading-[1.08] md:text-5xl">{p.title}</h1>
              <p className="mt-6 text-sm text-muted-foreground">
                By {p.authors.map((a, i) => (
                  <span key={a}>{i > 0 && ", "}{getPerson(a) ? <Link to="/about/team" hash={a} className="font-medium text-foreground hover:text-accent">{authorName(a)}</Link> : a}</span>
                ))}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{fmtDate(p.date)}{p.pages && ` · ${p.pages} pages`}</p>
              <div className="mt-6"><ThemeTags ids={p.themes} /></div>
            </div>
            <aside className="lg:col-span-4">
              <div className="border bg-card p-6 shadow-card">
                {unlocked ? (
                  <>
                    {owns && <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-success"><CheckCircle2 className="h-4 w-4" /> In your library</p>}
                    <button onClick={download} className="flex w-full items-center justify-center gap-2 rounded bg-ink px-5 py-3 font-semibold text-ink-foreground hover:bg-primary"><Download className="h-4 w-4" /> Download PDF</button>
                    <a href="#full-text" className="mt-3 flex w-full items-center justify-center gap-2 rounded border px-5 py-3 font-semibold hover:border-accent"><Eye className="h-4 w-4" /> Read online</a>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground">Full text & download</p>
                    <p className="mt-1 font-display text-4xl">US${p.access.priceUSD}</p>
                    <p className="mt-1 text-xs text-muted-foreground">One-off purchase · no subscription</p>
                    <Link to="/checkout/$slug" params={{ slug: p.slug }} search={{ kind: "publication" }} className="mt-5 flex w-full justify-center rounded bg-accent px-5 py-3 font-semibold text-accent-foreground hover:bg-ink">Buy this publication</Link>
                    <a href="#preview" className="mt-3 flex w-full items-center justify-center gap-2 rounded border px-5 py-3 text-sm font-semibold"><FileText className="h-4 w-4" /> Read free preview</a>
                  </>
                )}
                <div className="mt-6 border-t pt-5"><ShareBar title={p.title} /></div>
              </div>
            </aside>
          </div>
        </header>

        <div className="container-z grid gap-12 py-16 lg:grid-cols-12">
          <div id="preview" className="prose-z lg:col-span-8">
            <h2 className="!mt-0">Abstract</h2>
            <p>{p.abstract}</p>
            <h2>Key findings</h2>
            <ul>{p.keyFindings.map((f) => <li key={f}>{f}</li>)}</ul>
            {unlocked ? (
              <div id="full-text">
                <h2>Policy recommendations</h2>
                <ul>{p.recommendations.map((r) => <li key={r}>{r}</li>)}</ul>
                {owns && <p className="bg-paper p-5 text-sm">Full text unlocked. Download the complete PDF for all chapters, tables and annexes.</p>}
              </div>
            ) : (
              <div className="mt-12 not-prose"><Paywall slug={p.slug} access={p.access} kind="publication" /></div>
            )}
          </div>
          <aside className="lg:col-span-4">
            <div className="space-y-4 rounded-sm bg-paper p-6 text-sm">
              <p className="eyebrow">Cite this</p>
              <p className="text-muted-foreground">{p.authors.map(authorName).join(", ")} ({p.date.slice(0, 4)}). <em>{p.title}</em>. Harare: ZEPARI.</p>
              <button onClick={() => navigator.clipboard.writeText(`${p.authors.map(authorName).join(", ")} (${p.date.slice(0, 4)}). ${p.title}. Harare: ZEPARI.`).then(() => toast.success("Citation copied"))} className="font-semibold text-accent hover:underline">Copy citation</button>
            </div>
          </aside>
        </div>
      </article>
      <RelatedContent themes={p.themes} exclude={p.slug} />
    </>
  );
}
