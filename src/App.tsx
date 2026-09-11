import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { BrandTicker } from './components/home/BrandTicker';
import { CategoryBrowser } from './components/home/CategoryBrowser';
import { FlashDeals } from './components/home/FlashDeals';
import { FeaturedSection } from './components/home/FeaturedSection';
import { ValueProps } from './components/home/ValueProps';
import { Newsletter } from './components/home/Newsletter';
import { LiveActivity } from './components/home/LiveActivity';
import { ProductGrid } from './components/catalog/ProductGrid';
import { QuickViewModal } from './components/product/QuickViewModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { WishlistDrawer } from './components/cart/WishlistDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { OrderTrackingModal } from './components/orders/OrderTrackingModal';
import { ToastContainer } from './components/common/ToastContainer';

const SatroApp: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    // Smooth scroll to catalog section
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateHome = () => {
    setActiveCategory('all');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateCatalog = () => {
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Sticky Responsive Navbar */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onNavigateHome={handleNavigateHome}
        onNavigateCatalog={handleNavigateCatalog}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Animated & Creative Hero Section */}
        <HeroSection onExploreCatalog={handleNavigateCatalog} />

        {/* Infinite Moving Brand/Tech Ticker */}
        <BrandTicker />

        {/* 3D Interactive Category Browser */}
        <CategoryBrowser onSelectCategory={handleSelectCategory} />

        {/* Flash Deals with Live Countdown Clock */}
        <FlashDeals onViewAllDeals={handleNavigateCatalog} />

        {/* Curated Tabbed Collections */}
        <FeaturedSection onExploreCatalog={handleNavigateCatalog} />

        {/* Full Comprehensive Catalog with Filters & Search */}
        <ProductGrid
          selectedCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />

        {/* Brand Value Propositions */}
        <ValueProps />

        {/* VIP Newsletter with Celebratory Confetti */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* Drawers & Modals */}
      <QuickViewModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <OrderTrackingModal />
      <LiveActivity />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <SatroApp />
      </CartProvider>
    </ThemeProvider>
  );
}
