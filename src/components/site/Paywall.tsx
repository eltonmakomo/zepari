import { Link } from "@tanstack/react-router";
import { Lock, ShieldCheck } from "lucide-react";
import type { Access } from "@/content/types";

export function Paywall({ slug, access, kind }: { slug: string; access: Access; kind: "publication" | "article" }) {
  const from = access.tiers?.length ? Math.min(...access.tiers.map((t) => t.priceUSD)) : access.priceUSD;
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -top-32 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" aria-hidden />
      <div className="rounded-sm border-2 border-ink bg-card p-8 text-center shadow-card md:p-12">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gold/25 text-ink"><Lock className="h-5 w-5" /></span>
        <h2 className="mt-5 text-2xl md:text-3xl">Continue reading the full {kind === "publication" ? "publication" : "article"}</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">One-off purchase from <strong className="text-foreground">US${from}</strong>. No subscription. Lifetime access in your library, with PDF download.</p>
        <Link to="/checkout/$slug" params={{ slug }} search={{ kind }} className="mt-8 inline-flex rounded bg-accent px-8 py-3.5 font-semibold text-accent-foreground transition hover:bg-ink">Buy access</Link>
        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 text-success" /> Secure checkout · EcoCash, ZIPIT, Visa, Mastercard, PayPal</p>
      </div>
    </div>
  );
}
