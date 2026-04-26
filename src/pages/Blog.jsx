import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Seo from '../components/Seo';
import ApolloProviderWrapper from '../components/ApolloProviderWrapper';
import './Blog.css';

const GET_POSTS = gql`
  query GetPosts($first: Int!, $after: String, $categoryName: String) {
    posts(first: $first, after: $after, where: { categoryName: $categoryName }) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        id
        title
        excerpt
        date
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
          }
        }
      }
    }
    categories(first: 10) {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`;

function BlogContent() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });
  const postsPerPage = 9;

  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      first: postsPerPage,
      after: null,
      categoryName: null
    }
  });

  const loadMore = () => {
    if (data?.posts?.pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          after: data.posts.pageInfo.endCursor,
          categoryName: null
        }
      });
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    const email = newsletterEmail.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail) {
      setNewsletterStatus({ submitting: false, submitted: false, error: t('blogPage.newsletterInvalidEmail') });
      return;
    }

    setNewsletterStatus({ submitting: true, submitted: false, error: null });

    try {
      const graphQLEndpoint = import.meta.env.VITE_GRAPHQL_URL || 'https://api.othmanewp.com/graphql';
      const apiBase = graphQLEndpoint.replace(/\/graphql\/?$/, '');

      const endpointCandidates = [
        `${apiBase}/wp-json/contact/v1/submit`,
        '/wp-json/contact/v1/submit'
      ];

      let isSuccess = false;
      let lastErrorMessage = null;

      for (const endpoint of endpointCandidates) {
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: 'Newsletter Subscriber',
              email,
              subject: 'Newsletter Subscription',
              message: `Please subscribe this email to the newsletter: ${email}`
            })
          });

          const raw = await response.text();
          const data = raw ? JSON.parse(raw) : {};

          if (response.ok) {
            isSuccess = true;
            break;
          }

          lastErrorMessage = data.message || `Request failed (${response.status})`;
        } catch (endpointError) {
          lastErrorMessage = endpointError.message;
        }
      }

      if (!isSuccess) {
        throw new Error(lastErrorMessage || t('blogPage.newsletterError'));
      }

      setNewsletterStatus({ submitting: false, submitted: true, error: null });
      setNewsletterEmail('');

      setTimeout(() => {
        setNewsletterStatus({ submitting: false, submitted: false, error: null });
      }, 5000);
    } catch (submitError) {
      setNewsletterStatus({
        submitting: false,
        submitted: false,
        error: submitError.message || t('blogPage.newsletterError')
      });
    }
  };

  if (loading) {
    return (
      <div className="blog-list-page">
        <div className="blog-container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>{t('blogPage.loadingPosts')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-list-page">
        <div className="blog-container">
          <div className="error-state">
            <h2>{t('blogPage.unableToLoad')}</h2>
            <p>{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const posts = data?.posts?.nodes || [];
  const categories = data?.categories?.nodes || [];

  // Filter posts by category and search query
  const filteredPosts = posts.filter(post => {
    // Filter by category
    const matchesCategory = selectedCategory
      ? post.categories.nodes.some(cat => cat.slug === selectedCategory)
      : true;

    // Filter by search query
    const matchesSearch = searchQuery.trim()
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="blog-list-page">
      <Seo
        title="WordPress & Web Development Blog | Morocco to Global"
        description="Read WordPress, SEO, React, and Laravel insights from a Morocco-based developer building scalable platforms for global businesses."
        path="/blog"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' }
        ]}
        locale={t('locale').replace('-', '_')}
      />
      {/* Hero Section */}
      <div className="blog-hero">
        <div className="blog-hero-content">
          <h1>{t('blogPage.heroTitle')}</h1>
          <p>{t('blogPage.heroSubtitle')}</p>
        </div>
      </div>

      <div className="blog-container">
        {/* Mobile Filter Toggle Button */}
        <div className="mobile-filter-toggle">
          <button
            className="filter-toggle-btn"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <svg className="filter-toggle-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M7 12h10M10 17h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>{t('blogPage.filters')}</span>
          </button>
        </div>

        {/* Mobile Filter Popup Overlay */}
        {showMobileFilters && (
          <div className="mobile-filters-overlay" onClick={() => setShowMobileFilters(false)}>
            <div className="mobile-filters-popup" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-filters-header">
                <h2>{t('blogPage.filters')}</h2>
                <button
                  className="close-btn"
                  onClick={() => setShowMobileFilters(false)}
                >
                  ✕
                </button>
              </div>
              <div className="mobile-filters-content">
                {/* Search */}
                <div className="filter-section">
                  <h3>{t('blogPage.search')}</h3>
                  <input
                    type="text"
                    placeholder={t('blogPage.searchPlaceholder')}
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Categories */}
                <div className="filter-section">
                  <h3>{t('blogPage.categories')}</h3>
                  <ul className="category-list">
                    <li
                      className={!selectedCategory ? 'active' : ''}
                      onClick={() => {
                        setSelectedCategory(null);
                        setShowMobileFilters(false);
                      }}
                    >
                      <span>{t('blogPage.allPosts')}</span>
                    </li>
                    {categories
                      .filter(category => category.name.toLowerCase() !== 'uncategorized')
                      .map(category => (
                        <li
                          key={category.id}
                          className={selectedCategory === category.slug ? 'active' : ''}
                          onClick={() => {
                            setSelectedCategory(category.slug);
                            setShowMobileFilters(false);
                          }}
                        >
                          <span>{category.name}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <div className="mobile-filters-footer">
                <button
                  className="apply-filters-btn"
                  onClick={() => setShowMobileFilters(false)}
                >
                  {t('blogPage.apply')}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="blog-layout">

          {/* Sidebar */}
          <aside className="blog-sidebar">
            {/* Search */}
            <div className="sidebar-widget">
              <h3>{t('blogPage.search')}</h3>
              <input
                type="text"
                placeholder={t('blogPage.searchPlaceholder')}
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div className="sidebar-widget">
              <h3>{t('blogPage.categories')}</h3>
              <ul className="category-list">
                <li
                  className={!selectedCategory ? 'active' : ''}
                  onClick={() => setSelectedCategory(null)}
                >
                  <span>{t('blogPage.allPosts')}</span>
                  <span className="count">{posts.length}</span>
                </li>
                {categories
                  .filter(category => category.name.toLowerCase() !== 'uncategorized')
                  .map(category => (
                    <li
                      key={category.id}
                      className={selectedCategory === category.slug ? 'active' : ''}
                      onClick={() => setSelectedCategory(category.slug)}
                    >
                      <span>{category.name}</span>
                      <span className="count">{category.count}</span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Popular Tags */}
            <div className="sidebar-widget">
              <h3>{t('blogPage.popularTopics')}</h3>
              <div className="tags-cloud">
                <span className="tag">WordPress</span>
                <span className="tag">React</span>
                <span className="tag">JavaScript</span>
                <span className="tag">PHP</span>
                <span className="tag">CSS</span>
                <span className="tag">Elementor</span>
                <span className="tag">SEO</span>
                <span className="tag">Web Design</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="sidebar-widget newsletter-widget">
              <h3>{t('blogPage.newsletterTitle')}</h3>
              <p>{t('blogPage.newsletterDescription')}</p>

              {newsletterStatus.submitted && (
                <p className="newsletter-feedback success">{t('blogPage.newsletterSuccess')}</p>
              )}

              {newsletterStatus.error && (
                <p className="newsletter-feedback error">{newsletterStatus.error}</p>
              )}

              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder={t('blogPage.newsletterPlaceholder')}
                  className="newsletter-input"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button className="newsletter-btn" type="submit" disabled={newsletterStatus.submitting}>
                  {newsletterStatus.submitting ? t('blogPage.subscribing') : t('blogPage.subscribe')}
                </button>
              </form>
            </div>
          </aside>

          {/* Main Content */}
          <section className="blog-main" aria-label={t('blogPage.posts')}>
            {filteredPosts.length > 0 ? (
              <>
                <div className="blog-grid">
                  {filteredPosts.map((post, index) => (
                    <article
                      key={post.id}
                      className="blog-card"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Link to={`/blog/${post.slug}`} className="blog-card-link">
                        <div className="blog-image">
                          {post.featuredImage ? (
                            <img
                              src={post.featuredImage.node.sourceUrl}
                              alt={post.featuredImage.node.altText || post.title}
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <div className="blog-image-placeholder">
                              <span>📝</span>
                            </div>
                          )}
                          {post.categories.nodes.length > 0 && (
                            <span className="blog-category">
                              {post.categories.nodes[0].name}
                            </span>
                          )}
                        </div>

                        <div className="blog-content">
                          <h2 className="blog-title">{post.title}</h2>
                          <div
                            className="blog-excerpt"
                            dangerouslySetInnerHTML={{ __html: post.excerpt }}
                          />
                          <div className="blog-footer">
                            <div className="blog-meta">
                              <span className="blog-author">{t('blogPage.by')} {post.author.node.name}</span>
                              <span className="blog-date">
                                {new Date(post.date).toLocaleDateString(t('locale'), {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                            <span className="read-more">{t('blogPage.readMore')} →</span>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>

                {/* Load More Button */}
                {data?.posts?.pageInfo?.hasNextPage && (
                  <div className="load-more-wrapper">
                    <button
                      className="load-more-btn"
                      onClick={loadMore}
                      disabled={loading}
                    >
                      {loading ? t('blogPage.loading') : t('blogPage.loadMore')}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="empty-state">
                <h3>{t('blogPage.noPostsFound')}</h3>
                <p>{t('blogPage.noPostsHelp')}</p>
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}

function Blog() {
  return (
    <ApolloProviderWrapper>
      <BlogContent />
    </ApolloProviderWrapper>
  );
}

export default Blog;