"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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

type SectionLink = {
  id: string;
  label: string;
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

function MobileJumpBar({
  items,
  onNavigate,
}: {
  items: Array<SectionLink>;
  onNavigate: (id: string) => void;
}) {
  return (
    <nav aria-label="Jump to section" className="mt-8 md:hidden">
      <div className="flex gap-2 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={cn(
              "shrink-0 rounded-full border border-white/10 bg-surface-alt/10 px-4 py-2",
              "text-[11px] font-mono uppercase tracking-widest text-text-secondary",
              "hover:bg-white/5 hover:text-text-primary hover:border-white/20 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
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

function SectionNav({
  prev,
  next,
  onNavigate,
}: {
  prev?: SectionLink;
  next?: SectionLink;
  onNavigate: (id: string) => void;
}) {
  if (!prev && !next) return null;

  return (
    <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
      {prev ? (
        <button
          type="button"
          onClick={() => onNavigate(prev.id)}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface-alt/10 px-4 py-2",
            "text-sm text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
          )}
        >
          <span aria-hidden="true">←</span>
          <span>{prev.label}</span>
        </button>
      ) : (
        <span />
      )}

      {next ? (
        <button
          type="button"
          onClick={() => onNavigate(next.id)}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface-alt/10 px-4 py-2",
            "text-sm text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
          )}
        >
          <span>{next.label}</span>
          <span aria-hidden="true">→</span>
        </button>
      ) : null}
    </div>
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

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-surface-alt/10 px-6 py-6 transition-colors duration-200 hover:bg-white/5">
      <p className="text-3xl md:text-4xl font-display leading-none text-text-primary">{metric.value}</p>
      <p className="mt-3 text-xs font-mono uppercase tracking-widest text-text-secondary/80">{metric.label}</p>
      {metric.detail ? <p className="mt-4 text-sm text-text-secondary leading-relaxed">{metric.detail}</p> : null}
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
      { id: "tools", label: "Tools" },
      { id: "why", label: "Why It Matters" },
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

  const strategyBullets = [
    "Map topics to high-intent search queries and user needs",
    "Structure content for clarity, scannability, and discoverability",
    "Optimise for SEO, AEO, and GEO for traditional + generative search",
    "Embed expert validation into the editorial workflow",
    "Design content to compound long-term, not spike and fade",
  ];

  const resultsBullets = [
    "Increased monthly organic users from 110K to 250K (+126%) in four months",
    "Sustained 17.6% average month-over-month growth in organic traffic",
    "Improved rankings and visibility across high-intent, evergreen content categories",
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

  const jumpItems: Array<SectionLink> = useMemo(
    () => [
      { id: "results", label: "Results" },
      { id: "challenge", label: "Challenge" },
      { id: "strategy", label: "Strategy" },
      { id: "execution", label: "Execution" },
      { id: "impact", label: "Impact" },
    ],
    [],
  );

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
                <Chip>Tools: SEMrush, Google Analytics</Chip>
              </div>

              <MobileJumpBar items={jumpItems} onNavigate={onNavigate} />
            </section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="results" title="Results" eyebrow="Most prominent" className="mt-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric) => (
                  <MetricCard key={metric.label} metric={metric} />
                ))}
              </div>

              <div className="mt-8 grid gap-3 max-w-3xl text-sm md:text-base text-text-secondary">
                {resultsBullets.map((line) => (
                  <p key={line} className="leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>

              <details className="mt-10 rounded-2xl border border-white/10 bg-surface-alt/10 px-6 py-6">
                <summary
                  className={cn(
                    "cursor-pointer list-none",
                    "text-xs font-mono uppercase tracking-widest text-text-secondary/70",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 rounded-lg",
                  )}
                >
                  Optional visuals
                </summary>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <VisualPlaceholder
                    title="Performance Chart Placeholder"
                    subtitle="Add a simple time-series visualization to show sustained growth."
                  />
                  <VisualPlaceholder
                    title="SERP Snapshot Placeholder"
                    subtitle="Add a before/after view of ranking positions for key evergreen topics."
                  />
                </div>
              </details>

              <SectionNav next={{ id: "challenge", label: "Challenge" }} onNavigate={onNavigate} />
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

              <SectionNav
                prev={{ id: "results", label: "Results" }}
                next={{ id: "strategy", label: "Strategy" }}
                onNavigate={onNavigate}
              />
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="strategy" title="Strategy" eyebrow="Approach" className="mt-16">
              <p className="max-w-3xl text-base md:text-lg leading-relaxed text-text-secondary">
                The strategy centered on credibility-first editorial execution. Each topic was mapped to a clear user
                need, structured for scannability, and validated for accuracy to build durable search performance.
              </p>

              <ul className="mt-10 grid gap-3 md:grid-cols-2 text-sm md:text-base text-text-secondary">
                {strategyBullets.map((bullet) => (
                  <li key={bullet} className="rounded-xl border border-white/10 bg-surface-alt/10 px-5 py-4">
                    {bullet}
                  </li>
                ))}
              </ul>

              <SectionNav
                prev={{ id: "challenge", label: "Challenge" }}
                next={{ id: "execution", label: "Execution" }}
                onNavigate={onNavigate}
              />
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="execution" title="Execution" eyebrow="Workflow" className="mt-16">
              <ol className="relative max-w-3xl space-y-6 border-l border-white/10 pl-6">
                {[
                  "Wrote and published 50+ long-form, consumer-facing articles",
                  "Conducted keyword research and SERP analysis to guide topic selection",
                  "Optimised headlines, content structure, internal linking, and metadata",
                  "Collaborated with scientists and subject-matter experts to validate claims",
                  "Refreshed existing content based on performance insights",
                  "Tracked results using SEMrush and Google Analytics",
                ].map((step, index) => (
                  <li key={step} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[13px] top-0 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-surface/70 text-[11px] font-mono text-text-secondary"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm md:text-base leading-relaxed text-text-secondary">{step}</p>
                  </li>
                ))}
              </ol>

              <SectionNav
                prev={{ id: "strategy", label: "Strategy" }}
                next={{ id: "impact", label: "Impact" }}
                onNavigate={onNavigate}
              />
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="impact" title="Impact" eyebrow="Outcome" className="mt-16">
              <p className="max-w-3xl text-base md:text-lg leading-relaxed text-text-secondary">
                This project demonstrated how a disciplined, credibility-first editorial strategy can drive meaningful
                growth at scale. The work supported immediate performance gains while establishing a durable content
                foundation for long-term organic visibility.
              </p>

              <SectionNav prev={{ id: "execution", label: "Execution" }} next={{ id: "tools", label: "Tools" }} onNavigate={onNavigate} />
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="tools" title="Tools and Capabilities" eyebrow="Toolkit" className="mt-16">
              <div className="flex flex-wrap gap-2">
                {tools.map((tag) => (
                  <Chip key={tag}>{tag}</Chip>
                ))}
              </div>

              <SectionNav prev={{ id: "impact", label: "Impact" }} next={{ id: "why", label: "Why It Matters" }} onNavigate={onNavigate} />
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <section id="why" aria-labelledby="why-this-matters-title" className="mt-16 scroll-mt-12 md:scroll-mt-16">
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

              <SectionNav prev={{ id: "tools", label: "Tools" }} onNavigate={onNavigate} />
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
