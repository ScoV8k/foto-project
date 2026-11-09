import type { Metadata } from 'next';
import SessionBoard from '@/components/SessionBoard';

export const metadata: Metadata = {
  title: 'Sesje i współpraca | Foto',
  description: 'Odkrywaj pomysły na sesje i publikuj ogłoszenia, aby znaleźć ekipę.',
};

export default function SessionsPage() {
  return <SessionBoard />;
}
