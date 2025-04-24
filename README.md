# personal-website

Welcome! This is the source code for my personal website and portfolio, built with Next.js and React, and hosted on [Vercel](https://vercel.com/). The site serves as a hub for my academic work, blog posts, and projects, with a focus on mathematics and computer science.

## Live Site

[https://rcatullo.com](https://rcatullo.com)

---

## Features

- **Custom MDX Blog**: Write posts in Markdown with embedded LaTeX, code, and Quiver commutative diagrams.
- **Mathematical Typesetting**: Full support for LaTeX math via KaTeX, including custom macros loaded from a shared `.sty` file.
- **Syntax Highlighting**: Beautiful code blocks with [sugar-high](https://github.com/rauchg/sugar-high).
- **Projects & Papers**: Dedicated page listing authored/co-authored papers and notes.
- **SEO Optimized**: Includes sitemap, robots.txt, and JSON-LD schema for rich search results.
- **RSS Feed**: Subscribe to blog updates via RSS.
- **Dynamic OG Images**: Social sharing images generated on the fly.
- **Responsive & Accessible**: Mobile-friendly, dark mode, and accessible design.
- **Performance Analytics**: Integrated with Vercel Speed Insights and Analytics.
- **Geist Font**: Uses [Geist](https://vercel.com/font) for a modern, clean look.
- **Tailwind CSS v4**: Utility-first styling with custom gradients and themes.

---

## Tech Stack

- **Framework**: [Next.js 13](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + custom border gradients
- **Markdown/MDX**: [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote), [remark-math](https://github.com/remarkjs/remark-math), [rehype-katex](https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex)
- **Math Rendering**: [KaTeX](https://katex.org/)
- **Fonts**: [Geist Sans & Mono](https://vercel.com/font)
- **Hosting**: [Vercel](https://vercel.com/)
- **Analytics**: [@vercel/analytics](https://vercel.com/docs/analytics), [@vercel/speed-insights](https://vercel.com/docs/speed-insights)

---

## Getting Started

1. **Clone the repository**
   ```sh
   git clone https://github.com/rcatullo/personal-website.git
   cd personal-website
   ```

2. **Install dependencies**
   ```sh
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```sh
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser**

---

## Structure

- `/app` — Main Next.js app directory (pages, components, styles)
- `/app/stacks/posts` — Blog posts in MDX format
- `/app/projects` — Projects and papers listing
- `/app/components` — Reusable React components (MDX, footer, nav, etc.)
- `/app/stacks/utils.ts` — Utilities for MDX, LaTeX macros, and file parsing
- `/public` — Static assets

---

## Writing Blog Posts

- Write posts in `/app/stacks/posts` using `.mdx` files.
- Frontmatter supports: `title`, `publishedAt`, `summary`, `image`.
- Math macros are loaded from a shared `.sty` file in a GitHub repo.

---

## Development Notes

- Uses the new Next.js App Router and server components.
- Custom MDX rendering pipeline for math and diagrams.
- Tailwind CSS is extended for custom color themes and border gradients.
- All content is statically generated for performance.

---

## Contact

- **Email**: rcatullo@stanford.edu
- **GitHub**: [github.com/rcatullo](https://github.com/rcatullo)
- **Website**: [rcatullo.com](https://rcatullo.com)

---

MIT Licensed. © {current year} Ryan Catullo
