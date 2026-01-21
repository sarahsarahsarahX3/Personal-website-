"use client";

import { Hero } from "@/app/components/home/Hero";
import { SectionTransition } from "@/app/components/home/SectionTransition";
import { BioSection } from "@/app/components/home/BioSection";
import { BrandsSection } from "@/app/components/home/BrandsSection";

export function HomeContent() {
  return (
    <main className="bg-surface text-text-primary min-h-[200vh]">
      <Hero />
      <BioSection />
      <SectionTransition className="mt-16 md:mt-20 lg:mt-24">
        <BrandsSection />
      </SectionTransition>
    </main>
  );
}
