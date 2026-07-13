import { useEffect } from 'react'

const timeline = [
  {
    img: '/images/question.jpg',
    title: 'The Question',
    text: 'It began with a simple question. In a small weaving village near Hindupuram, Sivakumar Modha sat beside a loom and quietly watched a weaver at work. When he asked if there was a better way, the weaver replied, "If it comes, our lives will change." That answer stayed with him.',
    side: 'left',
  },
  {
    img: '/images/sacrifice.jpg',
    title: 'The Sacrifice',
    text: 'Born to a school watchman and a school aide, he was expected to follow a stable path. Against his father\'s wishes, he walked away and stepped into the unfamiliar world of looms. With just ₹2000, he left home, promising his mother he would return only after he succeeded.',
    side: 'right',
  },
  {
    img: '/images/test.jpg',
    title: 'The Test',
    text: 'Then life tested him. He lost his father. He faced ridicule. Years passed without seeing his family, but he kept going, holding on to one belief — if he could solve this, he could change lives. The journey was long and uncertain. Many ideas failed.',
    side: 'left',
  },
  {
    img: '/images/discovery.jpg',
    title: 'Discovery',
    text: 'In Hyderabad, through years of persistence, he built an electronic jacquard system that removed the need for punch cards, reducing cost and giving weavers more freedom to create. But he knew the deeper problem still remained — the pain.',
    side: 'right',
  },
  {
    img: '/images/breakthrough.jpg',
    title: 'Breakthrough',
    text: 'After years of effort, the Modha Pedal Operating Machine came to life. A system that transfers the physical burden from the weaver\'s body to a motor, without changing the traditional loom or the essence of the craft.',
    side: 'left',
  },
  {
    img: '/images/impact.jpg',
    title: 'The Impact',
    text: 'Today, across India, thousands of looms carry his impact quietly. Elderly weavers returned to their looms. Women could continue their work without constant strain. Even physically challenged artisans found a way back to weaving.',
    side: 'right',
  },
]

function TimelinePath({ height }) {
  return (
    <svg
      style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        transform: 'translateX(-50%)',
        width: 20,
        height,
        overflow: 'visible',
      }}
      viewBox={`0 0 20 ${height}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#48663F" stopOpacity="0.3" />
          <stop offset="8%" stopColor="#48663F" stopOpacity="1" />
          <stop offset="92%" stopColor="#48663F" stopOpacity="1" />
          <stop offset="100%" stopColor="#48663F" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path
        d={`M 10 0 
            C 10 60, ${[26, -6][0]} 80, 10 160
            C 10 240, ${[-6, 26][0]} 280, 10 360
            C 10 440, ${[26, -6][0]} 480, 10 560
            C 10 640, ${[-6, 26][0]} 680, 10 760
            C 10 840, ${[26, -6][0]} 880, 10 ${height}`}
        fill="none"
        stroke="#48663F"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="10" cy="0" r="5" fill="#48663F" opacity="0.3" />
      <circle cx="10" cy={height} r="5" fill="#48663F" opacity="0.3" />
    </svg>
  )
}

export default function OurStory() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main style={{ paddingTop: 64 }}>
      {/* Hero Image */}
      <div style={{
        width: '100%',
        height: 330,
        overflow: 'hidden',
      }}>
        <img
          src="/images/new face.jpg"
          alt=""
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      </div>

      {/* Our Journey Heading */}
      <div style={{
        textAlign: 'center',
        padding: '36px 20px',
      }}>
        <p style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: 11,
          fontWeight: 600,
          color: '#999',
          textTransform: 'uppercase',
          letterSpacing: 3,
          marginBottom: 10,
        }}>
          our journey
        </p>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 32,
          fontWeight: 400,
          color: '#2E2E2E',
          lineHeight: 1.15,
        }}>
          A Map of<br />
          <span style={{ color: '#48663F' }}>purpose</span>
        </h1>
      </div>

      {/* Timeline */}
      <div style={{
        position: 'relative',
        padding: '0 20px 48px',
      }}>
        {/* The winding green path */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: 4,
          background: '#48663F',
          transform: 'translateX(-50%)',
          borderRadius: 2,
        }} />

        {timeline.map((item, i) => (
          <div
            key={i}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: i < timeline.length - 1 ? 40 : 0,
              flexDirection: item.side === 'left' ? 'row' : 'row-reverse',
            }}
          >
            {/* Content side */}
            <div style={{
              width: 'calc(50% - 28px)',
              textAlign: item.side === 'left' ? 'right' : 'left',
            }}>
              <h3 style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: '#48663F',
                marginBottom: 6,
              }}>
                {item.title}
              </h3>
              <p style={{
                fontSize: 12.5,
                color: '#666',
                lineHeight: 1.7,
              }}>
                {item.text}
              </p>
            </div>

            {/* Timeline dot with graphic */}
            <div style={{
              flex: '0 0 88px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 2,
            }}>
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                style={{
                  width: '88px',
                  height: '88px',
                  objectFit: 'contain',
                  display: 'block',
                  background: 'transparent',
                }}
              />
            </div>

            {/* Empty spacer for opposite side */}
            <div style={{ width: 'calc(50% - 28px)' }} />
          </div>
        ))}
      </div>

      {/* Guidance Force */}
      <section style={{
        width: '100%',
        background: '#181818',
        padding: '40px 20px',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginBottom: 20,
          }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              overflow: 'hidden',
              flexShrink: 0,
            }}>
              <img
                src="/images/Rectangle 5.jpg"
                alt=""
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 24,
              fontWeight: 400,
              color: '#fff',
            }}>
              The Guidance Force
            </h2>
          </div>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.8,
            marginBottom: 16,
          }}>
            Guiding him through this journey was the constant mentorship of Brigadier P. Ganesham, associated with Palle Srujana. More than a mentor, he became a guiding force and a source of unwavering belief.
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.8,
            marginBottom: 16,
          }}>
            Through his support and direction, Sivakumar found clarity in moments of doubt and strength in moments of struggle. The encouragement and ecosystem provided by Palle Srujana played a crucial role in shaping this journey.
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.8,
          }}>
            With continued support from organizations like National Innovation Foundation and Telangana Innovation Cell, the impact only grew stronger.
          </p>
        </div>
      </section>

      {/* Partner Logos */}
      <section style={{
        width: '100%',
        padding: '36px 20px',
        background: '#fff',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 32,
          maxWidth: 600,
          margin: '0 auto',
        }}>
          <img
            src="/images/nif.jpg"
            alt="National Innovation Foundation"
            loading="lazy"
            style={{ height: 40, width: 'auto', objectFit: 'contain' }}
          />
          <img
            src="/images/tgic.jpg"
            alt="Telangana Innovation Cell"
            loading="lazy"
            style={{ height: 40, width: 'auto', objectFit: 'contain' }}
          />
          <img
            src="/images/telugu.jpg"
            alt="Telugu"
            loading="lazy"
            style={{ height: 40, width: 'auto', objectFit: 'contain' }}
          />
        </div>
      </section>

      {/* Vision & Mission */}
      <section style={{ padding: '0 20px 36px' }}>
        <div style={{
          background: '#48663F',
          borderRadius: 24,
          padding: 24,
          color: '#fff',
        }}>
          {/* Vision */}
          <div style={{ marginBottom: 24 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 12,
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              </svg>
              <h3 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 20,
                fontWeight: 400,
              }}>
                The Vision
              </h3>
            </div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.9)',
              paddingLeft: 34,
            }}>
              To empower every handloom weaver by making weaving comfortable, sustainable, and accessible without losing its traditional essence.
            </p>
          </div>

          <div style={{
            height: 1,
            background: 'rgba(255,255,255,0.2)',
            marginBottom: 24,
          }} />

          {/* Mission */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 12,
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
              </svg>
              <h3 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 20,
                fontWeight: 400,
              }}>
                The Mission
              </h3>
            </div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.9)',
              paddingLeft: 34,
            }}>
              To design simple, affordable, and practical innovations that reduce physical strain, improve efficiency, and enhance the livelihoods of weavers across communities.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
