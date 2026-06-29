import React from 'react';
import { translations } from '../utils/translations';
import type { Language } from '../utils/translations';

interface KeyFeaturesProps {
  currentLang: Language;
}

export const KeyFeatures: React.FC<KeyFeaturesProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <section className="key-features-section section-padding" id="product">
      <div className="container">
        <h2 className="kf-section-title">{t.keyFeaturesTitle}</h2>

        <div className="kf-highlight-wrapper">
          <div className="kf-card-highlight">
            <img
              src="/images/feature_pressure.png"
              alt={t.feature1Title}
              className="kf-img"
            />
            <div className="kf-label">
              <span>{t.feature1Title}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .key-features-section {
          background-color: var(--sage-green);
        }

        .kf-section-title {
          font-size: var(--step-4);
          text-align: center;
          margin-bottom: 24px;
          color: var(--primary-green);
        }

        @media (min-width: 480px) {
          .kf-section-title {
            margin-bottom: 32px;
          }
        }

        @media (min-width: 768px) {
          .kf-section-title {
            margin-bottom: 48px;
          }
        }

        .kf-highlight-wrapper {
          display: flex;
          justify-content: center;
        }

        .kf-card-highlight {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          width: 100%;
          max-width: 100%;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
          transition: var(--transition);
        }

        @media (min-width: 480px) {
          .kf-card-highlight {
            border-radius: 16px;
          }
        }

        @media (min-width: 576px) {
          .kf-card-highlight {
            max-width: 520px;
          }
        }

        .kf-img {
          width: 100%;
          height: auto;
          display: block;
        }

        .kf-label {
          position: absolute;
          bottom: 8px;
          right: 8px;
          z-index: 2;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(6px);
          color: #ffffff;
          padding: 6px 10px;
          border-radius: 8px;
          max-width: 75%;
          text-align: right;
        }

        @media (min-width: 480px) {
          .kf-label {
            bottom: 12px;
            right: 12px;
            padding: 8px 14px;
          }
        }

        @media (min-width: 768px) {
          .kf-label {
            bottom: 16px;
            right: 16px;
            padding: 10px 18px;
            border-radius: 12px;
            max-width: 65%;
          }
        }

        .kf-label span {
          font-size: 11px;
          font-weight: 700;
          line-height: 1.3;
          display: block;
        }

        @media (min-width: 480px) {
          .kf-label span {
            font-size: 12px;
          }
        }

        @media (min-width: 768px) {
          .kf-label span {
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
};
