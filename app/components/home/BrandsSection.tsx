"use client";

import { cn } from "@/app/lib/utils";

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
    <li className="group relative">
      <div
        className={cn(
          "relative flex items-center justify-center",
          "h-[92px] sm:h-[110px] md:h-[124px] lg:h-[136px]",
          "rounded-2xl border border-white/10 bg-surface-alt/10",
          "transition-colors duration-300",
          "hover:border-white/20 hover:bg-white/[0.06]",
        )}
      >
        <img
          src={brand.logoSrc}
          alt={`${brand.name} logo`}
          loading="lazy"
          decoding="async"
          className={cn(
            "block w-auto max-w-[86%] object-contain",
            "h-12 sm:h-14 md:h-16 lg:h-20",
            "opacity-70 transition-[opacity,filter,transform] duration-300",
            "grayscale brightness-125 contrast-125 invert",
            "group-hover:opacity-100 group-hover:brightness-150 group-hover:contrast-150 group-hover:scale-[1.02]",
          )}
        />

        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 rounded-2xl",
            "opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            "bg-[radial-gradient(65%_60%_at_50%_40%,rgba(255,255,255,0.08),rgba(0,0,0,0))]",
          )}
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
            className="text-xl md:text-2xl font-display tracking-tight text-text-secondary/70"
          >
            Working With Industry Leaders
          </h2>
        </header>

        <div className="mt-12 rounded-3xl bg-surface-alt/10 p-4 md:p-6">
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {brands.map((brand) => (
              <BrandMark key={brand.name} brand={brand} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
