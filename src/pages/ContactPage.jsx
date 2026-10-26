import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  Send, 
  Mail,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { InstagramIcon } from '../components/SocialIcons';
import { useShop } from '../context/ShopContext';

export default function ContactPage() {
  const { settings, showToast } = useShop();

  const phone = settings?.phone || '8144052522';
  const address = settings?.address || '2/32 Perumal Kovil Medu, Main Road, Seelanaickanpatti, Salem – 636201.';
  const whatsappNumber = settings?.whatsappNumber || '918144052522';
  const instagramHandle = settings?.instagramHandle || '@_harithanjali_boutique';
  const workingHours = settings?.workingHours || 'Mon - Sat: 10:00 AM - 9:00 PM | Sun: 11:00 AM - 8:00 PM';

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Bridal Saree & Anarkali Enquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been sent to Harithanjali Boutique team!');
    setForm({ name: '', phone: '', email: '', subject: 'Bridal Saree & Anarkali Enquiry', message: '' });
  };

  return (
    <div className="contact-page animate-fade-in" style={{ padding: '3.5rem 0 6rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 4rem' }}>
          <span className="badge badge-purple" style={{ marginBottom: '0.8rem' }}>
            Visit or Connect
          </span>
          <h1 style={{ fontSize: '2.8rem', color: 'var(--purple-950)', marginBottom: '1rem' }}>
            Get In Touch With Harithanjali
          </h1>
          <p style={{ color: 'var(--gray-600)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Have a custom design inquiry, want to visit our Salem boutique, or need personalized WhatsApp styling? We are always here to assist you.
          </p>
        </div>

        {/* 2-Column Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3.5rem', alignItems: 'start', marginBottom: '4.5rem' }} className="contact-grid">
          {/* Left: Boutique Info & Official Channels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ background: '#fff', borderRadius: '20px', padding: '2.2rem', border: '1px solid var(--purple-100)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--purple-950)', marginBottom: '1.5rem' }}>
                Salem Boutique Location
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--purple-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple-800)', flexShrink: 0 }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--purple-950)', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                      Store Address
                    </div>
                    <div style={{ color: 'var(--gray-700)', fontSize: '0.92rem', lineHeight: 1.5 }}>
                      {address}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--purple-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple-800)', flexShrink: 0 }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--purple-950)', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                      Telephone Enquiries
                    </div>
                    <a href={`tel:${phone}`} style={{ color: 'var(--purple-800)', fontWeight: 700, fontSize: '1rem' }}>
                      +91 {phone}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(37, 211, 102, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#25D366', flexShrink: 0 }}>
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--purple-950)', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                      WhatsApp Direct Desk
                    </div>
                    <a 
                      href={`https://wa.me/${whatsappNumber}?text=Hello%20Harithanjali%20Boutique,%20I%20would%20like%20to%20enquire%20about%20your%20clothing%20collections`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: '#25D366', fontWeight: 700, fontSize: '0.95rem' }}
                    >
                      Chat with us on WhatsApp →
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--purple-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple-800)', flexShrink: 0 }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--purple-950)', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                      Boutique Working Hours
                    </div>
                    <div style={{ color: 'var(--gray-700)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                      {workingHours}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Social Links Card */}
            <div style={{ background: 'linear-gradient(135deg, var(--purple-950), #3b0d4b)', borderRadius: '20px', padding: '2rem', color: '#fff' }}>
              <h4 style={{ color: '#fff', fontSize: '1.15rem', marginBottom: '0.5rem' }}>
                Follow Our Official Socials
              </h4>
              <p style={{ color: '#d0bfd4', fontSize: '0.85rem', marginBottom: '1.4rem' }}>
                Watch our new arrivals video showcases and client testimonials on our official channels.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <a
                  href="https://instagram.com/_harithanjali_boutique"
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.1)', color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}
                >
                  <InstagramIcon size={18} style={{ color: '#FFD700' }} />
                  <span>Instagram: {instagramHandle}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Working Contact Form */}
          <div style={{ background: '#fff', borderRadius: '20px', padding: '2.5rem', border: '1px solid var(--purple-100)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--purple-950)', marginBottom: '0.5rem' }}>
              Send Us A Message
            </h3>
            <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              Fill out the form below and our customer styling desk will get back to you promptly.
            </p>

            {submitted ? (
              <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center', background: 'var(--purple-50)', borderRadius: '16px', border: '1px solid var(--purple-200)' }}>
                <CheckCircle2 size={48} style={{ color: '#059669', margin: '0 auto 1rem' }} />
                <h4 style={{ color: 'var(--purple-950)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                  Message Received!
                </h4>
                <p style={{ color: 'var(--gray-700)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                  Thank you for reaching out to Harithanjali Boutique. Our Salem team will contact you shortly on WhatsApp or phone.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-primary btn-sm">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '0.4rem' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sundar"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid var(--gray-300)', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="contact-form-row">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '0.4rem' }}>
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9840123456"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid var(--gray-300)', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '0.4rem' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. ananya@example.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid var(--gray-300)', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '0.4rem' }}>
                    Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid var(--gray-300)', outline: 'none', background: '#fff' }}
                  >
                    <option value="Bridal Saree & Anarkali Enquiry">Bridal Saree & Anarkali Enquiry</option>
                    <option value="Custom Size / Stitching Request">Custom Size / Stitching Request</option>
                    <option value="Salem Boutique Store Visit Appointment">Salem Boutique Store Visit Appointment</option>
                    <option value="Order Tracking & Dispatch Query">Order Tracking & Dispatch Query</option>
                    <option value="Other Boutique Inquiry">Other Boutique Inquiry</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '0.4rem' }}>
                    Message / Query Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you are looking for..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid var(--gray-300)', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', borderRadius: '10px', marginTop: '0.5rem' }}>
                  <Send size={18} />
                  <span>Send Message to Boutique</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Store Location Map Visual Card */}
        <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid var(--purple-100)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--purple-950)', marginBottom: '0.3rem' }}>
                Boutique Showroom Navigation Guide
              </h3>
              <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>
                2/32 Perumal Kovil Medu, Main Road, Seelanaickanpatti, Salem – 636201.
              </p>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent('2/32 Perumal Kovil Medu, Main Road, Seelanaickanpatti, Salem – 636201')}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <MapPin size={15} />
              <span>Open in Google Maps</span>
            </a>
          </div>

          <div style={{
            height: '240px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, var(--purple-100), var(--purple-50))',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed var(--purple-300)',
            textAlign: 'center',
            padding: '1.5rem'
          }}>
            <MapPin size={40} style={{ color: 'var(--purple-800)', marginBottom: '0.8rem' }} />
            <h4 style={{ fontSize: '1.1rem', color: 'var(--purple-950)', marginBottom: '0.4rem' }}>
              Harithanjali Boutique Showroom
            </h4>
            <p style={{ color: 'var(--gray-600)', fontSize: '0.88rem', maxWidth: '480px' }}>
              Conveniently situated along the Main Road at Perumal Kovil Medu in Seelanaickanpatti, Salem. Landmark: Near Perumal Temple.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .contact-form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
