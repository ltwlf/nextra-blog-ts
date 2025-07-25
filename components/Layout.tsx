import type { ReactNode } from 'react'

interface PageContainerProps {
    children: ReactNode
}

export function PageContainer({ children }: PageContainerProps) {
    return (
        <div className="space-y-16">
            {children}
        </div>
    )
}

interface ContentContainerProps {
    children: ReactNode
}

export function ContentContainer({ children }: ContentContainerProps) {
    return (
        <div className="container mx-auto max-w-6xl px-6 space-y-16">
            {children}
        </div>
    )
}
