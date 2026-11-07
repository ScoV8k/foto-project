'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

type Role = 'Fotograf' | 'Modelka' | 'Model';

type Creator = {
  id: string;
  name: string;
  role: Role;
  city: string;
  specialty: string;
  image: string;
  availability: string;
  initials: string;
};

const creators: Creator[] = [
  { id: 'ania-k', name: 'Ania Kowalska', role: 'Fotograf', city: 'Warszawa', specialty: 'Portret · analog', image: '/photographer1.png', availability: 'Dostępna w listopadzie', initials: 'AK' },
  { id: 'maja-n', name: 'Maja Nowak', role: 'Modelka', city: 'Kraków', specialty: 'Beauty · fashion', image: '/model1.png', availability: 'Otwarta na TFP', initials: 'MN' },
  { id: 'studio-kadr', name: 'Studio Kadr', role: 'Fotograf', city: 'Wrocław', specialty: 'Moda · editorial', image: '/photographer1.png', availability: 'Wolne terminy', initials: 'SK' },
  { id: 'ola-z', name: 'Ola Zielińska', role: 'Modelka', city: 'Warszawa', specialty: 'Lifestyle · portret', image: '/model1.png', availability: 'Dostępna w weekendy', initials: 'OZ' },
  { id: 'jakub-w', name: 'Jakub Wiśniewski', role: 'Model', city: 'Gdańsk', specialty: 'Fashion · sport', image: '/model1.png', availability: 'Otwarty na nowe projekty', initials: 'JW' },
  { id: 'ola-r', name: 'Ola Rutkowska', role: 'Fotograf', city: 'Poznań', specialty: 'Analog · lifestyle', image: '/photographer1.png', availability: 'Wolne terminy', initials: 'OR' },
];

const roles = ['Wszyscy', 'Fotograf', 'Modelka', 'Model'] as const;

export default function DiscoverDirectory() {
  const [query, setQuery] = useState('');
  const [role, setRole] = useState<(typeof roles)[number]>('Wszyscy');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);

  useEffect(() => {
    let savedFavorites: string[] = [];
    try {
      const saved = window.localStorage.getItem('foto-saved-creators');
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'string')) savedFavorites = parsed;
      }
    } catch {
      savedFavorites = [];
    }
    const timer = window.setTimeout(() => setFavorites(savedFavorites), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const visibleCreators = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('pl');

    return creators.filter((creator) => {
      const matchesRole = role === 'Wszyscy' || creator.role === role;
      const matchesQuery = [creator.name, creator.city, creator.specialty, creator.role]
        .some((value) => value.toLocaleLowerCase('pl').includes(normalizedQuery));
      const matchesFavorites = !favoritesOnly || favorites.includes(creator.id);
      return matchesRole && matchesQuery && matchesFavorites;
    });
  }, [favorites, favoritesOnly, query, role]);

  function toggleFavorite(id: string) {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((favorite) => favorite !== id) : [...current, id];
      try {
        window.localStorage.setItem('foto-saved-creators', JSON.stringify(next));
      } catch {
        // Favorites still work for this visit when browser storage is unavailable.
      }
      return next;
    });
  }

  return (
    <main className="discover-page">
      <header className="discover-topbar">
        <Link href="/" className="discover-brand" aria-label="Foto — strona główna">
          <span className="discover-brand-mark">F</span> foto
        </Link>
        <nav className="discover-nav" aria-label="Nawigacja główna">
          <Link className="discover-nav-active" href="/odkrywaj">Odkrywaj</Link>
          <a href="#tworcy">Społeczność</a>
          <Link href="/">Wróć na stronę główną</Link>
        </nav>
        <span className="discover-profile-label"><span className="online-dot" /> Przestrzeń twórców</span>
      </header>

      <section className="discover-intro">
        <p className="discover-eyebrow"><span /> SPOŁECZNOŚĆ FOTO</p>
        <h1>Znajdź osobę do<br /><em>swojej kolejnej sesji.</em></h1>
        <p className="discover-lead">Poznaj twórców, zobacz ich portfolio i zapisz osoby, z którymi chcesz pracować.</p>
        <div className="discover-stats" aria-label="Podsumowanie społeczności">
          <span><strong>{creators.length}</strong> twórców w odkrywaj</span>
          <span className="discover-stat-divider" />
          <span><strong>{favorites.length}</strong> zapisanych przez Ciebie</span>
        </div>
      </section>

      <section className="creator-browser" id="tworcy" aria-label="Przeglądaj twórców">
        <div className="browser-heading">
          <div>
            <p className="browser-kicker">DOBRZE DOBRANA EKIPA ZACZYNA SIĘ TUTAJ</p>
            <h2>Odkryj twórców</h2>
          </div>
          <span className="browser-result-count">{visibleCreators.length} {visibleCreators.length === 1 ? 'profil' : 'profile'}</span>
        </div>

        <label className="creator-search">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></svg>
          <input
            type="search"
            placeholder="Szukaj po imieniu, mieście lub stylu…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Szukaj twórców po imieniu, mieście lub stylu"
          />
        </label>

        <div className="creator-filters" aria-label="Filtruj profile">
          <div className="role-filters" role="group" aria-label="Rola twórcy">
            {roles.map((item) => (
              <button key={item} type="button" className={role === item ? 'role-filter is-active' : 'role-filter'} onClick={() => setRole(item)} aria-pressed={role === item}>
                {item}
              </button>
            ))}
          </div>
          <button type="button" className={favoritesOnly ? 'saved-filter is-active' : 'saved-filter'} onClick={() => setFavoritesOnly((current) => !current)} aria-pressed={favoritesOnly}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
            Zapisane{favorites.length > 0 ? ` · ${favorites.length}` : ''}
          </button>
        </div>

        {visibleCreators.length > 0 ? (
          <div className="creator-grid">
            {visibleCreators.map((creator, index) => {
              const isSaved = favorites.includes(creator.id);
              return (
                <article className="creator-card" key={creator.id}>
                  <div className="creator-photo-wrap">
                    <Image className="creator-photo" src={creator.image} alt={`Portfolio: ${creator.name}`} fill sizes="(max-width: 520px) 90vw, (max-width: 800px) 44vw, 30vw" />
                    <span className="creator-index">0{index + 1}</span>
                    <button type="button" className={isSaved ? 'save-creator is-saved' : 'save-creator'} onClick={() => toggleFavorite(creator.id)} aria-label={isSaved ? `Usuń ${creator.name} z zapisanych` : `Zapisz ${creator.name}`} aria-pressed={isSaved}>
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
                    </button>
                    <span className="creator-role-tag">{creator.role}</span>
                  </div>
                  <div className="creator-card-info">
                    <div className="creator-name-row">
                      <div><h3>{creator.name}</h3><p className="creator-location">{creator.city} <span>·</span> Polska</p></div>
                      <span className="creator-initials" aria-hidden="true">{creator.initials}</span>
                    </div>
                    <p className="creator-specialty">{creator.specialty}</p>
                    <div className="creator-card-footer">
                      <span><span className="availability-dot" />{creator.availability}</span>
                      <button type="button" className="creator-contact" onClick={() => setSelectedCreator(creator)} aria-label={`Zobacz profil: ${creator.name}`}>
                        Zobacz profil <span aria-hidden="true">↗</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="creator-empty-state">
            <span className="empty-state-mark">⌕</span>
            <h3>Nie ma tu jeszcze takich profili</h3>
            <p>Zmień hasło wyszukiwania albo pokaż wszystkie osoby.</p>
            <button type="button" onClick={() => { setQuery(''); setRole('Wszyscy'); setFavoritesOnly(false); }}>Wyczyść filtry</button>
          </div>
        )}
        <p className="directory-note">Przykładowe profile prezentujące sposób działania katalogu.</p>
      </section>

      {selectedCreator && (
        <div className="profile-modal-backdrop" onClick={() => setSelectedCreator(null)}>
          <section className="profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-modal-title" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="profile-modal-close" onClick={() => setSelectedCreator(null)} aria-label="Zamknij profil">×</button>
            <div className="profile-modal-image"><Image src={selectedCreator.image} alt={`Portfolio: ${selectedCreator.name}`} fill sizes="(max-width: 520px) 90vw, 345px" /></div>
            <div className="profile-modal-content">
              <span className="creator-role-tag">{selectedCreator.role}</span>
              <h2 id="profile-modal-title">{selectedCreator.name}</h2>
              <p>{selectedCreator.city} · Polska</p>
              <p className="profile-modal-specialty">{selectedCreator.specialty}</p>
              <span className="profile-demo-note">Przykładowy profil — treści demonstracyjne</span>
            </div>
          </section>
        </div>
      )}

      <footer className="discover-footer"><span>foto<span className="footer-period">.</span></span><span>Twórzmy razem.</span><Link href="/">Wróć na początek ↑</Link></footer>
    </main>
  );
}
