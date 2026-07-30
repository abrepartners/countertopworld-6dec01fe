import { useParams, Navigate } from 'react-router-dom';
import CityPageLayout from '../components/CityPageLayout';
import { cityPages } from '../data/cityPages';

export default function CityPage() {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? cityPages[slug] : undefined;
  if (!data) return <Navigate to="/" replace />;
  // Keyed by slug so navigating between city pages (a param-only route change)
  // remounts the layout — otherwise form/FAQ state leaks across cities.
  return <CityPageLayout key={data.slug} data={data} />;
}
