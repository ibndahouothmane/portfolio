import { useQuery, gql } from '@apollo/client';
import './Blog.css';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import ApolloProviderWrapper from './ApolloProviderWrapper';

const GET_POSTS = gql`
  query GetPosts($categoryName: String) {
    posts(first: 6, where: { categoryName: $categoryName }) {
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
          }
        }
      }
    }
  }
`;

function BlogContent() {
  const { t } = useLanguage();
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: {
      categoryName: null
    }
  });

  if (loading) {
    return (
      <section className="blog-section">
        <div className="blog-container">
          <div className="blog-header">
            <h2>{t('blogSection.title')}</h2>
            <p className="blog-subtitle">{t('blogSection.subtitle')}</p>
          </div>
          <div className="loading-state">
            <div className="spinner"></div>
            <p>{t('blogSection.loading')}</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="blog-section">
        <div className="blog-container">
          <div className="blog-header">
            <h2>{t('blogSection.title')}</h2>
          </div>
          <div className="error-state">
            <p>{t('blogSection.error')}</p>
          </div>
        </div>
      </section>
    );
  }

  const posts = data?.posts?.nodes || [];

  return (
    <section className="blog-section">
      <div className="blog-container">
        <div className="blog-header">
          <h2>{t('blogSection.title')}</h2>
          <p className="blog-subtitle">{t('blogSection.subtitle')}</p>
        </div>
        
        {posts.length > 0 ? (
          <div className="blog-grid">
            {posts.map((post, index) => (
              <article 
                key={post.id} 
                className="blog-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
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
                  <h3 className="blog-title">{post.title}</h3>
                  <div 
                    className="blog-excerpt" 
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                  <div className="blog-footer">
                    <span className="blog-date">
                      {new Date(post.date).toLocaleDateString(t('locale'), {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <Link to={`/blog/${post.slug}`} className="read-more">
                      {t('blogSection.readMore')} →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>{t('blogSection.empty')}</p>
          </div>
        )}
      </div>
    </section>
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