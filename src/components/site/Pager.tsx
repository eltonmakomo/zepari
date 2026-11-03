import { useEffect, useState, type ReactNode } from "react";

export function Paginated<T>({ items, perPage, className, render }: { items: T[]; perPage: number; className?: string; render: (item: T) => ReactNode }) {
  const [page, setPage] = useState(1);
  const pages = Math.max(1, Math.ceil(items.length / perPage));
  useEffect(() => setPage(1), [items.length, perPage]);
  const cur = Math.min(page, pages);
  const go = (p: number) => {
    setPage(p);
    if (typeof window !== "undefined") window.scrollTo({ top: Math.max(0, (document.getElementById("pager-top")?.offsetTop ?? 0) - 100), behavior: "smooth" });
  };
  const nums = Array.from({ length: pages }, (_, i) => i + 1).filter((n) => n === 1 || n === pages || Math.abs(n - cur) <= 1);
  const btn = "min-w-10 h-10 px-3 rounded-full border text-sm font-medium transition-colors disabled:opacity-40";
  return (
    <>
      <div id="pager-top" />
      <div className={className}>{items.slice((cur - 1) * perPage, cur * perPage).map(render)}</div>
      {pages > 1 && (
        <nav aria-label="Pagination" className="mt-12 flex flex-wrap items-center justify-center gap-2">
          <button className={`${btn} hover:bg-muted`} disabled={cur === 1} onClick={() => go(cur - 1)}>← Prev</button>
          {nums.map((n, i) => (
            <span key={n} className="flex items-center gap-2">
              {i > 0 && n - (nums[i - 1] ?? n) > 1 && <span className="text-muted-foreground">…</span>}
              <button aria-current={n === cur ? "page" : undefined} className={`${btn} ${n === cur ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"}`} onClick={() => go(n)}>{n}</button>
            </span>
          ))}
          <button className={`${btn} hover:bg-muted`} disabled={cur === pages} onClick={() => go(cur + 1)}>Next →</button>
          <span className="w-full text-center text-xs text-muted-foreground mt-2">Page {cur} of {pages} · {items.length} items</span>
        </nav>
      )}
    </>
  );
}
