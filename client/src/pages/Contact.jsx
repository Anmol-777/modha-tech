import { useState, useEffect } from 'react'
import EditableText from '../components/EditableText'
import EditableImage from '../components/EditableImage'
import { getContent, submitContactEnquiry } from '../api'

function useContent(section) {
  const [data, setData] = useState({})
  useEffect(() => {
    getContent(section).then(setData).catch(() => {})
  }, [section])
  return data
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', city: '', problem: '' })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const content = useContent('contact')

  const heading = content['heading'];
  const phone = content['phone'];

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Required'
    if (!form.city.trim()) errs.city = 'Required'
    if (!form.problem.trim()) errs.problem = 'Required'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setBusy(true)
    setSubmitError('')
    try {
      await submitContactEnquiry({
        name: form.name.trim(),
        email: '',
        phone: '',
        message: `City: ${form.city.trim()}\nProblem: ${form.problem.trim()}`,
      })
      setSubmitted(true)
    } catch (err) {
      setSubmitError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <main style={{ paddingTop: 64, background: '#FAFAF8', minHeight: '100vh' }}>
      <div style={{ padding: '20px' }}>
        {/* Contact Card */}
        <div style={{
          background: '#48663F',
          borderRadius: 24,
          padding: 28,
          color: '#fff',
        }}>
          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h1 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 32,
              fontWeight: 400,
              lineHeight: 1.15,
              marginBottom: 8,
            }}>
              <EditableText
                contentId={heading?.id}
                section="contact"
                contentKey="heading"
                value={heading?.value || 'How can we help ?'}
              >
                {heading?.value || 'How can we help ?'}
              </EditableText>
            </h1>
            <EditableText
              section="contact"
              contentKey="contact-subtext"
              value="Contact us"
              tag="p"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: 'rgba(255,255,255,0.8)',
                marginBottom: 4,
              }}
            >
              Contact us
            </EditableText>
            <EditableText
              section="contact"
              contentKey="address"
              value="Hyderabad, Telangana"
              tag="p"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              Hyderabad, Telangana
            </EditableText>
          </div>

          {/* Call Button */}
          <a
            href={`tel:${phone?.value || '+918143824009'}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              width: '100%',
              height: 52,
              borderRadius: 999,
              background: '#fff',
              fontFamily: "'Poppins', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              color: '#2E2E2E',
              marginBottom: 14,
              textDecoration: 'none',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#48663F">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.58 1 1 0 01-.25 1.01l-2.2 2.2z" />
            </svg>
            <EditableText
              contentId={phone?.id}
              section="contact"
              contentKey="phone"
              value={phone?.value || '+91 81438 24009'}
            >
              {phone?.value || '+91 81438 24009'}
            </EditableText>
          </a>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/918143824009"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              width: '100%',
              height: 52,
              borderRadius: 999,
              background: '#fff',
              fontFamily: "'Poppins', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              color: '#2E2E2E',
              marginBottom: 28,
              textDecoration: 'none',
            }}
          >
            <EditableImage
              section="contact"
              contentKey="whatsapp-icon"
              src="/images/chat.jpg"
              alt="WhatsApp"
              style={{ width: 20, height: 20, objectFit: 'contain', display: 'block' }}
              wrapperStyle={{ width: 20, height: 20, display: 'inline-block' }}
            />
            <EditableText
              section="contact"
              contentKey="whatsapp-text"
              value="Message on whatsapp"
              tag="span"
            >
              Message on whatsapp
            </EditableText>
          </a>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 28,
          }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.2)' }} />
            <EditableText
              section="contact"
              contentKey="divider-or"
              value="or"
              tag="span"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              or
            </EditableText>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.2)' }} />
          </div>

          {/* Enquiry Form Heading */}
          <EditableText
            section="contact"
            contentKey="enquiry-heading"
            value="Enquiry Form"
            tag="h2"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 20,
              fontWeight: 400,
              textAlign: 'center',
              marginBottom: 18,
            }}
          >
            Enquiry Form
          </EditableText>

          {submitted ? (
            <div style={{
              textAlign: 'center',
              padding: '24px 0',
            }}>
              <EditableText
                section="contact"
                contentKey="thank-you-text"
                value="Thank you! We'll contact you soon."
                tag="p"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  color: '#fff',
                  lineHeight: 1.6,
                }}
              >
                Thank you! We'll contact you soon.
              </EditableText>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div style={{ marginBottom: 18 }}>
                <EditableText
                  section="contact"
                  contentKey="form-name-placeholder"
                  value="Full Name"
                  tag="span"
                  style={{ display: 'none' }}
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  style={{
                    width: '100%',
                    height: 52,
                    borderRadius: 999,
                    border: 'none',
                    background: '#fff',
                    padding: '0 20px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: '#2E2E2E',
                    outline: 'none',
                  }}
                />
                {errors.name && (
                  <EditableText
                    section="contact"
                    contentKey="error-name"
                    value="Please enter your name"
                    tag="p"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      color: '#ffcccc',
                      marginTop: 4,
                      marginLeft: 16,
                    }}
                  >
                    Please enter your name
                  </EditableText>
                )}
              </div>

              {/* City */}
              <div style={{ marginBottom: 18 }}>
                <EditableText
                  section="contact"
                  contentKey="form-city-placeholder"
                  value="City"
                  tag="span"
                  style={{ display: 'none' }}
                />
                <input
                  type="text"
                  placeholder="City"
                  value={form.city}
                  onChange={e => setForm({ ...form, city: e.target.value })}
                  style={{
                    width: '100%',
                    height: 52,
                    borderRadius: 999,
                    border: 'none',
                    background: '#fff',
                    padding: '0 20px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: '#2E2E2E',
                    outline: 'none',
                  }}
                />
                {errors.city && (
                  <EditableText
                    section="contact"
                    contentKey="error-city"
                    value="Please enter your city"
                    tag="p"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      color: '#ffcccc',
                      marginTop: 4,
                      marginLeft: 16,
                    }}
                  >
                    Please enter your city
                  </EditableText>
                )}
              </div>

              {/* Problem */}
              <div style={{ marginBottom: 24 }}>
                <EditableText
                  section="contact"
                  contentKey="form-problem-placeholder"
                  value="Problem"
                  tag="span"
                  style={{ display: 'none' }}
                />
                <input
                  type="text"
                  placeholder="Problem"
                  value={form.problem}
                  onChange={e => setForm({ ...form, problem: e.target.value })}
                  style={{
                    width: '100%',
                    height: 52,
                    borderRadius: 999,
                    border: 'none',
                    background: '#fff',
                    padding: '0 20px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: '#2E2E2E',
                    outline: 'none',
                  }}
                />
                {errors.problem && (
                  <EditableText
                    section="contact"
                    contentKey="error-problem"
                    value="Please describe your problem"
                    tag="p"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      color: '#ffcccc',
                      marginTop: 4,
                      marginLeft: 16,
                    }}
                  >
                    Please describe your problem
                  </EditableText>
                )}
              </div>

              {/* Submit */}
              <div style={{ textAlign: 'center' }}>
                {submitError && (
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: '#ffcccc',
                    marginBottom: 12,
                  }}>
                    {submitError}
                  </p>
                )}
                <EditableText
                  section="contact"
                  contentKey="submit-text"
                  value="Submit"
                  tag="button"
                  type="submit"
                  disabled={busy}
                  style={{
                    width: 150,
                    height: 50,
                    borderRadius: 999,
                    border: 'none',
                    background: busy ? '#999' : '#171717',
                    color: '#fff',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: busy ? 'not-allowed' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {busy ? 'Submitting...' : 'Submit'}
                </EditableText>
              </div>
            </form>
          )}
          {/* Developer Credits */}
          <div style={{
            textAlign: 'center',
            marginTop: 28,
            fontSize: 12,
            color: 'rgba(255,255,255,0.5)',
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.8,
          }}>
            <a href="https://github.com/gouthamx67" target="_blank" rel="noopener noreferrer"
              style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
              Goutham
            </a>
            {' '}&{' '}
            <a href="https://github.com/Anmol-777" target="_blank" rel="noopener noreferrer"
              style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
              Anmol
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
