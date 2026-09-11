import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Eye, 
  Star, 
  Flame, 
  Check 
} from 'lucide-react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    openQuickView, 
    formatPrice 
  } = useCart();
  
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, selectedColor);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  // Secondary image for hover flip if available
  const displayImage = isHovered && product.images.length > 1 ? product.images[1] : product.image;

  // Badge color mapping
  const getBadgeStyle = () => {
    switch (product.badgeType) {
      case 'hot':
        return 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-rose-500/20';
      case 'sale':
        return 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-500/20';
      case 'limited':
        return 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/20';
      case 'new':
        return 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/20';
      default:
        return 'bg-purple-600 text-white';
    }
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl bg-white dark:bg-[#121927] border border-gray-200/90 dark:border-gray-800/80 hover:border-purple-500/50 dark:hover:border-purple-500/40 shadow-xs hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col overflow-hidden"
    >
      {/* Image Container with Badges and Floating Buttons */}
      <div 
        onClick={() => openQuickView(product)}
        className="relative aspect-square w-full bg-gray-100 dark:bg-gray-800/40 overflow-hidden cursor-pointer"
      >
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md ${getBadgeStyle()}`}>
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500/90 text-white backdrop-blur shadow-sm w-max">
              -{discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-20 backdrop-blur-md ${
            inWishlist
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40 scale-110'
              : 'bg-white/80 dark:bg-gray-900/80 text-gray-700 dark:text-gray-300 hover:text-rose-500 hover:scale-110'
          }`}
          aria-label="Toggle Wishlist"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="w-full py-2 px-3 rounded-xl bg-gray-950/85 hover:bg-gray-950 text-white text-xs font-semibold backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>Quick View</span>
          </button>
        </div>

        {/* Stock urgency tag */}
        {product.stock <= 5 && (
          <div className="absolute bottom-2 left-2 z-10 px-2 py-0.5 rounded bg-amber-500/90 text-gray-950 text-[10px] font-bold flex items-center gap-1 shadow">
            <Flame className="w-3 h-3 fill-gray-950" />
            <span>Only {product.stock} left</span>
          </div>
        )}
      </div>

      {/* Details Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div className="space-y-1">
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
            <span>{product.brand}</span>
            <span className="capitalize text-purple-600 dark:text-cyan-400">{product.category}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => openQuickView(product)}
            className="font-display font-bold text-sm text-gray-900 dark:text-white line-clamp-2 hover:text-purple-600 dark:hover:text-cyan-400 cursor-pointer transition-colors"
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 pt-0.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200 ml-1">
                {product.rating}
              </span>
            </div>
            <span className="text-xs text-gray-400">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Color swatches if any */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-gray-400 font-medium">Colors:</span>
            <div className="flex items-center gap-1">
              {product.colors.map(col => (
                <button
                  key={col.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(col.name);
                  }}
                  title={col.name}
                  className={`w-3.5 h-3.5 rounded-full border ${col.bgClass} transition-transform ${
                    selectedColor === col.name ? 'ring-2 ring-purple-500 scale-125' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Bottom Price & Add to Cart */}
        <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="text-base font-black font-display text-gray-950 dark:text-white">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice > product.price && (
              <div className="text-xs text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 shadow-md ${
              addedAnimation
                ? 'bg-emerald-500 text-white shadow-emerald-500/30 scale-95'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-600/20 hover:scale-105 active:scale-95'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
