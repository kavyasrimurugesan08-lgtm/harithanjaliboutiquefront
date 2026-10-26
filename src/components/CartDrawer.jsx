import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight, Truck, Sparkles, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function CartDrawer() {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    cartSubtotal, 
    shippingFee, 
    grandTotal, 
    updateCartQty, 
    removeFromCart, 
    settings 
  } = useShop();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const freeThreshold = settings?.freeShippingThreshold || 1999;
  const amountToFreeShipping = Math.max(0, freeThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeThreshold) * 100));

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleViewCart = () => {
    setIsCartOpen(false);
    navigate('/cart');
  };

  return (
    <div className="drawer-backdrop" onClick={() => setIsCartOpen(false)}>
      <div 
        className="drawer-panel" 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--purple-100)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} style={{ color: 'var(--purple-800)' }} />
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--purple-950)' }}>
              Your Boutique Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
            </span>
          </div>
          <button 
            className="icon-btn" 
            style={{ width: 34, height: 34 }} 
            onClick={() => setIsCartOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress Tracker */}
        <div style={{ padding: '0.8rem 1.5rem', background: 'var(--purple-50)', borderBottom: '1px solid var(--purple-100)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--purple-900)', marginBottom: '0.4rem' }}>
            <Truck size={15} style={{ color: 'var(--purple-700)' }} />
            <span>
              {amountToFreeShipping === 0 ? (
                <span style={{ color: '#059669', fontWeight: 700 }}>🎉 You qualified for FREE Express Shipping!</span>
              ) : (
                <>Add <strong style={{ color: 'var(--purple-800)' }}>₹{amountToFreeShipping}</strong> more for <strong>FREE Shipping</strong></>
              )}
            </span>
          </div>
          <div style={{ width: '100%', height: 6, background: '#e9d5ff', borderRadius: 3, overflow: 'hidden' }}>
            <div 
              style={{ 
                height: '100%', 
                width: `${freeShippingProgress}%`, 
                background: 'linear-gradient(90deg, var(--purple-600), var(--purple-800))', 
                transition: 'width 0.3s ease' 
              }} 
            />
          </div>
        </div>

        {/* Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.2rem 1.5rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'var(--gray-500)' }}>
              <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'var(--purple-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem', color: 'var(--purple-400)' }}>
                <ShoppingBag size={32} />
              </div>
              <h4 style={{ color: 'var(--purple-950)', marginBottom: '0.4rem' }}>Your shopping bag is empty</h4>
              <p style={{ fontSize: '0.86rem', marginBottom: '1.5rem' }}>
                Discover Salem’s finest handcrafted silks and trendy silhouettes.
              </p>
              <button 
                onClick={() => { setIsCartOpen(false); navigate('/shop'); }}
                className="btn btn-primary btn-sm"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.map((item, idx) => (
                <div 
                  key={`${item.productId}-${item.size}-${item.color}-${idx}`}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid var(--purple-100)',
                    position: 'relative'
                  }}
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
                    style={{ width: 70, height: 86, objectFit: 'cover', borderRadius: '8px', background: 'var(--purple-50)' }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--gray-900)', marginBottom: '0.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.name}
                    </h4>
                    <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.76rem', color: 'var(--gray-600)', marginBottom: '0.4rem' }}>
                      <span>Size: <strong>{item.size}</strong></span>
                      <span>•</span>
                      <span>Color: <strong>{item.color}</strong></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.4rem' }}>
                      {/* Qty controller */}
                      <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--gray-300)', borderRadius: 4 }}>
                        <button 
                          onClick={() => updateCartQty(item.productId, item.size, item.color, item.quantity - 1)}
                          style={{ padding: '0.15rem 0.5rem', fontSize: '0.85rem', fontWeight: 600 }}
                        >
                          -
                        </button>
                        <span style={{ padding: '0.15rem 0.6rem', fontSize: '0.82rem', fontWeight: 600 }}>
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateCartQty(item.productId, item.size, item.color, item.quantity + 1)}
                          style={{ padding: '0.15rem 0.5rem', fontSize: '0.85rem', fontWeight: 600 }}
                        >
                          +
                        </button>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.98rem', color: 'var(--purple-950)' }}>
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.productId, item.size, item.color)}
                    style={{ position: 'absolute', top: 0, right: 0, color: 'var(--gray-400)', padding: 4 }}
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer & Checkout Action */}
        {cart.length > 0 && (
          <div style={{ padding: '1.2rem 1.5rem', borderTop: '1px solid var(--purple-100)', background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--gray-600)' }}>Subtotal:</span>
              <span style={{ fontWeight: 600 }}>₹{cartSubtotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--gray-600)' }}>Estimated Delivery:</span>
              <span>
                {shippingFee === 0 ? (
                  <span style={{ color: '#059669', fontWeight: 600 }}>FREE</span>
                ) : (
                  `₹${shippingFee}`
                )}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', fontSize: '1.1rem', fontWeight: 700, color: 'var(--purple-950)', borderTop: '1px dashed var(--gray-200)', paddingTop: '0.8rem' }}>
              <span>Total Amount:</span>
              <span style={{ fontFamily: 'var(--font-serif)' }}>₹{grandTotal}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <button 
                onClick={handleProceedCheckout}
                className="btn btn-primary"
                style={{ width: '100%', borderRadius: '8px' }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={17} />
              </button>
              <button 
                onClick={handleViewCart}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', borderRadius: '8px' }}
              >
                View Full Cart & Apply Coupon
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
