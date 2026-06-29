import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { translations } from '../utils/translations';
import type { Language } from '../utils/translations';

interface AwardsProps {
  currentLang: Language;
}

interface AwardItem {
  id: number;
  imagePath: string;
  filename: string;
  text: string;
}

export const Awards: React.FC<AwardsProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [activeSlide, setActiveSlide] = useState(0);

  const awardsList: AwardItem[] = [
    {
      id: 1,
      imagePath: '/images/award_ceremony.png',
      filename: 'award_ceremony.png',
      text: t.award1Text,
    },
    {
      id: 2,
      imagePath: '/images/award_cluster.png',
      filename: 'award_cluster.png',
      text: t.award2Text,
    },
    {
      id: 3,
      imagePath: '/images/award_design.png',
      filename: 'award_design.png',
      text: t.award3Text,
    },
  ];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? awardsList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === awardsList.length - 1 ? 0 : prev + 1));
  };

  // Autoplay slider every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="awards-section section-padding" id="awards">
      <div className="container">
        <div className="awards-carousel-container">
          <div className="carousel-window">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {awardsList.map((award) => (
                <div key={award.id} className="carousel-slide">
                  <div className="award-image-placeholder">
                    <span className="placeholder-filename absolute-filename">{award.filename}</span>
                    <img
                      src={award.imagePath}
                      alt="Award Ceremony"
                      className="award-img"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />

                    {/* Bottom overlay text matching exact layout */}
                    <div className="award-text-overlay">
                      <p>{award.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <button className="carousel-nav-btn prev" onClick={handlePrev} aria-label="Previous Award">
              <ChevronLeft size={24} />
            </button>
            <button className="carousel-nav-btn next" onClick={handleNext} aria-label="Next Award">
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="carousel-dots">
            {awardsList.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === activeSlide ? 'active' : ''}`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Awards heading + Frame 115 image */}
        <h2 className="section-title text-center award-section-heading">{t.awardsTitle}</h2>
        <div className="award-banner">
          <div className="award-banner-image-wrapper">
            <img
              src="/images/Frame 115.jpg"
              alt="Award Recognition"
              className="award-banner-img"
            />
          </div>
        </div>
      </div>

      <style>{`
        .awards-section {
          background-color: var(--cream-bg);
          border-top: 1px solid var(--border-color);
        }

        .awards-carousel-container {
          max-width: 800px;
          margin: 24px auto 0;
          position: relative;
        }

        @media (min-width: 480px) {
          .awards-carousel-container {
            margin: 32px auto 0;
          }
        }

        @media (min-width: 768px) {
          .awards-carousel-container {
            margin: 40px auto 0;
          }
        }

        .carousel-window {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-color);
          background-color: #eeebe3;
        }

        @media (min-width: 480px) {
          .carousel-window {
            aspect-ratio: 16 / 9.5;
            border-radius: 16px;
          }
        }

        @media (min-width: 768px) {
          .carousel-window {
            aspect-ratio: 16 / 9.2;
            border-radius: 24px;
          }
        }

        .carousel-track {
          display: flex;
          width: 100%;
          height: 100%;
          transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .carousel-slide {
          min-width: 100%;
          width: 100%;
          height: 100%;
          position: relative;
        }

        .award-image-placeholder {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .award-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 2;
        }

        .award-text-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8) 60%);
          padding: 20px 12px 12px;
          color: var(--white);
          text-align: center;
          font-size: 11px;
          font-weight: 600;
          z-index: 4;
          line-height: 1.4;
        }

        @media (min-width: 480px) {
          .award-text-overlay {
            padding: 24px 16px 16px;
            font-size: 13px;
          }
        }

        @media (min-width: 768px) {
          .award-text-overlay {
            padding: 30px 24px 24px;
            font-size: 15px;
          }
        }

        .absolute-filename {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 4;
          background: rgba(0,0,0,0.6);
          border: 1px solid #444;
          color: #aaa;
          font-size: 10px;
          padding: 2px 8px;
        }

        .carousel-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(35, 75, 46, 0.8);
          color: var(--white);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
          transition: var(--transition-fast);
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .carousel-nav-btn:active {
          background: var(--primary-green);
          transform: translateY(-50%) scale(0.95);
        }

        .carousel-nav-btn.prev {
          left: 6px;
        }

        @media (min-width: 480px) {
          .carousel-nav-btn.prev {
            left: 10px;
          }
        }

        @media (min-width: 768px) {
          .carousel-nav-btn.prev {
            left: 15px;
            width: 44px;
            height: 44px;
          }
        }

        .carousel-nav-btn.next {
          right: 6px;
        }

        @media (min-width: 480px) {
          .carousel-nav-btn.next {
            right: 10px;
          }
        }

        @media (min-width: 768px) {
          .carousel-nav-btn.next {
            right: 15px;
            width: 44px;
            height: 44px;
          }
        }

        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 12px;
        }

        @media (min-width: 480px) {
          .carousel-dots {
            margin-top: 16px;
          }
        }

        @media (min-width: 768px) {
          .carousel-dots {
            gap: 10px;
            margin-top: 20px;
          }
        }

        .carousel-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #c8c7bf;
          transition: var(--transition-fast);
          min-width: 8px;
          min-height: 8px;
        }

        .carousel-dot.active {
          background-color: var(--primary-green);
          width: 20px;
          border-radius: 5px;
        }

        @media (min-width: 768px) {
          .carousel-dot.active {
            width: 24px;
          }
        }

        .award-banner {
          margin-top: 32px;
        }

        @media (min-width: 480px) {
          .award-banner {
            margin-top: 40px;
          }
        }

        @media (min-width: 768px) {
          .award-banner {
            margin-top: 60px;
          }
        }

        .award-banner-image-wrapper {
          position: relative;
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-color);
        }

        @media (min-width: 480px) {
          .award-banner-image-wrapper {
            border-radius: 16px;
          }
        }

        @media (min-width: 768px) {
          .award-banner-image-wrapper {
            border-radius: 20px;
          }
        }

        .award-banner-img {
          width: 100%;
          height: auto;
          display: block;
        }

        .award-section-heading {
          margin-top: 32px;
        }

        @media (min-width: 480px) {
          .award-section-heading {
            margin-top: 40px;
          }
        }

        @media (min-width: 768px) {
          .award-section-heading {
            margin-top: 60px;
          }
        }
      `}</style>
    </section>
  );
};
