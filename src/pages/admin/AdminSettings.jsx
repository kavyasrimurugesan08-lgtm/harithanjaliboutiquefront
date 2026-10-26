import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle, ShieldAlert, Phone, MapPin, IndianRupee } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useShop } from '../../context/ShopContext';

export default function AdminSettings() {
  const { token } = useAuth();
  const { refreshData } = useShop();

  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success && data.data) {
        setSettings(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
        refreshData();
      }
    } catch (err) {
      alert('Failed to save store settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return <div style={{ padding: '2rem' }}>Loading store settings...</div>;
  }

  return (
    <div className="admin-settings animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--purple-950)', marginBottom: '0.2rem' }}>
            Boutique Store Settings
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
            Configure shipping fees, delivery thresholds, official Salem showroom address, and order routing.
          </p>
        </div>

        {savedSuccess && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#059669', fontWeight: 600, background: '#ecfdf5', padding: '0.4rem 0.9rem', borderRadius: '8px' }}>
            <CheckCircle size={16} />
            <span>Settings Saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '850px' }}>
        {/* Shipping & Delivery Thresholds */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.8rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--purple-950)', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <IndianRupee size={18} style={{ color: 'var(--purple-700)' }} />
            <span>Shipping & Currency Configuration</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#64748b', marginBottom: '0.3rem' }}>
                Default Currency
              </label>
              <input
                type="text"
                disabled
                value="INR (₹) - Indian Rupee"
                style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#64748b' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#64748b', marginBottom: '0.3rem' }}>
                Standard Shipping Fee (₹)
              </label>
              <input
                type="number"
                min="0"
                value={settings.shippingCharge || 0}
                onChange={e => setSettings({ ...settings, shippingCharge: Number(e.target.value) })}
                style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#64748b', marginBottom: '0.3rem' }}>
                Free Shipping Threshold (₹)
              </label>
              <input
                type="number"
                min="0"
                value={settings.freeShippingThreshold || 0}
                onChange={e => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
              />
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Customers whose order subtotal is ₹{settings.freeShippingThreshold} or above will automatically receive Free Express Delivery across India.
          </p>
        </div>

        {/* Store Contact & Address */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.8rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--purple-950)', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={18} style={{ color: 'var(--purple-700)' }} />
            <span>Store Address & Communication Desk</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#64748b', marginBottom: '0.3rem' }}>
                Showroom Phone Number
              </label>
              <input
                type="text"
                value={settings.phone || ''}
                onChange={e => setSettings({ ...settings, phone: e.target.value })}
                style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#64748b', marginBottom: '0.3rem' }}>
                WhatsApp Order Desk Number (with country code)
              </label>
              <input
                type="text"
                value={settings.whatsappNumber || ''}
                onChange={e => setSettings({ ...settings, whatsappNumber: e.target.value })}
                style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#64748b', marginBottom: '0.3rem' }}>
              Full Store Address
            </label>
            <input
              type="text"
              value={settings.address || ''}
              onChange={e => setSettings({ ...settings, address: e.target.value })}
              style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#64748b', marginBottom: '0.3rem' }}>
              Showroom Working Hours
            </label>
            <input
              type="text"
              value={settings.workingHours || ''}
              onChange={e => setSettings({ ...settings, workingHours: e.target.value })}
              style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
            />
          </div>
        </div>

        {/* Payment Gateways Status */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.8rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--purple-950)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldAlert size={18} style={{ color: '#b45309' }} />
            <span>Payment Gateway Readiness</span>
          </h3>

          <div style={{ padding: '1rem', background: '#fffbeb', borderRadius: '10px', border: '1px solid #fef3c7', color: '#92400e', fontSize: '0.85rem', lineHeight: 1.6 }}>
            <strong>Client Merchant Integration Notice:</strong><br />
            Direct online card/UPI payment gateways (Razorpay, PhonePe, Paytm PG) remain disabled until the client provides live merchant credentials. Currently, all orders are reliably verified and fulfilled through our official <strong>WhatsApp Order System (+91 8144052522)</strong> and <strong>Salem Store Pickup / Cash on Delivery</strong>.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary"
            style={{ borderRadius: '8px', padding: '0.8rem 2rem' }}
          >
            <Save size={18} />
            <span>{saving ? 'Saving Settings...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
