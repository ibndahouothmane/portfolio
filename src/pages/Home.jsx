import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import Seo from '../components/Seo';
import './Home.css';

const Blog = lazy(() => import('../components/Blog'));

function Home() {
  const blogTriggerRef = useRef(null);
  const [shouldRenderBlog, setShouldRenderBlog] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRenderBlog(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' }
    );

    if (blogTriggerRef.current) {
      observer.observe(blogTriggerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Othmane Ibn Dahou Idrissi',
    jobTitle: 'WordPress and Full-Stack Web Developer',
    url: 'https://othmanewp.com/',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MA',
      addressLocality: 'Mohammedia'
    },
    areaServed: ['MA', 'Worldwide'],
    knowsAbout: ['WordPress', 'WooCommerce', 'Laravel', 'React', 'Technical SEO'],
    sameAs: [
      'https://github.com/othmanewp',
      'https://www.linkedin.com/in/othmane-ibn-dahou-idrissi'
    ]
  };

  return (
    <div className="home">
      <Seo
        title="WordPress Developer in Morocco | Scalable Global Web Solutions"
        description="Morocco-based WordPress and Full-Stack Web Developer building scalable websites and web platforms for Moroccan and international businesses."
        path="/"
        schema={schema}
        breadcrumbs={[{ name: 'Home', path: '/' }]}
      />
      <Hero />
      <About />
      <Services />
      <Experience />
      <Skills />
      <div ref={blogTriggerRef}>
        {shouldRenderBlog ? (
          <Suspense fallback={<section className="blog-section home-blog-placeholder" aria-hidden="true" />}>
            <Blog />
          </Suspense>
        ) : (
          <section className="blog-section home-blog-placeholder" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

export default Home;