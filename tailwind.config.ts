import type { Config } from 'tailwindcss'

interface DaisyUIConfig {
    themes: string[]
    darkTheme: string
    base: boolean
    styled: boolean
    utils: boolean
}

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './content/**/*.{js,ts,jsx,tsx,mdx}',
        './mdx-components.tsx',
    ],
    theme: {
        extend: {
            // Extend theme as needed
        },
    },
    plugins: [
    ],
}

// Add DaisyUI configuration
const configWithDaisyUI = config as Config & { daisyui: DaisyUIConfig }
configWithDaisyUI.daisyui = {
    themes: [
        'light',      // DaisyUI light theme
        'dark',       // DaisyUI dark theme
    ],
    darkTheme: 'dark', // Default dark theme
    base: true, // Apply background color and foreground color for root element
    styled: true, // Include daisyUI colors and design decisions
    utils: true, // Add responsive and modifier utility classes
}

export default configWithDaisyUI
