import './Experience.css';
import { useLanguage } from '../context/LanguageContext';

function Experience() {
  const { t, language } = useLanguage();

  const experiencesEn = [
    {
      id: 1,
      company: 'AUTO DEALERS DIGITAL',
      duration: 'Full-time · 1 yr 10 mos',
      location: 'On-site',
      positions: [
        {
          title: 'Laravel & Tailwind Developer',
          period: 'Oct 2025 - Feb 2026 · 5 mos',
          items: [
            'Development of the new version of websites using Laravel (backend) and Tailwind CSS (frontend)',
            'Design and integration of responsive UI components',
            'Maintenance of existing WordPress/ACF sites: fully custom customization from Figma mockups and client ticket resolution',
            'Preparation for future migration from WordPress, while working on performance and code quality',
            'Collaboration with the team to organize the project and improve processes'
          ]
        },
        {
          title: 'WordPress Developer / ACF',
          period: 'Sep 2024 - Oct 2025 · 1 yr 2 mos',
          location: 'Casablanca, Morocco',
          items: [
            'Development of a theme based on Advanced Custom Fields (ACF) with custom sections and responsive CSS',
            'Migration of over 5000 sites from Elementor to ACF',
            'Customization via parent theme overrides and transformation of Figma mockups into functional sites',
            'Ticket management to resolve client issues'
          ]
        },
        {
          title: 'WordPress Developer and Integrator',
          period: 'May 2024 - Sep 2024 · 5 mos',
          location: 'Casablanca, Morocco',
          items: [
            'Migration of legacy sites to Elementor',
            'Development and customization of themes and widgets',
            'Conversion of Figma mockups into interactive sites'
          ]
        }
      ]
    },
    {
      id: 2,
      company: 'SOORCIN',
      duration: 'Full-time · 1 yr 8 mos',
      location: 'Casablanca, Morocco',
      positions: [
        {
          title: 'WordPress Developer and Integrator',
          period: 'Oct 2022 - May 2024 · 1 yr 8 mos',
          items: [
            'Creation and maintenance of Onepage, Showcase, E-commerce and booking WordPress websites',
            'Conversion of Figma mockups into Elementor templates for smooth and efficient integration',
            'Creation of custom PHP templates to meet specific client needs',
            'Technical troubleshooting and problem resolution',
            'Website performance testing and optimization'
          ]
        }
      ]
    },
    {
      id: 3,
      company: 'INFINIPRINT',
      duration: 'Full-time · 4 mos',
      location: 'Casablanca, Morocco',
      positions: [
        {
          title: 'WordPress Developer and Integrator',
          period: 'June 2022 - Sep 2022 · 4 mos',
          items: [
            'Website management and maintenance (infiniprint.ma)',
            'Content loading and updating (Products)',
            'Technical troubleshooting and problem resolution',
            'Daily monitoring of site usage and functionality',
            'Website performance testing and optimization'
          ]
        }
      ]
    },
    {
      id: 4,
      position: 'PHP & WordPress Developer Intern',
      company: 'PLUTUS∞ (Internship)',
      period: 'Sep 2021 - May 2022 · 9 mos',
      location: 'Mohammedia, Morocco',
      items: [
        'Developed PHP-based web applications for scalable backend solutions',
        'Built and maintained WordPress and WooCommerce websites with fully responsive design',
        'Integrated content and converted design mockups into functional, pixel-perfect web pages',
        'Implemented SEO best practices to increase organic traffic and visibility',
        'Optimized website performance and loading speed to enhance user experience'
      ]
    },
    {
      id: 5,
      position: 'Full-Stack Web Developer Intern (PHP/JS/SQL)',
      company: 'NOTILIX (Internship)',
      period: 'Mar 2021 - Apr 2021 · 2 mos',
      location: 'Remote',
      items: [
        'Designed and developed a full-stack web portal for student mentoring with appointment scheduling',
        'Implemented mentor dashboards with calendar views to track and manage student requests',
        'Built student-facing features for mentor selection and appointment booking',
        'Developed system using PHP, JavaScript, HTML, CSS, MySQL with Bootstrap and jQuery'
      ]
    },
    {
      id: 6,
      company: 'DK GROUP (Internship)',
      duration: 'Internship · 4 mos',
      location: 'Mohammedia, Morocco',
      positions: [
        {
          title: 'Junior WordPress Developer & Frontend Integrator',
          period: 'Mar 2019 - Apr 2019 · 2 mos',
          items: [
            'Gained hands-on experience in WordPress theme development with HTML, CSS, PHP, MySQL',
            'Designed and implemented a functional online booking system for a hair salon',
            'Translated mockups into fully operational WordPress websites'
          ]
        },
        {
          title: 'Junior Laravel Web Developer',
          period: 'Jul 2018 - Aug 2018 · 2 mos',
          items: [
            'Designed and developed a job application form using Laravel with CRUDBooster',
            'Built frontend and backend functionality with HTML, CSS, and PHP',
            'Integrated MySQL database to store and manage application data securely',
            'Applied Laravel best practices for maintainable and scalable code'
          ]
        }
      ]
    }
  ];

  const educationEn = [
    {
      id: 1,
      degree: 'Professional Bachelor\'s Degree',
      institution: 'ENSET MOHAMMEDIA',
      period: '2025 - 2026',
      field: 'Web and Mobile Development'
    },
    {
      id: 2,
      degree: 'Specialized Technician Diploma (With Honors)',
      institution: 'ISTA MOHAMMEDIA',
      period: '2019 - 2021',
      field: 'Computer Development'
    },
    {
      id: 3,
      degree: 'University Diploma in Technology (First Year)',
      institution: 'EST SAFI',
      period: '2017 - 2018',
      field: 'Computer Engineering'
    },
    {
      id: 4,
      degree: 'High School Diploma (With Honors)',
      institution: 'Euclide High School and College',
      period: '2015 - 2016',
      field: 'Experimental Sciences (Physics/Chemistry)'
    }
  ];

  const experiencesFr = [
    {
      id: 1,
      company: 'AUTO DEALERS DIGITAL',
      duration: 'Temps plein · 1 an 10 mois',
      location: 'Sur site',
      positions: [
        {
          title: 'Developpeur Junior / Tailwind & Laravel',
          period: 'Oct 2025 - Fev 2026 · 5 mois',
          items: [
            'Developpement de la nouvelle version des sites avec Laravel (backend) et Tailwind CSS (frontend)',
            'Conception et integration de composants UI responsives',
            'Maintenance des sites WordPress/ACF existants: personnalisation complete a partir de maquettes Figma et resolution des tickets clients',
            'Preparation de la migration future depuis WordPress, avec travail sur la performance et la qualite du code',
            'Collaboration avec l equipe pour organiser le projet et ameliorer les processus'
          ]
        },
        {
          title: 'Developpeur WordPress / ACF',
          period: 'Sep 2024 - Oct 2025 · 1 an 2 mois',
          location: 'Casablanca, Maroc',
          items: [
            'Developpement d un theme base sur Advanced Custom Fields (ACF) avec sections personnalisees et CSS responsive',
            'Migration de plus de 5000 sites d Elementor vers ACF',
            'Personnalisation via surcharge du theme parent et transformation des maquettes Figma en sites fonctionnels',
            'Gestion des tickets pour resoudre les problemes clients'
          ]
        },
        {
          title: 'Developpeur et Integrateur WordPress',
          period: 'Mai 2024 - Sep 2024 · 5 mois',
          location: 'Casablanca, Maroc',
          items: [
            'Migration de sites legacy vers Elementor',
            'Developpement et personnalisation de themes et widgets',
            'Conversion des maquettes Figma en sites interactifs'
          ]
        }
      ]
    },
    {
      id: 2,
      company: 'SOORCIN',
      duration: 'Temps plein · 1 an 8 mois',
      location: 'Casablanca, Maroc',
      positions: [
        {
          title: 'Developpeur et Integrateur WordPress',
          period: 'Oct 2022 - Mai 2024 · 1 an 8 mois',
          items: [
            'Creation et maintenance de sites WordPress Onepage, Vitrine, E-commerce et Reservation',
            'Conversion des maquettes Figma en templates Elementor pour une integration fluide et efficace',
            'Creation de templates PHP personnalises pour repondre aux besoins specifiques des clients',
            'Depannage technique et resolution de problemes',
            'Tests de performance et optimisation des sites'
          ]
        }
      ]
    },
    {
      id: 3,
      company: 'INFINIPRINT',
      duration: 'Temps plein · 4 mois',
      location: 'Casablanca, Maroc',
      positions: [
        {
          title: 'Developpeur et Integrateur WordPress',
          period: 'Juin 2022 - Sep 2022 · 4 mois',
          items: [
            'Gestion et maintenance du site (infiniprint.ma)',
            'Chargement et mise a jour des contenus (produits)',
            'Depannage technique et resolution de problemes',
            'Suivi quotidien de l utilisation et du bon fonctionnement du site',
            'Tests de performance et optimisation du site'
          ]
        }
      ]
    },
    {
      id: 4,
      position: 'Developpeur PHP & WordPress',
      company: 'PLUTUS∞ (Stage)',
      period: 'Sep 2021 - Mai 2022 · 9 mois',
      location: 'Mohammedia, Maroc',
      items: [
        'Developpement d applications web basees sur PHP pour des solutions backend evolutives',
        'Creation et maintenance de sites WordPress et WooCommerce avec design totalement responsive',
        'Integration de contenu et conversion de maquettes en pages web fonctionnelles et pixel-perfect',
        'Application des bonnes pratiques SEO pour augmenter le trafic organique et la visibilite',
        'Optimisation des performances et de la vitesse de chargement pour ameliorer l experience utilisateur'
      ]
    },
    {
      id: 5,
      position: 'Developpeur Web Full-Stack (PHP/JS/SQL)',
      company: 'NOTILIX (Stage)',
      period: 'Mar 2021 - Avr 2021 · 2 mois',
      location: 'A distance',
      items: [
        'Conception et developpement d un portail web full-stack pour le mentorat et la prise de rendez-vous',
        'Implementation de tableaux de bord mentor avec vues calendrier pour suivre et gerer les demandes etudiantes',
        'Creation de fonctionnalites cote etudiant pour choisir un mentor et reserver un rendez-vous',
        'Developpement du systeme avec PHP, JavaScript, HTML, CSS, MySQL, Bootstrap et jQuery'
      ]
    },
    {
      id: 6,
      company: 'DK GROUP (Stage)',
      duration: 'Stage · 4 mois',
      location: 'Mohammedia, Maroc',
      positions: [
        {
          title: 'Developpeur Junior WordPress & Integrateur Frontend',
          period: 'Mar 2019 - Avr 2019 · 2 mois',
          items: [
            'Acquisition d experience pratique en developpement de themes WordPress avec HTML, CSS, PHP, MySQL',
            'Conception et implementation d un systeme de reservation en ligne fonctionnel pour un salon de coiffure',
            'Transformation de maquettes en sites WordPress pleinement operationnels'
          ]
        },
        {
          title: 'Developpeur Web Junior Laravel',
          period: 'Juil 2018 - Aou 2018 · 2 mois',
          items: [
            'Conception et developpement d un formulaire de candidature avec Laravel et CRUDBooster',
            'Developpement des fonctionnalites frontend et backend avec HTML, CSS et PHP',
            'Integration de la base MySQL pour stocker et gerer les donnees de candidature de facon securisee',
            'Application des bonnes pratiques Laravel pour un code maintenable et evolutif'
          ]
        }
      ]
    }
  ];

  const educationFr = [
    {
      id: 1,
      degree: 'Licence professionnelle',
      institution: 'ENSET MOHAMMEDIA',
      period: '2025 - 2026',
      field: 'Developpement Web et Mobile'
    },
    {
      id: 2,
      degree: 'Diplome de Technicien Specialise (Mention bien)',
      institution: 'ISTA MOHAMMEDIA',
      period: '2019 - 2021',
      field: 'Developpement informatique'
    },
    {
      id: 3,
      degree: 'Diplome universitaire de technologie (1ere annee)',
      institution: 'EST SAFI',
      period: '2017 - 2018',
      field: 'Genie informatique'
    },
    {
      id: 4,
      degree: 'Baccalaureat (Mention bien)',
      institution: 'Lycee et College Euclide',
      period: '2015 - 2016',
      field: 'Sciences experimentales (Physique/Chimie)'
    }
  ];

  const experiences = language === 'fr' ? experiencesFr : experiencesEn;
  const education = language === 'fr' ? educationFr : educationEn;

  return (
    <section className="experience-section">
      <div className="experience-container">

        {/* Experience Column */}
        <div className="timeline-column">
          <div className="section-title">
            <h2>{t('experience.professionalTitle')}</h2>
          </div>

          <div className="vertical-timeline">
            {experiences.map((exp) => (
              <div key={exp.id} className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
                    </svg>
                  </div>
                  <div className="timeline-line"></div>
                </div>

                <div className="timeline-content">
                  <div className="timeline-card">
                    {exp.positions ? (
                      // Auto Dealers Digital with multiple positions
                      <>
                        <div className="company-header">
                          <h3 className="company-name">{exp.company}</h3>
                          <p className="company-meta">{exp.duration}</p>
                          <p className="company-location">{exp.location}</p>
                        </div>

                        <div className="positions-list">
                          {exp.positions.map((position, idx) => (
                            <div key={idx} className="position-block">
                              <h4 className="position-title">{position.title}</h4>
                              <p className="position-period">{position.period}</p>
                              {position.location && <p className="position-location">{position.location}</p>}
                              <ul className="item-list">
                                {position.items.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      // Other companies with single position
                      <>
                        <div className="simple-header">
                          <h3 className="position-title">{exp.position}</h3>
                          <h4 className="company-name">{exp.company}</h4>
                          <p className="position-period">{exp.period}</p>
                          {exp.location && <p className="company-location">{exp.location}</p>}
                        </div>

                        <ul className="item-list">
                          {exp.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Column */}
        <div className="timeline-column">
          <div className="section-title">
            <h2>{t('experience.educationTitle')}</h2>
          </div>

          <div className="vertical-timeline">
            {education.map((edu) => (
              <div key={edu.id} className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" className="bi bi-mortarboard" viewBox="0 0 16 16">
                      <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z" />
                      <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z" />
                    </svg>
                  </div>
                  <div className="timeline-line"></div>
                </div>

                <div className="timeline-content">
                  <div className="timeline-card">
                    <h3 className="position-title">{edu.degree}</h3>
                    <h4 className="company-name">{edu.institution}</h4>
                    <p className="position-period">{edu.period}</p>
                    <p className="edu-field">{edu.field}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Experience;