import { useQuery, gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Seo from '../components/Seo';
import ApolloProviderWrapper from '../components/ApolloProviderWrapper';
import "./portfolio.css";

const GET_PORTFOLIO = gql`
  query GetPortfolio {
    portfolio {
      nodes {
        id
        title
        content
        excerpt
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

function PortfolioContent() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);
  const [websiteLink, setWebsiteLink] = useState('');
  const [websiteLinkLoading, setWebsiteLinkLoading] = useState(false);
  const staticTechStack = ['WordPress', 'ACF', 'Tailwind CSS', 'JavaScript'];

  const { loading, error, data } = useQuery(GET_PORTFOLIO);

  useEffect(() => {
    if (!selectedProject?.slug) {
      setWebsiteLink('');
      setWebsiteLinkLoading(false);
      return;
    }

    let isActive = true;

    const loadWebsiteLink = async () => {
      setWebsiteLink('');
      setWebsiteLinkLoading(true);

      try {
        const graphQLEndpoint = import.meta.env.VITE_GRAPHQL_URL || 'https://api.othmanewp.com/graphql';
        const apiBase = graphQLEndpoint.replace(/\/graphql\/?$/, '');
        const response = await fetch(
          `${apiBase}/wp-json/wp/v2/portfolio?slug=${encodeURIComponent(selectedProject.slug)}&_fields=slug,acf`
        );

        if (!response.ok) {
          return;
        }

        const items = await response.json();
        const portfolioItem = Array.isArray(items) ? items[0] : null;
        const acfFields = portfolioItem?.acf || {};
        const resolvedLink = acfFields.website_link || acfFields.websiteLink || '';

        if (isActive) {
          setWebsiteLink(resolvedLink);
        }
      } catch {
        if (isActive) {
          setWebsiteLink('');
        }
      } finally {
        if (isActive) {
          setWebsiteLinkLoading(false);
        }
      }
    };

    loadWebsiteLink();

    return () => {
      isActive = false;
    };
  }, [selectedProject]);

  if (loading) {
    return (
      <div className="portfolio-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>{t('portfolio.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="portfolio-page">
        <div className="error-container">
          <h2>{t('portfolio.unableToLoad')}</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  const projects = data?.portfolio?.nodes || [];

  return (
    <div className="portfolio-page">
      <Seo
        title="WordPress Portfolio | Morocco and Global Web Projects"
        description="Explore scalable WordPress and web development projects delivered for businesses in Morocco and international markets."
        path="/portfolio"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Portfolio', path: '/portfolio' }
        ]}
        locale={t('locale').replace('-', '_')}
      />
      {/* Hero Section */}
      <div className="portfolio-hero">
        <div className="portfolio-hero-content">
          <h1>{t('portfolio.heroTitle')}</h1>
          <p>{t('portfolio.heroSubtitle')}</p>
        </div>
      </div>

      <div className="portfolio-container">

        {/* Portfolio Grid */}
        {projects.length > 0 ? (
          <div className="portfolio-grid">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="portfolio-card"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="portfolio-image">
                  {project.featuredImage ? (
                    <img
                      src={project.featuredImage.node.sourceUrl}
                      alt={project.featuredImage.node.altText || project.title}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="portfolio-placeholder">
                      <span>💼</span>
                    </div>
                  )}
                  <div className="portfolio-overlay">
                    <div className="overlay-content">
                      <h3>{project.title}</h3>
                      <button className="view-btn">{t('portfolio.viewDetails')}</button>
                    </div>
                  </div>
                </div>
                <div className="portfolio-info">
                  <h3>{project.title}</h3>
                  <div 
                    className="technologies"
                    dangerouslySetInnerHTML={{ __html: project.excerpt }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>{t('portfolio.noProjects')}</h3>
            <p>{t('portfolio.noProjectsHelp')}</p>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="project-modal" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              ×
            </button>

            <div className="modal-grid">
              <div className="modal-image">
                {selectedProject.featuredImage ? (
                  <img
                    src={selectedProject.featuredImage.node.sourceUrl}
                    alt={selectedProject.title}
                  />
                ) : (
                  <div className="modal-placeholder">💼</div>
                )}
              </div>

              <div className="modal-details">
                <h2>{selectedProject.title}</h2>

                <div
                  className="modal-description"
                  dangerouslySetInnerHTML={{ __html: selectedProject.content }}
                />

                <div className="modal-tech-stack">
                  <h3>Technologies</h3>
                  <div className="modal-tech-list">
                    {staticTechStack.map((tech) => (
                      <span key={tech} className="modal-tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                {websiteLink && (
                  <div className="modal-actions">
                    <a
                      className="btn btn-primary"
                      href={websiteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website
                    </a>
                  </div>
                )}

                {websiteLinkLoading && (
                  <p className="modal-link-loading">Loading website link...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Portfolio() {
  return (
    <ApolloProviderWrapper>
      <PortfolioContent />
    </ApolloProviderWrapper>
  );
}

export default Portfolio;