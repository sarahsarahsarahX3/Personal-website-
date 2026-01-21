import { MetadataRoute } from 'next';
import { getAllFilesFrontMatter } from '@/app/lib/mdx';

const BASE_URL = 'https://sarah-portfolio.vercel.app'; // Replace with actual URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const workFiles = await getAllFilesFrontMatter("work");
    const insightFiles = await getAllFilesFrontMatter("insights");

    const works = workFiles.map((post: any) => ({
        url: `${BASE_URL}/work/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    const insights = insightFiles.map((post: any) => ({
        url: `${BASE_URL}/insights/${post.slug}`,
        lastModified: new Date(post.date || new Date()), // Use post date if robust parsing exists, else now
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    const routes = ['', '/work', '/about', '/insights', '/contact'].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1,
    }));

    return [...routes, ...works, ...insights];
}
