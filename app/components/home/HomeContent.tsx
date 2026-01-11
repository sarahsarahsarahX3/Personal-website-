"use client";

import { Hero } from "@/app/components/home/Hero";
import { SectionTransition } from "@/app/components/home/SectionTransition";
import { CoreSkillsSection } from "@/app/components/home/CoreSkillsSection";

export function HomeContent() {
  return (
    <main className="bg-surface text-text-primary min-h-[200vh]">
      <Hero />
      <SectionTransition>
        <CoreSkillsSection />
      </SectionTransition>
      <SectionTransition className="h-screen flex items-center justify-center">
        <h2 className="text-4xl font-display">Selected Work Placeholder</h2>
      </SectionTransition>
    </main>
  );
}
