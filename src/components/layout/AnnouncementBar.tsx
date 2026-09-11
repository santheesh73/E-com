import React from 'react';
import { Zap, ShieldCheck, Truck, Sparkles, Globe } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import type { CurrencyCode } from '../../types';

export const AnnouncementBar: React.FC = () => {
  const { currency, setCurrencyCode, setIsOrderTrackingOpen } = useCart();
  const { theme } = useTheme();

  const currencies: CurrencyCode[] = ['USD', 'INR', 'EUR', 'GBP'];

  // High-contrast background tailored to theme mode so text is always razor-sharp
  const barBackground = 
    theme === 'red-light'
      ? 'bg-[#2b0808] border-b border-red-500/40 shadow-sm'
      : theme === 'dark'
      ? 'bg-[#090d16] border-b border-gray-800'
      : 'bg-[#0f172a] border-b border-purple-500/30';

  return (
    <div className={`${barBackground} text-white text-xs py-2.5 px-4 select-none relative overflow-hidden transition-colors duration-300`}>
      {/* Subtle ambient light bar */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 relative z-10">
        {/* Left: Live ticker */}
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/25 text-amber-300 font-black border border-amber-400/50 text-[10px] tracking-wider animate-pulse shadow-xs">
            <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
            CYBER WEEK
          </span>
          <p className="text-gray-100 font-medium truncate flex items-center gap-1.5 text-xs">
            <span className="text-gray-200">Use code</span>
            <span className="bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/50 font-mono font-black tracking-widest text-[11px] shadow-xs">
              SATRO20
            </span>
            <span className="font-bold text-white">for 20% OFF</span>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <span className="text-gray-200 hidden sm:inline font-normal">Free Express Delivery over $150</span>
          </p>
        </div>

        {/* Right: Quick Features & Currency Switcher */}
        <div className="flex items-center gap-4 text-gray-200">
          <div className="hidden sm:flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Authentic
            </span>
            <span className="flex items-center gap-1.5 text-sky-400 font-bold">
              <Truck className="w-3.5 h-3.5" />
              Fast Dispatch
            </span>
            <button
              onClick={() => setIsOrderTrackingOpen(true)}
              className="text-gray-100 hover:text-white transition-colors flex items-center gap-1.5 font-bold hover:underline"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Track Orders
            </button>
          </div>

          <div className="flex items-center gap-1.5 pl-3 border-l border-white/20">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={currency.code}
              onChange={(e) => setCurrencyCode(e.target.value as CurrencyCode)}
              className="bg-white/10 hover:bg-white/20 border border-white/25 rounded-md text-white text-xs font-bold px-2 py-0.5 focus:outline-none cursor-pointer transition-colors"
              aria-label="Currency"
            >
              {currencies.map(c => (
                <option key={c} value={c} className="bg-gray-900 text-white font-medium">
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
