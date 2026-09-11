import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Package, 
  Sparkles,
  ArrowRight,
  Flame
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { PRODUCTS } from '../../data/products';
import type { Product } from '../../types';

interface NavbarProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onNavigateHome: () => void;
  onNavigateCatalog: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  setSearchQuery,
  onNavigateHome,
  onNavigateCatalog,
}) => {
  const { 
    totalItemCount, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsOrderTrackingOpen,
    openQuickView,
    formatPrice
  } = useCart();
  const { theme, toggleTheme, setTheme } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [cartBouncing, setCartBouncing] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (totalItemCount > 0) {
      setCartBouncing(true);
      const timer = setTimeout(() => setCartBouncing(false), 800);
      return () => clearTimeout(timer);
    }
  }, [totalItemCount]);

  // Filter products for live search preview
  const searchResults: Product[] = searchQuery.trim()
    ? PRODUCTS.filter(
        p =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  // Close search suggestions and theme menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setThemeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navCategories = [
    { id: 'all', name: 'All Drops' },
    { id: 'audio', name: 'Audio' },
    { id: 'wearables', name: 'Wearables' },
    { id: 'footwear', name: 'Kicks' },
    { id: 'electronics', name: 'Gadgets' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'streetwear', name: 'Streetwear' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-[#0b0f19]/80 border-b border-gray-200/80 dark:border-gray-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <button
              onClick={onNavigateHome}
              className="group flex items-center gap-2.5 focus:outline-none text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-purple-500/25 group-hover:shadow-cyan-400/40 transition-all duration-300 transform group-hover:scale-105">
                <div className="w-full h-full bg-gray-900 rounded-[10px] flex items-center justify-center">
                  <span className="font-display font-black text-xl bg-gradient-to-tr from-purple-400 via-cyan-300 to-white bg-clip-text text-transparent">
                    S
                  </span>
                </div>
              </div>
              <div>
                <span className="font-display font-black text-2xl tracking-wider bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-500 dark:from-purple-400 dark:via-indigo-300 dark:to-cyan-400 bg-clip-text text-transparent">
                  SATRO
                </span>
                <span className="hidden sm:block text-[9px] uppercase tracking-[0.25em] font-semibold text-purple-600 dark:text-cyan-400">
                  Next-Gen E-Kart
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navCategories.map(cat => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      onNavigateCatalog();
                    }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                      isActive
                        ? 'text-purple-600 dark:text-cyan-400 bg-purple-50 dark:bg-purple-950/40 font-semibold'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    {cat.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Search bar with live autocomplete dropdown */}
          <div ref={searchRef} className="relative flex-1 max-w-md hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setSearchFocused(true);
                }}
                onFocus={() => setSearchFocused(true)}
                placeholder="Search cyber sneakers, titanium watches, audio..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/60 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Live Autocomplete Dropdown */}
            {searchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50 p-2 backdrop-blur-lg">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Products Matching "{searchQuery}"</span>
                  <span className="text-purple-500">{searchResults.length} found</span>
                </div>

                {searchResults.length > 0 ? (
                  <div className="divide-y divide-gray-100 dark:divide-gray-800/60">
                    {searchResults.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          openQuickView(p);
                          setSearchFocused(false);
                        }}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/70 cursor-pointer transition-colors group"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-11 h-11 rounded-lg object-cover bg-gray-100 dark:bg-gray-800"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate group-hover:text-purple-600 dark:group-hover:text-cyan-400">
                            {p.name}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <span className="capitalize">{p.category}</span>
                            <span>•</span>
                            <span className="font-bold text-gray-900 dark:text-white">
                              {formatPrice(p.price)}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-purple-600 dark:text-cyan-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                          View <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        onNavigateCatalog();
                        setSearchFocused(false);
                      }}
                      className="w-full text-center py-2 text-xs font-semibold text-purple-600 dark:text-cyan-400 hover:underline pt-2.5"
                    >
                      View all matching results in catalog
                    </button>
                  </div>
                ) : (
                  <div className="py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
                    No items found matching "{searchQuery}". Try "Pulse", "Sneakers", or "Watch".
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme Selector Dropdown */}
            <div ref={themeMenuRef} className="relative">
              <button
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className={`p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all relative flex items-center justify-center ${
                  theme === 'red-light' ? 'bg-red-50 text-red-600 ring-2 ring-red-400/40' : ''
                }`}
                aria-label="Theme Options"
                title={`Theme: ${theme === 'red-light' ? 'Red Light' : theme === 'dark' ? 'Dark Mode' : 'Light Mode'} (Click for theme options)`}
              >
                {theme === 'dark' ? (
                  <Moon className="w-5 h-5 text-indigo-400 hover:-rotate-12 transition-transform duration-300" />
                ) : theme === 'red-light' ? (
                  <Flame className="w-5 h-5 text-red-600 fill-red-500 animate-pulse hover:scale-110 transition-transform duration-300" />
                ) : (
                  <Sun className="w-5 h-5 text-amber-500 hover:rotate-90 transition-transform duration-300" />
                )}
              </button>

              {/* Theme Dropdown Menu */}
              {themeMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-1.5 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-gray-400 border-b border-gray-100 dark:border-gray-800 mb-1 flex items-center justify-between">
                    <span>Appearance</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTheme();
                      }}
                      className="text-[10px] text-purple-600 dark:text-cyan-400 hover:underline capitalize"
                    >
                      Cycle
                    </button>
                  </div>
                  
                  {/* Light Theme */}
                  <button
                    onClick={() => {
                      setTheme('light');
                      setThemeMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      theme === 'light'
                        ? 'bg-purple-50 text-purple-700 font-bold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Sun className="w-4 h-4 text-amber-500" />
                      <span>Light</span>
                    </div>
                    {theme === 'light' && <span className="w-2 h-2 rounded-full bg-purple-600" />}
                  </button>

                  {/* Red Light Theme */}
                  <button
                    onClick={() => {
                      setTheme('red-light');
                      setThemeMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      theme === 'red-light'
                        ? 'bg-red-50 text-red-600 font-bold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Flame className="w-4 h-4 text-red-500 fill-red-500" />
                      <span className="text-red-600 font-bold">Red Light</span>
                    </div>
                    {theme === 'red-light' && <span className="w-2 h-2 rounded-full bg-red-600" />}
                  </button>

                  {/* Dark Theme */}
                  <button
                    onClick={() => {
                      setTheme('dark');
                      setThemeMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-800 text-cyan-400 font-bold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Moon className="w-4 h-4 text-indigo-400" />
                      <span>Cyber Dark</span>
                    </div>
                    {theme === 'dark' && <span className="w-2 h-2 rounded-full bg-cyan-400" />}
                  </button>
                </div>
              )}
            </div>

            {/* Order Tracking */}
            <button
              onClick={() => setIsOrderTrackingOpen(true)}
              className="p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
              aria-label="Track Orders"
              title="My Orders & Tracking"
            >
              <Package className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
              aria-label="Wishlist"
              title="Saved Items"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-gray-900 animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transform active:scale-95 transition-all relative ${
                cartBouncing ? 'scale-110 ring-4 ring-cyan-400/50' : 'hover:scale-105'
              }`}
              aria-label="Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 text-gray-950 text-[10px] font-extrabold rounded-full flex items-center justify-center">
                    {totalItemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
                Cart
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-2.5" />
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {navCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  onNavigateCatalog();
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  activeCategory === cat.id
                    ? 'bg-purple-600 text-white font-bold'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          {/* Mobile Theme Selector */}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">Theme Mode</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setTheme('light');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                  theme === 'light'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-400" /> Light
              </button>
              <button
                onClick={() => {
                  setTheme('red-light');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                  theme === 'red-light'
                    ? 'bg-red-600 text-white border-red-600 shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /> Red Light
              </button>
              <button
                onClick={() => {
                  setTheme('dark');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                  theme === 'dark'
                    ? 'bg-gray-900 text-cyan-400 border-cyan-400/50 shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-indigo-400" /> Dark
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <button
              onClick={() => {
                setIsOrderTrackingOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 py-1 text-purple-600 dark:text-cyan-400 font-medium"
            >
              <Package className="w-4 h-4" /> Track Existing Orders
            </button>
            <span className="flex items-center gap-1 text-amber-500 font-medium">
              <Sparkles className="w-3.5 h-3.5" /> 20% OFF: SATRO20
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
