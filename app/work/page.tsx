import { getAllFilesFrontMatter } from "@/app/lib/mdx";
import { WorkBrowser } from "@/app/components/work/WorkBrowser";

type WorkProject = {
    title: string;
    category: string;
    image?: string;
    size?: "large" | "small" | "tall";
    slug: string;
    tags?: string[];
    contentTags?: string[];
    brand?: string;
    number?: number;
    filterCategory?: "Campaign" | "Editorial" | "Production" | "Strategy";
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
        title: "Mighty Cruise Ships, “MS Roald Amundsen”",
        brand: "Discovery Channel",
        category: "Multimedia Production",
        image: "/Mighty%20Cruise%20Ships%20Project%20Thumbnail.png",
        size: "small",
        slug: "discovery-mighty-cruise-ships",
        tags: ["Multimedia Production", "Brand Storytelling"],
        contentTags: ["Documentary Production", "Travel Journalism", "Global Audience"],
        number: 3,
        filterCategory: "Production",
        year: "2020",
        description:
            "A documentary featuring the world’s first hybrid-powered cruise ship and its voyage across Antarctica.",
    });

    projects.splice(3, 0, {
        title: "Daily Planet, Season 23",
        brand: "Discovery Channel",
        category: "Multimedia Production",
        image: "/Daily%20Planet%20-%20Future%20Tech%20Week.jpeg",
        size: "small",
        slug: "discovery-daily-planet",
        tags: ["Multimedia Production", "Brand Storytelling"],
        contentTags: ["Science Journalism", "Broadcast Production", "Editorial"],
        number: 4,
        filterCategory: "Production",
        year: "2018",
        description:
            "A television series delivering news and features on science, technology, innovation, wildlife, and environmental discovery.",
    });


    projects.unshift({
        title: "SalonCentric x New York Fashion Week",
        brand: "L’Oréal USA",
        category: "Campaigns",
        image: "/NYFW%20Project%20thumbnail.png",
        size: "small",
        slug: "saloncentric-nyfw",
        tags: ["Campaigns", "Copywriting", "Brand Storytelling"],
        contentTags: ["Editorial", "Brand Journalism", "Cultural Storytelling"],
        number: 2,
        filterCategory: "Campaign",
        year: "2024",
        description:
            "An integrated brand campaign covering a trailblazing cultural event for SalonCentric at NYFW.",
    });

    projects.unshift({
        title: "HairCode Content Hub",
        brand: "Procter & Gamble",
        category: "Content Strategy",
        image: "/HairCode%20thumbnail%204.png",
        size: "large",
        slug: "p-and-g-beauty-content-hub",
        tags: ["Content Strategy", "Copywriting", "Brand Storytelling"],
        contentTags: ["SEO", "AEO", "Editorial", "Service Journalism"],
        number: 1,
        filterCategory: "Strategy",
        year: "2025",
        description:
            "An editorial content hub focused on hair science and product education.",
    });

    projects.push({
        title: "SalonCentric x AANHPI Heritage Month",
        brand: "L’Oréal USA",
        category: "Campaigns",
        image: "/images/Thumbnail_New_AANHPI.png",
        size: "small",
        slug: "saloncentric-aanhpi",
        tags: ["Campaigns", "Copywriting", "Brand Storytelling"],
        contentTags: ["Integrated Campaigns", "Cultural Storytelling", "Experiential Events", "Influencer Partnerships"],
        number: 5,
        filterCategory: "Campaign",
        year: "2024",
        description:
            "A cultural storytelling campaign integrating influencer voices, brand partnerships, and experiential activation.",
    });

    return (
        <main className="min-h-screen pt-32 pb-40 px-6">
            <div className="container mx-auto">
                <header className="mb-12">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-display mb-6 animate-fade-in-up">
                        Selected Work
                    </h1>
                    <p className="text-text-secondary text-xl max-w-xl md:max-w-none md:whitespace-nowrap animate-fade-in-up delay-200">
                        Explore a selection of my work across campaigns, content, and digital platforms.
                    </p>
                </header>

                <WorkBrowser projects={projects} />
            </div>
        </main>
    );
}
