"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/app/components/work/ProjectCard";

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
    filterCategory?: "Campaigns" | "Editorial" | "Production" | "Strategy";
    year?: string;
    description?: string;
}

export function WorkBrowser({ projects }: { projects: Project[] }) {
    const filteredProjects = projects;

    return (
        <>
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:auto-rows-[530px] xl:auto-rows-[560px] items-stretch"
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
                            className="h-full"
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
                                className="h-full"
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </>
    );
}
