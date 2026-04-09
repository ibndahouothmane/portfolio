import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Seo from '../components/Seo';
import './Contact.css';

function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: null });

    try {
      const graphQLEndpoint = import.meta.env.VITE_GRAPHQL_URL || 'https://api.othmanewp.com/graphql';
      const apiBase = graphQLEndpoint.replace(/\/graphql\/?$/, '');

      const endpointCandidates = [
        `${apiBase}/wp-json/contact/v1/submit`,
        '/wp-json/contact/v1/submit'
      ];

      let successData = null;
      let lastErrorMessage = null;

      for (const endpoint of endpointCandidates) {
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
          });

          const raw = await response.text();
          const data = raw ? JSON.parse(raw) : {};

          if (response.ok) {
            successData = data;
            break;
          }

          lastErrorMessage = data.message || `Request failed (${response.status})`;
        } catch (endpointError) {
          lastErrorMessage = endpointError.message;
        }
      }

      if (successData) {
        setFormStatus({ submitting: false, submitted: true, error: null });
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setFormStatus({ submitting: false, submitted: false, error: null });
        }, 5000);
      } else {
        setFormStatus({
          submitting: false,
          submitted: false,
          error: lastErrorMessage || t('contact.genericError')
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({
        submitting: false,
        submitted: false,
        error: t('contact.failedToSend')
      });
    }
  };

  const isFrench = t('locale').startsWith('fr');

  const infoCards = [
    {
      key: 'email',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      ),
      title: t('contact.email'),
      value: 'ibndahou.idrissi.othmane@gmail.com',
      helper: t('contact.sendMessageLink'),
      href: 'mailto:ibndahou.idrissi.othmane@gmail.com'
    },
    {
      key: 'phone',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92V20a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h3.09a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L9.09 11a16 16 0 0 0 3.91 3.91l1.36-1.25a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      title: t('contact.phone'),
      value: '+212 625 293 258',
      helper: t('contact.callMe'),
      href: 'tel:+212625293258'
    },
    {
      key: 'location',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21s-6-5.6-6-10a6 6 0 0 1 12 0c0 4.4-6 10-6 10z" />
          <circle cx="12" cy="11" r="2.5" />
        </svg>
      ),
      title: t('contact.location'),
      value: 'Mohammedia, Morocco',
      helper: t('contact.timezone')
    },
    {
      key: 'availability',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12l2.5 2.5L16 9" />
        </svg>
      ),
      title: t('contact.availability'),
      value: t('contact.availabilityText'),
      helper: t('contact.availableNow')
    }
  ];

  return (
    <div className="contact-page">
      <Seo
        title="Contact Othmane | WordPress & Web Developer Morocco"
        description="Hire a Morocco-based WordPress and Full-Stack Web Developer for scalable projects in Morocco and worldwide."
        path="/contact"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' }
        ]}
        locale={t('locale').replace('-', '_')}
      />
      <div className="contact-container">

        {/* Contact Header */}
        <div className="contact-header">
          <span className="contact-kicker">{isFrench ? 'Parlons de votre projet' : 'Let us build your next project'}</span>
          <h1>{t('contact.title')} <span>{isFrench ? 'Maroc & Global' : 'Morocco & Global'}</span></h1>
          <p>{t('contact.subtitle')}</p>
        </div>

        <div className="contact-wrapper">

          {/* Contact Info */}
          <div className="contact-info">
            <div className="contact-intro-card">
              <h2>{isFrench ? 'Des sites evolutifs, rapides et orientés business' : 'Scalable, fast and business-driven websites'}</h2>
              <p>
                {isFrench
                  ? 'WordPress sur mesure, WooCommerce, migration, performance et architecture technique robuste.'
                  : 'Custom WordPress, WooCommerce, migrations, performance optimization, and strong technical architecture.'}
              </p>
            </div>

            <div className="info-grid">
              {infoCards.map((card) => (
                <article className="info-card" key={card.key}>
                  <div className="info-icon" aria-hidden="true">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.value}</p>
                  {card.href ? (
                    <a href={card.href}>{card.helper}</a>
                  ) : (
                    <p className="availability-status">{card.helper}</p>
                  )}
                </article>
              ))}
            </div>

            {/* Social Links */}
            <div className="contact-social">
              <h3>{t('contact.followMe')}</h3>
              <div className="social-links">
                <a href="https://github.com/othmanewp" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/othmane-ibn-dahou-idrissi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>{t('contact.sendMeMessage')}</h2>

              {formStatus.submitted && (
                <div className="success-message">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="22 4 12 14.01 9 11.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p>{t('contact.successMessage')}</p>
                </div>
              )}

              {formStatus.error && (
                <div className="error-message">
                  <p>{formStatus.error}</p>
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">{t('contact.nameLabel')} *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.namePlaceholder')}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">{t('contact.emailLabel')} *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.emailPlaceholder')}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">{t('contact.subjectLabel')} *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder={t('contact.subjectPlaceholder')}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">{t('contact.messageLabel')} *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder={t('contact.messagePlaceholder')}
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={formStatus.submitting}
              >
                {formStatus.submitting ? (
                  <>
                    <span className="btn-spinner"></span>
                    {t('contact.sendingButton')}
                  </>
                ) : (
                  <>
                    {t('contact.sendButton')}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <line x1="22" y1="2" x2="11" y2="13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;