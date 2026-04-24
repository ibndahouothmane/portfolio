import './About.css';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import profileImage from '../assets/optimized/me.webp';

function About() {
  const { t } = useLanguage();
  const statsRef = useRef(null);
  const [counters, setCounters] = useState({ projects: 0, codeLines: 0, years: 0 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const animateCounters = () => {
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    const targets = { projects: 120, codeLines: 150000, years: 5 };

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCounters({
        projects: Math.floor(targets.projects * progress),
        codeLines: Math.floor(targets.codeLines * progress),
        years: Math.floor(targets.years * progress),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="section-header">
          <span className="section-label">{t('about.sectionLabel')}</span>
          <h2 className="section-title">{t('about.title')}</h2>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p>
              {t('about.paragraph1')}
            </p>
            <p>
              {t('about.paragraph2')}
            </p>
            <p>
              {t('about.paragraph3')}
            </p>
            
            <div className="about-stats" ref={statsRef}>
              <div className="stat-item">
                <h3>{counters.projects}+</h3>
                <p>{t('about.websitesMigrated')}</p>
              </div>
              <div className="stat-item">
                <h3>{counters.codeLines.toLocaleString()}+</h3>
                <p>{t('about.codeLinesShipped')}</p>
              </div>
              <div className="stat-item">
                <h3>{counters.years}+</h3>
                <p>{t('about.yearsExperience')}</p>
              </div>
            </div>

            <a href="/resume.pdf" className="btn btn-primary" download>
              {t('about.downloadCv')}
            </a>
          </div>

          <div className="about-image">
            <img 
              src={profileImage}
              width="747"
              height="1024"
              loading="lazy"
              decoding="async"
              alt="About me" 
              className="about-img"
            />
            <div className="about-decoration"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;