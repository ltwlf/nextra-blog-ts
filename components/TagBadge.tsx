'use client'

import Link from 'next/link'

interface TagBadgeProps {
    tag: string
    href: string
    onClick?: () => void
}

export function TagBadge({ tag, href, onClick }: TagBadgeProps) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="badge badge-outline badge-sm hover:badge-primary transition-colors"
        >
            {tag}
        </Link>
    )
}
