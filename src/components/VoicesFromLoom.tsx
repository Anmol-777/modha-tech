import React from 'react';
import { Quote } from 'lucide-react';
import { translations } from '../utils/translations';
import type { Language } from '../utils/translations';

interface VoicesFromLoomProps {
  currentLang: Language;
}

export const VoicesFromLoom: React.FC<VoicesFromLoomProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const testimonials = [
    {
      id: 1,
      imagePath: '/images/testimonial_woman.png',
      alt: 'Weaver testimonial - woman',
    },
    {
      id: 2,
      imagePath: '/images/testimonial_man.png',
      alt: 'Weaver testimonial - man',
    },
  ];

  return (
    <section className="voices-section section-padding" id="our-story">
      <div className="container">
        {/* Large Quote Mark */}
        <div className="vfl-quote-icon">
          <Quote size={50} color="#234b2e" />
        </div>

        <h2 className="vfl-title">{t.voicesTitle}</h2>

        <div className="vfl-grid">
          {testimonials.map((item) => (
            <div key={item.id} className="vfl-card">
              <img
                src={item.imagePath}
                alt={item.alt}
                className="vfl-card-img"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .voices-section {
          background-color: var(--cream-bg);
        }

        .vfl-quote-icon {
          display: flex;
          justify-content: center;
          margin-bottom: 8px;
          opacity: 0.2;
        }

        .vfl-quote-icon svg {
          width: 32px;
          height: 32px;
        }

        @media (min-width: 480px) {
          .vfl-quote-icon svg {
            width: 40px;
            height: 40px;
          }
        }

        @media (min-width: 768px) {
          .vfl-quote-icon svg {
            width: 50px;
            height: 50px;
          }
        }

        .vfl-title {
          font-size: var(--step-4);
          text-align: center;
          margin-bottom: 24px;
          color: var(--primary-green);
        }

        @media (min-width: 480px) {
          .vfl-title {
            margin-bottom: 32px;
          }
        }

        @media (min-width: 768px) {
          .vfl-title {
            margin-bottom: 48px;
          }
        }

        .vfl-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          max-width: 300px;
          margin: 0 auto;
        }

        @media (min-width: 480px) {
          .vfl-grid {
            max-width: 320px;
            gap: 24px;
          }
        }

        @media (min-width: 576px) {
          .vfl-grid {
            grid-template-columns: repeat(2, 1fr);
            max-width: 500px;
            gap: 36px;
          }
        }

        .vfl-card {
          border-radius: 10px;
          overflow: hidden;
          box-shadow: var(--shadow-md);
          background: var(--white);
          transition: var(--transition);
        }

        @media (min-width: 480px) {
          .vfl-card {
            border-radius: 12px;
          }
        }

        @media (min-width: 768px) {
          .vfl-card {
            border-radius: 16px;
          }
        }

        .vfl-card:active {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }

        .vfl-card-img {
          width: 100%;
          height: auto;
          display: block;
        }
      `}</style>
    </section>
  );
};
