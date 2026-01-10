import { Hero } from "@/app/components/home/Hero";
import { ValueSection } from "@/app/components/home/ValueSection";
import { ImpactSection } from "@/app/components/home/ImpactSection";
import { BrandsSection } from "@/app/components/home/BrandsSection";

export default function Home() {
  return (
    <main className="bg-surface text-text-primary min-h-screen">
      <Hero />
      <ValueSection />
      <ImpactSection />
      <BrandsSection />
      <div className="h-screen flex items-center justify-center border-t border-white/10">
        <h2 className="text-4xl font-display">Selected Work Placeholder</h2>
      </div>
    </main>
  );
}
