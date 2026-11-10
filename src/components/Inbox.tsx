'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';

type Contact = {
  id: string;
  name: string;
  role: string;
  city: string;
  image: string;
  initials: string;
};

type Message = {
  id: string;
  text: string;
  sentAt: string;
  fromMe: boolean;
};

type Conversation = {
  contactId: string;
  messages: Message[];
};

const contacts: Contact[] = [
  { id: 'ania-k', name: 'Ania Kowalska', role: 'Fotograf', city: 'Warszawa', image: '/photographer1.png', initials: 'AK' },
  { id: 'maja-n', name: 'Maja Nowak', role: 'Modelka', city: 'Kraków', image: '/model1.png', initials: 'MN' },
  { id: 'studio-kadr', name: 'Studio Kadr', role: 'Fotograf', city: 'Wrocław', image: '/photographer1.png', initials: 'SK' },
  { id: 'ola-z', name: 'Ola Zielińska', role: 'Modelka', city: 'Warszawa', image: '/model1.png', initials: 'OZ' },
  { id: 'jakub-w', name: 'Jakub Wiśniewski', role: 'Model', city: 'Gdańsk', image: '/model1.png', initials: 'JW' },
  { id: 'ola-r', name: 'Ola Rutkowska', role: 'Fotograf', city: 'Poznań', image: '/photographer1.png', initials: 'OR' },
];

function isMessage(value: unknown): value is Message {
  if (!value || typeof value !== 'object') return false;
  const message = value as Partial<Message>;
  return typeof message.id === 'string' && typeof message.text === 'string' &&
    typeof message.sentAt === 'string' && typeof message.fromMe === 'boolean';
}

function isConversation(value: unknown): value is Conversation {
  if (!value || typeof value !== 'object') return false;
  const conversation = value as Partial<Conversation>;
  return typeof conversation.contactId === 'string' && Array.isArray(conversation.messages) &&
    conversation.messages.every(isMessage) && contacts.some((contact) => contact.id === conversation.contactId);
}

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('pl-PL', { hour: '2-digit', minute: '2-digit' }).format(date);
}

export default function Inbox({ initialContactId }: { initialContactId: string }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedContactId, setSelectedContactId] = useState('');
  const [search, setSearch] = useState('');
  const [draft, setDraft] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [storageWarning, setStorageWarning] = useState(false);

  useEffect(() => {
    let savedConversations: Conversation[] = [];
    try {
      const saved = window.localStorage.getItem('foto-conversations');
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) savedConversations = parsed.filter(isConversation);
      }
    } catch {
      savedConversations = [];
    }

    const timer = window.setTimeout(() => {
      let nextConversations = savedConversations;
      const requestedContact = contacts.find((contact) => contact.id === initialContactId);
      if (requestedContact && !nextConversations.some((conversation) => conversation.contactId === requestedContact.id)) {
        nextConversations = [{ contactId: requestedContact.id, messages: [] }, ...nextConversations];
      }
      setConversations(nextConversations);
      setSelectedContactId(requestedContact?.id ?? nextConversations[0]?.contactId ?? '');
      setIsLoaded(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [initialContactId]);

  const visibleConversations = useMemo(() => conversations
    .map((conversation) => ({
      conversation,
      contact: contacts.find((contact) => contact.id === conversation.contactId)!,
    }))
    .filter(({ contact }) => `${contact.name} ${contact.role} ${contact.city}`.toLocaleLowerCase('pl').includes(search.trim().toLocaleLowerCase('pl')))
    .sort((left, right) => {
      const leftMessages = left.conversation.messages;
      const rightMessages = right.conversation.messages;
      const leftTime = leftMessages[leftMessages.length - 1]?.sentAt ?? '';
      const rightTime = rightMessages[rightMessages.length - 1]?.sentAt ?? '';
      return rightTime.localeCompare(leftTime);
    }), [conversations, search]);

  const selectedContact = contacts.find((contact) => contact.id === selectedContactId) ?? null;
  const selectedConversation = conversations.find((conversation) => conversation.contactId === selectedContactId) ?? null;

  function persistConversations(next: Conversation[]) {
    setConversations(next);
    try {
      window.localStorage.setItem('foto-conversations', JSON.stringify(next));
      setStorageWarning(false);
    } catch {
      setStorageWarning(true);
    }
  }

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || !selectedContact) return;

    const conversation = selectedConversation ?? { contactId: selectedContact.id, messages: [] };
    const updated: Conversation = {
      ...conversation,
      messages: [...conversation.messages, {
        id: `message-${crypto.randomUUID()}`,
        text,
        sentAt: new Date().toISOString(),
        fromMe: true,
      }],
    };
    const next = [updated, ...conversations.filter((item) => item.contactId !== selectedContact.id)];
    persistConversations(next);
    setDraft('');
  }

  return (
    <main className="discover-page inbox-page">
      <header className="discover-topbar">
        <Link href="/" className="discover-brand" aria-label="Foto — strona główna"><span className="discover-brand-mark">F</span> foto</Link>
        <nav className="discover-nav" aria-label="Nawigacja główna">
          <Link href="/odkrywaj">Odkrywaj</Link>
          <Link href="/sesje">Sesje</Link>
          <Link className="discover-nav-active" href="/wiadomosci">Wiadomości</Link>
        </nav>
        <span className="discover-profile-label"><span className="online-dot" /> Przestrzeń twórców</span>
      </header>

      <section className="inbox-heading">
        <p className="discover-eyebrow"><span /> ROZMOWY O WSPÓŁPRACY</p>
        <h1>Wiadomości</h1>
        <p>Ustal szczegóły sesji i poznaj ekipę przed spotkaniem.</p>
      </section>

      <section className="inbox-shell" aria-label="Skrzynka wiadomości">
        <aside className="inbox-sidebar">
          <div className="inbox-sidebar-heading"><h2>Rozmowy</h2><span>{conversations.length}</span></div>
          <label className="inbox-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></svg><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Szukaj rozmowy" aria-label="Szukaj rozmowy" /></label>
          <div className="inbox-conversation-list">
            {visibleConversations.map(({ conversation, contact }) => {
              const lastMessage = conversation.messages[conversation.messages.length - 1];
              return (
                <button key={contact.id} type="button" className={selectedContactId === contact.id ? 'inbox-contact is-selected' : 'inbox-contact'} onClick={() => setSelectedContactId(contact.id)} aria-pressed={selectedContactId === contact.id}>
                  <span className="inbox-avatar"><Image src={contact.image} alt="" fill sizes="44px" /></span>
                  <span className="inbox-contact-copy"><strong>{contact.name}</strong><small>{lastMessage?.text ?? 'Rozpocznij rozmowę'}</small></span>
                  <span className="inbox-contact-time">{lastMessage ? formatTime(lastMessage.sentAt) : ''}</span>
                </button>
              );
            })}
            {isLoaded && visibleConversations.length === 0 && conversations.length > 0 && <p className="inbox-list-empty">Brak rozmów pasujących do wyszukiwania.</p>}
          </div>
          <Link className="inbox-find-creator" href="/odkrywaj">+ Znajdź twórcę</Link>
        </aside>

        <div className="inbox-chat">
          {selectedContact ? (
            <>
              <header className="inbox-chat-header">
                <span className="inbox-avatar inbox-avatar-large"><Image src={selectedContact.image} alt="" fill sizes="48px" /></span>
                <div><h2>{selectedContact.name}</h2><p>{selectedContact.role} · {selectedContact.city}</p></div>
                <Link href="/odkrywaj" className="inbox-profile-link">Wróć do katalogu <span aria-hidden="true">↗</span></Link>
              </header>
              <div className="inbox-messages" aria-live="polite">
                <div className="inbox-date-label">Rozmowa o współpracy</div>
                {selectedConversation?.messages.length ? selectedConversation.messages.map((message, index, messages) => (
                  <div key={message.id} className={message.fromMe ? 'message-row is-mine' : 'message-row'}>
                    {!message.fromMe && <span className="message-avatar">{selectedContact.initials}</span>}
                    <div className="message-bubble-wrap">
                      {index === 0 || messages[index - 1].fromMe !== message.fromMe ? <span className="message-sender">{message.fromMe ? 'Ty' : selectedContact.name}</span> : null}
                      <p className="message-bubble">{message.text}</p>
                      <time dateTime={message.sentAt}>{formatTime(message.sentAt)}</time>
                    </div>
                  </div>
                )) : (
                  <div className="inbox-first-message"><span>✳</span><h3>Tu zaczyna się dobra współpraca.</h3><p>Napisz kilka słów o pomyśle na sesję, terminie lub stylu, który chcesz wspólnie stworzyć.</p></div>
                )}
              </div>
              <form className="inbox-composer" onSubmit={sendMessage}>
                <label className="sr-only" htmlFor="message-draft">Treść wiadomości</label>
                <textarea id="message-draft" rows={2} value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Napisz wiadomość o współpracy…" maxLength={1000} />
                <div className="inbox-composer-footer"><span>{storageWarning ? 'Nie udało się zapisać wiadomości lokalnie.' : 'Wiadomości zapisują się w tej przeglądarce.'}</span><button type="submit" disabled={!draft.trim()}>Wyślij <span aria-hidden="true">↗</span></button></div>
              </form>
            </>
          ) : (
            <div className="inbox-welcome">
              <span className="inbox-welcome-mark">✳</span>
              <h2>{isLoaded ? 'Twoje miejsce na dobre pomysły.' : 'Ładowanie rozmów…'}</h2>
              <p>{isLoaded ? 'Wybierz profil w zakładce Odkrywaj i rozpocznij rozmowę o wspólnej sesji.' : 'Za chwilę pokażemy Twoje rozmowy.'}</p>
              <Link href="/odkrywaj">Odkryj twórców <span aria-hidden="true">↗</span></Link>
            </div>
          )}
        </div>
      </section>

      <p className="inbox-storage-note">Prototyp: rozmowy są przechowywane tylko na tym urządzeniu i nie są wysyłane do drugiej osoby.</p>
    </main>
  );
}
