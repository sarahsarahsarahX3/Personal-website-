import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const root = process.cwd();

export async function getFiles(type: string) {
    return fs.readdirSync(path.join(root, "content", type));
}

export async function getFileBySlug(type: string, slug: string) {
    const source = slug
        ? fs.readFileSync(path.join(root, "content", type, `${slug}.mdx`), "utf8")
        : fs.readFileSync(path.join(root, "content", type, `index.mdx`), "utf8");

    const { data, content } = matter(source);

    return {
        frontMatter: data,
        content,
        slug,
    };
}

export async function getAllFilesFrontMatter(type: string) {
    const files = fs.readdirSync(path.join(root, "content", type));

    return files.reduce((allPosts: any[], postSlug) => {
        const source = fs.readFileSync(
            path.join(root, "content", type, postSlug),
            "utf8"
        );
        const { data } = matter(source);

        return [
            {
                ...data,
                slug: postSlug.replace(".mdx", ""),
            },
            ...allPosts,
        ];
    }, []);
}
