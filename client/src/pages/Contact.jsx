import { useState, useEffect } from 'react'
import EditableText from '../components/EditableText'
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
              {heading ? (
                <EditableText contentId={heading.id} value={heading.value} tag="span">
                  {heading.value}
                </EditableText>
              ) : (
                <>How can<br />we help ?</>
              )}
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: 'rgba(255,255,255,0.8)',
              marginBottom: 4,
            }}>
              Contact us
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: 'rgba(255,255,255,0.6)',
            }}>
              Hyderabad, Telangana
            </p>
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
            {phone ? (
              <EditableText contentId={phone.id} value={phone.value}>
                {phone.value}
              </EditableText>
            ) : (
              '+91 81438 24009'
            )}
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
            <img
              src="/images/chat.jpg"
              alt="WhatsApp"
              style={{ width: 20, height: 20, objectFit: 'contain', display: 'block' }}
            />
            Message on whatsapp
          </a>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 28,
          }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.2)' }} />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}>
              or
            </span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.2)' }} />
          </div>

          {/* Enquiry Form Heading */}
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 20,
            fontWeight: 400,
            textAlign: 'center',
            marginBottom: 18,
          }}>
            Enquiry Form
          </h2>

          {submitted ? (
            <div style={{
              textAlign: 'center',
              padding: '24px 0',
            }}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: '#fff',
                lineHeight: 1.6,
              }}>
                Thank you! We'll contact you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div style={{ marginBottom: 18 }}>
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
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    color: '#ffcccc',
                    marginTop: 4,
                    marginLeft: 16,
                  }}>
                    Please enter your name
                  </p>
                )}
              </div>

              {/* City */}
              <div style={{ marginBottom: 18 }}>
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
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    color: '#ffcccc',
                    marginTop: 4,
                    marginLeft: 16,
                  }}>
                    Please enter your city
                  </p>
                )}
              </div>

              {/* Problem */}
              <div style={{ marginBottom: 24 }}>
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
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    color: '#ffcccc',
                    marginTop: 4,
                    marginLeft: 16,
                  }}>
                    Please describe your problem
                  </p>
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
                <button
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
                  }}
                >
                  {busy ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
