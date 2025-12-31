"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
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
}

export function ArticleList({ articles }: { articles: Article[] }) {
    return (
        <div className="border-t border-white/10">
            {articles.map((article, i) => {
                const internalHref = `/insights/${article.slug}`;
                const href = article.link ?? internalHref;
                const isExternal = href.startsWith("http://") || href.startsWith("https://");

                return (
                    <motion.div
                        key={article.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <article className="group py-10 border-b border-white/10 hover:bg-white/5 transition-colors px-4">
                            <div className="grid grid-cols-1 md:grid-cols-[320px_1fr_auto] gap-6 md:items-center">
                            <div className="relative overflow-hidden rounded-lg bg-surface-secondary aspect-[4/3] shrink-0">
                                <Image
                                    src={article.thumbnail ?? "/images/IMG_5668_edited.jpg"}
                                    alt={`${article.title} thumbnail`}
                                    fill
                                    className="object-cover object-center"
                                    sizes="(min-width: 768px) 320px, calc(100vw - 5rem)"
                                    quality={75}
                                />
                            </div>

                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-text-secondary font-mono text-sm">
                                    <span>{article.date}</span>
                                    <span className="w-1 h-1 bg-accent rounded-full" />
                                    <span>{article.publication ?? "Sarah Dawson"}</span>
                                </div>

                                <h3 className="mt-3 text-xl md:text-2xl font-display">
                                    <span className="transition-all duration-300 group-hover:italic">
                                        {article.title}
                                    </span>
                                </h3>

                                {article.excerpt ? (
                                    <p className="mt-4 text-sm md:text-base text-text-secondary leading-relaxed max-w-2xl">
                                        {article.excerpt}
                                    </p>
                                ) : null}

                                <div className="mt-5 flex flex-wrap items-center gap-4">
                                    {article.category ? (
                                        <span className="px-3 py-1 rounded-full border border-white/10 text-xs uppercase tracking-wider text-text-secondary">
                                            {article.category}
                                        </span>
                                    ) : null}
                                    {article.readTime ? (
                                        <span className="text-sm text-text-secondary">{article.readTime}</span>
                                    ) : null}
                                </div>

                                <div className="mt-3 text-xs font-mono text-text-secondary/80 truncate">
                                    <span className="sr-only">Link: </span>
                                    {isExternal ? (
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="hover:text-text-primary transition-colors"
                                        >
                                            {href}
                                        </a>
                                    ) : (
                                        <Link href={href} className="hover:text-text-primary transition-colors">
                                            {href}
                                        </Link>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center md:items-center justify-start md:justify-center md:pl-5">
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
                                            >
                                                <span>Open</span>
                                                <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={16} />
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
                                            >
                                                <span>Open</span>
                                                <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={16} />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                    </article>
                </motion.div>
                );
            })}
        </div>
    );
}
