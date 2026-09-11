import React from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Trash2 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const WishlistDrawer: React.FC = () => {
  const { 
    wishlist, 
    isWishlistOpen, 
    setIsWishlistOpen, 
    toggleWishlist, 
    moveToCartFromWishlist, 
    formatPrice,
    addToCart,
    openQuickView
  } = useCart();

  if (!isWishlistOpen) return null;

  const handleMoveAllToCart = () => {
    wishlist.forEach(item => {
      addToCart(item);
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div 
        onClick={() => setIsWishlistOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#111827] border-l border-gray-200 dark:border-gray-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h3 className="font-display font-black text-lg text-gray-900 dark:text-white">
                Saved Wishlist ({wishlist.length})
              </h3>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-gray-100 dark:divide-gray-800/80">
            {wishlist.length > 0 ? (
              wishlist.map(product => (
                <div key={product.id} className="pt-4 first:pt-0 flex items-center gap-3.5">
                  <img
                    src={product.image}
                    alt={product.name}
                    onClick={() => {
                      openQuickView(product);
                      setIsWishlistOpen(false);
                    }}
                    className="w-16 h-16 rounded-xl object-cover bg-gray-100 dark:bg-gray-800 shrink-0 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 
                      onClick={() => {
                        openQuickView(product);
                        setIsWishlistOpen(false);
                      }}
                      className="text-xs font-bold text-gray-900 dark:text-white truncate cursor-pointer hover:text-purple-600 dark:hover:text-cyan-400"
                    >
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-900 dark:text-white mt-1">
                      <span>{formatPrice(product.price)}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-[11px] text-gray-400 line-through font-normal">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => moveToCartFromWishlist(product)}
                        className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="p-1.5 text-gray-400 hover:text-rose-500 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-20 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-500 mx-auto flex items-center justify-center">
                  <Heart className="w-7 h-7" />
                </div>
                <h4 className="font-display font-bold text-base text-gray-900 dark:text-white">
                  Your wishlist is empty
                </h4>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                  Heart items as you explore the catalog to save them for later or track their price drops!
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-md hover:scale-105 transition-transform"
                >
                  Explore Drops
                </button>
              </div>
            )}
          </div>

          {/* Footer actions */}
          {wishlist.length > 0 && (
            <div className="p-5 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/60 space-y-2">
              <button
                onClick={handleMoveAllToCart}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All to Cart ({wishlist.length} Items)</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
