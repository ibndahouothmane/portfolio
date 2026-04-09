import { useEffect, useRef, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Skills.css';

function Skills() {
  const skillsRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const { t } = useLanguage();

  const skills = useMemo(() => [
    { name: 'Tailwind CSS', level: t('skills.levels.expert'), percentage: 95 },
    { name: 'Laravel', level: t('skills.levels.advanced'), percentage: 88 },
    { name: 'Livewire', level: t('skills.levels.advanced'), percentage: 85 },
    { name: 'WordPress & WooCommerce', level: t('skills.levels.expert'), percentage: 98 },
    { name: 'Advanced Custom Fields (ACF)', level: t('skills.levels.expert'), percentage: 96 },
    { name: 'PHP', level: t('skills.levels.expert'), percentage: 92 },
    { name: 'React', level: t('skills.levels.advanced'), percentage: 85 },
    { name: 'JavaScript & jQuery', level: t('skills.levels.advanced'), percentage: 90 },
    { name: 'HTML & CSS', level: t('skills.levels.expert'), percentage: 94 },
    { name: 'Elementor', level: t('skills.levels.expert'), percentage: 95 },
    { name: 'MySQL & Database Design', level: t('skills.levels.advanced'), percentage: 88 },
    { name: 'REST API Integration', level: t('skills.levels.advanced'), percentage: 87 },
    { name: 'Git & GitHub', level: t('skills.levels.advanced'), percentage: 89 },
    { name: 'SEO Optimization', level: t('skills.levels.intermediate'), percentage: 78 }
  ], [t]);

  useEffect(() => {
    // Reset animation state when skills change
    hasAnimatedRef.current = false;

    const progressBars = skillsRef.current?.querySelectorAll('.progress-fill');
    if (progressBars) {
      progressBars.forEach((bar) => {
        bar.style.width = '0%';
      });
    }

    const animateProgressBars = () => {
      if (hasAnimatedRef.current) return;
      
      const progressBars = skillsRef.current?.querySelectorAll('.progress-fill');
      if (progressBars && progressBars.length > 0) {
        setTimeout(() => {
          progressBars.forEach((bar) => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
          });
          hasAnimatedRef.current = true;
        }, 100);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            animateProgressBars();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
      // Trigger immediately if already in viewport
      setTimeout(() => {
        if (skillsRef.current && !hasAnimatedRef.current) {
          const rect = skillsRef.current.getBoundingClientRect();
          if (rect.top < window.innerHeight) {
            animateProgressBars();
          }
        }
      }, 50);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, [skills]);

  return (
    <section className="skills-section" ref={skillsRef}>
      <div className="skills-wrapper">
        <div className="skills-header">
          <h2>{t('skills.title')}</h2>
          <p className="skills-subtitle">{t('skills.subtitle')}</p>
        </div>
        
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div 
              key={`${skill.name}-${skills.length}`}
              className="skill-item"
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              <div className="skill-content">
                <h3 className="skill-title">{skill.name}</h3>
                <div className="skill-level-wrapper">
                  <span className="skill-level-text">{skill.level}</span>
                  <span className="skill-percentage">{skill.percentage}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    data-width={skill.percentage}
                    style={{ width: '0%' }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;