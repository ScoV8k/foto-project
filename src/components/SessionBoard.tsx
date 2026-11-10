'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';

type Session = {
  id: string;
  title: string;
  city: string;
  date: string;
  format: string;
  role: string;
  description: string;
  author: string;
  isMine?: boolean;
};

const exampleSessions: Session[] = [
  { id: 'example-film', title: 'Portret na kliszy o złotej godzinie', city: 'Warszawa', date: '2026-11-21', format: 'TFP', role: 'Modelka lub model', description: 'Szukam osoby do spokojnej, naturalnej sesji portretowej na kliszy. Spotkamy się w okolicy Łazienek; po sesji wybierzemy wspólnie kadry do publikacji.', author: 'Ania · fotografka' },
  { id: 'example-editorial', title: 'Minimal editorial — biel i cień', city: 'Kraków', date: '2026-12-04', format: 'Do ustalenia', role: 'Fotograf', description: 'Kameralny projekt modowy inspirowany światłem wpadającym przez okno. Mam moodboard i studio. Chętnie poznam fotografa, który lubi pracę z naturalnym światłem.', author: 'Maja · modelka' },
  { id: 'example-winter', title: 'Zimowe światło w miejskiej przestrzeni', city: 'Gdańsk', date: '2026-12-13', format: 'Płatna', role: 'Model', description: 'Szukam modela do krótkiej sesji lifestyle dla lokalnej marki odzieżowej. Dwie godziny pracy, zdjęcia do portfolio i wynagrodzenie do uzgodnienia przed sesją.', author: 'Studio Północ' },
];

const roleOptions = ['Modelka lub model', 'Fotograf', 'Wizażysta / stylistka', 'Inna osoba z ekipy'];
const today = new Date();
const todayLocal = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

function formatDate(value: string) {
  return new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })
    .format(new Date(`${value}T12:00:00`));
}

export default function SessionBoard() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [roleFilter, setRoleFilter] = useState('Wszystkie role');
  const [cityFilter, setCityFilter] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let savedSessions: Session[] = [];
    try {
      const saved = window.localStorage.getItem('foto-sessions');
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          savedSessions = parsed.filter((item): item is Session =>
            typeof item?.id === 'string' && typeof item?.title === 'string' &&
            typeof item?.city === 'string' && typeof item?.date === 'string' &&
            typeof item?.format === 'string' && typeof item?.role === 'string' &&
            typeof item?.description === 'string' && typeof item?.author === 'string',
          );
        }
      }
    } catch {
      savedSessions = [];
    }
    const timer = window.setTimeout(() => setSessions(savedSessions), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const allSessions = useMemo(() => [...sessions, ...exampleSessions], [sessions]);
  const filteredSessions = useMemo(() => allSessions.filter((session) => {
    const matchesRole = roleFilter === 'Wszystkie role' || session.role.toLocaleLowerCase('pl').includes(roleFilter.toLocaleLowerCase('pl'));
    const matchesCity = session.city.toLocaleLowerCase('pl').includes(cityFilter.trim().toLocaleLowerCase('pl'));
    return matchesRole && matchesCity;
  }), [allSessions, cityFilter, roleFilter]);

  function saveSessions(next: Session[]) {
    setSessions(next);
    try {
      window.localStorage.setItem('foto-sessions', JSON.stringify(next));
    } catch {
      setNotice('Nie udało się zapisać ogłoszenia w tej przeglądarce.');
    }
  }

  function createSession(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newSession: Session = {
      id: `session-${Date.now()}`,
      title: String(formData.get('title')).trim(),
      city: String(formData.get('city')).trim(),
      date: String(formData.get('date')),
      format: String(formData.get('format')),
      role: String(formData.get('role')),
      description: String(formData.get('description')).trim(),
      author: 'Twoje ogłoszenie',
      isMine: true,
    };
    saveSessions([newSession, ...sessions]);
    setIsFormOpen(false);
    setNotice('Ogłoszenie dodane. Jest zapisane lokalnie w tej przeglądarce.');
    event.currentTarget.reset();
  }

  function removeSession(id: string) {
    saveSessions(sessions.filter((session) => session.id !== id));
    setSelectedSession(null);
    setNotice('Usunięto Twoje ogłoszenie.');
  }

  return (
    <main className="discover-page sessions-page">
      <header className="discover-topbar">
        <Link href="/" className="discover-brand" aria-label="Foto — strona główna"><span className="discover-brand-mark">F</span> foto</Link>
        <nav className="discover-nav" aria-label="Nawigacja główna">
          <Link href="/odkrywaj">Odkrywaj</Link>
          <Link className="discover-nav-active" href="/sesje">Sesje</Link>
          <Link href="/wiadomosci">Wiadomości</Link>
          <Link href="/">Wróć na stronę główną</Link>
        </nav>
        <span className="discover-profile-label"><span className="online-dot" /> Przestrzeń twórców</span>
      </header>

      <section className="discover-intro sessions-intro">
        <p className="discover-eyebrow"><span /> WSPÓLNE PROJEKTY</p>
        <div className="sessions-title-row">
          <div>
            <h1>Pomysł na sesję.<br /><em>Ekipa, która go zrealizuje.</em></h1>
            <p className="discover-lead">Przeglądaj otwarte projekty albo opublikuj własne ogłoszenie i znajdź osoby do współpracy.</p>
          </div>
          <button type="button" className="session-create-button" onClick={() => { setIsFormOpen(true); setNotice(''); }}>
            <span aria-hidden="true">＋</span> Dodaj sesję
          </button>
        </div>
        <div className="discover-stats" aria-label="Podsumowanie projektów">
          <span><strong>{allSessions.length}</strong> otwarte pomysły</span>
          <span className="discover-stat-divider" />
          <span><strong>{sessions.length}</strong> Twoje ogłoszenia</span>
        </div>
      </section>

      <section className="creator-browser session-browser" aria-label="Otwarte sesje i projekty">
        <div className="browser-heading">
          <div><p className="browser-kicker">DOŁĄCZ DO PROJEKTU LUB ZAPROŚ EKIPĘ</p><h2>Otwarte sesje</h2></div>
          <span className="browser-result-count">{filteredSessions.length} {filteredSessions.length === 1 ? 'projekt' : 'projekty'}</span>
        </div>

        <div className="session-filters">
          <label className="creator-search session-city-search">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></svg>
            <input type="search" placeholder="Miasto, np. Warszawa" value={cityFilter} onChange={(event) => setCityFilter(event.target.value)} aria-label="Filtruj sesje po mieście" />
          </label>
          <label className="session-role-select-label">
            <span>Szukam osoby w roli</span>
            <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)} aria-label="Filtruj sesje według poszukiwanej roli">
              <option>Wszystkie role</option>
              {roleOptions.map((role) => <option key={role}>{role}</option>)}
            </select>
          </label>
        </div>

        {filteredSessions.length ? (
          <div className="session-grid">
            {filteredSessions.map((session, index) => (
              <article className="session-card" key={session.id}>
                <div className="session-card-topline"><span className="session-format-tag">{session.format}</span><span className="session-card-number">{String(index + 1).padStart(2, '0')}</span></div>
                <h3>{session.title}</h3>
                <p className="session-card-author">{session.author}</p>
                <div className="session-card-meta"><span><span aria-hidden="true">⌖</span> {session.city}</span><span><span aria-hidden="true">◷</span> {formatDate(session.date)}</span></div>
                <div className="session-card-bottom"><span>Szukają: <strong>{session.role}</strong></span><button type="button" onClick={() => setSelectedSession(session)}>Zobacz szczegóły <span aria-hidden="true">↗</span></button></div>
              </article>
            ))}
          </div>
        ) : (
          <div className="creator-empty-state session-empty-state"><span className="empty-state-mark">⌕</span><h3>Brak pasujących sesji</h3><p>Spróbuj zmienić miasto lub rolę. Możesz też dodać własne ogłoszenie.</p><button type="button" onClick={() => { setCityFilter(''); setRoleFilter('Wszystkie role'); }}>Wyczyść filtry</button></div>
        )}
        {notice && <p className="session-notice" role="status">{notice}</p>}
        <p className="directory-note">Przykładowe projekty są demonstracyjne. Nowe ogłoszenia zapisują się tylko w tej przeglądarce.</p>
      </section>

      {(isFormOpen || selectedSession) && (
        <div className="profile-modal-backdrop" onClick={() => { setIsFormOpen(false); setSelectedSession(null); }}>
          {isFormOpen ? (
            <section className="session-modal" role="dialog" aria-modal="true" aria-labelledby="session-form-title" onClick={(event) => event.stopPropagation()}>
              <button type="button" className="profile-modal-close" onClick={() => setIsFormOpen(false)} aria-label="Zamknij formularz">×</button>
              <p className="browser-kicker">ZAPROŚ EKIPĘ DO WSPÓŁPRACY</p>
              <h2 id="session-form-title">Dodaj ogłoszenie</h2>
              <p className="session-form-intro">Opisz pomysł i osoby, których szukasz. Ogłoszenie zostanie zapisane lokalnie w tej przeglądarce.</p>
              <form className="session-form" onSubmit={createSession}>
                <label>Tytuł sesji<input name="title" required maxLength={80} placeholder="np. Portret w świetle poranka" /></label>
                <div className="session-form-row">
                  <label>Miasto<input name="city" required maxLength={50} placeholder="np. Warszawa" /></label>
                  <label>Planowany termin<input name="date" type="date" min={todayLocal} required /></label>
                </div>
                <div className="session-form-row">
                  <label>Szukam osoby<select name="role" required>{roleOptions.map((role) => <option key={role}>{role}</option>)}</select></label>
                  <label>Rodzaj współpracy<select name="format" required><option>Do ustalenia</option><option>TFP</option><option>Płatna</option></select></label>
                </div>
                <label>Opis pomysłu<textarea name="description" required minLength={20} maxLength={500} rows={4} placeholder="Napisz o klimacie, miejscu i oczekiwaniach…" /></label>
                <div className="session-form-actions"><button type="button" className="session-cancel-button" onClick={() => setIsFormOpen(false)}>Anuluj</button><button type="submit" className="session-submit-button">Opublikuj ogłoszenie <span aria-hidden="true">↗</span></button></div>
              </form>
            </section>
          ) : selectedSession && (
            <section className="session-modal session-detail-modal" role="dialog" aria-modal="true" aria-labelledby="session-detail-title" onClick={(event) => event.stopPropagation()}>
              <button type="button" className="profile-modal-close" onClick={() => setSelectedSession(null)} aria-label="Zamknij szczegóły">×</button>
              <span className="session-format-tag">{selectedSession.format}</span>
              <h2 id="session-detail-title">{selectedSession.title}</h2>
              <p className="session-detail-author">{selectedSession.author}</p>
              <p className="session-detail-description">{selectedSession.description}</p>
              <div className="session-detail-meta"><span>⌖ {selectedSession.city}</span><span>◷ {formatDate(selectedSession.date)}</span><span>Szukają: {selectedSession.role}</span></div>
              {selectedSession.isMine && <button type="button" className="session-delete-button" onClick={() => removeSession(selectedSession.id)}>Usuń moje ogłoszenie</button>}
              {!selectedSession.isMine && <p className="profile-demo-note">Ogłoszenie przykładowe — kontakt przez aplikację będzie dostępny po uruchomieniu wiadomości.</p>}
            </section>
          )}
        </div>
      )}

      <footer className="discover-footer"><span>foto<span className="footer-period">.</span></span><span>Twórzmy razem.</span><Link href="/odkrywaj">Poznaj twórców ↑</Link></footer>
    </main>
  );
}
