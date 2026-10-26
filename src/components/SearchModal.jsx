import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, products, settings } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filtered = query.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(query.toLowerCase())) ||
        (p.sku && p.sku.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6)
    : [];

  const handleSelectProduct = (product) => {
    setIsSearchOpen(false);
    navigate(`/product/${product.id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSearchOpen(false);
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsSearchOpen(false)}>
      <div 
        className="modal-card" 
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '650px', borderRadius: '16px', overflow: 'hidden' }}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', padding: '1.2rem 1.5rem', borderBottom: '1px solid var(--purple-100)', gap: '0.8rem' }}>
          <Search size={22} style={{ color: 'var(--purple-700)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search sarees, anarkalis, kurtis, co-ords..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1.05rem',
              color: 'var(--purple-950)',
              background: 'transparent'
            }}
          />
          {query && (
            <button 
              type="button" 
              onClick={() => setQuery('')}
              style={{ color: 'var(--gray-400)', padding: 4 }}
            >
              <X size={18} />
            </button>
          )}
          <button 
            type="button" 
            onClick={() => setIsSearchOpen(false)}
            className="icon-btn"
            style={{ width: 34, height: 34 }}
          >
            <X size={18} />
          </button>
        </form>

        {/* Quick Suggestions & Live Results */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '1.2rem 1.5rem' }}>
          {query.trim() === '' ? (
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.8rem' }}>
                Popular Searches
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Silk Saree', 'Georgette Anarkali', 'Chanderi Kurti', 'Co-ord Set', 'Bridal Lehenga', 'Purple Saree'].map(term => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setQuery(term);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.45rem 0.9rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--purple-50)',
                      color: 'var(--purple-900)',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      border: '1px solid var(--purple-100)'
                    }}
                  >
                    <Tag size={13} style={{ color: 'var(--purple-600)' }} />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : filtered.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--gray-500)', fontWeight: 600 }}>
                {filtered.length} products found
              </div>
              {filtered.map(product => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.6rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    border: '1px solid transparent'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--purple-50)';
                    e.currentTarget.style.borderColor = 'var(--purple-100)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    style={{ width: 50, height: 60, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--purple-700)', textTransform: 'uppercase', fontWeight: 600 }}>
                      {product.category}
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--gray-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {product.name}
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--purple-950)' }}>
                      ₹{product.salePrice || product.price}
                      {product.salePrice && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)', textDecoration: 'line-through', marginLeft: 6 }}>
                          ₹{product.price}
                        </span>
                      )}
                    </div>
                  </div>
                  <ArrowRight size={16} style={{ color: 'var(--gray-400)' }} />
                </div>
              ))}
              <button
                type="button"
                onClick={handleSearchSubmit}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                View all results for "{query}"
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--gray-500)' }}>
              <p style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--gray-800)' }}>
                No designs found for "{query}"
              </p>
              <p style={{ fontSize: '0.85rem' }}>
                Try searching for sarees, kurtis, anarkalis, or co-ord sets.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
