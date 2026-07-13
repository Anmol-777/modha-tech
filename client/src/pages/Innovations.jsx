import { useState, useEffect } from 'react'
import EditableText from '../components/EditableText'
import EditableImage from '../components/EditableImage'
import { getContent } from '../api'

const innovations = [
  {
    id: 1,
    title: 'Blue Machine',
    description: 'Modha Jacquard Machine is designed to improve the efficiency and precision of traditional handloom weaving. It upgrades the existing jacquard system with a digital mechanism, replacing manual punch cards with an easy-to-use USB-based design process.',
    status: 'Pending',
    image: '/images/blue machine.jpg',
  },
  {
    id: 2,
    title: 'Cycle Machine',
    description: 'Modha Pedal Operation Machine is designed to improve the comfort and efficiency of traditional handloom weaving. It upgrades the existing pedal system with a smoother and more responsive mechanism, reducing the physical effort required.',
    status: 'Patented',
    image: '/images/cycle machine.jpg',
  },
  {
    id: 3,
    title: 'Garbage Container',
    description: 'An innovative waste management solution designed for handloom communities, turning discarded materials into useful products while promoting sustainability and cleanliness in weaving clusters.',
    status: 'Patented',
    image: '/images/garbage container.jpg',
  },
  {
    id: 4,
    title: 'Raksha',
    description: 'A safety device designed to protect weavers from injuries during the weaving process. Raksha ensures that the weaver can work without fear of accidents, improving both safety and productivity.',
    status: 'Patented',
    image: '/images/raksha.jpg',
  },
]

const filters = ['All', 'Patented', 'Pending']

function useContent(section) {
  const [data, setData] = useState({})
  useEffect(() => {
    getContent(section).then(setData).catch(() => {})
  }, [section])
  return data
}

export default function Innovations() {
  const [activeFilter, setActiveFilter] = useState('All')
  const content = useContent('innovations')

  const heroHeading = content['hero-heading'];
  const heroImage = content['hero-image'];

  const filtered =
    activeFilter === 'All'
      ? innovations
      : innovations.filter((c) => c.status === activeFilter)

  return (
    <main style={{ paddingTop: 64 }}>
      {/* Hero */}
      <div style={{ position: 'relative', width: '100%', height: 320, overflow: 'hidden' }}>
        {heroImage ? (
          <EditableImage
            contentId={heroImage.id}
            src={heroImage.value}
            alt="Innovations"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            wrapperStyle={{ position: 'absolute', inset: 0 }}
          />
        ) : (
          <img
            src="/images/face.jpg"
            alt="Innovations"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        )}
        <div style={{
          position: 'absolute',
          bottom: 20,
          right: 16,
        }}>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 34,
            color: '#fff',
            textAlign: 'right',
            lineHeight: 1.15,
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}>
            {heroHeading ? (
              <EditableText contentId={heroHeading.id} value={heroHeading.value}>
                {heroHeading.value}
              </EditableText>
            ) : (
              <>
                Beyond The
                <br />
                Flagship
              </>
            )}
          </h1>
        </div>
      </div>

      {/* Filter Pills */}
      <div style={{ display: 'flex', gap: 10, padding: '20px 16px' }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              padding: '8px 20px',
              borderRadius: 999,
              border: `1.5px solid #48663F`,
              background: activeFilter === f ? '#48663F' : '#fff',
              color: activeFilter === f ? '#fff' : '#48663F',
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "'Poppins', sans-serif",
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div style={{ padding: '0 16px 32px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {filtered.map((card) => (
          <div
            key={card.id}
            style={{
              background: '#fff',
              borderRadius: 18,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              padding: 12,
              display: 'flex',
              gap: 12,
              animation: 'fadeIn 0.3s ease',
            }}
          >
            <div style={{
              flex: '0 0 140px',
              height: 130,
              borderRadius: 16,
              overflow: 'hidden',
            }}>
              <img
                src={card.image}
                alt={card.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#48663F',
                  marginBottom: 4,
                }}>
                  {card.title}
                </h3>
                <p style={{
                  fontSize: 12,
                  color: '#666',
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {card.description}
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: 999,
                  background: '#48663F',
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                }}>
                  {card.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  )
}
