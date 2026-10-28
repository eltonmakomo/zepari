import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { CreditCard, Lock, ShieldCheck, Smartphone, Wallet } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { getArticle, getPublication } from "@/content/queries";
import { recordPurchase } from "@/lib/purchases";

export const Route = createFileRoute("/checkout/$slug")({
  validateSearch: z.object({ kind: z.enum(["publication", "article"]).default("publication") }),
  loaderDeps: ({ search }) => ({ kind: search.kind }),
  loader: ({ params, deps }) => {
    const item = deps.kind === "article" ? getArticle(params.slug) : getPublication(params.slug);
    if (!item || item.access.mode !== "paid") throw notFound();
    return { item: { slug: item.slug, title: item.title, access: item.access }, kind: deps.kind };
  },
  head: () => ({ meta: [{ title: "Checkout | ZEPARI" }, { name: "description", content: "Secure one-off purchase of a ZEPARI publication." }, { name: "robots", content: "noindex" }] }),
  component: Checkout,
});

const methods = [
  { id: "ecocash", label: "EcoCash", note: "Zimbabwe mobile money", Icon: Smartphone },
  { id: "zipit", label: "ZIPIT / Zimswitch", note: "Local bank cards & transfers", Icon: Wallet },
  { id: "card", label: "Visa / Mastercard", note: "International cards", Icon: CreditCard },
  { id: "paypal", label: "PayPal", note: "International wallet", Icon: Wallet },
];

const form = z.object({ name: z.string().trim().min(2, "Enter your full name").max(100), email: z.string().trim().email("Enter a valid email").max(255) });

function Checkout() {
  const { item, kind } = Route.useLoaderData();
  const navigate = useNavigate();
  const tiers = item.access.tiers ?? [{ id: "standard", label: "Standard access", priceUSD: item.access.priceUSD!, note: "Personal licence, read online & download" }];
  const [tier, setTier] = useState(tiers[0]!.id);
  const [method, setMethod] = useState("ecocash");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const chosen = tiers.find((t) => t.id === tier) ?? tiers[0]!;

  const pay = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = form.safeParse({ name, email });
    if (!r.success) { toast.error(r.error.issues[0]?.message ?? "Please check the form"); return; }
    setBusy(true);
    // Production: server creates an order and redirects to the gateway (e.g. Paynow for
    // EcoCash/ZIPIT, card processor for international). Access is granted only when the
    // gateway's signed webhook confirms payment.
    await new Promise((res) => setTimeout(res, 1200));
    const ref = "ZP-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    recordPurchase({ slug: item.slug, kind, tier, amountUSD: chosen.priceUSD, method, email: r.data.email, ref, date: new Date().toISOString() });
    navigate({ to: "/checkout/success", search: { ref, slug: item.slug, kind } });
  };

  return (
    <section className="container-z py-16">
      <Link to={kind === "article" ? "/insights/$slug" : "/publications/$slug"} params={{ slug: item.slug }} className="text-sm text-muted-foreground hover:text-accent">← Back to {kind}</Link>
      <h1 className="mt-4 text-4xl">Secure checkout</h1>
      <form onSubmit={pay} className="mt-10 grid gap-12 lg:grid-cols-12">
        <div className="space-y-10 lg:col-span-7">
          <fieldset>
            <legend className="eyebrow mb-4">1 · Choose access</legend>
            <div className="space-y-3">
              {tiers.map((t) => (
                <label key={t.id} className={`flex cursor-pointer items-center justify-between rounded-sm border p-5 ${tier === t.id ? "border-ink ring-1 ring-ink" : ""}`}>
                  <span className="flex items-center gap-3"><input type="radio" name="tier" checked={tier === t.id} onChange={() => setTier(t.id)} className="accent-[var(--accent)]" /><span><span className="block font-semibold">{t.label}</span><span className="text-sm text-muted-foreground">{t.note}</span></span></span>
                  <span className="font-display text-2xl">US${t.priceUSD}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="eyebrow mb-4">2 · Your details</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm"><span className="mb-1 block font-medium">Full name</span><input value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} className="w-full rounded border bg-card px-3 py-3" /></label>
              <label className="block text-sm"><span className="mb-1 block font-medium">Email (for receipt & library access)</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} className="w-full rounded border bg-card px-3 py-3" /></label>
            </div>
          </fieldset>
          <fieldset>
            <legend className="eyebrow mb-4">3 · Payment method</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {methods.map(({ id, label, note, Icon }) => (
                <label key={id} className={`flex cursor-pointer items-center gap-3 rounded-sm border p-4 ${method === id ? "border-ink ring-1 ring-ink" : ""}`}>
                  <input type="radio" name="method" checked={method === id} onChange={() => setMethod(id)} className="sr-only" />
                  <Icon className="h-5 w-5 text-accent" /><span><span className="block font-semibold">{label}</span><span className="text-xs text-muted-foreground">{note}</span></span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
        <aside className="lg:col-span-5">
          <div className="sticky top-28 rounded-sm bg-paper p-8">
            <p className="eyebrow">Order summary</p>
            <p className="mt-4 font-display text-xl leading-snug">{item.title}</p>
            <div className="mt-6 space-y-2 border-t pt-4 text-sm">
              <div className="flex justify-between"><span>{chosen.label}</span><span>US${chosen.priceUSD.toFixed(2)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Recurring charges</span><span>None</span></div>
            </div>
            <div className="mt-4 flex justify-between border-t pt-4 font-display text-2xl"><span>Total</span><span>US${chosen.priceUSD.toFixed(2)}</span></div>
            <button disabled={busy} className="mt-6 flex w-full items-center justify-center gap-2 rounded bg-accent px-5 py-4 font-semibold text-accent-foreground transition hover:bg-ink disabled:opacity-60">
              <Lock className="h-4 w-4" /> {busy ? "Confirming payment…" : `Pay US$${chosen.priceUSD}`}
            </button>
            <ul className="mt-6 space-y-2 text-xs text-muted-foreground">
              <li className="flex gap-2"><ShieldCheck className="h-4 w-4 shrink-0 text-success" /> Encrypted payment — card details never touch ZEPARI's servers.</li>
              <li className="flex gap-2"><ShieldCheck className="h-4 w-4 shrink-0 text-success" /> Access unlocks only after the payment is confirmed.</li>
              <li className="flex gap-2"><ShieldCheck className="h-4 w-4 shrink-0 text-success" /> Downloads use private, expiring links.</li>
            </ul>
            <p className="mt-4 rounded bg-gold/20 p-3 text-xs">Demo mode: no real payment is taken.</p>
          </div>
        </aside>
      </form>
    </section>
  );
}
