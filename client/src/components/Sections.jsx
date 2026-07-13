import { useRef, useState, useEffect } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import EditableText from './EditableText'
import EditableImage from './EditableImage'
import { getContent } from '../api'

function useContent(section) {
  const [data, setData] = useState({})
  useEffect(() => {
    getContent(section)
      .then(setData)
      .catch(() => {})
  }, [section])
  return data
}

export function HeroSection() {
  const { t } = useTranslation()
  const content = useContent('home')

  const heading = content['hero-heading'];
  const tagline = content['hero-tagline'];
  const cta = content['hero-cta'];
  const badge = content['hero-badge'];
  const heroImage = content['hero-image'];

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: 450,
      marginTop: 64,
      overflow: 'hidden',
    }}>
      {heroImage ? (
        <EditableImage
          contentId={heroImage.id}
          src={heroImage.value}
          alt={t('home.heroAlt')}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          wrapperStyle={{ position: 'absolute', inset: 0 }}
        />
      ) : (
        <img
          src="/images/machine.jpg"
          alt={t('home.heroAlt')}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      )}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
      }} />

      <div style={{
        position: 'relative',
        height: '100%',
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div style={{ maxWidth: 280 }}>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 34,
            fontWeight: 400,
            lineHeight: 1.1,
            color: '#2E2E2E',
          }}>
            {heading ? (
              <EditableText contentId={heading.id} value={heading.value} tag="span">
                {heading.value}
              </EditableText>
            ) : (
              t('home.heroHeading')
            )}
          </h1>
          <p style={{
            marginTop: 16,
            fontSize: 16,
            lineHeight: 1.5,
            color: '#2E2E2E',
          }}>
            {tagline ? (
              <EditableText contentId={tagline.id} value={tagline.value}>
                {tagline.value}
              </EditableText>
            ) : (
              <Trans i18nKey="home.heroText">
                Empowering the <strong style={{ color: '#48663F' }}>hands</strong> that clothe the nation
              </Trans>
            )}
          </p>
          <a
            href="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 24,
              padding: '14px 28px',
              background: '#496C42',
              color: '#fff',
              borderRadius: 999,
              fontFamily: "'Poppins', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.target.style.background = '#3a5a34'}
            onMouseLeave={e => e.target.style.background = '#496C42'}
          >
            {cta ? (
              <EditableText contentId={cta.id} value={cta.value}>
                {cta.value}
              </EditableText>
            ) : (
              t('home.exploreProduct')
            )}
            <span style={{ fontSize: 18 }}>→</span>
          </a>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 16,
        left: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: '#48663F',
        borderRadius: 8,
        padding: '6px 12px',
      }}>
        <div style={{ width: 16, height: 16, borderRadius: 4, background: '#3a5a34' }} />
        <span style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>
          {badge ? (
            <EditableText contentId={badge.id} value={badge.value}>
              {badge.value}
            </EditableText>
          ) : (
            t('home.badge')
          )}
        </span>
      </div>
    </section>
  )
}

export function FeaturesSection() {
  const { t } = useTranslation()
  const content = useContent('home')

  const heading = content['features-heading'];
  const image = content['features-image'];

  return (
    <section style={{
      width: '100%',
      background: '#DDE8D3',
      padding: '32px 20px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 24,
          fontWeight: 400,
          color: '#48663F',
          textAlign: 'center',
        }}>
          {heading ? (
            <EditableText contentId={heading.id} value={heading.value}>
              {heading.value}
            </EditableText>
          ) : (
            t('home.keyFeatures')
          )}
        </h2>
        <div style={{
          marginTop: 20,
          width: '100%',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}>
          {image ? (
            <EditableImage
              contentId={image.id}
              src={image.value}
              alt={t('home.keyFeaturesAlt')}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          ) : (
            <img
              src="/images/Group 106.jpg"
              alt={t('home.keyFeaturesAlt')}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export function VideoSection() {
  const { t } = useTranslation()
  const content = useContent('home')

  const heading = content['video-heading'];
  const thumbnail = content['video-thumbnail'];

  return (
    <section style={{
      width: '100%',
      background: '#DDE8D3',
      padding: '32px 20px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 22,
          color: '#48663F',
          textAlign: 'center',
          marginBottom: 20,
        }}>
          {heading ? (
            <EditableText contentId={heading.id} value={heading.value}>
              {heading.value}
            </EditableText>
          ) : (
            t('home.installationVideo')
          )}
        </h2>
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          maxWidth: 800,
          margin: '0 auto',
        }}>
          {thumbnail ? (
            <EditableImage
              contentId={thumbnail.id}
              src={thumbnail.value}
              alt={t('home.installationVideoAlt')}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              wrapperStyle={{ position: 'absolute', inset: 0 }}
            />
          ) : (
            <img
              src="/images/Group 9.jpg"
              alt={t('home.installationVideoAlt')}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              transition: 'transform 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              aria-label={t('home.playVideoAria')}
            >
              <svg width="20" height="24" viewBox="0 0 24 24" fill="#48663F">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function TestimonialsSection() {
  const { t } = useTranslation()
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const content = useContent('home')

  const heading = content['testimonials-heading'];

  const testimonials = [
    {
      quote: t('home.testimonial1Quote'),
      author: t('home.testimonial1Author'),
      image: "/images/Property 1=Default.jpg",
    },
    {
      quote: t('home.testimonial2Quote'),
      author: t('home.testimonial2Author'),
      image: "/images/Property 1=Default-1.jpg",
    },
  ]

  const handleScroll = () => {
    if (!scrollRef.current) return
    const idx = Math.round(scrollRef.current.scrollLeft / scrollRef.current.offsetWidth)
    setActiveIndex(idx)
  }

  return (
    <section style={{ width: '100%', background: '#fff', padding: '36px 20px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 22,
          color: '#48663F',
          textAlign: 'center',
          marginBottom: 24,
        }}>
          {heading ? (
            <EditableText contentId={heading.id} value={heading.value}>
              {heading.value}
            </EditableText>
          ) : (
            t('home.voicesFromTheLoom')
          )}
        </h2>
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{
            display: 'flex',
            gap: 16,
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            margin: '0 -20px',
            padding: '0 20px',
          }}
          className="scrollbar-hide"
        >
          {testimonials.map((tItem, i) => (
            <div key={i} style={{
              flex: '0 0 300px',
              scrollSnapAlign: 'start',
              borderRadius: 20,
              background: '#fff',
              border: '1px solid #f0f0f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'relative', width: '100%', height: 160 }}>
                <img src={tItem.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: 16 }}>
                <p style={{ fontSize: 14, color: '#2E2E2E', lineHeight: 1.6, marginBottom: 12 }}>
                  &ldquo;{tItem.quote}&rdquo;
                </p>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#48663F' }}>{tItem.author}</p>
                <button style={{ marginTop: 8, fontSize: 12, fontWeight: 500, color: '#48663F', background: 'none', border: 'none', cursor: 'pointer' }}>
                  {t('home.readMore')}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }}>
          {testimonials.map((_, i) => (
            <button key={i} style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: i === activeIndex ? '#48663F' : '#d1d5db',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function AwardsSection() {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)
  const content = useContent('home')

  const heading = content['awards-heading'];
  const award1 = content['awards-image-1'];
  const award2 = content['awards-image-2'];

  const awards = [
    { title: t('home.award1Title'), image: award1?.value || "/images/Group 134.jpg", imageId: award1?.id },
    { title: t('home.award2Title'), image: award2?.value || "/images/Group 134.jpg", imageId: award2?.id },
  ]

  return (
    <section id="awards" style={{ width: '100%', background: '#fff', padding: '36px 20px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 22,
          color: '#48663F',
          textAlign: 'center',
          marginBottom: 24,
        }}>
          {heading ? (
            <EditableText contentId={heading.id} value={heading.value}>
              {heading.value}
            </EditableText>
          ) : (
            t('home.awardsAndRecognition')
          )}
        </h2>
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4/3',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          maxWidth: 800,
          margin: '0 auto',
        }}>
          {awards[active].imageId ? (
            <EditableImage
              contentId={awards[active].imageId}
              src={awards[active].image}
              alt={awards[active].title}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              wrapperStyle={{ position: 'absolute', inset: 0 }}
            />
          ) : (
            <img
              src={awards[active].image}
              alt={awards[active].title}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }}>
          {awards.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: i === active ? '#48663F' : '#d1d5db',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }} />
          ))}
        </div>
      </div>
    </section>
  )
}
