"use client";

import { useEffect, useState } from "react";
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
          "h-[156px] sm:h-[160px] md:h-[176px] lg:h-[192px]",
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
            "block w-auto max-w-[92%] object-contain",
            "h-24 sm:h-24 md:h-28 lg:h-32",
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
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReduced) {
      setIsInView(true);
      return;
    }

    const section = document.getElementById("brands");
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setIsInView(true);
      },
      { rootMargin: "-10% 0px -30% 0px", threshold: [0, 0.15] },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="brands" aria-labelledby="brands-title" className="pt-10 pb-28 md:pt-14 md:pb-36 lg:pt-16 lg:pb-40">
      <div className="mx-auto w-full max-w-6xl px-6">
        <header
          className={cn(
            "max-w-3xl mx-auto text-center",
            "transition-[opacity,transform] duration-700 ease-out",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          )}
        >
          <h2
            id="brands-title"
            className="text-xl md:text-2xl font-display tracking-tight text-text-secondary/70"
          >
            Working with Industry Leaders
          </h2>
        </header>

        <div
          className={cn(
            "mt-8 md:mt-10 rounded-3xl bg-surface-alt/10 p-4 md:p-6",
            "transition-[opacity,transform] duration-700 ease-out delay-150",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          )}
        >
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
