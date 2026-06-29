import React from 'react';
import { Phone, MapPin } from 'lucide-react';
import { translations } from '../utils/translations';
import type { Language } from '../utils/translations';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <footer className="site-footer" id="contact">
      <div className="container footer-container">
        {/* Left Column - Contact Info */}
        <div className="footer-col-contact">
          <h3 className="footer-heading">{t.contactTitle}</h3>
          
          <a href="tel:+918143824009" className="contact-link">
            <Phone size={18} className="contact-icon" />
            <span>+91 81438 24009</span>
          </a>

          <p className="copyright-text">{t.rightsText}</p>
        </div>

        {/* Right Column - Map/Location */}
        <div className="footer-col-map">
          <h3 className="footer-heading">{t.findUsTitle}</h3>
          
          <a 
            href="https://maps.google.com/?q=Cheeko+Reddy+Nagar,Hyderabad" 
            target="_blank" 
            rel="noopener noreferrer"
            className="map-link-wrapper"
          >
            <div className="map-placeholder-box">
              {/* Overlay with map details */}
              <div className="map-overlay">
                <MapPin size={16} color="#ffffff" fill="#234b2e" />
                <span className="map-location-label">Cheeko Reddy Nagar, Hyd</span>
              </div>
              
              <span className="placeholder-filename absolute-filename">map_location.png</span>
              
              <img
                src="/images/map_location.png"
                alt="Modha Technologies Location Map"
                className="map-img"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </a>
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: var(--dark-bg);
          color: rgba(255, 255, 255, 0.6);
          padding: 36px 0 24px;
          border-top: 1px solid #2d2d2d;
        }

        @media (min-width: 480px) {
          .site-footer {
            padding: 48px 0 32px;
          }
        }

        @media (min-width: 768px) {
          .site-footer {
            padding: 60px 0 40px;
          }
        }

        .footer-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        @media (min-width: 480px) {
          .footer-container {
            gap: 32px;
          }
        }

        @media (min-width: 768px) {
          .footer-container {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            gap: 40px;
          }
        }

        .footer-col-contact {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
        }

        @media (min-width: 480px) {
          .footer-col-contact {
            gap: 12px;
          }
        }

        @media (min-width: 768px) {
          .footer-col-contact {
            gap: 16px;
          }
        }

        .footer-heading {
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 2px;
        }

        @media (min-width: 480px) {
          .footer-heading {
            font-size: 13px;
            margin-bottom: 4px;
          }
        }

        @media (min-width: 768px) {
          .footer-heading {
            font-size: 15px;
            margin-bottom: 8px;
          }
        }

        .contact-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 600;
          transition: var(--transition-fast);
          min-height: 44px;
        }

        .contact-link:active {
          color: #5ba862;
        }

        .contact-icon {
          color: #5ba862;
        }

        .copyright-text {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 8px;
        }

        @media (min-width: 480px) {
          .copyright-text {
            margin-top: 16px;
          }
        }

        @media (min-width: 768px) {
          .copyright-text {
            font-size: 13px;
            margin-top: 24px;
          }
        }

        .footer-col-map {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          width: 100%;
        }

        @media (min-width: 480px) {
          .footer-col-map {
            gap: 12px;
          }
        }

        @media (min-width: 768px) {
          .footer-col-map {
            width: 280px;
          }
        }

        .map-link-wrapper {
          display: block;
          width: 100%;
        }

        .map-placeholder-box {
          width: 100%;
          height: 80px;
          background-color: #2b2b2b;
          border: 1px solid #444;
          border-radius: 8px;
          position: relative;
          overflow: hidden;
          transition: var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        @media (min-width: 480px) {
          .map-placeholder-box {
            height: 100px;
            border-radius: 10px;
          }
        }

        @media (min-width: 768px) {
          .map-placeholder-box {
            height: 120px;
            border-radius: 12px;
          }
        }

        .map-placeholder-box:active {
          border-color: #5ba862;
          transform: translateY(-2px);
        }

        .map-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 2;
          opacity: 0.85;
        }

        .map-overlay {
          position: absolute;
          z-index: 3;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(2px);
          padding: 6px 10px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }

        .map-location-label {
          font-size: 10px;
          font-weight: 700;
          color: var(--white);
        }

        .absolute-filename {
          position: absolute;
          bottom: 6px;
          right: 6px;
          z-index: 4;
          font-size: 7px;
          background: rgba(0,0,0,0.6);
          border: 1px solid #444;
          color: #aaa;
          padding: 1px 6px;
          border-radius: 4px;
        }

        @media (min-width: 480px) {
          .absolute-filename {
            font-size: 8px;
            bottom: 8px;
            right: 8px;
          }
        }
      `}</style>
    </footer>
  );
};
