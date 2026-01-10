"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function WorkTeaserSection() {
  return (
    <section className="relative border-t border-white/10 py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[30%] h-[520px] w-[520px] rounded-full bg-accent/8 blur-3xl" />
        <div className="absolute right-[-12%] top-[-20%] h-[560px] w-[560px] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          className="rounded-3xl border border-white/10 bg-surface-alt/20 p-10 md:p-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="font-mono text-xs tracking-widest text-text-secondary/70 uppercase">
                Selected projects
              </div>
              <h2 className="mt-4 text-4xl md:text-5xl font-display">Explore the work</h2>
              <p className="mt-4 text-text-secondary text-lg text-balance">
                Campaigns, content strategy, and digital storytelling—built for clarity, culture, and measurable growth.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/work"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm tracking-wide text-text-primary transition-colors hover:border-accent/40 hover:bg-white/8"
              >
                View projects
              </Link>
            </div>
          </div>

          <div className="mt-10 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

          <div className="mt-6 flex flex-wrap gap-3 text-xs font-mono tracking-widest uppercase text-text-secondary/70">
            <span className="rounded-full border border-white/10 bg-surface/30 px-3 py-1">Campaigns</span>
            <span className="rounded-full border border-white/10 bg-surface/30 px-3 py-1">Content strategy</span>
            <span className="rounded-full border border-white/10 bg-surface/30 px-3 py-1">SEO + AEO</span>
            <span className="rounded-full border border-white/10 bg-surface/30 px-3 py-1">Copywriting</span>
            <span className="rounded-full border border-white/10 bg-surface/30 px-3 py-1">Brand storytelling</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

