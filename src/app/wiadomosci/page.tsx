import type { Metadata } from 'next';
import Inbox from '@/components/Inbox';

export const metadata: Metadata = {
  title: 'Wiadomości | Foto',
  description: 'Rozmawiaj z twórcami i ustalaj szczegóły współpracy.',
};

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ do?: string | string[] }>;
}) {
  const { do: contactParam } = await searchParams;
  const initialContactId = Array.isArray(contactParam) ? contactParam[0] : contactParam;

  return <Inbox initialContactId={initialContactId ?? ''} />;
}
