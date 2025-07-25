import { getPosts, getTags } from '../../lib/blog'
import { Hero } from '../../components/Hero'
import { SectionHeader } from '../../components/SectionHeader'
import { TagCloud } from '../../components/TagCloud'
import { PostListCard } from '../../components/PostListCard'
import { EmptyState } from '../../components/EmptyState'
import { PageContainer, ContentContainer } from '../../components/Layout'
import { generateMetadata, generateStructuredData, generateBreadcrumbStructuredData } from '../../lib/seo'

export const metadata = generateMetadata({
    title: 'AI Agents & Automation Posts - Expert Insights & Guides',
    description: 'Explore our complete collection of AI agent insights, automation tutorials, and workflow optimization guides. Stay updated with the latest trends in artificial intelligence and productivity.',
    url: '/posts',
    type: 'website'
})

export default async function PostsPage() {
    const tags = await getTags()
    const posts = await getPosts()
    const allTags: Record<string, number> = {}

    for (const tag of tags) {
        allTags[tag] = (allTags[tag] ?? 0) + 1
    }

    const breadcrumbItems = [
        { name: 'Home', url: '/' },
        { name: 'Posts', url: '/posts' }
    ]

    return (
        <PageContainer>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateStructuredData('Blog'))
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateBreadcrumbStructuredData(breadcrumbItems))
                }}
            />

            {/* Hero Section */}
            <Hero
                title="All Posts"
                subtitle="Explore our complete collection of AI agent insights, automation tutorials, and workflow optimization guides"
                badges={[
                    `${posts.length} Posts`,
                    `${Object.keys(allTags).length} Topics`
                ]}
            />

            <ContentContainer>
                {/* Topics Section */}
                {Object.keys(allTags).length > 0 && (
                    <section className="mb-16" itemScope itemType="https://schema.org/ItemList">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-2">Browse by Topic</h2>
                            <p className="text-base-content/70">Find content that matches your interests</p>
                        </div>
                        <TagCloud tags={allTags} title="" />
                    </section>
                )}

                {/* Posts Section */}
                <section className="space-y-8" itemScope itemType="https://schema.org/Blog">
                    <SectionHeader
                        title="Latest Articles"
                        size="medium"
                    />

                    {posts.length > 0 ? (
                        <div className="grid gap-8" itemScope itemType="https://schema.org/ItemList">
                            <meta itemProp="numberOfItems" content={posts.length.toString()} />
                            {posts.map((post, index) => (
                                <div key={post.route} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                                    <meta itemProp="position" content={(index + 1).toString()} />
                                    <PostListCard post={post} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            icon="📝"
                            title="No Posts Yet"
                            description="Check back soon for new content about AI agents and automation!"
                            badge="Coming Soon"
                        />
                    )}
                </section>
            </ContentContainer>
        </PageContainer>
    )
}