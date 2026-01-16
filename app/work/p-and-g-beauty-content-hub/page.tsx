"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/app/lib/utils";

type SectionLink = { id: string; label: string };

type MediaItem = {
  id: string;
  title: string;
  imageSrc?: string;
};

type PdfItem = {
  id: string;
  title: string;
  fileName?: string;
  href?: string;
};

type Metric = {
  id: string;
  value: string;
  category: string;
  listTitle: string;
  stat: string;
  description: string;
};

const project = {
  title: "Procter & Gamble Beauty Content Hub",
  subtitle: "Content Strategy and Growth Marketing",
  overview:
    "This project focused on developing and optimizing SEO-driven editorial content for Procter & Gamble’s consumer-facing content hub to improve organic traffic and search visibility across beauty, health, and wellness topics.",
  role: "Copywriter & Content Strategist",
  objective:
    "Increase monthly organic traffic and search visibility for P&G Beauty’s owned content platform while delivering clear, expert-validated educational content designed to perform sustainably over time.",
  strategyIntro:
    "Implement an SEO-driven editorial strategy grounded in search intent, content structure, and credibility. The approach focused on:",
  strategyBullets: [
    "Mapping topics to high-intent user queries and audience needs.",
    "Structuring content for clarity, scannability, and discoverability.",
    "Optimizing for SEO, AEO, and GEO to support traditional and generative search.",
    "Embedding subject-matter expert validation into the editorial workflow.",
    "Designing evergreen content built to compound in performance.",
  ],
  executionBullets: [
    "Wrote and published 50+ long-form, consumer-facing articles.",
    "Conducted keyword research and SERP analysis to guide topic selection.",
    "Optimized headlines, content structure, internal linking, and metadata.",
    "Collaborated with scientists and subject-matter experts to validate claims.",
    "Refreshed existing content based on performance insights.",
    "Tracked and analyzed results using SEMrush and Google Analytics.",
  ],
  tools: [
    "SEO & AEO Strategy",
    "Editorial Planning",
    "Long-Form Writing",
    "Search Intent Analysis",
    "SEMrush",
    "Google Analytics",
    "Performance Optimization",
    "Expert Collaboration",
  ],
} as const;

const metrics: Metric[] = [
  {
    id: "growth-rate",
    category: "Growth Rate",
    value: "+126%",
    listTitle: "+126% Organic Growth",
    stat: "Organic Growth in 4 Months",
    description: "Increased monthly organic traffic from ~110K to 250K in four months.",
  },
  {
    id: "search-footprint",
    category: "Search Footprint",
    value: "47K",
    listTitle: "47K Organic Keywords Ranked",
    stat: "Organic Keywords Ranked",
    description: "Expanded keyword footprint across high-intent beauty and wellness topics.",
  },
  {
    id: "domain-authority",
    category: "Domain Authority",
    value: "44",
    listTitle: "Domain Authority: 44",
    stat: "Authority Score 44 · 947 Referring Domains",
    description: "Established strong domain authority and earned editorial backlinks in competitive categories.",
  },
  {
    id: "organic-media-value",
    category: "Organic Media Value",
    value: "$72K+",
    listTitle: "$72K+ Est. Traffic Value",
    stat: "Estimated Monthly Traffic Value",
    description: "Estimated organic traffic value based on equivalent paid media cost.",
  },
  {
    id: "content-engagement",
    category: "Content Engagement",
    value: "5:48",
    listTitle: "5:48 Avg Visit Duration",
    stat: "Average Visit Duration",
    description: "Demonstrated strong engagement with long-form, educational content.",
  },
  {
    id: "ai-search-visibility",
    category: "AI Search Visibility",
    value: "984",
    listTitle: "984 AI Mentions & 738 AI-Cited Pages",
    stat: "AI Mentions · 738 AI-Cited Pages",
    description: "Content referenced across AI-powered search experiences and cited in AI-generated results.",
  },
];

const sectionLinks: SectionLink[] = [
  { id: "overview", label: "Objective" },
  { id: "strategy", label: "Strategy" },
  { id: "execution", label: "Execution" },
  { id: "results", label: "Results" },
  { id: "tools", label: "Tools" },
];

const articlePdfs: PdfItem[] = [
  {
    id: "pdf-oily-hair",
    title: "Understanding and Managing Oily Hair and Scalp: Tips, Causes, and Remedies",
    fileName: "Understanding and Managing Oily Hair and Scalp: Tips, Causes, and Remedies - HairCode.pdf",
  },
  { id: "pdf-low-porosity", title: "The Best Products for Low Porosity Hair", fileName: "The Best Products for Low Porosity Hair.pdf" },
  {
    id: "pdf-curly-hair",
    title: "Ultimate Guide: How to Care for Curly Hair",
    fileName: "Ultimate Guide: How to Care for Curly Hair - HairCode.pdf",
  },
  {
    id: "pdf-deep-conditioning",
    title: "Deep Conditioning 101: How to help Repair and Care for Bleached Hair",
    fileName: "Deep Conditioning 101: How to help Repair and Care for Bleached Hair.pdf",
  },
  {
    id: "pdf-scalp-detox",
    title: "Hair or Scalp Detox? How to Detox Hair Based on Your Scalp Concerns",
    fileName: "Hair or Scalp Detox? How to Detox Hair Based on Your Scalp Concerns.pdf",
  },
  {
    id: "pdf-exfoliate-scalp",
    title: "How to Exfoliate Your Scalp: The Secret to Healthy Looking Hair",
    fileName: "How to Exfoliate Your Scalp: The Secret to Healthy Looking Hair.pdf",
  },
  {
    id: "pdf-keratin-treatment-hype",
    title: "What Does a Keratin Treatment Do and Is It Worth the Hype?",
    fileName: "What Does a Keratin Treatment Do and Is It Worth the Hype?.pdf",
  },
  {
    id: "pdf-hair-mask",
    title: "How to Do a Hair Mask: A Step-by-Step Guide",
    fileName: "How to Do a Hair Mask: A Step-by-Step Guide.pdf",
  },
  {
    id: "pdf-keratin-curly-hair",
    title: "What Does Keratin Do for Curly Hair? The Truth Behind the Treatment",
    fileName: "What Does Keratin Do for Curly Hair? The Truth Behind the Treatment.pdf",
  },
  {
    id: "pdf-silk-press",
    title: "The Silk Press Survival Guide: How to Maintain a Silk Press",
    fileName: "The Silk Press Survival Guide: How to Maintain a Silk Press.pdf",
  },
  {
    id: "pdf-90s-haircuts",
    title: "The Evolution of ‘90s Haircut Styles From Grunge to Glam",
    fileName: "The Evolution of ‘90s Haircut Styles From Grunge to Glam.pdf",
  },
];

const chartMedia: MediaItem[] = [
  { id: "c1", title: "Performance chart 01" },
  { id: "c2", title: "Performance chart 02" },
];

function getPdfHref(item: PdfItem) {
  return item.href ?? (item.fileName ? `/images/${encodeURIComponent(item.fileName)}` : undefined);
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      setProgress(Math.max(0, Math.min(1, scrollTop / max)));
    };

    const onScroll = () => {
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return progress;
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
        const id = (visible[0]?.target as HTMLElement | undefined)?.id;
        if (id) setActiveId(id);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: [0, 0.1, 0.25] },
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

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-surface-alt/10",
        "px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-text-secondary",
        "text-center leading-snug whitespace-normal",
        "sm:w-auto sm:justify-start sm:px-3 sm:py-1 sm:text-[11px] sm:tracking-widest sm:leading-normal sm:text-left",
      )}
    >
      {children}
    </span>
  );
}

function SquiggleMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 10"
      className={cn("h-2.5 w-5 shrink-0 text-accent/90", className)}
    >
      <path
        d="M1 6 C4 1 8 9 12 4 C16 -1 20 9 23 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Section({
  id,
  title,
  children,
  contentClassName,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  contentClassName?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-16 pt-10">
      <header className="max-w-3xl">
        <h2
          id={`${id}-title`}
          className="font-display text-3xl md:text-2xl tracking-tight text-text-secondary/85"
        >
          {title}
        </h2>
      </header>
      <div className={cn("mt-8", contentClassName)}>{children}</div>
    </section>
  );
}

function MobileJumpBar({
  items,
  activeId,
  progress,
  onNavigate,
}: {
  items: SectionLink[];
  activeId: string;
  progress: number;
  onNavigate: (id: string) => void;
}) {
  return (
    <nav
      aria-label="Jump to section"
      className={cn(
        "md:hidden sticky top-0 z-20",
        "bg-surface/85 backdrop-blur-md border-b border-white/10",
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-3">
        <div className="flex items-center gap-3">
          <p className="shrink-0 text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">
            On this page
          </p>

          <div className="relative min-w-0 flex-1">
            <select
              value={activeId}
              onChange={(event) => onNavigate(event.target.value)}
              className={cn(
                "w-full appearance-none rounded-full border border-white/10 bg-surface-alt/10 px-4 py-2 pr-10",
                "text-[11px] font-mono uppercase tracking-widest text-text-primary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
              )}
              aria-label="Select section"
            >
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary"
            >
              ▾
            </span>
          </div>

          <p className="shrink-0 text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">
            {Math.round(progress * 100)}%
          </p>
        </div>

        <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden" aria-hidden="true">
          <div className="h-full bg-accent/60" style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
      </div>
    </nav>
  );
}

function DesktopRail({
  items,
  activeId,
  progress,
  onNavigate,
}: {
  items: SectionLink[];
  activeId: string;
  progress: number;
  onNavigate: (id: string) => void;
}) {
  return (
    <aside className="hidden lg:block sticky top-14 self-start">
      <div className="grid gap-3">
        <div className="rounded-2xl border border-white/10 bg-surface-alt/10 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">On this page</p>
            <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/60">
              {Math.round(progress * 100)}%
            </p>
          </div>

          <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-accent/60" style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>

          <ul className="mt-4 space-y-1.5">
            {items.map((item) => {
              const isActive = item.id === activeId;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    className={cn(
                      "w-full rounded-lg px-3 py-2 text-left transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                      isActive
                        ? "bg-white/5 border border-white/15 text-text-primary"
                        : "border border-transparent text-text-secondary hover:text-text-primary hover:bg-white/5 hover:border-white/10",
                    )}
                  >
                    <span className="text-sm tracking-tight">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div
          key={activeId}
          className={cn("rounded-2xl border border-white/10 bg-surface-alt/10 p-4", "transition-opacity duration-300")}
        >
          <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Overview</p>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">{project.overview}</p>
        </div>
      </div>
    </aside>
  );
}

function MetricTabs({
  metrics,
  charts,
  onOpenChart,
}: {
  metrics: Metric[];
  charts: MediaItem[];
  onOpenChart: (id: string) => void;
}) {
  const [active, setActive] = useState(metrics[0]?.id ?? "");
  const activeMetric = metrics.find((m) => m.id === active) ?? metrics[0]!;

  return (
    <>
      <div className="grid gap-3 lg:hidden">
        {metrics.map((metric) => {
          const isOpen = metric.id === active;
          return (
            <div
              key={metric.id}
              className={cn(
                "rounded-2xl border border-white/10 bg-surface-alt/10 overflow-hidden",
                "transition-colors",
                isOpen ? "bg-white/5 border-white/20" : "bg-surface-alt/10",
              )}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`metric-accordion-panel-${metric.id}`}
                onClick={() => setActive(metric.id)}
                className={cn(
                  "w-full px-5 py-4 text-left",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-lg leading-snug text-text-primary line-clamp-2">
                      {metric.listTitle}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-surface/40 text-text-secondary transition-transform duration-200",
                      isOpen ? "rotate-180" : "rotate-0",
                    )}
                  >
                    ▾
                  </span>
                </div>
              </button>

              <div
                id={`metric-accordion-panel-${metric.id}`}
                aria-hidden={!isOpen}
                className={cn(
                  "overflow-hidden",
                  "transition-[max-height,opacity,transform] duration-300",
                  isOpen
                    ? "max-h-[999px] opacity-100 translate-y-0"
                    : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
                )}
              >
                <div className="px-5 pb-5">
                <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Highlight</p>
                <p className="mt-3 text-sm font-mono uppercase tracking-widest text-text-secondary/70">
                  {metric.stat}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{metric.description}</p>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {charts.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => onOpenChart(item.id)}
                        className={cn(
                          "group overflow-hidden rounded-2xl border border-white/10 bg-surface/40 text-left",
                          "hover:border-white/20 hover:bg-white/5 transition-colors",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                        )}
                      >
                        <div className="aspect-[16/10] bg-surface/40">
                          {item.imageSrc ? (
                            <img
                              src={item.imageSrc}
                              alt={item.title}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center px-4 text-center text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">
                              Add chart
                            </div>
                          )}
                        </div>
                        <div className="px-4 py-3">
                          <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">{item.title}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hidden lg:grid gap-6 lg:grid-cols-[320px_1fr]">
        <div>
          <div role="tablist" aria-label="Result metrics" className="grid gap-2">
            {metrics.map((metric) => {
              const selected = metric.id === active;
              return (
                <button
                  key={metric.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`metric-panel-${metric.id}`}
                  id={`metric-tab-${metric.id}`}
                  onClick={() => setActive(metric.id)}
                  className={cn(
                    "rounded-2xl border bg-surface-alt/10 px-5 py-4 text-left transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                    selected
                      ? "border-white/25 bg-white/5"
                      : "border-white/10 hover:bg-white/5 hover:border-white/20",
                  )}
                >
                  <p className="font-display text-lg leading-snug text-text-primary line-clamp-2">
                    {metric.listTitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div
          role="tabpanel"
          id={`metric-panel-${activeMetric.id}`}
          aria-labelledby={`metric-tab-${activeMetric.id}`}
          className="rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Highlight</p>
          <h3 className="mt-3 font-display text-2xl md:text-3xl tracking-tight">{activeMetric.category}</h3>
          <p className="mt-3 text-sm font-mono uppercase tracking-widest text-text-secondary/70">
            {activeMetric.stat}
          </p>
          <p className="mt-5 text-base md:text-lg leading-relaxed text-text-secondary">
            {activeMetric.description}
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {charts.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onOpenChart(item.id)}
                className={cn(
                  "group overflow-hidden rounded-2xl border border-white/10 bg-surface/40 text-left",
                  "hover:border-white/20 hover:bg-white/5 transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                )}
              >
                <div className="aspect-[16/10] bg-surface/40">
                  {item.imageSrc ? (
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center px-4 text-center text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">
                      Add chart
                    </div>
                  )}
                </div>
                <div className="px-4 py-3">
                  <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">{item.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function useModal() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
  }, [open]);

  return {
    open,
    activeId,
    closeButtonRef,
    openWith: (id: string) => {
      setActiveId(id);
      setOpen(true);
    },
    close: () => setOpen(false),
  };
}

function MediaGrid({ items, onOpen }: { items: MediaItem[]; onOpen: (id: string) => void }) {
  return (
    <ul role="list" className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            onClick={() => onOpen(item.id)}
            className={cn(
              "group w-full overflow-hidden rounded-2xl border border-white/10 bg-surface-alt/10",
              "hover:bg-white/5 hover:border-white/20 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
            )}
          >
            <div className="aspect-[4/3] bg-surface/40">
              {item.imageSrc ? (
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center px-4 text-center text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">
                  Add image
                </div>
              )}
            </div>
            <div className="px-4 py-3">
              <p className="text-sm tracking-tight text-text-primary line-clamp-2">{item.title}</p>
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
  imageSrc,
  onClose,
  closeButtonRef,
}: {
  open: boolean;
  title: string;
  imageSrc?: string;
  onClose: () => void;
  closeButtonRef: React.RefObject<HTMLButtonElement | null>;
}) {
  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-50 grid place-items-center p-6">
      <button type="button" aria-label="Close modal" onClick={onClose} className="absolute inset-0 bg-black/70" />
      <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-surface">
        <div className="flex items-center justify-between gap-6 border-b border-white/10 px-5 py-4">
          <p className="text-sm tracking-tight text-text-primary">{title}</p>
          <button
            type="button"
            ref={closeButtonRef}
            onClick={onClose}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-surface-alt/10",
              "text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
            )}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="bg-surface-alt/10">
          <div className="aspect-[16/10] w-full">
            {imageSrc ? (
              <img src={imageSrc} alt={title} className="h-full w-full object-contain" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs font-mono uppercase tracking-widest text-text-secondary/70">
                Add an imageSrc for this item
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PdfSlideshow({
  items,
  activeId,
  onSelect,
}: {
  items: PdfItem[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const activeIndex = useMemo(() => items.findIndex((i) => i.id === activeId), [items, activeId]);
  const active = items.find((i) => i.id === activeId) ?? items[0];
  const href = active ? getPdfHref(active) : undefined;
  const iframeSrc = href ? `${href}#view=Fit` : undefined;

  const goPrev = () => {
    if (!items.length) return;
    const nextIndex = activeIndex <= 0 ? items.length - 1 : activeIndex - 1;
    onSelect(items[nextIndex]?.id ?? items[0]!.id);
  };

  const goNext = () => {
    if (!items.length) return;
    const nextIndex = activeIndex >= items.length - 1 ? 0 : activeIndex + 1;
    onSelect(items[nextIndex]?.id ?? items[0]!.id);
  };

  const safeActiveId = items.some((item) => item.id === activeId) ? activeId : (items[0]?.id ?? "");

  return (
    <div
      className="rounded-3xl border border-white/10 bg-surface-alt/10 overflow-hidden"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goPrev();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          goNext();
        }
      }}
    >
      <div className="border-b border-white/10 px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Article preview</p>
            <p className="mt-1 text-xs font-mono uppercase tracking-widest text-text-secondary/60">
              {items.length ? `${Math.max(1, activeIndex + 1)} / ${items.length}` : ""}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              className={cn(
                "inline-flex h-9 items-center justify-center rounded-full border border-white/10 bg-surface/40 px-3",
                "text-xs font-mono uppercase tracking-widest text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
              )}
            >
              Prev
            </button>
            <button
              type="button"
              onClick={goNext}
              className={cn(
                "inline-flex h-9 items-center justify-center rounded-full border border-white/10 bg-surface/40 px-3",
                "text-xs font-mono uppercase tracking-widest text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
              )}
            >
              Next
            </button>

            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex h-9 items-center justify-center rounded-full border border-white/10 bg-surface/40 px-3",
                  "text-xs font-mono uppercase tracking-widest text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                )}
              >
                Open ↗
              </a>
            ) : null}
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="article-preview-select" className="sr-only">
            Select article
          </label>
          <div className="relative">
            <select
              id="article-preview-select"
              value={safeActiveId}
              onChange={(event) => onSelect(event.target.value)}
              className={cn(
                "w-full appearance-none rounded-2xl border border-white/10 bg-surface/40 px-4 py-3 pr-10",
                "text-sm tracking-tight text-text-primary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
              )}
              aria-label="Select article"
            >
              {items.map((item, index) => (
                <option key={item.id} value={item.id}>
                  {String(index + 1).padStart(2, "0")} · {item.title}
                </option>
              ))}
            </select>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary"
            >
              ▾
            </span>
          </div>
        </div>

        <p className="mt-3 text-sm tracking-tight text-text-primary line-clamp-2">{active?.title ?? "Preview"}</p>
      </div>

      <div className="bg-surface/40">
        <div className="h-[75vh] min-h-[520px] lg:h-[62vh] lg:min-h-[420px] w-full">
          {iframeSrc ? (
            <iframe title={active?.title ?? "PDF preview"} src={iframeSrc} className="h-full w-full" />
          ) : (
            <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs font-mono uppercase tracking-widest text-text-secondary/70">
              Add a PDF href for this item
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-4">
        <p className="text-xs leading-relaxed text-text-secondary/70">
          Use Prev/Next or the selector to navigate. Arrow keys work when this panel is focused.
        </p>
      </div>
    </div>
  );
}

export default function PAndGBeautyContentHubProjectPage() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const progress = useScrollProgress();
  const activeSection = useActiveSection(sectionLinks.map((s) => s.id));
  const scrollBehavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";

  const { open, activeId, closeButtonRef, openWith, close } = useModal();
  const activeMedia = useMemo(() => {
    const all = [...chartMedia];
    return all.find((item) => item.id === activeId) ?? all[0]!;
  }, [activeId]);
  const [activePdfId, setActivePdfId] = useState(articlePdfs[0]?.id ?? "");

  return (
    <main className="min-h-screen bg-surface text-text-primary">
      <MobileJumpBar
        items={sectionLinks}
        activeId={activeSection}
        progress={progress}
        onNavigate={(id) => scrollToId(id, scrollBehavior)}
      />

      <div className="mx-auto w-full max-w-6xl px-6 pt-10 md:pt-16 pb-24 md:pb-32">
        <header className="flex items-center">
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
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="min-w-0">
            <section id="overview" className="scroll-mt-16">
              <p className="text-xs font-mono uppercase tracking-widest text-accent">Project #1</p>
              <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.03]">
                {project.title}
              </h1>
              <p className="mt-4 text-xl md:text-2xl tracking-tight text-text-secondary">{project.subtitle}</p>

              <div className="mt-8 lg:hidden rounded-3xl border border-white/10 bg-surface-alt/10 p-6">
                <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Overview</p>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">{project.overview}</p>
              </div>

              <div className="mt-12 grid gap-6 lg:grid-cols-2">
                <div className="h-full rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8">
                  <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Objective</p>
                  <p className="mt-4 text-base md:text-lg leading-relaxed text-text-secondary">{project.objective}</p>

                  <div className="mt-8">
                    <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">My Role</p>
                    <p className="mt-2 text-sm md:text-base text-text-secondary">Copywriter and Content Strategist</p>
                  </div>
                </div>

                <div className="h-full rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8 flex flex-col">
                  <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Quick results</p>
                  <div className="mt-5 grid gap-5">
                    <div>
                      <p className="font-display text-3xl leading-none">250K+</p>
                      <p className="mt-2 flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-text-secondary/80">
                        <SquiggleMark />
                        Monthly organic visits
                      </p>
                    </div>
                    <div>
                      <p className="font-display text-3xl leading-none">+126%</p>
                      <p className="mt-2 flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-text-secondary/80">
                        <SquiggleMark />
                        Organic growth in 4 months
                      </p>
                    </div>
                    <div>
                      <p className="font-display text-3xl leading-none">$72K+</p>
                      <p className="mt-2 flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-text-secondary/80">
                        <SquiggleMark />
                        Est. Monthly Organic Traffic Value
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto pt-8">
                    <button
                      type="button"
                      onClick={() => scrollToId("results", scrollBehavior)}
                      className={cn(
                        "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-mono uppercase tracking-widest",
                        "bg-text-primary text-surface hover:bg-white transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                      )}
                    >
                      View Results
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="strategy" title="Strategy" contentClassName="mt-5">
              <p className="max-w-3xl text-base md:text-lg leading-relaxed text-text-secondary">{project.strategyIntro}</p>

              <div className="mt-10">
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute left-[34px] top-4 bottom-4 w-px bg-accent/25"
                  />

                  <ol className="grid gap-3 text-sm md:text-base text-text-secondary" aria-label="Strategy pillars">
                    {project.strategyBullets.map((bullet) => {
                      return (
                        <li key={bullet}>
                          <div
                            className={cn(
                              "w-full rounded-2xl border border-white/10 bg-surface-alt/10 px-5 py-4 text-left",
                            )}
                          >
                            <span className="grid grid-cols-[28px_1fr] gap-4 items-start">
                              <span className="relative justify-self-center mt-[0.7rem]" aria-hidden="true">
                                <span
                                  className={cn(
                                    "absolute inset-0 -m-[7px] rounded-full border border-white/10",
                                  )}
                                />
                                <span
                                  className={cn(
                                    "relative block h-2.5 w-2.5 rounded-full bg-accent/70",
                                  )}
                                />
                              </span>

                              <span className="leading-relaxed">{bullet}</span>
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="execution" title="Execution">
              <div className="grid gap-8 lg:grid-cols-2">
                <ol className="grid gap-3">
                  {(project.executionBullets as unknown as string[]).map((step, index) => (
                    <li key={step} className="rounded-2xl border border-white/10 bg-surface-alt/10 px-5 py-4">
                      <span className="grid grid-cols-[28px_1fr] gap-4 items-start">
                        <span className="mt-[0.35rem] inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-surface/40 text-[11px] font-mono text-text-secondary">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm md:text-base leading-relaxed text-text-secondary">{step}</span>
                      </span>
                    </li>
                  ))}
                </ol>

                <div className="lg:sticky lg:top-16 self-start">
                  <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Digital articles</p>
                  <div className="mt-6">
                    <PdfSlideshow items={articlePdfs} activeId={activePdfId} onSelect={setActivePdfId} />
                  </div>
                </div>
              </div>
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="results" title="Results">
              <MetricTabs metrics={metrics} charts={chartMedia} onOpenChart={openWith} />
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="tools" title="Tools & Skills">
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2">
                {project.tools.map((tool) => (
                  <Pill key={tool}>{tool}</Pill>
                ))}
              </div>
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <footer className="pt-2">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => scrollToId("overview", scrollBehavior)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface-alt/10 px-4 py-2",
                    "text-sm text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                  )}
                >
                  <span aria-hidden="true">↑</span>
                  <span>Back to top</span>
                </button>

                <div className="text-xs font-mono uppercase tracking-widest text-text-secondary/60">
                  {Math.round(progress * 100)}% read
                </div>
              </div>
            </footer>
          </div>

          <DesktopRail
            items={sectionLinks}
            activeId={activeSection}
            progress={progress}
            onNavigate={(id) => scrollToId(id, scrollBehavior)}
          />
        </div>
      </div>

      <Modal
        open={open}
        title={activeMedia?.title ?? "Preview"}
        imageSrc={activeMedia?.imageSrc}
        onClose={close}
        closeButtonRef={closeButtonRef}
      />

    </main>
  );
}
