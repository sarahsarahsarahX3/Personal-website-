const valueItems = [
  {
    title: "Content Strategy",
    description: "Plans content ecosystems that ladder up to business goals and earn attention across channels.",
  },
  {
    title: "Integrated Campaigns",
    description: "Builds cohesive launches across paid, owned, and earned touchpoints—aligned, timed, and measurable.",
  },
  {
    title: "SEO + Search Strategy",
    description: "Creates search-led content that answers real questions and compounds traffic over time.",
  },
  {
    title: "Copywriting + Editorial",
    description: "Writes with voice, clarity, and conversion in mind—from headlines to long-form storytelling.",
  },
  {
    title: "Brand Storytelling",
    description: "Turns product truths into narratives that feel human, memorable, and culturally relevant.",
  },
  {
    title: "Performance Analytics",
    description: "Measures what matters, reads the signals, and turns data into next-step decisions.",
  },
  {
    title: "Audience + Insights",
    description: "Maps audiences, behaviors, and motivations to sharpen messaging and creative direction.",
  },
  {
    title: "Content Operations",
    description: "Designs workflows, calendars, and systems that keep production consistent and scalable.",
  },
  {
    title: "Partnerships + Influence",
    description: "Activates creators, stakeholders, and partners to extend reach and credibility.",
  },
];

export function ValueSection() {
  return (
    <section className="border-t border-white/10 py-20">
      <div className="container mx-auto px-6">
        <header className="mb-12 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display animate-fade-in-up">Where I Create Value</h2>
          <p className="mt-4 text-text-secondary text-lg text-balance animate-fade-in-up delay-100">
            Core competencies that translate creative ideas into measurable growth.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {valueItems.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface-alt/20 p-7 transition will-change-transform hover:-translate-y-1 hover:border-accent/40"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
                <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-accent/10 blur-2xl" />
              </div>

              <div className="relative">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-accent/80" />
                  <span className="text-xs uppercase tracking-[0.2em] text-text-secondary/80">
                    Core Skill
                  </span>
                </div>

                <h3 className="text-xl font-medium tracking-tight">{item.title}</h3>
                <p className="mt-3 text-text-secondary leading-relaxed">{item.description}</p>

                <div className="mt-6 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
