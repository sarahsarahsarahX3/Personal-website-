"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/app/lib/utils";

interface ProjectCardProps {
    title: string;
    category: string;
    image: string;
    size?: "large" | "small" | "tall";
    className?: string;
    index: number;
}

export function ProjectCard({ title, category, image, size = "small", className, index }: ProjectCardProps) {
    // Simple slug generation for demo purposes
    const slug = title.toLowerCase().replace(/\s+/g, '-');

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
            <Link href={`/work/${slug}`} className="block w-full h-full">
                {/* Image Container */}
                <div className="aspect-[4/3] w-full h-full overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        width={800}
                        height={600}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="text-xs font-medium tracking-widest uppercase text-white/70 mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            {category}
                        </span>
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-display text-white italic">{title}</h3>
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
