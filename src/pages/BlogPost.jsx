import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useLanguage } from '../context/LanguageContext';
import Seo from '../components/Seo';
import ApolloProviderWrapper from '../components/ApolloProviderWrapper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './BlogPost.css';

const GET_POST = gql`
  query GetPost($slug: String!, $categoryName: String) {
    postBy(slug: $slug) {
      id
      title
      content
      date
      excerpt
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
          avatar {
            url
          }
        }
      }
    }
    posts(first: 6, where: { orderby: { field: DATE, order: DESC }, categoryName: $categoryName }) {
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
`;

function BlogPostContent() {
  const { t } = useLanguage();
  const { slug } = useParams();
  
  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  const { loading, error, data } = useQuery(GET_POST, {
    variables: {
      slug,
      categoryName: null
    }
  });

  if (loading) {
    return (
      <div className="blog-post-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>{t('blogPost.loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !data?.postBy) {
    console.error('Error:', error);
    return (
      <div className="blog-post-page">
        <div className="error-container">
          <h2>{t('blogPost.notFoundTitle')}</h2>
          <p>{t('blogPost.notFoundDescription')}</p>
          <Link to="/" className="btn btn-primary">{t('blogPost.goHome')}</Link>
        </div>
      </div>
    );
  }

  const post = data.postBy;
  const relatedPosts = data.posts.nodes || [];
  const displayRelatedPosts = relatedPosts.filter(p => p.slug !== slug);
  const blogPostPath = `/blog/${post.slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt?.replace(/<[^>]*>/g, ' ').trim(),
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author?.node?.name || 'Othmane Ibn Dahou Idrissi'
    },
    mainEntityOfPage: `https://othmanewp.com${blogPostPath}`,
    image: post.featuredImage?.node?.sourceUrl || undefined
  };

  return (
    <div className="blog-post-page">
      <Seo
        title={`${post.title} | Blog`}
        description={post.excerpt || post.title}
        path={blogPostPath}
        image={post.featuredImage?.node?.sourceUrl}
        type="article"
        schema={articleSchema}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: blogPostPath }
        ]}
        locale={t('locale').replace('-', '_')}
      />
      {/* Hero Section */}
      <div className="post-hero">
        {post.featuredImage && (
          <div className="post-hero-image">
            <img 
              src={post.featuredImage.node.sourceUrl} 
              alt={post.featuredImage.node.altText || post.title} 
              fetchpriority="high"
            />
            <div className="hero-overlay"></div>
          </div>
        )}
        <div className="post-hero-content">
          <div className="post-meta">
            {post.categories.nodes.length > 0 && (
              <span className="post-category">{post.categories.nodes[0].name}</span>
            )}
            <span className="post-date">
              {new Date(post.date).toLocaleDateString(t('locale'), {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
          <h1 className="post-title">{post.title}</h1>
          {post.author && (
            <div className="post-author">
              <img 
                src={post.author.node.avatar.url} 
                alt={post.author.node.name}
                className="author-avatar"
              />
              <span>{t('blogPost.by')} OTHMANE</span>
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="post-container">
        <article className="post-content">
          <div 
            className="post-body" 
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Related Posts Slider */}
        {displayRelatedPosts.length > 0 && (
          <div className="related-posts">
            <h2>{t('blogPost.relatedPosts')}</h2>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                968: { slidesPerView: 3 }
              }}
              className="related-swiper"
            >
              {displayRelatedPosts.map((relatedPost) => (
                <SwiperSlide key={relatedPost.id}>
                  <Link to={`/blog/${relatedPost.slug}`} className="related-card">
                    <div className="related-image">
                      {relatedPost.featuredImage ? (
                        <img 
                          src={relatedPost.featuredImage.node.sourceUrl} 
                          alt={relatedPost.title}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="related-placeholder">📝</div>
                      )}
                      {relatedPost.categories.nodes.length > 0 && (
                        <span className="related-category">
                          {relatedPost.categories.nodes[0].name}
                        </span>
                      )}
                    </div>
                    <div className="related-content">
                      <h3>{relatedPost.title}</h3>
                      <div 
                        className="related-excerpt" 
                        dangerouslySetInnerHTML={{ __html: relatedPost.excerpt }}
                      />
                      <span className="related-date">
                        {new Date(relatedPost.date).toLocaleDateString(t('locale'), {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
}

function BlogPost() {
  return (
    <ApolloProviderWrapper>
      <BlogPostContent />
    </ApolloProviderWrapper>
  );
}

export default BlogPost;