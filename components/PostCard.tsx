import Link from 'next/link'
import type { BlogPost } from '../lib/blog'

interface PostCardProps {
    post: BlogPost
}

export function PostCard({ post }: PostCardProps) {
    return (
        <div className="card-body">
            <h3 className="card-title">
                <Link href={post.route} className="link link-hover">
                    {post.title}
                </Link>
            </h3>

            {post.description && (
                <p className="text-base-content/70">{post.description}</p>
            )}

            <div className="card-actions justify-between items-center mt-4">
                <div className="flex gap-2">
                    {post.tags?.slice(0, 3).map(tag => (
                        <Link key={tag} href={`/tags/${tag}`}>
                            <span className="badge badge-outline badge-sm hover:badge-primary transition-colors">
                                {tag}
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="text-sm text-base-content/50">
                    {new Date(post.date).toLocaleDateString()}
                </div>
            </div>
        </div>
    )
}
