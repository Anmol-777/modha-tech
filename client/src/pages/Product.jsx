import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import EditableText from '../components/EditableText'
import EditableImage from '../components/EditableImage'
import { getContent } from '../api'

const images = [
  { src: '/images/image-14.jpg', key: 'gallery-image-1' },
  { src: '/images/image-15.jpg', key: 'gallery-image-2' },
  { src: '/images/image-18.jpg', key: 'gallery-image-3' },
]

const techSpecKeys = [
  { labelKey: 'specDimensions', valueKey: 'specDimensionsVal', contentKey: 'spec-dimensions' },
  { labelKey: 'specMotor', valueKey: 'specMotorVal', contentKey: 'spec-motor' },
  { labelKey: 'specPower', valueKey: 'specPowerVal', contentKey: 'spec-power' },
  { labelKey: 'specBuild', valueKey: 'specBuildVal', contentKey: 'spec-build' },
  { labelKey: 'specBackup', valueKey: 'specBackupVal', contentKey: 'spec-backup' },
  { labelKey: 'specMaintenance', valueKey: 'specMaintenanceVal', contentKey: 'spec-maintenance' },
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

  const productName = content['name'];
  const productDesc = content['description'];
  const videoHeading = content['video-heading'] || homeContent['video-heading'];
  const videoThumb = content['video-thumbnail'] || homeContent['video-thumbnail'];

  return (
    <main style={{ paddingTop: 64 }}>
      {/* Hero Image */}
      <div style={{ position: 'relative', width: '100%', height: 320, overflow: 'hidden' }}>
        <EditableImage
          section="product"
          contentKey={images[activeImage].key}
          src={images[activeImage].src}
          alt={t('product.imageAlt')}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          wrapperStyle={{ position: 'absolute', inset: 0 }}
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
            <EditableImage
              section="product"
              contentKey={img.key}
              src={img.src}
              alt={[t('product.galleryMain'), t('product.galleryView2'), t('product.galleryView3')][i]}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              wrapperStyle={{ width: '100%', height: '100%' }}
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
          <EditableText
            contentId={productName?.id}
            section="product"
            contentKey="name"
            value={productName?.value || `${t('product.heading1')} ${t('product.heading2')}`}
          >
            {productName?.value || `${t('product.heading1')} ${t('product.heading2')}`}
          </EditableText>
        </h1>

        <p style={{ marginTop: 12, fontSize: 14, color: '#2E2E2E', lineHeight: 1.6 }}>
          <EditableText
            contentId={productDesc?.id}
            section="product"
            contentKey="description"
            value={productDesc?.value || 'Modha Pedal Operation Machine is designed to improve the comfort and efficiency of traditional handloom weaving.'}
          >
            {productDesc?.value || 'Modha Pedal Operation Machine is designed to improve the comfort and efficiency of traditional handloom weaving.'}
          </EditableText>
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
            <EditableText
              section="product"
              contentKey="tab-description"
              value={t('product.tabDescription')}
              tag="span"
            >
              {t('product.tabDescription')}
            </EditableText>
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
            <EditableText
              section="product"
              contentKey="tab-specs"
              value={t('product.tabSpecs')}
              tag="span"
            >
              {t('product.tabSpecs')}
            </EditableText>
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ marginTop: 20 }}>
          {activeTab === 'description' ? (
            <div>
              <EditableText
                section="product"
                contentKey="description-content"
                value={t('product.description')}
                tag="p"
                style={{ fontSize: 14, color: '#2E2E2E', lineHeight: 1.7, marginBottom: 20 }}
              >
                {t('product.description')}
              </EditableText>
              <EditableText
                section="product"
                contentKey="key-features-heading"
                value={t('product.keyFeatures')}
                tag="h3"
                style={{ fontFamily: "'Poppins', sans-serif", fontSize: 16, fontWeight: 600, color: '#48663F', marginBottom: 12 }}
              >
                {t('product.keyFeatures')}
              </EditableText>
              <ul style={{ paddingLeft: 20, fontSize: 14, color: '#2E2E2E', lineHeight: 2 }}>
                {[1,2,3,4,5,6].map((n) => (
                  <li key={n}>
                    <EditableText
                      section="product"
                      contentKey={`feature-${n}`}
                      value={t(`product.feature${n}`)}
                      tag="span"
                    >
                      {t(`product.feature${n}`)}
                    </EditableText>
                  </li>
                ))}
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
                  <EditableText
                    section="product"
                    contentKey={`${spec.contentKey}-label`}
                    value={t(`product.${spec.labelKey}`)}
                    tag="p"
                    style={{ fontSize: 11, fontWeight: 600, color: '#48663F', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}
                  >
                    {t(`product.${spec.labelKey}`)}
                  </EditableText>
                  <EditableText
                    section="product"
                    contentKey={`${spec.contentKey}-value`}
                    value={t(`product.${spec.valueKey}`)}
                    tag="p"
                    style={{ fontSize: 13, color: '#2E2E2E', lineHeight: 1.4 }}
                  >
                    {t(`product.${spec.valueKey}`)}
                  </EditableText>
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
            <EditableText
              contentId={videoHeading?.id}
              section="product"
              contentKey="video-heading"
              value={videoHeading?.value || t('product.howToInstall')}
            >
              {videoHeading?.value || t('product.howToInstall')}
            </EditableText>
          </h2>
          <EditableText
            section="product"
            contentKey="watch-to-install"
            value={t('product.watchToInstall')}
            tag="p"
            style={{
              fontSize: 14,
              color: '#999',
              textAlign: 'center',
              marginTop: 8,
              marginBottom: 20,
            }}
          >
            {t('product.watchToInstall')}
          </EditableText>
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            borderRadius: 18,
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}>
            <EditableImage
              contentId={videoThumb?.id}
              section="product"
              contentKey="video-thumbnail"
              src={videoThumb?.value || "/images/Group 9.jpg"}
              alt={t('product.installVideoAlt')}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              wrapperStyle={{ position: 'absolute', inset: 0 }}
            />
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
            <EditableText
              section="product"
              contentKey="testimonials-heading"
              value={t('product.voicesFromTheLoom')}
            >
              {t('product.voicesFromTheLoom')}
            </EditableText>
          </h2>
          <div style={{
            display: 'flex',
            gap: 16,
            overflowX: 'auto',
            margin: '0 -16px',
            padding: '0 16px',
          }} className="scrollbar-hide">
            {[1,2].map((n) => (
              <div key={n} style={{
                flex: '0 0 300px',
                borderRadius: 18,
                background: '#fff',
                border: '1px solid #f0f0f0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                overflow: 'hidden',
              }}>
                <div style={{ position: 'relative', width: '100%', height: 160 }}>
                  <EditableImage
                    section="product"
                    contentKey={`testimonial-${n}-image`}
                    src={`/images/Property 1=Default${n === 2 ? '-1' : ''}.jpg`}
                    alt=""
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    wrapperStyle={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <div style={{ padding: 16 }}>
                  <p style={{ fontSize: 14, color: '#2E2E2E', lineHeight: 1.6, marginBottom: 12 }}>
                    &ldquo;<EditableText
                      section="product"
                      contentKey={`testimonial-${n}-quote`}
                      value={t(`home.testimonial${n}Quote`)}
                      tag="span"
                    >{t(`home.testimonial${n}Quote`)}</EditableText>&rdquo;
                  </p>
                  <EditableText
                    section="product"
                    contentKey={`testimonial-${n}-author`}
                    value={t(`home.testimonial${n}Author`)}
                    tag="p"
                    style={{ fontSize: 12, fontWeight: 600, color: '#48663F' }}
                  >
                    {t(`home.testimonial${n}Author`)}
                  </EditableText>
                  <EditableText
                    section="product"
                    contentKey="testimonial-read-more"
                    value="Read more →"
                    tag="button"
                    style={{ marginTop: 8, fontSize: 12, fontWeight: 500, color: '#48663F', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Read more →
                  </EditableText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
