"use client";

import { useState } from "react";

type Brand = {
  name: string;
  logoSrc: string;
};

const brands: Brand[] = [
  { name: "Discovery Channel", logoSrc: "/images/brands/discovery-channel.svg" },
  { name: "USA Network", logoSrc: "/images/brands/usa-network.svg" },
  { name: "Bell Media", logoSrc: "/images/brands/bell-media.svg" },
  { name: "L’Oréal", logoSrc: "/images/brands/loreal.svg" },
  { name: "SalonCentric", logoSrc: "/images/brands/saloncentric.svg" },
  { name: "New York Fashion Week", logoSrc: "/images/brands/new-york-fashion-week.svg" },
  { name: "P&G", logoSrc: "/images/brands/pg.svg" },
  { name: "P&G Beauty", logoSrc: "/images/brands/pg-beauty.svg" },
];

function BrandTile({ brand }: { brand: Brand }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface-alt/20 p-6 transition will-change-transform hover:-translate-y-1 hover:border-accent/30">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
        <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-accent/10 blur-2xl" />
        <div className="absolute inset-0 opacity-[0.14] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:100%_14px]" />
      </div>

      <div className="relative flex h-16 items-center justify-center">
        {!hasError ? (
          <img
            src={brand.logoSrc}
            alt={`${brand.name} logo`}
            loading="lazy"
            decoding="async"
            className="max-h-10 w-auto max-w-full opacity-85 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="text-center">
            <div className="text-sm font-mono tracking-widest uppercase text-text-secondary/70">
              Brand
            </div>
            <div className="mt-1 text-lg font-medium tracking-tight text-text-primary">{brand.name}</div>
          </div>
        )}
      </div>

      <div className="mt-6 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
    </div>
  );
}

export function BrandsSection() {
  return (
    <section className="relative border-t border-white/10 py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-12%] top-[10%] h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute right-[-15%] top-[-20%] h-[560px] w-[560px] rounded-full bg-accent/8 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        <header className="mb-12 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display animate-fade-in-up">
            Working With Industry Leaders
          </h2>
          <p className="mt-4 text-text-secondary text-lg text-balance animate-fade-in-up delay-100">
            A selection of brands and platforms I’ve supported across entertainment, beauty, and retail.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {brands.map((brand) => (
            <BrandTile key={brand.name} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}

