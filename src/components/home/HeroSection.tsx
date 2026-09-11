import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Flame, 
  CheckCircle2, 
  ShoppingBag, 
  Eye, 
  Sliders, 
  Award,
  Volume2,
  Activity
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';

interface HeroSectionProps {
  onExploreCatalog: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreCatalog }) => {
  const { addToCart, openQuickView, formatPrice, showToast } = useCart();

  // Flagship hero products
  const heroProducts = [
    PRODUCTS.find(p => p.id === 'satro-pulse-x') || PRODUCTS[0],
    PRODUCTS.find(p => p.id === 'satro-chronos-ultra') || PRODUCTS[1],
    PRODUCTS.find(p => p.id === 'satro-vortex-runner') || PRODUCTS[2],
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProduct = heroProducts[currentIndex];
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Mouse tilt tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Auto-cycle through hero items every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % heroProducts.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [heroProducts.length]);

  const toggleAudioSimulation = () => {
    setIsPlayingAudio(!isPlayingAudio);
    showToast(
      !isPlayingAudio 
        ? 'Spatial Audio Soundstage Activated 🎧' 
        : 'Spatial Audio Paused', 
      'info'
    );
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[640px] lg:min-h-[720px] overflow-hidden bg-gradient-to-b from-purple-100/60 via-purple-50/20 to-white dark:from-purple-950/20 dark:via-transparent dark:to-transparent flex items-center py-12 px-4 sm:px-6 lg:px-8 select-none transition-colors duration-300"
    >
      {/* Light-theme Floating Ambient Gradient Orbs */}
      <div 
        className="absolute -top-32 -left-32 w-[28rem] h-[28rem] bg-gradient-to-tr from-purple-300/40 to-indigo-300/30 dark:from-purple-600/20 dark:to-indigo-500/10 rounded-full blur-3xl pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * -45}px, ${mousePos.y * -45}px)`
        }}
      />
      <div 
        className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] bg-gradient-to-br from-cyan-200/50 to-blue-300/30 dark:from-cyan-500/15 dark:to-blue-600/10 rounded-full blur-3xl pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * 55}px, ${mousePos.y * 55}px)`
        }}
      />
      <div 
        className="absolute -bottom-16 left-1/3 w-80 h-80 bg-rose-200/30 dark:bg-purple-900/10 rounded-full blur-2xl pointer-events-none" 
      />

      {/* Decorative Floating Geometric Shapes */}
      <div className="absolute top-20 right-1/4 w-3 h-3 rounded-full bg-purple-500 animate-ping opacity-60 pointer-events-none hidden md:block" />
      <div className="absolute bottom-24 left-1/4 w-2 h-2 rounded-full bg-cyan-400 animate-pulse opacity-80 pointer-events-none hidden md:block" />

      {/* Subtle Matrix Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800d_1px,transparent_1px),linear-gradient(to_bottom,#8080800d_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Content Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Top animated badge with glowing ping */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-purple-500/15 border border-purple-200 dark:border-purple-500/30 text-xs font-semibold text-purple-700 dark:text-cyan-300 backdrop-blur-md shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="tracking-wide uppercase text-[11px] font-black">SATRO Cyber Drop 2026</span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span className="text-gray-600 dark:text-gray-300 font-medium">Limited Edition Vault</span>
          </div>

          {/* Dynamic Animated Main Title */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="space-y-3"
            >
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-gray-950 dark:text-white">
                Autonomous <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 dark:from-purple-400 dark:via-cyan-300 dark:to-emerald-400 bg-clip-text text-transparent">
                  {currentProduct.name.split(' ')[1] || 'Spatial'} {currentProduct.name.split(' ')[2] || 'Acoustics'}
                </span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl line-clamp-2 leading-relaxed font-normal">
                {currentProduct.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Pricing & Audio Simulation Bar */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black font-display text-gray-950 dark:text-white">
                {formatPrice(currentProduct.price)}
              </span>
              <span className="text-lg text-gray-400 line-through">
                {formatPrice(currentProduct.originalPrice)}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-black">
                Save {Math.round(((currentProduct.originalPrice - currentProduct.price) / currentProduct.originalPrice) * 100)}%
              </span>
            </div>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 hidden sm:block" />

            <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-500/15 px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-500/20">
              <Flame className="w-4 h-4 fill-amber-500" />
              <span>Only {currentProduct.stock} left in stock</span>
            </div>

            {/* Audio Equalizer Demo Toggle */}
            <button
              onClick={toggleAudioSimulation}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${
                isPlayingAudio
                  ? 'border-cyan-500 bg-cyan-50 text-cyan-700 shadow-sm dark:bg-cyan-950/40 dark:text-cyan-300'
                  : 'border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-purple-400'
              }`}
            >
              <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'text-cyan-500 animate-bounce' : 'text-gray-400'}`} />
              <span>{isPlayingAudio ? 'Audio Live' : 'Sound Test'}</span>
              {isPlayingAudio && (
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-cyan-500 rounded-full animate-soundwave-1" />
                  <span className="w-0.5 bg-cyan-500 rounded-full animate-soundwave-2" />
                  <span className="w-0.5 bg-cyan-500 rounded-full animate-soundwave-3" />
                  <span className="w-0.5 bg-cyan-500 rounded-full animate-soundwave-4" />
                </div>
              )}
            </button>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <div className="relative group">
              <button
                onClick={() => addToCart(currentProduct)}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-black text-sm tracking-wide shadow-xl shadow-purple-600/25 hover:shadow-cyan-500/25 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 relative overflow-hidden"
              >
                {/* Shimmer line inside CTA */}
                <div className="absolute inset-0 shimmer-badge pointer-events-none" />
                <ShoppingBag className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Claim This Drop</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <button
              onClick={() => openQuickView(currentProduct)}
              className="px-5 py-3.5 rounded-2xl bg-white hover:bg-gray-50 dark:bg-gray-800/80 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white font-bold text-sm transition-all flex items-center gap-2 shadow-xs hover:scale-[1.02]"
            >
              <Eye className="w-4 h-4 text-purple-600 dark:text-cyan-400" />
              <span>Quick View</span>
            </button>

            <button
              onClick={onExploreCatalog}
              className="px-5 py-3.5 rounded-2xl text-purple-700 dark:text-cyan-400 hover:underline font-bold text-sm flex items-center gap-1.5"
            >
              <Sliders className="w-4 h-4" />
              <span>Explore All 150+ Drops</span>
            </button>
          </div>

          {/* Product Switcher Pills */}
          <div className="pt-4 border-t border-gray-200/80 dark:border-gray-800/60">
            <span className="text-[11px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 block mb-2.5">
              Switch Featured Flagship:
            </span>
            <div className="flex items-center gap-2.5 flex-wrap">
              {heroProducts.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                    idx === currentIndex
                      ? 'border-purple-600 bg-white text-purple-700 shadow-md ring-2 ring-purple-500/20 scale-105 dark:bg-purple-950/40 dark:text-cyan-300 dark:border-cyan-400'
                      : 'border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400 hover:border-gray-400'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-purple-600 dark:bg-cyan-400 animate-pulse' : 'bg-gray-400'}`} />
                  <span className="truncate max-w-[140px]">{p.name.split(' ')[1]} {p.name.split(' ')[2]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Social Proof Mini Stats */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="p-3 rounded-2xl bg-white/70 dark:bg-gray-900/50 border border-gray-200/70 dark:border-gray-800 shadow-xs">
              <span className="text-xl sm:text-2xl font-black font-display text-gray-950 dark:text-white">120K+</span>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Verified Buyers</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/70 dark:bg-gray-900/50 border border-gray-200/70 dark:border-gray-800 shadow-xs">
              <span className="text-xl sm:text-2xl font-black font-display text-purple-600 dark:text-cyan-400">4.9 ★</span>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Satisfaction Score</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/70 dark:bg-gray-900/50 border border-gray-200/70 dark:border-gray-800 shadow-xs">
              <span className="text-xl sm:text-2xl font-black font-display text-emerald-600 dark:text-emerald-400">2-Day</span>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Global Dispatch</p>
            </div>
          </div>
        </div>

        {/* Right 3D Showcase Column (5 cols) */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          
          {/* Animated 3D Floating Stage with Mouse Tilt */}
          <div 
            className="relative w-full max-w-md aspect-square flex items-center justify-center preserve-3d"
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 22}deg) rotateX(${mousePos.y * -22}deg)`,
              transition: 'transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}
          >
            {/* Glowing Orbital Rings in background */}
            <div className="absolute inset-2 rounded-full border-2 border-dashed border-purple-300/40 dark:border-purple-500/30 animate-spin-slow pointer-events-none" />
            <div className="absolute inset-10 rounded-full border border-cyan-400/30 pointer-events-none" />
            <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-purple-400/20 via-cyan-300/20 to-indigo-400/20 dark:from-purple-600/30 dark:to-cyan-500/30 blur-2xl pointer-events-none" />

            {/* Central Product Image with Framer Motion Spring Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProduct.id}
                initial={{ opacity: 0, scale: 0.82, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.88, rotate: 4 }}
                transition={{ type: 'spring', damping: 20, stiffness: 220 }}
                className="relative z-20 group cursor-pointer"
                onClick={() => openQuickView(currentProduct)}
              >
                <div className="relative rounded-3xl p-3 bg-white/90 dark:bg-white/10 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-2xl shadow-purple-500/15 overflow-hidden">
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className="w-72 sm:w-80 h-72 sm:h-80 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Subtle shine on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Hotspot indicator 1 */}
                  <div className="absolute top-10 right-10 group/hotspot">
                    <span className="flex h-4 w-4 relative items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-600" />
                    </span>
                    <div className="absolute right-6 top-0 bg-gray-950/90 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur whitespace-nowrap opacity-0 group-hover/hotspot:opacity-100 transition-opacity pointer-events-none shadow-lg">
                      Aerospace Grade
                    </div>
                  </div>

                  {/* Hotspot indicator 2 */}
                  <div className="absolute bottom-12 left-10 group/hotspot">
                    <span className="flex h-4 w-4 relative items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
                    </span>
                    <div className="absolute left-6 bottom-0 bg-gray-950/90 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur whitespace-nowrap opacity-0 group-hover/hotspot:opacity-100 transition-opacity pointer-events-none shadow-lg">
                      Biometric Touch Sensors
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Floating 3D Badge 1: Top Left */}
            <div 
              className="absolute -top-4 -left-4 z-30 animate-float"
              style={{
                transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)`
              }}
            >
              <div className="glass-card px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 border border-purple-200 dark:border-purple-500/30">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                  <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-black text-purple-700 dark:text-cyan-400 block">
                    Fast Track
                  </span>
                  <span className="text-xs font-bold text-gray-900 dark:text-white">
                    40-Hour Reserve
                  </span>
                </div>
              </div>
            </div>

            {/* Floating 3D Badge 2: Bottom Right */}
            <div 
              className="absolute -bottom-4 -right-4 z-30 animate-float-delayed"
              style={{
                transform: `translate(${mousePos.x * 35}px, ${mousePos.y * 35}px)`
              }}
            >
              <div className="glass-card px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 border border-cyan-200 dark:border-cyan-500/30">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center text-white shadow-md">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[11px] font-black text-amber-500">
                    <span>★ 4.9</span>
                    <span className="text-gray-400 font-normal">({currentProduct.reviewsCount} reviews)</span>
                  </div>
                  <span className="text-xs font-bold text-gray-900 dark:text-white block">
                    Verified Flagship
                  </span>
                </div>
              </div>
            </div>

            {/* Floating 3D Badge 3: Left Center */}
            <div 
              className="absolute top-1/2 -left-8 z-30 hidden sm:block animate-float"
              style={{
                transform: `translate(${mousePos.x * -18}px, ${mousePos.y * 22}px)`
              }}
            >
              <div className="glass-card px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-1.5 border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-black">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero Latency</span>
              </div>
            </div>

            {/* Floating 3D Badge 4: Right Center */}
            <div 
              className="absolute top-1/4 -right-6 z-30 hidden sm:block animate-float-delayed"
              style={{
                transform: `translate(${mousePos.x * 22}px, ${mousePos.y * -18}px)`
              }}
            >
              <div className="glass-card px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-cyan-300 text-[11px] font-bold">
                <Activity className="w-3.5 h-3.5 text-purple-600" />
                <span>Lossless Hi-Fi</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
