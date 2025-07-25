import Link from 'next/link'
import { getPosts, getTags } from '../../../lib/blog'
import { Hero } from '../../../components/Hero'
import { SectionHeader } from '../../../components/SectionHeader'
import { PostListCard } from '../../../components/PostListCard'
import { EmptyState } from '../../../components/EmptyState'
import { PageContainer, ContentContainer } from '../../../components/Layout'

interface PageProps {
    params: Promise<{ tag: string }>
}

export async function generateMetadata(props: PageProps) {
    const params = await props.params
    return {
        title: `Posts Tagged with "${decodeURIComponent(params.tag)}"`
    }
}

export async function generateStaticParams() {
    const allTags = await getTags()
    return [...new Set(allTags)].map(tag => ({ tag }))
}

export default async function TagPage(props: PageProps) {
    const params = await props.params
    const posts = await getPosts()
    const tag = decodeURIComponent(params.tag)
    const filteredPosts = posts.filter(post => post.tags?.includes(tag))

    return (
        <PageContainer>
            {/* Hero Section */}
            <Hero
                title={`Posts tagged with "${tag}"`}
                subtitle={`Found ${filteredPosts.length} post${filteredPosts.length !== 1 ? 's' : ''} about ${tag}`}
                badges={[`${filteredPosts.length} Posts`, `Topic: ${tag}`]}
            />

            <ContentContainer>
                {/* Posts Section */}
                <section className="space-y-8">
                    <SectionHeader
                        title={`Articles about ${tag}`}
                        size="medium"
                    />

                    {filteredPosts.length > 0 ? (
                        <div className="grid gap-8">
                            {filteredPosts.map(post => (
                                <PostListCard key={post.route} post={post} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            icon="🔍"
                            title={`No posts found for "${tag}"`}
                            description="Try browsing other topics or check out all our posts!"
                            badge="No Results"
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
                                    All Posts
                                </Link>
                                <Link href="/tags" className="btn btn-outline">
                                    Browse Topics
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
