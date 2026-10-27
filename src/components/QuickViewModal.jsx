import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Heart, ShoppingBag, MessageCircle, Star, Check, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist, settings } = useShop();
  const navigate = useNavigate();

  const product = quickViewProduct;

  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const currentSize = selectedSize || product.sizes?.[0] || 'Standard';
  const currentColor = selectedColor || product.colors?.[0] || 'Standard';
  const price = product.salePrice || product.price;
  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, currentSize, currentColor, quantity);
    setQuickViewProduct(null);
  };

  const handleViewFullDetails = () => {
    setQuickViewProduct(null);
    navigate(`/product/${product.id}`);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Harithanjali Boutique! I'm interested in "${product.name}" (SKU: ${product.sku || 'N/A'}). ` +
    `Price: ₹${price}, Size: ${currentSize}, Color: ${currentColor}. Is this available?`
  );
  const whatsappUrl = `https://wa.me/${settings?.whatsappNumber || '918144052522'}?text=${whatsappMessage}`;

  return (
    <div className="modal-backdrop" onClick={() => setQuickViewProduct(null)}>
      <div 
        className="modal-card" 
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '840px', padding: 0 }}
      >
        <button 
          onClick={() => setQuickViewProduct(null)} 
          className="icon-btn" 
          style={{ position: 'absolute', top: 12, right: 12, zIndex: 10, background: '#fff' }}
        >
          <X size={18} />
        </button>

        <div className="quickview-grid">
          {/* Product Gallery Left */}
          <div style={{ padding: '1.5rem', background: 'var(--purple-50)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <div style={{ position: 'relative', paddingTop: '115%', borderRadius: '12px', overflow: 'hidden', background: '#fff' }}>
              <img 
                src={product.images?.[selectedImgIdx] || product.images?.[0] || '/why-choose-banner.jpg'} 
                alt={product.name}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/why-choose-banner.jpg";
                }}
              />
            </div>
            {product.images?.length > 1 && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIdx(idx)}
                    style={{
                      width: 54,
                      height: 64,
                      borderRadius: 6,
                      overflow: 'hidden',
                      border: selectedImgIdx === idx ? '2px solid var(--purple-700)' : '1px solid var(--purple-200)',
                      opacity: selectedImgIdx === idx ? 1 : 0.7
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Right */}
          <div style={{ padding: '2rem 1.8rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
              <span className="badge badge-purple" style={{ textTransform: 'uppercase' }}>
                {product.category}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--gray-500)', fontFamily: 'monospace' }}>
                SKU: {product.sku || 'HB-NEW'}
              </span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--purple-950)', marginBottom: '0.6rem' }}>
              {product.name}
            </h2>

            {/* Price & Rating */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem', marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 700, color: 'var(--purple-950)' }}>
                ₹{price}
              </span>
              {product.salePrice && (
                <>
                  <span style={{ fontSize: '1rem', color: 'var(--gray-500)', textDecoration: 'line-through' }}>
                    ₹{product.price}
                  </span>
                  <span className="badge badge-sale">
                    {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <p style={{ color: 'var(--gray-600)', fontSize: '0.88rem', lineHeight: '1.55', marginBottom: '1.2rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {product.description}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--gray-800)', marginBottom: '0.4rem' }}>
                  Select Color: <span style={{ color: 'var(--purple-800)', fontWeight: 700 }}>{currentColor}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        padding: '0.35rem 0.8rem',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        border: currentColor === color ? '1.5px solid var(--purple-700)' : '1px solid var(--gray-300)',
                        background: currentColor === color ? 'var(--purple-50)' : '#fff',
                        color: currentColor === color ? 'var(--purple-900)' : 'var(--gray-700)'
                      }}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: '1.2rem' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--gray-800)', marginBottom: '0.4rem' }}>
                  Select Size: <span style={{ color: 'var(--purple-800)', fontWeight: 700 }}>{currentSize}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: '0.35rem 0.85rem',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        border: currentSize === size ? '1.5px solid var(--purple-700)' : '1px solid var(--gray-300)',
                        background: currentSize === size ? 'var(--purple-800)' : '#fff',
                        color: currentSize === size ? '#fff' : 'var(--gray-800)'
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.4rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--gray-800)' }}>Quantity:</span>
              <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--gray-300)', borderRadius: '6px', overflow: 'hidden' }}>
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  style={{ padding: '0.3rem 0.7rem', background: 'var(--gray-100)', fontWeight: 600 }}
                >
                  -
                </button>
                <span style={{ padding: '0.3rem 0.9rem', fontSize: '0.9rem', fontWeight: 600 }}>
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  style={{ padding: '0.3rem 0.7rem', background: 'var(--gray-100)', fontWeight: 600 }}
                >
                  +
                </button>
              </div>
              <span style={{ fontSize: '0.8rem', color: product.stock > 0 ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: 'auto' }}>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="btn btn-primary"
                  style={{ flex: 1, borderRadius: '8px', padding: '0.75rem' }}
                >
                  <ShoppingBag size={18} />
                  <span>{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="icon-btn"
                  style={{
                    borderRadius: '8px',
                    width: 46,
                    height: 46,
                    color: isSaved ? 'var(--accent-red)' : 'var(--gray-600)',
                    border: '1px solid var(--purple-200)'
                  }}
                  title={isSaved ? 'Saved in Wishlist' : 'Add to Wishlist'}
                >
                  <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
                </button>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp btn-sm"
                style={{ width: '100%', borderRadius: '8px', padding: '0.65rem' }}
              >
                <MessageCircle size={16} />
                <span>Enquire on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleViewFullDetails}
                style={{ fontSize: '0.82rem', color: 'var(--purple-800)', textAlign: 'center', marginTop: '0.4rem', textDecoration: 'underline' }}
              >
                View Complete Product Details & Size Guide →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
