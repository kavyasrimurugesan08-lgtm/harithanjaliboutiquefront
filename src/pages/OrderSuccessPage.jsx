import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, Package, ArrowRight, MapPin, Phone, Calendar } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function OrderSuccessPage() {
  const { orderId } = useParams();
  const location = useLocation();
  const { settings } = useShop();

  const [order, setOrder] = useState(location.state?.order || null);
  const [whatsappLink, setWhatsappLink] = useState(location.state?.whatsappLink || '');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!order) {
      // Fetch order by ID or orderNumber
      fetch(`/api/orders/${orderId}`)
        .then(r => r.json())
        .then(data => {
          if (data.success && data.data) {
            setOrder(data.data);
            const waNumber = settings?.whatsappNumber || '918144052522';
            const waText = encodeURIComponent(
              `🛍️ *ORDER CONFIRMATION - HARITHANJALI BOUTIQUE*\n` +
              `*Order ID:* ${data.data.orderNumber}\n` +
              `*Name:* ${data.data.customer?.name}\n` +
              `*Total:* ₹${data.data.total}\n\n` +
              `Hi, I have placed this order on the website and would like to confirm my dispatch schedule.`
            );
            setWhatsappLink(`https://wa.me/${waNumber}?text=${waText}`);
          }
        })
        .catch(err => console.error(err));
    }
  }, [orderId]);

  return (
    <div className="order-success-page animate-fade-in" style={{ padding: '4rem 0 7rem', background: 'var(--purple-50)', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '750px' }}>
        <div style={{ background: '#fff', borderRadius: '24px', padding: '3rem 2.5rem', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--purple-100)', textAlign: 'center' }}>
          {/* Success Check Icon */}
          <div style={{
            width: 84,
            height: 84,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            color: '#fff',
            boxShadow: '0 10px 25px rgba(16, 185, 129, 0.35)'
          }}>
            <CheckCircle2 size={48} />
          </div>

          <span className="badge badge-purple" style={{ marginBottom: '0.6rem' }}>
            Order Successfully Placed
          </span>

          <h1 style={{ fontSize: '2.3rem', color: 'var(--purple-950)', marginBottom: '0.5rem' }}>
            Thank You For Shopping With Us!
          </h1>

          <p style={{ color: 'var(--gray-600)', fontSize: '1rem', marginBottom: '2rem' }}>
            Your order has been recorded in our Salem boutique system. Our team is preparing your pieces with care.
          </p>

          {/* Order Details Highlight Box */}
          <div style={{
            padding: '1.4rem 1.8rem',
            borderRadius: '16px',
            background: 'var(--purple-50)',
            border: '1.5px dashed var(--purple-300)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            gap: '1rem',
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--gray-500)', textTransform: 'uppercase', fontWeight: 600 }}>
                Order Number
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--purple-950)', fontFamily: 'monospace' }}>
                {order?.orderNumber || orderId}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--gray-500)', textTransform: 'uppercase', fontWeight: 600 }}>
                Order Status
              </div>
              <span className="badge badge-gold">
                {order?.orderStatus || 'Pending Confirmation'}
              </span>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--gray-500)', textTransform: 'uppercase', fontWeight: 600 }}>
                Total Amount
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--purple-950)', fontFamily: 'var(--font-serif)' }}>
                ₹{order?.total || 0}
              </div>
            </div>
          </div>

          {/* 1-Click WhatsApp Button */}
          {whatsappLink && (
            <div style={{ marginBottom: '2.5rem' }}>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp btn-lg"
                style={{ width: '100%', borderRadius: '12px', padding: '1.1rem' }}
              >
                <MessageCircle size={22} />
                <span>Confirm Order on WhatsApp (+91 8144052522)</span>
              </a>
              <p style={{ fontSize: '0.82rem', color: 'var(--gray-500)', marginTop: '0.6rem' }}>
                Click to send your order receipt directly to our Salem boutique for fast dispatch confirmation!
              </p>
            </div>
          )}

          {/* Itemized Order Breakdown */}
          {order?.items && order.items.length > 0 && (
            <div style={{ textAlign: 'left', borderTop: '1px solid var(--gray-200)', paddingTop: '1.5rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--purple-950)', marginBottom: '1rem' }}>
                Ordered Garments
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {order.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingBottom: '0.8rem', borderBottom: '1px solid var(--gray-100)' }}>
                    <img 
                      src={item.image || '/why-choose-banner.jpg'} 
                      alt="" 
                      style={{ width: 48, height: 58, objectFit: 'cover', borderRadius: '6px' }} 
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/why-choose-banner.jpg";
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: 'var(--purple-950)', fontSize: '0.95rem' }}>{item.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>
                        {item.size} • {item.color} • Qty: {item.quantity}
                      </div>
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--purple-950)' }}>
                      ₹{item.subtotal || item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shipping Address Summary */}
          {order?.customer && (
            <div style={{ textAlign: 'left', background: 'var(--purple-50)', padding: '1.2rem', borderRadius: '12px', marginBottom: '2.5rem', fontSize: '0.88rem' }}>
              <div style={{ fontWeight: 700, color: 'var(--purple-950)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={16} style={{ color: 'var(--purple-700)' }} />
                <span>Delivery Address:</span>
              </div>
              <div style={{ color: 'var(--gray-700)' }}>
                <strong>{order.customer.name}</strong> ({order.customer.phone})<br />
                {order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}
              </div>
            </div>
          )}

          {/* Back to Home / Shop buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/" className="btn btn-secondary">
              Return to Storefront
            </Link>
            <Link to="/shop" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
