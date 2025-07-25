import Link from 'next/link'
import type { FC } from 'react'

export const Footer: FC = () => {
    return (
        <footer className="footer footer-center bg-base-200 text-base-content border-t border-base-300 p-10">
            <div className="text-center space-y-6">
                <nav className="flex justify-center gap-6 flex-wrap">
                    <a href="/feed.xml" className="link link-hover">
                        RSS
                    </a>
                    <Link href="/posts" className="link link-hover">
                        Posts
                    </Link>
                    <Link href="/tags" className="link link-hover">
                        Topics
                    </Link>
                    <Link href="/legal/imprint" className="link link-hover">
                        Imprint
                    </Link>
                    <Link href="/legal/data-policy" className="link link-hover">
                        Data Policy
                    </Link>
                </nav>

                <div className="space-y-2">
                    <p className="font-semibold text-primary text-lg">I Love Agents</p>
                    <p className="text-sm opacity-70">A blog about AI agents and automation</p>
                </div>

                <div>
                    <p className="text-xs opacity-60">2025 © @hololux</p>
                </div>
            </div>
        </footer>
    )
}
