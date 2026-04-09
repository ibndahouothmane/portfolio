# Headless SEO Implementation Guide

## 1) Environment variables
Create `.env` from `.env.example` and set:
- `VITE_SITE_URL=https://your-real-domain.com`
- `VITE_GRAPHQL_URL=https://your-wp-domain.com/graphql`

This powers canonical URLs, OG URLs, and sitemap links.

## 2) What was implemented in React
- Dynamic title/description/canonical tags via `react-helmet-async`
- Open Graph + Twitter tags
- JSON-LD schemas (`Article`, `Person`, `BreadcrumbList`)
- Route-level metadata and canonical logic
- 404 page with `noindex`
- Route code splitting with `React.lazy`
- Lazy-loaded CMS images
- Sitemap generation from GraphQL
- robots.txt

## 3) Files added
- `src/components/Seo.jsx`
- `src/pages/NotFound.jsx`
- `scripts/generate-sitemap.mjs`
- `public/robots.txt`
- `.env.example`

## 4) Files updated
- `src/main.jsx` (HelmetProvider)
- `src/App.jsx` (lazy routes, 404 route)
- `src/pages/Home.jsx`
- `src/pages/About.jsx`
- `src/pages/Contact.jsx`
- `src/pages/Portfolio.jsx`
- `src/pages/Blog.jsx`
- `src/pages/BlogPost.jsx`
- `src/components/Blog.jsx`
- `index.html`
- `vite.config.js`
- `package.json`

## 5) WordPress plugin recommendations (headless)
Install these in WordPress backend:
1. **Yoast SEO** or **Rank Math**: metadata management
2. **WPGraphQL Yoast SEO Addon** (or equivalent for your SEO plugin): expose SEO fields through GraphQL
3. **Polylang** or **WPML** + their WPGraphQL integration: language-specific content in API
4. **Converter for Media** or **ShortPixel**: WebP/AVIF generation
5. **Schema & Structured Data for WP** (if needed): additional schema types

## 6) Content SEO actions
- Add target keyword in: title, first paragraph, one H2, meta description, and URL slug.
- Keep each article > 800 words when possible.
- Add 3-5 internal links per article to related blog posts or portfolio pages.
- Add descriptive image alt text tied to intent (not generic).
- Avoid thin content pages (<300 words) unless they are utility pages.

## 7) Internal linking opportunities
- Blog posts should link to `/portfolio` case studies.
- Portfolio entries should link back to related `/blog/{slug}` tutorials.
- About page should link to Contact and Portfolio CTAs.

## 8) SSR / Pre-render note
Current app is CSR with strong metadata support. For best indexing reliability, next upgrade should be SSR or static pre-render (e.g., migrate to Next.js or use a React pre-render pipeline).
