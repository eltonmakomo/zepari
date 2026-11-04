import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const navigation = [
  { to: "/about", label: "About", sub: [
    { to: "/about", label: "Overview" },
    { to: "/about/governance", label: "Board of Trustees" },
    { to: "/about/team", label: "Our Team" },
    { to: "/about/clients", label: "Our Clients" },
    { to: "/about/partners", label: "Partners" },
  ] },
  { to: "/research", label: "What We Do", sub: [
    { to: "/research", label: "Research" },
    { to: "/what-we-do/capacity-building", label: "Capacity Building" },
    { to: "/what-we-do/consultancy", label: "Consultancy" },
    { to: "/what-we-do/our-impact", label: "Our Impact" },
  ] },
  { to: "/publications", label: "Publications", sub: [
    { to: "/publications", search: { type: "Policy Brief" }, label: "Policy Briefs" },
    { to: "/publications", search: { type: "Research Study" }, label: "Research Studies" },
    { to: "/publications", search: { type: "Press Release" }, label: "Press Release" },
    { to: "/publications", search: { type: "Economic Barometer" }, label: "Economic Barometer" },
    { to: "/publications", search: { type: "Report" }, label: "Other" },
  ] },
  { to: "/insights", label: "Insights" },
  { to: "/policy-dialogue", label: "Policy Dialogue" },
  { to: "/media", label: "Media", sub: [
    { to: "/insights", search: { kind: "News" }, label: "News" },
    { to: "/insights", search: { kind: "Blog" }, label: "Blog" },
    { to: "/media", search: { kind: "Photo gallery" }, label: "Photo Gallery" },
    { to: "/media", search: { kind: "Video" }, label: "Video Gallery" },
    { to: "/media/testimonials", label: "Testimonials" },
  ] },
  { to: "/internships", label: "Internships" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNavigation({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) setExpanded(null);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);
  const navigate = () => { setExpanded(null); onNavigate?.(); };
  return (
    <nav ref={ref} aria-label={mobile ? "Mobile main" : "Main"}
      className={mobile ? "divide-y" : "hidden items-center gap-1 xl:flex"}
      onKeyDown={(event) => {
        if (event.key === "Escape" && expanded) {
          ref.current?.querySelector<HTMLButtonElement>(`button[aria-controls="${mobile ? "mobile" : "desktop"}-${expanded}"]`)?.focus();
          setExpanded(null);
        }
      }}>
      {navigation.map((item) => (
        <div key={item.to} className="relative"
          onMouseEnter={() => { if (!mobile && "sub" in item) setExpanded(item.label); }}
          onMouseLeave={() => { if (!mobile) setExpanded(null); }}>
          <div className={`flex items-center ${mobile ? "justify-between py-1" : ""}`}>
            <Link to={item.to} onClick={navigate} activeOptions={{ exact: false }}
              className={mobile ? "py-2 font-display text-xl" : "whitespace-nowrap px-2 py-2 text-sm font-medium text-foreground/80 transition hover:text-foreground data-[status=active]:text-accent"}>
              {item.label}
            </Link>
            {"sub" in item && (
              <Button variant="ghost" size="icon" aria-label={`${item.label} submenu`}
                aria-expanded={expanded === item.label} aria-controls={`${mobile ? "mobile" : "desktop"}-${item.label}`}
                onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                className={mobile ? "h-10 w-10 hover:bg-muted" : "h-8 w-5 hover:bg-muted"}>
                <ChevronDown className={`transition-transform ${expanded === item.label ? "rotate-180" : ""}`} />
              </Button>
            )}
          </div>
          {"sub" in item && expanded === item.label && (
            <ul id={`${mobile ? "mobile" : "desktop"}-${item.label}`}
              className={mobile ? "pb-3 pl-4" : "absolute left-0 top-full z-50 min-w-56 rounded border bg-card p-2 shadow-card"}>
              {item.sub.map((child) => (
                <li key={child.label}>
                  <Link to={child.to} search={"search" in child ? child.search : {}} onClick={navigate}
                    className="block rounded px-3 py-2.5 text-sm text-card-foreground transition hover:bg-muted focus-visible:bg-muted">
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </nav>
  );
}