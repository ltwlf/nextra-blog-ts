import Link from 'next/link'
import { getTags, getPosts } from '../../lib/blog'
import { Hero } from '../../components/Hero'
import { SectionHeader } from '../../components/SectionHeader'
import { EmptyState } from '../../components/EmptyState'
import { PageContainer, ContentContainer } from '../../components/Layout'

export const metadata = {
    title: 'Topics'
}

export default async function TagsPage() {
    const tags = await getTags()
    const posts = await getPosts()
    const allTags: Record<string, number> = {}

    for (const tag of tags) {
        allTags[tag] = (allTags[tag] ?? 0) + 1
    }

    return (
        <PageContainer>
            {/* Hero Section */}
            <Hero
                title="Browse by Topics"
                subtitle={`Discover content organized by ${Object.keys(allTags).length} different topics`}
                badges={[`${Object.keys(allTags).length} Topics`, `${posts.length} Posts`]}
                accentWord="Topics"
            />

            <ContentContainer>
                {/* Topics Section */}
                <section className="space-y-8">
                    <SectionHeader
                        title="All Topics"
                        size="medium"
                    />

                    {Object.keys(allTags).length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {Object.entries(allTags).map(([tag, count]) => (
                                <Link key={tag} href={`/tags/${tag}`} className="group">
                                    <div className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:border-primary/30">
                                        <div className="card-body text-center">
                                            <h3 className="card-title justify-center text-lg group-hover:text-primary transition-colors">
                                                {tag}
                                            </h3>
                                            <p className="text-base-content/70">
                                                {count} post{count !== 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            icon="🏷️"
                            title="No topics available yet"
                            description="Check back soon as we add more content and organize it by topics!"
                            badge="Coming Soon"
                        />
                    )}
                </section>

                {/* Navigation Section */}
                <section className="space-y-8">
                    <div className="card bg-base-200 shadow border border-base-300">
                        <div className="card-body text-center">
                            <h2 className="card-title justify-center mb-4">Explore More Content</h2>
                            <div className="flex gap-4 justify-center flex-wrap">
                                <Link href="/posts" className="btn btn-outline">
                                    View All Posts
                                </Link>
                                <Link href="/" className="btn btn-outline">
                                    Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </ContentContainer>
        </PageContainer>
    )
}
