"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface Article {
    title: string;
    slug: string;
    date: string;
    category?: string;
    readTime?: string;
    thumbnail?: string;
    publication?: string;
    link?: string;
    excerpt?: string;
    tags?: string[];
    formats?: string[];
    performance?: string[];
}

function isHiddenTag(tag: string) {
    const normalized = tag.trim().toLowerCase();
    return normalized === "thought leadership" || normalized === "though leadership";
}

function clampWords(text: string, maxWords: number) {
    const normalized = text.trim().replace(/\s+/g, " ");
    if (!normalized) return "";
    if (maxWords <= 0) return "";

    const words = normalized.split(" ");
    if (words.length <= maxWords) return normalized;
    return `${words.slice(0, maxWords).join(" ")}…`;
}

function formatDateLabel(rawDate: string) {
    const input = rawDate.trim();

    const monthIndex: Record<string, number> = {
        jan: 0,
        feb: 1,
        mar: 2,
        apr: 3,
        may: 4,
        jun: 5,
        jul: 6,
        aug: 7,
        sep: 8,
        sept: 8,
        oct: 9,
        nov: 10,
        dec: 11,
    };

    const match = input.match(/^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$/);
    if (!match) return input;

    const [, monthRaw, dayRaw, yearRaw] = match;
    const month = monthIndex[monthRaw.toLowerCase()];
    if (month === undefined) return input;

    const day = Number(dayRaw);
    const year = Number(yearRaw);
    const date = new Date(Date.UTC(year, month, day));
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
}

function emitAnalytics(event: string, payload: Record<string, unknown>) {
    try {
        window.dispatchEvent(
            new CustomEvent("portfolio:analytics", {
                detail: { event, ...payload },
            })
        );
    } catch {
        // no-op
    }
}

export function ArticleList({ articles }: { articles: Article[] }) {
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const onScroll = () => setShowBackToTop(window.scrollY > 600);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <div className="border-t border-white/10">
                {articles.map((article, i) => {
                    const internalHref = `/insights/${article.slug}`;
                    const href = article.link ?? internalHref;
                    const isExternal = href.startsWith("http://") || href.startsWith("https://");
                    const excerpt = article.excerpt ? clampWords(article.excerpt, 30) : null;
                    const dateLabel = formatDateLabel(article.date);

                    return (
                        <motion.div
                            key={article.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <article
                                className="group relative py-10 border-b border-white/10 hover:bg-white/5 transition-colors px-4"
                                data-article-title={article.title}
                                data-article-href={href}
                            >
                                {/* Primary click target (card) */}
                                {isExternal ? (
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="absolute inset-0 z-20"
                                        aria-label={`Open ${article.title}`}
                                        data-analytics="article_card"
                                        onClick={() => emitAnalytics("article_card_click", { title: article.title, href })}
                                    />
                                ) : (
                                    <Link
                                        href={internalHref}
                                        className="absolute inset-0 z-20"
                                        aria-label={`Open ${article.title}`}
                                        data-analytics="article_card"
                                        onClick={() => emitAnalytics("article_card_click", { title: article.title, href: internalHref })}
                                    />
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-[240px_1fr_auto] gap-6 md:items-center">
                                    <div className="relative overflow-hidden rounded-lg bg-surface-secondary aspect-[4/3] shrink-0">
                                        <Image
                                            src={article.thumbnail ?? "/images/IMG_5668_edited.jpg"}
                                            alt={`${article.title} thumbnail`}
                                            fill
                                            className="object-cover object-center"
                                            sizes="(min-width: 768px) 240px, calc(100vw - 5rem)"
                                            quality={75}
                                        />
                                    </div>

                                    <div className="min-w-0 relative z-10">
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-text-secondary font-mono text-sm">
                                            <span>{dateLabel}</span>
                                            <span className="w-1 h-1 bg-accent rounded-full" />
                                            <span>{article.publication ?? "Sarah Dawson"}</span>
                                        </div>

                                        <h3 className="mt-3 text-xl md:text-2xl font-display">
                                            <span className="transition-all duration-300 group-hover:italic">
                                                {article.title}
                                            </span>
                                        </h3>

                                        {excerpt ? (
                                            <p className="mt-4 text-sm md:text-base text-text-secondary leading-relaxed max-w-2xl">
                                                {excerpt}
                                            </p>
                                        ) : null}

                                        <div className="mt-5 flex flex-wrap items-center gap-3">
                                            {(article.tags ?? [])
                                                .filter((tag) => !isHiddenTag(tag))
                                                .map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="pointer-events-none px-3 py-1 rounded-full border border-dashed border-white/15 text-[11px] uppercase tracking-widest text-text-secondary/80 bg-transparent"
                                                    data-analytics="article_tag_pill"
                                                    data-tag={tag}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {article.readTime ? (
                                                <span className="text-sm text-text-secondary">{article.readTime}</span>
                                            ) : null}
                                        </div>

                                        <div className="mt-3 text-xs font-mono text-text-secondary/80 truncate">
                                            <span className="sr-only">Link: </span>
                                            <span className="select-text">{href}</span>
                                        </div>
                                    </div>

                                    <div className="relative z-30 flex items-center justify-start md:justify-center md:pl-5">
                                        {isExternal ? (
                                            <a
                                                href={href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className={cn(
                                                    "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10",
                                                    "text-xs uppercase tracking-widest text-text-secondary bg-white/5",
                                                    "hover:bg-white/10 hover:border-white/20 hover:text-accent transition-colors"
                                                )}
                                                aria-label="Open article"
                                                data-analytics="article_open"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    emitAnalytics("article_open_click", { title: article.title, href });
                                                }}
                                            >
                                                <span>Open</span>
                                                <ArrowUpRight
                                                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                                                    size={16}
                                                />
                                            </a>
                                        ) : (
                                            <Link
                                                href={href}
                                                className={cn(
                                                    "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10",
                                                    "text-xs uppercase tracking-widest text-text-secondary bg-white/5",
                                                    "hover:bg-white/10 hover:border-white/20 hover:text-accent transition-colors"
                                                )}
                                                aria-label="Open article"
                                                data-analytics="article_open"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    emitAnalytics("article_open_click", { title: article.title, href });
                                                }}
                                            >
                                                <span>Open</span>
                                                <ArrowUpRight
                                                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                                                    size={16}
                                                />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </article>
                        </motion.div>
                    );
                })}
            </div>

            {showBackToTop ? (
                <button
                    type="button"
                    className="fixed right-6 z-40 bottom-[calc(env(safe-area-inset-bottom)+7rem)] md:bottom-28 px-4 py-2 rounded-full border border-white/10 bg-surface/80 backdrop-blur-xl text-xs uppercase tracking-widest text-text-secondary hover:bg-white/10 hover:border-white/20 hover:text-text-primary transition-colors"
                    onClick={() => {
                        emitAnalytics("back_to_top_click", {});
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    data-analytics="back_to_top"
                >
                    Back to top
                </button>
            ) : null}
        </>
    );
}
