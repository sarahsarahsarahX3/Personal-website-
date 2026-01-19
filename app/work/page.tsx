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
    const projects: WorkProject[] = workFiles
        .filter((file: any) => !["vortex", "lumina"].includes(file.slug))
        .map((file: any) => ({
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
        title: "Discovery Channel × Mighty Cruise Ships",
        category: "Video Production",
        image: "/Mighty%20Cruise%20Ships%20Project%20Thumbnail.png",
        size: "small",
        slug: "discovery-mighty-cruise-ships",
        tags: ["Video Production", "Brand Storytelling"],
        description:
            "Editorial and production support for a Discovery Channel documentary episode featuring the MS Roald Amundsen, the world’s first hybrid-powered expedition cruise ship.",
    });

    projects.splice(3, 0, {
        title: "Discovery Channel × Daily Planet",
        category: "Video Production",
        image: "/images/Discovery%20Channel.png",
        size: "small",
        slug: "discovery-daily-planet",
        tags: ["Video Production", "Brand Storytelling"],
        description:
            "Production and editorial support for Discovery Channel’s flagship science and technology series, delivering fast-turn, multi-segment storytelling in a high-volume newsroom environment.",
    });

    projects.unshift({
        title: "SalonCentric × New York Fashion Week",
        category: "Campaigns",
        image: "/NYFW%20Project%20thumbnail.png",
        size: "small",
        slug: "saloncentric-nyfw",
        tags: ["Campaigns", "Content Strategy", "Copywriting", "Brand Storytelling"],
        year: "2024",
        description:
            "Integrated campaign content production translating a live NYFW activation into coordinated digital, social, and email storytelling.",
    });

    projects.unshift({
        title: "Procter & Gamble x HairCode",
        category: "SEO & AEO",
        image: "/P%26G%20HairCode%20Project%20Thumbnail.png",
        size: "large",
        slug: "p-and-g-beauty-content-hub",
        tags: ["SEO & AEO", "Content Strategy", "Copywriting", "Brand Storytelling"],
        year: "2025",
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
                        A curation of campaigns, strategies, and digital content that moved the needle and defined culture.
                    </p>
                </header>

                <WorkBrowser projects={projects} />
            </div>
        </main>
    );
}
