import React from 'react';
import { Filter, RotateCcw, Check, Star } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';

interface FilterSidebarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  maxPrice: number;
  setMaxPrice: (val: number) => void;
  minRating: number;
  setMinRating: (val: number) => void;
  inStockOnly: boolean;
  setInStockOnly: (val: boolean) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  onResetFilters: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  inStockOnly,
  setInStockOnly,
  selectedBrand,
  setSelectedBrand,
  onResetFilters,
}) => {
  const { formatPrice } = useCart();

  // Distinct brands from products
  const brands = Array.from(new Set(PRODUCTS.map(p => p.brand)));

  return (
    <div className="space-y-6 text-sm">
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 font-display font-bold text-gray-900 dark:text-white">
          <Filter className="w-4 h-4 text-purple-600 dark:text-cyan-400" />
          <span>Filters</span>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs text-purple-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="font-display font-bold text-xs uppercase tracking-wider text-gray-400">
          Category
        </h4>
        <div className="space-y-1.5">
          <button
            onClick={() => onSelectCategory('all')}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
              selectedCategory === 'all'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <span>All Categories</span>
            <span>{PRODUCTS.length}</span>
          </button>
          {CATEGORIES.map(cat => {
            const count = PRODUCTS.filter(p => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] ${isSelected ? 'text-purple-200' : 'text-gray-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <h4 className="font-display font-bold text-xs uppercase tracking-wider text-gray-400">
            Max Price
          </h4>
          <span className="font-mono text-xs font-bold text-purple-600 dark:text-cyan-400">
            {formatPrice(maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="100"
          max="1500"
          step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-purple-600 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-gray-400">
          <span>{formatPrice(100)}</span>
          <span>{formatPrice(1500)}</span>
        </div>
      </div>

      {/* Brand Selection */}
      <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800">
        <h4 className="font-display font-bold text-xs uppercase tracking-wider text-gray-400">
          Brand
        </h4>
        <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
          <button
            onClick={() => setSelectedBrand('')}
            className={`w-full text-left px-2.5 py-1 rounded-md text-xs transition-colors flex items-center justify-between ${
              selectedBrand === '' ? 'font-bold text-purple-600 dark:text-cyan-400' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <span>All Brands</span>
            {selectedBrand === '' && <Check className="w-3.5 h-3.5" />}
          </button>
          {brands.map(brand => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand === selectedBrand ? '' : brand)}
              className={`w-full text-left px-2.5 py-1 rounded-md text-xs transition-colors flex items-center justify-between ${
                selectedBrand === brand ? 'font-bold text-purple-600 dark:text-cyan-400' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <span>{brand}</span>
              {selectedBrand === brand && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800">
        <h4 className="font-display font-bold text-xs uppercase tracking-wider text-gray-400">
          Customer Rating
        </h4>
        <div className="space-y-1">
          {[0, 4.5, 4.8].map(rating => (
            <button
              key={rating}
              onClick={() => setMinRating(rating)}
              className={`w-full text-left px-2.5 py-1 rounded-md text-xs flex items-center gap-1.5 transition-colors ${
                minRating === rating
                  ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-cyan-400 font-bold'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${rating > 0 ? 'text-amber-400 fill-amber-400' : 'text-gray-400'}`} />
              <span>{rating === 0 ? 'Any Rating' : `${rating}★ & Above`}</span>
            </button>
          ))}
        </div>
      </div>

      {/* In Stock Only Toggle */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={e => setInStockOnly(e.target.checked)}
            className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 rounded-sm"
          />
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            In Stock Only
          </span>
        </label>
      </div>
    </div>
  );
};
