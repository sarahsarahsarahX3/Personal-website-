"use client";

import { Hero } from "@/app/components/home/Hero";
import { SectionTransition } from "@/app/components/home/SectionTransition";
import { CoreSkillsSection } from "@/app/components/home/CoreSkillsSection";
import { BioSection } from "@/app/components/home/BioSection";
import { BrandsSection } from "@/app/components/home/BrandsSection";

export function HomeContent() {
  return (
    <main className="bg-surface text-text-primary min-h-[200vh]">
      <Hero />
      <BioSection />
      <SectionTransition>
        <CoreSkillsSection />
      </SectionTransition>
      <SectionTransition>
        <BrandsSection />
      </SectionTransition>
      <SectionTransition className="h-screen flex items-center justify-center">
        <h2 className="text-4xl font-display">Selected Work Placeholder</h2>
      </SectionTransition>
    </main>
  );
}
