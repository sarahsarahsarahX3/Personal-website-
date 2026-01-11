"use client";

import { motion } from "framer-motion";

type ImpactStat = {
  value: string;
  label: string;
  detail?: string;
};

const stats: ImpactStat[] = [
  { value: "7+", label: "Years experience" },
  { value: "3", label: "Fortune 500 brands" },
  { value: "300K+", label: "Monthly organic readers reached" },
  { value: "1M+", label: "Impressions across campaigns + editorial" },
  { value: "300+", label: "Editorial assets published" },
  { value: "150+", label: "Countries reached via global distribution" },
];

export function ImpactSection() {
  return (
    <section id="impact" className="relative border-t border-white/10 py-20">
      {/* Techy grid + glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.18] [mask-image:radial-gradient(circle_at_30%_20%,black,transparent_70%)] bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -right-24 top-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.header
          className="mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-display">Impact Metrics</h2>
          <p className="mt-4 text-text-secondary text-lg text-balance">
            Measurable outcomes across editorial, campaigns, and growth.
          </p>
        </motion.header>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface-alt/20 p-5 transition will-change-transform hover:-translate-y-1 hover:border-accent/30"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.65,
                delay: index * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent/10 blur-2xl" />
              </div>

              <div className="relative">
                <div className="font-mono text-4xl md:text-5xl lg:text-4xl xl:text-5xl leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-text-secondary/55">
                  {stat.value}
                </div>

                <div className="mt-4 text-xs font-mono tracking-widest uppercase text-text-secondary/80">
                  {stat.label}
                </div>

                {stat.detail ? (
                  <div className="mt-3 text-text-secondary leading-relaxed">{stat.detail}</div>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
