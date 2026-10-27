import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data/initialData';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [products, setProducts] = useState(initialData.products);
  const [categories, setCategories] = useState(initialData.categories);
  const [settings, setSettings] = useState(initialData.settings);
  const [content, setContent] = useState(initialData.content);
  const [loading, setLoading] = useState(false);

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

  // Fetch initial data from backend API with fallback preservation
  const refreshData = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const safeFetch = async (endpoint) => {
        try {
          const res = await fetch(`${apiBase}${endpoint}`);
          if (!res.ok) return null;
          const contentType = res.headers.get('content-type') || '';
          if (!contentType.includes('application/json')) return null;
          return await res.json();
        } catch {
          return null;
        }
      };

      const [resProd, resCat, resSet, resCnt] = await Promise.allSettled([
        safeFetch('/api/products'),
        safeFetch('/api/categories'),
        safeFetch('/api/settings'),
        safeFetch('/api/content')
      ]);

      if (resProd.status === 'fulfilled' && resProd.value?.success && Array.isArray(resProd.value.data) && resProd.value.data.length > 0) {
        setProducts(resProd.value.data);
      }
      if (resCat.status === 'fulfilled' && resCat.value?.success && Array.isArray(resCat.value.data) && resCat.value.data.length > 0) {
        setCategories(resCat.value.data);
      }
      if (resSet.status === 'fulfilled' && resSet.value?.success && resSet.value.data) {
        setSettings(resSet.value.data);
      }
      if (resCnt.status === 'fulfilled' && resCnt.value?.success && resCnt.value.data) {
        setContent(resCnt.value.data);
      }
    } catch (err) {
      console.warn('Backend API unavailable, using embedded catalog data:', err);
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
