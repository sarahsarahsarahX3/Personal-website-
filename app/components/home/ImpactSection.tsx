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
    <section className="relative border-t border-white/10 py-20">
      {/* Techy grid + glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.18] [mask-image:radial-gradient(circle_at_30%_20%,black,transparent_70%)] bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -right-24 top-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        <header className="mb-12 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display animate-fade-in-up">Impact By The Numbers</h2>
          <p className="mt-4 text-text-secondary text-lg text-balance animate-fade-in-up delay-100">
            Measurable outcomes across editorial, campaigns, and growth.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface-alt/20 p-7 transition will-change-transform hover:-translate-y-1 hover:border-accent/30"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent/10 blur-2xl" />
              </div>

              <div className="relative">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="font-mono text-xs tracking-widest text-text-secondary/70">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-4 text-5xl md:text-6xl font-mono leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-text-secondary/50">
                      {stat.value}
                    </div>
                  </div>

                  <div className="mt-1 h-9 w-9 rounded-full border border-white/10 bg-surface/40 transition-colors duration-300 group-hover:border-accent/40">
                    <div className="h-full w-full rounded-full bg-[conic-gradient(from_180deg,rgba(255,59,48,0.55),rgba(255,255,255,0.12),rgba(255,59,48,0.55))] opacity-0 blur-[0.5px] transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </div>

                <div className="mt-5 text-sm font-mono tracking-widest uppercase text-text-secondary/80">
                  {stat.label}
                </div>

                {stat.detail ? (
                  <div className="mt-3 text-text-secondary leading-relaxed">{stat.detail}</div>
                ) : null}

                <div className="mt-6 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

