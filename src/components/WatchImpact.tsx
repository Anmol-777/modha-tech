import React, { useState } from 'react';
import { Play, CheckCircle2, ArrowRight, X } from 'lucide-react';
import { translations } from '../utils/translations';
import type { Language } from '../utils/translations';

interface WatchImpactProps {
  currentLang: Language;
}

export const WatchImpact: React.FC<WatchImpactProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="watch-impact-section section-padding" id="innovations">
      <div className="container">
        <h2 className="section-title-light text-center">{t.watchImpactTitle}</h2>

        <div className="impact-grid">
          {/* Video / Play Section */}
          <div className="video-player-container">
            <div className="video-thumbnail-placeholder" onClick={() => setVideoOpen(true)}>
              {/* Play Button Overlay */}
              <button className="play-button" aria-label="Play Impact Video">
                <Play fill="#ffffff" color="#ffffff" size={32} className="play-icon-svg" />
              </button>

              {/* Bottom text overlay matching exact layout */}
              <div className="video-text-overlay">
                <p>{t.videoSubtitle}</p>
              </div>

              {/* Actual img fallback */}
              <img
                src="/images/impact_video.png"
                alt="Watch the Impact Video Thumbnail"
                className="video-img"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="placeholder-filename absolute-filename">impact_video.png</span>
            </div>
          </div>

          {/* Bullet points info */}
          <div className="impact-info-container">
            <h3 className="impact-subtitle">
              {t.givingWeaversTitle}{' '}
              <span className="green-underline">{t.givingWeaversSubtitle}</span>
            </h3>

            <div className="impact-features-list">
              <div className="impact-feature-item">
                <div className="checkmark-icon">
                  <CheckCircle2 size={24} color="#5ba862" />
                </div>
                <div className="item-text">
                  <h4 className="item-heading">{t.featureCareerTitle}</h4>
                  <p className="item-desc">{t.featureCareerDesc}</p>
                </div>
              </div>

              <div className="impact-feature-item">
                <div className="checkmark-icon">
                  <CheckCircle2 size={24} color="#5ba862" />
                </div>
                <div className="item-text">
                  <h4 className="item-heading">{t.featurePreserveTitle}</h4>
                  <p className="item-desc">{t.featurePreserveDesc}</p>
                </div>
              </div>
            </div>

            <a href="#our-story" className="founder-story-link">
              <span>{t.readFounderStory}</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Video Modal Simulation */}
      {videoOpen && (
        <div className="video-modal-backdrop" onClick={() => setVideoOpen(false)}>
          <div className="video-modal-content scale-up" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setVideoOpen(false)}>
              <X size={24} />
            </button>
            <div className="modal-video-wrapper">
              {/* If user hasn't added a video, show a beautiful animated simulation */}
              <div className="simulated-video-player">
                <div className="weaving-animation">
                  <div className="weaving-shuttle"></div>
                  <div className="weaving-threads"></div>
                </div>
                <p className="simulated-video-text">Playing: Modha Technologies Handloom Impact Video</p>
                <p className="simulated-video-subtext">Replace source in <code>src/components/WatchImpact.tsx</code> with your own video file or YouTube embed!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .watch-impact-section {
          background-color: var(--dark-bg);
          color: var(--white);
        }

        .section-title-light {
          font-size: var(--step-4);
          margin-bottom: 24px;
          text-align: center;
          color: var(--white);
          position: relative;
          display: inline-block;
          left: 50%;
          transform: translateX(-50%);
        }

        @media (min-width: 480px) {
          .section-title-light {
            margin-bottom: 32px;
          }
        }

        @media (min-width: 768px) {
          .section-title-light {
            margin-bottom: 50px;
          }
        }

        .section-title-light::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 10%;
          width: 80%;
          height: 2px;
          background-color: var(--primary-green);
          border-radius: 2px;
        }

        @media (min-width: 768px) {
          .section-title-light::after {
            bottom: -10px;
            left: 15%;
            width: 70%;
            height: 3px;
          }
        }

        .impact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          align-items: center;
        }

        @media (min-width: 480px) {
          .impact-grid {
            gap: 32px;
          }
        }

        @media (min-width: 768px) {
          .impact-grid {
            gap: 40px;
          }
        }

        @media (min-width: 992px) {
          .impact-grid {
            grid-template-columns: 1.1fr 0.9fr;
            gap: 50px;
          }
        }

        .video-player-container {
          width: 100%;
        }

        .video-thumbnail-placeholder {
          width: 100%;
          aspect-ratio: 16 / 9;
          background-color: #2b2b2b;
          border: 2px dashed #555555;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          transition: var(--transition-fast);
        }

        @media (min-width: 480px) {
          .video-thumbnail-placeholder {
            border-radius: 16px;
          }
        }

        @media (min-width: 768px) {
          .video-thumbnail-placeholder {
            border-radius: 20px;
          }
        }

        .video-thumbnail-placeholder:active {
          transform: scale(0.98);
        }

        .play-button {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(35, 75, 46, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
          transition: var(--transition-fast);
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        @media (min-width: 480px) {
          .play-button {
            width: 56px;
            height: 56px;
          }
        }

        @media (min-width: 768px) {
          .play-button {
            width: 70px;
            height: 70px;
          }
        }

        .play-button:active {
          background: var(--primary-green);
          transform: scale(0.95);
        }

        .play-icon-svg {
          width: 22px;
          height: 22px;
          transform: translateX(2px);
        }

        @media (min-width: 480px) {
          .play-icon-svg {
            width: 24px;
            height: 24px;
          }
        }

        @media (min-width: 768px) {
          .play-icon-svg {
            width: 32px;
            height: 32px;
          }
        }

        .video-text-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.9) 80%);
          padding: 16px 12px 12px;
          color: var(--white);
          text-align: center;
          font-size: 11px;
          font-weight: 500;
          z-index: 4;
        }

        @media (min-width: 480px) {
          .video-text-overlay {
            font-size: 12px;
          }
        }

        @media (min-width: 768px) {
          .video-text-overlay {
            padding: 24px 20px 20px;
            font-size: 14px;
          }
        }

        .video-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 2;
        }

        .absolute-filename {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 4;
          background: rgba(0,0,0,0.6);
          border: 1px solid #444;
          color: #aaa;
        }

        .impact-info-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .impact-subtitle {
          font-size: var(--step-3);
          font-weight: 700;
          margin-bottom: 16px;
          color: var(--white);
          line-height: 1.25;
        }

        @media (min-width: 480px) {
          .impact-subtitle {
            margin-bottom: 24px;
          }
        }

        @media (min-width: 768px) {
          .impact-subtitle {
            margin-bottom: 30px;
          }
        }

        .green-underline {
          color: #5ba862;
          border-bottom: 2px solid #5ba862;
        }

        .impact-features-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 20px;
        }

        @media (min-width: 480px) {
          .impact-features-list {
            gap: 20px;
            margin-bottom: 28px;
          }
        }

        @media (min-width: 768px) {
          .impact-features-list {
            gap: 24px;
            margin-bottom: 36px;
          }
        }

        .impact-feature-item {
          display: flex;
          gap: 10px;
        }

        @media (min-width: 480px) {
          .impact-feature-item {
            gap: 12px;
          }
        }

        @media (min-width: 768px) {
          .impact-feature-item {
            gap: 16px;
          }
        }

        .checkmark-icon {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .checkmark-icon svg {
          width: 18px;
          height: 18px;
        }

        @media (min-width: 480px) {
          .checkmark-icon svg {
            width: 20px;
            height: 20px;
          }
        }

        @media (min-width: 768px) {
          .checkmark-icon svg {
            width: 24px;
            height: 24px;
          }
        }

        .item-heading {
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 4px;
          color: var(--white);
        }

        @media (min-width: 480px) {
          .item-heading {
            font-size: 16px;
          }
        }

        @media (min-width: 768px) {
          .item-heading {
            font-size: 18px;
          }
        }

        .item-desc {
          font-size: 12px;
          color: #b0b0b0;
          line-height: 1.5;
        }

        @media (min-width: 480px) {
          .item-desc {
            font-size: 13px;
          }
        }

        @media (min-width: 768px) {
          .item-desc {
            font-size: 14px;
          }
        }

        .founder-story-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          font-size: 14px;
          color: #5ba862;
          transition: var(--transition);
          border-bottom: 1.5px solid transparent;
          padding-bottom: 2px;
          min-height: 44px;
        }

        @media (min-width: 768px) {
          .founder-story-link {
            font-size: 16px;
          }
        }

        .founder-story-link:active {
          color: #72c47a;
          border-bottom-color: #72c47a;
          gap: 12px;
        }

        .video-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 12px;
        }

        @media (min-width: 480px) {
          .video-modal-backdrop {
            padding: 16px;
          }
        }

        @media (min-width: 768px) {
          .video-modal-backdrop {
            padding: 24px;
          }
        }

        .video-modal-content {
          width: 100%;
          max-width: 800px;
          background: #111;
          border-radius: 10px;
          border: 1px solid #333;
          position: relative;
          overflow: hidden;
        }

        @media (min-width: 480px) {
          .video-modal-content {
            border-radius: 12px;
          }
        }

        @media (min-width: 768px) {
          .video-modal-content {
            border-radius: 16px;
          }
        }

        .close-modal-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(0,0,0,0.5);
          color: var(--white);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: var(--transition-fast);
        }

        @media (min-width: 768px) {
          .close-modal-btn {
            top: 15px;
            right: 15px;
            width: 36px;
            height: 36px;
          }
        }

        .close-modal-btn:active {
          background: var(--primary-green);
        }

        .modal-video-wrapper {
          width: 100%;
          aspect-ratio: 16 / 9;
        }

        .simulated-video-player {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px;
          color: var(--white);
          text-align: center;
          background: radial-gradient(circle, #254b2e 0%, #0d120e 100%);
        }

        @media (min-width: 480px) {
          .simulated-video-player {
            gap: 12px;
            padding: 24px;
          }
        }

        @media (min-width: 768px) {
          .simulated-video-player {
            gap: 16px;
            padding: 40px;
          }
        }

        .weaving-animation {
          position: relative;
          width: 120px;
          height: 14px;
          background: rgba(255,255,255,0.1);
          border-radius: 8px;
          overflow: hidden;
        }

        @media (min-width: 480px) {
          .weaving-animation {
            width: 160px;
            height: 16px;
          }
        }

        @media (min-width: 768px) {
          .weaving-animation {
            width: 200px;
            height: 20px;
          }
        }

        .weaving-shuttle {
          position: absolute;
          width: 28px;
          height: 100%;
          background: #5ba862;
          border-radius: 8px;
          animation: slideShuttle 2s ease-in-out infinite;
        }

        @media (min-width: 480px) {
          .weaving-shuttle {
            width: 32px;
          }
        }

        @media (min-width: 768px) {
          .weaving-shuttle {
            width: 40px;
          }
        }

        @keyframes slideShuttle {
          0%, 100% { left: 0; }
          50% { left: calc(100% - 28px); }
        }

        @media (min-width: 480px) {
          @keyframes slideShuttle {
            0%, 100% { left: 0; }
            50% { left: calc(100% - 32px); }
          }
        }

        @media (min-width: 768px) {
          @keyframes slideShuttle {
            0%, 100% { left: 0; }
            50% { left: 160px; }
          }
        }

        .simulated-video-text {
          font-family: var(--font-serif);
          font-size: 14px;
          font-weight: 600;
        }

        @media (min-width: 480px) {
          .simulated-video-text {
            font-size: 16px;
          }
        }

        @media (min-width: 768px) {
          .simulated-video-text {
            font-size: 20px;
          }
        }

        .simulated-video-subtext {
          font-size: 11px;
          color: #999;
          max-width: 300px;
        }

        @media (min-width: 480px) {
          .simulated-video-subtext {
            max-width: 350px;
          }
        }

        @media (min-width: 768px) {
          .simulated-video-subtext {
            font-size: 13px;
            max-width: 450px;
          }
        }
      `}</style>
    </section>
  );
};
