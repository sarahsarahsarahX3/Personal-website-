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

    return (
        <main className="min-h-screen pt-32 pb-40 px-6">
            <div className="container mx-auto">
                <header className="mb-10">
                    <h1 className="text-6xl md:text-8xl font-display mb-6 animate-fade-in-up">
                        Articles
                    </h1>
                    <p className="text-text-secondary text-xl max-w-xl animate-fade-in-up delay-200">
                        A collection of brand communications, editorial features, and published articles.
                    </p>
                </header>

                <ArticleList articles={formattedArticles} />
            </div>
        </main>
    );
}
