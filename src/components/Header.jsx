import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  User, 
  Phone, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Header() {
  const { cartCount, wishlist, setIsCartOpen, setIsSearchOpen, content, settings } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const announcement = content?.announcement || {
    enabled: true,
    text: '✨ Grand Festive Collection Now Live! Free Shipping on orders above ₹1999 | Direct WhatsApp Orders Available!'
  };

  return (
    <>
      {/* Announcement Bar */}
      {announcement.enabled && (
        <div className="announcement-bar">
          {/* Subtle decorative left motif */}
          <svg
            width="28"
            height="18"
            viewBox="0 0 28 18"
            fill="none"
            style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.45, pointerEvents: 'none' }}
            className="hide-mobile"
          >
            <path d="M2 14C7 10 12 6 18 4M18 4C14 8 11 12 9 16M18 4C21 3 24 3 26 2" stroke="#c89d46" strokeWidth="1.1" strokeLinecap="round" />
            <circle cx="22" cy="7" r="1" fill="#c89d46" />
            <circle cx="13" cy="3" r="1" fill="#c89d46" />
          </svg>

          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" fill="#e5be67" />
              <circle cx="19" cy="5" r="1.5" fill="#e5be67" />
            </svg>
            <span>{(announcement.text || '').replace(/^✨\s*/, '')}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" fill="#e5be67" />
              <circle cx="19" cy="5" r="1.5" fill="#e5be67" />
            </svg>
          </div>
        </div>
      )}

      {/* Main Sticky Navigation */}
      <header className="main-header">
        <div className="header-container">

          {/* Boutique Brand Identity */}
          <Link to="/" className="brand-logo">
            <img 
              src="/logo.png" 
              alt="Harithanjali Boutique Logo" 
              className="brand-logo-img" 
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/logo-square.png";
              }}
            />
            <div className="brand-text">
              <span className="brand-title">Harithanjali</span>
              <span className="brand-subtitle">Boutique • Salem</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav>
            <ul className="nav-links">
              <li>
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Shop All
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop?category=sarees" className="nav-link">
                  Sarees
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop?category=anarkalis" className="nav-link">
                  Anarkalis
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop?new=true" className="nav-link">
                  New Arrivals
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Header Action Icons */}
          <div className="header-actions">
            {/* Search Trigger */}
            <button 
              className="icon-btn" 
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search Catalog"
              title="Search Products"
            >
              <Search size={19} />
            </button>

            {/* Wishlist Link */}
            <Link 
              to="/wishlist" 
              className="icon-btn hide-mobile" 
              aria-label="View Saved Wishlist"
              title="Saved Items"
            >
              <Heart size={19} />
              {wishlist.length > 0 && (
                <span className="icon-badge">{wishlist.length}</span>
              )}
            </Link>

            {/* Cart Button */}
            <button 
              className="icon-btn" 
              onClick={() => setIsCartOpen(true)}
              aria-label="View Shopping Cart"
              title="Shopping Cart"
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span className="icon-badge">{cartCount}</span>
              )}
            </button>

            {/* Admin Portal Shortcut */}
            <Link 
              to="/admin" 
              className="icon-btn hide-mobile" 
              aria-label="Admin Dashboard"
              title="Admin Portal"
            >
              <User size={19} />
            </Link>

            {/* Mobile Hamburger toggle for screens <= 992px */}
            <button 
              className="icon-btn mobile-only-btn" 
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="drawer-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="drawer-panel" 
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '340px' }}
          >
            <div style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--purple-100)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img 
                  src="/logo.png" 
                  alt="Harithanjali Boutique Logo" 
                  style={{ width: '44px', height: '44px', objectFit: 'contain', borderRadius: '50%' }} 
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/logo-square.png";
                  }}
                />
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--purple-950)' }}>
                    HARITHANJALI
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--gold-dark)', letterSpacing: '0.15em', fontWeight: 600 }}>
                    BOUTIQUE • SALEM
                  </div>
                </div>
              </div>
              <button className="icon-btn" onClick={() => setMobileMenuOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Link 
                  to="/" 
                  className="btn-link"
                  style={{ padding: '0.8rem 1rem', borderRadius: '8px', color: 'var(--purple-950)', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Home</span>
                  <ChevronRight size={16} />
                </Link>
                <Link 
                  to="/shop" 
                  style={{ padding: '0.8rem 1rem', borderRadius: '8px', color: 'var(--purple-950)', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Shop All Products</span>
                  <ChevronRight size={16} />
                </Link>
                <Link 
                  to="/shop?category=sarees" 
                  style={{ padding: '0.8rem 1rem', borderRadius: '8px', color: 'var(--gray-700)', fontWeight: 500, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Festive Sarees</span>
                  <ChevronRight size={16} />
                </Link>
                <Link 
                  to="/shop?category=anarkalis" 
                  style={{ padding: '0.8rem 1rem', borderRadius: '8px', color: 'var(--gray-700)', fontWeight: 500, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Royal Anarkalis</span>
                  <ChevronRight size={16} />
                </Link>
                <Link 
                  to="/shop?category=kurtis" 
                  style={{ padding: '0.8rem 1rem', borderRadius: '8px', color: 'var(--gray-700)', fontWeight: 500, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Designer Kurtis</span>
                  <ChevronRight size={16} />
                </Link>
                <Link 
                  to="/shop?category=coord-sets" 
                  style={{ padding: '0.8rem 1rem', borderRadius: '8px', color: 'var(--gray-700)', fontWeight: 500, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Trendy Co-ord Sets</span>
                  <ChevronRight size={16} />
                </Link>
                <Link 
                  to="/wishlist" 
                  style={{ padding: '0.8rem 1rem', borderRadius: '8px', color: 'var(--gray-700)', fontWeight: 500, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Saved Wishlist ({wishlist.length})</span>
                  <ChevronRight size={16} />
                </Link>
                <Link 
                  to="/about" 
                  style={{ padding: '0.8rem 1rem', borderRadius: '8px', color: 'var(--gray-700)', fontWeight: 500, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>About Us</span>
                  <ChevronRight size={16} />
                </Link>
                <Link 
                  to="/contact" 
                  style={{ padding: '0.8rem 1rem', borderRadius: '8px', color: 'var(--gray-700)', fontWeight: 500, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Contact & Store Location</span>
                  <ChevronRight size={16} />
                </Link>
              </div>

              <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--purple-50)', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--purple-950)', marginBottom: '0.4rem' }}>
                  Salem Boutique Support
                </div>
                <a 
                  href={`tel:${settings?.phone || '8144052522'}`} 
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--purple-800)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.6rem' }}
                >
                  <Phone size={15} />
                  <span>+91 {settings?.phone || '8144052522'}</span>
                </a>
                <Link 
                  to="/admin" 
                  style={{ display: 'inline-block', fontSize: '0.78rem', color: 'var(--gray-600)', textDecoration: 'underline' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Staff & Admin Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Style helper for mobile display */}
      <style>{`
        @media (min-width: 993px) {
          .mobile-only-btn { display: none !important; }
        }
        @media (max-width: 992px) {
          .mobile-only-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
