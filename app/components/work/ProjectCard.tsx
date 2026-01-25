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
    number?: number;
    brand?: string;
    contentTags?: string[];
    slug: string;
    year?: string;
    description?: string;
    className?: string; // Add className prop
}

function formatIndex(value: number) {
    return String(value).padStart(2, "0");
}

function formatCategoryLabel(category: string) {
    const normalized = category.trim().toLowerCase();
    if (normalized === "campaigns") return "Campaign";
    if (normalized === "content strategy") return "Strategy";
    if (normalized === "editorial operations") return "Editorial";
    if (normalized === "multimedia production") return "Production";
    return category;
}

export function ProjectCard({
    title,
    category,
    image,
    index,
    number,
    brand,
    contentTags,
    slug,
    year,
    description,
    className,
}: ProjectCardProps) {
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
    const italicizeWholeTitle =
        (slug === "discovery-mighty-cruise-ships" || slug === "discovery-daily-planet") && !title.includes(":");
    const displayCategory = formatCategoryLabel(category);
    const displayIndex = formatIndex(number ?? index + 1);
    const displayTags = (contentTags ?? []).length > 0 ? contentTags : undefined;

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className={cn(
                "group relative overflow-hidden rounded-2xl border border-white/10 bg-surface-alt/10 transition-colors hover:border-white/20",
                className
            )}
        >
            <Link
                href={`/work/${slug}`}
                className={cn(
                    "grid h-full w-full grid-rows-[minmax(0,0.9fr)_minmax(0,1.1fr)] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
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

                <div className="relative min-h-0 overflow-hidden border-t border-white/10 bg-surface/15 p-5 md:p-6">
                    <div className="flex h-full min-h-0 flex-col gap-3">
                        <div className="flex min-w-0 items-center gap-2 text-xs font-mono uppercase tracking-[0.24em] text-text-secondary/70">
                            <span className="shrink-0 text-accent">Project {displayIndex}</span>
                            <span className="shrink-0 text-text-secondary/30">ᐧ</span>
                            <span className="min-w-0 truncate text-text-secondary/70">{displayCategory}</span>
                            {year ? (
                                <>
                                    <span className="shrink-0 text-text-secondary/30">ᐧ</span>
                                    <span className="shrink-0 text-text-secondary/60">{year}</span>
                                </>
                            ) : null}
                        </div>

                        <h3
                            className="font-display text-[1.35rem] leading-[1.15] text-text-primary/90 transition-colors group-hover:text-text-primary sm:text-[1.5rem] md:text-[1.6rem]"
                            style={{
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                                overflow: "hidden",
                            }}
                        >
                            {shouldItalicizeDiscoverySubtitle && discoveryTitleParts && discoveryTitleParts.length >= 2 ? (
                                <>
                                    <span>{discoveryTitleParts[0].trim()}:</span>{" "}
                                    <em className="italic">{discoveryTitleParts.slice(1).join(":").trim()}</em>
                                </>
                            ) : italicizeWholeTitle ? (
                                <em className="italic">{title}</em>
                            ) : (
                                title
                            )}
                        </h3>

                        {brand ? (
                            <p className="text-sm tracking-tight text-text-secondary">{brand}</p>
                        ) : null}

                        {description ? (
                            <p
                                className="max-w-[60ch] text-sm leading-relaxed text-text-secondary"
                                style={{
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 3,
                                    overflow: "hidden",
                                }}
                            >
                                {description}
                            </p>
                        ) : null}

                        {displayTags ? (
                            <div className="flex min-w-0 items-center gap-2 text-xs">
                                <span className="shrink-0 text-xs font-mono uppercase tracking-[0.24em] text-text-secondary/60">
                                    Tags:
                                </span>
                                <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                                    {displayTags.slice(0, 6).map((tag) => (
                                        <span
                                            key={tag}
                                            className="shrink-0 inline-flex items-center rounded-full border border-white/10 bg-surface/40 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.24em] text-text-secondary/80"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ) : null}

                        <div className="mt-auto flex items-center justify-end gap-2 text-text-secondary/80 transition-colors group-hover:text-text-primary">
                            <span className="text-xs font-mono uppercase tracking-[0.2em] text-text-secondary/60 group-hover:text-text-secondary/80">
                                View
                            </span>
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-surface/40 backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                                <ArrowUpRight
                                    size={18}
                                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
