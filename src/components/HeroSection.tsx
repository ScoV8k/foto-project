import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <h1 className="hero-title">
        Built by creators. Grown<br />by the community
      </h1>
      <p className="hero-subtitle">
        We help you launch and grow your marketing career by learning from real people&apos;s<br />stories, strategies, and daily wins.
      </p>
      <div className="hero-actions">
        <Link href="/odkrywaj" className="btn-primary" style={{ textDecoration: 'none' }}>
          Odkryj twórców
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <button className="btn-secondary">
          Contact us
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
}
