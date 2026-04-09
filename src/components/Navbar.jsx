import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import ReactThemeToggle from './ReactThemeToggle';
import './Navbar.css';

function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const changeLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    setIsLanguageOpen(false);
  };

  const renderFlag = (lang) => {
    if (lang === 'fr') {
      return (
        <svg viewBox="0 0 30 20" className="flag-svg" aria-hidden="true">
          <rect width="10" height="20" x="0" y="0" fill="#0055A4" />
          <rect width="10" height="20" x="10" y="0" fill="#FFFFFF" />
          <rect width="10" height="20" x="20" y="0" fill="#EF4135" />
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 30 20" className="flag-svg" aria-hidden="true">
        <rect width="30" height="20" fill="#FFFFFF" />
        <rect y="0" width="30" height="2" fill="#B22234" />
        <rect y="4" width="30" height="2" fill="#B22234" />
        <rect y="8" width="30" height="2" fill="#B22234" />
        <rect y="12" width="30" height="2" fill="#B22234" />
        <rect y="16" width="30" height="2" fill="#B22234" />
        <rect x="0" y="0" width="13" height="10" fill="#3C3B6E" />
      </svg>
    );
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <img
            src="https://api.othmanewp.com/wp-content/uploads/2026/04/logo_portfolio_v1-e1775742356820.png"
            width="63"
            height="60"
            fetchpriority="high"
            decoding="async"
            alt="Logo"
            className="nav-logo-img"
          />
        </Link>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={closeMenu}>{t('nav.home')}</Link>
            </li>
            <li className="nav-item">
              <Link to="/blog" className="nav-link" onClick={closeMenu}>{t('nav.blog')}</Link>
            </li>
            <li className="nav-item">
              <Link to="/portfolio" className="nav-link" onClick={closeMenu}>{t('nav.portfolio')}</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={closeMenu}>{t('nav.about')}</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link" onClick={closeMenu}>{t('nav.contact')}</Link>
            </li>
          </ul>
        </div>

        <div className="nav-actions">
          <div className="language-switcher" ref={languageRef}>
            <button
              type="button"
              className="language-trigger"
              aria-label={t('nav.languageLabel')}
              aria-haspopup="listbox"
              aria-expanded={isLanguageOpen}
              onClick={() => setIsLanguageOpen((prev) => !prev)}
            >
              {renderFlag(language)}
              <span className="language-chevron">▾</span>
            </button>

            {isLanguageOpen && (
              <div className="language-menu" role="listbox" aria-label={t('nav.languageLabel')}>
                <button
                  type="button"
                  className={`language-option ${language === 'en' ? 'active' : ''}`}
                  onClick={() => changeLanguage('en')}
                >
                  {renderFlag('en')}
                  <span className="visually-hidden">English</span>
                </button>
                <button
                  type="button"
                  className={`language-option ${language === 'fr' ? 'active' : ''}`}
                  onClick={() => changeLanguage('fr')}
                >
                  {renderFlag('fr')}
                  <span className="visually-hidden">Francais</span>
                </button>
              </div>
            )}
          </div>

          <div className="theme-toggle-small">
            <ReactThemeToggle
              isDark={darkMode}
              invertedIconLogic
              onChange={toggleTheme}
            />
          </div>

          <button
            className={`hamburger ${isOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label={t('nav.toggleMenu')}
            type="button"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;