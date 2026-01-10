import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  ChevronDown,
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
  capabilities: [string, string, string];
  Icon: LucideIcon;
  details: [string, string, string];
};

const valueItems: ValueItem[] = [
  {
    title: "Content Strategy",
    description: "Plans content ecosystems that ladder up to business goals and earn attention across channels.",
    capabilities: ["Messaging", "Roadmaps", "Channel Mix"],
    Icon: Compass,
    details: ["Content pillars + channel roles", "Editorial calendar + cadence", "KPIs + measurement plan"],
  },
  {
    title: "Integrated Campaigns",
    description: "Builds cohesive launches across paid, owned, and earned touchpoints—aligned, timed, and measurable.",
    capabilities: ["Paid/Owned/Earned", "Launch Planning", "Creative Systems"],
    Icon: Megaphone,
    details: ["Campaign architecture + sequencing", "Creative briefs + asset system", "Optimization + reporting loop"],
  },
  {
    title: "SEO + Search Strategy",
    description: "Creates search-led content that answers real questions and compounds traffic over time.",
    capabilities: ["Keyword Strategy", "On-Page SEO", "Search Intent"],
    Icon: Search,
    details: ["Intent mapping + topic clusters", "On-page structure + internal links", "Refresh strategy + updates"],
  },
  {
    title: "Copywriting + Editorial",
    description: "Writes with voice, clarity, and conversion in mind—from headlines to long-form storytelling.",
    capabilities: ["Editorial Voice", "Conversion Copy", "Narrative Arc"],
    Icon: PenLine,
    details: ["Voice + tone guidelines", "Headlines + CTAs + flows", "Long-form features + interviews"],
  },
  {
    title: "Brand Storytelling",
    description: "Turns product truths into narratives that feel human, memorable, and culturally relevant.",
    capabilities: ["Positioning", "Brand Voice", "Concepting"],
    Icon: Sparkles,
    details: ["Narrative territories + angles", "Messaging framework + proof points", "Launch storytelling toolkit"],
  },
  {
    title: "Performance Analytics",
    description: "Measures what matters, reads the signals, and turns data into next-step decisions.",
    capabilities: ["Dashboards", "Insights", "Testing"],
    Icon: BarChart3,
    details: ["Dashboards + KPI definitions", "Insights cadence + recommendations", "Testing plan + learnings"],
  },
  {
    title: "Audience + Insights",
    description: "Maps audiences, behaviors, and motivations to sharpen messaging and creative direction.",
    capabilities: ["Personas", "Segmentation", "Research"],
    Icon: Users,
    details: ["Audience segments + personas", "Journey mapping + pain points", "Insights to creative direction"],
  },
  {
    title: "Content Operations",
    description: "Designs workflows, calendars, and systems that keep production consistent and scalable.",
    capabilities: ["Calendars", "Workflow", "Governance"],
    Icon: Kanban,
    details: ["Workflow + approvals system", "Templates + content governance", "Tooling + process optimization"],
  },
  {
    title: "Partnerships + Influence",
    description: "Activates creators, stakeholders, and partners to extend reach and credibility.",
    capabilities: ["Creator Strategy", "Partnership Ops", "Amplification"],
    Icon: Share2,
    details: ["Partner fit + outreach", "Briefing + execution support", "Amplification + measurement"],
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
          <div className="text-xs font-mono tracking-widest text-text-secondary/70 uppercase animate-fade-in-up delay-200">
            Tap a card to expand
          </div>
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

              <details className="group/details relative h-full min-h-[220px] overflow-hidden rounded-2xl border border-white/10 bg-surface-alt/20 transition-colors duration-300 group-hover:border-accent/30 open:bg-surface-alt/30">
                <summary className="list-none cursor-pointer select-none p-7">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="font-mono text-xs tracking-widest text-text-secondary/70">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-text-secondary/70">
                        Core Skill
                      </div>
                      <h3 className="mt-4 text-xl font-medium tracking-tight">{item.title}</h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-surface/40 transition-colors duration-300 group-hover:border-accent/40">
                        <item.Icon className="h-4 w-4 text-text-secondary/80 transition duration-300 group-hover:scale-110 group-hover:text-accent" />
                      </div>
                      <ChevronDown className="mt-1 h-4 w-4 text-text-secondary/70 transition-transform duration-300 group-open/details:rotate-180" />
                    </div>
                  </div>
                </summary>

                <div className="px-7 pb-7">
                  <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

                  <p className="mt-5 text-text-secondary leading-relaxed">{item.description}</p>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div className="text-sm text-text-secondary leading-relaxed">
                      <div className="font-mono text-xs tracking-widest text-text-secondary/70">Capabilities</div>
                      <ul className="mt-3 space-y-2">
                        {item.capabilities.map((capability) => (
                          <li key={capability} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/25" />
                            <span>{capability}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-sm text-text-secondary leading-relaxed">
                      <div className="font-mono text-xs tracking-widest text-text-secondary/70">Includes</div>
                      <ul className="mt-3 space-y-2">
                        {item.details.map((detail) => (
                          <li key={detail} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
