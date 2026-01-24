import { getAllFilesFrontMatter } from "@/app/lib/mdx";
import { ArticleList } from "@/app/components/insights/ArticleList";

export default async function InsightsPage() {
    const articles = await getAllFilesFrontMatter("insights");
    // Sort by date if needed, currently just existing order. 
    // Usually getAllFilesFrontMatter reads directory order. 
    // We could add sorting logic here.

    const formattedArticles = articles.map((article: any) => ({
        title: article.title,
        slug: article.slug,
        date: article.date,
        category: article.category,
        readTime: article.readTime,
        thumbnail: article.thumbnail,
        publication: article.publication,
        link: article.link,
        excerpt: article.excerpt,
        tags: article.tags,
        formats: article.formats,
        performance: article.performance
    }));

    // Remove specific articles from the landing page.
    const hiddenLinks = new Set([
        "https://www.probeautycentral.saloncentric.com/aanhpi-coffee-and-culture-fireside-chat",
        "https://www.probeautycentral.saloncentric.com/national-lipstick-day-2023",
    ]);

    const visibleArticles = formattedArticles.filter((article) => !hiddenLinks.has(article.link));

    // Move specific articles to the end of the list (in the order specified).
    const moveToBottomLinks = [
        "https://haircode.com/articles/the-silk-press-survival-guide-how-to-maintain-a-silk-press/",
        "https://haircode.com/articles/6-everyday-things-that-are-secretly-damaging-your-hair/",
        "https://haircode.com/articles/hair-or-scalp-detox-how-to-detox-hair-based-on-your-scalp-concerns/",
        "https://haircode.com/articles/deep-conditioning-101-how-to-help-repair-and-care-for-bleached-hair/",
        "https://www.probeautycentral.saloncentric.com/best-practices-for-serving-deaf-clients",
        "https://www.probeautycentral.saloncentric.com/the-9-best-sunscreens-for-your-clients-skin-concerns",
        "https://www.probeautycentral.saloncentric.com/get-to-know-tonisha-scott",
    ] as const;

    const moveIndex = new Map<string, number>(moveToBottomLinks.map((link, idx) => [link, idx]));
    const moveSet = new Set<string>(moveToBottomLinks);

    const kept: typeof visibleArticles = [];
    const moved: typeof visibleArticles = [];

    visibleArticles.forEach((article) => {
        const link = article.link;
        if (link && moveSet.has(link)) moved.push(article);
        else kept.push(article);
    });

    moved.sort((a, b) => {
        const ai = a.link ? moveIndex.get(a.link) : undefined;
        const bi = b.link ? moveIndex.get(b.link) : undefined;
        if (ai === undefined && bi === undefined) return 0;
        if (ai === undefined) return 1;
        if (bi === undefined) return -1;
        return ai - bi;
    });

    const orderedArticles = [...kept, ...moved];

    return (
        <main className="min-h-screen pt-32 pb-40 px-6">
            <div className="container mx-auto">
                <header className="mb-10">
                    <h1 className="text-6xl md:text-8xl font-display mb-6 animate-fade-in-up">
                        Articles
                    </h1>
                    <p className="text-text-secondary text-xl max-w-xl animate-fade-in-up delay-200">
                        Published work across brand and editorial.
                    </p>
                </header>

                <ArticleList articles={orderedArticles} />
            </div>
        </main>
    );
}
