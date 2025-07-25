import { getPosts } from '../../lib/blog'
import type { BlogPost } from '../../lib/blog'

const SITE_URL = process.env.SITE_URL || 'https://iloveagents.com'

export async function GET() {
    const posts = await getPosts()

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>I Love Agents</title>
    <description>AI Agents, Modern Workflows, and Everything in Between</description>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts
            .map(
                (post: BlogPost) => `
    <item>
      <title>${escapeXml((post.frontMatter?.title as string) || post.title)}</title>
      <description>${escapeXml((post.frontMatter?.description as string) || post.description || '')}</description>
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
      <link>${SITE_URL}${post.route}</link>
      <guid>${SITE_URL}${post.route}</guid>
      <pubDate>${post.date ? new Date(post.date).toUTCString() : new Date().toUTCString()}</pubDate>
      ${post.frontMatter?.author ? `<author>${escapeXml(post.frontMatter.author as string)}</author>` : ''}
      ${post.tags ? post.tags.map((tag: string) => `<category>${escapeXml(tag)}</category>`).join('') : ''}
    </item>`
            )
            .join('')}
  </channel>
</rss>`

    return new Response(rss, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        },
    })
}

function escapeXml(unsafe: string): string {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
}
