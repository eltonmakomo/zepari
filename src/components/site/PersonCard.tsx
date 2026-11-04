import type { Person } from "@/content/types";

export function PersonCard({ p }: { p: Person }) {
  const initials = p.name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s*/, "").split(" ").map((s) => s[0]).join("").slice(0, 2);
  return (
    <article id={p.slug} className="group">
      <div className="aspect-[4/5] overflow-hidden bg-paper">
        {p.photo ? (
          <img src={p.photo} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
        ) : (
          <div className="pattern-dzimbahwe grid h-full place-items-center bg-ink font-display text-5xl text-gold">{initials}</div>
        )}
      </div>
      <h3 className="mt-4 text-xl">{p.name}</h3>
      <p className="text-sm font-medium text-accent">{p.role}</p>
      {p.affiliation && <p className="text-sm text-muted-foreground">{p.affiliation}</p>}
      <p className="mt-2 text-sm text-muted-foreground">{p.bio}</p>
    </article>
  );
}
