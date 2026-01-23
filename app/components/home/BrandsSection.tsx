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
          "h-[176px] sm:h-[184px] md:h-[204px] lg:h-[224px]",
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
            "block w-auto max-w-[94%] object-contain",
            "h-28 sm:h-28 md:h-32 lg:h-36",
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
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const section = document.getElementById("brands");
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setIsInView(true);
      },
      { rootMargin: "-15% 0px -45% 0px", threshold: [0, 0.1, 0.2] },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="brands"
      aria-labelledby="brands-title"
      className="pt-20 pb-36 md:pt-24 md:pb-44 lg:pt-28 lg:pb-48"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <header
          className={cn(
            "max-w-3xl mx-auto text-center",
            "will-change-transform will-change-opacity",
            "transition-[opacity,transform] duration-1000 ease-out",
            reducedMotion ? "transition-opacity duration-700" : "",
            isInView ? "opacity-100 translate-y-0" : reducedMotion ? "opacity-0" : "opacity-0 translate-y-6",
          )}
        >
          <h2
            id="brands-title"
            className="text-3xl md:text-3xl font-display tracking-tight text-text-primary/90"
          >
            Working with Industry Leaders
          </h2>
        </header>

        <div
          className={cn(
            "mt-8 md:mt-10 rounded-3xl bg-surface-alt/10 p-4 md:p-6",
            "will-change-transform will-change-opacity",
            "transition-[opacity,transform] duration-1000 ease-out delay-150",
            reducedMotion ? "transition-opacity duration-700 delay-100" : "",
            isInView ? "opacity-100 translate-y-0" : reducedMotion ? "opacity-0" : "opacity-0 translate-y-6",
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
