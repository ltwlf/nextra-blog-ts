interface SectionHeaderProps {
    title: string
    size?: 'large' | 'medium' | 'small'
}

export function SectionHeader({ title, size = 'large' }: SectionHeaderProps) {
    const sizeClasses = {
        large: 'text-3xl font-bold mb-2',
        medium: 'text-2xl font-semibold mb-2',
        small: 'text-xl font-medium mb-2'
    }

    const dividerClasses = {
        large: 'w-24',
        medium: 'w-16',
        small: 'w-12'
    }

    return (
        <div className="text-center">
            <h2 className={sizeClasses[size]}>{title}</h2>
            <div className={`divider ${dividerClasses[size]} mx-auto`}></div>
        </div>
    )
}
