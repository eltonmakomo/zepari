import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const querySchema = z.object({
  u: z.string().url(),
  name: z.string().max(200).optional(),
});

const ALLOWED_HOST = "zepari.co.zw";
const ALLOWED_PREFIX = "/sites/default/files/";

function safeFilename(url: URL, fallbackName?: string): string {
  const fromUrl = decodeURIComponent(url.pathname.split("/").pop() ?? "");
  const base = (fallbackName || fromUrl || "document.pdf").replace(/\.pdf$/i, "");
  return `${base.replace(/[^\w .()-]+/g, "-").replace(/\s+/g, " ").trim() || "document"}.pdf`;
}

export const Route = createFileRoute("/api/public/download")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const parsed = querySchema.safeParse(Object.fromEntries(url.searchParams));
        if (!parsed.success) return new Response("Invalid request", { status: 400 });

        let target: URL;
        try {
          target = new URL(parsed.data.u);
        } catch {
          return new Response("Invalid request", { status: 400 });
        }
        // Only proxy public documents hosted on the live site.
        if (target.protocol !== "https:" || target.hostname !== ALLOWED_HOST || !target.pathname.startsWith(ALLOWED_PREFIX)) {
          return new Response("Not found", { status: 404 });
        }

        const upstream = await fetch(target.toString(), { redirect: "follow" });
        if (!upstream.ok || !upstream.body) {
          return new Response("Document unavailable", { status: 502 });
        }

        const filename = safeFilename(target, parsed.data.name);
        return new Response(upstream.body, {
          status: 200,
          headers: {
            "Content-Type": upstream.headers.get("content-type") ?? "application/pdf",
            "Content-Disposition": `attachment; filename="${filename.replace(/"/g, "")}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
            "Content-Length": upstream.headers.get("content-length") ?? "",
            "Cache-Control": "public, max-age=86400",
          },
        });
      },
    },
  },
});
