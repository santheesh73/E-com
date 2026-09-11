import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Sparkles, Check, Copy } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);
  const { showToast, applyCoupon } = useCart();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'warn');
      return;
    }

    setSubscribed(true);
    // Fire festive celebratory confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#8b5cf6', '#06b6d4', '#f59e0b', '#ec4899', '#10b981']
    });

    showToast('Welcome to SATRO VIP! Coupon SATRO20 unlocked!', 'success');
  };

  const handleCopyAndApply = () => {
    navigator.clipboard.writeText('SATRO20');
    setCopied(true);
    applyCoupon('SATRO20');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-950 to-gray-900 border border-purple-500/30 text-white shadow-2xl">
        {/* Glow ambient spots */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-xs font-bold text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>SATRO VIP CLUB</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
            Unlock 20% Off Your First Cyber Drop
          </h2>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Get early VIP access to limited edition drops, exclusive firmware updates, private sales, and secret discount drops before anyone else.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email for 20% off..."
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 backdrop-blur-md"
                  required
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-4" />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-gray-950 font-black text-sm tracking-wide shadow-lg shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
              >
                Claim 20% Off
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md max-w-md mx-auto text-center space-y-3 animate-fadeIn">
              <div className="flex items-center justify-center gap-2 text-cyan-400 font-bold text-sm">
                <Check className="w-5 h-5" />
                <span>VIP Membership Activated!</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="px-4 py-2 bg-gray-900/80 border border-purple-400/40 rounded-xl font-mono text-base font-black tracking-widest text-cyan-300">
                  SATRO20
                </div>
                <button
                  onClick={handleCopyAndApply}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Applied!' : 'Copy & Apply'}</span>
                </button>
              </div>
            </div>
          )}

          <p className="text-[11px] text-gray-400">
            🔒 We respect your privacy. Zero spam, unsubscribe anytime with one click.
          </p>
        </div>
      </div>
    </section>
  );
};
