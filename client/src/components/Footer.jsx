import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import EditableText from './EditableText'
import EditableImage from './EditableImage'
import { getContent } from '../api'

export default function Footer() {
  const { t } = useTranslation()
  const [content, setContent] = useState({})

  useEffect(() => {
    getContent('footer').then(setContent).catch(() => {})
  }, [])

  const phone = content['phone'];

  return (
    <footer style={{
      width: '100%',
      background: '#181818',
      padding: '20px',
      color: '#fff',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        maxWidth: 1200,
        margin: '0 auto',
        width: '100%',
      }}>
        {/* Left Column */}
        <div>
          <EditableText
            section="footer"
            contentKey="contact-heading"
            value={t('footer.contact')}
            tag="h3"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            {t('footer.contact')}
          </EditableText>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 14,
            color: 'rgba(255,255,255,0.8)',
            marginBottom: 48,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.58 1 1 0 01-.25 1.01l-2.2 2.2z" />
            </svg>
            <EditableText
              contentId={phone?.id}
              section="footer"
              contentKey="phone"
              value={phone?.value || '+91 81438 24009'}
              tag="span"
            >
              {phone?.value || '+91 81438 24009'}
            </EditableText>
          </div>
          <EditableText
            section="footer"
            contentKey="copyright"
            value={t('footer.copyright')}
            tag="p"
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            {t('footer.copyright')}
          </EditableText>
        </div>

        {/* Right Column */}
        <div>
          <EditableText
            section="footer"
            contentKey="find-us-heading"
            value={t('footer.findUs')}
            tag="h3"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            {t('footer.findUs')}
          </EditableText>
          <EditableImage
            section="footer"
            contentKey="map-image"
            src="/images/exact.jpg"
            alt={t('footer.mapAlt')}
            style={{
              width: 130,
              height: 'auto',
              borderRadius: 4,
              display: 'block',
            }}
            wrapperStyle={{ display: 'inline-block' }}
          />
        </div>
      </div>
    </footer>
  )
}
