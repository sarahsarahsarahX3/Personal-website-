"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/app/components/work/ProjectCard";
import { useState } from "react";
import { cn } from "@/app/lib/utils";

interface Project {
    title: string;
    category: string;
    image?: string; // mapped from heroImage
    size?: "large" | "small" | "tall";
    slug: string;
    tags?: string[];
    year?: string;
    description?: string;
}

const categories = [
    "All",
    "Campaigns",
    "Content Strategy",
    "SEO & AEO",
    "Copywriting",
    "Video Production",
    "Brand Storytelling",
];

export function WorkBrowser({ projects }: { projects: Project[] }) {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = projects.filter(project =>
        activeCategory === "All" ||
        project.category === activeCategory ||
        (project.tags ?? []).includes(activeCategory)
    );

    return (
        <>
            {/* Filter Bar */}
            <div className="mb-12 flex gap-8 overflow-x-auto pb-3 no-scrollbar md:flex-wrap md:overflow-visible md:pb-0 border-b border-white/10">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        aria-pressed={activeCategory === category}
                        className={cn(
                            "relative py-3 text-xs uppercase tracking-[0.24em] transition-colors whitespace-nowrap",
                            activeCategory === category
                                ? "text-white"
                                : "text-white/55 hover:text-white"
                        )}
                    >
                        {category}
                        <span
                            aria-hidden="true"
                            className={cn(
                                "pointer-events-none absolute left-0 right-0 -bottom-px h-px bg-accent transition-opacity",
                                activeCategory === category ? "opacity-100" : "opacity-0"
                            )}
                        />
                    </button>
                ))}
            </div>

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[460px]"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            layout
                            key={project.slug}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                        >
                            <ProjectCard
                                index={index}
                                image={project.image}
                                title={project.title}
                                category={project.category}
                                slug={project.slug}
                                year={project.year}
                                description={project.description}
                                className="h-full"
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </>
    );
}
