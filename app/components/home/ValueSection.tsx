"use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Compass,
  Kanban,
  Megaphone,
  PenLine,
  Search,
  Share2,
  Sparkles,
  Users,
} from "lucide-react";

type ValueItem = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

const valueItems: ValueItem[] = [
  {
    title: "Content Strategy",
    description: "Plans content ecosystems that ladder up to business goals and earn attention across channels.",
    Icon: Compass,
  },
  {
    title: "Integrated Campaigns",
    description: "Builds cohesive launches across paid, owned, and earned touchpoints—aligned, timed, and measurable.",
    Icon: Megaphone,
  },
  {
    title: "SEO + AEO",
    description: "Creates search-led content that answers real questions and compounds traffic over time.",
    Icon: Search,
  },
  {
    title: "Copywriting + Editorial",
    description: "Writes with voice, clarity, and conversion in mind—from headlines to long-form storytelling.",
    Icon: PenLine,
  },
  {
    title: "Brand Storytelling",
    description: "Turns product truths into narratives that feel human, memorable, and culturally relevant.",
    Icon: Sparkles,
  },
  {
    title: "Performance Analytics",
    description: "Measures what matters, reads the signals, and turns data into next-step decisions.",
    Icon: BarChart3,
  },
  {
    title: "Audience + Insights",
    description: "Maps audiences, behaviors, and motivations to sharpen messaging and creative direction.",
    Icon: Users,
  },
  {
    title: "Content Operations",
    description: "Designs workflows, calendars, and systems that keep production consistent and scalable.",
    Icon: Kanban,
  },
  {
    title: "Partnerships + Influence",
    description: "Activates creators, stakeholders, and partners to extend reach and credibility.",
    Icon: Share2,
  },
];

export function ValueSection() {
  const [showAll, setShowAll] = useState(false);
  const [expandedTitle, setExpandedTitle] = useState<string | null>(null);
  const signatureTitle = "Brand Storytelling";
  const orderedItems = useMemo(() => {
    const signature = valueItems.find((item) => item.title === signatureTitle);
    const rest = valueItems.filter((item) => item.title !== signatureTitle);
    return signature ? [signature, ...rest] : valueItems;
  }, []);

  const visibleItems = useMemo(
    () => (showAll ? orderedItems : orderedItems.slice(0, 5)),
    [showAll, orderedItems],
  );

  return (
    <section id="value" className="relative border-t border-white/10 py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-15%] top-[-25%] h-[520px] w-[520px] rounded-full bg-accent/7 blur-3xl" />
        <div className="absolute right-[-10%] top-[20%] h-[460px] w-[460px] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.header
          className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-display">Where I Create Value</h2>
          </div>
          <div aria-hidden="true" />
        </motion.header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item, index) => (
            <motion.div
              key={item.title}
              className={[
                "group relative h-full rounded-2xl p-[1px] cursor-pointer transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform transform-gpu hover:-translate-y-1",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-0",
                item.title === signatureTitle ? "lg:col-span-2" : "",
              ].join(" ")}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.65,
                delay: index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() =>
                setExpandedTitle((prev) => (prev === item.title ? null : item.title))
              }
              onMouseLeave={() => setExpandedTitle(null)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setExpandedTitle((prev) => (prev === item.title ? null : item.title));
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={expandedTitle === item.title}
            >
              {/* Thin animated border/glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/0 via-accent/35 to-accent/0 bg-[length:200%_100%] bg-[position:0%_0%] opacity-0 transition-[opacity,background-position] duration-500 group-hover:opacity-100 group-hover:bg-[position:100%_0%]" />

              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
                <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-accent/10 blur-2xl" />
              </div>

              <div
                className={[
                  "relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface-alt/20 p-7 transition-colors duration-300 group-hover:border-accent/30",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="font-mono text-xs tracking-widest text-text-secondary/70">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-text-secondary/70">
                      {item.title === signatureTitle ? "Signature Skill" : "Core Skill"}
                    </div>
                  </div>
                  <div className="relative grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-surface/40 transition-colors duration-300 group-hover:border-accent/40">
                    {/* Icon orbit */}
                    <span className="pointer-events-none absolute -inset-3 rounded-full border border-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="pointer-events-none absolute -inset-3 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:[animation:spin_3.2s_linear_infinite]">
                      <span className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent/70 shadow-[0_0_12px_rgba(255,59,48,0.45)]" />
                    </span>
                    <item.Icon className="h-4 w-4 text-text-secondary/80 transition duration-300 group-hover:scale-110 group-hover:text-accent" />
                  </div>
                </div>

                <div className="mt-4">
                  <h3
                    className={[
                      "text-xl font-medium tracking-tight",
                      item.title === signatureTitle ? "lg:text-2xl" : "",
                    ].join(" ")}
                  >
                    {item.title}
                  </h3>
                  <motion.div
                    className="mt-3 h-px w-10 bg-accent/60 origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>

                <p className="mt-4 line-clamp-1 text-text-secondary leading-relaxed">{item.description}</p>

                {/* Full description reveal on hover (desktop) or tap/click */}
                <div
                  className={[
                    "pointer-events-none absolute inset-0 flex flex-col justify-end p-7 opacity-0 transition-opacity duration-250",
                    "md:group-hover:opacity-100",
                    expandedTitle === item.title ? "opacity-100" : "",
                  ].join(" ")}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/95 via-surface/60 to-transparent" />
                  <div className="relative">
                    <div className="font-mono text-[10px] tracking-widest uppercase text-text-secondary/70">
                      Detail
                    </div>
                    <p className="mt-2 text-sm text-text-secondary leading-relaxed">{item.description}</p>
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-sm tracking-wide text-text-primary transition-colors hover:border-accent/35 hover:bg-white/8"
          >
            {showAll ? "Show fewer skills" : "Show all skills"}
          </button>
        </div>
      </div>
    </section>
  );
}
