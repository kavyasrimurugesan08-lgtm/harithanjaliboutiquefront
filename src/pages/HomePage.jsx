import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  ShoppingBag, 
  Heart, 
  Eye, 
  Star, 
  CheckCircle, 
  MessageCircle, 
  Send,
  MapPin,
  ChevronRight,
  Shield,
  Clock
} from 'lucide-react';
import { InstagramIcon } from '../components/SocialIcons';
import { useShop } from '../context/ShopContext';

export default function HomePage() {
  const { 
    products, 
    categories, 
    content, 
    settings, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct,
    showToast 
  } = useShop();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const navigate = useNavigate();

  // Content fallbacks
  const hero = content?.hero || {
    badge: 'ROYAL HERITAGE & MODERN LUXURY',
    title: 'Trendy Collections for Every You',
    subtitle: 'Experience Salem’s finest destination for handcrafted sarees, royal anarkalis, designer kurtis, and contemporary ethnic fusion.',
    ctaText: 'Explore Collection',
    ctaLink: '/shop',
    secondaryCtaText: 'New Arrivals',
    secondaryCtaLink: '/shop?new=true',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80'
  };

  const promoBanner = content?.promoBanner || {
    tag: 'EXCLUSIVE SALEM BOUTIQUE OFFER',
    title: 'Celebrations In Regal Purple & Gold',
    subtitle: 'Indulge in pure mulberry silks, intricate zardozi embroidery, and handcrafted designer co-ords tailored to your perfection.',
    discountCode: 'HARITHA10',
    discountText: 'Use code HARITHA10 for 10% off your first festive purchase',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
  };

  const newArrivals = products.filter(p => p.isNewArrival || p.isFeatured).slice(0, 8);
  const bestSellers = products.slice(0, 4);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      showToast('Thank you for subscribing to Harithanjali VIP Club!');
      setNewsletterEmail('');
    }
  };

  return (
    <div className="homepage animate-fade-in">
      {/* 1. HERO SECTION - Editorial High Fashion */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #2a0520 0%, #4e0d3c 45%, #380829 100%)',
        color: '#fff',
        overflow: 'hidden',
        padding: '4.5rem 0 5.5rem'
      }}>
        {/* Decorative background ambient glows from Logo palette */}
        <div style={{
          position: 'absolute',
          top: '-15%',
          right: '5%',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 196, 179, 0.3) 0%, rgba(0, 0, 0, 0) 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200, 157, 70, 0.25) 0%, rgba(0, 0, 0, 0) 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '35%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(223, 189, 214, 0.2) 0%, rgba(0, 0, 0, 0) 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '3.5rem'
          }}>
            {/* Left: Text & CTAs */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                color: '#FFD700',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '1.4rem'
              }}>
                <Sparkles size={14} />
                <span>{hero.badge}</span>
              </div>

              <h1 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                color: '#fff',
                marginBottom: '1.4rem',
                textTransform: 'capitalize'
              }}>
                {hero.title}
              </h1>

              <p style={{
                fontSize: '1.1rem',
                color: '#e2d3e7',
                lineHeight: 1.7,
                maxWidth: '520px',
                marginBottom: '2.4rem'
              }}>
                {hero.subtitle}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <Link to={hero.ctaLink || '/shop'} className="btn btn-gold btn-lg">
                  <span>{hero.ctaText || 'Shop Collection'}</span>
                  <ArrowRight size={18} />
                </Link>

                <Link 
                  to={hero.secondaryCtaLink || '/shop?new=true'} 
                  className="btn btn-secondary btn-lg"
                  style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255, 255, 255, 0.4)' }}
                >
                  <span>{hero.secondaryCtaText || 'Explore New Arrivals'}</span>
                </Link>
              </div>

              {/* Quick credibility bullet tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.8rem', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f3e8f5', fontSize: '0.85rem' }}>
                  <CheckCircle size={17} style={{ color: '#FFD700' }} />
                  <span>Salem Boutique Store</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f3e8f5', fontSize: '0.85rem' }}>
                  <CheckCircle size={17} style={{ color: '#FFD700' }} />
                  <span>Custom Tailoring Support</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f3e8f5', fontSize: '0.85rem' }}>
                  <CheckCircle size={17} style={{ color: '#FFD700' }} />
                  <span>WhatsApp Video Shopping</span>
                </div>
              </div>
            </div>

            {/* Right: Fashion Editorial Visual Card */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
                border: '4px solid rgba(255, 255, 255, 0.12)'
              }}>
                <img 
                  src={hero.imageUrl} 
                  alt="Harithanjali Boutique Collection"
                  style={{ width: '100%', height: '540px', objectFit: 'cover' }}
                />

                {/* Floating Tag Overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                  padding: '1.2rem',
                  borderRadius: '16px',
                  background: 'rgba(27, 4, 34, 0.85)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#FFD700', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                      Festive Premiere 2026
                    </span>
                    <h4 style={{ color: '#fff', fontSize: '1.1rem', margin: '0.1rem 0' }}>
                      Royal Amethyst Weaves
                    </h4>
                    <p style={{ color: '#d0bfd4', fontSize: '0.8rem', margin: 0 }}>
                      Handwoven Silks & Tailored Ensembles
                    </p>
                  </div>
                  <Link 
                    to="/shop?category=sarees" 
                    className="icon-btn" 
                    style={{ background: '#FFD700', color: '#2c0836' }}
                    title="View Collection"
                  >
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES SECTION */}
      <section style={{ padding: '5rem 0', background: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem' }}>
            <span className="badge badge-purple" style={{ marginBottom: '0.8rem' }}>
              Curated Wardrobe
            </span>
            <h2 style={{ fontSize: '2.4rem', color: 'var(--purple-950)', marginBottom: '0.8rem' }}>
              Explore By Category
            </h2>
            <p style={{ color: 'var(--gray-600)', fontSize: '1rem' }}>
              From timeless wedding silks to playful contemporary kurtis, find the perfect design crafted for every celebration.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.slug}`}
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  paddingTop: '135%',
                  display: 'block',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
                }}
                className="category-card"
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                />
                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 40%, rgba(44, 8, 54, 0.88) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.4rem 1.1rem',
                  color: '#fff'
                }}>
                  <h3 style={{ color: '#fff', fontSize: '1.15rem', marginBottom: '0.3rem', fontFamily: 'var(--font-serif)' }}>
                    {cat.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: '#f3d778', fontWeight: 600 }}>
                    <span>Shop Now</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS & TRENDING DESIGNS */}
      <section style={{ padding: '5rem 0', background: 'var(--purple-50)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', gap: '1rem' }}>
            <div>
              <span className="badge badge-purple" style={{ marginBottom: '0.6rem' }}>
                Fresh From The Loom
              </span>
              <h2 style={{ fontSize: '2.4rem', color: 'var(--purple-950)' }}>
                New Festive Arrivals
              </h2>
              <p style={{ color: 'var(--gray-600)', fontSize: '0.98rem' }}>
                Handpicked boutique releases designed to make heads turn.
              </p>
            </div>
            <Link to="/shop?new=true" className="btn btn-secondary">
              <span>View All New Arrivals</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Product Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.8rem'
          }}>
            {newArrivals.map(product => {
              const isSaved = isInWishlist(product.id);
              return (
                <div key={product.id} className="product-card">
                  <div className="product-img-wrapper">
                    <img 
                      src={product.images?.[0]} 
                      alt={product.name} 
                      className="product-img"
                    />

                    {/* Tags */}
                    <div className="product-tags">
                      {product.isNewArrival && (
                        <span className="badge badge-new">New</span>
                      )}
                      {product.salePrice && (
                        <span className="badge badge-sale">
                          {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      className={`product-wishlist-btn ${isSaved ? 'active' : ''}`}
                      onClick={() => toggleWishlist(product)}
                      aria-label="Save to Wishlist"
                    >
                      <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
                    </button>

                    {/* Quick View Button */}
                    <button
                      type="button"
                      className="product-quick-btn"
                      onClick={() => setQuickViewProduct(product)}
                    >
                      Quick View & Select
                    </button>
                  </div>

                  <div className="product-info">
                    <span className="product-category">{product.category}</span>
                    <Link to={`/product/${product.id}`} className="product-title" title={product.name}>
                      {product.name}
                    </Link>

                    {/* Sizes preview */}
                    <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                      {product.sizes?.slice(0, 4).map(sz => (
                        <span key={sz} style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', background: 'var(--gray-100)', borderRadius: '4px', color: 'var(--gray-700)' }}>
                          {sz}
                        </span>
                      ))}
                    </div>

                    <div className="product-pricing">
                      <span className="current-price">₹{product.salePrice || product.price}</span>
                      {product.salePrice && (
                        <span className="original-price">₹{product.price}</span>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                      <button
                        onClick={() => addToCart(product, product.sizes?.[0], product.colors?.[0], 1)}
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1, borderRadius: '6px' }}
                      >
                        <ShoppingBag size={15} />
                        <span>Add To Cart</span>
                      </button>
                      <Link
                        to={`/product/${product.id}`}
                        className="icon-btn"
                        style={{ width: 36, height: 36, borderRadius: '6px' }}
                        title="View Details"
                      >
                        <ChevronRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CURATED EDITORIAL PROMO BANNER */}
      <section style={{ padding: '4.5rem 0', background: 'var(--color-white)' }}>
        <div className="container">
          <div style={{
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #32073e 0%, #1e0326 100%)',
            color: '#fff',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xl)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center'
          }}>
            {/* Promo text */}
            <div style={{ padding: '3.5rem 3rem' }}>
              <span style={{ display: 'inline-block', fontSize: '0.78rem', color: '#FFD700', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                {promoBanner.tag}
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#fff', marginBottom: '1rem', lineHeight: 1.2 }}>
                {promoBanner.title}
              </h2>
              <p style={{ color: '#dfd0e4', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.8rem' }}>
                {promoBanner.subtitle}
              </p>

              {promoBanner.discountCode && (
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px dashed #FFD700',
                  marginBottom: '2rem'
                }}>
                  <Sparkles size={18} style={{ color: '#FFD700' }} />
                  <span style={{ fontSize: '0.9rem', color: '#fff' }}>
                    Code: <strong style={{ color: '#FFD700', letterSpacing: '0.08em' }}>{promoBanner.discountCode}</strong> (10% OFF)
                  </span>
                </div>
              )}

              <div>
                <Link to="/shop" className="btn btn-gold">
                  <span>Shop Festive Sale</span>
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>

            {/* Promo Image */}
            <div style={{ height: '100%', minHeight: '380px', position: 'relative' }}>
              <img
                src={promoBanner.imageUrl}
                alt="Boutique Promo"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. SALEM BOUTIQUE SPOTLIGHT & CRAFTSMANSHIP */}
      <section style={{ padding: '5rem 0', background: 'var(--purple-50)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '3.5rem'
          }}>
            <div style={{ position: 'relative' }}>
              <img
                src="/why-choose-banner.jpg"
                onError={(e) => {
                  e.currentTarget.src = "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/2026/JULY/18/Mgulr2uY_5c6ac82c469d4fe1a6796a62ae2c2b81.jpg";
                }}
                alt="Harithanjali Salem Boutique"
                style={{ borderRadius: '20px', width: '100%', height: '480px', objectFit: 'cover', boxShadow: 'var(--shadow-lg)' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '20px',
                background: '#fff',
                padding: '1.2rem 1.5rem',
                borderRadius: '16px',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--purple-100)',
                maxWidth: '280px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#e5be3a', marginBottom: '0.2rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--purple-950)' }}>
                  Salem's Beloved Boutique
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--gray-600)' }}>
                  Trusted by 5,000+ happy women for authentic bridal & festive wear.
                </div>
              </div>
            </div>

            <div>
              <span className="badge badge-purple" style={{ marginBottom: '0.8rem' }}>
                Salem's Fashion Landmark
              </span>
              <h2 style={{ fontSize: '2.4rem', color: 'var(--purple-950)', marginBottom: '1.2rem' }}>
                Why Choose Harithanjali Boutique?
              </h2>
              <p style={{ color: 'var(--gray-600)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                Located at Seelanaickanpatti, Salem, Harithanjali Boutique was born out of a desire to provide women with handpicked ethnic wear that reflects opulence, authenticity, and individuality without compromise.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--purple-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple-800)', flexShrink: 0 }}>
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--purple-950)', marginBottom: '0.2rem' }}>Uncompromised Weave Integrity</h4>
                    <p style={{ color: 'var(--gray-600)', fontSize: '0.88rem' }}>Pure mulberry silk, certified zari, and tested georgettes sourced directly from master artisanal clusters.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--purple-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple-800)', flexShrink: 0 }}>
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--purple-950)', marginBottom: '0.2rem' }}>Direct WhatsApp Styling Assistance</h4>
                    <p style={{ color: 'var(--gray-600)', fontSize: '0.88rem' }}>Need matching blouse guidance or live video look? Chat directly with our Salem styling desk at +91 8144052522.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--purple-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple-800)', flexShrink: 0 }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--purple-950)', marginBottom: '0.2rem' }}>Visit Our Salem Storefront</h4>
                    <p style={{ color: 'var(--gray-600)', fontSize: '0.88rem' }}>2/32 Perumal Kovil Medu, Main Road, Seelanaickanpatti, Salem – 636201.</p>
                  </div>
                </div>
              </div>

              <Link to="/about" className="btn btn-primary">
                <span>Read Our Full Story</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VERIFIED CUSTOMER REVIEWS */}
      <section style={{ padding: '5rem 0', background: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}>
            <span className="badge badge-gold" style={{ marginBottom: '0.6rem' }}>
              Client Love
            </span>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--purple-950)', marginBottom: '0.6rem' }}>
              What Our Customers Say
            </h2>
            <p style={{ color: 'var(--gray-600)', fontSize: '0.95rem' }}>
              Real experiences from fashion lovers across Salem and all over India.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.8rem'
          }}>
            {[
              {
                name: 'Sangeetha Murugesan',
                city: 'Salem',
                rating: 5,
                review: 'I bought my reception Kanjivaram silk saree from Harithanjali. The purple and gold contrast was breathtaking. The boutique staff in Seelanaickanpatti helped me choose the exact shade I had in mind!',
                item: 'Royal Amethyst Kanjivaram Saree'
              },
              {
                name: 'Dr. Archana Nair',
                city: 'Bengaluru',
                rating: 5,
                review: 'Ordered via WhatsApp with delivery to Bengaluru. The lavender georgette anarkali fit me like a dream. High-quality fabric and very polite customer service. Will definitely order again.',
                item: 'Lavender Bloom Anarkali'
              },
              {
                name: 'Deepika Ramanathan',
                city: 'Salem',
                rating: 5,
                review: 'Hands down the best boutique in Salem for trendy co-ord sets and kurtis. You will not find these unique designs in ordinary department stores. Highly recommended!',
                item: 'Cobalt Silk Co-ord Ensemble'
              }
            ].map((t, idx) => (
              <div
                key={idx}
                style={{
                  padding: '2rem',
                  borderRadius: '16px',
                  background: 'var(--purple-50)',
                  border: '1px solid var(--purple-100)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ display: 'flex', color: '#e5be3a', marginBottom: '1rem', gap: 2 }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p style={{ color: 'var(--gray-700)', fontSize: '0.92rem', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.4rem', flex: 1 }}>
                  "{t.review}"
                </p>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--purple-950)', fontSize: '0.95rem' }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--purple-700)', fontWeight: 600 }}>
                    {t.city} • Verified Buyer ({t.item})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. INSTAGRAM LOOKBOOK SHOWCASE */}
      <section style={{ padding: '4.5rem 0', background: 'var(--purple-950)', color: '#fff' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FFD700', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <InstagramIcon size={17} />
                <span>@_harithanjali_boutique</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#fff', marginTop: '0.3rem' }}>
                Follow Our Lookbook on Instagram
              </h2>
            </div>
            <a
              href="https://instagram.com/_harithanjali_boutique"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
              style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255, 255, 255, 0.4)' }}
            >
              <span>Follow Us</span>
              <ArrowRight size={16} />
            </a>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem'
          }}>
            {[
              '/lookbook/lookbook_1.jpg',
              '/lookbook/lookbook_2.jpg',
              '/lookbook/lookbook_3.jpg',
              '/lookbook/lookbook_4.jpg',
              '/lookbook/lookbook_5.jpg',
              '/lookbook/lookbook_6.jpg'
            ].map((imgUrl, i) => (
              <a
                key={i}
                href="https://instagram.com/_harithanjali_boutique"
                target="_blank"
                rel="noreferrer"
                style={{
                  position: 'relative',
                  paddingTop: '100%',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  display: 'block'
                }}
              >
                <img
                  src={imgUrl}
                  alt={`Harithanjali lookbook ${i + 1}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                >
                  <InstagramIcon size={28} style={{ color: '#fff' }} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 8. VIP CLUB / NEWSLETTER SUBSCRIPTION */}
      <section style={{ padding: '4.5rem 0', background: 'var(--purple-100)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <Sparkles size={32} style={{ color: 'var(--purple-700)', margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '2.2rem', color: 'var(--purple-950)', marginBottom: '0.8rem' }}>
            Join The Harithanjali VIP Circle
          </h2>
          <p style={{ color: 'var(--gray-700)', fontSize: '0.98rem', marginBottom: '2rem' }}>
            Receive exclusive early access to festive launch collections, seasonal styling edits, and boutique discounts directly to your inbox.
          </p>

          <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '0.6rem', maxWidth: '480px', margin: '0 auto' }}>
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={e => setNewsletterEmail(e.target.value)}
              style={{
                flex: 1,
                padding: '0.8rem 1.2rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--purple-200)',
                outline: 'none',
                background: '#fff'
              }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem 1.8rem' }}>
              <Send size={16} />
              <span>Subscribe</span>
            </button>
          </form>

          {newsletterSuccess && (
            <p style={{ marginTop: '1rem', color: '#059669', fontWeight: 600, fontSize: '0.9rem' }}>
              ✓ You are now subscribed to Harithanjali Boutique VIP Club!
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
