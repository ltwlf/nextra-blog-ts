import Link from 'next/link'
import type { BlogPost } from '../lib/blog'

interface FeaturedPostCardProps {
    post: BlogPost
}

// Utility function to generate initials
function getInitials(name: string): string {
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('')
        .substring(0, 2)
}

export function FeaturedPostCard({ post }: FeaturedPostCardProps) {
    return (
        <Link href={post.route} className="group">
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 group-hover:border-primary/30 cursor-pointer h-full">
                <div className="card-body">
                    {/* Tag badge at top */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mb-3">
                            <div className="badge badge-primary badge-outline">
                                {post.tags[0]}
                            </div>
                        </div>
                    )}

                    {/* Title */}
                    <h3 className="card-title text-xl mb-4 leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                    </h3>

                    {/* Description - limited to 3 lines */}
                    {post.description && (
                        <p className="text-base-content/70 mb-6 line-clamp-3 leading-relaxed">
                            {post.description}
                        </p>
                    )}

                    {/* Author section at bottom */}
                    <div className="flex items-center gap-3 mt-auto">
                        <div className="avatar avatar-placeholder">
                            <div className="bg-primary text-primary-content w-10 rounded-full">
                                <span className="text-sm font-medium">
                                    {getInitials(post.author || 'hololux')}
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className="font-medium text-sm">
                                {post.author || 'hololux'}
                            </div>
                            <div className="text-xs text-base-content/60">
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
