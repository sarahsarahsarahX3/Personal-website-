"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/app/lib/utils";

type TocItem = {
  id: string;
  label: string;
};

type Metric = {
  label: string;
  value: string;
  detail?: string;
};

type Pillar = {
  title: string;
  description: string;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mediaQuery) return;
    const update = () => setReduced(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    if (!ids.length) return;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0));
        if (!visible.length) return;
        const id = (visible[0]?.target as HTMLElement | undefined)?.id;
        if (id) setActiveId(id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 0.1, 0.25] },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

function scrollToId(id: string, behavior: ScrollBehavior) {
  const node = document.getElementById(id);
  if (!node) return;
  node.scrollIntoView({ behavior, block: "start" });
}

function Section({
  id,
  title,
  eyebrow,
  children,
  className,
}: {
  id: string;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-12 md:scroll-mt-16", className)} aria-labelledby={`${id}-title`}>
      <header className="max-w-3xl">
        {eyebrow ? (
          <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">{eyebrow}</p>
        ) : null}
        <h2
          id={`${id}-title`}
          className="mt-3 font-display text-3xl md:text-4xl tracking-tight text-text-primary"
        >
          {title}
        </h2>
      </header>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-surface-alt/10 px-3 py-1 text-[11px] uppercase tracking-widest text-text-secondary">
      {children}
    </span>
  );
}

function ButtonLink({
  href,
  variant = "primary",
  children,
  onClick,
}: {
  href: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm uppercase tracking-widest font-mono transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40";
  const styles =
    variant === "primary"
      ? "bg-text-primary text-surface hover:bg-white"
      : "border border-white/10 bg-transparent text-text-secondary hover:border-white/20 hover:text-text-primary hover:bg-white/5";
  return (
    <a href={href} onClick={onClick} className={cn(base, styles)}>
      {children}
    </a>
  );
}

function StatGrid({
  items,
  className,
}: {
  items: Array<{ label: string; value: string; hint?: string }>;
  className?: string;
}) {
  return (
    <dl className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl border border-white/10 bg-surface-alt/10 px-6 py-6">
          <dt className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">{item.label}</dt>
          <dd className="mt-3 text-lg md:text-xl text-text-primary leading-snug">{item.value}</dd>
          {item.hint ? <p className="mt-3 text-sm text-text-secondary">{item.hint}</p> : null}
        </div>
      ))}
    </dl>
  );
}

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-surface-alt/10 px-6 py-6 transition-colors duration-200 hover:bg-white/5">
      <p className="text-3xl md:text-4xl font-display leading-none text-text-primary">{metric.value}</p>
      <p className="mt-3 text-xs font-mono uppercase tracking-widest text-text-secondary/80">{metric.label}</p>
      {metric.detail ? <p className="mt-4 text-sm text-text-secondary leading-relaxed">{metric.detail}</p> : null}
    </div>
  );
}

function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-surface-alt/10 px-6 py-6 transition-colors duration-200 hover:bg-white/5">
      <h3 className="font-display text-xl tracking-tight text-text-primary">{pillar.title}</h3>
      <p className="mt-3 text-sm md:text-base leading-relaxed text-text-secondary">{pillar.description}</p>
    </div>
  );
}

function VisualPlaceholder({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 bg-surface-alt/5 px-6 py-10">
      <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Placeholder</p>
      <p className="mt-3 font-display text-xl tracking-tight text-text-primary">{title}</p>
      {subtitle ? <p className="mt-3 text-sm text-text-secondary">{subtitle}</p> : null}
      <div className="mt-8 h-40 w-full rounded-xl border border-white/10 bg-surface/40" />
    </div>
  );
}

function TOC({
  items,
  activeId,
  onNavigate,
}: {
  items: TocItem[];
  activeId: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <nav aria-label="On this page" className="hidden lg:block sticky top-12 self-start">
      <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">On this page</p>
      <ul className="mt-4 space-y-2">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "w-full text-left rounded-lg px-3 py-2 transition-colors duration-200",
                  "border border-transparent hover:bg-white/5 hover:border-white/10",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                  isActive ? "bg-white/5 border-white/10 text-text-primary" : "text-text-secondary",
                )}
              >
                <span className="text-sm tracking-tight">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function PAndGBeautyContentHubProjectPage() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const tocItems: TocItem[] = useMemo(
    () => [
      { id: "hero", label: "Hero" },
      { id: "results", label: "Results" },
      { id: "challenge", label: "Challenge" },
      { id: "strategy", label: "Strategy" },
      { id: "execution", label: "Execution" },
      { id: "impact", label: "Impact" },
    ],
    [],
  );

  const activeId = useActiveSection(tocItems.map((item) => item.id));

  const metrics: Metric[] = [
    { label: "Monthly organic users", value: "110K → 250K" },
    { label: "Organic growth", value: "+126%", detail: "In four months" },
    { label: "Average MoM growth", value: "17.6%" },
    { label: "Long-form articles published", value: "50+" },
  ];

  const pillars: Pillar[] = [
    {
      title: "Search intent mapping",
      description: "Map topics to high-intent search queries and user needs to earn visibility where it matters.",
    },
    {
      title: "Editorial clarity",
      description: "Structure content for clarity, scannability, and discoverability across competitive categories.",
    },
    {
      title: "SEO, AEO, and GEO",
      description: "Optimise for traditional and generative search, including AI-driven discovery surfaces.",
    },
    {
      title: "Expert validation",
      description: "Embed expert validation into the editorial workflow to protect credibility and compliance.",
    },
    {
      title: "Compounding value",
      description: "Design content to compound long-term, not spike and fade, through durable evergreen coverage.",
    },
  ];

  const tools = [
    "SEO & AEO Strategy",
    "Editorial Planning",
    "Long-Form Writing",
    "Search Intent Analysis",
    "SEMrush",
    "Google Analytics",
    "Performance Optimisation",
    "Expert Collaboration",
    "Content Refresh Strategy",
  ];

  const onNavigate = (id: string) => scrollToId(id, prefersReducedMotion ? "auto" : "smooth");

  return (
    <main className="min-h-screen bg-surface text-text-primary">
      <div className="mx-auto w-full max-w-6xl px-6 pt-14 md:pt-20 pb-28 md:pb-40">
        <header className="flex items-center justify-between">
          <Link
            href="/work"
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface-alt/10 px-4 py-2",
              "text-sm text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
            )}
          >
            <span aria-hidden="true">←</span>
            <span>Back to Projects</span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <Chip>SEO &amp; AEO</Chip>
            <Chip>Content Strategy</Chip>
            <Chip>Copywriting</Chip>
            <Chip>Brand Storytelling</Chip>
          </div>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_260px]">
          <div className="min-w-0">
            <section id="hero" className="scroll-mt-12 md:scroll-mt-16">
              <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">
                Procter &amp; Gamble Beauty
              </p>
              <h1 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.02]">
                Procter &amp; Gamble Beauty Content Hub
              </h1>
              <p className="mt-4 text-xl md:text-2xl tracking-tight text-text-secondary">
                SEO-Led Editorial Growth Program
              </p>

              <p className="mt-8 max-w-3xl text-base md:text-lg leading-relaxed text-text-secondary">
                Procter &amp; Gamble Beauty engaged me to support its consumer-facing content hub with SEO-driven
                editorial content focused on beauty, health, and wellness education. The mandate was to increase
                organic visibility in competitive search categories while maintaining scientific accuracy, brand
                credibility, and long-term content value.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="#results" onClick={() => onNavigate("results")}>
                  View Results
                </ButtonLink>
                <ButtonLink href="#strategy" variant="secondary" onClick={() => onNavigate("strategy")}>
                  View Strategy
                </ButtonLink>
              </div>

              <div className="mt-10 flex flex-wrap gap-2 md:gap-3">
                <Chip>Role: Editorial Copywriter &amp; SEO Content Strategist</Chip>
                <Chip>Focus: Beauty, Health, Wellness</Chip>
                <Chip>Duration: 4 months</Chip>
                <Chip>Primary Goal: Organic visibility</Chip>
              </div>
            </section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="at-a-glance" title="At a Glance" eyebrow="Snapshot" className="mt-16">
              <StatGrid
                items={[
                  { label: "Role", value: "Editorial Copywriter & SEO Content Strategist (Contract)" },
                  { label: "Focus", value: "SEO-driven editorial content for beauty, health, and wellness education" },
                  { label: "Primary Goal", value: "Increase organic visibility in competitive search categories" },
                  { label: "Duration", value: "4 months" },
                ]}
              />

              <div className="mt-8 rounded-2xl border border-white/10 bg-surface-alt/10 px-6 py-6">
                <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Tools Used</p>
                <p className="mt-3 text-sm md:text-base text-text-secondary leading-relaxed">
                  SEMrush and Google Analytics.
                </p>
              </div>
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="results" title="Results" eyebrow="Most prominent" className="mt-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric) => (
                  <MetricCard key={metric.label} metric={metric} />
                ))}
              </div>

              <p className="mt-8 max-w-3xl text-base md:text-lg leading-relaxed text-text-secondary">
                Increased monthly organic users from 110K to 250K (+126%) in four months, with sustained 17.6% average
                month-over-month growth in organic traffic and improved rankings across high-intent evergreen content
                categories.
              </p>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                <VisualPlaceholder
                  title="Performance Chart Placeholder"
                  subtitle="Add a simple time-series visualization to show sustained growth."
                />
                <VisualPlaceholder
                  title="SERP Snapshot Placeholder"
                  subtitle="Add a before/after view of ranking positions for key evergreen topics."
                />
              </div>
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="challenge" title="The Challenge" eyebrow="Context" className="mt-16">
              <p className="max-w-3xl text-base md:text-lg leading-relaxed text-text-secondary">
                The content hub operated in highly saturated search spaces where generic optimisation would not
                succeed. Growth required a strategy that balanced performance, clarity, and trust, particularly for
                science-adjacent beauty and wellness topics.
              </p>

              <ul className="mt-8 grid gap-3 max-w-3xl text-sm md:text-base text-text-secondary">
                <li className="rounded-xl border border-white/10 bg-surface-alt/10 px-5 py-4">
                  Increasing organic traffic without relying on short-term tactics
                </li>
                <li className="rounded-xl border border-white/10 bg-surface-alt/10 px-5 py-4">
                  Competing against established publishers and retail platforms
                </li>
                <li className="rounded-xl border border-white/10 bg-surface-alt/10 px-5 py-4">
                  Translating complex product science into accessible consumer language
                </li>
                <li className="rounded-xl border border-white/10 bg-surface-alt/10 px-5 py-4">
                  Ensuring expert validation and compliance across all published content
                </li>
              </ul>
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="strategy" title="Strategy" eyebrow="Approach" className="mt-16">
              <p className="max-w-3xl text-base md:text-lg leading-relaxed text-text-secondary">
                The strategy centered on credibility-first editorial execution. Each topic was mapped to a clear user
                need, structured for scannability, and validated for accuracy to build durable search performance.
              </p>

              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {pillars.map((pillar) => (
                  <PillarCard key={pillar.title} pillar={pillar} />
                ))}
              </div>
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="execution" title="Execution" eyebrow="Workflow" className="mt-16">
              <ol className="grid gap-4 max-w-3xl">
                {[
                  "Wrote and published 50+ long-form, consumer-facing articles",
                  "Conducted keyword research and SERP analysis to guide topic selection",
                  "Optimised headlines, content structure, internal linking, and metadata",
                  "Collaborated with scientists and subject-matter experts to validate claims",
                  "Refreshed existing content based on performance insights",
                  "Tracked results using SEMrush and Google Analytics",
                ].map((step, index) => (
                  <li
                    key={step}
                    className="relative rounded-2xl border border-white/10 bg-surface-alt/10 px-6 py-5"
                  >
                    <div className="flex items-start gap-4">
                      <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-surface/40 text-xs font-mono text-text-secondary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm md:text-base leading-relaxed text-text-secondary">{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="impact" title="Impact" eyebrow="Outcome" className="mt-16">
              <p className="max-w-3xl text-base md:text-lg leading-relaxed text-text-secondary">
                This project demonstrated how a disciplined, credibility-first editorial strategy can drive meaningful
                growth at scale. The work supported immediate performance gains while establishing a durable content
                foundation for long-term organic visibility.
              </p>
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="tools" title="Tools and Capabilities" eyebrow="Toolkit" className="mt-16">
              <div className="flex flex-wrap gap-2">
                {tools.map((tag) => (
                  <Chip key={tag}>{tag}</Chip>
                ))}
              </div>
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <section aria-labelledby="why-this-matters-title" className="mt-16">
              <div className="rounded-2xl border border-white/10 bg-surface-alt/10 px-6 py-8">
                <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">
                  Why This Project Matters
                </p>
                <h2 id="why-this-matters-title" className="mt-3 font-display text-2xl md:text-3xl tracking-tight">
                  Editorial judgement plus growth strategy
                </h2>
                <p className="mt-5 max-w-3xl text-base md:text-lg leading-relaxed text-text-secondary">
                  This case study highlights my ability to combine editorial judgement, growth strategy, and
                  performance analysis to deliver measurable business impact for a Fortune-level brand.
                </p>
              </div>
            </section>

            <footer className="mt-16">
              <div className="rounded-3xl border border-white/10 bg-surface-alt/10 px-6 py-8 transition-colors duration-200 hover:bg-white/5">
                <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Next Project</p>
                <p className="mt-3 font-display text-2xl tracking-tight">Next project placeholder</p>
                <p className="mt-3 text-sm text-text-secondary">
                  Add a curated next step to keep recruiters moving through your work.
                </p>
              </div>
            </footer>
          </div>

          <div className="min-w-0">
            <TOC items={tocItems} activeId={activeId} onNavigate={onNavigate} />
          </div>
        </div>
      </div>

      <a
        href="#hero"
        onClick={(event) => {
          event.preventDefault();
          scrollToId("hero", prefersReducedMotion ? "auto" : "smooth");
        }}
        className={cn(
          "fixed bottom-24 right-6 hidden md:inline-flex items-center justify-center",
          "h-10 w-10 rounded-full border border-white/10 bg-surface/70 backdrop-blur-md",
          "text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-surface/80 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
        )}
        aria-label="Back to top"
      >
        ↑
      </a>
    </main>
  );
}

