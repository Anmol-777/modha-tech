import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { translations } from '../utils/translations';
import type { Language } from '../utils/translations';

interface HeaderProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  setLang,
  menuOpen,
  setMenuOpen,
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = translations[currentLang];

  const handleLanguageChange = (lang: Language) => {
    setLang(lang);
    setLangDropdownOpen(false);
  };

  const getLanguageLabel = (lang: Language) => {
    switch (lang) {
      case 'en':
        return 'English';
      case 'te':
        return 'తెలుగు';
      case 'hi':
        return 'हिंदी';
      default:
        return 'English';
    }
  };

  return (
    <>
      <header className="site-header">
        <div className="header-container">
          {/* Logo SVG */}
          <div className="logo-wrapper">
            <svg
              className="logo-svg"
              width="150"
              height="40"
              viewBox="0 0 180 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Green Peaks */}
              <path
                d="M10 40 L35 15 L60 40 M55 40 L80 15 L105 40"
                stroke="#234b2e"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Loom base bar */}
              <line
                x1="15"
                y1="43"
                x2="100"
                y2="43"
                stroke="#666"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Stick Figure Weaver */}
              <circle cx="47" cy="23" r="5" stroke="#9e2a2b" strokeWidth="2.5" fill="none" />
              <path
                d="M47 28 L47 38 M47 31 L38 34 M47 31 L56 34 M38 34 L38 43 M56 34 L56 43"
                stroke="#9e2a2b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Logo Text */}
              <text
                x="112"
                y="30"
                fill="#234b2e"
                fontFamily="Lora, serif"
                fontSize="16"
                fontWeight="bold"
                letterSpacing="0.5"
              >
                MODHA
              </text>
              <text
                x="112"
                y="42"
                fill="#555"
                fontFamily="Plus Jakarta Sans, sans-serif"
                fontSize="9"
                fontWeight="600"
                letterSpacing="0.8"
              >
                HANDLOOMS
              </text>
            </svg>
          </div>

          <div className="header-actions">
            {/* Language Selector Dropdown */}
            <div className="lang-selector-container">
              <button
                className="lang-select-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                aria-label="Select Language"
              >
                <Globe size={18} className="lang-icon" />
                <span className="lang-text">{getLanguageLabel(currentLang)}</span>
              </button>

              {langDropdownOpen && (
                <div className="lang-dropdown fade-in">
                  <button
                    className={`lang-option ${currentLang === 'en' ? 'active' : ''}`}
                    onClick={() => handleLanguageChange('en')}
                  >
                    English
                  </button>
                  <button
                    className={`lang-option ${currentLang === 'te' ? 'active' : ''}`}
                    onClick={() => handleLanguageChange('te')}
                  >
                    తెలుగు
                  </button>
                  <button
                    className={`lang-option ${currentLang === 'hi' ? 'active' : ''}`}
                    onClick={() => handleLanguageChange('hi')}
                  >
                    हिंदी
                  </button>
                </div>
              )}
            </div>

            {/* Hamburger Button */}
            <button
              className="menu-toggle-btn"
              onClick={() => setMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={26} color="#234b2e" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Side Navigation Drawer Overlay */}
      {menuOpen && (
        <div className="menu-drawer-backdrop" onClick={() => setMenuOpen(false)}>
          <div
            className="menu-drawer"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
          >
            <div className="drawer-header">
              <button
                className="close-drawer-btn"
                onClick={() => setMenuOpen(false)}
                aria-label="Close Menu"
              >
                <X size={28} color="#234b2e" strokeWidth={2} />
              </button>
            </div>

            <nav className="drawer-nav">
              <ul>
                <li>
                  <a href="#home" onClick={() => setMenuOpen(false)}>
                    {t.menuItems.home}
                  </a>
                </li>
                <li>
                  <a href="#product" onClick={() => setMenuOpen(false)}>
                    {t.menuItems.product}
                  </a>
                </li>
                <li>
                  <a href="#innovations" onClick={() => setMenuOpen(false)}>
                    {t.menuItems.innovations}
                  </a>
                </li>
                <li>
                  <a href="#our-story" onClick={() => setMenuOpen(false)}>
                    {t.menuItems.ourStory}
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={() => setMenuOpen(false)}>
                    {t.menuItems.contactUs}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Header CSS */}
      <style>{`
        .site-header {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          background-color: var(--white);
          border-bottom: 1px solid var(--border-color);
          z-index: 100;
          box-shadow: var(--shadow-sm);
        }
        
        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          height: 56px;
          padding: 0 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        @media (min-width: 480px) {
          .header-container {
            padding: 0 16px;
          }
        }

        @media (min-width: 768px) {
          .header-container {
            height: 70px;
            padding: 0 24px;
          }
        }

        .logo-wrapper {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .logo-svg {
          width: 100px;
          height: auto;
        }

        @media (min-width: 480px) {
          .logo-svg {
            width: 120px;
          }
        }

        @media (min-width: 768px) {
          .logo-svg {
            width: 150px;
          }
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        @media (min-width: 480px) {
          .header-actions {
            gap: 12px;
          }
        }

        @media (min-width: 768px) {
          .header-actions {
            gap: 20px;
          }
        }

        .lang-selector-container {
          position: relative;
        }

        .lang-select-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 8px 10px;
          border-radius: 20px;
          border: 1px solid var(--border-color);
          font-size: 12px;
          font-weight: 600;
          color: var(--light-text);
          transition: var(--transition-fast);
          min-height: 36px;
        }

        @media (min-width: 480px) {
          .lang-select-btn {
            padding: 8px 12px;
          }
        }

        @media (min-width: 768px) {
          .lang-select-btn {
            gap: 6px;
            padding: 8px 14px;
            font-size: 14px;
            min-height: 40px;
          }
        }

        .lang-select-btn:active {
          background-color: var(--primary-green-light);
          transform: scale(0.97);
        }

        .lang-icon {
          color: var(--primary-green);
        }

        .lang-text {
          display: none;
        }

        @media (min-width: 768px) {
          .lang-text {
            display: inline;
          }
        }

        .lang-dropdown {
          position: absolute;
          top: 110%;
          right: 0;
          min-width: 120px;
          background-color: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          box-shadow: var(--shadow-md);
          overflow: hidden;
          z-index: 110;
        }

        .lang-option {
          width: 100%;
          text-align: left;
          padding: 12px 16px;
          font-size: 14px;
          font-weight: 500;
          color: var(--dark-text);
          transition: var(--transition-fast);
          min-height: 44px;
        }

        .lang-option:active {
          background-color: var(--primary-green-light);
          color: var(--primary-green);
        }

        .lang-option.active {
          background-color: var(--primary-green);
          color: var(--white);
        }

        .menu-toggle-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 8px;
          transition: var(--transition-fast);
          min-width: 40px;
          min-height: 40px;
        }

        .menu-toggle-btn:active {
          background-color: var(--primary-green-light);
          transform: scale(0.95);
        }

        .menu-drawer-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
          display: flex;
          justify-content: flex-end;
          animation: fadeIn 0.2s ease-out;
        }

        .menu-drawer {
          width: 280px;
          max-width: 85vw;
          height: 100%;
          background-color: var(--cream-bg);
          box-shadow: var(--shadow-lg);
          padding: 20px 20px 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .menu-drawer {
            width: 320px;
            max-width: 85vw;
            padding: 24px;
            gap: 40px;
          }
        }

        .drawer-header {
          display: flex;
          justify-content: flex-end;
        }

        .close-drawer-btn {
          padding: 10px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }

        .close-drawer-btn:active {
          background-color: rgba(35, 75, 46, 0.1);
          transform: scale(0.92);
        }

        .drawer-nav ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        @media (min-width: 768px) {
          .drawer-nav ul {
            gap: 24px;
          }
        }

        .drawer-nav a {
          font-family: var(--font-serif);
          font-size: 18px;
          font-weight: 600;
          color: var(--primary-green);
          display: inline-block;
          padding: 8px 0;
          border-bottom: 2px solid transparent;
          transition: var(--transition-fast);
        }

        @media (min-width: 768px) {
          .drawer-nav a {
            font-size: 24px;
          }
        }

        .drawer-nav a:active {
          color: var(--primary-green-hover);
          border-bottom-color: var(--primary-green);
        }
      `}</style>
    </>
  );
};
