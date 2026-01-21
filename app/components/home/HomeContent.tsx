"use client";

import { Hero } from "@/app/components/home/Hero";
import { SectionTransition } from "@/app/components/home/SectionTransition";
import { BioSection } from "@/app/components/home/BioSection";
import { BrandsSection } from "@/app/components/home/BrandsSection";
import { HomeFooter } from "@/app/components/home/HomeFooter";

export function HomeContent() {
  return (
    <main className="bg-surface text-text-primary min-h-[200vh]">
      <Hero />
      <BioSection />
      <SectionTransition>
        <BrandsSection />
      </SectionTransition>
      <HomeFooter />
    </main>
  );
}
