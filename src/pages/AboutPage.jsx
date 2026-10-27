import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ShieldCheck, MapPin, ArrowRight, Award } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function AboutPage() {
  const { content, settings } = useShop();

  const about = content?.about || {
    title: 'Crafted with Passion, Rooted in Salem',
    lead: 'Harithanjali Boutique is more than just a fashion destination; it is a celebration of womanhood, style, and bespoke craftsmanship.',
    story: 'Founded with a vision to bring high-fashion ethnic aesthetics and contemporary trendy silhouettes under one roof in Salem, Harithanjali Boutique curates exclusive collections that empower women to embrace their unique elegance. From festive weddings to chic daily wear, each garment is handpicked for exceptional fabric quality, intricate needlework, and flattering cuts.',
    highlights: [
      'Handpicked Pure Silk & Artisanal Weaves',
      'Custom Sizing & Tailoring Support on WhatsApp',
      'Exclusive Limited-Edition Seasonal Releases',
      'Fast & Insured Pan-India Express Delivery'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85'
  };

  return (
    <div className="about-page animate-fade-in" style={{ padding: '3.5rem 0 6rem' }}>
      <div className="container">
        {/* Hero Section */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 4.5rem' }}>
          <span className="badge badge-purple" style={{ marginBottom: '0.8rem' }}>
            The Harithanjali Story
          </span>
          <h1 style={{ fontSize: '3rem', color: 'var(--purple-950)', marginBottom: '1.2rem', lineHeight: 1.2 }}>
            {about.title}
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--gray-700)', lineHeight: 1.7, fontStyle: 'italic' }}>
            "{about.lead}"
          </p>
        </div>

        {/* Editorial Split Section */}
        <div className="editorial-split-grid" style={{ marginBottom: '5.5rem' }}>
          <div style={{ position: 'relative' }}>
            <img
              src={about.imageUrl}
              alt="Harithanjali Boutique Salem"
              style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: '24px', boxShadow: 'var(--shadow-xl)' }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/why-choose-banner.jpg";
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              background: 'rgba(42, 5, 32, 0.92)',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              padding: '1.2rem 1.6rem',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: '#FFD700' }}>
                Est. Salem, Tamil Nadu
              </div>
              <div style={{ fontSize: '0.85rem', color: '#e7c5f5' }}>
                Trendy Collections for Every You
              </div>
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--purple-950)', marginBottom: '1.2rem' }}>
              Where Heritage Meets Contemporary Charm
            </h2>
            <p style={{ color: 'var(--gray-700)', fontSize: '1.02rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              {about.story}
            </p>
            <p style={{ color: 'var(--gray-600)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Every woman deserves to feel royal, confident, and utterly comfortable in what she wears. Whether you are stepping into our Salem boutique at Perumal Kovil Medu or ordering from across the country, we treat each client with personalized styling attention and unconditional warmth.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
              {about.highlights?.map((hl, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'var(--purple-50)', padding: '0.8rem 1rem', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 600, color: 'var(--purple-950)' }}>
                  <Sparkles size={16} style={{ color: 'var(--purple-700)', flexShrink: 0 }} />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            <Link to="/shop" className="btn btn-primary btn-lg">
              <span>Explore Our Curated Catalog</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="about-pillars-grid" style={{
          background: 'linear-gradient(135deg, var(--purple-950), #350b41)',
          borderRadius: '24px',
          color: '#fff',
          boxShadow: 'var(--shadow-xl)'
        }}>
          <div>
            <Award size={36} style={{ color: '#FFD700', marginBottom: '1rem' }} />
            <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '0.6rem' }}>
              Authentic Weaving Tradition
            </h3>
            <p style={{ color: '#d0bfd4', fontSize: '0.9rem', lineHeight: 1.65 }}>
              We partner directly with traditional silk weavers and master artisans from Kanchipuram, Varanasi, and Chanderi to deliver genuine fabrics with exquisite needlework.
            </p>
          </div>

          <div>
            <Heart size={36} style={{ color: '#FFD700', marginBottom: '1rem' }} />
            <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '0.6rem' }}>
              Personalized Boutique Touch
            </h3>
            <p style={{ color: '#d0bfd4', fontSize: '0.9rem', lineHeight: 1.65 }}>
              No automated chatbots. Real boutique stylists help you choose your size, coordinate matching accessories, and verify blouse custom cuts over WhatsApp.
            </p>
          </div>

          <div>
            <MapPin size={36} style={{ color: '#FFD700', marginBottom: '1rem' }} />
            <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '0.6rem' }}>
              Proudly Salem Local
            </h3>
            <p style={{ color: '#d0bfd4', fontSize: '0.9rem', lineHeight: 1.65 }}>
              Deeply rooted in Salem's textile culture. Come visit us in person at Seelanaickanpatti, Salem to experience the fabrics firsthand in our welcoming showroom.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

