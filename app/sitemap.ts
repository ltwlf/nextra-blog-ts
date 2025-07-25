import { MetadataRoute } from 'next'
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

interface BlogPost {
    slug: string
    frontmatter: {
        title: string
        date?: string
        tags?: string[]
        published?: boolean
        featured?: boolean
        lastmod?: string
    }
}

async function getAllBlogPosts(): Promise<BlogPost[]> {
    const contentDir = path.join(process.cwd(), 'content')

    try {
        const files = await fs.readdir(contentDir, { recursive: true })
        const mdxFiles = files.filter(file =>
            typeof file === 'string' &&
            file.endsWith('.mdx') &&
            !file.includes('legal/')
        )

        const posts = await Promise.all(
            mdxFiles.map(async (file) => {
                const filePath = path.join(contentDir, file as string)
                const content = await fs.readFile(filePath, 'utf8')
                const { data: frontmatter } = matter(content)

                const slug = (file as string).replace('.mdx', '').replace(/\//g, '-')

                return {
                    slug,
                    frontmatter: {
                        title: frontmatter.title || slug,
                        date: frontmatter.date,
                        tags: frontmatter.tags || [],
                        published: frontmatter.published !== false,
                        lastmod: frontmatter.lastmod || frontmatter.date
                    }
                }
            })
        )

        return posts.filter(post => post.frontmatter.published)
    } catch (error) {
        console.error('Error reading blog posts:', error)
        return []
    }
}

async function getAllTags(): Promise<string[]> {
    const posts = await getAllBlogPosts()
    const allTags = new Set<string>()

    posts.forEach(post => {
        if (post.frontmatter.tags) {
            post.frontmatter.tags.forEach(tag => allTags.add(tag))
        }
    })

    return Array.from(allTags)
}

async function getLegalPages(): Promise<string[]> {
    const contentDir = path.join(process.cwd(), 'content', 'legal')

    try {
        const files = await fs.readdir(contentDir)
        return files
            .filter(file => file.endsWith('.mdx'))
            .map(file => file.replace('.mdx', ''))
    } catch (error) {
        console.error('Error reading legal pages:', error)
        return []
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://iloveagents.com'
    const currentDate = new Date().toISOString()

    // Static pages with priority and change frequency
    const staticPages = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/posts`,
            lastModified: currentDate,
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/tags`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
    ]

    // Blog posts with proper priority based on recency
    const posts = await getAllBlogPosts()
    const postPages = posts.map((post, index) => {
        // Higher priority for more recent posts
        const recencyFactor = Math.max(0.5, 0.8 - (index * 0.05))

        return {
            url: `${baseUrl}/${post.slug}`,
            lastModified: post.frontmatter.lastmod || post.frontmatter.date || currentDate,
            changeFrequency: 'weekly' as const,
            priority: Math.min(0.8, recencyFactor),
        }
    })

    // Tag pages with priority based on usage frequency
    const tags = await getAllTags()
    const tagCounts: Record<string, number> = {}

    // Count tag usage
    posts.forEach(post => {
        post.frontmatter.tags?.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1
        })
    })

    const tagPages = tags.map(tag => {
        const count = tagCounts[tag] || 1
        const priority = Math.min(0.7, 0.4 + (count * 0.1)) // Higher priority for frequently used tags

        return {
            url: `${baseUrl}/tags/${encodeURIComponent(tag)}`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority,
        }
    })

    // Legal pages
    const legalPageSlugs = await getLegalPages()
    const legalPages = legalPageSlugs.map(slug => ({
        url: `${baseUrl}/legal/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.3,
    }))

    // Combine all pages and sort by priority
    const allPages = [
        ...staticPages,
        ...postPages,
        ...tagPages,
        ...legalPages,
    ].sort((a, b) => b.priority - a.priority)

    return allPages
}
