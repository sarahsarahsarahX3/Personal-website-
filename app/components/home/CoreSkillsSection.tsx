"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  FileText,
  FlaskConical,
  Megaphone,
  PenLine,
  Search,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { cn } from "@/app/lib/utils";

type Skill = {
  key: string;
  name: string;
  blurb: string;
  Icon: LucideIcon;
};

const skills: Skill[] = [
  {
    key: "brand-storytelling",
    name: "Brand Storytelling",
    blurb: "Craft clear, compelling narratives that connect brand, audience, and purpose across marketing touchpoints.",
    Icon: Sparkles,
  },
  {
    name: "SEO + AEO Strategy",
    blurb: "Develop and optimize content strategies that improve discoverability, search visibility, and audience growth across traditional and AI-driven search.",
    Icon: Search,
    key: "seo-aeo",
  },
  {
    key: "integrated-marketing-campaigns",
    name: "Integrated Marketing Campaigns",
    blurb: "Develop content that supports brand growth, customer engagement, integrated campaigns, product launches, and seasonal initiatives.",
    Icon: Megaphone,
  },
  {
    key: "copywriting",
    name: "Copywriting",
    blurb: "Write and optimize conversion-focused copy across digital channels, aligning messaging with brand strategy, audience intent, and campaign objectives.",
    Icon: PenLine,
  },
  {
    key: "editorial-governance",
    name: "Editorial Governance",
    blurb: "Define editorial standards and steward brand voice to ensure consistency, quality, and clarity at scale.",
    Icon: FileText,
  },
  {
    key: "performance-marketing",
    name: "Performance Marketing",
    blurb: "Apply data and performance insights to optimize content, campaigns, and messaging for engagement, conversion, and measurable results.",
    Icon: Target,
  },
  {
    key: "subject-matter-expertise",
    name: "Subject-Matter Expertise",
    blurb: "Translate expert insight into accurate, on-brand content across beauty, health, technology, and science.",
    Icon: FlaskConical,
  },
  {
    key: "cross-functional-collaboration",
    name: "Cross-Functional Collaboration",
    blurb: "Partner across marketing, design, product, and education teams to deliver content at scale.",
    Icon: Users,
  },
];

export function CoreSkillsSection() {
  const [activeKey, setActiveKey] = useState(skills[0]?.key ?? "");
  const active = useMemo(() => skills.find((s) => s.key === activeKey) ?? skills[0]!, [activeKey]);

  return (
    <div className="relative py-28 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-18%] top-[-25%] h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute right-[-18%] top-[10%] h-[520px] w-[520px] rounded-full bg-accent/8 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-end justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-display">Where I Create Value</h2>
            </div>
            <div className="hidden md:block font-mono text-xs tracking-widest uppercase text-text-secondary/60">
              Hover to explore
            </div>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[22rem_1fr] lg:items-start">
            <div className="rounded-2xl border border-white/10 bg-surface/40 backdrop-blur-md p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="font-mono text-xs tracking-widest uppercase text-text-secondary/70">
                  Core Skills
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
              </div>

              <div className="mt-6 flex items-start gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
                  <active.Icon className="h-5 w-5 text-accent/90" />
                </div>
                <div>
                  <div className="text-xl font-medium tracking-tight">{active.name}</div>
                  <div className="mt-2 text-text-secondary leading-relaxed">{active.blurb}</div>
                </div>
              </div>

              <div className="mt-8">
                <div className="h-[2px] w-full bg-white/10 overflow-hidden rounded-full">
                  <div
                    className="h-full bg-gradient-to-r from-accent/70 via-white/25 to-accent/70"
                    style={{
                      width: `${Math.min(100, 18 + skills.findIndex((s) => s.key === activeKey) * 9)}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((skill, index) => {
                const isActive = skill.key === activeKey;
                const Icon = skill.Icon;

                return (
                  <motion.button
                    key={skill.key}
                    type="button"
                    onMouseEnter={() => setActiveKey(skill.key)}
                    onFocus={() => setActiveKey(skill.key)}
                    onClick={() => setActiveKey(skill.key)}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "group relative rounded-2xl border border-white/10 bg-surface-alt/10 p-5 text-left",
                      "transition-colors duration-300",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35",
                      isActive && "border-white/15 bg-surface-alt/20",
                      !isActive && "hover:border-white/15 hover:bg-surface-alt/15",
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-mono text-xs tracking-widest text-text-secondary/70">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <div className="mt-3 text-lg font-medium tracking-tight">{skill.name}</div>
                      </div>
                      <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 transition-colors duration-300 group-hover:border-white/15">
                        <Icon className={cn("h-4 w-4 transition-colors duration-300", isActive ? "text-accent/90" : "text-text-secondary/80 group-hover:text-text-primary")} />
                      </div>
                    </div>

                    <div className="pointer-events-none absolute left-5 right-5 bottom-5 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className={cn("pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300", isActive && "opacity-100")}>
                      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent/10 blur-2xl" />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.header>

        <div className="h-10" />
      </div>
    </div>
  );
}
