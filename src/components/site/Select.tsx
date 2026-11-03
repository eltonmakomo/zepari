import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

/** Native select with a roomy custom chevron instead of the browser's edge-hugging arrow. */
export function Select({ className = "", children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select className={`w-full appearance-none border bg-card pr-9 ${className}`} {...props}>
        {children}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}
