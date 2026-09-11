import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, TrendingUp, Cpu, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../catalog/ProductCard';

interface FeaturedSectionProps {
  onExploreCatalog: () => void;
}

type TabType = 'trending' | 'bestsellers' | 'newdrops' | 'tech';

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({ onExploreCatalog }) => {
  const [activeTab, setActiveTab] = useState<TabType>('trending');

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'trending', label: 'Trending Drops', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'bestsellers', label: 'Best Sellers', icon: <Flame className="w-4 h-4" /> },
    { id: 'newdrops', label: 'New Arrivals', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'tech', label: 'Elite Gear', icon: <Cpu className="w-4 h-4" /> },
  ];

  const getFilteredProducts = () => {
    switch (activeTab) {
      case 'bestsellers':
        return PRODUCTS.filter(p => p.reviewsCount > 250);
      case 'newdrops':
        return PRODUCTS.filter(p => p.badge === 'NEW DROP' || p.badge === 'NEW');
      case 'tech':
        return PRODUCTS.filter(p => p.category === 'electronics' || p.category === 'gaming');
      case 'trending':
      default:
        return PRODUCTS.slice(0, 8);
    }
  };

  const filteredProducts = getFilteredProducts();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-cyan-400">
            Selected By Curators
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-gray-950 dark:text-white tracking-tight">
            Flagship Collections
          </h2>
        </div>

        {/* Tab switcher buttons */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/60 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/20 scale-100'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid with Framer Motion AnimatePresence */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {filteredProducts.map(product => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Explore full catalog banner */}
      <div className="mt-12 text-center">
        <button
          onClick={onExploreCatalog}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800/80 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-900 dark:text-white transition-all hover:scale-105"
        >
          <span>View All 150+ Drops in SATRO Catalog</span>
          <ArrowRight className="w-4 h-4 text-purple-600 dark:text-cyan-400" />
        </button>
      </div>
    </section>
  );
};
