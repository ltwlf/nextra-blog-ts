/**
 * Site Configuration
 * 
 * This file contains the ACTUAL customizable metadata and settings for your website.
 * Only includes properties that are really used in the codebase.
 */

export const siteConfig = {
    // Basic Site Information (✅ Used in layout.tsx, seo.ts)
    name: 'I Love Agents',
    description: 'Discover the latest in AI agent technology, workflow automation, and cutting-edge AI tools. Expert guides, tutorials, and insights for building intelligent systems and boosting productivity.',
    tagline: 'Your Ultimate Hub for AI Agents & Automation',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://iloveagents.com',

    // SEO Keywords (✅ Used in layout.tsx, seo.ts)
    keywords: [
        'AI agents',
        'workflow automation',
        'artificial intelligence',
        'automation tools',
        'AI workflows',
        'machine learning',
        'AI productivity',
        'intelligent automation',
        'AI assistants',
        'process automation',
        'AI-powered workflows',
        'digital transformation',
        'smart automation'
    ],

    // Social Media (✅ Used in layout.tsx, seo.ts)
    social: {
        twitter: '@iloveagents',
    },

    // Images (✅ Used in layout.tsx, seo.ts)
    images: {
        logo: '/logo.png',
        favicon: '/favicon.ico',
        icon: '/icon.svg',
        appleTouchIcon: '/apple-touch-icon.png',
        ogImage: '/og-image.jpg',
    },

    // Author Information (✅ Used in layout.tsx, seo.ts)
    author: {
        name: 'I Love Agents Team',
    },

    // Organization Information (✅ Used in layout.tsx, seo.ts)
    organization: {
        name: 'I Love Agents',
    },

    // Theme Configuration (✅ Used in layout.tsx)
    theme: {
        primaryColor: '#3b82f6', // Used for theme-color meta tag
    },

    // Analytics & Verification (✅ Used in layout.tsx)
    analytics: {
        googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION,
        bingSiteVerification: process.env.BING_SITE_VERIFICATION,
    },

    // Localization (✅ Used in layout.tsx, seo.ts)
    locale: 'en_US',

    // RSS Configuration (✅ Used in layout.tsx)
    rss: {
        title: 'I Love Agents RSS Feed',
    },

    // Page-Specific Metadata (✅ Used in layout.tsx)
    pages: {
        home: {
            title: 'Your Ultimate Hub for AI Agents & Automation',
            description: 'Discover the latest in AI agent technology, workflow automation, and cutting-edge AI tools. Expert guides, tutorials, and insights for building intelligent systems.',
        },
        posts: {
            title: 'Latest Posts',
            description: 'Explore our latest articles on AI agents, automation workflows, and productivity tools.',
        },
        tags: {
            title: 'Browse by Tags',
            description: 'Find articles by topic and explore related content on AI agents and automation.',
        },
    },
} as const

// Helper functions to get config values
export function getSiteUrl(path: string = '') {
    return `${siteConfig.url}${path}`
}

export function getImageUrl(imagePath: string) {
    return getSiteUrl(imagePath)
}

export function getPageConfig(page: keyof typeof siteConfig.pages) {
    return siteConfig.pages[page] || {
        title: siteConfig.name,
        description: siteConfig.description,
    }
}

// Type exports for TypeScript
export type SiteConfig = typeof siteConfig
export type SocialPlatform = keyof typeof siteConfig.social
