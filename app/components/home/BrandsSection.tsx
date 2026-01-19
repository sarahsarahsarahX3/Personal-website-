"use client";

type Brand = {
  name: string;
  logoSrc: string;
};

const brands: Brand[] = [
  { name: "Discovery Channel", logoSrc: "/1.png" },
  { name: "USA Network", logoSrc: "/2.png" },
  { name: "Bell Media", logoSrc: "/3.png" },
  { name: "L’Oréal", logoSrc: "/4.png" },
  { name: "P&G Beauty", logoSrc: "/5.png" },
  { name: "P&G", logoSrc: "/6.png" },
  { name: "SalonCentric", logoSrc: "/7.png" },
  { name: "New York Fashion Week", logoSrc: "/8.png" },
];

function BrandMark({ brand }: { brand: Brand }) {
  return (
    <li className="group relative w-full">
      <div
        className={
          "relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#f6f6f6] px-6 py-6 " +
          "shadow-[0_0_0_1px_rgba(0,0,0,0.06)] transition-transform duration-300 group-hover:-translate-y-0.5"
        }
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_30%,rgba(255,255,255,0.75),rgba(255,255,255,0))] opacity-70"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:28px_28px]" />

        <img
          src={brand.logoSrc}
          alt={`${brand.name} logo`}
          loading="lazy"
          decoding="async"
          className="relative block h-10 md:h-11 w-auto max-w-full object-contain opacity-90 mix-blend-multiply"
        />
      </div>
    </li>
  );
}

export function BrandsSection() {
  return (
    <section id="brands" aria-labelledby="brands-title" className="py-24 md:py-32 lg:py-36">
      <div className="mx-auto w-full max-w-6xl px-6">
        <header className="max-w-3xl mx-auto text-center">
          <h2
            id="brands-title"
            className="text-xl md:text-2xl font-display tracking-tight text-text-secondary/60"
          >
            Working With Industry Leaders
          </h2>
        </header>

        <div className="mt-12 rounded-3xl border border-white/10 bg-surface-alt/10 p-4 md:p-6">
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 items-stretch">
            {brands.map((brand) => (
              <BrandMark key={brand.name} brand={brand} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
