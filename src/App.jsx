import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { ShopProvider } from './context/ShopContext';
import { AuthProvider } from './context/AuthContext';

// Storefront components
import Header from './components/Header';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';
import AiAssistant from './components/AiAssistant';

// Storefront pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import WishlistPage from './pages/WishlistPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Admin dashboard pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import AdminInventory from './pages/admin/AdminInventory';
import AdminOrders from './pages/admin/AdminOrders';
import AdminContent from './pages/admin/AdminContent';
import AdminSettings from './pages/admin/AdminSettings';

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Show Storefront Header only on customer pages */}
      {!isAdminRoute && <Header />}

      {/* Main Content Area */}
      <div style={{ flex: 1 }}>
        <Routes>
          {/* Public Storefront Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Fallback 404 Route */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>

      {/* Show Storefront Footer only on customer pages */}
      {!isAdminRoute && <Footer />}

      {/* Storefront Global Modals */}
      {!isAdminRoute && (
        <>
          <SearchModal />
          <QuickViewModal />
          <CartDrawer />
          <Toast />
          <AiAssistant />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </ShopProvider>
    </AuthProvider>
  );
}
