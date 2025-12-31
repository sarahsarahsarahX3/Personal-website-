import { getFileBySlug } from "@/app/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Link from "next/link";

export default async function ArticlePage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    let post;
    try {
        post = await getFileBySlug("insights", slug);
    } catch (e) {
        return <div className="text-white p-20">Article not found.</div>;
    }

    const { frontMatter, content } = post;

    return (
        <article className="min-h-screen pb-40 bg-surface">
            {/* Back Nav */}
            <div className="fixed top-8 left-8 z-40 mix-blend-difference">
                <Link href="/insights" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                    <ArrowLeft size={16} />
                    <span className="text-sm">Back to Writing</span>
                </Link>
            </div>

            {/* Header */}
            <header className="pt-40 pb-20 px-6 container mx-auto max-w-4xl text-center">
                <div className="flex items-center justify-center gap-6 text-sm text-text-secondary mb-8 font-mono animate-fade-in-up">
                    <span className="flex items-center gap-2"><Calendar size={14} /> {frontMatter.date}</span>
                    {frontMatter.readTime ? (
                        <>
                            <span className="w-1 h-1 bg-accent rounded-full" />
                            <span className="flex items-center gap-2"><Clock size={14} /> {frontMatter.readTime}</span>
                        </>
                    ) : null}
                </div>

                <h1 className="text-5xl md:text-7xl font-display text-text-balance animate-fade-in-up delay-100">
                    {frontMatter.title}
                </h1>

                {frontMatter.category ? (
                    <div className="mt-8 flex justify-center animate-fade-in-up delay-200">
                        <span className="px-4 py-2 rounded-full border border-white/10 text-xs uppercase tracking-widest text-accent">
                            {frontMatter.category}
                        </span>
                    </div>
                ) : null}
            </header>

            {/* Content Body */}
            <div className="container mx-auto px-6 max-w-2xl animate-fade-in-up delay-300">
                <div className="prose prose-invert prose-lg max-w-none text-text-secondary">
                    <MDXRemote source={content} />
                </div>
            </div>
        </article>
    );
}
