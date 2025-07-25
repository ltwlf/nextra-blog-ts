import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'

export interface BlogPost {
    route: string
    title: string
    date: string
    description?: string
    tags?: string[]
    author?: string
    featured?: boolean
    content: string
    frontMatter: Record<string, unknown>
}

export async function getPosts(): Promise<BlogPost[]> {
    try {
        const postsDir = join(process.cwd(), 'content')
        const files = await readdir(postsDir, { withFileTypes: true })
        const mdxFiles = files
            .filter(dirent => dirent.isFile() && dirent.name.endsWith('.mdx'))
            .map(dirent => dirent.name)

        const posts = await Promise.all(
            mdxFiles.map(async (file) => {
                const filePath = join(postsDir, file)
                const content = await readFile(filePath, 'utf8')
                const { data, content: mdxContent } = matter(content)

                return {
                    route: `/${file.replace('.mdx', '')}`,
                    title: data.title || file.replace('.mdx', ''),
                    date: data.date || new Date().toISOString(),
                    description: data.description,
                    tags: data.tags || [],
                    author: data.author || 'hololux',
                    featured: data.featured || false,
                    content: mdxContent,
                    frontMatter: data
                }
            })
        )

        return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } catch (error) {
        console.error('Error loading posts:', error)
        return []
    }
}

export async function getTags(): Promise<string[]> {
    const posts = await getPosts()
    const allTags = posts.flatMap(post => post.tags || [])
    return [...new Set(allTags)]
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
    const posts = await getPosts()
    return posts.filter(post => post.featured)
}

export async function getRegularPosts(): Promise<BlogPost[]> {
    const posts = await getPosts()
    return posts.filter(post => !post.featured)
}
