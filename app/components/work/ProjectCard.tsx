"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/app/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
    title: string;
    category: string;
    image?: string;
    index: number;
    slug: string;
    year?: string;
    description?: string;
    className?: string; // Add className prop
}

function formatIndex(index: number) {
    return String(index + 1).padStart(2, "0");
}

export function ProjectCard({ title, category, image, index, slug, year, description, className }: ProjectCardProps) {
    const isRemoteImage = typeof image === "string" && /^https?:\/\//.test(image);
    const hasImage = typeof image === "string" && image.trim().length > 0;
    const imagePositionClassName =
        slug === "discovery-mighty-cruise-ships"
            ? "object-[50%_65%]"
            : slug === "discovery-daily-planet"
                ? "object-[82%_42%]"
            : slug === "saloncentric-aanhpi"
                ? "object-[50%_6%]"
                : "object-center";
    const baseImageScaleClassName = slug === "discovery-daily-planet" ? "scale-[1.06]" : "";
    const hoverImageScaleClassName = slug === "discovery-daily-planet" ? "group-hover:scale-[1.09]" : "group-hover:scale-[1.03]";
    const shouldItalicizeDiscoverySubtitle =
        slug === "discovery-mighty-cruise-ships" || slug === "discovery-daily-planet";
    const discoveryTitleParts = shouldItalicizeDiscoverySubtitle ? title.split(":") : null;

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className={cn(
                "group relative overflow-hidden rounded-2xl border border-white/10 bg-surface-alt/40 transition-colors hover:border-white/20",
                className
            )}
        >
            <Link
                href={`/work/${slug}`}
                className={cn(
                    "grid h-full w-full grid-rows-[minmax(0,1fr)_minmax(0,1fr)] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                    className
                )}
                aria-label={`${title} project page`}
            >
                <div className="relative min-h-0 overflow-hidden bg-surface-secondary">
                    <div
                        className={cn(
                            "absolute inset-0 w-full h-full transition-transform duration-700",
                            baseImageScaleClassName,
                            hoverImageScaleClassName
                        )}
                    >
                        {!hasImage ? (
                            <div
                                className="w-full h-full bg-gradient-to-b from-white/5 to-transparent"
                                aria-hidden="true"
                            />
                        ) : isRemoteImage ? (
                            // Avoid WebGL texture loading for remote images (CORS can break textures).
                            <img
                                src={image}
                                alt={title}
                                className={cn("w-full h-full object-cover", imagePositionClassName)}
                                loading="lazy"
                                decoding="async"
                            />
                        ) : (
                            <img
                                src={image}
                                alt={title}
                                className={cn("w-full h-full object-cover", imagePositionClassName)}
                                loading="lazy"
                                decoding="async"
                            />
                        )}
                    </div>

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/35" />
                </div>

                <div className="relative min-h-0 overflow-hidden p-5 md:p-6">
                    <div className="flex h-full min-h-0 items-stretch justify-between gap-6">
                    <div className="min-w-0 min-h-0 flex flex-col">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs uppercase tracking-[0.24em]">
                            <span className="text-accent">Project {formatIndex(index)}</span>
                            <span className="text-white/25">•</span>
                            <span className="text-white/70">{category}</span>
                            {year ? (
                                <>
                                    <span className="text-white/25">•</span>
                                    <span className="text-white/50">{year}</span>
                                </>
                            ) : null}
                        </div>

                        <h3 className="mt-2 font-display text-[1.35rem] leading-[1.15] text-white/90 transition-colors group-hover:text-white sm:text-[1.5rem] md:text-[1.6rem]">
                            {shouldItalicizeDiscoverySubtitle && discoveryTitleParts && discoveryTitleParts.length >= 2 ? (
                                <>
                                    <span>{discoveryTitleParts[0].trim()}:</span>{" "}
                                    <em className="italic">{discoveryTitleParts.slice(1).join(":").trim()}</em>
                                </>
                            ) : (
                                title
                            )}
                        </h3>

                        {description ? (
                            <p
                                className="mt-3 max-w-[60ch] text-sm leading-relaxed text-text-secondary"
                                style={{
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 2,
                                    overflow: "hidden",
                                }}
                            >
                                {description}
                            </p>
                        ) : null}
                    </div>

                    <div className="flex shrink-0 flex-col justify-end">
                        <div className="flex items-center gap-2 text-white/70 transition-colors group-hover:text-white">
                            <span className="text-xs uppercase tracking-[0.2em] text-white/40 group-hover:text-white/60">
                                View
                            </span>
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                                <ArrowUpRight
                                    size={18}
                                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                            </span>
                        </div>
                    </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
