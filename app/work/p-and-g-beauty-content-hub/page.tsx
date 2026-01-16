"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/app/lib/utils";

type SectionLink = { id: string; label: string };

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
  description: string;
};

const project = {
  title: "Procter & Gamble HairCode",
  subtitle: "Content Strategy and Growth Marketing",
  overview:
    "Developed and optimized SEO-driven editorial content for HairCode, Procter & Gamble’s consumer-facing content hub, across beauty, health, and wellness topics. The work focused on driving sustainable organic growth and search visibility in highly competitive categories.",
  role: "Copywriter & Content Strategist",
  objective:
    "Increase monthly organic traffic and search visibility for P&G Beauty’s owned content platform while delivering clear, expert-validated educational content designed to perform sustainably over time.",
  strategyIntro:
    "Designed a content system to drive sustainable organic growth by:",
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
    id: "monthly-organic-visits",
    category: "Organic Search Traffic",
    value: "250K+",
    listTitle: "250K+ Monthly Organic Traffic",
    description: "Scaled monthly organic traffic to 250K+ visits through SEO-led editorial growth.",
  },
  {
    id: "growth-rate",
    category: "Organic Growth Rate",
    value: "+126%",
    listTitle: "+126% Organic Growth",
    description: "Increased organic traffic by 126% in four months, growing from ~110K to 250K monthly visits.",
  },
  {
    id: "search-footprint",
    category: "Search Footprint",
    value: "47K",
    listTitle: "47K Organic Keywords Ranked",
    description: "Expanded the site’s search footprint to 47K ranking organic keywords.",
  },
  {
    id: "domain-authority",
    category: "Domain Authority",
    value: "44",
    listTitle: "Authority Score: 44",
    description: "Built a domain authority score of 44 supported by 947 referring domains.",
  },
  {
    id: "organic-media-value",
    category: "Organic Media Value",
    value: "$72K+",
    listTitle: "$72K+ Organic Traffic Value",
    description: "Generated $72K+ in estimated monthly organic traffic value, based on paid media equivalents.",
  },
  {
    id: "content-engagement",
    category: "Content Engagement",
    value: "5:48",
    listTitle: "5:48 Average Visit Duration",
    description: "Drove an average visit duration of 5:48, reflecting strong engagement with long-form content.",
  },
  {
    id: "ai-search-visibility",
    category: "AI Search Visibility",
    value: "984",
    listTitle: "984 AI Search Mentions + 738 AI-Cited Pages",
    description: "Earned 984 AI search mentions with 738 pages cited in AI-generated search results.",
  },
];

const sectionLinks: SectionLink[] = [
  { id: "overview", label: "Overview" },
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

const semrushSnapshot = {
  trafficSeries: [
    { label: "May 2025", valueK: 110.88 },
    { label: "Oct 2025", valueK: 250.66 },
  ],
  trafficValueK: 72.22,
  organicKeywords: 47000,
  authorityScore: 44,
  referringDomains: 947,
  aiMentions: 984,
  aiCitedPages: 738,
  topPositions: { top3: 8, top10: 9, top20: 10, top100: 10 },
} as const;

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

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function MiniLineChart({
  points,
  ariaLabel,
}: {
  points: { label: string; valueK: number }[];
  ariaLabel: string;
}) {
  const width = 320;
  const height = 120;
  const paddingX = 8;
  const paddingY = 12;
  const innerWidth = width - paddingX * 2;
  const innerHeight = height - paddingY * 2;

  const values = points.map((p) => p.valueK);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(1, max - min);

  const toX = (index: number) => paddingX + (points.length <= 1 ? 0 : (index / (points.length - 1)) * innerWidth);
  const toY = (value: number) => paddingY + (1 - (value - min) / range) * innerHeight;

  const path = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${toX(index).toFixed(2)} ${toY(point.valueK).toFixed(2)}`)
    .join(" ");

  return (
    <svg role="img" aria-label={ariaLabel} viewBox={`0 0 ${width} ${height}`} className="h-32 w-full">
      <g stroke="rgba(255,255,255,0.08)" strokeWidth="1">
        <line x1="0" y1="24" x2={width} y2="24" />
        <line x1="0" y1="60" x2={width} y2="60" />
        <line x1="0" y1="96" x2={width} y2="96" />
      </g>

      <path d={path} fill="none" stroke="rgba(255,59,48,0.9)" strokeWidth="2.25" strokeLinecap="round" />

      {points.map((point, index) => {
        const x = toX(index);
        const y = toY(point.valueK);
        return (
          <g key={point.label}>
            <circle cx={x} cy={y} r="3.2" fill="rgba(255,59,48,0.95)" />
          </g>
        );
      })}

      {points.length >= 2 ? (
        <>
          <text x={paddingX} y={height - 6} fontSize="10" fill="rgba(255,255,255,0.55)">
            {points[0]!.label}
          </text>
          <text x={width - paddingX} y={height - 6} fontSize="10" fill="rgba(255,255,255,0.55)" textAnchor="end">
            {points[points.length - 1]!.label}
          </text>

          <text x={paddingX} y={14} fontSize="10" fill="rgba(255,255,255,0.70)">
            {points[0]!.valueK.toFixed(2)}K
          </text>
          <text x={width - paddingX} y={14} fontSize="10" fill="rgba(255,255,255,0.70)" textAnchor="end">
            {points[points.length - 1]!.valueK.toFixed(2)}K
          </text>
        </>
      ) : null}
    </svg>
  );
}

function MiniBars({
  items,
  ariaLabel,
}: {
  items: { label: string; value: number }[];
  ariaLabel: string;
}) {
  const width = 320;
  const height = 120;
  const paddingX = 10;
  const paddingY = 14;
  const innerHeight = height - paddingY * 2;
  const max = Math.max(1, ...items.map((i) => i.value));
  const gap = 10;
  const barWidth = (width - paddingX * 2 - gap * (items.length - 1)) / items.length;

  return (
    <svg role="img" aria-label={ariaLabel} viewBox={`0 0 ${width} ${height}`} className="h-32 w-full">
      <g stroke="rgba(255,255,255,0.08)" strokeWidth="1">
        <line x1="0" y1="24" x2={width} y2="24" />
        <line x1="0" y1="60" x2={width} y2="60" />
        <line x1="0" y1="96" x2={width} y2="96" />
      </g>

      {items.map((item, index) => {
        const x = paddingX + index * (barWidth + gap);
        const h = (item.value / max) * innerHeight;
        const y = height - paddingY - h;
        return (
          <g key={item.label}>
            <rect x={x} y={y} width={barWidth} height={h} rx="10" fill="rgba(255,59,48,0.38)" />
            <rect x={x} y={y} width={barWidth} height={2.25} rx="10" fill="rgba(255,59,48,0.9)" />
            <text x={x + barWidth / 2} y={height - 6} fontSize="10" fill="rgba(255,255,255,0.55)" textAnchor="middle">
              {item.label}
            </text>
            <text x={x + barWidth / 2} y={Math.max(14, y - 4)} fontSize="10" fill="rgba(255,255,255,0.70)" textAnchor="middle">
              {formatNumber(item.value)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Gauge({
  value,
  max,
  ariaLabel,
}: {
  value: number;
  max: number;
  ariaLabel: string;
}) {
  const size = 132;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, value / max));
  const dash = c * pct;

  return (
    <svg role="img" aria-label={ariaLabel} viewBox={`0 0 ${size} ${size}`} className="h-[132px] w-[132px]">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.10)" strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="rgba(255,59,48,0.95)"
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${c}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="52%" textAnchor="middle" dominantBaseline="middle" fontSize="28" fill="rgba(255,255,255,0.92)">
        {value}
      </text>
      <text x="50%" y="72%" textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="rgba(255,255,255,0.55)">
        / {max}
      </text>
    </svg>
  );
}

function MetricChart({ metricId }: { metricId: Metric["id"] }) {
  const wrapperClassName = cn("mt-8 rounded-2xl border border-white/10 bg-surface/40 p-4 md:p-5");

  switch (metricId) {
    case "monthly-organic-visits":
      return (
        <div className={wrapperClassName}>
          <p className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">Traffic trend</p>
          <div className="mt-3">
            <MiniLineChart
              ariaLabel="Organic traffic trend from May 2025 to October 2025"
              points={semrushSnapshot.trafficSeries as unknown as { label: string; valueK: number }[]}
            />
          </div>
        </div>
      );
    case "growth-rate":
      return (
        <div className={wrapperClassName}>
          <p className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">Growth curve</p>
          <div className="mt-3">
            <MiniLineChart
              ariaLabel="Organic traffic growth from May 2025 to October 2025"
              points={semrushSnapshot.trafficSeries as unknown as { label: string; valueK: number }[]}
            />
          </div>
        </div>
      );
    case "search-footprint":
      return (
        <div className={wrapperClassName}>
          <p className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">Keywords and top positions</p>
          <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-display text-3xl leading-none">{formatNumber(semrushSnapshot.organicKeywords)}</p>
              <p className="mt-2 text-xs font-mono uppercase tracking-widest text-text-secondary/70">Ranking organic keywords</p>
            </div>
            <div className="justify-self-start md:justify-self-end">
              <MiniBars
                ariaLabel="Top position keyword counts snapshot"
                items={[
                  { label: "Top 3", value: semrushSnapshot.topPositions.top3 },
                  { label: "Top 10", value: semrushSnapshot.topPositions.top10 },
                  { label: "Top 20", value: semrushSnapshot.topPositions.top20 },
                  { label: "Top 100", value: semrushSnapshot.topPositions.top100 },
                ]}
              />
            </div>
          </div>
        </div>
      );
    case "domain-authority":
      return (
        <div className={wrapperClassName}>
          <p className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">Authority and links</p>
          <div className="mt-4 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
            <Gauge ariaLabel="Authority score gauge" value={semrushSnapshot.authorityScore} max={100} />
            <div className="grid gap-3">
              <div className="rounded-xl border border-white/10 bg-surface-alt/10 p-4">
                <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Referring domains</p>
                <p className="mt-2 font-display text-2xl leading-none">{formatNumber(semrushSnapshot.referringDomains)}</p>
              </div>
            </div>
          </div>
        </div>
      );
    case "organic-media-value":
      return (
        <div className={wrapperClassName}>
          <p className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">Estimated value</p>
          <div className="mt-4">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-display text-3xl leading-none">${semrushSnapshot.trafficValueK.toFixed(2)}K</p>
              <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/60">Monthly traffic value</p>
            </div>
            <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden" aria-hidden="true">
              <div
                className="h-full bg-accent/80"
                style={{ width: `${Math.max(0, Math.min(1, semrushSnapshot.trafficValueK / 100)) * 100}%` }}
              />
            </div>
            <p className="mt-3 text-xs text-text-secondary/70">Scaled to a 0–100K visual range.</p>
          </div>
        </div>
      );
    case "content-engagement":
      return (
        <div className={wrapperClassName}>
          <p className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">Session depth</p>
          <div className="mt-4">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-display text-3xl leading-none">5:48</p>
              <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/60">Average visit duration</p>
            </div>
            <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden" aria-hidden="true">
              <div className="h-full bg-accent/80" style={{ width: `${(348 / 600) * 100}%` }} />
            </div>
            <p className="mt-3 text-xs text-text-secondary/70">Scaled to a 0–10 minute visual range.</p>
          </div>
        </div>
      );
    case "ai-search-visibility":
      return (
        <div className={wrapperClassName}>
          <p className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">AI citations</p>
          <div className="mt-3">
            <MiniBars
              ariaLabel="AI search mentions and cited pages"
              items={[
                { label: "Mentions", value: semrushSnapshot.aiMentions },
                { label: "Cited pages", value: semrushSnapshot.aiCitedPages },
              ]}
            />
          </div>
        </div>
      );
    default:
      return null;
  }
}

function Section({
  id,
  title,
  subtitle,
  children,
  contentClassName,
  subtitleClassName,
}: {
  id: string;
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  contentClassName?: string;
  subtitleClassName?: string;
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
        {subtitle ? (
          <p
            className={cn(
              "mt-2 text-xs font-mono uppercase tracking-widest text-text-secondary/70",
              subtitleClassName,
            )}
          >
            {subtitle}
          </p>
        ) : null}
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
      </div>
    </aside>
  );
}

function MetricTabs({
  metrics,
}: {
  metrics: Metric[];
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
                  "group relative w-full px-5 py-4 pl-11 text-left",
                  "before:absolute before:left-5 before:top-6 before:h-2.5 before:w-2.5 before:rounded-full before:border before:transition-all before:duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                  isOpen
                    ? "before:border-accent/40 before:bg-accent/90 before:shadow-[0_0_0_4px_rgba(255,59,48,0.14)]"
                    : "before:border-white/15 before:bg-transparent hover:before:border-white/25 hover:before:bg-white/10",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="font-display text-lg leading-snug text-text-primary line-clamp-2">
                    {metric.listTitle}
                  </p>

                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-surface/40 text-text-secondary transition-transform duration-200",
                        isOpen ? "rotate-180" : "rotate-0",
                      )}
                    >
                      ▾
                    </span>
                  </div>
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
                  <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Key performance indicator:</p>
                  <h4 className="mt-3 font-display text-xl tracking-tight text-text-primary">{metric.category}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{metric.description}</p>
                  <MetricChart metricId={metric.id} />
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
                    "group relative rounded-2xl border bg-surface-alt/10 px-5 py-4 pl-11 text-left transition-colors",
                    "before:absolute before:left-5 before:top-6 before:h-2.5 before:w-2.5 before:rounded-full before:border before:transition-all before:duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                    selected
                      ? "border-white/25 bg-white/5 before:border-accent/40 before:bg-accent/90 before:shadow-[0_0_0_4px_rgba(255,59,48,0.14)]"
                      : "border-white/10 before:border-white/15 before:bg-transparent hover:bg-white/5 hover:border-white/20 hover:before:border-white/25 hover:before:bg-white/10",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-display text-lg leading-snug text-text-primary line-clamp-2">
                      {metric.listTitle}
                    </p>
                  </div>
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
          <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Key performance indicator:</p>
          <h3 className="mt-3 font-display text-2xl md:text-3xl tracking-tight">{activeMetric.category}</h3>
          <p className="mt-5 text-base md:text-lg leading-relaxed text-text-secondary">
            {activeMetric.description}
          </p>
          <MetricChart metricId={activeMetric.id} />
        </div>
      </div>
    </>
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
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(max-width: 768px)");
    if (!mq) return;
    const update = () => setIsMobileView(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    // Safari fallback
    (mq as unknown as { addListener?: (listener: () => void) => void }).addListener?.(update);
    return () => {
      mq.removeEventListener?.("change", update);
      (mq as unknown as { removeListener?: (listener: () => void) => void }).removeListener?.(update);
    };
  }, []);

  const activeIndex = useMemo(() => items.findIndex((i) => i.id === activeId), [items, activeId]);
  const active = items.find((i) => i.id === activeId) ?? items[0];
  const href = active ? getPdfHref(active) : undefined;
  const iframeSrc = href
    ? `${href}#view=${isMobileView ? "Fit" : "FitH"}&toolbar=0&navpanes=0`
    : undefined;

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
      </div>

      <div className="bg-surface/40">
        <div className="h-[75vh] min-h-[520px] lg:h-[62vh] lg:min-h-[420px] w-full overflow-hidden">
          {iframeSrc ? (
            <iframe
              title={active?.title ?? "PDF preview"}
              src={iframeSrc}
              className={cn("h-full w-full border-0")}
            />
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

              <div className="mt-12 grid gap-6 lg:grid-cols-2">
                <div className="h-full rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8">
                  <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Overview</p>
                  <p className="mt-4 text-base md:text-lg leading-relaxed text-text-secondary">{project.overview}</p>

                  <div className="mt-8">
                    <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">My Role</p>
                    <p className="mt-2 text-base md:text-base text-text-secondary">Copywriter and Content Strategist (Contract)</p>
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

              <figure className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-surface-alt/10">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-surface/40 px-4 py-3">
                  <div className="flex items-center gap-2" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/90" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/90" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/90" />
                  </div>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">
                    P&G Beauty’s Brand-Owned Content Hub: HairCode
                  </p>
                  <span aria-hidden="true" className="text-text-secondary/50">
                    ⌄
                  </span>
                </div>

                <div className="bg-surface/30">
                  <div className="aspect-[16/9] w-full">
                    <img
                      src="/HairCode%20Header%20Image.png"
                      alt="HairCode header image"
                      className="h-full w-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </div>
                <figcaption className="sr-only">Header image placeholder</figcaption>
              </figure>
            </section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="strategy" title="Strategy" contentClassName="mt-6">
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

            <Section id="execution" title="Execution" contentClassName="mt-6">
              <p className="max-w-3xl text-base md:text-lg leading-relaxed text-text-secondary">
                Applied this strategy to a structured, repeatable execution workflow, including:
              </p>

              <ol className="mt-6 grid gap-3">
                {(project.executionBullets as unknown as string[]).map((step, index) => (
                  <li key={step}>
                    <div className="w-full rounded-2xl border border-white/10 bg-surface-alt/10 px-5 py-4 text-left">
                      <span className="grid grid-cols-[28px_1fr] gap-4 items-start">
                        <span className="relative justify-self-center mt-[0.35rem]" aria-hidden="true">
                          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-surface/40 text-[11px] font-mono text-text-secondary">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </span>
                        <span className="text-sm md:text-base leading-relaxed text-text-secondary">{step}</span>
                      </span>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-10">
                <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Final deliverables</p>
                <div className="mt-6 w-full max-w-[740px] mx-auto">
                  <PdfSlideshow items={articlePdfs} activeId={activePdfId} onSelect={setActivePdfId} />
                </div>
              </div>
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="results" title="Results" subtitle="SELECT A KPI TO VIEW THE DATA.">
              <MetricTabs metrics={metrics} />
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
    </main>
  );
}
