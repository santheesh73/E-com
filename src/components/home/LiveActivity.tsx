import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';

export const LiveActivity: React.FC = () => {
  const { openQuickView } = useCart();
  const [currentNotification, setCurrentNotification] = useState<{
    city: string;
    product: typeof PRODUCTS[0];
    timeAgo: string;
  } | null>(null);

  const [dismissed, setDismissed] = useState(false);

  const cities = ['New York, USA', 'Tokyo, Japan', 'London, UK', 'Berlin, Germany', 'Bengaluru, India', 'Sydney, Australia', 'Paris, France', 'Toronto, Canada'];
  const times = ['Just now', '2 minutes ago', '4 minutes ago', '7 minutes ago'];

  useEffect(() => {
    if (dismissed) return;

    // Trigger random purchase alert every 14 seconds
    const interval = setInterval(() => {
      const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const randomTime = times[Math.floor(Math.random() * times.length)];

      setCurrentNotification({
        city: randomCity,
        product: randomProduct,
        timeAgo: randomTime,
      });

      // Hide after 6 seconds
      setTimeout(() => {
        setCurrentNotification(null);
      }, 6000);
    }, 14000);

    return () => clearInterval(interval);
  }, [dismissed]);

  if (dismissed || !currentNotification) return null;

  return (
    <div className="fixed bottom-6 left-6 z-30 max-w-xs sm:max-w-sm pointer-events-auto">
      <AnimatePresence>
        {currentNotification && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="p-3 rounded-2xl bg-white/95 dark:bg-gray-900/95 border border-purple-500/30 shadow-2xl backdrop-blur-xl flex items-center gap-3 relative overflow-hidden group cursor-pointer"
            onClick={() => openQuickView(currentNotification.product)}
          >
            {/* Ambient accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-cyan-400" />

            <img
              src={currentNotification.product.image}
              alt={currentNotification.product.name}
              className="w-12 h-12 rounded-xl object-cover bg-gray-100 dark:bg-gray-800 shrink-0 ml-1"
            />

            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-1.5 text-[10px] text-purple-600 dark:text-cyan-400 font-bold uppercase tracking-wider">
                <ShoppingBag className="w-3 h-3" />
                <span>Recent Verified Order</span>
              </div>
              <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                {currentNotification.product.name}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Purchased in {currentNotification.city} • {currentNotification.timeAgo}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setDismissed(true);
              }}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
