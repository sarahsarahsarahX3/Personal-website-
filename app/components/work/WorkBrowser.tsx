"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/app/components/work/ProjectCard";
import { useState } from "react";
import { cn } from "@/app/lib/utils";

interface Project {
    title: string;
    category: string;
    image: string; // mapped from heroImage
    size?: "large" | "small" | "tall";
    slug: string;
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
        activeCategory === "All" || project.category === activeCategory
    );

    return (
        <>
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-4 mb-16">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm uppercase tracking-wide transition-all border",
                            activeCategory === category
                                ? "bg-white text-surface border-white"
                                : "bg-transparent text-text-secondary border-white/10 hover:border-white/50 hover:text-white"
                        )}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            layout
                            key={project.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                            className={cn(
                                project.size === "large" && "md:col-span-2 md:row-span-2",
                                project.size === "tall" && "md:row-span-2"
                            )}
                        >
                            <ProjectCard
                                index={index}
                                image={project.image}
                                title={project.title}
                                category={project.category}
                                size={project.size}
                                className="h-full"
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </>
    );
}
