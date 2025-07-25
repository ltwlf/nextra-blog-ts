# GitHub Copilot Instructions - Web Application

## Project Overview

This is a modern Next.js 15 web application with MDX-based content management. The application uses App Router architecture with TypeScript, Tailwind CSS, and DaisyUI for styling and theming.

## Technology Stack

### Core Framework

- **Next.js 15.4.2** with App Router (not Pages Router)
- **React 19.1.0** with React DOM 19.1.0
- **TypeScript 5.x** for type safety
- **Nextra 4.2.17** for MDX content management

### Styling & UI

- **Tailwind CSS 4.1.11** (latest version)
- **DaisyUI 5.0.46** for component styling and theming
- **theme-change 2.5.0** for theme switching functionality
- Custom CSS variables and design tokens

### Content Management

- **MDX files** in `/content/` directory for content
- **gray-matter 4.0.3** for frontmatter parsing
- Dynamic routing via App Router's `[...mdxPath]` pattern

## Architecture & Routing

### App Router Structure

```
/app/
├── layout.tsx              # Root layout with metadata, SEO, theme
├── page.tsx               # Homepage
├── globals.css            # Global styles and CSS variables
├── mdx-styles.css         # MDX-specific styling
├── [...mdxPath]/          # Dynamic MDX content routing
│   └── page.tsx
├── posts/                 # Content listing pages
├── tags/                  # Tag-based content browsing
├── feed.xml/              # RSS feed generation
├── sitemap.ts            # SEO sitemap
└── _components/          # Layout-specific components
```

### Content Organization

- **MDX files** in `/content/` directory are automatically routed
- No traditional `/pages/` directory - using App Router exclusively
- Dynamic routing handles `/content/example-post.mdx` → `/example-post`
- Frontmatter metadata for SEO, tags, and content organization

## Coding Standards & Conventions

### TypeScript Best Practices

- Use strict TypeScript configuration
- Export types and interfaces from dedicated files
- Prefer `interface` over `type` for object shapes
- Use `const assertions` for configuration objects (`as const`)

### React & Next.js Patterns

- Use **function components** exclusively (no class components)
- Prefer **arrow functions** for component definitions
- Use Next.js App Router features: `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`
- Implement proper SEO with metadata API
- Use server components by default, client components only when needed (`'use client'`)

### Component Architecture

- Components in `/components/` directory with PascalCase naming
- Layout-specific components in `/app/_components/`
- Export default for main component, named exports for utilities
- Props interfaces should be defined inline or in the same file

### Styling Guidelines

- Use **Tailwind CSS classes** for styling
- Leverage **DaisyUI components** and themes: `btn`, `card`, `hero`, `navbar`, etc.
- DaisyUI theme configuration: light/dark mode support
- CSS custom properties for theme values in `globals.css`
- Responsive design with Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`

## Configuration Files

### Key Configuration

- `tailwind.config.ts` - Tailwind 4.x with DaisyUI integration
- `next.config.ts` - Nextra integration, security headers, image optimization
- `config/site.ts` - Centralized site configuration and metadata
- `tsconfig.json` - TypeScript configuration with strict settings

### DaisyUI Theme Setup

```typescript
// DaisyUI themes: 'light' and 'dark'
// Theme switching via theme-change library
// CSS variables for consistent theming
```

## Content & SEO Best Practices

### MDX Content Guidelines

- Use frontmatter for metadata: `title`, `description`, `tags`, `date`
- Implement proper heading hierarchy (h1 → h6)
- Include meta descriptions and keywords
- Use semantic HTML elements

### SEO Implementation

- Metadata API for page-specific SEO
- OpenGraph and Twitter card support
- Structured data and JSON-LD
- Automatic sitemap and RSS feed generation
- Proper canonical URLs and meta tags

## File Naming Conventions

### Components

- PascalCase for component files: `PostCard.tsx`, `ThemeSwitch.tsx`
- Descriptive names reflecting component purpose
- Index files for barrel exports when needed

### Content

- kebab-case for MDX files: `example-article.mdx`
- Descriptive filenames matching URL structure
- Organize by topic in subdirectories when needed

### Utilities & Configuration

- camelCase for utility files: `blog.ts`, `seo.ts`
- Configuration files with descriptive names: `site.ts`, `tailwind.config.ts`

## Development Workflow

### Commands

- `npm run dev` - Development server with Turbopack
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - ESLint code quality checks

### Environment

- Development server runs on default Next.js port
- Hot reload for both code and content changes
- TypeScript checking in real-time
- Tailwind CSS compilation with watch mode

## Common Patterns & Examples

### Theme Implementation

```typescript
// Use DaisyUI data attributes for theming
<div data-theme="light" className="min-h-screen">
  <button className="btn btn-primary">Primary Button</button>
</div>
```

### MDX Content Structure

```typescript
// Frontmatter example
---
title: "Article Title"
description: "SEO description"
tags: ["tag1", "tag2"]
date: "2025-01-15"
---
```

### App Router Page Component

```typescript
// app/page.tsx pattern
export default function HomePage() {
  return (
    <main className="container mx-auto px-4">
      <Hero />
      <FeaturedPosts />
    </main>
  );
}

export const metadata = {
  title: "Page Title",
  description: "Page description",
};
```

## Performance & Optimization

### Next.js Features

- Image optimization with next/image
- Automatic code splitting
- Static generation for content pages
- Optimized bundle analysis

### Tailwind CSS

- Purge unused CSS in production
- JIT compilation for development
- Component extraction for reusable patterns

## Error Handling & Debugging

### Common Issues

- Ensure MDX files have proper frontmatter
- Check DaisyUI theme configuration
- Verify Tailwind CSS class names
- Validate TypeScript types for props

### Best Practices

- Use proper error boundaries
- Implement loading states
- Handle async operations gracefully
- Provide fallback content for dynamic imports
