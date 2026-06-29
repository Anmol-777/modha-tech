import React from 'react';
import { ArrowRight } from 'lucide-react';
import { translations } from '../utils/translations';
import type { Language } from '../utils/translations';

interface HeroProps {
  currentLang: Language;
}

export const Hero: React.FC<HeroProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <section className="hero-section" id="home">
      {/* Background image — will show placeholder styling until you add the real image */}
      <div className="hero-bg">
        <img
          src="/images/hero_machine.png"
          alt="Modha Technologies Pedal Operating Machine"
          className="hero-bg-img"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="hero-bg-placeholder">
          <span className="placeholder-filename">hero_machine.png</span>
          <span className="placeholder-tip">Add your hero image to <code>public/images/hero_machine.png</code></span>
        </div>
      </div>

      {/* Dark gradient overlay so text is always readable */}
      <div className="hero-overlay" />

      {/* Text content on top */}
      <div className="container hero-content">
        <h1 className="hero-title">{t.heroTitle}</h1>
        <p className="hero-subtitle">
          {t.heroSubtitleBefore}
          <span className="highlight-word">{t.heroSubtitleHighlight}</span>
          {t.heroSubtitleAfter}
        </p>
        <a href="#product" className="explore-btn-link">
          <button className="explore-btn">
            {t.exploreBtn}
            <ArrowRight size={18} />
          </button>
        </a>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100dvh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }

        @media (min-width: 768px) {
          .hero-section {
            min-height: calc(100vh - 70px);
          }
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-color: #d4d0c8;
        }

        .hero-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 60%;
          display: block;
          position: relative;
          z-index: 1;
        }

        .hero-bg-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #8c8b7d;
          z-index: 0;
        }

        .hero-bg-placeholder code {
          font-size: 13px;
          background: rgba(35, 75, 46, 0.08);
          padding: 2px 8px;
          border-radius: 6px;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.75) 0%,
            rgba(0, 0, 0, 0.35) 50%,
            rgba(0, 0, 0, 0.10) 100%
          );
        }

        .hero-content {
          position: relative;
          z-index: 2;
          padding-bottom: 40px;
          padding-top: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
        }

        @media (min-width: 480px) {
          .hero-content {
            padding-bottom: 48px;
            padding-top: 80px;
          }
        }

        @media (min-width: 768px) {
          .hero-content {
            padding-bottom: 80px;
            padding-top: 120px;
            align-items: flex-start;
            text-align: left;
          }
        }

        .hero-title {
          font-size: var(--step-5);
          line-height: 1.1;
          margin-bottom: 10px;
          font-weight: 700;
          color: #ffffff;
        }

        @media (min-width: 768px) {
          .hero-title {
            font-size: var(--step-7);
            margin-bottom: 16px;
          }
        }

        .hero-subtitle {
          font-size: var(--step-0);
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 24px;
          max-width: 480px;
          font-weight: 500;
          line-height: 1.45;
        }

        @media (min-width: 480px) {
          .hero-subtitle {
            margin-bottom: 28px;
          }
        }

        @media (min-width: 768px) {
          .hero-subtitle {
            font-size: var(--step-2);
            margin-bottom: 36px;
          }
        }

        .highlight-word {
          color: #90d48c;
          font-weight: 700;
          border-bottom: 2px solid #90d48c;
        }

        .explore-btn-link {
          display: inline-block;
        }

        .explore-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: var(--primary-green);
          color: var(--white);
          padding: 14px 28px;
          border-radius: 30px;
          font-size: 15px;
          font-weight: 600;
          transition: var(--transition);
          box-shadow: 0 4px 14px rgba(35, 75, 46, 0.35);
          min-height: 48px;
        }

        @media (min-width: 768px) {
          .explore-btn {
            gap: 10px;
            padding: 14px 28px;
            font-size: 16px;
          }
        }

        .explore-btn:active {
          background-color: var(--primary-green-hover);
          transform: scale(0.97);
          box-shadow: 0 6px 20px rgba(35, 75, 46, 0.45);
        }

        .placeholder-filename {
          font-family: var(--font-serif);
          font-weight: 600;
          font-size: 16px;
          color: var(--primary-green);
          background-color: rgba(35, 75, 46, 0.08);
          padding: 4px 12px;
          border-radius: 12px;
        }

        .placeholder-tip {
          font-size: 12px;
          opacity: 0.8;
        }
      `}</style>
    </section>
  );
};
