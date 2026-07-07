import Image from 'next/image';

interface PortfolioCardProps {
  name: string;
  role: string;
  location: string;
  imageUrl: string;
}

export default function PortfolioCard({ name, role, location, imageUrl }: PortfolioCardProps) {
  return (
    <div className="portfolio-card">
      <div className="card-image-wrapper">
        <Image 
          src={imageUrl}
          alt={`${name} - ${role}`}
          fill
          className="card-image"
          sizes="(max-width: 768px) 100vw, 340px"
          priority
        />
      </div>
      <div className="card-content">
        <div className="card-info">
          <h3 className="card-title">{name}</h3>
          <p className="card-subtitle">{role}, {location}</p>
        </div>
        <button className="card-action" aria-label="View Profile">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
