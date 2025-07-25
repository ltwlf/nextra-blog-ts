import { useMDXComponents as getNextraComponents } from 'nextra/mdx-components'
import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import { BlogPost } from './lib/blog'

interface CustomMetadata {
    title?: string
    description?: string | null
    date?: string
    tags?: string[]
    author?: string
}

interface WrapperProps {
    children: React.ReactNode
    metadata?: CustomMetadata | Record<string, unknown>
    post?: BlogPost
}

const defaultComponents = getNextraComponents({
    wrapper({ children, metadata, post }: WrapperProps) {
        // Type assertion for custom frontmatter properties
        const customMetadata = metadata as CustomMetadata
        const blogPost = post || customMetadata

        return (
            <div className="w-full">
                {/* Article Header */}
                {blogPost && (
                    <header className="mb-14" itemScope itemType="https://schema.org/Article">
                        <h1
                            className="text-5xl md:text-6xl font-bold mb-6"
                            style={{ color: 'hsl(var(--bc))', lineHeight: '1.1' }}
                            itemProp="headline"
                        >
                            {blogPost.title || 'Untitled'}
                        </h1>
                        {blogPost.description && (
                            <p className="text-xl mb-8 max-w-3xl" itemProp="description">
                                {blogPost.description}
                            </p>
                        )}
                        <div className="flex items-center gap-6 text-sm flex-wrap">
                            {blogPost.date && (
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <time dateTime={new Date(blogPost.date).toISOString()} itemProp="datePublished">
                                        {new Date(blogPost.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </time>
                                    <meta itemProp="dateModified" content={new Date(blogPost.date).toISOString()} />
                                </div>
                            )}
                            {blogPost.author && (
                                <div className="flex items-center gap-2" itemProp="author" itemScope itemType="https://schema.org/Person">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span itemProp="name">By {blogPost.author}</span>
                                </div>
                            )}
                            {blogPost.tags && Array.isArray(blogPost.tags) && (
                                <div className="flex gap-2 flex-wrap">
                                    {blogPost.tags.map((tag: string) => (
                                        <Link
                                            key={tag}
                                            href={`/tags/${encodeURIComponent(tag)}`}
                                            className="badge badge-primary badge-outline hover:badge-primary transition-colors"
                                            itemProp="keywords"
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Hidden metadata for SEO */}
                        {post && (
                            <>
                                <meta itemProp="wordCount" content={post.content.split(' ').length.toString()} />
                                <meta itemProp="inLanguage" content="en-US" />
                                <div itemProp="publisher" itemScope itemType="https://schema.org/Organization" style={{ display: 'none' }}>
                                    <meta itemProp="name" content="I Love Agents" />
                                    <div itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
                                        <meta itemProp="url" content={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://iloveagents.com'}/logo.png`} />
                                    </div>
                                </div>
                            </>
                        )}
                    </header>
                )}

                {/* Article Content */}
                <article
                    className="mdx-content prose prose-lg max-w-none"
                    itemProp="articleBody"
                >
                    {children}
                </article>

                {/* Article Footer with Social Sharing */}
                {post && (
                    <footer className="mt-16 pt-8 border-t border-base-300">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="text-sm text-base-content/60">
                                Published on {new Date(post.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    href="/posts"
                                    className="btn btn-outline btn-sm"
                                    rel="prev"
                                >
                                    ← All Posts
                                </Link>
                            </div>
                        </div>
                    </footer>
                )}
            </div>
        )
    }
})

export const useMDXComponents = (components: MDXComponents): MDXComponents => ({
    ...defaultComponents,
    ...components,
    // Enhanced heading components with proper hierarchy
    h1: (props) => <h1 {...props} className="text-4xl font-bold mt-8 mb-4" />,
    h2: (props) => <h2 {...props} className="text-3xl font-semibold mt-8 mb-4" />,
    h3: (props) => <h3 {...props} className="text-2xl font-semibold mt-6 mb-3" />,
    h4: (props) => <h4 {...props} className="text-xl font-semibold mt-6 mb-3" />,
    h5: (props) => <h5 {...props} className="text-lg font-semibold mt-4 mb-2" />,
    h6: (props) => <h6 {...props} className="text-base font-semibold mt-4 mb-2" />,

    // Enhanced paragraph with better spacing
    p: (props) => <p {...props} className="mb-4 leading-relaxed" />,

    // Enhanced list components
    ul: (props) => <ul {...props} className="mb-4 pl-6 list-disc" />,
    ol: (props) => <ol {...props} className="mb-4 pl-6 list-decimal" />,
    li: (props) => <li {...props} className="mb-2" />,

    // Enhanced link component
    a: ({ href, children, ...props }) => {
        if (href?.startsWith('/')) {
            return (
                <Link href={href} {...props} className="text-primary hover:text-primary-focus transition-colors underline">
                    {children}
                </Link>
            )
        }
        return (
            <a
                href={href}
                {...props}
                className="text-primary hover:text-primary-focus transition-colors underline"
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </a>
        )
    },

    // Enhanced code blocks
    pre: (props) => <pre {...props} className="bg-base-200 p-4 rounded-lg overflow-x-auto mb-4" />,
    code: (props) => <code {...props} className="bg-base-200 px-2 py-1 rounded text-sm" />,

    // Enhanced blockquote
    blockquote: (props) => (
        <blockquote {...props} className="border-l-4 border-primary pl-4 italic my-4 text-base-content/80" />
    ),
})
