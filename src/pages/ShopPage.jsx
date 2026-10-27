import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Filter, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Heart, 
  ShoppingBag, 
  ChevronRight, 
  X, 
  Search,
  Sparkles,
  Check
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories, addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filters from query params or state
  const selectedCategory = searchParams.get('category') || 'all';
  const isNewArrivalOnly = searchParams.get('new') === 'true';
  const urlSearch = searchParams.get('search') || '';

  const [search, setSearch] = useState(urlSearch);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [priceRange, setPriceRange] = useState(25000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size (Includes Blouse)', 'Free Size (2.5m)', 'Semi-Stitched (Fits XS to XXL)'];
  const allColors = ['Deep Purple', 'Burgundy Wine', 'Soft Lavender', 'Mustard Yellow', 'Royal Cobalt Blue', 'Crimson Red', 'Tangerine Orange', 'Ivory White', 'Plum Purple'];

  // Toggle size filter
  const toggleSize = (sz) => {
    setSelectedSizes(prev => 
      prev.includes(sz) ? prev.filter(s => s !== sz) : [...prev, sz]
    );
  };

  // Set category
  const handleCategoryChange = (slug) => {
    const newParams = new URLSearchParams(searchParams);
    if (slug === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', slug);
    }
    setSearchParams(newParams);
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedSizes([]);
    setSelectedColor('');
    setPriceRange(25000);
    setInStockOnly(false);
    setSearch('');
    setSearchParams({});
  };

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products.filter(item => {
      // Category
      if (selectedCategory !== 'all' && item.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // New arrivals
      if (isNewArrivalOnly && !item.isNewArrival) {
        return false;
      }
      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const matches = 
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          (item.sku && item.sku.toLowerCase().includes(q)) ||
          item.category.toLowerCase().includes(q);
        if (!matches) return false;
      }
      // Price
      const effectivePrice = item.salePrice || item.price;
      if (effectivePrice > priceRange) {
        return false;
      }
      // Sizes
      if (selectedSizes.length > 0) {
        const hasSize = item.sizes?.some(s => selectedSizes.includes(s));
        if (!hasSize) return false;
      }
      // Color
      if (selectedColor) {
        const hasColor = item.colors?.some(c => c.toLowerCase().includes(selectedColor.toLowerCase()));
        if (!hasColor) return false;
      }
      // In stock
      if (inStockOnly && item.stock <= 0) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;
      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0; // default featured
    });
  }, [products, selectedCategory, isNewArrivalOnly, search, priceRange, selectedSizes, selectedColor, inStockOnly, sortBy]);

  // Sidebar filter component
  const FilterContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Category List */}
      <div>
        <h4 style={{ fontSize: '0.92rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--purple-950)', marginBottom: '1rem' }}>
          Categories
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
          <button
            onClick={() => handleCategoryChange('all')}
            style={{
              textAlign: 'left',
              padding: '0.4rem 0.6rem',
              borderRadius: '6px',
              fontWeight: selectedCategory === 'all' ? 700 : 500,
              color: selectedCategory === 'all' ? 'var(--purple-800)' : 'var(--gray-700)',
              background: selectedCategory === 'all' ? 'var(--purple-50)' : 'transparent',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <span>All Designs</span>
            <span>({products.length})</span>
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.slug)}
              style={{
                textAlign: 'left',
                padding: '0.4rem 0.6rem',
                borderRadius: '6px',
                fontWeight: selectedCategory === cat.slug ? 700 : 500,
                color: selectedCategory === cat.slug ? 'var(--purple-800)' : 'var(--gray-700)',
                background: selectedCategory === cat.slug ? 'var(--purple-50)' : 'transparent',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <span>{cat.name}</span>
              <span>({products.filter(p => p.category.toLowerCase() === cat.slug.toLowerCase()).length})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
          <h4 style={{ fontSize: '0.92rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--purple-950)' }}>
            Max Price
          </h4>
          <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--purple-950)' }}>
            ₹{priceRange.toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min="1000"
          max="25000"
          step="500"
          value={priceRange}
          onChange={e => setPriceRange(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--purple-700)' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.3rem' }}>
          <span>₹1,000</span>
          <span>₹25,000</span>
        </div>
      </div>

      {/* Size Filter */}
      <div>
        <h4 style={{ fontSize: '0.92rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--purple-950)', marginBottom: '0.8rem' }}>
          Sizes
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {allSizes.map(sz => {
            const isSelected = selectedSizes.includes(sz);
            return (
              <button
                key={sz}
                onClick={() => toggleSize(sz)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  border: isSelected ? '1.5px solid var(--purple-700)' : '1px solid var(--gray-300)',
                  background: isSelected ? 'var(--purple-800)' : '#fff',
                  color: isSelected ? '#fff' : 'var(--gray-800)'
                }}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Filter */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
          <h4 style={{ fontSize: '0.92rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--purple-950)' }}>
            Color
          </h4>
          {selectedColor && (
            <button onClick={() => setSelectedColor('')} style={{ fontSize: '0.75rem', color: 'var(--purple-700)', textDecoration: 'underline' }}>
              Clear
            </button>
          )}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {allColors.map(col => {
            const isSelected = selectedColor === col;
            return (
              <button
                key={col}
                onClick={() => setSelectedColor(isSelected ? '' : col)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  border: isSelected ? '1.5px solid var(--purple-700)' : '1px solid var(--gray-300)',
                  background: isSelected ? 'var(--purple-100)' : '#fff',
                  color: isSelected ? 'var(--purple-900)' : 'var(--gray-700)'
                }}
              >
                {col}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stock Availability */}
      <div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--gray-800)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={e => setInStockOnly(e.target.checked)}
            style={{ width: 17, height: 17, accentColor: 'var(--purple-700)' }}
          />
          <span>In Stock Only</span>
        </label>
      </div>

      {/* Reset button */}
      <button
        onClick={resetFilters}
        className="btn btn-secondary btn-sm"
        style={{ width: '100%', borderRadius: '8px' }}
      >
        Reset All Filters
      </button>
    </div>
  );

  return (
    <div className="shop-page animate-fade-in" style={{ padding: '3.5rem 0 6rem' }}>
      <div className="container">
        {/* Header Title & Breadcrumb */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--gray-500)', marginBottom: '0.5rem' }}>
            <Link to="/" style={{ color: 'var(--gray-500)' }}>Home</Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--purple-950)', fontWeight: 600 }}>Catalogue</span>
            {selectedCategory !== 'all' && (
              <>
                <ChevronRight size={14} />
                <span style={{ color: 'var(--purple-700)', textTransform: 'capitalize' }}>{selectedCategory}</span>
              </>
            )}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2.4rem', color: 'var(--purple-950)' }}>
                {selectedCategory !== 'all'
                  ? categories.find(c => c.slug === selectedCategory)?.name || 'Boutique Collection'
                  : 'Boutique Fashion Catalogue'}
              </h1>
              <p style={{ color: 'var(--gray-600)', fontSize: '0.95rem' }}>
                Showing {filteredProducts.length} handcrafted designer pieces
              </p>
            </div>

            {/* Sorting & Mobile Filter Trigger */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <button
                className="btn btn-secondary btn-sm mobile-filter-btn"
                onClick={() => setMobileFilterOpen(true)}
              >
                <Filter size={15} />
                <span>Filters</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ArrowUpDown size={16} style={{ color: 'var(--gray-500)' }} />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  style={{
                    padding: '0.55rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--gray-300)',
                    background: '#fff',
                    color: 'var(--gray-800)',
                    outline: 'none',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <option value="featured">Featured Picks</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="shop-layout">
          {/* Desktop Left Sidebar */}
          <aside className="shop-sidebar" style={{ background: '#fff', padding: '1.8rem', borderRadius: '16px', border: '1px solid var(--purple-100)', position: 'sticky', top: '100px' }}>
            <FilterContent />
          </aside>

          {/* Right Product Grid */}
          <main>
            {/* Active search chip if any */}
            {(search || selectedSizes.length > 0 || selectedColor || inStockOnly) && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', marginBottom: '1.5rem', padding: '0.8rem 1rem', background: 'var(--purple-50)', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--purple-900)' }}>Active Filters:</span>
                {search && (
                  <span className="badge badge-purple" style={{ cursor: 'pointer' }} onClick={() => setSearch('')}>
                    Search: "{search}" <X size={12} />
                  </span>
                )}
                {selectedSizes.map(s => (
                  <span key={s} className="badge badge-purple" style={{ cursor: 'pointer' }} onClick={() => toggleSize(s)}>
                    Size: {s} <X size={12} />
                  </span>
                ))}
                {selectedColor && (
                  <span className="badge badge-purple" style={{ cursor: 'pointer' }} onClick={() => setSelectedColor('')}>
                    Color: {selectedColor} <X size={12} />
                  </span>
                )}
                {inStockOnly && (
                  <span className="badge badge-purple" style={{ cursor: 'pointer' }} onClick={() => setInStockOnly(false)}>
                    In Stock Only <X size={12} />
                  </span>
                )}
                <button onClick={resetFilters} style={{ fontSize: '0.78rem', color: 'var(--accent-red)', fontWeight: 600, marginLeft: 'auto' }}>
                  Clear All
                </button>
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4.5rem 1rem', background: '#fff', borderRadius: '16px', border: '1px solid var(--purple-100)' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--purple-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem', color: 'var(--purple-400)' }}>
                  <Search size={28} />
                </div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--purple-950)', marginBottom: '0.5rem' }}>
                  No matching garments found
                </h3>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Try adjusting your price range, clearing selected filters, or searching for other items.
                </p>
                <button onClick={resetFilters} className="btn btn-primary btn-sm">
                  View All Products
                </button>
              </div>
            ) : (
              <div className="product-grid">
                {filteredProducts.map(product => {
                  const isSaved = isInWishlist(product.id);
                  return (
                    <div key={product.id} className="product-card">
                      <div className="product-img-wrapper">
                        <img 
                          src={product.images?.[0] || '/why-choose-banner.jpg'} 
                          alt={product.name} 
                          className="product-img"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/why-choose-banner.jpg";
                          }}
                        />

                        <div className="product-tags">
                          {product.isNewArrival && (
                            <span className="badge badge-new">New</span>
                          )}
                          {product.salePrice && (
                            <span className="badge badge-sale">
                              {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                            </span>
                          )}
                          {product.stock <= 5 && product.stock > 0 && (
                            <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>
                              Only {product.stock} Left
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          className={`product-wishlist-btn ${isSaved ? 'active' : ''}`}
                          onClick={() => toggleWishlist(product)}
                          aria-label="Save to Wishlist"
                        >
                          <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
                        </button>

                        <button
                          type="button"
                          className="product-quick-btn"
                          onClick={() => setQuickViewProduct(product)}
                        >
                          Quick View & Select
                        </button>
                      </div>

                      <div className="product-info">
                        <span className="product-category">{product.category}</span>
                        <Link to={`/product/${product.id}`} className="product-title" title={product.name}>
                          {product.name}
                        </Link>

                        <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                          {product.sizes?.slice(0, 4).map(sz => (
                            <span key={sz} style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', background: 'var(--gray-100)', borderRadius: '4px', color: 'var(--gray-700)' }}>
                              {sz}
                            </span>
                          ))}
                        </div>

                        <div className="product-pricing">
                          <span className="current-price">₹{product.salePrice || product.price}</span>
                          {product.salePrice && (
                            <span className="original-price">₹{product.price}</span>
                          )}
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                          <button
                            onClick={() => addToCart(product, product.sizes?.[0], product.colors?.[0], 1)}
                            disabled={product.stock <= 0}
                            className="btn btn-primary btn-sm"
                            style={{ flex: 1, borderRadius: '6px' }}
                          >
                            <ShoppingBag size={15} />
                            <span>{product.stock > 0 ? 'Add To Bag' : 'Out of Stock'}</span>
                          </button>
                          <Link
                            to={`/product/${product.id}`}
                            className="icon-btn"
                            style={{ width: 36, height: 36, borderRadius: '6px' }}
                            title="View Details"
                          >
                            <ChevronRight size={18} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="drawer-backdrop" onClick={() => setMobileFilterOpen(false)}>
          <div 
            className="drawer-panel" 
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '340px' }}
          >
            <div style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--purple-100)' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--purple-950)' }}>Filter Products</h3>
              <button className="icon-btn" onClick={() => setMobileFilterOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1.2rem' }}>
              <FilterContent />
            </div>
            <div style={{ padding: '1rem', borderTop: '1px solid var(--purple-100)' }}>
              <button 
                onClick={() => setMobileFilterOpen(false)}
                className="btn btn-primary"
                style={{ width: '100%', borderRadius: '8px' }}
              >
                Apply Filters ({filteredProducts.length} items)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Responsive layout styles */}
      <style>{`
        @media (max-width: 900px) {
          .shop-layout {
            grid-template-columns: 1fr !important;
          }
          .shop-sidebar {
            display: none !important;
          }
          .mobile-filter-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </div>
  );
}
