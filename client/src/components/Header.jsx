import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAdmin } from '../context/AdminContext'

export default function Header() {
  const { t, i18n } = useTranslation()
  const { admin, editMode, setEditMode } = useAdmin()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 64,
        background: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          padding: '0 20px',
          maxWidth: 1200,
          margin: '0 auto',
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/images/proper logo.jpg"
              alt={t('header.logoAlt')}
              style={{ height: 34, width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {admin && (
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 12,
                fontWeight: 500,
                color: '#48663F',
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: 6,
                background: editMode ? '#DDE8D3' : 'transparent',
              }}>
                <input
                  type="checkbox"
                  checked={editMode}
                  onChange={(e) => setEditMode(e.target.checked)}
                  style={{ margin: 0 }}
                />
                Edit
              </label>
            )}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{ display: 'flex', alignItems: 'center', padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
                aria-label={t('header.languageSelectorAria')}
              >
                <img
                  src="/images/english.jpg"
                  alt={t('header.languageLabel')}
                  style={{ height: 28, width: 'auto', objectFit: 'contain', display: 'block' }}
                />
              </button>
              {langOpen && (
                <>
                  <div style={{ position: 'fixed', inset: 0, zIndex: 49 }} onClick={() => setLangOpen(false)} />
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: 8,
                    width: 140,
                    background: '#fff',
                    borderRadius: 8,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 50,
                    overflow: 'hidden',
                  }}>
                    <button
                      onClick={() => { i18n.changeLanguage('en'); localStorage.setItem('preferredLanguage', 'en'); setLangOpen(false) }}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '12px 16px',
                        border: 'none',
                        background: i18n.language === 'en' ? '#f5f5f5' : '#fff',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14,
                        color: '#2E2E2E',
                        textAlign: 'left',
                        cursor: 'pointer',
                      }}
                    >
                      English
                    </button>
                    <button
                      onClick={() => { i18n.changeLanguage('hi'); localStorage.setItem('preferredLanguage', 'hi'); setLangOpen(false) }}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '12px 16px',
                        border: 'none',
                        background: i18n.language === 'hi' ? '#f5f5f5' : '#fff',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14,
                        color: '#2E2E2E',
                        textAlign: 'left',
                        cursor: 'pointer',
                      }}
                    >
                      हिन्दी
                    </button>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={() => setMenuOpen(true)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, gap: 4 }}
              aria-label={t('header.menuAria')}
            >
              <span style={{ display: 'block', width: 20, height: 2, background: '#2E2E2E' }} />
              <span style={{ display: 'block', width: 20, height: 2, background: '#2E2E2E' }} />
              <span style={{ display: 'block', width: 20, height: 2, background: '#2E2E2E' }} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <>
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 50 }} onClick={() => setMenuOpen(false)} />
          <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 280, zIndex: 50, background: '#fff', boxShadow: '-4px 0 12px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 16 }}>
              <button onClick={() => setMenuOpen(false)} style={{ fontSize: 24, color: '#2E2E2E' }}>✕</button>
            </div>
            <nav style={{ padding: '0 24px' }}>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 24 }}>
                <li><Link to="/" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: '#2E2E2E' }} onClick={() => setMenuOpen(false)}>{t('nav.home')}</Link></li>
                <li><Link to="/products" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: '#2E2E2E' }} onClick={() => setMenuOpen(false)}>{t('nav.product')}</Link></li>
                <li><Link to="/innovations" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: '#2E2E2E' }} onClick={() => setMenuOpen(false)}>{t('nav.innovations')}</Link></li>
                <li><Link to="/about" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: '#2E2E2E' }} onClick={() => setMenuOpen(false)}>{t('nav.ourStory')}</Link></li>
                <li><Link to="/contact" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: '#2E2E2E' }} onClick={() => setMenuOpen(false)}>{t('nav.contactUs')}</Link></li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  )
}
