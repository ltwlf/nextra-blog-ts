'use client'

import { useEffect, useState } from 'react'

export function ThemeSwitch() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Set initial theme if not set
        const html = document.documentElement
        if (!html.getAttribute('data-theme')) {
            html.setAttribute('data-theme', 'light')
        }
    }, [])

    const toggleTheme = () => {
        const html = document.documentElement
        const currentTheme = html.getAttribute('data-theme')
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
        html.setAttribute('data-theme', newTheme)
        localStorage.setItem('theme', newTheme)
    }

    useEffect(() => {
        // Load saved theme from localStorage
        const savedTheme = localStorage.getItem('theme') || 'light'
        document.documentElement.setAttribute('data-theme', savedTheme)
    }, [])

    if (!mounted) {
        return <div className="btn btn-ghost btn-circle btn-sm"></div>
    }

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle btn-sm"
            aria-label="Toggle theme"
            title="Toggle light/dark theme"
        >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                />
            </svg>
        </button>
    )
}
