import './Services.css';
import { useLanguage } from '../context/LanguageContext';

function Services() {
  const { t } = useLanguage();

  const defaultServices = [
    {
      id: 1,
      icon: 'website',
      translationIndex: 0
    },
    {
      id: 2,
      icon: 'responsive',
      translationIndex: 1
    },
    {
      id: 3,
      icon: 'ecommerce',
      translationIndex: 2
    },
    {
      id: 4,
      icon: 'performance',
      translationIndex: 3
    },
    {
      id: 5,
      icon: 'security',
      translationIndex: 4
    },
    {
      id: 6,
      icon: 'seo',
      translationIndex: 5
    },
    {
      id: 7,
      icon: 'migration',
      translationIndex: 6
    },
    {
      id: 8,
      icon: 'forms',
      translationIndex: 7
    },
    {
      id: 9,
      icon: 'analytics',
      translationIndex: 8
    }
  ];

  const translatedItems = t('services.items');
  const services = defaultServices.map((service) => {
    const translated = Array.isArray(translatedItems)
      ? translatedItems[service.translationIndex]
      : null;

    return {
      ...service,
      title: translated?.title || '',
      description: translated?.description || ''
    };
  });

  return (
    <section className="services-section" id="services">
      <div className="services-wrapper">
        <div className="services-header">
          <h2>{t('services.title')}</h2>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="service-card"
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              <div className="service-icon-wrapper">
                <div className={`service-icon icon-${service.icon}`}></div>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;