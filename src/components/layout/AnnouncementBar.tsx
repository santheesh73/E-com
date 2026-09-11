import React from 'react';
import { Zap, ShieldCheck, Truck, Sparkles, Globe } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import type { CurrencyCode } from '../../types';

export const AnnouncementBar: React.FC = () => {
  const { currency, setCurrencyCode, setIsOrderTrackingOpen } = useCart();

  const currencies: CurrencyCode[] = ['USD', 'INR', 'EUR', 'GBP'];

  return (
    <div className="bg-gradient-to-r from-purple-950 via-gray-900 to-indigo-950 text-white text-xs border-b border-purple-500/20 py-2 px-4 select-none relative overflow-hidden">
      {/* Subtle ambient light bar */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-shimmer" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 relative z-10">
        {/* Left: Live ticker */}
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-400/30 text-[10px] tracking-wide animate-pulse">
            <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
            CYBER WEEK
          </span>
          <p className="text-gray-300 truncate">
            Use code <span className="text-cyan-400 font-bold tracking-wider">SATRO20</span> for 20% OFF | Free Express Delivery over $150
          </p>
        </div>

        {/* Right: Quick Features & Currency Switcher */}
        <div className="flex items-center gap-4 text-gray-300">
          <div className="hidden sm:flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Authentic
            </span>
            <span className="flex items-center gap-1 text-cyan-400">
              <Truck className="w-3.5 h-3.5" />
              Fast Dispatch
            </span>
            <button
              onClick={() => setIsOrderTrackingOpen(true)}
              className="hover:text-purple-300 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Track Orders
            </button>
          </div>

          <div className="flex items-center gap-1.5 pl-3 border-l border-gray-700/60">
            <Globe className="w-3.5 h-3.5 text-purple-400" />
            <select
              value={currency.code}
              onChange={(e) => setCurrencyCode(e.target.value as CurrencyCode)}
              className="bg-transparent text-gray-200 text-xs font-semibold focus:outline-none cursor-pointer hover:text-white"
              aria-label="Currency"
            >
              {currencies.map(c => (
                <option key={c} value={c} className="bg-gray-900 text-white">
                  {c} ({c === 'USD' ? '$' : c === 'INR' ? '₹' : c === 'EUR' ? '€' : '£'})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
