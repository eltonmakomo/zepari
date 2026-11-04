import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { PageHeader, banners } from "@/components/site/Layout";
import { Eyebrow, ContactBand, tints } from "@/components/site/WhatWeDo";
import { internships } from "@/content/whatWeDo";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/internships")({
  head: () => seo("Internships", "ZEPARI engages recently qualified MSc in Economics graduates for a six-month internship in economic policy research and analysis."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader image={banners.people} eyebrow="Internships" title="Internships" />

      <section className="container-z py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>The programme</Eyebrow>
            <GraduationCap className="h-12 w-12 text-gold" />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground md:col-span-8">
            {internships.intro.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-tint-1/50">
        <div className="container-z py-16 md:py-20">
          <Eyebrow>Entry requirements</Eyebrow>
          <p className="mb-10 max-w-3xl text-lg text-muted-foreground">{internships.requirementsLead}</p>
          <ul className="grid gap-4 sm:grid-cols-3">
            {internships.requirements.map((item, i) => (
              <li key={item} className={`${tints[i % tints.length]} flex min-h-36 flex-col justify-between gap-6 border border-border/60 p-6`}>
                <span className="font-display text-3xl text-accent/70">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg font-medium leading-snug">
                  {i === 1 ? (
                    <>
                      Have research interests that align with{" "}
                      <Link to="/research" className="underline decoration-accent/50 underline-offset-4 transition hover:text-accent">
                        ZEPARI thematic areas
                      </Link>
                    </>
                  ) : (
                    item
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-z py-16 md:py-20">
        <Eyebrow>{internships.internsHeading}</Eyebrow>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Intern profiles are published here as each intake joins the programme.
        </p>
      </section>

      <ContactBand text={internships.contactLead} emails={internships.emails} />
    </>
  );
}
