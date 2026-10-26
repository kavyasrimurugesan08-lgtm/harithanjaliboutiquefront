import React, { useState, useEffect } from 'react';
import { FileEdit, Save, Sparkles, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useShop } from '../../context/ShopContext';

export default function AdminContent() {
  const { token } = useAuth();
  const { refreshData } = useShop();

  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/content');
      const data = await res.json();
      if (data.success && data.data) {
        setContent(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(content)
      });
      const data = await res.json();
      if (data.success) {
        setSavedMessage(true);
        setTimeout(() => setSavedMessage(false), 3000);
        refreshData();
      }
    } catch (err) {
      alert('Failed to save CMS updates');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return <div style={{ padding: '2rem' }}>Loading CMS Editor...</div>;
  }

  return (
    <div className="admin-content animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--purple-950)', marginBottom: '0.2rem' }}>
            Storefront Content Management (CMS)
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
            Update homepage hero banners, announcement bar, brand stories, and promo offers without editing code.
          </p>
        </div>

        {savedMessage && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#059669', fontWeight: 600, background: '#ecfdf5', padding: '0.4rem 0.9rem', borderRadius: '8px' }}>
            <CheckCircle size={16} />
            <span>Content Saved & Published Live!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* 1. Announcement Bar */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.8rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--purple-950)', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} style={{ color: 'var(--purple-700)' }} />
            <span>Top Promotional Announcement Bar</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={content.announcement?.enabled || false}
                onChange={e => setContent({
                  ...content,
                  announcement: { ...content.announcement, enabled: e.target.checked }
                })}
                style={{ accentColor: 'var(--purple-700)', width: 16, height: 16 }}
              />
              <span>Enable Announcement Bar on Storefront</span>
            </label>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#64748b', marginBottom: '0.3rem' }}>
                Announcement Message Text
              </label>
              <input
                type="text"
                value={content.announcement?.text || ''}
                onChange={e => setContent({
                  ...content,
                  announcement: { ...content.announcement, text: e.target.value }
                })}
                style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
              />
            </div>
          </div>
        </div>

        {/* 2. Homepage Hero Section */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.8rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--purple-950)', marginBottom: '1.2rem' }}>
            Homepage Main Hero Section
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.2rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#64748b', marginBottom: '0.3rem' }}>
                Hero Badge Tag
              </label>
              <input
                type="text"
                value={content.hero?.badge || ''}
                onChange={e => setContent({
                  ...content,
                  hero: { ...content.hero, badge: e.target.value }
                })}
                style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#64748b', marginBottom: '0.3rem' }}>
                Primary Headline Title
              </label>
              <input
                type="text"
                value={content.hero?.title || ''}
                onChange={e => setContent({
                  ...content,
                  hero: { ...content.hero, title: e.target.value }
                })}
                style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#64748b', marginBottom: '0.3rem' }}>
              Sub-headline / Tagline Description
            </label>
            <textarea
              rows={2}
              value={content.hero?.subtitle || ''}
              onChange={e => setContent({
                ...content,
                hero: { ...content.hero, subtitle: e.target.value }
              })}
              style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#64748b', marginBottom: '0.3rem' }}>
              Hero Fashion Image URL
            </label>
            <input
              type="text"
              value={content.hero?.imageUrl || ''}
              onChange={e => setContent({
                ...content,
                hero: { ...content.hero, imageUrl: e.target.value }
              })}
              style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
            />
          </div>
        </div>

        {/* 3. Promo Banner Section */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.8rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--purple-950)', marginBottom: '1.2rem' }}>
            Seasonal Promo Banner & Coupon
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.2rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#64748b', marginBottom: '0.3rem' }}>
                Promo Title
              </label>
              <input
                type="text"
                value={content.promoBanner?.title || ''}
                onChange={e => setContent({
                  ...content,
                  promoBanner: { ...content.promoBanner, title: e.target.value }
                })}
                style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#64748b', marginBottom: '0.3rem' }}>
                Promo Coupon Code
              </label>
              <input
                type="text"
                value={content.promoBanner?.discountCode || ''}
                onChange={e => setContent({
                  ...content,
                  promoBanner: { ...content.promoBanner, discountCode: e.target.value }
                })}
                style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', textTransform: 'uppercase' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#64748b', marginBottom: '0.3rem' }}>
              Promo Image URL
            </label>
            <input
              type="text"
              value={content.promoBanner?.imageUrl || ''}
              onChange={e => setContent({
                ...content,
                promoBanner: { ...content.promoBanner, imageUrl: e.target.value }
              })}
              style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
            />
          </div>
        </div>

        {/* 4. About Us Story */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.8rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--purple-950)', marginBottom: '1.2rem' }}>
            About Us Brand Story
          </h3>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#64748b', marginBottom: '0.3rem' }}>
              Page Headline
            </label>
            <input
              type="text"
              value={content.about?.title || ''}
              onChange={e => setContent({
                ...content,
                about: { ...content.about, title: e.target.value }
              })}
              style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#64748b', marginBottom: '0.3rem' }}>
              Full Brand Narrative
            </label>
            <textarea
              rows={4}
              value={content.about?.story || ''}
              onChange={e => setContent({
                ...content,
                about: { ...content.about, story: e.target.value }
              })}
              style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
            />
          </div>
        </div>

        {/* Save button sticky bar */}
        <div style={{ position: 'sticky', bottom: '20px', zIndex: 10, background: 'rgba(255, 255, 255, 0.92)', backdropFilter: 'blur(8px)', padding: '1rem', borderRadius: '14px', border: '1px solid #cbd5e1', boxShadow: 'var(--shadow-lg)', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary"
            style={{ borderRadius: '8px', padding: '0.8rem 2rem' }}
          >
            <Save size={18} />
            <span>{saving ? 'Publishing Updates...' : 'Publish Content Live'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
