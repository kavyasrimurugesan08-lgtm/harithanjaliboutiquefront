import React, { useState, useEffect } from 'react';
import { Boxes, AlertTriangle, CheckCircle, Search, RefreshCw, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useShop } from '../../context/ShopContext';

export default function AdminInventory() {
  const { token } = useAuth();
  const { refreshData } = useShop();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [onlyLowStock, setOnlyLowStock] = useState(false);
  const [stockChanges, setStockChanges] = useState({});
  const [savingId, setSavingId] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success && data.data) {
        setProducts(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleStockInputChange = (id, val) => {
    setStockChanges(prev => ({
      ...prev,
      [id]: Math.max(0, parseInt(val) || 0)
    }));
  };

  const saveSingleStock = async (product) => {
    const newStock = stockChanges[product.id];
    if (newStock === undefined) return;

    try {
      setSavingId(product.id);
      const res = await fetch(`/api/products/${product.id}/stock`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ stock: newStock })
      });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => prev.map(p => p.id === product.id ? { ...p, stock: newStock } : p));
        setStockChanges(prev => {
          const updated = { ...prev };
          delete updated[product.id];
          return updated;
        });
        refreshData();
      }
    } catch (err) {
      alert('Failed to update stock');
    } finally {
      setSavingId(null);
    }
  };

  const filtered = products.filter(p => {
    if (onlyLowStock && p.stock > 5) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || (p.sku && p.sku.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div className="admin-inventory animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--purple-950)', marginBottom: '0.2rem' }}>
            Inventory & Variant Stock Management
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
            Monitor real-time inventory counts and prevent overselling across online and Salem store orders.
          </p>
        </div>

        <button onClick={fetchProducts} className="btn btn-secondary btn-sm" style={{ borderRadius: '8px' }}>
          <RefreshCw size={15} />
          <span>Refresh Stock</span>
        </button>
      </div>

      {/* Control Bar */}
      <div style={{ background: '#fff', borderRadius: '12px', padding: '1rem', border: '1px solid #e2e8f0', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8fafc', padding: '0.5rem 0.9rem', borderRadius: '8px', border: '1px solid #e2e8f0', flex: 1, minWidth: '240px' }}>
          <Search size={17} style={{ color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search garment or SKU..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '0.88rem' }}
          />
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={onlyLowStock}
            onChange={e => setOnlyLowStock(e.target.checked)}
            style={{ accentColor: '#dc2626', width: 16, height: 16 }}
          />
          <span>Show Low Stock Only (≤ 5 units)</span>
        </label>
      </div>

      {/* Inventory Table */}
      <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>Garment</th>
              <th style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>SKU</th>
              <th style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>Sizes & Colors</th>
              <th style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>Stock Status</th>
              <th style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>Current Units</th>
              <th style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>Update Stock</th>
              <th style={{ padding: '0.9rem 1rem', fontWeight: 600, textAlign: 'right' }}>Save</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const hasUnsaved = stockChanges[p.id] !== undefined && stockChanges[p.id] !== p.stock;
              const isLow = p.stock <= 5;
              const isOut = p.stock === 0;

              return (
                <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.9rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <img src={p.images?.[0]} alt="" style={{ width: 40, height: 48, objectFit: 'cover', borderRadius: '6px' }} />
                      <div style={{ fontWeight: 600, color: 'var(--purple-950)' }}>{p.name}</div>
                    </div>
                  </td>

                  <td style={{ padding: '0.9rem 1rem', fontFamily: 'monospace', color: '#64748b' }}>
                    {p.sku || 'N/A'}
                  </td>

                  <td style={{ padding: '0.9rem 1rem', fontSize: '0.8rem', color: '#475569' }}>
                    <div>Sizes: {p.sizes?.slice(0, 3).join(', ')}...</div>
                    <div style={{ color: '#64748b' }}>Colors: {p.colors?.join(', ')}</div>
                  </td>

                  <td style={{ padding: '0.9rem 1rem' }}>
                    {isOut ? (
                      <span className="badge badge-sale">Out of Stock</span>
                    ) : isLow ? (
                      <span className="badge badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <AlertTriangle size={12} /> Low Stock ({p.stock})
                      </span>
                    ) : (
                      <span className="badge badge-purple" style={{ color: '#059669', background: '#ecfdf5' }}>
                        Healthy ({p.stock})
                      </span>
                    )}
                  </td>

                  <td style={{ padding: '0.9rem 1rem', fontWeight: 700, color: 'var(--purple-950)' }}>
                    {p.stock} pcs
                  </td>

                  <td style={{ padding: '0.9rem 1rem' }}>
                    <input
                      type="number"
                      min="0"
                      value={stockChanges[p.id] !== undefined ? stockChanges[p.id] : p.stock}
                      onChange={e => handleStockInputChange(p.id, e.target.value)}
                      style={{
                        width: '80px',
                        padding: '0.35rem 0.6rem',
                        borderRadius: '6px',
                        border: hasUnsaved ? '2px solid var(--purple-700)' : '1px solid #cbd5e1',
                        background: hasUnsaved ? 'var(--purple-50)' : '#fff',
                        fontWeight: 700
                      }}
                    />
                  </td>

                  <td style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>
                    <button
                      onClick={() => saveSingleStock(p)}
                      disabled={!hasUnsaved || savingId === p.id}
                      className="btn btn-primary btn-sm"
                      style={{
                        padding: '0.35rem 0.8rem',
                        fontSize: '0.78rem',
                        borderRadius: '6px',
                        opacity: hasUnsaved ? 1 : 0.4
                      }}
                    >
                      <Save size={13} />
                      <span>{savingId === p.id ? 'Saving...' : 'Update'}</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
