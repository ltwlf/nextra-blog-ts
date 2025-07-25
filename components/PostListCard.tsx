'use client'

import { useRouter } from 'next/navigation'
import type { BlogPost } from '../lib/blog'

interface PostListCardProps {
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

export function PostListCard({ post }: PostListCardProps) {
    const router = useRouter()

    const handleCardClick = (e: React.MouseEvent) => {
        // Only navigate if clicking on the card itself, not on topics
        if ((e.target as HTMLElement).closest('.tag-link')) {
            return
        }
        router.push(post.route)
    }

    return (
        <div
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 hover:border-primary/30 cursor-pointer group"
            onClick={handleCardClick}
        >
            <div className="card-body">
                {/* Topics at top */}
                {post.tags && post.tags.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map(tag => (
                            <div key={tag} className="badge badge-primary badge-outline">
                                {tag}
                            </div>
                        ))}
                    </div>
                )}

                {/* Title */}
                <h3 className="card-title text-xl mb-4 leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                </h3>

                {/* Description */}
                {post.description && (
                    <p className="text-base-content/70 mb-6 leading-relaxed">
                        {post.description}
                    </p>
                )}

                {/* Author section */}
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
    )
}
