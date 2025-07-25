import type { Metadata } from 'next'
import { getPageMap } from 'nextra/page-map'
import type { ReactNode } from 'react'
import './globals.css'
import { NextraTheme } from './_components/theme'
import { siteConfig } from '../config/site'

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.pages.home.title
  },
  description: siteConfig.pages.home.description,
  keywords: [...siteConfig.keywords], // Convert readonly array to mutable
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  publisher: siteConfig.organization.name,
  category: 'Technology',
  classification: 'Technology Blog',
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
    types: {
      'application/rss+xml': [
        { url: '/feed.xml', title: siteConfig.rss.title },
        { url: '/rss.xml', title: siteConfig.rss.title }
      ]
    }
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.pages.home.title,
    description: siteConfig.pages.home.description,
    images: [
      {
        url: siteConfig.images.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.tagline}`,
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.social.twitter,
    creator: siteConfig.social.twitter,
    title: siteConfig.pages.home.title,
    description: siteConfig.pages.home.description,
    images: [siteConfig.images.ogImage],
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
  verification: {
    google: siteConfig.analytics.googleSiteVerification,
    other: {
      'msvalidate.01': siteConfig.analytics.bingSiteVerification || '',
    }
  },
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const pageMap = await getPageMap()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="canonical"
          href={siteConfig.url}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={siteConfig.rss.title}
          href="/rss.xml"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={siteConfig.rss.title}
          href="/feed.xml"
        />
        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="/sitemap.xml"
        />
        <link rel="icon" href={siteConfig.images.favicon} sizes="any" />
        <link rel="icon" href={siteConfig.images.icon} type="image/svg+xml" />
        <link rel="apple-touch-icon" href={siteConfig.images.appleTouchIcon} />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content={siteConfig.theme.primaryColor} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={siteConfig.name} />

        {/* Structured Data for Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
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
                "name": siteConfig.organization.name,
                "url": siteConfig.url,
                "logo": {
                  "@type": "ImageObject",
                  "url": `${siteConfig.url}${siteConfig.images.logo}`
                }
              }
            })
          }}
        />

        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <NextraTheme pageMap={pageMap}>
          {children}
        </NextraTheme>
      </body>
    </html>
  )
}