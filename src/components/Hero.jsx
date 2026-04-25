import './Hero.css';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import automotiveShowcase from '../assets/optimized/2ef854ef-556x1024.webp';
import showcaseOne from '../assets/optimized/32aa37bf-575x1024.webp';
import mainShowcase from '../assets/optimized/2ee675e5-372x1024.webp';
import showcaseThree from '../assets/optimized/c747bd43-359x1024.webp';
import showcaseTwo from '../assets/optimized/2c26b767-458x1024.webp';

function Hero() {
  const { t } = useLanguage();

  const showcaseImages = [
    {
      src: automotiveShowcase,
      alt: 'Automotive website showcase',
      width: 556,
      height: 1024
    },
    {
      src: showcaseOne,
      alt: 'Portfolio project showcase one',
      width: 575,
      height: 1024
    },
    {
      src: mainShowcase,
      alt: 'Main portfolio showcase',
      width: 372,
      height: 1024
    },
    {
      src: showcaseThree,
      alt: 'Portfolio project showcase three',
      width: 359,
      height: 1024
    },
    {
      src: showcaseTwo,
      alt: 'Portfolio project showcase two',
      width: 458,
      height: 1024
    }

  ];

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-greeting">{t('hero.greeting')} 👋</span>
            <h1 className="hero-title">
              {t('hero.title')}
            </h1>
            <p className="hero-description">
              {t('hero.description')}
            </p>
            <div className="hero-buttons">
              <Link to="/portfolio" className="btn btn-primary">
                {t('hero.viewWork')}
              </Link>
              <Link to="/contact" className="btn btn-outline">
                {t('hero.getInTouch')}
              </Link>
            </div>
            <div className="hero-social">
              <a href="https://github.com/ibndahouothmane" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/othmane-ibn-dahou-idrissi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-stack" aria-label="Portfolio highlights">
              {showcaseImages.map((image, index) => (
                <div key={image.src} className={`stack-card stack-${index}`}>
                  <img
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    loading={index === 2 ? 'eager' : 'lazy'}
                    fetchpriority={index === 2 ? 'high' : 'low'}
                    decoding="async"
                    alt={image.alt}
                    className="stack-img"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;