"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/app/lib/utils";

type SectionLink = { id: string; label: string };

type Metric = {
  id: string;
  listTitle: string;
  title: string;
  kpiLabel: string;
  description: string;
  value?: string;
};

const project = {
  title: "SalonCentric × New York Fashion Week",
  subtitle: "Integrated Campaign and Content Production",
  overview:
    "Produced integrated campaign content for SalonCentric’s New York Fashion Week activation. Translated a live, in-person industry event into coordinated digital, social, and email storytelling, ensuring consistent messaging across experiential, digital, and owned platforms. My work extended the impact of SalonCentric’s NYFW presence by transforming the event activation into a multi-channel campaign that reinforced brand authority, strengthened brand communications, and drove engagement.",
  role: "Copywriter and Campaign Content Lead",
  objective:
    "Anchored brand communications and campaign storytelling in the energy and cultural relevance of New York Fashion Week by highlighting professional artistry, backstage access, and inclusive industry moments. Positioned SalonCentric as an insider brand connected to fashion’s most influential stage, balancing prestige storytelling with performance-aware copy across experiential, social, and owned channels.",
  messagingIntro:
    "Defined a campaign narrative that transformed key NYFW moments into scalable, multi-channel brand storytelling, including:",
  messagingBullets: [
    "Spotlighted professional artists through runway and backstage access",
    "Positioned SalonCentric as a thought leader through clear, consistent brand communications during fashion’s most influential moment",
    "Balanced prestige storytelling with performance-driven copy",
    "Maintained a unified narrative across live production and post-production event content",
  ],
  productionIntro: "Produced campaign content and live-event coverage across channels, including:",
  productionBullets: [
    "Wrote campaign copy for social, email, and supporting digital assets",
    "Supported real-time and post-event content tied to runway and cultural moments",
    "Collaborated with experiential, social, brand, and email teams",
    "Ensured brand voice consistency across paid, organic, and owned channels",
    "Extended campaign lifespan through post-event amplification",
  ],
  audience: [
    { label: "B2B", value: "Licensed beauty professionals and salon decision-makers" },
    { label: "DTC (Owned)", value: "SalonCentric web and email audiences" },
    { label: "Influencer & Media", value: "Fashion and beauty creators and cultural partners" },
    { label: "Industry", value: "Educators, brand partners, and key stakeholders" },
  ],
  snapshot: [
    { title: "Total Campaign Impressions", value: "1M+" },
    { title: "Multi-Channel Activation", value: "EXPERIENTIAL · SOCIAL · EMAIL · DIGITAL" },
    { title: "Headlining Industry Moment", value: "ALIGNED WITH NEW YORK FASHION WEEK" },
  ],
  channels: ["Experiential", "Social", "Email", "Digital", "Paid", "PR"],
  tools: [
    "Campaign Content Production",
    "Integrated Marketing",
    "Brand Communications",
    "Social & Email Copywriting",
    "Experiential Campaign Support",
    "Cross-Functional Collaboration",
    "Brand Messaging",
  ],
} as const;

const metrics: Metric[] = [
  {
    id: "total-impressions",
    value: "1M+",
    listTitle: "Total Campaign Impressions (1M+)",
    title: "Total Campaign Impressions",
    kpiLabel: "Campaign Reach",
    description:
      "Delivered 1M+ impressions across social, email, and digital channels through integrated campaign content tied to New York Fashion Week.",
  },
  {
    id: "social-engagement",
    listTitle: "Social Reach & Engagement",
    title: "Social Reach & Engagement",
    kpiLabel: "Content Performance",
    description:
      "Drove strong reach and engagement by translating live runway and backstage moments into platform-native social content.",
  },
  {
    id: "email-lift",
    listTitle: "Email Engagement Lift",
    title: "Email Engagement Lift",
    kpiLabel: "Owned Channel Engagement",
    description:
      "Supported increased engagement across NYFW-themed email campaigns aligned with the broader campaign narrative.",
  },
  {
    id: "amplification",
    listTitle: "Cross-Channel Content Amplification",
    title: "Cross-Channel Content Amplification",
    kpiLabel: "Integrated Execution",
    description:
      "Extended the impact of the in-person activation by coordinating content across experiential, social, and owned channels.",
  },
  {
    id: "brand-visibility",
    listTitle: "Brand Visibility During NYFW",
    title: "Brand Visibility During NYFW",
    kpiLabel: "Brand Presence",
    description:
      "Strengthened SalonCentric’s visibility and authority within the professional beauty space during a high-profile fashion event.",
  },
];

const sectionLinks: SectionLink[] = [
  { id: "overview", label: "Overview" },
  { id: "objective", label: "Objective" },
  { id: "messaging", label: "Campaign Messaging" },
  { id: "production", label: "Content Production" },
  { id: "results", label: "Results" },
  { id: "deliverables", label: "Final Deliverables" },
  { id: "tools", label: "Tools & Skills" },
];

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

function scrollToId(id: string) {
  const node = document.getElementById(id);
  if (!node) return;
  node.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface-alt/10 px-3 py-1.5",
        "text-[11px] font-mono uppercase tracking-widest text-text-secondary",
      )}
    >
      {children}
    </span>
  );
}

function WindowFrame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface/40">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-surface-alt/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-white/10" />
        </div>
        <p className="truncate text-xs font-mono uppercase tracking-widest text-text-secondary/75">{title}</p>
        <span aria-hidden="true" className="h-6 w-6 rounded-full border border-white/10 bg-surface/40" />
      </div>
      <div className="p-4 md:p-5">{children}</div>
    </div>
  );
}

function PlaceholderBlock({ label }: { label: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-surface-alt/10",
        "before:absolute before:inset-0 before:bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]",
        "before:bg-[size:28px_28px] before:opacity-60",
      )}
    >
      <div className="relative flex min-h-[220px] items-end p-4 md:min-h-[260px]">
        <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">{label}</p>
      </div>
    </div>
  );
}

export default function SalonCentricNyfwProjectPage() {
  const [activeMetricId, setActiveMetricId] = useState(metrics[0]?.id ?? "");
  const activeMetric = useMemo(() => metrics.find((m) => m.id === activeMetricId) ?? metrics[0], [activeMetricId]);
  const activeSection = useActiveSection(sectionLinks.map((s) => s.id));

  return (
    <main className="min-h-screen bg-surface pb-32 pt-24 md:pt-28">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex items-center justify-between gap-6">
          <Link
            href="/work"
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface-alt/10 px-4 py-2",
              "text-sm text-text-secondary hover:text-white hover:border-white/20 hover:bg-white/5 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
            )}
          >
            <span aria-hidden="true">←</span>
            Back to Work
          </Link>
        </div>

        <header className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="text-xs font-mono uppercase tracking-[0.32em] text-accent">Project #2</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] text-white md:text-6xl">
              {project.title}
            </h1>
            <p className="mt-4 text-lg text-text-secondary md:text-xl">{project.subtitle}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Pill>My Role</Pill>
              <span className="text-sm text-text-secondary">{project.role}</span>
            </div>

            <p className="mt-8 max-w-3xl text-base leading-relaxed text-text-secondary">{project.overview}</p>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface-alt/10">
                <div className="border-b border-white/10 px-5 py-4">
                  <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">On this page</p>
                </div>
                <nav className="p-2" aria-label="On this page">
                  {sectionLinks.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <button
                        key={link.id}
                        type="button"
                        onClick={() => scrollToId(link.id)}
                        className={cn(
                          "w-full rounded-xl px-4 py-3 text-left text-sm transition-colors",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                          isActive
                            ? "bg-white/5 text-white"
                            : "text-text-secondary hover:text-white hover:bg-white/5",
                        )}
                      >
                        {link.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="grid gap-4">
                {project.snapshot.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-surface-alt/10 px-5 py-5"
                  >
                    <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">{item.title}</p>
                    <p className="mt-3 text-sm text-white/90">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </header>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-16">
            <section id="overview" aria-labelledby="overview-title">
              <div className="flex items-end justify-between gap-6 border-b border-white/10 pb-4">
                <h2 id="overview-title" className="text-xl font-display tracking-tight text-white/90">
                  Overview
                </h2>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-surface-alt/10 p-6">
                  <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Target Audience</p>
                  <dl className="mt-5 space-y-4">
                    {project.audience.map((item) => (
                      <div key={item.label} className="grid grid-cols-[110px,1fr] gap-4">
                        <dt className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">{item.label}</dt>
                        <dd className="text-sm leading-relaxed text-text-secondary">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="rounded-2xl border border-white/10 bg-surface-alt/10 p-6">
                  <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Channels</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.channels.map((channel) => (
                      <span
                        key={channel}
                        className="inline-flex items-center rounded-full border border-white/10 bg-surface/30 px-3 py-1 text-xs text-text-secondary"
                      >
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section id="objective" aria-labelledby="objective-title">
              <div className="flex items-end justify-between gap-6 border-b border-white/10 pb-4">
                <h2 id="objective-title" className="text-xl font-display tracking-tight text-white/90">
                  Campaign Objective
                </h2>
              </div>
              <p className="mt-6 text-base leading-relaxed text-text-secondary">{project.objective}</p>
            </section>

            <section id="messaging" aria-labelledby="messaging-title">
              <div className="flex items-end justify-between gap-6 border-b border-white/10 pb-4">
                <h2 id="messaging-title" className="text-xl font-display tracking-tight text-white/90">
                  Campaign Messaging
                </h2>
              </div>
              <p className="mt-6 text-base leading-relaxed text-text-secondary">{project.messagingIntro}</p>
              <ul className="mt-6 space-y-3">
                {project.messagingBullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/90" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="production" aria-labelledby="production-title">
              <div className="flex items-end justify-between gap-6 border-b border-white/10 pb-4">
                <h2 id="production-title" className="text-xl font-display tracking-tight text-white/90">
                  Content Production
                </h2>
              </div>
              <p className="mt-6 text-base leading-relaxed text-text-secondary">{project.productionIntro}</p>
              <ul className="mt-6 space-y-3">
                {project.productionBullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/90" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="results" aria-labelledby="results-title">
                <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 id="results-title" className="text-xl font-display tracking-tight text-white/90">
                      Results
                    </h2>
                    <p className="mt-2 text-sm text-text-secondary">Select a KPI to view the data.</p>
                  </div>
                  <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">
                    Source: Campaign reporting.
                  </p>
                </div>

              <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <div className="space-y-2 rounded-2xl border border-white/10 bg-surface-alt/10 p-2">
                    {metrics.map((metric) => {
                      const isActive = metric.id === activeMetricId;
                      return (
                        <button
                          key={metric.id}
                          type="button"
                          onClick={() => setActiveMetricId(metric.id)}
                          className={cn(
                            "w-full rounded-xl px-4 py-3 text-left text-[13px] leading-snug transition-colors",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                            isActive
                              ? "bg-white/5 text-white"
                              : "text-white/70 hover:text-white hover:bg-white/5",
                          )}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span>{metric.listTitle}</span>
                            {metric.value ? (
                              <span className="rounded-full border border-white/10 bg-surface/30 px-2 py-0.5 text-[11px] font-mono text-text-secondary">
                                {metric.value}
                              </span>
                            ) : null}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <WindowFrame title="Key Performance Indicator:">
                    <p className="text-xs font-mono uppercase tracking-widest text-accent">{activeMetric.kpiLabel}</p>
                    <h3 className="mt-3 font-display text-2xl leading-tight text-white/90">{activeMetric.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-text-secondary">{activeMetric.description}</p>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <PlaceholderBlock label="KPI chart placeholder" />
                      <PlaceholderBlock label="Reporting screenshot placeholder" />
                    </div>
                  </WindowFrame>
                </div>
              </div>
            </section>

            <section id="deliverables" aria-labelledby="deliverables-title">
              <div className="flex items-end justify-between gap-6 border-b border-white/10 pb-4">
                <h2 id="deliverables-title" className="text-xl font-display tracking-tight text-white/90">
                  Final Deliverables
                </h2>
              </div>

              <div className="mt-8 grid gap-6">
                <WindowFrame title="Article PDF preview (to be added)">
                  <PlaceholderBlock label="Article PDF preview placeholder" />
                  <p className="mt-4 text-sm text-text-secondary">
                    Add the PDF to `public/images/` and I will wire it into this preview.
                  </p>
                </WindowFrame>

                <div className="grid gap-6 md:grid-cols-2">
                  <WindowFrame title="Instagram post screenshot (to be added)">
                    <PlaceholderBlock label="Instagram post screenshot placeholder" />
                  </WindowFrame>
                  <WindowFrame title="Campaign images (3) (to be added)">
                    <div className="grid gap-4">
                      <PlaceholderBlock label="Image placeholder 01" />
                      <PlaceholderBlock label="Image placeholder 02" />
                      <PlaceholderBlock label="Image placeholder 03" />
                    </div>
                  </WindowFrame>
                </div>
              </div>
            </section>

            <section id="tools" aria-labelledby="tools-title">
              <div className="flex items-end justify-between gap-6 border-b border-white/10 pb-4">
                <h2 id="tools-title" className="text-xl font-display tracking-tight text-white/90">
                  Tools & Skills
                </h2>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center rounded-full border border-white/10 bg-surface-alt/10 px-3 py-1 text-xs text-text-secondary"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-4" />
        </div>
      </div>
    </main>
  );
}
