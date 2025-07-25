interface HeroProps {
    title: string
    subtitle?: string
    badges?: string[]
    accentWord?: string
}

export function Hero({ title, subtitle, badges = [], accentWord }: HeroProps) {
    const renderTitle = () => {
        if (!accentWord) return title

        const parts = title.split(accentWord)
        if (parts.length !== 2) return title

        return (
            <>
                {parts[0]}
                <span className="text-primary">{accentWord}</span>
                {parts[1]}
            </>
        )
    }

    return (
        <div className="hero bg-gradient-to-br from-base-100 to-base-200/50 py-20">
            <div className="hero-content text-center max-w-3xl">
                <div className="space-y-6">
                    <h1 className="text-5xl font-bold">
                        {renderTitle()}
                    </h1>
                    {subtitle && (
                        <p className="text-xl text-base-content/70 max-w-2xl">
                            {subtitle}
                        </p>
                    )}
                    {badges.length > 0 && (
                        <div className="flex justify-center gap-4 flex-wrap">
                            {badges.map((badge, index) => (
                                <div key={index} className="badge badge-primary badge-outline">
                                    {badge}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
