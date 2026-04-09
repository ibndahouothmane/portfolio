import AboutSection from '../components/About';
import Experience from '../components/Experience';
import Services from '../components/Services';
import Skills from '../components/Skills';
import Seo from '../components/Seo';

const srOnlyStyle = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0
};

function About() {
  return (
    <div className="about-page">
      <Seo
        title="About Othmane | WordPress Developer in Morocco"
        description="Discover Othmane's experience as a Morocco-based WordPress and Full-Stack Web Developer delivering scalable solutions for global clients."
        path="/about"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' }
        ]}
      />
      <h1 style={srOnlyStyle}>About Othmane Ibn Dahou Idrissi</h1>
      <AboutSection />
      <Experience />
      <Services />
      <Skills />
    </div>
  );
}

export default About;