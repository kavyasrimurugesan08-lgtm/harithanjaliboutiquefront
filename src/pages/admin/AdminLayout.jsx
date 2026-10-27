import React from 'react';
import { NavLink, Outlet, Navigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Layers, 
  Boxes, 
  ClipboardList, 
  FileEdit, 
  Settings, 
  LogOut, 
  ExternalLink,
  Shield,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { isAuthenticated, loading, logout, adminUser } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--purple-50)' }}>
        <h3 style={{ color: 'var(--purple-950)' }}>Verifying Administrator Session...</h3>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: ShoppingBag },
    { name: 'Categories', path: '/admin/categories', icon: Layers },
    { name: 'Inventory & Stock', path: '/admin/inventory', icon: Boxes },
    { name: 'Customer Orders', path: '/admin/orders', icon: ClipboardList },
    { name: 'Website Content / CMS', path: '/admin/content', icon: FileEdit },
    { name: 'Store Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      {/* Sidebar Left */}
      <aside style={{
        width: '260px',
        background: 'linear-gradient(180deg, var(--purple-950) 0%, #25052c 100%)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
        boxShadow: '4px 0 20px rgba(0, 0, 0, 0.15)',
        zIndex: 30
      }}>
        {/* Brand Header */}
        <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.85rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <img 
            src="/logo.png" 
            alt="Harithanjali Boutique" 
            style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '50%', background: '#ffffff', flexShrink: 0 }} 
          />
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 800, color: '#fff', letterSpacing: '0.06em', lineHeight: 1.1 }}>
              HARITHANJALI
            </div>
            <div style={{ fontSize: '0.62rem', color: '#FFD700', letterSpacing: '0.18em', fontWeight: 700, textTransform: 'uppercase', marginTop: '0.2rem' }}>
              Admin Portal • Salem
            </div>
          </div>
        </div>

        {/* Navigation items */}
        <nav style={{ flex: 1, padding: '1.5rem 1rem', overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: isActive ? '#fff' : '#c8b8ce',
                    background: isActive ? 'linear-gradient(90deg, var(--purple-700), var(--purple-600))' : 'transparent',
                    boxShadow: isActive ? '0 4px 12px rgba(129, 37, 158, 0.4)' : 'none',
                    transition: 'all 0.2s'
                  })}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Footer info & Logout */}
        <div style={{ padding: '1.2rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1rem', padding: '0.6rem 0.8rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#FFD700', color: '#2c0836', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
              HA
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {adminUser?.name || 'Administrator'}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#b9a5be' }}>
                Store Staff
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link
              to="/"
              target="_blank"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.3rem',
                padding: '0.55rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '0.78rem',
                fontWeight: 600
              }}
              title="View Public Storefront"
            >
              <span>Live Store</span>
              <ExternalLink size={13} />
            </Link>

            <button
              onClick={logout}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.3rem',
                padding: '0.55rem 0.8rem',
                borderRadius: '8px',
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#f87171',
                fontSize: '0.78rem',
                fontWeight: 600
              }}
              title="Sign Out"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowX: 'hidden' }}>
        {/* Top Header Bar */}
        <header style={{
          height: '70px',
          background: '#fff',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem',
          position: 'sticky',
          top: 0,
          zIndex: 20
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '0.88rem', color: '#64748b' }}>Harithanjali Boutique Control Center</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#059669', background: '#ecfdf5', padding: '0.35rem 0.8rem', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
              <span>Backend Connected (Port 5001)</span>
            </div>
            <Link
              to="/"
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: '8px', padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}
            >
              <span>Visit Customer Store</span>
              <ExternalLink size={13} />
            </Link>
          </div>
        </header>

        {/* Render child dashboard page */}
        <main style={{ flex: 1, padding: '2rem' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
