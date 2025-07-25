import type { Metadata } from 'next'
import { BlogPost } from './blog'
import { siteConfig, getSiteUrl, getImageUrl } from '../config/site'

interface SEOProps {
    title?: string
    description?: string
    image?: string
    url?: string
    type?: 'website' | 'article'
    publishedTime?: string
    modifiedTime?: string
    tags?: string[]
    author?: string
    section?: string
}

interface StructuredDataProps {
    title?: string
    description?: string
    image?: string
    url?: string
    datePublished?: string
    dateModified?: string
    author?: string
    keywords?: string
    tags?: string[]
}

export function generateMetadata({
    title,
    description,
    image,
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    tags,
    author,
    section
}: SEOProps = {}): Metadata {
    const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
    const pageDescription = description || siteConfig.description
    const pageUrl = url ? getSiteUrl(url) : siteConfig.url
    const pageImage = image ? getSiteUrl(image) : getImageUrl(siteConfig.images.ogImage)

    const metadata: Metadata = {
        title: pageTitle,
        description: pageDescription,
        alternates: {
            canonical: pageUrl,
        },
        openGraph: {
            title: pageTitle,
            description: pageDescription,
            url: pageUrl,
            siteName: siteConfig.name,
            images: [
                {
                    url: pageImage,
                    width: 1200,
                    height: 630,
                    alt: title || siteConfig.name,
                }
            ],
            locale: siteConfig.locale,
            type: type,
        },
        twitter: {
            card: 'summary_large_image',
            title: pageTitle,
            description: pageDescription,
            images: [pageImage],
            site: siteConfig.social.twitter,
            creator: siteConfig.social.twitter,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    }

    // Add article-specific metadata
    if (type === 'article') {
        metadata.openGraph = {
            ...metadata.openGraph,
            type: 'article',
            publishedTime,
            modifiedTime,
            authors: author ? [author] : undefined,
            section,
            tags,
        }
    }

    return metadata
}

export function generateBlogPostMetadata(post: BlogPost): Metadata {
    return {
        ...generateMetadata({
            title: post.title,
            description: post.description,
            url: post.route,
            type: 'article',
            publishedTime: post.date,
            modifiedTime: post.date,
            tags: post.tags,
            author: post.author,
            section: 'AI Agents & Automation'
        }),
        keywords: [
            ...post.tags || [],
            ...siteConfig.keywords.slice(0, 5) // Add some site keywords
        ],
        authors: [{ name: post.author || siteConfig.author.name }],
        other: {
            'article:tag': post.tags?.join(', ') || '',
            'article:section': 'Technology',
            'article:author': post.author || siteConfig.author.name,
        }
    }
}

export function generateStructuredData(type: 'WebSite' | 'Article' | 'Blog', data: StructuredDataProps = {}) {
    const baseData = {
        "@context": "https://schema.org",
        "@type": type,
    }

    switch (type) {
        case 'WebSite':
            return {
                ...baseData,
                "name": siteConfig.name,
                "description": siteConfig.description,
                "url": siteConfig.url,
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": `${siteConfig.url}/search?q={search_term_string}`
                    },
                    "query-input": "required name=search_term_string"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": siteConfig.name,
                    "url": siteConfig.url,
                    "logo": {
                        "@type": "ImageObject",
                        "url": getImageUrl(siteConfig.images.logo)
                    }
                }
            }

        case 'Article':
            return {
                ...baseData,
                "headline": data.title,
                "description": data.description,
                "image": data.image || getImageUrl(siteConfig.images.ogImage),
                "datePublished": data.datePublished,
                "dateModified": data.dateModified || data.datePublished,
                "author": {
                    "@type": "Person",
                    "name": data.author || siteConfig.author.name
                },
                "publisher": {
                    "@type": "Organization",
                    "name": siteConfig.name,
                    "logo": {
                        "@type": "ImageObject",
                        "url": getImageUrl(siteConfig.images.logo)
                    }
                },
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": getSiteUrl(data.url || '')
                },
                "keywords": data.keywords || data.tags?.join(', ') || '',
                "articleSection": "Technology",
                "inLanguage": "en-US"
            }

        case 'Blog':
            return {
                ...baseData,
                "name": `${siteConfig.name} Blog`,
                "description": "Latest insights on AI agents, automation, and intelligent workflows",
                "url": getSiteUrl('/posts'),
                "publisher": {
                    "@type": "Organization",
                    "name": siteConfig.name,
                    "url": siteConfig.url
                },
                "inLanguage": "en-US"
            }

        default:
            return baseData
    }
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": getSiteUrl(item.url)
        }))
    }
}
