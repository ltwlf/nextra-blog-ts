import { Metadata } from 'next'
import Link from 'next/link'
import { getPosts, getFeaturedPosts, getRegularPosts } from '../lib/blog'
import { generateMetadata, generateStructuredData } from '../lib/seo'
import { FeaturedPostCard } from '../components/FeaturedPostCard'

export const metadata: Metadata = generateMetadata({
  title: 'I Love Agents - Your Ultimate Hub for AI Agents & Automation',
  description: 'Discover the latest in AI agent technology, workflow automation, and cutting-edge AI tools. Expert guides, tutorials, and insights for building intelligent systems and boosting productivity.',
  url: '/',
  type: 'website'
})

export default async function HomePage() {
  const allPosts = await getPosts()
  const featuredPosts = await getFeaturedPosts()
  const regularPosts = await getRegularPosts()

  // Show different layouts based on number of posts
  let displayFeaturedPosts = featuredPosts.slice(0, 0) // Initialize with correct type
  let listPosts = regularPosts.slice(0, 0) // Initialize with correct type

  if (featuredPosts.length > 0) {
    // If we have featured posts, show them prominently
    displayFeaturedPosts = featuredPosts.slice(0, 3) // Show up to 3 featured posts
    listPosts = regularPosts.slice(0, 6) // Show up to 6 regular posts
  } else if (allPosts.length === 1) {
    // If no featured posts but only 1 post, show it as featured
    displayFeaturedPosts = allPosts.slice(0, 1)
    listPosts = []
  } else if (allPosts.length === 2) {
    // If no featured posts but 2 posts, show both as featured
    displayFeaturedPosts = allPosts.slice(0, 2)
    listPosts = []
  } else {
    // If no featured posts but multiple posts, show first 2 as featured
    displayFeaturedPosts = allPosts.slice(0, 2)
    listPosts = allPosts.slice(2, 8)
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData('WebSite'))
        }}
      />

      <div className="space-y-16">
        {/* Hero Section - Minimal with brand accent */}
        <div className="hero bg-gradient-to-br from-base-100 to-base-200/50 py-20">
          <div className="hero-content text-center max-w-3xl">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold">
                I Love <span className="text-primary">Agents</span>
              </h1>
              <p className="text-xl text-base-content/70 max-w-2xl">
                Your ultimate hub for AI agents, workflow automation, and intelligent systems.
                Discover expert guides, cutting-edge tools, and practical insights to boost your productivity.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <div className="badge badge-primary badge-outline">AI Agents</div>
                <div className="badge badge-primary badge-outline">Automation</div>
                <div className="badge badge-primary badge-outline">Productivity</div>
                <div className="badge badge-primary badge-outline">Workflows</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-6xl px-6 space-y-16">
          {/* Featured Posts Section */}
          {displayFeaturedPosts.length > 0 && (
            <section className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">Featured Articles</h2>
                <p className="text-base-content/70 mb-4">Latest insights on AI agents and automation</p>
                <div className="divider w-24 mx-auto"></div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayFeaturedPosts.map(post => (
                  <FeaturedPostCard key={post.route} post={post} />
                ))}
              </div>
            </section>
          )}

          {/* Recent Posts List */}
          {listPosts.length > 0 && (
            <section className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-semibold mb-2">Recent Posts</h2>
                <p className="text-base-content/70 mb-4">Stay updated with the latest trends</p>
                <div className="divider w-16 mx-auto"></div>
              </div>

              <div className="card bg-base-100 shadow border border-base-300">
                <div className="card-body p-0">
                  <div className="divide-y divide-base-300">
                    {listPosts.map((post) => (
                      <article key={post.route}>
                        <Link href={post.route} className="block p-4 group hover:bg-base-200 transition-colors duration-200 cursor-pointer">
                          <div>
                            {/* Topic badge at top */}
                            {post.tags && post.tags.length > 0 && (
                              <div className="mb-2">
                                <span className="badge badge-ghost badge-sm">
                                  {post.tags[0]}
                                </span>
                              </div>
                            )}

                            {/* Title */}
                            <h3 className="font-semibold text-base text-base-content group-hover:text-primary transition-colors">
                              {post.title}
                            </h3>

                            {/* Description */}
                            {post.description && (
                              <p className="text-sm text-base-content/70 mt-2 line-clamp-2 leading-relaxed">
                                {post.description}
                              </p>
                            )}

                            {/* Author and date at bottom */}
                            <div className="text-sm text-base-content/60 mt-3">
                              By {post.author || 'hololux'} •
                              <time dateTime={new Date(post.date).toISOString()} className="ml-1">
                                {new Date(post.date).toLocaleDateString()}
                              </time>
                            </div>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>
              </div>

              {allPosts.length > 5 && (
                <div className="text-center">
                  <Link href="/posts" className="btn btn-outline btn-primary">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0l-4 4m4-4l-4-4" />
                    </svg>
                    View All Posts
                  </Link>
                </div>
              )}
            </section>
          )}

          {/* Empty State */}
          {allPosts.length === 0 && (
            <div className="hero py-20">
              <div className="hero-content text-center">
                <div className="max-w-md">
                  <div className="text-6xl mb-4">✨</div>
                  <h2 className="text-2xl font-bold mb-4">Ready to Start Writing?</h2>
                  <p className="text-base-content/70 mb-6">
                    Add your first MDX file to the content folder and watch your blog come to life!
                  </p>
                  <div className="badge badge-primary badge-outline">
                    Drop in your .mdx files and go
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
