"use client";

const HIGHLIGHTS = [
  { value: "7+", label: "Years of Experience" },
  { value: "3", label: "Fortune 500 Brands" },
  { value: "80+", label: "Brand Collaborations" },
  { value: "1M+", label: "Views Generated" },
  { value: "50+", label: "Campaigns and Product Launches" },
] as const;

export function KeyHighlightsSection() {
  return (
    <section aria-labelledby="key-highlights-title" className="pt-8 pb-8 md:pt-10 md:pb-10 lg:pt-12 lg:pb-12">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="rounded-3xl border border-white/10 bg-surface-alt/10 px-5 py-6 md:px-7 md:py-8 lg:px-8 lg:py-9">
          <header className="mb-6 md:mb-7 lg:mb-8">
            <h2
              id="key-highlights-title"
              className="text-sm md:text-base font-display uppercase tracking-[0.16em] text-text-secondary/90"
            >
              Key Highlights
            </h2>
          </header>

          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-5 lg:gap-4">
            {HIGHLIGHTS.map((item) => (
              <li
                key={item.label}
                className="rounded-2xl border border-white/10 bg-surface/25 px-4 py-4 md:px-5 md:py-5 lg:min-h-[148px]"
              >
                <p className="font-display text-3xl md:text-4xl tracking-tight leading-none text-text-primary">{item.value}</p>
                <p className="mt-3 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.17em] leading-relaxed text-text-secondary/75">
                  {item.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
