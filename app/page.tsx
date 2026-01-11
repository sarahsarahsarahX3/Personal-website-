import { Hero } from "@/app/components/home/Hero";
import { FlowField } from "@/app/components/lab/FlowField";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-surface text-text-primary">
      <FlowField particleCount={120} connectDistance={85} interactionRadius={120} trailOpacity={0.07} className="opacity-50" />
      <div className="relative z-10 min-h-[200vh]"> {/* Added height for scroll testing */}
        <Hero />
        <div className="h-screen flex items-center justify-center border-t border-white/10">
          <h2 className="text-4xl font-display">Selected Work Placeholder</h2>
        </div>
      </div>
    </main>
  );
}
