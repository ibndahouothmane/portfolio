import './Hero.css';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-availability">
            <span className="availability-dot" aria-hidden="true" />
            {t('hero.availableForWork')}
          </div>

          <p className="hero-kicker">{t('hero.kicker')}</p>
          <h1 className="hero-title" id="hero-title">
            {t('hero.titleLead')}{' '}
            <span>{t('hero.titleAccent')}</span>
          </h1>
          <p className="hero-description">{t('hero.description')}</p>

          <div className="hero-buttons">
            <Link to="/portfolio" className="hero-btn hero-btn-primary">
              {t('hero.viewWork')}
              <ArrowIcon />
            </Link>
            <Link to="/contact" className="hero-btn hero-btn-secondary">
              {t('hero.getInTouch')}
            </Link>
          </div>

          <div className="hero-proof" aria-label={t('hero.proofLabel')}>
            <div className="proof-item">
              <strong>4+</strong>
              <span>{t('hero.yearsExperience')}</span>
            </div>
            <div className="proof-item">
              <strong>20+</strong>
              <span>{t('hero.projectsDelivered')}</span>
            </div>
            <div className="proof-item">
              <strong>MA</strong>
              <span>{t('hero.worldwide')}</span>
            </div>
          </div>

          <div className="hero-stack" aria-label="Technology stack">
            <span>WordPress</span>
            <i aria-hidden="true" />
            <span>WooCommerce</span>
            <i aria-hidden="true" />
            <span>Laravel</span>
            <i aria-hidden="true" />
            <span>React</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
