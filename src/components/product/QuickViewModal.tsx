import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Check, 
  Truck, 
  ShieldCheck, 
  RotateCcw,
  Zap
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    closeQuickView, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    formatPrice,
    setIsCheckoutOpen
  } = useCart();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    quickViewProduct?.colors?.[0]?.name
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    quickViewProduct?.sizes?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const inWishlist = isInWishlist(quickViewProduct.id);
  const currentImage = quickViewProduct.images[selectedImageIndex] || quickViewProduct.image;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, quantity, selectedColor, selectedSize);
    closeQuickView();
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
      {/* Backdrop */}
      <div 
        onClick={closeQuickView}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity" 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#111827] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-10 max-h-[92vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Gallery (Images) */}
        <div className="md:w-1/2 p-6 bg-gray-50 dark:bg-gray-900/50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white dark:bg-gray-800 mb-4 shadow-inner">
            <img
              src={currentImage}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {quickViewProduct.badge && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-600 text-white shadow-md">
                {quickViewProduct.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {quickViewProduct.images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImageIndex === idx
                      ? 'border-purple-600 scale-105 shadow-md'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Category & Brand */}
            <div className="flex items-center justify-between text-xs uppercase tracking-wider font-bold text-purple-600 dark:text-cyan-400">
              <span>{quickViewProduct.brand}</span>
              <span className="capitalize">{quickViewProduct.category}</span>
            </div>

            {/* Title */}
            <h2 className="font-display font-black text-xl sm:text-2xl text-gray-950 dark:text-white leading-snug">
              {quickViewProduct.name}
            </h2>

            {/* Rating & Stock */}
            <div className="flex items-center gap-3">
              <div className="flex items-center text-amber-400 text-sm">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold text-gray-900 dark:text-white ml-1.5">
                  {quickViewProduct.rating}
                </span>
                <span className="text-gray-400 ml-1">
                  ({quickViewProduct.reviewsCount} reviews)
                </span>
              </div>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                In Stock ({quickViewProduct.stock} available)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="font-display font-black text-3xl text-gray-950 dark:text-white">
                {formatPrice(quickViewProduct.price)}
              </span>
              {quickViewProduct.originalPrice > quickViewProduct.price && (
                <>
                  <span className="text-base text-gray-400 line-through">
                    {formatPrice(quickViewProduct.originalPrice)}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-rose-500/15 text-rose-500 border border-rose-500/30">
                    Save {Math.round(((quickViewProduct.originalPrice - quickViewProduct.price) / quickViewProduct.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {quickViewProduct.description}
            </p>

            {/* Color Swatches */}
            {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Color: <span className="text-purple-600 dark:text-cyan-400">{selectedColor}</span>
                </span>
                <div className="flex items-center gap-2">
                  {quickViewProduct.colors.map(col => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col.name)}
                      className={`w-6 h-6 rounded-full border transition-all ${col.bgClass} ${
                        selectedColor === col.name ? 'ring-2 ring-purple-600 ring-offset-2 scale-110' : 'opacity-80 hover:opacity-100'
                      }`}
                      title={col.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Select Size:
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {quickViewProduct.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                        selectedSize === size
                          ? 'border-purple-600 bg-purple-600 text-white shadow-sm'
                          : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Key Specs Pills */}
            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Key Specifications:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(quickViewProduct.specs).slice(0, 4).map(([key, val]) => (
                  <div key={key}>
                    <span className="text-gray-400 block text-[10px]">{key}</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-200 truncate block">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons: Quantity, Add to Cart, Buy Now, Wishlist */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-xs text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(quickViewProduct.stock, quantity + 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
                  added
                    ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                    : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30 hover:scale-[1.02]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added To Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add To Cart</span>
                  </>
                )}
              </button>

              {/* Wishlist Toggle Button */}
              <button
                onClick={() => toggleWishlist(quickViewProduct)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                  inWishlist
                    ? 'border-rose-500 bg-rose-500 text-white shadow-rose-500/30'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-rose-400'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* Instant Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-gray-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Zap className="w-4 h-4 fill-gray-950" />
              <span>Instant Checkout • {formatPrice(quickViewProduct.price * quantity)}</span>
            </button>

            {/* Micro assurances */}
            <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-cyan-400" /> Express 2-Day
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Genuine Hardware
              </span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-emerald-400" /> 30-Day Returns
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
