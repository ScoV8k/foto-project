import Link from 'next/link';

export default function NavigationBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link href="/" className="logo-link">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-icon">
            <path d="M4 12V20H12V16H8V12H4Z" fill="currentColor"/>
            <path d="M12 4V12H20V8H16V4H12Z" fill="currentColor"/>
            <path d="M8 8V12H12V8H8Z" fill="currentColor"/>
          </svg>
          <span className="logo-text">Lattice</span>
        </Link>
      </div>

      <div className="navbar-right-group">
        <div className="navbar-links-group">
          <Link href="/odkrywaj" className="nav-link">Odkrywaj</Link>
          <Link href="/sesje" className="nav-link">Sesje</Link>
          <Link href="/wiadomosci" className="nav-link">Wiadomości</Link>
          <Link href="#" className="nav-link">Pricing</Link>
          <Link href="#" className="nav-link">About</Link>
          
          <div className="nav-divider"></div>
          
          <button className="btn-login">
            Login
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="navbar-actions-group">
          <button className="btn-icon" aria-label="Search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button className="btn-menu" aria-label="Menu">
            Menu
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 8H20M4 16H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
