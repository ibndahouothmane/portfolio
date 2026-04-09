import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

function NotFound() {
  return (
    <section style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', padding: '4.5rem 1.25rem' }}>
      <Seo
        title="404 - Page Not Found | Othmane Portfolio"
        description="The page you are looking for does not exist."
        path="/404"
        noIndex
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: '404', path: '/404' }
        ]}
      />
      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '0.9rem', lineHeight: 1.2 }}>404 - Page Not Found</h1>
        <p style={{ marginBottom: '1.6rem', lineHeight: 1.7 }}>The page you requested could not be found.</p>
        <Link to="/" className="btn btn-primary">Go Back Home</Link>
      </div>
    </section>
  );
}

export default NotFound;
