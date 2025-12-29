"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Article {
    title: string;
    slug: string;
    date: string;
    category: string;
    readTime: string;
}

export function ArticleList({ articles }: { articles: Article[] }) {
    return (
        <div className="border-t border-white/10">
            {articles.map((article, i) => (
                <motion.div
                    key={article.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                >
                    <Link href={`/insights/${article.slug}`} className="group block py-12 border-b border-white/10 hover:bg-white/5 transition-colors px-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex flex-col md:flex-row md:items-center gap-8 md:w-1/2">
                                <span className="text-text-secondary font-mono text-sm w-32">{article.date}</span>
                                <h3 className="text-2xl md:text-3xl font-display group-hover:italic transition-all duration-300">
                                    {article.title}
                                </h3>
                            </div>

                            <div className="flex items-center justify-between md:justify-end gap-8 md:w-1/2">
                                <span className="px-3 py-1 rounded-full border border-white/10 text-xs uppercase tracking-wider text-text-secondary">
                                    {article.category}
                                </span>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-text-secondary">{article.readTime}</span>
                                    <ArrowUpRight className="text-text-secondary group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
