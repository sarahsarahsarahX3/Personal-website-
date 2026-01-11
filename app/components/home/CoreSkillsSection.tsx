"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { cn } from "@/app/lib/utils";
import styles from "./CoreSkillsSection.module.css";

type ValueArea = {
  id: string;
  index: string;
  title: string;
  description: string;
};

const valueAreas: ValueArea[] = [
  {
    id: "brand-storytelling",
    index: "01",
    title: "Brand Storytelling",
    description:
      "Craft clear, compelling narratives that connect brand, audience, and purpose across marketing touchpoints.",
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
    title: "Editorial Governance",
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
    id: "integrated-marketing-campaigns",
    index: "05",
    title: "Integrated Marketing Campaigns",
    description:
      "Develop content that supports brand growth, customer engagement, integrated campaigns, product launches, and seasonal initiatives.",
  },
  {
    id: "performance-marketing",
    index: "06",
    title: "Performance Marketing",
    description:
      "Apply data and performance insights to optimize content, campaigns, and messaging for engagement, conversion, and measurable results.",
  },
  {
    id: "subject-matter-expertise",
    index: "07",
    title: "Subject-Matter Expertise",
    description:
      "Translate expert insight into accurate, on-brand content across beauty, health, technology, and science.",
  },
  {
    id: "cross-functional-collaboration",
    index: "08",
    title: "Cross-Functional Collaboration",
    description: "Partner across marketing, design, product, and education teams to deliver content at scale.",
  },
];

export function CoreSkillsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const count = valueAreas.length;
    if (count === 0) return;

    const key = event.key;
    const isVerticalNav = key === "ArrowDown" || key === "ArrowUp" || key === "Home" || key === "End";
    if (!isVerticalNav) return;
    event.preventDefault();

    const nextIndex =
      key === "Home"
        ? 0
        : key === "End"
          ? count - 1
          : key === "ArrowDown"
            ? (activeIndex + 1) % count
            : (activeIndex - 1 + count) % count;

    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section aria-labelledby="where-i-create-value-title" className="py-24 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <header className="flex items-baseline justify-between gap-6">
          <h2 id="where-i-create-value-title" className="font-display text-3xl md:text-4xl tracking-tight">
            Where I Create Value
          </h2>
          <p className="hidden md:block font-mono text-xs tracking-widest uppercase text-text-secondary/60">
            Hover or select
          </p>
        </header>

        <div className="mt-12 grid gap-10 md:grid-cols-[320px_1fr] md:gap-14">
          {/* Left column: value areas */}
          <div className="md:sticky md:top-28 self-start">
            {/* Desktop: tabs */}
            <div
              role="tablist"
              aria-label="Where I Create Value"
              aria-orientation="vertical"
              className="hidden md:block rounded-2xl border border-white/10 bg-surface-alt/10 backdrop-blur-sm"
            >
              <ul role="list" className="divide-y divide-white/10">
                {valueAreas.map((area, index) => {
                  const isActive = index === activeIndex;
                  const tabId = `value-tab-${area.id}`;
                  const panelId = `value-panel-${area.id}`;

                  return (
                    <li key={area.id} className="relative">
                      <button
                        ref={(node) => {
                          tabRefs.current[index] = node;
                        }}
                        id={tabId}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={panelId}
                        tabIndex={isActive ? 0 : -1}
                        onKeyDown={onTabKeyDown}
                        onFocus={() => setActiveIndex(index)}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => setActiveIndex(index)}
                        className={cn(
                          "group w-full text-left px-6 py-5",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-inset",
                          "transition-colors duration-200",
                          isActive ? "bg-white/5" : "hover:bg-white/3",
                        )}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4 min-w-0">
                            <span
                              className={cn(
                                "font-mono text-xs tracking-widest",
                                isActive ? "text-accent/90" : "text-text-secondary/65 group-hover:text-text-secondary",
                              )}
                            >
                              {area.index}
                            </span>
                            <span
                              className={cn(
                                "truncate text-[15px] tracking-tight",
                                isActive ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary",
                              )}
                            >
                              {area.title}
                            </span>
                          </div>

                          <span
                            aria-hidden="true"
                            className={cn(
                              "h-1.5 w-1.5 rounded-full transition-colors duration-200",
                              isActive ? "bg-accent/80" : "bg-white/15 group-hover:bg-white/25",
                            )}
                          />
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Mobile: accordion */}
            <div className="md:hidden rounded-2xl border border-white/10 bg-surface-alt/10 backdrop-blur-sm">
              <ul role="list" className="divide-y divide-white/10">
                {valueAreas.map((area, index) => {
                  const isActive = index === activeIndex;
                  const isOpen = index === openIndex;
                  const triggerId = `value-mobile-trigger-${area.id}`;
                  const regionId = `value-mobile-panel-${area.id}`;

                  return (
                    <li key={area.id} className="relative" data-value-item>
                      <button
                        id={triggerId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={regionId}
                        onClick={() => {
                          setActiveIndex(index);
                          setOpenIndex((prev) => (prev === index ? -1 : index));
                        }}
                        className={cn(
                          "group w-full text-left px-5 py-4",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-inset",
                          "transition-colors duration-200",
                          isActive ? "bg-white/5" : "hover:bg-white/3",
                        )}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4 min-w-0">
                            <span
                              className={cn(
                                "font-mono text-xs tracking-widest",
                                isActive ? "text-accent/90" : "text-text-secondary/65 group-hover:text-text-secondary",
                              )}
                            >
                              {area.index}
                            </span>
                            <span
                              className={cn(
                                "truncate text-[15px] tracking-tight",
                                isActive ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary",
                              )}
                            >
                              {area.title}
                            </span>
                          </div>

                          <span
                            aria-hidden="true"
                            className={cn(
                              "h-1.5 w-1.5 rounded-full transition-colors duration-200",
                              isActive ? "bg-accent/80" : "bg-white/15 group-hover:bg-white/25",
                            )}
                          />
                        </div>
                      </button>

                      <div
                        id={regionId}
                        role="region"
                        aria-labelledby={triggerId}
                        className={cn("px-5 pb-4 -mt-1", styles.accordion, isOpen && styles.accordionOpen)}
                      >
                        <div className={styles.accordionInner}>
                          <div className="pt-3 text-sm leading-relaxed text-text-secondary">{area.description}</div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Right column: contextual content */}
          <div className="hidden md:block">
            <div className="relative min-h-[220px] rounded-2xl border border-white/10 bg-surface-alt/10 backdrop-blur-sm p-8">
              {valueAreas.map((area, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={area.id}
                    id={`value-panel-${area.id}`}
                    role="tabpanel"
                    aria-labelledby={`value-tab-${area.id}`}
                    aria-hidden={!isActive}
                    className={cn(styles.panel, isActive && styles.panelActive)}
                  >
                    <div className="flex items-start justify-between gap-8">
                      <div className="min-w-0">
                        <div className="font-mono text-xs tracking-widest text-text-secondary/70">{area.index}</div>
                        <h3 className="mt-3 text-2xl font-display tracking-tight">{area.title}</h3>
                      </div>
                      <div className="hidden lg:block font-mono text-xs tracking-widest uppercase text-text-secondary/55">
                        Active
                      </div>
                    </div>

                    <p className="mt-6 text-base leading-relaxed text-text-secondary max-w-2xl">
                      {area.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 font-mono text-[11px] tracking-widest uppercase text-text-secondary/55">
              Use ↑/↓ to navigate
            </div>
          </div>

          {/* Mobile: a subtle hint below the list */}
          <div className="md:hidden font-mono text-[11px] tracking-widest uppercase text-text-secondary/55">
            Tap to expand
          </div>
        </div>
      </div>
    </section>
  );
}
