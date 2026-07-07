"use client";

import { useRef } from 'react';

interface HoverVideoCardProps {
  badge: string;
  title: string;
  videoSrc: string;
  startTime?: number;
}

function HoverVideoCard({ badge, title, videoSrc, startTime = 0.1 }: HoverVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Video play error:", e));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = startTime;
    }
  };

  return (
    <div
      className="join-card join-card-dark"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={`${videoSrc}#t=${startTime}`}
        className="join-card-bg"
        muted
        loop
        playsInline
        preload="metadata"
        style={{ objectFit: 'cover', position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      <div className="join-card-overlay"></div>

      <div className="join-badge relative-z">{badge}</div>

      <div className="join-bottom relative-z">
        <h3 className="join-title">Dołącz jako<br />{title}</h3>
        <button className="join-arrow-btn" aria-label={`Dołącz jako ${title}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function JoinCards() {
  return (
    <div className="join-cards-container">
      <HoverVideoCard badge="Fotograf" title="Fotograf" videoSrc="/man.mp4" startTime={0.0} />
      <HoverVideoCard badge="Modelka" title="Modelka" videoSrc="/abc.mp4" />

      {/* Carousel Arrows next to cards */}
      <div className="join-carousel-arrows">
        <button className="carousel-arrow carousel-arrow-prev" aria-label="Previous">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="carousel-arrow carousel-arrow-next" aria-label="Next">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
