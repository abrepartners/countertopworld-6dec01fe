import { useParams, Navigate } from 'react-router-dom';
import CityPageLayout from '../components/CityPageLayout';
import { cityPages } from '../data/cityPages';

export default function CityPage() {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? cityPages[slug] : undefined;
  if (!data) return <Navigate to="/" replace />;
  return <CityPageLayout data={data} />;
}
