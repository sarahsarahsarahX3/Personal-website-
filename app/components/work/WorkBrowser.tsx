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
    contentTags?: string[];
    brand?: string;
    number?: number;
    filterCategory?: "Campaign" | "Editorial" | "Production" | "Strategy";
    year?: string;
    description?: string;
}

const categories = [
    "All",
    "Campaign",
    "Editorial",
    "Production",
    "Strategy",
];

export function WorkBrowser({ projects }: { projects: Project[] }) {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = projects.filter((project) => {
        if (activeCategory === "All") return true;

        const filterCategory = project.filterCategory;
        if (filterCategory) return filterCategory === activeCategory;

        if (activeCategory === "Campaign") return project.category === "Campaigns";
        if (activeCategory === "Editorial") return project.category === "Editorial Operations";
        if (activeCategory === "Production") return project.category === "Multimedia Production";
        if (activeCategory === "Strategy") return project.category === "Content Strategy";

        return false;
    });

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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:auto-rows-[560px] lg:auto-rows-[600px] items-stretch"
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
                            className="md:h-full"
                        >
                            <ProjectCard
                                index={index}
                                number={project.number}
                                image={project.image}
                                title={project.title}
                                brand={project.brand}
                                category={project.category}
                                slug={project.slug}
                                year={project.year}
                                description={project.description}
                                contentTags={project.contentTags ?? project.tags}
                                className="md:h-full"
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </>
    );
}
