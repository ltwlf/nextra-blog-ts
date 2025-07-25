'use client'

import { usePathname } from 'next/navigation'
import type { PageMapItem } from 'nextra'
import { Anchor } from 'nextra/components'
import { normalizePages } from 'nextra/normalize-pages'
import type { FC } from 'react'
import { ThemeSwitch } from '../../components/ThemeSwitch'

export const Navbar: FC<{ pageMap: PageMapItem[] }> = ({ pageMap }) => {
    const pathname = usePathname()
    const { topLevelNavbarItems } = normalizePages({
        list: pageMap,
        route: pathname || '/'
    })

    return (
        <div className="navbar bg-base-100/95 border-b border-base-200 sticky top-0 z-50 backdrop-blur-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {topLevelNavbarItems.map(item => {
                            const route = item.route || ('href' in item ? item.href! : '')
                            return (
                                <li key={route}>
                                    <Anchor href={route} className="text-base-content hover:text-primary">
                                        {item.title}
                                    </Anchor>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <Anchor href="/" className="btn btn-ghost text-xl font-bold">
                    Simple Blog
                </Anchor>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {topLevelNavbarItems.map(item => {
                        const route = item.route || ('href' in item ? item.href! : '')
                        return (
                            <li key={route}>
                                <Anchor href={route} className="text-base-content hover:text-primary">
                                    {item.title}
                                </Anchor>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="navbar-end">
                <ThemeSwitch />
            </div>
        </div>
    )
}
