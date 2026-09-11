import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { Product, CartItem, CurrencyCode, CurrencyConfig, Order, ShippingAddress } from '../types';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warn';
}

interface Coupon {
  code: string;
  discountPercent: number;
  description: string;
}

const AVAILABLE_COUPONS: Record<string, Coupon> = {
  SATRO20: { code: 'SATRO20', discountPercent: 20, description: '20% OFF Everything' },
  CYBER50: { code: 'CYBER50', discountPercent: 15, description: '15% Off Cyber Deals' },
  WELCOME10: { code: 'WELCOME10', discountPercent: 10, description: '10% Welcome Discount' },
};

const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0 },
  INR: { code: 'INR', symbol: '₹', rate: 83.5 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.78 },
};

interface CartContextType {
  cart: CartItem[];
  wishlist: Product[];
  currency: CurrencyConfig;
  setCurrencyCode: (code: CurrencyCode) => void;
  formatPrice: (usdAmount: number) => string;
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColor?: string, selectedSize?: string) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (product: Product) => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  // Totals
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  freeShippingThreshold: number;
  finalTotal: number;
  totalItemCount: number;
  // Modal states
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isOrderTrackingOpen: boolean;
  setIsOrderTrackingOpen: (open: boolean) => void;
  // Orders
  orders: Order[];
  createOrder: (address: ShippingAddress, paymentMethod: Order['paymentMethod']) => Order;
  lastOrder: Order | null;
  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warn') => void;
  removeToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state with persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('satro-cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state with persistence
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('satro-wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders state with persistence
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('satro-orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Currency
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>('USD');
  const currency = CURRENCIES[currencyCode];

  // Applied Coupon
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    localStorage.setItem('satro-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('satro-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('satro-orders', JSON.stringify(orders));
  }, [orders]);

  const showToast = (message: string, type: 'success' | 'info' | 'warn' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const formatPrice = (usdAmount: number): string => {
    const converted = usdAmount * currency.rate;
    if (currency.code === 'INR') {
      return `${currency.symbol}${Math.round(converted).toLocaleString('en-IN')}`;
    }
    return `${currency.symbol}${converted.toFixed(2)}`;
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedColor = product.colors?.[0]?.name,
    selectedSize = product.sizes?.[0]
  ) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedColor, selectedSize }];
      }
    });

    showToast(`Added "${product.name.slice(0, 24)}..." to cart!`, 'success');
  };

  const removeFromCart = (productId: string, selectedColor?: string, selectedSize?: string) => {
    setCart(prev =>
      prev.filter(
        item =>
          !(
            item.product.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
          )
      )
    );
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor, selectedSize);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (
          item.product.id === productId &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        showToast(`Removed from wishlist`, 'info');
        return prev.filter(p => p.id !== product.id);
      } else {
        showToast(`Saved to wishlist! ❤️`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  const moveToCartFromWishlist = (product: Product) => {
    addToCart(product);
    setWishlist(prev => prev.filter(p => p.id !== product.id));
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (AVAILABLE_COUPONS[clean]) {
      setAppliedCoupon(AVAILABLE_COUPONS[clean]);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#06b6d4', '#ec4899', '#eab308']
      });
      showToast(`Coupon ${clean} applied: ${AVAILABLE_COUPONS[clean].description}!`, 'success');
      return { success: true, message: `Coupon applied: ${AVAILABLE_COUPONS[clean].description}` };
    }
    showToast('Invalid promo code. Try SATRO20 or CYBER50', 'warn');
    return { success: false, message: 'Invalid promo code. Try SATRO20 or CYBER50' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = 150;
  const shippingFee = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 15;
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const createOrder = (shippingAddress: ShippingAddress, paymentMethod: Order['paymentMethod']): Order => {
    const newOrder: Order = {
      id: 'SATRO-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...cart],
      subtotal,
      discount: discountAmount,
      shipping: shippingFee,
      total: finalTotal,
      shippingAddress,
      paymentMethod,
      status: 'confirmed',
      trackingNumber: 'TRK-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      estimatedDelivery: 'Express Delivery in 2 Business Days',
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastOrder(newOrder);
    clearCart();
    setAppliedCoupon(null);

    // Big celebration confetti
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899']
    });

    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        currency,
        setCurrencyCode,
        formatPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        shippingFee,
        freeShippingThreshold,
        finalTotal,
        totalItemCount,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderTrackingOpen,
        setIsOrderTrackingOpen,
        orders,
        createOrder,
        lastOrder,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
