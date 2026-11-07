import type { Metadata } from 'next';
import DiscoverDirectory from '@/components/DiscoverDirectory';

export const metadata: Metadata = {
  title: 'Odkrywaj twórców | Foto',
  description: 'Znajdź fotografów i modele do swojej kolejnej sesji zdjęciowej.',
};

export default function DiscoverPage() {
  return <DiscoverDirectory />;
}
