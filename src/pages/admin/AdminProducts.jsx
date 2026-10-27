import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Upload, 
  X, 
  Check, 
  AlertCircle, 
  Sparkles, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useShop } from '../../context/ShopContext';

export default function AdminProducts() {
  const { token } = useAuth();
  const { categories, refreshData } = useShop();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [modalError, setModalError] = useState('');

  // Form fields
  const [form, setForm] = useState({
    name: '',
    sku: '',
    category: 'sarees',
    price: '',
    salePrice: '',
    stock: 10,
    description: '',
    fabric: '',
    careInstructions: '',
    images: [''],
    sizes: 'XS, S, M, L, XL',
    colors: 'Purple, Gold',
    isFeatured: false,
    isNewArrival: true,
    status: 'published'
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success && data.data) {
        setProducts(data.data);
      }
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setForm({
      name: '',
      sku: `HB-${Math.floor(1000 + Math.random() * 9000)}`,
      category: categories[0]?.slug || 'sarees',
      price: '',
      salePrice: '',
      stock: 10,
      description: '',
      fabric: 'Pure Silk Blend',
      careInstructions: 'Dry Clean Recommended',
      images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'],
      sizes: 'XS, S, M, L, XL',
      colors: 'Royal Purple, Ivory White',
      isFeatured: false,
      isNewArrival: true,
      status: 'published'
    });
    setModalError('');
    setIsModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingProduct(p);
    setForm({
      name: p.name || '',
      sku: p.sku || '',
      category: p.category || 'sarees',
      price: p.price || '',
      salePrice: p.salePrice || '',
      stock: p.stock !== undefined ? p.stock : 10,
      description: p.description || '',
      fabric: p.fabric || '',
      careInstructions: p.careInstructions || '',
      images: p.images && p.images.length > 0 ? p.images : [''],
      sizes: Array.isArray(p.sizes) ? p.sizes.join(', ') : '',
      colors: Array.isArray(p.colors) ? p.colors.join(', ') : '',
      isFeatured: !!p.isFeatured,
      isNewArrival: !!p.isNewArrival,
      status: p.status || 'published'
    });
    setModalError('');
    setIsModalOpen(true);
  };

  const handleImageFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const fd = new FormData();
      fd.append('image', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: fd
      });

      const data = await res.json();
      if (data.success && data.url) {
        setForm(prev => ({
          ...prev,
          images: [data.url, ...prev.images.filter(Boolean)]
        }));
      } else {
        setModalError(data.message || 'Image upload failed');
      }
    } catch (err) {
      setModalError('Network error uploading image file');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setModalError('');

    if (!form.name || !form.price) {
      setModalError('Name and Price are required fields.');
      return;
    }

    const payload = {
      ...form,
      price: Number(form.price),
      salePrice: form.salePrice ? Number(form.salePrice) : null,
      stock: Number(form.stock),
      sizes: form.sizes.split(',').map(s => s.trim()).filter(Boolean),
      colors: form.colors.split(',').map(c => c.trim()).filter(Boolean),
      images: form.images.filter(Boolean)
    };

    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        fetchProducts();
        refreshData();
      } else {
        setModalError(data.message || 'Failed to save product');
      }
    } catch (err) {
      setModalError('Error saving product to backend API');
    }
  };

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        fetchProducts();
        refreshData();
      }
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  const handleQuickStockChange = async (p, newStock) => {
    const valid = Math.max(0, newStock);
    try {
      const res = await fetch(`/api/products/${p.id}/stock`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ stock: valid })
      });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => prev.map(item => item.id === p.id ? { ...item, stock: valid } : item));
        refreshData();
      }
    } catch (err) {
      console.error('Failed to update stock:', err);
    }
  };

  // Filtered view
  const displayProducts = products.filter(p => {
    if (filterCategory !== 'all' && p.category !== filterCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || (p.sku && p.sku.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div className="admin-products animate-fade-in">
      {/* Header bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--purple-950)', marginBottom: '0.2rem' }}>
            Product Catalogue Management
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
            Add, update pricing, upload images, manage variants, and publish boutique designs.
          </p>
        </div>

        <button onClick={openAddModal} className="btn btn-primary" style={{ borderRadius: '8px' }}>
          <Plus size={18} />
          <span>Add New Garment</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ background: '#fff', borderRadius: '12px', padding: '1rem', border: '1px solid #e2e8f0', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8fafc', padding: '0.5rem 0.9rem', borderRadius: '8px', border: '1px solid #e2e8f0', flex: 1, minWidth: '240px' }}>
          <Search size={17} style={{ color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search by title or SKU..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '0.88rem' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748b' }}>Category:</span>
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            style={{ padding: '0.5rem 0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff', fontSize: '0.88rem', outline: 'none' }}
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.map(c => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                <th style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>Garment</th>
                <th style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>SKU</th>
                <th style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>Category</th>
                <th style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>Price</th>
                <th style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>Stock Qty</th>
                <th style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '0.9rem 1rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
                    No products found matching your search.
                  </td>
                </tr>
              ) : (
                displayProducts.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                        <img
                          src={p.images?.[0] || '/why-choose-banner.jpg'}
                          alt={p.name}
                          style={{ width: 44, height: 54, objectFit: 'cover', borderRadius: '6px', background: 'var(--purple-50)' }}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/why-choose-banner.jpg";
                          }}
                        />
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--purple-950)' }}>{p.name}</div>
                          <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.2rem' }}>
                            {p.isFeatured && <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>Featured</span>}
                            {p.isNewArrival && <span className="badge badge-new" style={{ fontSize: '0.65rem' }}>New Arrival</span>}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td style={{ padding: '0.9rem 1rem', fontFamily: 'monospace', color: '#64748b' }}>
                      {p.sku || 'N/A'}
                    </td>

                    <td style={{ padding: '0.9rem 1rem', textTransform: 'capitalize', color: 'var(--purple-800)', fontWeight: 600 }}>
                      {p.category}
                    </td>

                    <td style={{ padding: '0.9rem 1rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--purple-950)' }}>
                        ₹{p.salePrice || p.price}
                      </div>
                      {p.salePrice && (
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                          ₹{p.price}
                        </div>
                      )}
                    </td>

                    <td style={{ padding: '0.9rem 1rem' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '6px', overflow: 'hidden' }}>
                        <button
                          onClick={() => handleQuickStockChange(p, p.stock - 1)}
                          style={{ padding: '0.15rem 0.5rem', background: '#f1f5f9', fontWeight: 600 }}
                        >
                          -
                        </button>
                        <span style={{ padding: '0.15rem 0.7rem', fontWeight: 700, color: p.stock <= 5 ? '#dc2626' : '#1e293b' }}>
                          {p.stock}
                        </span>
                        <button
                          onClick={() => handleQuickStockChange(p, p.stock + 1)}
                          style={{ padding: '0.15rem 0.5rem', background: '#f1f5f9', fontWeight: 600 }}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td style={{ padding: '0.9rem 1rem' }}>
                      <span className={`badge ${p.status === 'published' ? 'badge-purple' : 'badge-gold'}`}>
                        {p.status || 'published'}
                      </span>
                    </td>

                    <td style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => openEditModal(p)}
                          className="icon-btn"
                          style={{ width: 34, height: 34, background: '#f1f5f9', color: '#475569' }}
                          title="Edit Garment"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id, p.name)}
                          className="icon-btn"
                          style={{ width: 34, height: 34, background: '#fee2e2', color: '#ef4444' }}
                          title="Delete Garment"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '780px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--purple-950)' }}>
                {editingProduct ? 'Edit Garment Details' : 'Add New Garment to Catalog'}
              </h3>
              <button className="icon-btn" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {modalError && (
              <div style={{ padding: '0.8rem 1rem', borderRadius: '8px', background: '#fee2e2', color: '#b91c1c', fontSize: '0.85rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {/* Name & SKU */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Garment Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Amethyst Kanjivaram Silk Saree"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    SKU Code
                  </label>
                  <input
                    type="text"
                    placeholder="HB-SAR-001"
                    value={form.sku}
                    onChange={e => setForm({ ...form, sku: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Category, Price, Sale Price, Stock */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', outline: 'none' }}
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Regular Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="6999"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Sale Price (₹ Optional)
                  </label>
                  <input
                    type="number"
                    placeholder="4999"
                    value={form.salePrice}
                    onChange={e => setForm({ ...form, salePrice: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Stock Units
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={e => setForm({ ...form, stock: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Sizes and Colors */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Available Sizes (Comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="XS, S, M, L, XL, XXL"
                    value={form.sizes}
                    onChange={e => setForm({ ...form, sizes: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Available Colors (Comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Purple, Wine, Lavender"
                    value={form.colors}
                    onChange={e => setForm({ ...form, colors: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Image Upload & Image URL */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
                  Product Primary Image
                </label>
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <input
                    type="text"
                    placeholder="Image URL or upload from local computer"
                    value={form.images[0] || ''}
                    onChange={e => {
                      const updated = [...form.images];
                      updated[0] = e.target.value;
                      setForm({ ...form, images: updated });
                    }}
                    style={{ flex: 1, padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                  />
                  <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', borderRadius: '8px', flexShrink: 0 }}>
                    <Upload size={15} />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Image File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImageFileUpload}
                      disabled={uploadingImage}
                    />
                  </label>
                </div>

                {form.images[0] && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <img src={form.images[0]} alt="Preview" style={{ width: 50, height: 60, objectFit: 'cover', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                    <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>✓ Image preview active</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                  Description & Styling Highlights
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the fabric, weave, embroidery, and blouse cut..."
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                />
              </div>

              {/* Flags: Featured, New Arrival, Status */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={e => setForm({ ...form, isFeatured: e.target.checked })}
                    style={{ accentColor: 'var(--purple-700)', width: 16, height: 16 }}
                  />
                  <span>Featured on Homepage</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={form.isNewArrival}
                    onChange={e => setForm({ ...form, isNewArrival: e.target.checked })}
                    style={{ accentColor: 'var(--purple-700)', width: 16, height: 16 }}
                  />
                  <span>Mark as New Arrival</span>
                </label>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Status:</span>
                  <select
                    value={form.status}
                    onChange={e => setForm({ ...form, status: e.target.value })}
                    style={{ padding: '0.3rem 0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.85rem' }}
                  >
                    <option value="published">Published (Live)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-secondary btn-sm"
                  style={{ borderRadius: '8px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  style={{ borderRadius: '8px' }}
                >
                  <span>{editingProduct ? 'Save Changes' : 'Create Garment'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
