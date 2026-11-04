import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/checkout/success")({
  validateSearch: z.object({ ref: z.string().default(""), slug: z.string().default(""), kind: z.enum(["publication", "article"]).default("publication") }),
  head: () => ({ meta: [...seo("Purchase confirmed", "Your ZEPARI purchase is confirmed.").meta, { name: "robots", content: "noindex" }] }),
  component: Success,
});

function Success() {
  const { ref, slug, kind } = Route.useSearch();
  return (
    <section className="container-z max-w-2xl py-24 text-center">
      <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
      <h1 className="mt-6 text-4xl">Payment confirmed</h1>
      <p className="mt-4 text-muted-foreground">Thank you. A receipt has been sent to your email. Your purchase is now in your library.</p>
      <p className="mt-6 inline-block bg-paper px-4 py-2 font-mono text-sm">Reference: {ref}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link to={kind === "article" ? "/insights/$slug" : "/publications/$slug"} params={{ slug }} className="rounded bg-ink px-6 py-3 font-semibold text-ink-foreground hover:bg-primary">Read now</Link>
        <Link to="/account" className="rounded border px-6 py-3 font-semibold hover:border-accent">Go to my library</Link>
      </div>
    </section>
  );
}
