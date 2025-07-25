import type { PageMapItem } from 'nextra'
import type { FC, ReactNode } from 'react'
import { Footer } from './footer'
import { Navbar } from './navbar'

export const NextraTheme: FC<{
    children: ReactNode
    pageMap: PageMapItem[]
}> = ({ children, pageMap }) => {
    return (
        <div className="min-h-screen bg-base-100 flex flex-col">
            <Navbar pageMap={pageMap} />
            <main className="container mx-auto max-w-6xl px-6 py-12 flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}
