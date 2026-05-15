"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Activity, BriefcaseBusiness, Building2, Megaphone, Sparkles } from "lucide-react";

const HIGHLIGHTS = [
  { key: "years", value: "7+", label: "Years of Experience" },
  { key: "fortune", value: "3", label: "Fortune 500 Brands" },
  { key: "collab", value: "80+", label: "Brand Collaborations" },
  { key: "views", value: "1M+", label: "Views Generated" },
  { key: "campaigns", value: "50+", label: "Campaigns and Product Launches" },
] as const;

export function KeyHighlightsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="key-highlights-title" className="pt-8 pb-10 md:pt-16 md:pb-16 lg:pt-20 lg:pb-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="rounded-3xl bg-surface-alt/10 px-2 py-2 md:px-3 md:py-3">
          <header className="mb-5 px-3 pt-3 md:mb-10 md:px-5 md:pt-5 lg:mb-12">
            <h2
              id="key-highlights-title"
              className="text-[13px] md:text-base font-display uppercase tracking-[0.16em] text-text-secondary/90"
            >
              Key Highlights:
            </h2>
          </header>

          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-5 lg:gap-5">
            {HIGHLIGHTS.map((item, index) => {
              const Icon =
                item.key === "years"
                  ? BriefcaseBusiness
                  : item.key === "fortune"
                    ? Building2
                    : item.key === "collab"
                      ? Sparkles
                      : item.key === "views"
                        ? Activity
                        : Megaphone;

              return (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                className="group relative overflow-hidden rounded-2xl bg-surface/20 px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 lg:min-h-[168px] before:pointer-events-none before:absolute before:inset-x-5 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-accent/55 before:to-transparent"
              >
                <div className="flex items-start gap-3 sm:block sm:text-center">
                  <div className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center sm:h-14 sm:w-14 md:h-16 md:w-16">
                    {reduceMotion ? null : (
                      <>
                        <motion.svg
                          viewBox="0 0 64 64"
                          className="pointer-events-none absolute inset-0 h-full w-full"
                          initial={{ pathLength: 0, opacity: 0.25 }}
                          whileInView={{ pathLength: 1, opacity: 0.7 }}
                          viewport={{ once: true, amount: 0.5 }}
                          transition={{ duration: 0.75, delay: 0.14 + index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                        >
                          <motion.circle
                            cx="32"
                            cy="32"
                            r="29"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            className="text-text-secondary/40"
                            strokeLinecap="round"
                          />
                        </motion.svg>
                        <motion.span
                          className="pointer-events-none absolute inset-0 rounded-full border border-accent/45"
                          initial={{ opacity: 0, scale: 0.85 }}
                          whileHover={{ opacity: [0, 0.5, 0], scale: [0.85, 1.18, 1.28] }}
                          transition={{ duration: 0.65, ease: "easeOut" }}
                        />
                      </>
                    )}
                    <motion.span
                      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface/45 text-accent/85 sm:h-12 sm:w-12 md:h-14 md:w-14"
                      initial={reduceMotion ? undefined : { opacity: 0, scale: 0.88 }}
                      whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.45, delay: 0.2 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={reduceMotion ? undefined : { scale: 1.06 }}
                    >
                      <Icon size={20} className="sm:hidden" />
                      <Icon size={26} className="hidden sm:block" />
                    </motion.span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-2xl leading-none tracking-tight text-text-primary sm:mt-5 sm:text-3xl md:text-4xl">
                      {item.value}
                    </p>
                    <p className="mt-2 text-[10px] font-mono uppercase tracking-[0.16em] leading-relaxed text-text-secondary/75 md:text-[11px]">
                      {item.label}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
          </ul>
        </div>
      </div>
    </section>
  );
}
