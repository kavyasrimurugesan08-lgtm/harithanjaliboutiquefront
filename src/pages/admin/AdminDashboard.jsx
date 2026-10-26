import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  IndianRupee, 
  Boxes, 
  AlertTriangle, 
  Clock, 
  ArrowRight, 
  Plus, 
  CheckCircle, 
  Truck,
  TrendingUp,
  FileEdit
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/settings/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.data) {
        setStats(data.data);
      }
    } catch (err) {
      console.error('Failed to load stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [token]);

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading boutique performance analytics...</div>;
  }

  const {
    totalOrders = 0,
    totalRevenue = 0,
    pendingOrders = 0,
    totalProducts = 0,
    lowStockCount = 0,
    recentOrders = []
  } = stats || {};

  return (
    <div className="admin-dashboard animate-fade-in">
      {/* Top Banner / Welcome */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--purple-950)', marginBottom: '0.3rem' }}>
            Boutique Overview
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Monitor real-time customer purchases, stock health, and Salem showroom fulfillment.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <Link to="/admin/products" className="btn btn-primary btn-sm" style={{ borderRadius: '8px' }}>
            <Plus size={16} />
            <span>Add New Product</span>
          </Link>
          <Link to="/admin/content" className="btn btn-secondary btn-sm" style={{ borderRadius: '8px' }}>
            <FileEdit size={16} />
            <span>Update Store CMS</span>
          </Link>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        {/* Total Orders */}
        <div style={{ background: '#fff', borderRadius: '14px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Total Orders</span>
            <div style={{ width: 38, height: 38, borderRadius: '8px', background: 'var(--purple-100)', color: 'var(--purple-800)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingBag size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--purple-950)', fontFamily: 'var(--font-serif)' }}>
            {totalOrders}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.4rem' }}>
            Customer orders recorded
          </div>
        </div>

        {/* Verified Revenue */}
        <div style={{ background: '#fff', borderRadius: '14px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Delivered / Paid Sales</span>
            <div style={{ width: 38, height: 38, borderRadius: '8px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--font-serif)' }}>
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.4rem' }}>
            Verified realized revenue
          </div>
        </div>

        {/* Pending Orders */}
        <div style={{ background: '#fff', borderRadius: '14px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Pending Orders</span>
            <div style={{ width: 38, height: 38, borderRadius: '8px', background: '#fffbeb', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#b45309', fontFamily: 'var(--font-serif)' }}>
            {pendingOrders}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.4rem' }}>
            Awaiting store dispatch confirmation
          </div>
        </div>

        {/* Total Products */}
        <div style={{ background: '#fff', borderRadius: '14px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Active Catalog</span>
            <div style={{ width: 38, height: 38, borderRadius: '8px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Boxes size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--purple-950)', fontFamily: 'var(--font-serif)' }}>
            {totalProducts}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.4rem' }}>
            Published designs in boutique
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div style={{ background: '#fff', borderRadius: '14px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Low Stock Items</span>
            <div style={{ width: 38, height: 38, borderRadius: '8px', background: '#fef2f2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--font-serif)' }}>
            {lowStockCount}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.4rem' }}>
            Items with 5 or fewer units left
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.8rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--purple-950)', marginBottom: '0.2rem' }}>
              Recent Customer Orders
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
              Latest customer purchases placed on the Harithanjali website.
            </p>
          </div>
          <Link to="/admin/orders" className="btn btn-secondary btn-sm" style={{ borderRadius: '8px' }}>
            <span>View All Orders</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#64748b' }}>
            No customer orders recorded yet.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  <th style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>Order #</th>
                  <th style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>Customer</th>
                  <th style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>Items</th>
                  <th style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>Total</th>
                  <th style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>Payment Method</th>
                  <th style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '0.8rem 1rem', fontWeight: 600, textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.9rem 1rem', fontWeight: 700, fontFamily: 'monospace', color: 'var(--purple-950)' }}>
                      {order.orderNumber}
                    </td>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <div style={{ fontWeight: 600, color: '#1e293b' }}>{order.customer?.name}</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{order.customer?.phone}</div>
                    </td>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      {order.items?.length || 0} item(s)
                    </td>
                    <td style={{ padding: '0.9rem 1rem', fontWeight: 700, color: 'var(--purple-950)' }}>
                      ₹{order.total}
                    </td>
                    <td style={{ padding: '0.9rem 1rem', fontSize: '0.82rem', color: '#475569' }}>
                      {order.paymentMethod}
                    </td>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <span className={`badge ${
                        order.orderStatus === 'Delivered' ? 'badge-purple' :
                        order.orderStatus === 'Confirmed' ? 'badge-gold' :
                        order.orderStatus === 'Shipped' ? 'badge-new' :
                        'badge-sale'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>
                      <Link to="/admin/orders" style={{ color: 'var(--purple-700)', fontWeight: 600, fontSize: '0.82rem' }}>
                        Manage →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
