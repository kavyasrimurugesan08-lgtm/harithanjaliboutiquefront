import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag, Sparkles, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function CartPage() {
  const { 
    cart, 
    cartSubtotal, 
    shippingFee, 
    grandTotal, 
    updateCartQty, 
    removeFromCart, 
    clearCart,
    showToast 
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'HARITHA10') {
      setDiscountPercent(10);
      setCouponApplied(true);
      showToast('Coupon HARITHA10 applied! You saved 10%');
    } else if (clean === 'FESTIVE5') {
      setDiscountPercent(5);
      setCouponApplied(true);
      showToast('Coupon FESTIVE5 applied! You saved 5%');
    } else {
      showToast('Invalid or expired coupon code', 'error');
    }
  };

  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '6rem 1rem', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--purple-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--purple-700)' }}>
          <ShoppingBag size={40} />
        </div>
        <h2 style={{ fontSize: '2rem', color: 'var(--purple-950)', marginBottom: '0.8rem' }}>
          Your Shopping Bag Is Empty
        </h2>
        <p style={{ color: 'var(--gray-600)', maxWidth: '440px', margin: '0 auto 2rem' }}>
          Looks like you haven't added any designer wear to your bag yet. Explore our handcrafted Salem collections.
        </p>
        <Link to="/shop" className="btn btn-primary">
          <span>Explore Boutique Collections</span>
          <ArrowRight size={17} />
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page animate-fade-in" style={{ padding: '3rem 0 6rem' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--gray-500)', marginBottom: '2rem' }}>
          <Link to="/" style={{ color: 'var(--gray-500)' }}>Home</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--purple-950)', fontWeight: 600 }}>Shopping Bag</span>
        </div>

        <h1 style={{ fontSize: '2.4rem', color: 'var(--purple-950)', marginBottom: '2.5rem' }}>
          Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
        </h1>

        <div className="cart-grid">
          {/* Left: Cart Items Table */}
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid var(--purple-100)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--purple-100)', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--purple-950)', textTransform: 'uppercase' }}>Item Details</span>
              <button onClick={clearCart} style={{ fontSize: '0.82rem', color: 'var(--accent-red)', fontWeight: 600 }}>
                Clear All Items
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {cart.map((item, idx) => (
                <div
                  key={`${item.productId}-${item.size}-${item.color}-${idx}`}
                  className="cart-item-row"
                >
                  <img
                    src={item.image || '/why-choose-banner.jpg'}
                    alt={item.name}
                    className="cart-item-img"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/why-choose-banner.jpg";
                    }}
                  />

                  <div className="cart-item-info">
                    <Link to={`/product/${item.productId}`} className="cart-item-title">
                      {item.name}
                    </Link>
                    <div className="cart-item-meta">
                      <span>Size: <strong>{item.size}</strong></span>
                      <span>•</span>
                      <span>Color: <strong>{item.color}</strong></span>
                      {item.sku && (
                        <>
                          <span>•</span>
                          <span style={{ fontFamily: 'monospace' }}>{item.sku}</span>
                        </>
                      )}
                    </div>

                    {/* Qty & Remove */}
                    <div className="cart-item-actions">
                      <div className="cart-qty-control">
                        <button
                          onClick={() => updateCartQty(item.productId, item.size, item.color, item.quantity - 1)}
                          style={{ padding: '0.2rem 0.6rem', fontWeight: 700 }}
                        >
                          -
                        </button>
                        <span style={{ padding: '0.2rem 0.8rem', fontSize: '0.9rem', fontWeight: 700 }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.productId, item.size, item.color, item.quantity + 1)}
                          style={{ padding: '0.2rem 0.6rem', fontWeight: 700 }}
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.productId, item.size, item.color)}
                        className="cart-remove-btn"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--gray-500)' }}
                      >
                        <Trash2 size={15} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-price-col">
                    <div className="cart-item-price">
                      ₹{item.price * item.quantity}
                    </div>
                    {item.quantity > 1 && (
                      <div className="cart-item-unit-price">
                        (₹{item.price} each)
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to="/shop" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--purple-800)', fontWeight: 600, fontSize: '0.9rem' }}>
                <span>← Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Right: Order Summary & Coupon */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Coupon Box */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid var(--purple-100)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', fontSize: '0.9rem', fontWeight: 700, color: 'var(--purple-950)' }}>
                <Tag size={17} style={{ color: 'var(--purple-700)' }} />
                <span>Have a Promo Code?</span>
              </div>
              <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="e.g. HARITHA10"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '0.6rem 0.9rem',
                    borderRadius: '8px',
                    border: '1px solid var(--gray-300)',
                    textTransform: 'uppercase',
                    fontWeight: 600
                  }}
                />
                <button type="submit" className="btn btn-secondary btn-sm" style={{ borderRadius: '8px' }}>
                  Apply
                </button>
              </form>
              <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--gray-500)' }}>
                Tip: Try <strong>HARITHA10</strong> for 10% off festive pieces!
              </div>
            </div>

            {/* Price Summary */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid var(--purple-100)', padding: '1.8rem', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--purple-950)', marginBottom: '1.2rem' }}>
                Order Summary
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', paddingBottom: '1.2rem', borderBottom: '1px solid var(--gray-200)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--gray-600)' }}>Bag Subtotal</span>
                  <span style={{ fontWeight: 600 }}>₹{cartSubtotal}</span>
                </div>

                {couponApplied && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
                    <span>Festive Discount ({discountPercent}%)</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--gray-600)' }}>Estimated Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span style={{ color: '#059669', fontWeight: 600 }}>FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '1.2rem 0 1.5rem' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--purple-950)' }}>Grand Total</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--purple-950)' }}>
                  ₹{finalTotal}
                </span>
              </div>

              <button
                onClick={() => navigate('/checkout', { state: { discountPercent, discountAmount } })}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', borderRadius: '10px' }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem', fontSize: '0.78rem', color: 'var(--gray-500)' }}>
                <ShieldCheck size={16} style={{ color: '#059669' }} />
                <span>Salem boutique verified order fulfillment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cart-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
