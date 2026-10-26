import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.message || 'Invalid email or password. Please try again.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--purple-950) 0%, #2b0834 50%, #15031b 100%)',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '440px',
        width: '100%',
        background: '#fff',
        borderRadius: '24px',
        padding: '3rem 2.2rem',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img 
            src="/logo.png" 
            alt="Harithanjali Boutique Logo" 
            style={{ 
              width: 80, 
              height: 80, 
              borderRadius: '50%', 
              objectFit: 'contain', 
              margin: '0 auto 1.2rem',
              display: 'block',
              boxShadow: '0 8px 24px rgba(74, 18, 91, 0.25)',
              border: '3px solid #fff'
            }} 
          />

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--purple-950)', marginBottom: '0.2rem' }}>
            Harithanjali Boutique
          </h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--gold-dark)', letterSpacing: '0.15em', fontWeight: 700, textTransform: 'uppercase' }}>
            Store Management Portal
          </p>
        </div>

        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.8rem 1rem', borderRadius: '10px', background: '#fee2e2', border: '1px solid #fca5a5', color: '#b91c1c', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '0.4rem' }}>
              Staff Email Address
            </label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--gray-300)', borderRadius: '8px', padding: '0 0.8rem', background: '#fff' }}>
              <Mail size={17} style={{ color: 'var(--gray-400)', marginRight: '0.5rem', flexShrink: 0 }} />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter admin email address"
                style={{ width: '100%', padding: '0.75rem 0', border: 'none', outline: 'none', fontSize: '0.9rem' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '0.4rem' }}>
              Password
            </label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--gray-300)', borderRadius: '8px', padding: '0 0.8rem', background: '#fff' }}>
              <Lock size={17} style={{ color: 'var(--gray-400)', marginRight: '0.5rem', flexShrink: 0 }} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter admin password"
                style={{ width: '100%', padding: '0.75rem 0', border: 'none', outline: 'none', fontSize: '0.9rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: showPassword ? 'var(--purple-700)' : 'var(--gray-400)',
                  padding: '0.3rem',
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '0.4rem',
                  transition: 'color 0.2s'
                }}
                title={showPassword ? 'Hide password' : 'Show password'}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', borderRadius: '10px', padding: '0.85rem', marginTop: '0.5rem' }}
          >
            {loading ? <span>Verifying...</span> : <span>Sign In to Admin Panel</span>}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--gray-600)' }}>
            <ArrowLeft size={15} />
            <span>Return to Harithanjali Storefront</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
