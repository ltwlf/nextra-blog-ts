export async function GET() {
    const robotsTxt = `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://iloveagents.com'}/sitemap.xml
`

    return new Response(robotsTxt, {
        status: 200,
        headers: {
            'Content-Type': 'text/plain',
        },
    })
}
