import React, { useState, useEffect, useCallback } from 'react';
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
  ChevronLeft,
  ChevronRight,
  Shield,
  Clock
} from 'lucide-react';
import { InstagramIcon } from '../components/SocialIcons';
import { useShop } from '../context/ShopContext';

const HERO_GALLERY_ITEMS = [
  {
    id: 'hg_1',
    image: '/hero/hero_1.jpg',
    title: 'Royal Purple & Magenta Kanjivaram Silk',
    category: 'Bridal Sarees',
    link: '/shop?category=sarees'
  },
  {
    id: 'hg_2',
    image: '/hero/hero_2.jpg',
    title: 'Emerald & Peacock Teal Zari Saree',
    category: 'Festive Sarees',
    link: '/shop?category=sarees'
  },
  {
    id: 'hg_3',
    image: '/hero/hero_5.jpg',
    title: 'Ruby Crimson Zardozi Royal Anarkali',
    category: 'Royal Anarkalis',
    link: '/shop?category=anarkalis'
  },
  {
    id: 'hg_4',
    image: '/lookbook/test_1.jpg',
    title: 'Sunset Korvai Bridal Silk Saree',
    category: 'Kanchipuram Silks',
    link: '/shop?category=sarees'
  },
  {
    id: 'hg_5',
    image: '/lookbook/dress_6.jpg',
    title: 'Rose Pink Banarasi Brocade Saree',
    category: 'Banarasi Weaves',
    link: '/shop?category=sarees'
  },
  {
    id: 'hg_6',
    image: '/lookbook/lookbook_1.jpg',
    title: 'Deep Plum Mirror-Work Anarkali',
    category: 'Designer Anarkalis',
    link: '/shop?category=anarkalis'
  },
  {
    id: 'hg_7',
    image: '/lookbook/lookbook_2.jpg',
    title: 'Lavender & Royal Blue Zari Anarkali',
    category: 'Festive Suits',
    link: '/shop?category=anarkalis'
  },
  {
    id: 'hg_8',
    image: '/lookbook/dress_5.jpg',
    title: 'Blush Pink & Gold Tissue Lehenga',
    category: 'Bridal Lehengas',
    link: '/shop?category=lehengas'
  },
  {
    id: 'hg_9',
    image: '/hero/hero_4.jpg',
    title: 'Deep Maroon Temple Zari Silk Saree',
    category: 'Heritage Silks',
    link: '/shop?category=sarees'
  },
  {
    id: 'hg_10',
    image: '/hero/hero_3.jpg',
    title: 'Rose Gold & Blush Brocade Anarkali',
    category: 'Royal Anarkalis',
    link: '/shop?category=anarkalis'
  }
];

function CornerBotanicalSvg({ className = '', style }) {
  return (
    <svg
      width="130"
      height="150"
      viewBox="0 0 130 150"
      fill="none"
      className={`hero-corner-ornament ${className}`}
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        opacity: 0.36,
        zIndex: 1,
        ...style
      }}
    >
      {/* Main curved stem */}
      <path
        d="M4 146C18 110 42 68 86 24M86 24C74 20 68 10 74 4C82 2 90 12 86 24ZM86 24C98 18 110 22 114 30C106 36 94 32 86 24Z"
        stroke="#c89d46"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left leaf pair 1 */}
      <path
        d="M24 106C14 92 14 74 24 64C32 76 32 94 24 106Z"
        stroke="#c89d46"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right leaf pair 1 */}
      <path
        d="M34 94C50 92 66 100 72 112C58 114 42 106 34 94Z"
        stroke="#c89d46"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left leaf pair 2 */}
      <path
        d="M48 68C38 54 40 36 50 28C58 40 56 56 48 68Z"
        stroke="#c89d46"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right leaf pair 2 */}
      <path
        d="M58 56C74 54 90 60 96 72C82 74 66 68 58 56Z"
        stroke="#c89d46"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Delicate secondary sprig */}
      <path
        d="M12 132C34 126 56 128 74 138"
        stroke="#c89d46"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <circle cx="98" cy="14" r="2" fill="#c89d46" />
      <circle cx="62" cy="16" r="1.5" fill="#c89d46" />
      <circle cx="106" cy="44" r="1.5" fill="#c89d46" />
    </svg>
  );
}

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
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const navigate = useNavigate();

  const totalSlides = HERO_GALLERY_ITEMS.length;

  const nextSlide = useCallback(() => {
    setActiveSlide(prev => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setActiveSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX !== null && e.changedTouches?.[0]) {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 36) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
    }
    setTouchStartX(null);
    setIsPaused(false);
  };

  // Continuous automatic horizontal scrolling animation
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 2600);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Content fallbacks
  const hero = content?.hero || {
    badge: 'ROYAL HERITAGE & MODERN LUXURY',
    title: 'Trendy Collections for Every You',
    subtitle: 'Experience Salem’s finest destination for handcrafted sarees, royal anarkalis, designer kurtis, and contemporary ethnic fusion.',
    ctaText: 'Explore Collection',
    ctaLink: '/shop',
    secondaryCtaText: 'New Arrivals',
    secondaryCtaLink: '/shop?new=true',
    imageUrl: '/hero/hero_1.jpg'
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
      {/* 1. HERO SECTION - Horizontal Animated Editorial Gallery */}
      <section 
        className="hero-editorial-section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* 4 Corner Gold Botanical Ornaments */}
        <CornerBotanicalSvg className="corner-tl" style={{ top: '-8px', left: '-6px', transform: 'scaleY(-1)' }} />
        <CornerBotanicalSvg className="corner-bl" style={{ bottom: '86px', left: '-6px' }} />
        <CornerBotanicalSvg className="corner-tr" style={{ top: '-8px', right: '-6px', transform: 'scale(-1, -1)' }} />
        <CornerBotanicalSvg className="corner-br" style={{ bottom: '86px', right: '-6px', transform: 'scaleX(-1)' }} />

        {/* Ambient Warm Luxury Glows */}
        <div className="hero-ambient-glow-1" />
        <div className="hero-ambient-glow-2" />

        {/* Main Horizontal Stage */}
        <div className="hero-stage">
          {/* Editorial Text Content Block (Left on Desktop, Centered Top on Phone) */}
          <div className="hero-editorial-content">
            <div className="hero-royal-badge">
              {/* Gold floral lotus emblem */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <path
                  d="M12 3C9.5 6.5 8.5 10 12 14C15.5 10 14.5 6.5 12 3Z"
                  stroke="#e5be67"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 14C8.5 13.5 5 11.5 4 8C7.5 7.5 10.5 9.5 12 14Z"
                  stroke="#e5be67"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 14C15.5 13.5 19 11.5 20 8C16.5 7.5 13.5 9.5 12 14Z"
                  stroke="#e5be67"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M7 18H17M12 14V20" stroke="#e5be67" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span>{hero.badge || 'ROYAL HERITAGE & MODERN LUXURY'}</span>
            </div>

            <h1 className="hero-editorial-heading">
              <span className="hero-heading-gold">TRENDY</span>
              <span className="hero-heading-line2">
                <span className="hero-heading-gold">COLLECTIONS</span>{' '}
                <span className="hero-heading-white">FOR</span>
              </span>
              <span className="hero-heading-white">EVERY YOU</span>
            </h1>

            <p className="hero-editorial-subtitle">
              {hero.subtitle || 'Experience Salem’s finest destination for handcrafted sarees, royal anarkalis, designer kurtis, and contemporary ethnic fusion.'}
            </p>

            <div className="hero-editorial-cta-row">
              <Link to={hero.ctaLink || '/shop'} className="hero-explore-btn">
                <span>{hero.ctaText || 'EXPLORE COLLECTION'}</span>
                <ArrowRight size={17} strokeWidth={2.2} />
              </Link>
            </div>
          </div>

          {/* Unified Horizontal Animated Portrait Track & Arrows (Desktop + Phone) */}
          <div 
            className="hero-gallery-viewport"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Left Arrow Button */}
            <button
              type="button"
              className="hero-nav-arrow hero-nav-arrow-left"
              onClick={prevSlide}
              aria-label="Previous Collection Image"
            >
              <ChevronLeft size={20} strokeWidth={1.75} />
            </button>

            {/* Right Arrow Button */}
            <button
              type="button"
              className="hero-nav-arrow hero-nav-arrow-right"
              onClick={nextSlide}
              aria-label="Next Collection Image"
            >
              <ChevronRight size={20} strokeWidth={1.75} />
            </button>

            <div className="hero-horizontal-track">
              {HERO_GALLERY_ITEMS.map((item, idx) => {
                let rel = (idx - activeSlide) % totalSlides;
                if (rel < 0) rel += totalSlides;
                if (rel > Math.floor(totalSlides / 2)) rel -= totalSlides;

                let slotClass = 'hero-slot-hidden';
                if (rel === -2) slotClass = 'hero-slot-far-left';
                else if (rel === -1) slotClass = 'hero-slot-mid-left';
                else if (rel === 0) slotClass = 'hero-slot-spotlight';
                else if (rel === 1) slotClass = 'hero-slot-mid-right';
                else if (rel === 2) slotClass = 'hero-slot-far-right';
                else if (rel === 3) slotClass = 'hero-slot-enter-right';
                else if (rel === -3) slotClass = 'hero-slot-exit-left';

                return (
                  <div
                    key={item.id}
                    className={`hero-portrait-card ${slotClass}`}
                    onClick={() => {
                      if (rel === 0) {
                        navigate(item.link);
                      } else {
                        setActiveSlide(idx);
                      }
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="hero-portrait-img"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/why-choose-banner.jpg';
                      }}
                    />
                    {/* Soft edge vignette for non-spotlight cards */}
                    <div className="hero-portrait-vignette" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="hero-pagination-dots">
          {HERO_GALLERY_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              className={`hero-dot ${idx === activeSlide ? 'active' : ''}`}
              onClick={() => setActiveSlide(idx)}
              aria-label={`View slide ${idx + 1}: ${item.title}`}
            />
          ))}
        </div>

        {/* Bottom 3-Column Boutique Credibility Strip */}
        <div className="hero-bottom-features-bar">
          <div className="container">
            <div className="hero-bottom-features-grid">
              {/* Feature 1: Salem Boutique Store */}
              <div className="hero-feature-item">
                <div className="hero-feature-icon">
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                    <path
                      d="M16 5C12.5 10 11.5 15 16 20C20.5 15 19.5 10 16 5Z"
                      stroke="#e5be67"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 20C11 19 6.5 16 5 11.5C9.5 11 13.5 14 16 20Z"
                      stroke="#e5be67"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 20C21 19 25.5 16 27 11.5C22.5 11 18.5 14 16 20Z"
                      stroke="#e5be67"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 25C12 22.5 14 21 16 20C18 21 20 22.5 22 25"
                      stroke="#e5be67"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                    <path d="M16 20V27" stroke="#e5be67" strokeWidth="1.75" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <div className="hero-feature-title">Salem Boutique Store</div>
                  <div className="hero-feature-sub">Premium Ethnic Wear</div>
                </div>
              </div>

              <div className="hero-feature-divider" />

              {/* Feature 2: Custom Tailoring Support */}
              <div className="hero-feature-item">
                <div className="hero-feature-icon">
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                    <circle cx="9" cy="11" r="3.5" stroke="#e5be67" strokeWidth="1.75" />
                    <circle cx="9" cy="21" r="3.5" stroke="#e5be67" strokeWidth="1.75" />
                    <path d="M12 12.8L26 21" stroke="#e5be67" strokeWidth="1.75" strokeLinecap="round" />
                    <path d="M12 19.2L26 11" stroke="#e5be67" strokeWidth="1.75" strokeLinecap="round" />
                    <path d="M4 16H14" stroke="#e5be67" strokeWidth="1.3" strokeLinecap="round" strokeDasharray="2 2" />
                  </svg>
                </div>
                <div>
                  <div className="hero-feature-title">Custom Tailoring Support</div>
                  <div className="hero-feature-sub">Perfect Fit, Always</div>
                </div>
              </div>

              <div className="hero-feature-divider" />

              {/* Feature 3: WhatsApp Video Shopping */}
              <div className="hero-feature-item">
                <div className="hero-feature-icon">
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                    <path
                      d="M16 4C9.37 4 4 8.92 4 15C4 17.42 4.86 19.66 6.31 21.47L4.7 26.8L10.47 25.1C12.16 25.8 14.03 26.2 16 26.2C22.63 26.2 28 21.28 28 15.2C28 9.12 22.63 4 16 4Z"
                      stroke="#e5be67"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.8 11.5C13.1 11 13.4 11 13.8 11C14.1 11 14.4 11 14.6 11.4C14.8 11.9 15.2 12.8 15.3 13C15.4 13.2 15.4 13.4 15.2 13.6C15 13.9 14.8 14.1 14.6 14.3C14.4 14.5 14.2 14.7 14.5 15.1C14.8 15.5 15.4 16.5 16.3 17.3C17.4 18.1 18.2 18.4 18.7 18.6C19.1 18.8 19.3 18.7 19.6 18.5C19.9 18.2 20.4 17.6 20.7 17.2C21 16.9 21.2 16.9 21.5 17.1C21.9 17.2 22.8 17.7 23.2 17.9C23.6 18.1 23.8 18.2 23.9 18.5C23.9 18.8 23.9 19.5 23.5 20.1C23.1 20.8 22 21.3 21.2 21.3C20.5 21.3 19.8 21.1 17.9 20.4C15.4 19.3 13.6 16.9 13.4 16.5C13.1 16.1 12.2 14.9 12.2 13.6C12.2 12.3 12.6 11.8 12.8 11.5Z"
                      fill="#e5be67"
                    />
                  </svg>
                </div>
                <div>
                  <div className="hero-feature-title">WhatsApp Video Shopping</div>
                  <div className="hero-feature-sub">Shop from Anywhere</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES SECTION */}
      <section className="home-section" style={{ padding: '5rem 0', background: 'var(--logo-cream-base)' }}>
        <div className="container">
          <div className="section-header-center" style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem' }}>
            <span className="badge badge-purple" style={{ marginBottom: '0.8rem' }}>
              Curated Wardrobe
            </span>
            <h2 style={{ fontSize: '2.4rem', color: 'var(--purple-950)', marginBottom: '0.8rem' }}>
              Explore By Category
            </h2>
            <p className="section-desc" style={{ color: 'var(--gray-600)', fontSize: '1rem' }}>
              From timeless wedding silks to playful contemporary kurtis, find the perfect design crafted for every celebration.
            </p>
          </div>

          <div className="category-grid">
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
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/why-choose-banner.jpg";
                  }}
                />
                {/* Gradient overlay */}
                <div className="category-card-info" style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(42, 5, 32, 0.05) 30%, rgba(61, 8, 46, 0.9) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.4rem 1.1rem',
                  color: '#fff'
                }}>
                  <h3 style={{ color: '#fff', fontSize: '1.15rem', marginBottom: '0.3rem', fontFamily: 'var(--font-serif)' }}>
                    {cat.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: '#f7e6b8', fontWeight: 600 }}>
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
      <section className="home-section" style={{ padding: '5rem 0', background: 'linear-gradient(180deg, var(--logo-cream-base) 0%, var(--logo-cream-soft) 100%)' }}>
        <div className="container">
          <div className="section-header-split" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', gap: '1rem' }}>
            <div>
              <span className="badge badge-purple" style={{ marginBottom: '0.6rem' }}>
                Fresh From The Loom
              </span>
              <h2 style={{ fontSize: '2.4rem', color: 'var(--purple-950)' }}>
                New Festive Arrivals
              </h2>
              <p className="section-desc" style={{ color: 'var(--gray-600)', fontSize: '0.98rem' }}>
                Handpicked boutique releases designed to make heads turn.
              </p>
            </div>
            <Link to="/shop?new=true" className="btn btn-secondary section-header-cta">
              <span>View All New Arrivals</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Product Grid */}
          <div className="product-grid">
            {newArrivals.map(product => {
              const isSaved = isInWishlist(product.id);
              return (
                <div key={product.id} className="product-card">
                  <div className="product-img-wrapper">
                    <img 
                      src={product.images?.[0] || '/why-choose-banner.jpg'} 
                      alt={product.name} 
                      className="product-img"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/why-choose-banner.jpg";
                      }}
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
                    <div className="product-sizes-preview" style={{ display: 'flex', gap: '0.3rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
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

                    <div className="product-card-actions" style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
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
                        className="icon-btn product-detail-arrow-btn"
                        style={{ width: 36, height: 36, borderRadius: '6px', flexShrink: 0 }}
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
      <section className="home-section" style={{ padding: '4.5rem 0', background: 'var(--logo-cream-base)' }}>
        <div className="container">
          <div className="promo-banner-wrap promo-grid" style={{
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #4e0d3c 0%, #2a0520 100%)',
            color: '#fff',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid rgba(200, 157, 70, 0.3)'
          }}>
            {/* Promo text */}
            <div className="promo-text-wrap" style={{ padding: '3.5rem 3rem' }}>
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
                <div className="promo-code-box" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px dashed #FFD700',
                  marginBottom: '2rem'
                }}>
                  <Sparkles size={18} style={{ color: '#FFD700', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', color: '#fff' }}>
                    Code: <strong style={{ color: '#FFD700', letterSpacing: '0.08em' }}>{promoBanner.discountCode}</strong> (10% OFF)
                  </span>
                </div>
              )}

              <div>
                <Link to="/shop" className="btn btn-gold promo-cta-btn">
                  <span>Shop Festive Sale</span>
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>

            {/* Promo Image */}
            <div className="promo-img-wrap" style={{ height: '100%', minHeight: '380px', position: 'relative' }}>
              <img
                src={promoBanner.imageUrl}
                alt="Boutique Promo"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/why-choose-banner.jpg";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. SALEM BOUTIQUE SPOTLIGHT & CRAFTSMANSHIP */}
      <section className="home-section" style={{ padding: '5rem 0', background: 'linear-gradient(180deg, var(--logo-cream-soft) 0%, var(--logo-cream-base) 100%)' }}>
        <div className="container">
          <div className="editorial-split-grid">
            <div style={{ position: 'relative' }}>
              <img
                src="/why-choose-banner.jpg"
                onError={(e) => {
                  e.currentTarget.src = "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/2026/JULY/18/Mgulr2uY_5c6ac82c469d4fe1a6796a62ae2c2b81.jpg";
                }}
                alt="Harithanjali Salem Boutique"
                className="editorial-img"
              />
              <div className="editorial-badge-card">
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

            <div className="editorial-copy-col">
              <span className="badge badge-purple" style={{ marginBottom: '0.8rem' }}>
                Salem's Fashion Landmark
              </span>
              <h2 style={{ fontSize: '2.4rem', color: 'var(--purple-950)', marginBottom: '1.2rem' }}>
                Why Choose Harithanjali Boutique?
              </h2>
              <p className="section-desc" style={{ color: 'var(--gray-600)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                Located at Seelanaickanpatti, Salem, Harithanjali Boutique was born out of a desire to provide women with handpicked ethnic wear that reflects opulence, authenticity, and individuality without compromise.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--purple-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple-800)', flexShrink: 0 }}>
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--purple-950)', marginBottom: '0.2rem' }}>Uncompromised Weave Integrity</h4>
                    <p style={{ color: 'var(--gray-600)', fontSize: '0.88rem' }}>Pure mulberry silk, certified zari, and tested georgettes sourced directly from master artisanal clusters.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--purple-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple-800)', flexShrink: 0 }}>
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--purple-950)', marginBottom: '0.2rem' }}>Direct WhatsApp Styling Assistance</h4>
                    <p style={{ color: 'var(--gray-600)', fontSize: '0.88rem' }}>Need matching blouse guidance or live video look? Chat directly with our Salem styling desk at +91 8144052522.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--purple-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple-800)', flexShrink: 0 }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--purple-950)', marginBottom: '0.2rem' }}>Visit Our Salem Storefront</h4>
                    <p style={{ color: 'var(--gray-600)', fontSize: '0.88rem' }}>2/32 Perumal Kovil Medu, Main Road, Seelanaickanpatti, Salem – 636201.</p>
                  </div>
                </div>
              </div>

              <Link to="/about" className="btn btn-primary editorial-story-btn">
                <span>Read Our Full Story</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VERIFIED CUSTOMER REVIEWS */}
      <section className="home-section" style={{ padding: '5rem 0', background: 'var(--color-white)' }}>
        <div className="container">
          <div className="section-header-center" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}>
            <span className="badge badge-gold" style={{ marginBottom: '0.6rem' }}>
              Client Love
            </span>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--purple-950)', marginBottom: '0.6rem' }}>
              What Our Customers Say
            </h2>
            <p className="section-desc" style={{ color: 'var(--gray-600)', fontSize: '0.95rem' }}>
              Real experiences from fashion lovers across Salem and all over India.
            </p>
          </div>

          <div className="reviews-grid">
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
                className="review-card"
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
      <section className="home-section" style={{ padding: '4.5rem 0', background: 'linear-gradient(135deg, #2a0520 0%, #3d082e 100%)', color: '#fff' }}>
        <div className="container">
          <div className="section-header-split" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', gap: '1rem' }}>
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
              className="btn btn-secondary section-header-cta"
              style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255, 255, 255, 0.4)' }}
            >
              <span>Follow Us</span>
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="lookbook-grid">
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
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `/lookbook/lookbook_${(i % 6) + 1}.jpg`;
                  }}
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
      <section className="home-section" style={{ padding: '4.5rem 0', background: 'linear-gradient(135deg, #fdf1ec 0%, #f9eef5 50%, #fdf9f4 100%)', borderTop: '1px solid rgba(200, 157, 70, 0.25)', borderBottom: '1px solid rgba(200, 157, 70, 0.25)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <Sparkles size={32} style={{ color: 'var(--purple-700)', margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '2.2rem', color: 'var(--purple-950)', marginBottom: '0.8rem' }}>
            Join The Harithanjali VIP Circle
          </h2>
          <p className="section-desc" style={{ color: 'var(--gray-700)', fontSize: '0.98rem', marginBottom: '2rem' }}>
            Receive exclusive early access to festive launch collections, seasonal styling edits, and boutique discounts directly to your inbox.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
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
