import type { LucideIcon } from "lucide-react";
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
  return (
    <section className="relative border-t border-white/10 py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-15%] top-[-25%] h-[520px] w-[520px] rounded-full bg-accent/7 blur-3xl" />
        <div className="absolute right-[-10%] top-[20%] h-[460px] w-[460px] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        <header className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-display animate-fade-in-up">Where I Create Value</h2>
            <p className="mt-4 text-text-secondary text-lg text-balance animate-fade-in-up delay-100">
              Core competencies that translate creative ideas into measurable growth.
            </p>
          </div>
          <div aria-hidden="true" />
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {valueItems.map((item, index) => (
            <div
              key={item.title}
              className="group relative h-full rounded-2xl p-[1px] transition will-change-transform hover:-translate-y-1"
            >
              {/* Thin animated border/glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/0 via-accent/35 to-accent/0 bg-[length:200%_100%] bg-[position:0%_0%] opacity-0 transition-[opacity,background-position] duration-500 group-hover:opacity-100 group-hover:bg-[position:100%_0%]" />

              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
                <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-accent/10 blur-2xl" />
              </div>

              <div className="relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface-alt/20 p-7 transition-colors duration-300 group-hover:border-accent/30">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="font-mono text-xs tracking-widest text-text-secondary/70">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-text-secondary/70">
                      Core Skill
                    </div>
                  </div>
                  <div className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-surface/40 transition-colors duration-300 group-hover:border-accent/40">
                    <item.Icon className="h-4 w-4 text-text-secondary/80 transition duration-300 group-hover:scale-110 group-hover:text-accent" />
                  </div>
                </div>

                <h3 className="mt-4 text-xl font-medium tracking-tight">{item.title}</h3>
                <p className="mt-3 line-clamp-4 text-text-secondary leading-relaxed">{item.description}</p>

                <div className="mt-auto pt-6">
                  <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
