import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart, setQuickViewProduct } = useShop();

  if (wishlist.length === 0) {
    return (
      <div className="container" style={{ padding: '6rem 1rem', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--purple-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--purple-700)' }}>
          <Heart size={38} />
        </div>
        <h2 style={{ fontSize: '2rem', color: 'var(--purple-950)', marginBottom: '0.8rem' }}>
          Your Wishlist is Empty
        </h2>
        <p style={{ color: 'var(--gray-600)', maxWidth: '440px', margin: '0 auto 2rem' }}>
          Save the garments you adore for quick ordering and festive styling.
        </p>
        <Link to="/shop" className="btn btn-primary">
          <span>Explore Boutique Collections</span>
          <ArrowRight size={17} />
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page animate-fade-in" style={{ padding: '3rem 0 6rem' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--gray-500)', marginBottom: '2rem' }}>
          <Link to="/" style={{ color: 'var(--gray-500)' }}>Home</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--purple-950)', fontWeight: 600 }}>My Saved Wishlist</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2.4rem', color: 'var(--purple-950)' }}>
              My Saved Designs ({wishlist.length})
            </h1>
            <p style={{ color: 'var(--gray-600)', fontSize: '0.95rem' }}>
              Your personally curated selection of Harithanjali pieces.
            </p>
          </div>
          <Link to="/shop" className="btn btn-secondary btn-sm">
            <span>Continue Shopping</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="product-grid">
          {wishlist.map(product => (
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

                <button
                  type="button"
                  className="product-wishlist-btn active"
                  onClick={() => toggleWishlist(product)}
                  title="Remove from wishlist"
                >
                  <Trash2 size={16} />
                </button>

                <button
                  type="button"
                  className="product-quick-btn"
                  onClick={() => setQuickViewProduct(product)}
                >
                  Quick View
                </button>
              </div>

              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <Link to={`/product/${product.id}`} className="product-title">{product.name}</Link>

                <div className="product-pricing">
                  <span className="current-price">₹{product.salePrice || product.price}</span>
                  {product.salePrice && (
                    <span className="original-price">₹{product.price}</span>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                  <button
                    onClick={() => {
                      addToCart(product, product.sizes?.[0], product.colors?.[0], 1);
                      toggleWishlist(product);
                    }}
                    disabled={product.stock <= 0}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1, borderRadius: '6px' }}
                  >
                    <ShoppingBag size={15} />
                    <span>Move To Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
