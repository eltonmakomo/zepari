import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Eye } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/site/Layout";
import { fmtDate, getArticle, getPublication } from "@/content/queries";
import { usePurchases } from "@/lib/purchases";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My library | ZEPARI" }, { name: "description", content: "Access your purchased ZEPARI publications and articles." }, { name: "robots", content: "noindex" }] }),
  component: Account,
});

function Account() {
  const list = usePurchases();
  return (
    <>
      <PageHeader eyebrow="Account" title="My library" intro="Everything you've purchased, available to read and download at any time." />
      <section className="container-z py-16">
        {list.length === 0 ? (
          <div className="rounded-sm bg-paper p-12 text-center">
            <p className="font-display text-2xl">Your library is empty.</p>
            <p className="mt-2 text-muted-foreground">Purchased publications will appear here.</p>
            <Link to="/publications" search={{ access: "paid" }} className="mt-6 inline-flex rounded bg-ink px-6 py-3 font-semibold text-ink-foreground">Browse premium research</Link>
          </div>
        ) : (
          <div className="divide-y border-y">
            {list.map((p) => {
              const item = p.kind === "article" ? getArticle(p.slug) : getPublication(p.slug);
              if (!item) return null;
              return (
                <div key={p.slug} className="flex flex-wrap items-center justify-between gap-4 py-6">
                  <div>
                    <p className="text-xs text-muted-foreground">Purchased {fmtDate(p.date.slice(0, 10))} · {p.ref} · US${p.amountUSD}</p>
                    <p className="mt-1 font-display text-xl">{item.title}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link to={p.kind === "article" ? "/insights/$slug" : "/publications/$slug"} params={{ slug: p.slug }} className="inline-flex items-center gap-2 rounded border px-4 py-2 text-sm font-semibold"><Eye className="h-4 w-4" /> Read</Link>
                    <button onClick={() => toast.success("Secure download link generated (demo).")} className="inline-flex items-center gap-2 rounded bg-ink px-4 py-2 text-sm font-semibold text-ink-foreground"><Download className="h-4 w-4" /> Download</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
