import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import EditableText from '../components/EditableText'
import EditableImage from '../components/EditableImage'
import { getContent } from '../api'

const images = [
  { src: '/images/image-14.jpg' },
  { src: '/images/image-15.jpg' },
  { src: '/images/image-18.jpg' },
]

const techSpecKeys = [
  { labelKey: 'specDimensions', valueKey: 'specDimensionsVal' },
  { labelKey: 'specMotor', valueKey: 'specMotorVal' },
  { labelKey: 'specPower', valueKey: 'specPowerVal' },
  { labelKey: 'specBuild', valueKey: 'specBuildVal' },
  { labelKey: 'specBackup', valueKey: 'specBackupVal' },
  { labelKey: 'specMaintenance', valueKey: 'specMaintenanceVal' },
]

function useContent(section) {
  const [data, setData] = useState({})
  useEffect(() => {
    getContent(section).then(setData).catch(() => {})
  }, [section])
  return data
}

export default function Product() {
  const { t } = useTranslation()
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState('description')
  const content = useContent('product')
  const homeContent = useContent('home')

  const features = [
    t('product.feature1'),
    t('product.feature2'),
    t('product.feature3'),
    t('product.feature4'),
    t('product.feature5'),
    t('product.feature6'),
  ]

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

  const productName = content['name'];
  const productDesc = content['description'];
  const videoHeading = content['video-heading'] || homeContent['video-heading'];
  const videoThumb = content['video-thumbnail'] || homeContent['video-thumbnail'];

  return (
    <main style={{ paddingTop: 64 }}>
      {/* Hero Image */}
      <div style={{ position: 'relative', width: '100%', height: 320, overflow: 'hidden' }}>
        <img
          src={images[activeImage].src}
          alt={t('product.imageAlt')}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      {/* Gallery */}
      <div style={{
        display: 'flex',
        gap: 12,
        padding: '16px',
        overflowX: 'auto',
      }} className="scrollbar-hide">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(i)}
            style={{
              flex: '0 0 160px',
              height: 110,
              borderRadius: 16,
              overflow: 'hidden',
              border: i === activeImage ? '3px solid #48663F' : '3px solid transparent',
              padding: 0,
              cursor: 'pointer',
              background: 'none',
              transition: 'border 0.2s',
            }}
          >
            <img
              src={img.src}
              alt={[t('product.galleryMain'), t('product.galleryView2'), t('product.galleryView3')][i]}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </button>
        ))}
      </div>

      {/* Product Info */}
      <div style={{ padding: '0 16px' }}>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 28,
          color: '#48663F',
          lineHeight: 1.2,
        }}>
          {productName ? (
            <EditableText contentId={productName.id} value={productName.value}>
              {productName.value}
            </EditableText>
          ) : (
            <>{t('product.heading1')}<br />{t('product.heading2')}</>
          )}
        </h1>

        <p style={{ marginTop: 12, fontSize: 14, color: '#2E2E2E', lineHeight: 1.6 }}>
          {productDesc ? (
            <EditableText contentId={productDesc.id} value={productDesc.value}>
              {productDesc.value}
            </EditableText>
          ) : (
            'Modha Pedal Operation Machine is designed to improve the comfort and efficiency of traditional handloom weaving.'
          )}
        </p>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
          <div style={{ color: '#FFC107', fontSize: 18, letterSpacing: 2 }}>★★★★★</div>
          <span style={{ fontSize: 13, color: '#999' }}>{t('product.rating')}</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ padding: '0 16px', marginTop: 28 }}>
        <div style={{ display: 'flex', gap: 0, borderBottom: '2px solid #e5e5e5' }}>
          <button
            onClick={() => setActiveTab('description')}
            style={{
              flex: 1,
              padding: '12px 0',
              fontSize: 15,
              fontWeight: 600,
              fontFamily: "'Poppins', sans-serif",
              color: activeTab === 'description' ? '#48663F' : '#999',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'description' ? '3px solid #48663F' : '3px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {t('product.tabDescription')}
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            style={{
              flex: 1,
              padding: '12px 0',
              fontSize: 15,
              fontWeight: 600,
              fontFamily: "'Poppins', sans-serif",
              color: activeTab === 'specs' ? '#48663F' : '#999',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'specs' ? '3px solid #48663F' : '3px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {t('product.tabSpecs')}
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ marginTop: 20 }}>
          {activeTab === 'description' ? (
            <div>
              <p style={{ fontSize: 14, color: '#2E2E2E', lineHeight: 1.7, marginBottom: 20 }}>
                {t('product.description')}
              </p>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 16, fontWeight: 600, color: '#48663F', marginBottom: 12 }}>{t('product.keyFeatures')}</h3>
              <ul style={{ paddingLeft: 20, fontSize: 14, color: '#2E2E2E', lineHeight: 2 }}>
                {features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {techSpecKeys.map((spec, i) => (
                <div key={i} style={{
                  background: '#fff',
                  border: '1px solid #48663F',
                  borderRadius: 12,
                  padding: 16,
                }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#48663F', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>{t('product.' + spec.labelKey)}</p>
                  <p style={{ fontSize: 13, color: '#2E2E2E', lineHeight: 1.4 }}>{t('product.' + spec.valueKey)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Installation Video */}
      <section style={{
        width: '100%',
        background: '#181818',
        padding: '32px 16px',
        marginTop: 36,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 22,
            color: '#fff',
            textAlign: 'center',
          }}>
            {videoHeading ? (
              <EditableText contentId={videoHeading.id} value={videoHeading.value}>
                {videoHeading.value}
              </EditableText>
            ) : (
              t('product.howToInstall')
            )}
          </h2>
          <p style={{
            fontSize: 14,
            color: '#999',
            textAlign: 'center',
            marginTop: 8,
            marginBottom: 20,
          }}>
            {t('product.watchToInstall')}
          </p>
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            borderRadius: 18,
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}>
            {videoThumb ? (
              <EditableImage
                contentId={videoThumb.id}
                src={videoThumb.value}
                alt={t('product.installVideoAlt')}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                wrapperStyle={{ position: 'absolute', inset: 0 }}
              />
            ) : (
              <img
                src="/images/Group 9.jpg"
                alt={t('product.installVideoAlt')}
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
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                border: 'none',
                cursor: 'pointer',
              }} aria-label={t('product.playVideoAria')}>
                <svg width="20" height="24" viewBox="0 0 24 24" fill="#48663F">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ width: '100%', background: '#fff', padding: '36px 16px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: 48, color: '#DDE8D3', lineHeight: 1, marginBottom: -10 }}>&ldquo;</div>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 22,
            color: '#48663F',
            marginBottom: 24,
          }}>
            {t('product.voicesFromTheLoom')}
          </h2>
          <div style={{
            display: 'flex',
            gap: 16,
            overflowX: 'auto',
            margin: '0 -16px',
            padding: '0 16px',
          }} className="scrollbar-hide">
            {testimonials.map((t, i) => (
              <div key={i} style={{
                flex: '0 0 300px',
                borderRadius: 18,
                background: '#fff',
                border: '1px solid #f0f0f0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                overflow: 'hidden',
              }}>
                <div style={{ position: 'relative', width: '100%', height: 160 }}>
                  <img src={t.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 16 }}>
                  <p style={{ fontSize: 14, color: '#2E2E2E', lineHeight: 1.6, marginBottom: 12 }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#48663F' }}>{t.author}</p>
                  <button style={{ marginTop: 8, fontSize: 12, fontWeight: 500, color: '#48663F', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Read more →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
