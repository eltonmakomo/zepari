import bDialogue from "@/assets/policy-dialogue-panorama-refined.jpg";
import bWorkshop from "@/assets/economics-workshop-panorama.jpg";
import bResearch from "@/assets/research-archive-panorama.jpg";
import bMeeting from "@/assets/governance-meeting-panorama.jpg";
import bPeople from "@/assets/harare-institute-panorama.jpg";
import dialoguePortrait from "@/assets/policy-dialogue-portrait.jpg";
import workshopPortrait from "@/assets/economics-workshop-portrait.jpg";
import meetingPortrait from "@/assets/governance-meeting-portrait.jpg";
import { Link, useMatch, useNavigate } from "@tanstack/react-router";
import { Facebook, Linkedin, Menu, Search, X, Youtube } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { site } from "@/content/data";
import { NewsletterForm } from "./Newsletter";
import logo from "@/assets/zepari-logo.png.asset.json";
import { SiteNavigation } from "./Navigation";
import { Button } from "@/components/ui/button";

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
    <Link to="/" className="flex items-center overflow-hidden rounded-xl border-0 outline-none ring-0" aria-label="ZEPARI home">
      <img src={logo.url} alt="ZEPARI — Zimbabwe Economic Policy Analysis and Research Institute" width={1083} height={251} className="h-11 w-auto md:h-12" />
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    navigate({ to: "/search", search: { q } });
  };
  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled ? "border-border bg-card shadow-card" : "border-transparent bg-card"
      }`}
    >
      <div className="container-z flex h-16 items-center justify-between gap-6">


        <Logo />
        <SiteNavigation />
        <div className="flex items-center gap-2">
          <form onSubmit={submit} role="search" className="hidden items-center rounded-full border bg-card px-3 2xl:flex">
            <Search className="h-4 w-4 text-muted-foreground" />
            <label className="sr-only" htmlFor="site-search">Search ZEPARI</label>
            <input id="site-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search research…" className="w-32 bg-transparent px-2 py-2 text-sm outline-none" />
          </form>
          <a href={site.webmail} target="_blank" rel="noopener noreferrer" className="hidden whitespace-nowrap rounded-full bg-ink px-4 py-2 text-sm font-medium text-ink-foreground transition hover:bg-primary sm:inline-flex">Webmail Login</a>
          <Button variant="ghost" size="icon" className="h-10 w-10 xl:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t bg-background xl:hidden">
          <div className="container-z space-y-1 py-4">
            <form onSubmit={submit} role="search" className="mb-3 flex items-center rounded border bg-card px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input aria-label="Search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search research…" className="w-full bg-transparent px-2 py-3 outline-none" />
            </form>
            <SiteNavigation mobile onNavigate={() => setOpen(false)} />
            <a href={site.webmail} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="block py-2 font-display text-xl text-accent">Webmail Login</a>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const isContactPage = Boolean(useMatch({ from: "/contact", shouldThrow: false }));
  return (
    <footer className={`relative bg-ink text-ink-foreground ${isContactPage ? "mt-0" : "mt-24"}`}>
      <div className="pattern-dzimbahwe absolute inset-0 opacity-60" aria-hidden />
      <div className="container-z relative grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="max-w-md text-ink-foreground/70">{site.full}. Independent, evidence-based economic policy analysis for Zimbabwe since {site.founded}.</p>
          <div className="mt-8 max-w-md">
            <p className="mb-3 font-display text-xl">The Policy Digest, monthly.</p>
            <NewsletterForm tone="dark" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-7">
          <FooterCol title="Institute" links={[["/about", "Overview"], ["/about/team", "Our Team"], ["/about/governance", "Governance"], ["/contact", "Contact"]]} />
          <FooterCol title="What We Do" links={[["/research", "Research"], ["/what-we-do/capacity-building", "Capacity Building"], ["/what-we-do/consultancy", "Consultancy"], ["/what-we-do/our-impact", "Our Impact"]]} />
          <FooterCol title="Media" links={[["/media", "Videos"], ["/media", "Photo gallery"], ["/insights", "News"], [site.webmail, "Webmail Login"]]} />
          <FooterCol title="Important Links" links={[["/important-links#government", "Government Ministries and Entities"], ["/important-links#economic", "Economic Resource"], ["/important-links#blogs", "Economists Blogs"], ["https://www.afdb.org/en/countries/southern-africa/zimbabwe/", "AfDB Zimbabwe Economic Outlook Bulletins"]]} />
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
          <li key={l}>{to.startsWith("https://") ? (
            <a href={to} target="_blank" rel="noopener noreferrer" className="text-ink-foreground/80 hover:text-gold">{l}</a>
          ) : (
            <Link to={to.split("#")[0] ?? to} {...(to.includes("#") ? { hash: to.split("#")[1] ?? "" } : {})} className="text-ink-foreground/80 hover:text-gold">{l}</Link>
          )}</li>
        ))}
      </ul>
    </div>
  );
}

export const banners = {
  dialogue: bDialogue,
  workshop: bWorkshop,
  research: bResearch,
  meeting: bMeeting,
  people: bPeople,
};

const portraitBanners = new Map([
  [bDialogue, dialoguePortrait],
  [bWorkshop, workshopPortrait],
  [bMeeting, meetingPortrait],
]);

export function PageHeader({ eyebrow, title, intro, image = banners.dialogue, children }: { eyebrow: string; title: string; intro?: string; image?: string; children?: ReactNode }) {
  const portrait = portraitBanners.get(image);
  return (
    <section className="relative overflow-hidden bg-ink text-ink-foreground">
      <picture>
        {portrait && <source media="(max-width: 639px)" srcSet={portrait} />}
        <img src={image} alt="" aria-hidden width={1920} height={768} fetchPriority="high"
          className={`absolute inset-x-0 top-0 w-full object-cover object-top sm:object-right-top lg:h-full lg:object-right ${portrait ? "page-banner-portrait h-[300px] sm:h-[320px]" : "h-full"}`} />
      </picture>
      <div className="bg-banner-overlay absolute inset-0" aria-hidden />
      <div className={`container-z relative animate-rise ${portrait ? "pb-12 pt-[220px] sm:pt-[330px] lg:py-24" : "py-16 md:py-24"}`}>
        <span className="glass-dark inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">{eyebrow}</span>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight lg:max-w-[55%] md:text-6xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg text-ink-foreground/85 lg:max-w-[55%]">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
