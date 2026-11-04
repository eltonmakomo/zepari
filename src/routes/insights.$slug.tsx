import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ThemeTags } from "@/components/site/Cards";
import { Paywall, PaywallPreview } from "@/components/site/Paywall";
import { RelatedContent, ShareBar } from "@/components/site/Share";
import { authorName, fmtDate, getArticle, getPublication } from "@/content/queries";
import { useOwns } from "@/lib/purchases";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const a = getArticle(params.slug);
    if (!a) throw notFound();
    return { a };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Insight | ZEPARI" }, { name: "robots", content: "noindex" }] };
    const { a } = loaderData;
    const h = seo(a.title, a.excerpt);
    const img = a.image?.startsWith("https://") ? [{ property: "og:image", content: a.image }, { name: "twitter:image", content: a.image }] : [];
    return { meta: [...h.meta, { property: "og:type", content: "article" }, ...img] };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { a } = Route.useLoaderData();
  const owns = useOwns(a.slug);
  const unlocked = a.access.mode === "free" || owns;
  const body = unlocked ? a.body : a.body.slice(0, 1);
  const rel = a.relatedPublication ? getPublication(a.relatedPublication) : undefined;
  return (
    <>
      <article>
        <header className="container-z max-w-4xl animate-rise pt-16 text-center">
          <Link to="/insights" search={{ kind: a.kind }} className="eyebrow">{a.kind}</Link>
          <h1 className="mt-5 text-4xl leading-[1.08] md:text-6xl">{a.title}</h1>
          <p className="mt-6 text-sm text-muted-foreground">{authorName(a.author)} · {fmtDate(a.date)}</p>
          <div className="mt-6 flex justify-center"><ShareBar title={a.title} /></div>
        </header>
        {a.image && <img src={a.image} alt="" className="container-z mt-12 aspect-[16/9] max-w-6xl object-cover" />}
        <div className="container-z max-w-3xl py-14">
          <p className="mb-8 font-display text-2xl leading-snug">{a.excerpt}</p>
          <div className="prose-z">{body.map((p, i) => <p key={i}>{p}</p>)}</div>
          {!unlocked && (a.body.length > 1 ? (
            <PaywallPreview slug={a.slug} access={a.access} kind="article">
              <div className="prose-z">{a.body.slice(1).map((p, i) => <p key={i}>{p}</p>)}</div>
            </PaywallPreview>
          ) : (
            <div className="mt-10"><Paywall slug={a.slug} access={a.access} kind="article" /></div>
          ))}
          <div className="mt-10"><ThemeTags ids={a.themes} /></div>
          {rel && (
            <Link to="/publications/$slug" params={{ slug: rel.slug }} className="mt-12 block border-l-4 border-gold bg-paper p-6 hover:bg-muted">
              <span className="eyebrow">Based on the {rel.type.toLowerCase()}</span>
              <span className="mt-2 block font-display text-xl">{rel.title}</span>
            </Link>
          )}
        </div>
      </article>
      <RelatedContent themes={a.themes} exclude={a.slug} />
    </>
  );
}
