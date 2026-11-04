import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, banners } from "@/components/site/Layout";
import { Paginated } from "@/components/site/Pager";
import { testimonials } from "@/content/organization";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/media_/testimonials")({
  head: () => seo("Testimonials", "First-hand accounts from participants in ZEPARI’s FICAD youth empowerment and entrepreneurship programme."),
  component: Testimonials,
});

function Testimonials() {
  return (
    <>
      <PageHeader image={banners.workshop} eyebrow="Media · Testimonials" title="Testimonials" intro="Experiences from the FICAD youth empowerment and entrepreneurship programme." />
      <section className="container-z py-16 md:py-20">
        <Paginated items={testimonials} perPage={6} className="grid items-start gap-x-16 gap-y-12 md:grid-cols-2" render={(testimonial) => (
          <figure key={testimonial.slug} className="border-t-2 border-gold pt-6">
            <blockquote className="space-y-4 text-base leading-relaxed text-muted-foreground">
              {testimonial.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </blockquote>
            <figcaption className="mt-6 font-display text-xl font-semibold text-foreground">{testimonial.name}</figcaption>
          </figure>
        )} />
      </section>
    </>
  );
}