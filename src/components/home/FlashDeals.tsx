import React, { useState, useEffect } from 'react';
import { Zap, Timer, Flame, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../catalog/ProductCard';

interface FlashDealsProps {
  onViewAllDeals: () => void;
}

export const FlashDeals: React.FC<FlashDealsProps> = ({ onViewAllDeals }) => {
  // 6 hour live countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const flashDealProducts = PRODUCTS.filter(p => p.isFlashDeal).slice(0, 4);

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-purple-950/40 via-indigo-950/20 to-gray-900/60 border border-purple-500/30 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header with Countdown Timer */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 relative z-10 border-b border-purple-500/20 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
              </span>
              <span className="text-xs font-black uppercase tracking-widest text-rose-500 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-rose-500" />
                Live Flash Sale
              </span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight flex items-center gap-2">
              Cyber Flash Drops
              <Zap className="w-6 h-6 text-amber-400 fill-amber-400" />
            </h2>
            <p className="text-sm text-gray-400">
              High-demand hardware with up to 40% off. Quantities replenish after timer expires.
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-900/90 border border-purple-500/40 px-4 py-3 rounded-2xl shadow-lg backdrop-blur">
              <Timer className="w-5 h-5 text-amber-400 animate-pulse" />
              <div className="flex items-center gap-1.5 text-center font-mono font-black text-xl sm:text-2xl text-white">
                <div className="bg-purple-950/80 px-2 py-1 rounded-lg border border-purple-800">
                  {String(timeLeft.hours).padStart(2, '0')}
                  <span className="block text-[8px] font-sans text-gray-400 font-normal">HRS</span>
                </div>
                <span className="text-purple-400 animate-pulse">:</span>
                <div className="bg-purple-950/80 px-2 py-1 rounded-lg border border-purple-800">
                  {String(timeLeft.minutes).padStart(2, '0')}
                  <span className="block text-[8px] font-sans text-gray-400 font-normal">MIN</span>
                </div>
                <span className="text-purple-400 animate-pulse">:</span>
                <div className="bg-purple-950/80 px-2 py-1 rounded-lg border border-purple-800 text-cyan-400">
                  {String(timeLeft.seconds).padStart(2, '0')}
                  <span className="block text-[8px] font-sans text-gray-400 font-normal">SEC</span>
                </div>
              </div>
            </div>

            <button
              onClick={onViewAllDeals}
              className="hidden sm:flex items-center gap-1.5 px-4 py-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 font-semibold text-xs border border-purple-500/40 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {flashDealProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
