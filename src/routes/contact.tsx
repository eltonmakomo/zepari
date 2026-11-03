import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Select } from "@/components/site/Select";
import { PageHeader, banners, SocialLinks } from "@/components/site/Layout";
import { site } from "@/content/data";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact", "Contact ZEPARI at 55 Mull Road, Belvedere, Harare. Research enquiries, media, events and consultancy."),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  topic: z.string(),
  message: z.string().trim().min(10, "Message is too short").max(2000),
});

function Contact() {
  const [f, setF] = useState({ name: "", email: "", topic: "Research enquiry", message: "" });
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(f);
    if (!r.success) { toast.error(r.error.issues[0]?.message ?? "Please check the form"); return; }
    setSent(true);
    toast.success("Message sent. We'll be in touch.");
  };
  const inp = "w-full border bg-card px-3 py-3";
  return (
    <>
      <PageHeader image={banners.meeting} eyebrow="Contact" title="Talk to ZEPARI." intro="For research enquiries, consultancy, media requests, partnerships and events." />
      <section className="container-z grid gap-16 py-20 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-5">
          <div><p className="eyebrow">Visit</p><p className="mt-2 font-display text-2xl">{site.address}</p></div>
          <div><p className="eyebrow">Call</p>{site.phones.map((p) => <a key={p} href={`tel:${p.replace(/[^+\d]/g, "")}`} className="mt-1 block text-lg hover:text-accent">{p}</a>)}</div>
          <div><p className="eyebrow">Email</p>{site.emails.map((m) => <a key={m} href={`mailto:${m}`} className="mt-1 block text-lg hover:text-accent">{m}</a>)}</div>
          <SocialLinks />
          <iframe title="ZEPARI location map" className="aspect-[4/3] w-full border" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=31.0085%2C-17.8310%2C31.0215%2C-17.8215&layer=mapnik&marker=-17.8263%2C31.0151" />
        </div>
        <div className="lg:col-span-7">
          {sent ? <div className="bg-paper p-12"><p className="font-display text-3xl">Thank you.</p><p className="mt-2 text-muted-foreground">Your message has been received.</p></div> : (
            <form onSubmit={submit} className="space-y-5 bg-paper p-8 md:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm"><span className="mb-1 block font-medium">Name</span><input className={inp} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} maxLength={100} required /></label>
                <label className="block text-sm"><span className="mb-1 block font-medium">Email</span><input type="email" className={inp} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} maxLength={255} required /></label>
              </div>
              <label className="block text-sm"><span className="mb-1 block font-medium">Topic</span>
                <Select className="px-3 py-3" value={f.topic} onChange={(e) => setF({ ...f, topic: e.target.value })}>
                  {["Research enquiry", "Consultancy", "Capacity building / training", "Media", "Events", "Publication purchase support", "Internships"].map((t) => <option key={t}>{t}</option>)}
                </Select></label>
              <label className="block text-sm"><span className="mb-1 block font-medium">Message</span><textarea rows={6} className={inp} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} maxLength={2000} required /></label>
              <button className="rounded bg-ink px-8 py-3.5 font-semibold text-ink-foreground hover:bg-primary">Send message</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
