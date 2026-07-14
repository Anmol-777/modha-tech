import EditableImage from './EditableImage'

export default function WhatsApp() {
  return (
    <a
      href="https://wa.me/918143824009"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: '#48663F',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        transition: 'transform 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      aria-label="Contact on WhatsApp"
    >
      <EditableImage
        section="global"
        contentKey="whatsapp-icon"
        src="/images/Group 58.jpg"
        alt="WhatsApp"
        style={{ width: 30, height: 30, objectFit: 'contain' }}
        wrapperStyle={{ width: 30, height: 30 }}
      />
    </a>
  )
}
