import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = (process.env.VITE_SITE_URL || 'https://api.othmanewp.com').replace(/\/$/, '');
const GRAPHQL_URL = process.env.VITE_GRAPHQL_URL || 'https://api.othmanewp.com/graphql';

const query = `
  query SitemapData {
    posts(first: 1000) {
      nodes {
        slug
        date
        modified
      }
    }
    portfolio(first: 1000) {
      nodes {
        slug
        modified
      }
    }
  }
`;

function urlNode(loc, lastmod, changefreq = 'weekly', priority = '0.7') {
  return `
  <url>
    <loc>${loc}</loc>
    ${lastmod ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function generateSitemap() {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch GraphQL data: ${response.status}`);
  }

  const payload = await response.json();
  if (payload.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(payload.errors)}`);
  }

  const posts = payload?.data?.posts?.nodes || [];
  const projects = payload?.data?.portfolio?.nodes || [];

  const staticUrls = [
    urlNode(`${SITE_URL}/`, new Date().toISOString(), 'weekly', '1.0'),
    urlNode(`${SITE_URL}/about`, null, 'monthly', '0.8'),
    urlNode(`${SITE_URL}/portfolio`, null, 'weekly', '0.9'),
    urlNode(`${SITE_URL}/blog`, null, 'daily', '0.9'),
    urlNode(`${SITE_URL}/contact`, null, 'monthly', '0.7')
  ];

  const postUrls = posts
    .filter((post) => post.slug)
    .map((post) => urlNode(`${SITE_URL}/blog/${post.slug}`, post.modified || post.date, 'monthly', '0.8'));

  const projectUrls = projects
    .filter((project) => project.slug)
    .map((project) => urlNode(`${SITE_URL}/portfolio#${project.slug}`, project.modified, 'monthly', '0.6'));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...staticUrls, ...postUrls, ...projectUrls].join('')}
</urlset>`;

  const outPath = path.resolve('public', 'sitemap.xml');
  await writeFile(outPath, xml, 'utf8');
  console.log(`Sitemap generated: ${outPath}`);
}

generateSitemap().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
