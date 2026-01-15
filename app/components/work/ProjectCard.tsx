"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/app/lib/utils";
import { DistortImage } from "@/app/components/ui/DistortImage";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
    title: string;
    category: string;
    image: string;
    index: number;
    slug: string;
    size?: "large" | "small" | "tall";
    className?: string; // Add className prop
}

export function ProjectCard({ title, category, image, index, slug, size = "small", className }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className={cn(
                "group relative overflow-hidden rounded-xl bg-surface-alt",
                size === "large" && "md:col-span-2 md:row-span-2",
                size === "tall" && "md:row-span-2",
                className
            )}
        >
            <Link
                href={`/work/${slug}`}
                className={cn("block group relative w-full h-full overflow-hidden", className)}
            >
                <div className="relative w-full h-full overflow-hidden bg-surface-secondary">
                    {/* WebGL Image Replacement */}
                    <div className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105">
                        <DistortImage src={image} alt={title} className="w-full h-full" fill />
                    </div>

                    {/* Overlay & Text */}
                    <div className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="flex items-end justify-between w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <div>
                                <span className="text-accent text-xs uppercase tracking-widest mb-2 block delay-100">
                                    {category}
                                </span>
                                <h3 className="text-2xl font-display text-white italic">{title}</h3>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-accent hover:scale-110">
                                <ArrowUpRight size={18} />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
