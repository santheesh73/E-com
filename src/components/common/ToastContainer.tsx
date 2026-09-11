import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCart();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none select-none">
      <AnimatePresence>
        {toasts.map(toast => {
          const getIcon = () => {
            switch (toast.type) {
              case 'info':
                return <Info className="w-4 h-4 text-cyan-400" />;
              case 'warn':
                return <AlertTriangle className="w-4 h-4 text-amber-400" />;
              case 'success':
              default:
                return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
            }
          };

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl bg-gray-950/90 text-white border border-gray-800 shadow-2xl backdrop-blur-xl text-xs font-semibold"
            >
              {getIcon()}
              <span className="flex-1 text-gray-200">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-gray-400 hover:text-white"
                aria-label="Dismiss toast"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
