import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.string().trim().email("Please enter a valid email").max(255);

/**
 * Newsletter signup. Swap `subscribe` for ZEPARI's mailing service
 * (Mailchimp, Brevo, etc.) via a server function — the UI stays the same.
 */
async function subscribe(email: string) {
  await new Promise((r) => setTimeout(r, 500));
  return { ok: true, email };
}

export function NewsletterForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const dark = tone === "dark";
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(email);
    if (!r.success) { toast.error(r.error.issues[0]?.message ?? "Please check the form"); return; }
    setBusy(true);
    await subscribe(r.data);
    setBusy(false);
    setDone(true);
    toast.success("You're subscribed to the ZEPARI Policy Digest.");
  };
  if (done) return <p className={dark ? "text-gold" : "text-accent"}>Thank you — look out for the next Policy Digest.</p>;
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
      <label htmlFor={`nl-${tone}`} className="sr-only">Email address</label>
      <input id={`nl-${tone}`} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@organisation.org"
        className={`flex-1 border px-4 py-3 text-sm outline-none ${dark ? "border-ink-foreground/20 bg-ink-foreground/5 text-ink-foreground placeholder:text-ink-foreground/40" : "bg-card"}`} />
      <button disabled={busy} className={`rounded px-5 py-3 text-sm font-semibold transition disabled:opacity-60 ${dark ? "bg-gold text-ink hover:bg-ink-foreground" : "bg-ink text-ink-foreground hover:bg-primary"}`}>
        {busy ? "Subscribing…" : "Subscribe"}
      </button>
    </form>
  );
}
