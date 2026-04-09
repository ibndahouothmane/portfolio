import { Helmet } from 'react-helmet-async';

const DEFAULT_SITE_URL = import.meta.env.VITE_SITE_URL || 'https://example.com';
const DEFAULT_IMAGE = `${DEFAULT_SITE_URL}/og-image.jpg`;

function stripHtml(input = '') {
  return input.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function buildAbsoluteUrl(path = '/') {
  const base = DEFAULT_SITE_URL.endsWith('/') ? DEFAULT_SITE_URL.slice(0, -1) : DEFAULT_SITE_URL;
  const cleanedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanedPath}`;
}

function Seo({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  schema,
  breadcrumbs = [],
  noIndex = false,
  locale = 'en_US'
}) {
  const canonical = buildAbsoluteUrl(path);
  const ogImage = image || DEFAULT_IMAGE;
  const cleanDescription = stripHtml(description).slice(0, 160);

  const breadcrumbSchema = breadcrumbs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: buildAbsoluteUrl(item.path)
        }))
      }
    : null;

  const schemaList = [schema, breadcrumbSchema].filter(Boolean);

  return (
    <Helmet>
      <html lang={locale.startsWith('fr') ? 'fr' : 'en'} />
      <title>{title}</title>
      <meta name="description" content={cleanDescription} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={cleanDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Othmane Portfolio" />
      <meta property="og:locale" content={locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={cleanDescription} />
      <meta name="twitter:image" content={ogImage} />

      {schemaList.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}

export default Seo;
