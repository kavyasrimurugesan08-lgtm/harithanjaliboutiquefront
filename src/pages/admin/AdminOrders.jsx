import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, 
  Search, 
  Eye, 
  CheckCircle, 
  Truck, 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  Save
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useShop } from '../../context/ShopContext';

export default function AdminOrders() {
  const { token } = useAuth();
  const { settings } = useShop();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [activeOrder, setActiveOrder] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Form states for active order update
  const [orderStatus, setOrderStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.data) {
        setOrders(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openOrderDetail = (order) => {
    setActiveOrder(order);
    setOrderStatus(order.orderStatus);
    setPaymentStatus(order.paymentStatus);
    setTrackingNumber(order.trackingNumber || '');
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!activeOrder) return;

    try {
      setUpdating(true);
      const res = await fetch(`/api/orders/${activeOrder.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          orderStatus,
          paymentStatus,
          trackingNumber
        })
      });

      const data = await res.json();
      if (data.success) {
        setActiveOrder(data.data);
        setOrders(prev => prev.map(o => o.id === data.data.id ? data.data : o));
        alert('Order status successfully updated');
      }
    } catch (err) {
      alert('Failed to update order status');
    } finally {
      setUpdating(false);
    }
  };

  const filteredOrders = orders.filter(o => {
    if (statusFilter !== 'all' && o.orderStatus.toLowerCase() !== statusFilter.toLowerCase()) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        (o.customer?.name && o.customer.name.toLowerCase().includes(q)) ||
        (o.customer?.phone && o.customer.phone.includes(q))
      );
    }
    return true;
  });

  return (
    <div className="admin-orders animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--purple-950)', marginBottom: '0.2rem' }}>
            Customer Orders & Fulfillment
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
            Review customer delivery addresses, track payments, and update dispatch milestones.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ background: '#fff', borderRadius: '12px', padding: '1rem', border: '1px solid #e2e8f0', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8fafc', padding: '0.5rem 0.9rem', borderRadius: '8px', border: '1px solid #e2e8f0', flex: 1, minWidth: '240px' }}>
          <Search size={17} style={{ color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search by Order ID, customer name or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '0.88rem' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748b' }}>Filter Status:</span>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{ padding: '0.5rem 0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff', fontSize: '0.88rem', outline: 'none' }}
          >
            <option value="all">All Orders ({orders.length})</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>Order #</th>
              <th style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>Date</th>
              <th style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>Customer</th>
              <th style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>Items</th>
              <th style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>Total</th>
              <th style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>Payment</th>
              <th style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>Order Status</th>
              <th style={{ padding: '0.9rem 1rem', fontWeight: 600, textAlign: 'right' }}>Manage</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
                  No orders found.
                </td>
              </tr>
            ) : (
              filteredOrders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.9rem 1rem', fontWeight: 700, fontFamily: 'monospace', color: 'var(--purple-950)' }}>
                    {order.orderNumber}
                  </td>

                  <td style={{ padding: '0.9rem 1rem', fontSize: '0.8rem', color: '#64748b' }}>
                    {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>

                  <td style={{ padding: '0.9rem 1rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--purple-950)' }}>{order.customer?.name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{order.customer?.phone}</div>
                  </td>

                  <td style={{ padding: '0.9rem 1rem' }}>
                    {order.items?.length || 0} garment(s)
                  </td>

                  <td style={{ padding: '0.9rem 1rem', fontWeight: 700, color: 'var(--purple-950)' }}>
                    ₹{order.total}
                  </td>

                  <td style={{ padding: '0.9rem 1rem' }}>
                    <span className={`badge ${order.paymentStatus === 'Paid' ? 'badge-purple' : 'badge-gold'}`} style={{ fontSize: '0.7rem' }}>
                      {order.paymentStatus}
                    </span>
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
                    <button
                      onClick={() => openOrderDetail(order)}
                      className="btn btn-secondary btn-sm"
                      style={{ borderRadius: '6px', padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                    >
                      <Eye size={13} />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order Detail & Status Update Modal */}
      {activeOrder && (
        <div className="modal-backdrop" onClick={() => setActiveOrder(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '780px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
              <div>
                <span className="badge badge-purple" style={{ marginBottom: '0.3rem' }}>Boutique Order</span>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--purple-950)', fontFamily: 'monospace' }}>
                  {activeOrder.orderNumber}
                </h3>
              </div>
              <button className="icon-btn" onClick={() => setActiveOrder(null)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.8rem' }}>
              {/* Customer and Delivery info */}
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--purple-950)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={16} style={{ color: 'var(--purple-700)' }} />
                  <span>Customer & Shipping Info</span>
                </h4>
                <div style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.6 }}>
                  <div><strong>Name:</strong> {activeOrder.customer?.name}</div>
                  <div><strong>Phone:</strong> {activeOrder.customer?.phone}</div>
                  {activeOrder.customer?.email && <div><strong>Email:</strong> {activeOrder.customer?.email}</div>}
                  <div style={{ marginTop: '0.4rem' }}>
                    <strong>Address:</strong><br />
                    {activeOrder.customer?.address}, {activeOrder.customer?.city}, {activeOrder.customer?.state} - {activeOrder.customer?.pincode}
                  </div>
                  {activeOrder.notes && (
                    <div style={{ marginTop: '0.4rem', fontStyle: 'italic', color: 'var(--purple-800)' }}>
                      <strong>Client Note:</strong> {activeOrder.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Status Update Form */}
              <form onSubmit={handleUpdateStatus} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '1.2rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--purple-950)', marginBottom: '0.2rem' }}>
                  Update Order Progress
                </h4>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#64748b', marginBottom: '0.2rem' }}>
                    Order Status
                  </label>
                  <select
                    value={orderStatus}
                    onChange={e => setOrderStatus(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  >
                    <option value="Pending">Pending (New Order)</option>
                    <option value="Confirmed">Confirmed (Stock Verified)</option>
                    <option value="Shipped">Shipped (Dispatched from Salem)</option>
                    <option value="Delivered">Delivered (Completed)</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#64748b', marginBottom: '0.2rem' }}>
                    Payment Status
                  </label>
                  <select
                    value={paymentStatus}
                    onChange={e => setPaymentStatus(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  >
                    <option value="Pending">Pending Verification</option>
                    <option value="Paid">Paid / Verified In-Store</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#64748b', marginBottom: '0.2rem' }}>
                    Courier Tracking # / Pickup Token
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DTDC-SLM-99120"
                    value={trackingNumber}
                    onChange={e => setTrackingNumber(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={updating}
                  className="btn btn-primary btn-sm"
                  style={{ borderRadius: '6px', marginTop: 'auto' }}
                >
                  <Save size={14} />
                  <span>{updating ? 'Saving...' : 'Save Milestone'}</span>
                </button>
              </form>
            </div>

            {/* Items list */}
            <div>
              <h4 style={{ fontSize: '1rem', color: 'var(--purple-950)', marginBottom: '0.8rem' }}>
                Ordered Garments & Sizing Details
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {activeOrder.items?.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.6rem 0.8rem', background: '#f8fafc', borderRadius: '8px' }}>
                    <img src={item.image} alt="" style={{ width: 44, height: 52, objectFit: 'cover', borderRadius: '6px' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: 'var(--purple-950)' }}>{item.name}</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                        Size: <strong>{item.size}</strong> • Color: <strong>{item.color}</strong> • Qty: <strong>{item.quantity}</strong>
                      </div>
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--purple-950)' }}>
                      ₹{item.subtotal || item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.2rem', fontSize: '1.1rem', fontWeight: 700, color: 'var(--purple-950)', borderTop: '1px solid #e2e8f0', paddingTop: '0.8rem' }}>
                Total Order Value: ₹{activeOrder.total}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
