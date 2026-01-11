import { Hero } from "@/app/components/home/Hero";
import { ValueSection } from "@/app/components/home/ValueSection";
import { BrandsSection } from "@/app/components/home/BrandsSection";
import { WorkTeaserSection } from "@/app/components/home/WorkTeaserSection";

export default function Home() {
  return (
    <main className="bg-surface text-text-primary min-h-screen">
      <Hero />
      <ValueSection />
      <BrandsSection />
      <WorkTeaserSection />
    </main>
  );
}
