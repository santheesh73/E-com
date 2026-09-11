import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowUp, 
  CreditCard, 
  Lock,
  Globe,
  Share2,
  Send,
  MessageSquare
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const { setIsOrderTrackingOpen } = useCart();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-950 text-gray-400 text-sm border-t border-gray-800/80 transition-colors">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-800/60">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-purple-500/20">
              <div className="w-full h-full bg-gray-900 rounded-[10px] flex items-center justify-center font-display font-black text-white text-xl">
                S
              </div>
            </div>
            <div>
              <span className="font-display font-black text-2xl tracking-wider text-white">
                SATRO
              </span>
              <p className="text-xs text-gray-500">Engineered For The Autonomous Generation</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>256-Bit Encrypted Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Official Manufacturer Warranty</span>
            </div>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white border border-gray-800 transition-colors flex items-center gap-1.5"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-xs font-semibold hidden sm:inline">Top</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
            Product Universes
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => onSelectCategory('audio')} className="hover:text-cyan-400 transition-colors">
                Spatial Audio & ANC
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('wearables')} className="hover:text-cyan-400 transition-colors">
                Titanium Smartwatches
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('footwear')} className="hover:text-cyan-400 transition-colors">
                Carbon Running Kicks
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('electronics')} className="hover:text-cyan-400 transition-colors">
                Foldable Flagship Phones
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('gaming')} className="hover:text-cyan-400 transition-colors">
                Magnetic Hall-Effect Keyboards
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('streetwear')} className="hover:text-cyan-400 transition-colors">
                DWR Waterproof Streetwear
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
            Customer Experience
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => setIsOrderTrackingOpen(true)} className="text-cyan-400 font-semibold hover:underline flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Live Order Tracking
              </button>
            </li>
            <li><a href="#shipping" className="hover:text-cyan-400 transition-colors">Same-Day Express Dispatch</a></li>
            <li><a href="#returns" className="hover:text-cyan-400 transition-colors">30-Day Zero Hassle Returns</a></li>
            <li><a href="#concierge" className="hover:text-cyan-400 transition-colors">24/7 VIP Audio Concierge</a></li>
            <li><a href="#warranty" className="hover:text-cyan-400 transition-colors">2-Year Replacement Warranty</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
            SATRO Protocol
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li><a href="#about" className="hover:text-cyan-400 transition-colors">About Our Labs</a></li>
            <li><a href="#sustainability" className="hover:text-cyan-400 transition-colors">Carbon Negative 2026</a></li>
            <li><a href="#careers" className="hover:text-cyan-400 transition-colors">Join Engineering Team</a></li>
            <li><a href="#press" className="hover:text-cyan-400 transition-colors">Press & Media Vault</a></li>
            <li><a href="#creators" className="hover:text-cyan-400 transition-colors">Affiliate & Creator Guild</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
            Connect & Payment
          </h4>
          <p className="text-xs text-gray-400 mb-4">
            Official SATRO global headquarters: San Francisco • Tokyo • Bengaluru • London.
          </p>
          <div className="flex items-center gap-3 mb-6">
            <a href="#community" className="w-8 h-8 rounded-lg bg-gray-900 hover:bg-purple-600 text-white flex items-center justify-center transition-colors" title="Global Community">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#telegram" className="w-8 h-8 rounded-lg bg-gray-900 hover:bg-cyan-600 text-white flex items-center justify-center transition-colors" title="VIP Telegram">
              <Send className="w-4 h-4" />
            </a>
            <a href="#discord" className="w-8 h-8 rounded-lg bg-gray-900 hover:bg-indigo-600 text-white flex items-center justify-center transition-colors" title="Discord Guild">
              <MessageSquare className="w-4 h-4" />
            </a>
            <a href="#share" className="w-8 h-8 rounded-lg bg-gray-900 hover:bg-rose-600 text-white flex items-center justify-center transition-colors" title="Share Drops">
              <Share2 className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <CreditCard className="w-5 h-5 text-gray-400" />
            <span className="text-[11px]">Visa • Mastercard • Amex • Apple Pay • UPI • COD</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-900 py-6 text-center text-xs text-gray-500">
        <p>© 2026 SATRO Inc. All rights reserved. Built with pride for autonomous commerce.</p>
      </div>
    </footer>
  );
};
