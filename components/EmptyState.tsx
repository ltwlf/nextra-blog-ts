interface EmptyStateProps {
    icon?: string
    title: string
    description: string
    badge?: string
}

export function EmptyState({
    icon = "📝",
    title,
    description,
    badge
}: EmptyStateProps) {
    return (
        <div className="hero py-20">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <div className="text-6xl mb-4">{icon}</div>
                    <h2 className="text-2xl font-bold mb-4">{title}</h2>
                    <p className="text-base-content/70 mb-6">
                        {description}
                    </p>
                    {badge && (
                        <div className="badge badge-primary badge-outline">
                            {badge}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
