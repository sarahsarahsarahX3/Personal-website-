import { getFileBySlug } from "@/app/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ProjectPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    let post;
    try {
        post = await getFileBySlug("work", slug);
    } catch (e) {
        // Fallback for demo if file doesn't exist
        return <div className="text-white p-20">Project not found. (Make sure .mdx file exists in content/work)</div>;
    }

    const { frontMatter, content } = post;
    const hasAtAGlance = Array.isArray(frontMatter.atAGlance) && frontMatter.atAGlance.length > 0;
    const hasResults = Array.isArray(frontMatter.results) && frontMatter.results.length > 0;
    const showMeta =
        !hasAtAGlance &&
        (Boolean(frontMatter.role) || Boolean(frontMatter.year) || (Array.isArray(frontMatter.stats) && frontMatter.stats.length > 0));
    const descriptionInHero = Boolean(frontMatter.subtitle) || hasAtAGlance || hasResults;

    return (
        <article className="bg-surface min-h-screen pb-40">
            {/* Back Button */}
            <div className="fixed top-8 left-8 z-50">
                <Link href="/work" className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <ArrowLeft size={16} />
                    <span className="text-sm">Back to Work</span>
                </Link>
            </div>

            {/* Hero Image */}
            <div className="relative h-[80vh] w-full overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                    {frontMatter.heroImage ? (
                        <Image
                            src={frontMatter.heroImage}
                            alt={frontMatter.title}
                            fill
                            className="object-cover opacity-80"
                            priority
                        />
                    ) : (
                        <div className="absolute inset-0 bg-surface-alt" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                    <div className="container mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-fade-in-up">
                            <div>
                                <span className="text-accent text-sm tracking-widest uppercase mb-4 block">{frontMatter.category}</span>
                                <h1 className="text-6xl md:text-9xl font-display leading-none">{frontMatter.title}</h1>
                                {frontMatter.subtitle ? (
                                    <p className="mt-4 text-xl md:text-2xl text-text-secondary tracking-tight">
                                        {frontMatter.subtitle}
                                    </p>
                                ) : null}

                                {descriptionInHero && frontMatter.description ? (
                                    <p className="mt-6 max-w-3xl text-base md:text-lg leading-relaxed text-text-secondary">
                                        {frontMatter.description}
                                    </p>
                                ) : null}

                                {hasAtAGlance ? (
                                    <dl className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-6">
                                        {frontMatter.atAGlance.map((item: any) => (
                                            <div key={item.label} className="border-t border-white/10 pt-4">
                                                <dt className="text-text-secondary text-xs uppercase tracking-widest font-mono">
                                                    {item.label}
                                                </dt>
                                                <dd className="mt-2 text-sm md:text-base text-text-primary">
                                                    {item.value}
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-20">
                {hasResults ? (
                    <section aria-labelledby="project-results" className="mb-16">
                        <h2 id="project-results" className="font-display text-3xl md:text-4xl tracking-tight">
                            Results
                        </h2>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {frontMatter.results.slice(0, 4).map((stat: any) => (
                                <div
                                    key={stat.label}
                                    className="rounded-2xl border border-white/10 bg-surface-alt/10 px-6 py-6"
                                >
                                    <p className="text-3xl md:text-4xl font-display text-text-primary leading-none">
                                        {stat.value}
                                    </p>
                                    <p className="mt-3 text-xs uppercase tracking-widest font-mono text-text-secondary/80">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Meta Data */}
                    {showMeta ? (
                        <div className="lg:col-span-4 space-y-8">
                            {frontMatter.role ? (
                                <div className="border-t border-white/10 pt-4">
                                    <h3 className="text-text-secondary text-sm uppercase tracking-widest mb-1">Role</h3>
                                    <p className="text-lg">{frontMatter.role}</p>
                                </div>
                            ) : null}
                            {frontMatter.year ? (
                                <div className="border-t border-white/10 pt-4">
                                    <h3 className="text-text-secondary text-sm uppercase tracking-widest mb-1">Year</h3>
                                    <p className="text-lg">{frontMatter.year}</p>
                                </div>
                            ) : null}
                            {/* Stats */}
                            {frontMatter.stats && (
                                <div className="py-8 grid grid-cols-2 gap-4">
                                    {frontMatter.stats.map((stat: any) => (
                                        <div key={stat.label}>
                                            <p className="text-4xl font-display text-accent">{stat.value}</p>
                                            <p className="text-text-secondary text-sm">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : null}

                    {/* Description & MDX Content */}
                    <div className={showMeta ? "lg:col-span-8" : "lg:col-span-12"}>
                        {!descriptionInHero && frontMatter.description ? (
                            <h2 className="text-2xl md:text-4xl font-light leading-relaxed text-text-primary/90 mb-12">
                                {frontMatter.description}
                            </h2>
                        ) : null}

                        {/* Main Content Render */}
                        <div className="prose prose-invert prose-lg max-w-none mb-20 text-text-secondary">
                            <MDXRemote source={content} />
                        </div>

                        {/* Image Gallery */}
                        {frontMatter.images && (
                            <div className="space-y-8">
                                {frontMatter.images.map((img: string, i: number) => (
                                    <div
                                        key={i}
                                        className="relative aspect-video w-full rounded-xl overflow-hidden"
                                    >
                                        <Image
                                            src={img}
                                            alt={`Gallery image ${i + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
