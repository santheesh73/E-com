import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Check, 
  Truck 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    formatPrice, 
    subtotal, 
    discountAmount, 
    shippingFee, 
    freeShippingThreshold, 
    finalTotal, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon,
    setIsCheckoutOpen 
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShip = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    applyCoupon(couponInput);
    setCouponInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
      />

      {/* Slide-over Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#111827] border-l border-gray-200 dark:border-gray-800 shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-purple-600 dark:text-cyan-400" />
              <h3 className="font-display font-black text-lg text-gray-900 dark:text-white">
                Your Bag ({cart.reduce((acc, i) => acc + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-5 py-3 bg-purple-50 dark:bg-purple-950/30 border-b border-purple-100 dark:border-purple-900/40 text-xs">
            <div className="flex items-center justify-between mb-1.5 font-semibold">
              <span className="flex items-center gap-1.5 text-purple-700 dark:text-purple-300">
                <Truck className="w-3.5 h-3.5 text-cyan-400" />
                {remainingForFreeShip === 0 ? (
                  <span className="text-emerald-500 font-bold">🎉 You unlocked FREE Express Delivery!</span>
                ) : (
                  <span>Add <span className="text-purple-600 dark:text-cyan-400 font-bold">{formatPrice(remainingForFreeShip)}</span> for FREE Express Shipping</span>
                )}
              </span>
              <span className="text-gray-500 dark:text-gray-400">{progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-600 to-cyan-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-gray-100 dark:divide-gray-800/80">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div key={index} className="pt-4 first:pt-0 flex items-center gap-3.5">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-gray-100 dark:bg-gray-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                      {item.product.name}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                      {item.selectedColor && (
                        <span>Color: <strong className="text-gray-700 dark:text-gray-300">{item.selectedColor}</strong></span>
                      )}
                      {item.selectedSize && (
                        <span>• Size: <strong className="text-gray-700 dark:text-gray-300">{item.selectedSize}</strong></span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity adjuster */}
                      <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 p-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                          className="w-6 h-6 flex items-center justify-center font-bold text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                          className="w-6 h-6 flex items-center justify-center font-bold text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold text-xs text-gray-900 dark:text-white font-mono">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                    className="p-1.5 text-gray-400 hover:text-rose-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-20 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-600 mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h4 className="font-display font-bold text-base text-gray-900 dark:text-white">
                  Your cart is empty
                </h4>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                  Looks like you haven't added any cyber drops yet. Check out our flash deals!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-md hover:scale-105 transition-transform"
                >
                  Explore Drops
                </button>
              </div>
            )}
          </div>

          {/* Drawer Footer (Promo, Summary & Checkout) */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/60 space-y-4">
              
              {/* Promo code form */}
              {!appliedCoupon ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      placeholder="Promo code (e.g. SATRO20)"
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-900 dark:text-white placeholder-gray-400 uppercase font-mono font-bold focus:outline-none focus:border-purple-500"
                    />
                    <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-black dark:bg-gray-800 dark:hover:bg-gray-700 text-white text-xs font-bold transition-all"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercent}% OFF)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-gray-400 hover:text-rose-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-gray-900 dark:text-white font-semibold">{formatPrice(subtotal)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-500 font-semibold">
                    <span>Discount ({appliedCoupon.discountPercent}%)</span>
                    <span className="font-mono">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-mono text-gray-900 dark:text-white font-semibold">
                    {shippingFee === 0 ? <strong className="text-emerald-500">FREE</strong> : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-800 flex justify-between text-sm font-bold text-gray-950 dark:text-white">
                  <span>Estimated Total</span>
                  <span className="font-mono text-base font-black text-purple-600 dark:text-cyan-400">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
