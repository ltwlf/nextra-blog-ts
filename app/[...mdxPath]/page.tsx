import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPosts } from '../../lib/blog'
import { generateBlogPostMetadata, generateStructuredData, generateBreadcrumbStructuredData } from '../../lib/seo'

type PageProps = {
    params: Promise<{ mdxPath: string[] }>
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export const generateStaticParams = generateStaticParamsFor('mdxPath')

// Helper function to check if path should be handled by this route
function shouldHandlePath(mdxPath: string[]): boolean {
    if (!mdxPath || mdxPath.length === 0) return false

    const firstSegment = mdxPath[0]

    // Exclude system paths
    const excludedPaths = [
        '_next',
        '.well-known',
        'api',
        'favicon.ico',
        'robots.txt',
        'sitemap.xml'
    ]

    return !excludedPaths.includes(firstSegment)
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params

    if (!shouldHandlePath(params.mdxPath)) {
        return {
            title: 'Page Not Found',
        }
    }

    try {
        const { metadata } = await importPage(params.mdxPath)

        // Check if this is a blog post
        const posts = await getPosts()
        const slug = params.mdxPath.join('/')
        const post = posts.find(p => p.route === `/${slug}`)

        if (post) {
            return generateBlogPostMetadata(post)
        }

        return metadata
    } catch {
        return {
            title: 'Page Not Found',
        }
    }
}

export default async function Page(props: PageProps) {
    const params = await props.params

    if (!shouldHandlePath(params.mdxPath)) {
        notFound()
    }

    try {
        const result = await importPage(params.mdxPath)
        const { default: MDXContent, toc, metadata } = result

        // Check if this is a blog post and get additional data
        const posts = await getPosts()
        const slug = params.mdxPath.join('/')
        const post = posts.find(p => p.route === `/${slug}`)

        const components = getMDXComponents({})
        const Wrapper = components.wrapper || (({ children }: { children: React.ReactNode }) => <>{children}</>)

        return (
            <>
                {/* Structured Data for Articles */}
                {post && (
                    <>
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify(generateStructuredData('Article', {
                                    title: post.title,
                                    description: post.description,
                                    url: post.route,
                                    datePublished: post.date,
                                    dateModified: post.date,
                                    author: post.author,
                                    tags: post.tags,
                                    keywords: post.tags?.join(', ')
                                }))
                            }}
                        />
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify(generateBreadcrumbStructuredData([
                                    { name: 'Home', url: '/' },
                                    { name: 'Posts', url: '/posts' },
                                    { name: post.title, url: post.route }
                                ]))
                            }}
                        />
                    </>
                )}

                <Wrapper {...(toc && { toc })} {...(metadata && { metadata })} post={post}>
                    <MDXContent {...props} params={params} />
                </Wrapper>
            </>
        )
    } catch {
        notFound()
    }
}