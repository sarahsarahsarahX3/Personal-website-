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

type MediaItem = {
  id: string;
  title: string;
  description?: string;
  imageSrc?: string;
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

function useModal() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return {
    open,
    activeId,
    openWith: (id: string) => {
      setActiveId(id);
      setOpen(true);
    },
    close: () => setOpen(false),
  };
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

function MetricCard({
  metric,
  isActive,
  onClick,
}: {
  metric: Metric;
  isActive?: boolean;
  onClick?: () => void;
}) {
  const base =
    "rounded-2xl border border-white/10 bg-surface-alt/10 px-6 py-6 transition-colors duration-200 hover:bg-white/5";

  const content = (
    <>
      <p className="text-3xl md:text-4xl font-display leading-none text-text-primary">{metric.value}</p>
      <p className="mt-3 text-xs font-mono uppercase tracking-widest text-text-secondary/80">{metric.label}</p>
      {metric.detail ? <p className="mt-4 text-sm text-text-secondary leading-relaxed">{metric.detail}</p> : null}
    </>
  );

  if (!onClick) return <div className={base}>{content}</div>;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        base,
        "text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
        isActive ? "bg-white/5 border-white/20" : "border-white/10",
      )}
    >
      {content}
    </button>
  );
}

function MediaGrid({
  items,
  onOpen,
  kindLabel,
}: {
  items: MediaItem[];
  kindLabel: string;
  onOpen: (id: string) => void;
}) {
  return (
    <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" aria-label={kindLabel}>
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            onClick={() => onOpen(item.id)}
            className={cn(
              "group w-full rounded-2xl border border-white/10 bg-surface-alt/10 p-4 text-left",
              "hover:bg-white/5 transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
            )}
          >
            <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-surface/40">
              {item.imageSrc ? (
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs font-mono uppercase tracking-widest text-text-secondary/70">
                  Add image
                </div>
              )}
            </div>

            <div className="mt-4">
              <p className="text-sm tracking-tight text-text-primary">{item.title}</p>
              {item.description ? <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.description}</p> : null}
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}

function Modal({
  open,
  title,
  description,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  description?: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-50 grid place-items-center px-6 py-10">
      <button type="button" aria-label="Close modal" onClick={onClose} className="absolute inset-0 bg-black/70" />
      <div className="relative w-full max-w-4xl rounded-3xl border border-white/10 bg-surface p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Preview</p>
            <h3 className="mt-2 font-display text-2xl tracking-tight">{title}</h3>
            {description ? <p className="mt-3 text-sm text-text-secondary">{description}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-surface-alt/10",
              "text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
            )}
          >
            ×
          </button>
        </div>

        <div className="mt-6">{children}</div>
      </div>
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
      { id: "strategy", label: "Strategy" },
      { id: "execution", label: "Execution" },
      { id: "articles", label: "Article Proof" },
      { id: "performance", label: "Performance" },
      { id: "tools", label: "Tools" },
    ],
    [],
  );

  const activeId = useActiveSection(tocItems.map((item) => item.id));

  const metrics: Metric[] = [
    { label: "Monthly organic users", value: "110K → 250K" },
    { label: "Organic growth", value: "+126%", detail: "In four months" },
    { label: "Average MoM organic growth", value: "17.6%" },
    { label: "New organic sessions per month", value: "139.78K+" },
    { label: "Domain authority", value: "44", detail: "4.52K backlinks, 788 referring domains" },
    { label: "Long-form articles", value: "50+" },
  ];

  const metricNotesByLabel = useMemo(
    () =>
      new Map<string, string>([
        ["Monthly organic users", "Increased monthly organic users from 110K to 250K (+126%) in four months"],
        ["Organic growth", "Increased monthly organic users from 110K to 250K (+126%) in four months"],
        ["Average MoM organic growth", "Achieved 17.6% average month-over-month organic growth"],
        ["New organic sessions per month", "Generated 139.78K+ new organic sessions per month"],
        ["Domain authority", "Raised domain authority to 44 with 4.52K backlinks and 788 referring domains"],
        ["Long-form articles", "Wrote and published 50+ long-form, consumer-facing articles"],
      ]),
    [],
  );

  const [activeMetricLabel, setActiveMetricLabel] = useState(metrics[0]?.label ?? "");

  const strategyBullets = [
    "Mapping topics to high-intent user queries and audience needs",
    "Structuring content for clarity, scannability, and discoverability",
    "Optimizing for SEO, AEO, and GEO to support traditional and generative search",
    "Embedding subject-matter expert validation into the editorial workflow",
    "Designing evergreen content built to compound in performance",
  ];

  const resultsBullets = [
    "Increased monthly organic users from 110K to 250K (+126%) in four months",
    "Achieved 17.6% average month-over-month organic growth",
    "Generated 139.78K+ new organic sessions per month",
    "Raised domain authority to 44 with 4.52K backlinks and 788 referring domains",
    "Improved rankings and visibility across high-intent, evergreen content categories",
  ];

  const tools = [
    "SEO & AEO Strategy",
    "Editorial Planning",
    "Long-Form Writing",
    "Search Intent Analysis",
    "SEMrush",
    "Google Analytics",
    "Performance Optimization",
    "Expert Collaboration",
  ];

  const onNavigate = (id: string) => scrollToId(id, prefersReducedMotion ? "auto" : "smooth");

  const jumpItems: Array<SectionLink> = useMemo(
    () => [
      { id: "results", label: "Results" },
      { id: "strategy", label: "Strategy" },
      { id: "execution", label: "Execution" },
      { id: "articles", label: "Articles" },
      { id: "performance", label: "Performance" },
      { id: "tools", label: "Tools" },
    ],
    [],
  );

  const executionBullets = [
    "Wrote and published 50+ long-form, consumer-facing articles",
    "Conducted keyword research and SERP analysis to guide topic selection",
    "Optimized headlines, content structure, internal linking, and metadata",
    "Collaborated with scientists and subject-matter experts to validate claims",
    "Refreshed existing content based on performance insights",
    "Tracked and analyzed results using SEMrush and Google Analytics",
  ];

  const articleImages: MediaItem[] = useMemo(
    () => [
      { id: "article-1", title: "Digital article screenshot 01" },
      { id: "article-2", title: "Digital article screenshot 02" },
      { id: "article-3", title: "Digital article screenshot 03" },
      { id: "article-4", title: "Digital article screenshot 04" },
      { id: "article-5", title: "Digital article screenshot 05" },
      { id: "article-6", title: "Digital article screenshot 06" },
    ],
    [],
  );

  const charts: MediaItem[] = useMemo(
    () => [
      {
        id: "chart-1",
        title: "Organic growth chart",
        description: "Replace with a chart image showing the 110K → 250K increase over four months.",
      },
      {
        id: "chart-2",
        title: "Authority and backlinks chart",
        description: "Replace with a chart image showing DA 44 and link growth.",
      },
    ],
    [],
  );

  const { open, activeId: modalActiveId, openWith, close } = useModal();
  const activeMedia = useMemo(() => {
    const all = [...articleImages, ...charts];
    return all.find((item) => item.id === modalActiveId) ?? all[0]!;
  }, [articleImages, charts, modalActiveId]);

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
              <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Procter &amp; Gamble</p>
              <h1 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.02]">
                Procter &amp; Gamble Beauty Content Hub
              </h1>
              <p className="mt-4 text-xl md:text-2xl tracking-tight text-text-secondary">
                SEO-Driven Editorial Content Program
              </p>

              <div className="mt-8 grid gap-6 max-w-3xl">
                <p className="text-base md:text-lg leading-relaxed text-text-secondary">
                  This project focused on developing and optimizing SEO-driven editorial content for Procter &amp;
                  Gamble’s consumer-facing content hub to improve organic traffic and search visibility across beauty,
                  health, and wellness topics.
                </p>
                <p className="text-base md:text-lg leading-relaxed text-text-secondary">
                  Increase monthly organic traffic and search visibility for P&amp;G Beauty’s owned content platform
                  while delivering clear, expert-validated educational content designed to perform sustainably over
                  time.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="#results" onClick={() => onNavigate("results")}>
                  View Results
                </ButtonLink>
                <ButtonLink href="#strategy" variant="secondary" onClick={() => onNavigate("strategy")}>
                  View Strategy
                </ButtonLink>
              </div>

              <div className="mt-10 flex flex-wrap gap-2 md:gap-3">
                <Chip>Role: Copywriter &amp; Content Strategist</Chip>
                <Chip>Focus: Beauty, Health, Wellness</Chip>
                <Chip>Duration: 4 months</Chip>
                <Chip>Objective: Organic traffic and visibility</Chip>
                <Chip>Tools: SEMrush, Google Analytics</Chip>
              </div>

              <MobileJumpBar items={jumpItems} onNavigate={onNavigate} />
            </section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="results" title="Results" eyebrow="Outcomes" className="mt-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {metrics.map((metric) => (
                  <MetricCard
                    key={metric.label}
                    metric={metric}
                    isActive={activeMetricLabel === metric.label}
                    onClick={() => setActiveMetricLabel(metric.label)}
                  />
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-surface-alt/10 px-6 py-6">
                <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Selected highlight</p>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">
                  {metricNotesByLabel.get(activeMetricLabel) ?? resultsBullets[0]}
                </p>
              </div>

              <div className="mt-8 grid gap-3 max-w-3xl text-sm md:text-base text-text-secondary">
                {resultsBullets.map((line) => (
                  <p key={line} className="leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>

              <SectionNav next={{ id: "strategy", label: "Strategy" }} onNavigate={onNavigate} />
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="strategy" title="Strategy" eyebrow="Approach" className="mt-16">
              <p className="max-w-3xl text-base md:text-lg leading-relaxed text-text-secondary">
                I implemented an SEO-led editorial strategy grounded in search intent, content structure, and credibility.
              </p>

              <p className="mt-6 max-w-3xl text-base md:text-lg leading-relaxed text-text-secondary">
                The approach focused on:
              </p>

              <ul className="mt-10 grid gap-3 md:grid-cols-2 text-sm md:text-base text-text-secondary">
                {strategyBullets.map((bullet) => (
                  <li key={bullet} className="rounded-xl border border-white/10 bg-surface-alt/10 px-5 py-4">
                    {bullet}
                  </li>
                ))}
              </ul>

              <SectionNav
                prev={{ id: "results", label: "Results" }}
                next={{ id: "execution", label: "Execution" }}
                onNavigate={onNavigate}
              />
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="execution" title="Execution" eyebrow="Workflow" className="mt-16">
              <ol className="relative max-w-3xl space-y-6 border-l border-white/10 pl-6">
                {executionBullets.map((step, index) => (
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
                next={{ id: "articles", label: "Article Proof" }}
                onNavigate={onNavigate}
              />
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="articles" title="Article Proof" eyebrow="Digital articles" className="mt-16">
              <p className="max-w-3xl text-sm md:text-base leading-relaxed text-text-secondary">
                Select a tile to preview.
              </p>

              <div className="mt-8">
                <MediaGrid items={articleImages} kindLabel="Digital article screenshots" onOpen={openWith} />
              </div>

              <SectionNav
                prev={{ id: "execution", label: "Execution" }}
                next={{ id: "performance", label: "Performance" }}
                onNavigate={onNavigate}
              />
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="performance" title="Performance" eyebrow="Charts" className="mt-16">
              <div className="mt-8">
                <MediaGrid items={charts} kindLabel="Performance charts" onOpen={openWith} />
              </div>

              <SectionNav prev={{ id: "articles", label: "Article Proof" }} next={{ id: "tools", label: "Tools" }} onNavigate={onNavigate} />
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="tools" title="Tools & Capabilities" eyebrow="Toolkit" className="mt-16">
              <p className="max-w-3xl text-base md:text-lg leading-relaxed text-text-secondary">
                SEO &amp; AEO Strategy · Editorial Planning · Long-Form Writing · Search Intent Analysis · SEMrush ·
                Google Analytics · Performance Optimization · Expert Collaboration
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {tools.map((tag) => (
                  <Chip key={tag}>{tag}</Chip>
                ))}
              </div>

              <SectionNav prev={{ id: "performance", label: "Performance" }} onNavigate={onNavigate} />
            </Section>
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

      <Modal open={open} title={activeMedia?.title ?? "Preview"} description={activeMedia?.description} onClose={close}>
        <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-surface-alt/10">
          {activeMedia?.imageSrc ? (
            <img src={activeMedia.imageSrc} alt={activeMedia.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs font-mono uppercase tracking-widest text-text-secondary/70">
              Add an imageSrc for this item
            </div>
          )}
        </div>
      </Modal>
    </main>
  );
}
