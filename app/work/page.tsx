import { getAllFilesFrontMatter } from "@/app/lib/mdx";
import { WorkBrowser } from "@/app/components/work/WorkBrowser";

type WorkProject = {
    title: string;
    category: string;
    image?: string;
    size?: "large" | "small" | "tall";
    slug: string;
    tags?: string[];
    year?: string;
    description?: string;
};

export default async function WorkPage() {
    const workFiles = await getAllFilesFrontMatter("work");

    // Serialize/Map data
    const projects: WorkProject[] = workFiles.map((file: any) => ({
        title: file.title,
        category: file.category,
        image: file.heroImage,
        size: (file.size ?? "small") as WorkProject["size"],
        slug: file.slug,
        tags: file.tags,
        year: file.year,
        description: file.description,
    }));

    projects.unshift({
        title: "Procter & Gamble HairCode",
        category: "SEO & AEO",
        image: "/images/P%26G.jpg",
        size: "large",
        slug: "p-and-g-beauty-content-hub",
        tags: ["SEO & AEO", "Content Strategy", "Copywriting", "Brand Storytelling"],
        description:
            "SEO-led editorial growth program for HairCode, Procter & Gamble Beauty’s brand-owned content hub.",
    });

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
