import { getAllFilesFrontMatter } from "@/app/lib/mdx";
import { WorkBrowser } from "@/app/components/work/WorkBrowser";
import { motion } from "framer-motion";
// Note: Can't use motion in server component directly for exit animations usually, 
// but we just need standard HTML for the header here, or use a client wrapper for the header if we want animation.
// Actually, let's just make the whole header static for now or client component if needed. 
// For simplicity, I'll move the header INTO the WorkBrowser or keep it separate as a client component.
// Let's Import a client-side Header wrapper if we really need the animation, 
// OR just move the whole Header into WorkBrowser. Moving it into WorkBrowser is cleaner for layout animations.

export default async function WorkPage() {
    const workFiles = await getAllFilesFrontMatter("work");

    // Serialize/Map data
    const projects = workFiles.map((file: any) => ({
        title: file.title,
        category: file.category,
        image: file.heroImage,
        size: file.size || "small",
        slug: file.slug,
        tags: file.tags,
    }));

    return (
        <main className="min-h-screen pt-32 pb-40 px-6">
            <div className="container mx-auto">
                <header className="mb-12">
                    <h1 className="text-6xl md:text-8xl font-display mb-6 animate-fade-in-up">
                        Selected Work
                    </h1>
                    <p className="text-text-secondary text-xl max-w-xl animate-fade-in-up delay-200">
                        A curation of campaigns, strategies, and digital experiences that moved the needle and defined culture.
                    </p>
                </header>

                <WorkBrowser projects={projects} />
            </div>
        </main>
    );
}
