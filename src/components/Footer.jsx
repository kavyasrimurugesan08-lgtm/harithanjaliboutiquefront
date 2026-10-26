import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import { InstagramIcon } from './SocialIcons';
import { useShop } from '../context/ShopContext';

export default function Footer() {
  const { settings, categories } = useShop();

  const phone = settings?.phone || '8144052522';
  const address = settings?.address || '2/32 Perumal Kovil Medu, Main Road, Seelanaickanpatti, Salem – 636201.';
  const whatsappNumber = settings?.whatsappNumber || '918144052522';
  const instagramHandle = settings?.instagramHandle || '@_harithanjali_boutique';

  return (
    <footer style={{ background: 'linear-gradient(180deg, #24052a 0%, #15021a 100%)', color: '#f3e8f5', paddingTop: '4.5rem', paddingBottom: '2.5rem', borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
      <div className="container">
        {/* Top Feature Highlights Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          paddingBottom: '3.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '3.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(212, 175, 55, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFD700', flexShrink: 0 }}>
              <Sparkles size={22} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.2rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Pure Artisanal Fabrics</h4>
              <p style={{ color: '#c4b5c7', fontSize: '0.82rem' }}>Handpicked silk, chanderi & organza</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(212, 175, 55, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFD700', flexShrink: 0 }}>
              <Truck size={22} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.2rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Pan-India Fast Dispatch</h4>
              <p style={{ color: '#c4b5c7', fontSize: '0.82rem' }}>Free express shipping over ₹1999</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(37, 211, 102, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#25D366', flexShrink: 0 }}>
              <MessageCircle size={22} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.2rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>WhatsApp Personal Styling</h4>
              <p style={{ color: '#c4b5c7', fontSize: '0.82rem' }}>Instant video view & custom sizing</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(212, 175, 55, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFD700', flexShrink: 0 }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.2rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>100% Authentic Quality</h4>
              <p style={{ color: '#c4b5c7', fontSize: '0.82rem' }}>Salem's trusted women's boutique</p>
            </div>
          </div>
        </div>

        {/* 4-Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3.5rem'
        }}>
          {/* Col 1: Brand story */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1.2rem' }}>
              <img 
                src="/logo.png" 
                alt="Harithanjali Boutique Logo" 
                style={{ 
                  height: '62px', 
                  width: '62px', 
                  objectFit: 'contain', 
                  borderRadius: '50%',
                  background: '#ffffff',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
                  flexShrink: 0
                }} 
              />
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', color: '#fff', fontSize: '1.5rem', letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0, lineHeight: 1.1 }}>
                  Harithanjali
                </h3>
                <p style={{ fontSize: '0.68rem', color: '#FFD700', letterSpacing: '0.22em', fontWeight: 600, textTransform: 'uppercase', margin: '0.2rem 0 0' }}>
                  Boutique • Salem
                </p>
              </div>
            </div>
            <p style={{ color: '#d0bfd4', fontSize: '0.88rem', lineHeight: '1.65', marginBottom: '1.4rem' }}>
              Trendy Collections for Every You. From royal Kanjivaram silks to chic contemporary silhouettes, Harithanjali Boutique brings festive elegance to every woman.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <a 
                href="https://instagram.com/_harithanjali_boutique" 
                target="_blank" 
                rel="noreferrer" 
                className="icon-btn" 
                style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
                title="Follow on Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a 
                href={`https://wa.me/${whatsappNumber}`} 
                target="_blank" 
                rel="noreferrer" 
                className="icon-btn" 
                style={{ background: 'rgba(37, 211, 102, 0.2)', color: '#25D366' }}
                title="Chat on WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '1.2rem', letterSpacing: '0.05em' }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.88rem' }}>
              <li>
                <Link to="/" style={{ color: '#d0bfd4' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#d0bfd4'}>
                  Home Storefront
                </Link>
              </li>
              <li>
                <Link to="/shop" style={{ color: '#d0bfd4' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#d0bfd4'}>
                  Complete Catalogue
                </Link>
              </li>
              <li>
                <Link to="/shop?new=true" style={{ color: '#d0bfd4' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#d0bfd4'}>
                  New Festive Arrivals
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: '#d0bfd4' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#d0bfd4'}>
                  Our Salem Boutique Story
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: '#d0bfd4' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#d0bfd4'}>
                  Contact & Store Visits
                </Link>
              </li>
              <li>
                <Link to="/wishlist" style={{ color: '#d0bfd4' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#d0bfd4'}>
                  My Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '1.2rem', letterSpacing: '0.05em' }}>
              Boutique Collections
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.88rem' }}>
              <li>
                <Link to="/shop?category=sarees" style={{ color: '#d0bfd4' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#d0bfd4'}>
                  Festive & Silk Sarees
                </Link>
              </li>
              <li>
                <Link to="/shop?category=anarkalis" style={{ color: '#d0bfd4' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#d0bfd4'}>
                  Royal Anarkalis & Gowns
                </Link>
              </li>
              <li>
                <Link to="/shop?category=kurtis" style={{ color: '#d0bfd4' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#d0bfd4'}>
                  Designer Daily & Festive Kurtis
                </Link>
              </li>
              <li>
                <Link to="/shop?category=coord-sets" style={{ color: '#d0bfd4' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#d0bfd4'}>
                  Trendy Ethnic Co-ord Sets
                </Link>
              </li>
              <li>
                <Link to="/shop?category=lehengas" style={{ color: '#d0bfd4' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#d0bfd4'}>
                  Bridal & Party Lehengas
                </Link>
              </li>
              <li>
                <Link to="/shop?category=dupattas" style={{ color: '#d0bfd4' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#d0bfd4'}>
                  Handcrafted Statement Dupattas
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Salem Store Info */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '1.2rem', letterSpacing: '0.05em' }}>
              Salem Boutique Store
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem' }}>
                <MapPin size={18} style={{ color: '#FFD700', flexShrink: 0, marginTop: 2 }} />
                <span style={{ color: '#d0bfd4', lineHeight: 1.5 }}>
                  {address}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <Phone size={18} style={{ color: '#FFD700', flexShrink: 0 }} />
                <a href={`tel:${phone}`} style={{ color: '#fff', fontWeight: 600 }}>
                  +91 {phone}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <InstagramIcon size={18} style={{ color: '#FFD700', flexShrink: 0 }} />
                <a href="https://instagram.com/_harithanjali_boutique" target="_blank" rel="noreferrer" style={{ color: '#d0bfd4' }}>
                  {instagramHandle}
                </a>
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=Hi%20Harithanjali%20Boutique,%20I%20would%20like%20to%20enquire%20about%20your%20collections`}
                  target="_blank" 
                  rel="noreferrer"
                  className="btn btn-whatsapp btn-sm"
                  style={{ width: '100%', borderRadius: '8px' }}
                >
                  <MessageCircle size={16} />
                  <span>Order / Enquire on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Admin Link */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.82rem',
          color: '#a393a7'
        }}>
          <div>
            © {new Date().getFullYear()} Harithanjali Boutique. All Rights Reserved. Crafted for Salem’s Fashion Lovers.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link to="/contact" style={{ color: '#a393a7' }}>Store Hours & Directions</Link>
            <span>•</span>
            <Link to="/admin" style={{ color: '#FFD700', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span>Admin Dashboard Portal</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
