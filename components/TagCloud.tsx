import Link from 'next/link'

interface TagCloudProps {
    tags: Record<string, number>
    title?: string
}

export function TagCloud({ tags, title = "Browse by Topics" }: TagCloudProps) {
    if (Object.keys(tags).length === 0) return null

    return (
        <section className="space-y-8">
            {title && (
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-2">{title}</h2>
                    <div className="divider w-24 mx-auto"></div>
                </div>
            )}

            <div className="card bg-base-100 shadow border border-base-300">
                <div className="card-body">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {Object.entries(tags).map(([tag, count]) => (
                            <Link key={tag} href={`/tags/${tag}`}>
                                <span className="badge badge-outline hover:badge-primary transition-colors cursor-pointer">
                                    {tag} ({count})
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
