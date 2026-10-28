// Purchase entitlements — DEMO adapter.
// In production this module is replaced by server calls: checkout creates an order,
// a verified payment-gateway webhook marks it paid, and protected files are served
// only through short-lived signed URLs from private storage after an ownership check.
import { useEffect, useState } from "react";

const KEY = "zepari-demo-purchases";

export interface Purchase {
  slug: string;
  kind: "publication" | "article";
  tier: string;
  amountUSD: number;
  method: string;
  email: string;
  ref: string;
  date: string;
}

function read(): Purchase[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function recordPurchase(p: Purchase) {
  localStorage.setItem(KEY, JSON.stringify([...read().filter((x) => x.slug !== p.slug), p]));
  window.dispatchEvent(new Event("zepari-purchases"));
}

export function usePurchases() {
  const [list, setList] = useState<Purchase[]>([]);
  useEffect(() => {
    const sync = () => setList(read());
    sync();
    window.addEventListener("zepari-purchases", sync);
    return () => window.removeEventListener("zepari-purchases", sync);
  }, []);
  return list;
}

export function useOwns(slug: string) {
  return usePurchases().some((p) => p.slug === slug);
}
