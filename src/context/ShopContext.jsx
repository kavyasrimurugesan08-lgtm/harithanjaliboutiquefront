import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [settings, setSettings] = useState({
    storeName: 'Harithanjali Boutique',
    tagline: 'Trendy Collections for Every You.',
    currency: '₹',
    currencyCode: 'INR',
    shippingCharge: 100,
    freeShippingThreshold: 1999,
    phone: '8144052522',
    address: '2/32 Perumal Kovil Medu, Main Road, Seelanaickanpatti, Salem – 636201.',
    whatsappNumber: '918144052522',
    instagramHandle: '@_harithanjali_boutique',
    instagramUrl: 'https://instagram.com/_harithanjali_boutique',
    youtubeName: 'Harithanjali Boutique',
    facebookName: 'Harithanjali Boutique',
    workingHours: 'Mon - Sat: 10:00 AM - 9:00 PM | Sun: 11:00 AM - 8:00 PM'
  });
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('hb_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('hb_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Show temporary toast notification
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('hb_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('hb_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  // Fetch initial data from backend API
  const refreshData = async () => {
    try {
      setLoading(true);
      const [resProd, resCat, resSet, resCnt] = await Promise.allSettled([
        fetch('/api/products').then(r => r.json()),
        fetch('/api/categories').then(r => r.json()),
        fetch('/api/settings').then(r => r.json()),
        fetch('/api/content').then(r => r.json())
      ]);

      if (resProd.status === 'fulfilled' && resProd.value?.success) {
        setProducts(resProd.value.data);
      }
      if (resCat.status === 'fulfilled' && resCat.value?.success) {
        setCategories(resCat.value.data);
      }
      if (resSet.status === 'fulfilled' && resSet.value?.success) {
        setSettings(resSet.value.data);
      }
      if (resCnt.status === 'fulfilled' && resCnt.value?.success) {
        setContent(resCnt.value.data);
      }
    } catch (err) {
      console.error('Failed to load shop data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Cart operations
  const addToCart = (product, size, color, quantity = 1) => {
    const selectedSize = size || (product.sizes?.[0] || 'Standard');
    const selectedColor = color || (product.colors?.[0] || 'Standard');
    const effectivePrice = product.salePrice || product.price;

    setCart(prevCart => {
      const existingIdx = prevCart.findIndex(
        item => item.productId === product.id && item.size === selectedSize && item.color === selectedColor
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIdx].quantity + quantity;
        if (newQty > product.stock) {
          showToast(`Only ${product.stock} items available in stock`, 'error');
          return prevCart;
        }
        updated[existingIdx].quantity = newQty;
        showToast(`Updated quantity for ${product.name}`);
        return updated;
      } else {
        if (quantity > product.stock) {
          showToast(`Only ${product.stock} items available in stock`, 'error');
          return prevCart;
        }
        showToast(`Added ${product.name} to Cart!`);
        return [
          ...prevCart,
          {
            productId: product.id,
            name: product.name,
            sku: product.sku,
            price: effectivePrice,
            originalPrice: product.price,
            image: product.images?.[0] || '',
            size: selectedSize,
            color: selectedColor,
            quantity,
            stock: product.stock
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const updateCartQty = (productId, size, color, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.productId === productId && item.size === size && item.color === color) {
          const validQty = Math.min(quantity, item.stock || 99);
          return { ...item, quantity: validQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId, size, color) => {
    setCart(prev => prev.filter(
      item => !(item.productId === productId && item.size === size && item.color === color)
    ));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shippingFee = cartSubtotal >= (settings?.freeShippingThreshold || 1999) || cartSubtotal === 0
    ? 0
    : (settings?.shippingCharge || 100);
  const grandTotal = cartSubtotal + shippingFee;

  // Wishlist operations
  const toggleWishlist = (product) => {
    const exists = wishlist.some(item => item.id === product.id);
    if (exists) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
      showToast(`Removed from Wishlist`);
    } else {
      setWishlist(prev => [...prev, product]);
      showToast(`Saved to Wishlist!`);
    }
  };

  const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        settings,
        content,
        loading,
        refreshData,
        cart,
        cartCount,
        cartSubtotal,
        shippingFee,
        grandTotal,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        quickViewProduct,
        setQuickViewProduct,
        toastMessage,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
