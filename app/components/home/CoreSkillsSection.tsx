"use client";

import { cn } from "@/app/lib/utils";
import type { CoreSkillVizId } from "@/app/components/home/CoreSkillViz";

type ValueArea = {
  id: CoreSkillVizId;
  index: string;
  title: string;
  description: string;
};

const valueAreas: ValueArea[] = [
  {
    id: "integrated-marketing-campaigns",
    index: "01",
    title: "Integrated Campaigns",
    description:
      "Develop content that supports brand growth, customer engagement, integrated campaigns, product launches, and seasonal initiatives.",
  },
  {
    id: "copywriting",
    index: "02",
    title: "Copywriting",
    description:
      "Write and optimize conversion-focused copy across digital channels, aligning messaging with brand strategy, audience intent, and campaign objectives.",
  },
  {
    id: "editorial-governance",
    index: "03",
    title: "Editorial Leadership",
    description:
      "Define editorial standards and steward brand voice to ensure consistency, quality, and clarity at scale.",
  },
  {
    id: "seo-aeo",
    index: "04",
    title: "SEO + AEO Strategy",
    description:
      "Develop and optimize content strategies that improve discoverability, search visibility, and audience growth across traditional and AI-driven search.",
  },
  {
    id: "performance-marketing",
    index: "05",
    title: "Performance Marketing",
    description:
      "Apply data and performance insights to optimize content, campaigns, and messaging for engagement, conversion, and measurable results.",
  },
  {
    id: "brand-storytelling",
    index: "06",
    title: "Brand Storytelling",
    description:
      "Craft clear, compelling narratives that connect brand, audience, and purpose across marketing touchpoints.",
  },
  {
    id: "cross-functional-collaboration",
    index: "07",
    title: "Cross-Functional Collaboration",
    description: "Partner across marketing, design, product, and education teams to deliver content at scale.",
  },
];

export function CoreSkillsSection() {
  return (
    <section aria-labelledby="where-i-create-value-title" className="py-24 md:py-32 lg:py-36">
      <div className="mx-auto w-full max-w-6xl px-6">
        <header className="flex items-baseline justify-between gap-6">
          <h2
            id="where-i-create-value-title"
            className="w-full font-display text-3xl md:text-4xl tracking-tight text-center md:text-left text-text-secondary/80"
          >
            Where I Create Value
          </h2>
        </header>

        <ul aria-label="Core skills" className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {valueAreas.map((area) => (
            <li key={area.id} className="group">
              <div
                className={cn(
                  "relative h-full min-h-[140px] overflow-hidden rounded-2xl border border-white/10 bg-surface-alt/10 p-6",
                  "transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06]",
                )}
              >
                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                    "bg-[radial-gradient(65%_65%_at_50%_35%,rgba(255,255,255,0.08),rgba(0,0,0,0))]",
                  )}
                />
                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/10 blur-2xl",
                    "opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                  )}
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="font-mono text-xs tracking-widest text-accent/90">{area.index}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-text-secondary/60">Core skill</div>
                </div>

                <h3 className="relative mt-5 font-display text-lg md:text-xl leading-snug tracking-tight text-text-primary">
                  {area.title}
                </h3>

                <div aria-hidden="true" className="relative mt-6 h-px w-full bg-gradient-to-r from-white/15 via-white/5 to-transparent" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
