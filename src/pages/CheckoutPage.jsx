import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  User, 
  Mail, 
  MessageCircle, 
  Truck, 
  CreditCard, 
  AlertCircle, 
  CheckCircle, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, cartSubtotal, shippingFee, clearCart, settings, showToast, refreshData } = useShop();

  const discountAmount = location.state?.discountAmount || 0;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Salem',
    state: 'Tamil Nadu',
    pincode: '636001',
    landmark: '',
    notes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('WhatsApp Direct Confirmation');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '6rem 1rem', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--purple-950)', marginBottom: '1rem' }}>No items to checkout</h2>
        <p style={{ color: 'var(--gray-600)', marginBottom: '2rem' }}>Please select garments from our boutique catalog first.</p>
        <Link to="/shop" className="btn btn-primary">Return to Shop</Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setFormError('Please enter your full name, WhatsApp contact phone number, and delivery address.');
      return;
    }

    try {
      setSubmitting(true);
      const orderPayload = {
        customer: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          address: `${formData.address.trim()}${formData.landmark ? ', Landmark: ' + formData.landmark.trim() : ''}`,
          city: formData.city.trim(),
          state: formData.state.trim(),
          pincode: formData.pincode.trim(),
          notes: formData.notes.trim()
        },
        items: cart,
        subtotal: cartSubtotal,
        discount: discountAmount,
        shippingFee: shippingFee,
        total: finalTotal,
        paymentMethod: paymentMethod,
        paymentStatus: 'Pending'
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const data = await res.json();
      if (data.success && data.data) {
        clearCart();
        refreshData();
        // Redirect to success page with full order data and WhatsApp link
        navigate(`/order-success/${data.data.orderNumber}`, {
          state: {
            order: data.data,
            whatsappLink: data.whatsappLink
          }
        });
      } else {
        setFormError(data.message || 'Failed to place order. Please try again.');
      }
    } catch (err) {
      console.error('Order submission error:', err);
      setFormError('Network error connecting to boutique server. Please retry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="checkout-page animate-fade-in" style={{ padding: '3rem 0 6rem' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--gray-500)', marginBottom: '2rem' }}>
          <Link to="/cart" style={{ color: 'var(--gray-500)' }}>Bag</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--purple-950)', fontWeight: 600 }}>Checkout & Delivery</span>
        </div>

        <h1 style={{ fontSize: '2.4rem', color: 'var(--purple-950)', marginBottom: '2.5rem' }}>
          Finalize Your Boutique Order
        </h1>

        {formError && (
          <div style={{ padding: '1rem 1.4rem', borderRadius: '12px', background: '#fee2e2', border: '1px solid #fca5a5', color: '#b91c1c', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <AlertCircle size={20} />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmitOrder}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', alignItems: 'start' }} className="checkout-grid">
            {/* Left: Customer Information & Delivery Address */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Contact Details */}
              <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid var(--purple-100)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.4rem' }}>
                  <User size={20} style={{ color: 'var(--purple-800)' }} />
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--purple-950)' }}>Contact Details</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '0.4rem' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Priyanka Sundaram"
                      value={formData.name}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--gray-300)', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '0.4rem' }}>
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. 9840123456"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--gray-300)', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '0.4rem' }}>
                    Email Address (Optional for invoice)
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. priyanka@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--gray-300)', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid var(--purple-100)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.4rem' }}>
                  <MapPin size={20} style={{ color: 'var(--purple-800)' }} />
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--purple-950)' }}>Shipping Address</h3>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '0.4rem' }}>
                    Street Address / Flat / Building No. *
                  </label>
                  <textarea
                    rows={2}
                    name="address"
                    required
                    placeholder="Door / Flat No., Street Name, Area"
                    value={formData.address}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--gray-300)', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }} className="form-row">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '0.4rem' }}>
                      Nearest Landmark
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      placeholder="e.g. Near Perumal Temple"
                      value={formData.landmark}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--gray-300)', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '0.4rem' }}>
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--gray-300)', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }} className="form-row">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '0.4rem' }}>
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--gray-300)', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '0.4rem' }}>
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--gray-300)', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '0.4rem' }}>
                    Special Sizing or Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    name="notes"
                    placeholder="e.g. Please alter kurti chest by +1 inch or call before delivery"
                    value={formData.notes}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--gray-300)', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Payment Method Selection */}
              <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid var(--purple-100)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.4rem' }}>
                  <CreditCard size={20} style={{ color: 'var(--purple-800)' }} />
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--purple-950)' }}>Select Payment Method</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Option 1: WhatsApp Direct Confirmation */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      padding: '1.2rem',
                      borderRadius: '12px',
                      border: paymentMethod === 'WhatsApp Direct Confirmation' ? '2px solid #25D366' : '1px solid var(--gray-300)',
                      background: paymentMethod === 'WhatsApp Direct Confirmation' ? 'rgba(37, 211, 102, 0.06)' : '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="WhatsApp Direct Confirmation"
                      checked={paymentMethod === 'WhatsApp Direct Confirmation'}
                      onChange={() => setPaymentMethod('WhatsApp Direct Confirmation')}
                      style={{ marginTop: 4, accentColor: '#25D366' }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--purple-950)', fontSize: '0.96rem' }}>
                        <MessageCircle size={17} style={{ color: '#25D366' }} />
                        <span>WhatsApp Direct Order & Instant Confirmation (Recommended)</span>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--gray-600)', marginTop: '0.3rem' }}>
                        Your order is securely registered in our system and an instant WhatsApp confirmation with full itemized details will open to chat directly with Harithanjali Boutique (+91 8144052522).
                      </p>
                    </div>
                  </label>

                  {/* Option 2: Store Pickup / Cash on Delivery */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      padding: '1.2rem',
                      borderRadius: '12px',
                      border: paymentMethod === 'Store Pickup / COD' ? '2px solid var(--purple-700)' : '1px solid var(--gray-300)',
                      background: paymentMethod === 'Store Pickup / COD' ? 'var(--purple-50)' : '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Store Pickup / COD"
                      checked={paymentMethod === 'Store Pickup / COD'}
                      onChange={() => setPaymentMethod('Store Pickup / COD')}
                      style={{ marginTop: 4, accentColor: 'var(--purple-700)' }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--purple-950)', fontSize: '0.96rem' }}>
                        <Truck size={17} style={{ color: 'var(--purple-700)' }} />
                        <span>Cash on Delivery / Direct Salem Store Pickup</span>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--gray-600)', marginTop: '0.3rem' }}>
                        Pay when you inspect and collect at our boutique in Seelanaickanpatti, Salem or upon courier delivery.
                      </p>
                    </div>
                  </label>

                  {/* Note on Online Gateway */}
                  <div style={{
                    padding: '0.9rem 1.1rem',
                    borderRadius: '10px',
                    background: '#f8fafc',
                    border: '1px dashed #cbd5e1',
                    fontSize: '0.8rem',
                    color: '#64748b'
                  }}>
                    ℹ️ <em>Online Credit Card / UPI Payment Gateway integration will be enabled once client merchant credentials (Razorpay/PhonePe) are provided. All transactions are currently confirmed via official WhatsApp & verified store fulfillment.</em>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Order Review & Placement */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid var(--purple-100)', padding: '2rem', boxShadow: 'var(--shadow-sm)', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--purple-950)', marginBottom: '1.2rem' }}>
                Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
              </h3>

              {/* Items mini list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: '240px', overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '0.3rem' }}>
                {cart.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', fontSize: '0.88rem' }}>
                    <img src={item.image} alt="" style={{ width: 44, height: 52, objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, color: 'var(--purple-950)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                        {item.size} • {item.color} • Qty: {item.quantity}
                      </div>
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--purple-950)' }}>
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              {/* Financials */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', borderTop: '1px solid var(--gray-200)', paddingTop: '1rem', marginBottom: '1.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--gray-600)' }}>
                  <span>Subtotal:</span>
                  <span>₹{cartSubtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
                    <span>Coupon Discount:</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--gray-600)' }}>
                  <span>Shipping Fee:</span>
                  <span>{shippingFee === 0 ? <strong style={{ color: '#059669' }}>FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px dashed var(--gray-200)', paddingTop: '0.8rem', marginTop: '0.4rem' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--purple-950)' }}>Total Payable:</span>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.7rem', fontWeight: 700, color: 'var(--purple-950)' }}>
                    ₹{finalTotal}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', borderRadius: '10px' }}
              >
                {submitting ? (
                  <span>Recording Order...</span>
                ) : (
                  <>
                    <span>Confirm & Place Order</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1rem', fontSize: '0.78rem', color: 'var(--gray-500)' }}>
                <ShieldCheck size={16} style={{ color: '#059669' }} />
                <span>Harithanjali Boutique Salem official fulfillment</span>
              </div>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
