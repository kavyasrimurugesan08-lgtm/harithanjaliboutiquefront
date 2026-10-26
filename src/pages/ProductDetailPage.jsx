import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  ShoppingBag, 
  MessageCircle, 
  ChevronRight, 
  Star, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  Ruler, 
  X,
  Share2,
  Check,
  AlertCircle
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isInWishlist, settings, showToast } = useShop();

  const [product, setProduct] = useState(null);
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    window.scrollTo(0, 0);
    // Find in loaded products or fetch
    const found = products.find(p => p.id === id || p.slug === id);
    if (found) {
      setProduct(found);
      setSelectedSize(found.sizes?.[0] || 'Standard');
      setSelectedColor(found.colors?.[0] || 'Standard');
      setSelectedImgIdx(0);
      setQuantity(1);
    } else {
      // Fetch directly from API
      fetch(`/api/products/${id}`)
        .then(r => r.json())
        .then(data => {
          if (data.success && data.data) {
            setProduct(data.data);
            setSelectedSize(data.data.sizes?.[0] || 'Standard');
            setSelectedColor(data.data.colors?.[0] || 'Standard');
          }
        })
        .catch(err => console.error(err));
    }
  }, [id, products]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '6rem 1rem', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--purple-950)', marginBottom: '1rem' }}>Loading Garment Details...</h2>
        <p style={{ color: 'var(--gray-600)' }}>Preparing Salem's finest boutique collection for you.</p>
      </div>
    );
  }

  const effectivePrice = product.salePrice || product.price;
  const isSaved = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Look at this beautiful ${product.name} at Harithanjali Boutique!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Harithanjali Boutique! I am interested in ordering:\n` +
    `• Product: ${product.name}\n` +
    `• SKU: ${product.sku || 'N/A'}\n` +
    `• Price: ₹${effectivePrice}\n` +
    `• Selected Size: ${selectedSize}\n` +
    `• Selected Color: ${selectedColor}\n` +
    `• Quantity: ${quantity}\n\n` +
    `Please share availability and dispatch schedule. Thank you!`
  );
  const whatsappUrl = `https://wa.me/${settings?.whatsappNumber || '918144052522'}?text=${whatsappMessage}`;

  const related = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="product-detail-page animate-fade-in" style={{ padding: '2.5rem 0 6rem' }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--gray-500)', marginBottom: '2rem' }}>
          <Link to="/" style={{ color: 'var(--gray-500)' }}>Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" style={{ color: 'var(--gray-500)' }}>Shop</Link>
          <ChevronRight size={14} />
          <Link to={`/shop?category=${product.category}`} style={{ color: 'var(--gray-500)', textTransform: 'capitalize' }}>
            {product.category}
          </Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--purple-950)', fontWeight: 600, maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {product.name}
          </span>
        </div>

        {/* Product Hero Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3.5rem', marginBottom: '5rem' }}>
          {/* Left: Gallery */}
          <div>
            {/* Main Stage */}
            <div style={{
              position: 'relative',
              paddingTop: '125%',
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'var(--purple-50)',
              border: '1px solid var(--purple-100)',
              boxShadow: 'var(--shadow-md)',
              marginBottom: '1rem'
            }}>
              <img
                src={product.images?.[selectedImgIdx] || product.images?.[0]}
                alt={product.name}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <button
                onClick={() => toggleWishlist(product)}
                className={`product-wishlist-btn ${isSaved ? 'active' : ''}`}
                style={{ top: 16, right: 16, width: 44, height: 44 }}
                title={isSaved ? 'Saved in Wishlist' : 'Add to Wishlist'}
              >
                <Heart size={22} fill={isSaved ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Thumbnail Strip */}
            {product.images?.length > 1 && (
              <div style={{ display: 'flex', gap: '0.8rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIdx(idx)}
                    style={{
                      width: 76,
                      height: 92,
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: selectedImgIdx === idx ? '2px solid var(--purple-700)' : '1px solid var(--purple-200)',
                      opacity: selectedImgIdx === idx ? 1 : 0.65,
                      flexShrink: 0
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Controls */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span className="badge badge-purple" style={{ textTransform: 'uppercase' }}>
                {product.category}
              </span>
              <button onClick={handleShare} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--purple-800)', fontWeight: 600 }}>
                <Share2 size={15} />
                <span>Share</span>
              </button>
            </div>

            <h1 style={{ fontSize: '2.1rem', color: 'var(--purple-950)', marginBottom: '0.6rem', lineHeight: 1.25 }}>
              {product.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--gray-500)', fontFamily: 'monospace' }}>
                SKU: {product.sku || 'HB-NEW'}
              </span>
              <span>•</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#e5be3a' }}>
                <Star size={16} fill="currentColor" />
                <span style={{ fontWeight: 700, color: 'var(--purple-950)' }}>{product.rating || 4.9}</span>
                <span style={{ color: 'var(--gray-500)' }}>({product.reviewsCount || 12} reviews)</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', padding: '1rem 0', borderTop: '1px solid var(--gray-200)', borderBottom: '1px solid var(--gray-200)', marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--purple-950)' }}>
                ₹{effectivePrice.toLocaleString('en-IN')}
              </span>
              {product.salePrice && (
                <>
                  <span style={{ fontSize: '1.2rem', color: 'var(--gray-400)', textDecoration: 'line-through' }}>
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="badge badge-sale">
                    Save ₹{(product.price - product.salePrice).toLocaleString('en-IN')} ({Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF)
                  </span>
                </>
              )}
            </div>

            {/* Stock status alert */}
            <div style={{ marginBottom: '1.5rem' }}>
              {isOutOfStock ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-red)', fontSize: '0.9rem', fontWeight: 600 }}>
                  <AlertCircle size={17} />
                  <span>Currently Sold Out. WhatsApp us for backorder request.</span>
                </div>
              ) : product.stock <= 5 ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#b45309', fontSize: '0.9rem', fontWeight: 600 }}>
                  <AlertCircle size={17} />
                  <span>Hurry! Only {product.stock} pieces remaining in Salem store.</span>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', fontSize: '0.9rem', fontWeight: 600 }}>
                  <Check size={17} />
                  <span>In Stock & Ready to Dispatch within 24 Hours</span>
                </div>
              )}
            </div>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--gray-800)', marginBottom: '0.6rem' }}>
                  Selected Color: <strong style={{ color: 'var(--purple-900)' }}>{selectedColor}</strong>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {product.colors.map(col => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      style={{
                        padding: '0.45rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        border: selectedColor === col ? '2px solid var(--purple-700)' : '1px solid var(--gray-300)',
                        background: selectedColor === col ? 'var(--purple-50)' : '#fff',
                        color: selectedColor === col ? 'var(--purple-900)' : 'var(--gray-700)'
                      }}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector + Size Guide Modal Trigger */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: '1.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--gray-800)' }}>
                    Selected Size: <strong style={{ color: 'var(--purple-900)' }}>{selectedSize}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowSizeModal(true)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', color: 'var(--purple-800)', fontWeight: 600 }}
                  >
                    <Ruler size={15} />
                    <span>View Size Chart</span>
                  </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {product.sizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      style={{
                        padding: '0.5rem 1.1rem',
                        borderRadius: '8px',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        border: selectedSize === sz ? '2px solid var(--purple-700)' : '1px solid var(--gray-300)',
                        background: selectedSize === sz ? 'var(--purple-800)' : '#fff',
                        color: selectedSize === sz ? '#fff' : 'var(--gray-800)'
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--gray-800)' }}>Quantity:</span>
              <div style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid var(--gray-300)', borderRadius: '8px', overflow: 'hidden' }}>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  style={{ padding: '0.45rem 1rem', background: 'var(--gray-100)', fontWeight: 700 }}
                  disabled={isOutOfStock}
                >
                  -
                </button>
                <span style={{ padding: '0.45rem 1.2rem', fontSize: '1rem', fontWeight: 700 }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  style={{ padding: '0.45rem 1rem', background: 'var(--gray-100)', fontWeight: 700 }}
                  disabled={isOutOfStock || quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons: Add to Bag, Buy Now, WhatsApp */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="btn btn-secondary btn-lg"
                  style={{ borderRadius: '10px' }}
                >
                  <ShoppingBag size={18} />
                  <span>{isOutOfStock ? 'Sold Out' : 'Add to Bag'}</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className="btn btn-primary btn-lg"
                  style={{ borderRadius: '10px' }}
                >
                  <span>Buy Now</span>
                </button>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp btn-lg"
                style={{ width: '100%', borderRadius: '10px' }}
              >
                <MessageCircle size={19} />
                <span>Enquire & Order on WhatsApp</span>
              </a>
            </div>

            {/* Confidence Badges */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              padding: '1.2rem',
              borderRadius: '12px',
              background: 'var(--purple-50)',
              border: '1px solid var(--purple-100)',
              textAlign: 'center'
            }}>
              <div>
                <Truck size={20} style={{ color: 'var(--purple-700)', margin: '0 auto 0.3rem' }} />
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--purple-950)' }}>Fast Shipping</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--gray-600)' }}>Free over ₹1999</div>
              </div>
              <div>
                <ShieldCheck size={20} style={{ color: 'var(--purple-700)', margin: '0 auto 0.3rem' }} />
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--purple-950)' }}>100% Authentic</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--gray-600)' }}>Pure artisanal weave</div>
              </div>
              <div>
                <RefreshCw size={20} style={{ color: 'var(--purple-700)', margin: '0 auto 0.3rem' }} />
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--purple-950)' }}>Easy Exchange</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--gray-600)' }}>Salem store pickup</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Description, Fabric & Care, Delivery */}
        <div style={{ marginBottom: '5rem', background: '#fff', borderRadius: '16px', border: '1px solid var(--purple-100)', padding: '2rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', borderBottom: '1px solid var(--gray-200)', marginBottom: '1.5rem' }}>
            {['description', 'fabric', 'shipping'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '0.6rem 0',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  color: activeTab === tab ? 'var(--purple-800)' : 'var(--gray-500)',
                  borderBottom: activeTab === tab ? '2px solid var(--purple-800)' : 'none',
                  marginBottom: -1
                }}
              >
                {tab === 'description' && 'Garment Details'}
                {tab === 'fabric' && 'Fabric & Wash Care'}
                {tab === 'shipping' && 'Delivery & Store Pickup'}
              </button>
            ))}
          </div>

          <div>
            {activeTab === 'description' && (
              <div style={{ color: 'var(--gray-700)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: '1rem' }}>{product.description}</p>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li>Handpicked exclusive design by Harithanjali Boutique, Salem.</li>
                  <li>Intricate pattern detailing with tested metallic threads.</li>
                  <li>Accompanied with designer blouse or matching bottom fabric where noted.</li>
                  <li>Tailoring customization and matching accessories available upon WhatsApp request.</li>
                </ul>
              </div>
            )}

            {activeTab === 'fabric' && (
              <div style={{ color: 'var(--gray-700)', lineHeight: 1.8 }}>
                <p><strong>Fabric Composition:</strong> {product.fabric || 'Pure Artisan Mulberry Silk / Handloom Georgette'}</p>
                <p><strong>Care Instructions:</strong> {product.careInstructions || 'Dry Clean Only. Avoid direct sunlight drying. Store in a breathable cotton or muslin bag.'}</p>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div style={{ color: 'var(--gray-700)', lineHeight: 1.8 }}>
                <p><strong>Salem Direct Pickup:</strong> Available free at our Seelanaickanpatti store: <em>2/32 Perumal Kovil Medu, Main Road, Salem – 636201.</em></p>
                <p><strong>Pan-India Express Dispatch:</strong> Dispatched in 24 hours. Delivery within 2-4 working days across Tamil Nadu, Karnataka, and major cities.</p>
                <p><strong>Free Shipping:</strong> Automatically applied at checkout on all orders above ₹1999.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {related.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
              <div>
                <span className="badge badge-purple" style={{ marginBottom: '0.4rem' }}>You Might Also Love</span>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--purple-950)' }}>Matching Boutique Pieces</h3>
              </div>
              <Link to={`/shop?category=${product.category}`} className="btn btn-secondary btn-sm">
                <span>View All In This Category</span>
                <ChevronRight size={16} />
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '1.5rem'
            }}>
              {related.map(rel => (
                <div key={rel.id} className="product-card">
                  <div className="product-img-wrapper">
                    <img src={rel.images?.[0]} alt={rel.name} className="product-img" />
                  </div>
                  <div className="product-info">
                    <Link to={`/product/${rel.id}`} className="product-title">{rel.name}</Link>
                    <div className="product-pricing">
                      <span className="current-price">₹{rel.salePrice || rel.price}</span>
                    </div>
                    <Link to={`/product/${rel.id}`} className="btn btn-primary btn-sm" style={{ width: '100%', borderRadius: '6px', marginTop: 'auto' }}>
                      View Piece
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      {showSizeModal && (
        <div className="modal-backdrop" onClick={() => setShowSizeModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Ruler size={20} style={{ color: 'var(--purple-800)' }} />
                <h3 style={{ fontSize: '1.3rem', color: 'var(--purple-950)' }}>Standard Size Guide (Inches)</h3>
              </div>
              <button className="icon-btn" onClick={() => setShowSizeModal(false)}>
                <X size={18} />
              </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              <thead>
                <tr style={{ background: 'var(--purple-50)', borderBottom: '2px solid var(--purple-200)' }}>
                  <th style={{ padding: '0.75rem' }}>Size</th>
                  <th style={{ padding: '0.75rem' }}>Bust (in)</th>
                  <th style={{ padding: '0.75rem' }}>Waist (in)</th>
                  <th style={{ padding: '0.75rem' }}>Hip (in)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>XS</td>
                  <td style={{ padding: '0.75rem' }}>32 - 34</td>
                  <td style={{ padding: '0.75rem' }}>26 - 28</td>
                  <td style={{ padding: '0.75rem' }}>36 - 38</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>S</td>
                  <td style={{ padding: '0.75rem' }}>34 - 36</td>
                  <td style={{ padding: '0.75rem' }}>28 - 30</td>
                  <td style={{ padding: '0.75rem' }}>38 - 40</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>M</td>
                  <td style={{ padding: '0.75rem' }}>36 - 38</td>
                  <td style={{ padding: '0.75rem' }}>30 - 32</td>
                  <td style={{ padding: '0.75rem' }}>40 - 42</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>L</td>
                  <td style={{ padding: '0.75rem' }}>38 - 40</td>
                  <td style={{ padding: '0.75rem' }}>32 - 34</td>
                  <td style={{ padding: '0.75rem' }}>42 - 44</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>XL</td>
                  <td style={{ padding: '0.75rem' }}>40 - 42</td>
                  <td style={{ padding: '0.75rem' }}>34 - 36</td>
                  <td style={{ padding: '0.75rem' }}>44 - 46</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>XXL</td>
                  <td style={{ padding: '0.75rem' }}>42 - 44</td>
                  <td style={{ padding: '0.75rem' }}>36 - 38</td>
                  <td style={{ padding: '0.75rem' }}>46 - 48</td>
                </tr>
              </tbody>
            </table>

            <p style={{ fontSize: '0.82rem', color: 'var(--gray-600)', background: 'var(--purple-50)', padding: '0.8rem', borderRadius: '8px' }}>
              💡 Need custom measurements? Contact our boutique on WhatsApp at +91 8144052522 with your specific measurements before dispatch!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
