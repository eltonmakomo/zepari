import { Link, useNavigate } from "@tanstack/react-router";
import { Facebook, Linkedin, Menu, Search, X, Youtube } from "lucide-react";
import { useState, type ReactNode } from "react";
import { site } from "@/content/data";
import { NewsletterForm } from "./Newsletter";
import logo from "@/assets/zepari-logo.jpg.asset.json";

const nav = [
  { to: "/about", label: "About", sub: [{ to: "/about", label: "Overview" }, { to: "/about/team", label: "Our Team" }, { to: "/about/governance", label: "Governance" }] },
  { to: "/research", label: "Research" },
  { to: "/publications", label: "Publications" },
  { to: "/insights", label: "Insights" },
  { to: "/policy-dialogue", label: "Policy Dialogue" },
  { to: "/media", label: "Media" },
  { to: "/contact", label: "Contact" },
] as const;

export function XIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={props.className} fill="currentColor">
      <path d="M18.9 2H22l-7.6 8.7L23 22h-6.8l-5.3-6.9L4.8 22H1.7l8.1-9.3L1 2h6.9l4.8 6.4L18.9 2Zm-1.2 18h1.7L6.4 3.9H4.6L17.7 20Z" />
    </svg>
  );
}

export function SocialLinks({ className = "" }: { className?: string }) {
  const items = [
    { href: site.social.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: site.social.x, label: "X", Icon: XIcon },
    { href: site.social.facebook, label: "Facebook", Icon: Facebook },
    { href: site.social.youtube, label: "YouTube", Icon: Youtube },
  ];
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {items.map(({ href, label, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`ZEPARI on ${label}`}
          className="grid h-9 w-9 place-items-center rounded-full border border-current/20 transition hover:border-gold hover:text-gold">
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}

function Logo({ light }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center rounded-xl bg-card px-2.5 py-1 shadow-sm" aria-label="ZEPARI home">
      <img src={logo.url} alt="ZEPARI — Zimbabwe Economic Policy Analysis and Research Institute" width={230} height={49} className="h-10 w-auto md:h-10" />
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    navigate({ to: "/search", search: { q } });
  };
  return (
    <header className="sticky top-0 z-40 px-3 pt-3">
      <div className="glass container-z flex h-16 items-center justify-between gap-6 rounded-2xl">

        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <div key={n.to} className="group relative">
              <Link to={n.to} activeOptions={{ exact: false }}
                className="whitespace-nowrap rounded px-2.5 py-2 text-sm font-medium text-foreground/80 transition hover:text-foreground data-[status=active]:text-accent">
                {n.label}
              </Link>
              {"sub" in n && (
                <div className="invisible absolute left-0 top-full min-w-48 translate-y-1 rounded border bg-card p-2 opacity-0 shadow-card transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {n.sub.map((s) => (
                    <Link key={s.to} to={s.to} activeOptions={{ exact: true }} className="block rounded px-3 py-2 text-sm hover:bg-muted">{s.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <form onSubmit={submit} role="search" className="hidden items-center rounded-full border bg-card px-3 xl:flex">
            <Search className="h-4 w-4 text-muted-foreground" />
            <label className="sr-only" htmlFor="site-search">Search ZEPARI</label>
            <input id="site-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search research…" className="w-32 bg-transparent px-2 py-2 text-sm outline-none" />
          </form>
          <Link to="/account" className="hidden whitespace-nowrap rounded-full bg-ink px-4 py-2 text-sm font-medium text-ink-foreground transition hover:bg-primary sm:inline-flex">My library</Link>
          <button className="grid h-10 w-10 place-items-center lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t bg-background lg:hidden">
          <div className="container-z space-y-1 py-4">
            <form onSubmit={submit} role="search" className="mb-3 flex items-center rounded border bg-card px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input aria-label="Search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search research…" className="w-full bg-transparent px-2 py-3 outline-none" />
            </form>
            {nav.map((n) => (
              <div key={n.to}>
                <Link to={n.to} onClick={() => setOpen(false)} className="block py-2 font-display text-xl">{n.label}</Link>
                {"sub" in n && n.sub.slice(1).map((s) => (
                  <Link key={s.to} to={s.to} onClick={() => setOpen(false)} className="block py-1 pl-4 text-muted-foreground">{s.label}</Link>
                ))}
              </div>
            ))}
            <Link to="/account" onClick={() => setOpen(false)} className="block py-2 font-display text-xl text-accent">My library</Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative mt-24 bg-ink text-ink-foreground">
      <div className="pattern-dzimbahwe absolute inset-0 opacity-60" aria-hidden />
      <div className="container-z relative grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Logo light />
          <p className="mt-6 max-w-md text-ink-foreground/70">{site.full}. Independent, evidence-based economic policy analysis for Zimbabwe since {site.founded}.</p>
          <div className="mt-8 max-w-md">
            <p className="mb-3 font-display text-xl">The Policy Digest, monthly.</p>
            <NewsletterForm tone="dark" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
          <FooterCol title="Institute" links={[["/about", "Overview"], ["/about/team", "Our Team"], ["/about/governance", "Governance"], ["/contact", "Contact"]]} />
          <FooterCol title="Research" links={[["/research", "Research areas"], ["/publications", "Publications"], ["/insights", "Insights"], ["/policy-dialogue", "Policy Dialogue"]]} />
          <FooterCol title="Media" links={[["/media", "Videos & podcasts"], ["/media", "Newsletters"], ["/insights", "News"], ["/account", "My library"]]} />
          <div className="col-span-2 sm:col-span-3">
            <p className="text-sm text-ink-foreground/70">{site.address}</p>
            <p className="mt-1 text-sm text-ink-foreground/70">
              <a href={`mailto:${site.emails[0]}`} className="hover:text-gold">{site.emails[0]}</a> · {site.phones[0]}
            </p>
            <SocialLinks className="mt-5" />
          </div>
        </div>
      </div>
      <div className="relative border-t border-ink-foreground/10">
        <div className="container-z flex flex-col justify-between gap-2 py-6 text-xs text-ink-foreground/50 sm:flex-row">
          <span>© {new Date().getFullYear()} ZEPARI. All rights reserved.</span>
          <span>Harare · Zimbabwe</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-gold">{title}</p>
      <ul className="space-y-2 text-sm">
        {links.map(([to, l]) => (
          <li key={l}><Link to={to} className="text-ink-foreground/80 hover:text-gold">{l}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export function PageHeader({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children?: ReactNode }) {
  return (
    <section className="bg-ink relative -mt-[76px] overflow-hidden pt-[76px] text-ink-foreground">
      <div className="pattern-dzimbahwe pattern-fade absolute inset-0" aria-hidden />
      <div className="container-z relative animate-rise py-16 md:py-24">
        <span className="glass-dark inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">{eyebrow}</span>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg text-ink-foreground/75">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
