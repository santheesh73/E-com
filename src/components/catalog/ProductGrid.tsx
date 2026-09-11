import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutGrid, 
  List, 
  SlidersHorizontal, 
  X, 
  PackageSearch 
} from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from './ProductCard';
import { FilterSidebar } from './FilterSidebar';
import { useCart } from '../../context/CartContext';

interface ProductGridProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onClearSearch: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch,
}) => {
  const { formatPrice } = useCart();
  const [maxPrice, setMaxPrice] = useState(1500);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const resetAllFilters = () => {
    onSelectCategory('all');
    setMaxPrice(1500);
    setMinRating(0);
    setInStockOnly(false);
    setSelectedBrand('');
    onClearSearch();
  };

  // Filter & Sort Pipeline
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      // Rating filter
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }
      // Stock filter
      if (inStockOnly && product.stock <= 0) {
        return false;
      }
      // Brand filter
      if (selectedBrand && product.brand !== selectedBrand) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesTags = product.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesBrand && !matchesCategory && !matchesTags) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.badge === 'NEW DROP' ? 1 : 0) - (a.badge === 'NEW DROP' ? 1 : 0);
      return 0; // featured
    });
  }, [selectedCategory, maxPrice, minRating, inStockOnly, selectedBrand, searchQuery, sortBy]);

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    maxPrice < 1500 ||
    minRating > 0 ||
    inStockOnly ||
    selectedBrand !== '' ||
    searchQuery.trim().length > 0;

  return (
    <section id="catalog-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header with Title and Result Counts */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-gray-950 dark:text-white tracking-tight">
            Explore All Drops
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-bold text-gray-900 dark:text-white">{filteredProducts.length}</span> of {PRODUCTS.length} curated products
          </p>
        </div>

        {/* Controls: Mobile Filter Button, Sorting, View Modes */}
        <div className="flex items-center gap-3 self-end md:self-auto flex-wrap">
          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
          >
            <SlidersHorizontal className="w-4 h-4 text-purple-600 dark:text-cyan-400" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-purple-600 dark:bg-cyan-400" />
            )}
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">New Drops</option>
            </select>
          </div>

          {/* Grid vs List View Mode */}
          <div className="hidden sm:flex items-center rounded-xl bg-gray-100 dark:bg-gray-800 p-1 border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-cyan-400 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-white'
              }`}
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-cyan-400 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-white'
              }`}
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips Bar */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-xs text-gray-400 font-semibold">Active:</span>
          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-cyan-300 text-xs font-semibold">
              Category: {selectedCategory}
              <button onClick={() => onSelectCategory('all')}>
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
          {searchQuery.trim() && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 text-xs font-semibold">
              Search: "{searchQuery}"
              <button onClick={onClearSearch}>
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
          {maxPrice < 1500 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold">
              Under {formatPrice(maxPrice)}
              <button onClick={() => setMaxPrice(1500)}>
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
          {minRating > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-semibold">
              {minRating}★ & above
              <button onClick={() => setMinRating(0)}>
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
          {selectedBrand && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 text-xs font-semibold">
              Brand: {selectedBrand}
              <button onClick={() => setSelectedBrand('')}>
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
          {inStockOnly && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
              In Stock Only
              <button onClick={() => setInStockOnly(false)}>
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
          <button
            onClick={resetAllFilters}
            className="text-xs text-rose-500 hover:underline font-semibold ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Catalog Layout (Sidebar + Products) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Desktop Sidebar (1 col) */}
        <aside className="hidden lg:block lg:col-span-1 sticky top-28 bg-white dark:bg-gray-900/60 p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm backdrop-blur-md">
          <FilterSidebar
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            minRating={minRating}
            setMinRating={setMinRating}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            onResetFilters={resetAllFilters}
          />
        </aside>

        {/* Products Grid (3 cols) */}
        <div className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className={
                viewMode === 'grid'
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              <AnimatePresence>
                {filteredProducts.map(product => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Empty State */
            <div className="py-20 text-center rounded-3xl border-2 border-dashed border-gray-300 dark:border-gray-800 p-8 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-500 mx-auto flex items-center justify-center">
                <PackageSearch className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white">
                No matching hardware drops found
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                We couldn't find any products matching your specific filters or search keywords.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition-transform hover:scale-105"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Slide-over Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            onClick={() => setMobileFiltersOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="relative ml-auto w-full max-w-xs h-full bg-white dark:bg-gray-900 p-6 overflow-y-auto shadow-2xl z-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800 mb-4">
                <span className="font-display font-black text-lg text-gray-900 dark:text-white">Filters</span>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterSidebar
                selectedCategory={selectedCategory}
                onSelectCategory={onSelectCategory}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                minRating={minRating}
                setMinRating={setMinRating}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                onResetFilters={resetAllFilters}
              />
            </div>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 w-full py-3 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-lg"
            >
              Apply Filters ({filteredProducts.length} Results)
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
