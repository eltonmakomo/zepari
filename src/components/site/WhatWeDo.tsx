import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export const tints = ["bg-tint-1", "bg-tint-2", "bg-tint-3", "bg-tint-4", "bg-tint-5", "bg-tint-6"];

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">{children}</p>;
}

export function TintGrid({ items, numbered = true }: { items: string[]; numbered?: boolean }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <li key={item} className={`${tints[i % tints.length]} flex min-h-36 flex-col justify-between gap-6 border border-border/60 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-card`}>
          {numbered && <span className="font-display text-3xl text-accent/70">{String(i + 1).padStart(2, "0")}</span>}
          <span className="text-lg font-medium leading-snug">{item}</span>
        </li>
      ))}
    </ul>
  );
}

const sections = [
  { to: "/research", label: "Research" },
  { to: "/what-we-do/capacity-building", label: "Capacity Building" },
  { to: "/what-we-do/consultancy", label: "Consultancy" },
  { to: "/what-we-do/our-impact", label: "Our Impact" },
] as const;

export function WhatWeDoNext({ current }: { current: string }) {
  return (
    <section className="border-t bg-tint-2/60">
      <div className="container-z py-14">
        <Eyebrow>Explore what we do</Eyebrow>
        <div className="grid gap-4 sm:grid-cols-3">
          {sections.filter((s) => s.to !== current).map((s) => (
            <Link key={s.to} to={s.to} className="group flex items-center justify-between border bg-card p-6 transition hover:border-accent">
              <span className="font-display text-2xl">{s.label}</span>
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactBand({ text, emails }: { text: string; emails: string[] }) {
  return (
    <section className="bg-band-blue text-ink-foreground">
      <div className="container-z grid gap-8 py-14 md:grid-cols-12 md:items-center">
        <p className="font-display text-2xl leading-snug md:col-span-7 md:text-3xl">{text}</p>
        <div className="flex flex-col gap-3 md:col-span-5 md:items-end">
          {emails.map((e) => (
            <a key={e} href={`mailto:${e}`} className="rounded-full border border-ink-foreground/30 px-5 py-2.5 text-sm transition hover:border-gold hover:text-gold">{e}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
