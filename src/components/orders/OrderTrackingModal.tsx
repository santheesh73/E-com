import React, { useState } from 'react';
import { 
  X, 
  Package, 
  CheckCircle2, 
  Truck, 
  MapPin, 
  Search 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const OrderTrackingModal: React.FC = () => {
  const { 
    isOrderTrackingOpen, 
    setIsOrderTrackingOpen, 
    orders, 
    formatPrice,
    lastOrder 
  } = useCart();

  const [searchOrderId, setSearchOrderId] = useState('');

  if (!isOrderTrackingOpen) return null;

  // Selected order to view: either matches searched ID, or last order, or the first order in history
  const activeOrder = searchOrderId.trim()
    ? orders.find(o => o.id.toLowerCase() === searchOrderId.trim().toLowerCase())
    : lastOrder || orders[0];

  const steps = [
    { title: 'Order Confirmed', time: 'Today, 10:14 AM', completed: true, active: false },
    { title: 'Hardware QC Passed & Packed', time: 'Today, 11:30 AM', completed: true, active: false },
    { title: 'Dispatched via SATRO Priority Air', time: 'In Transit', completed: true, active: true },
    { title: 'Out for Local Delivery', time: 'Tomorrow, by 2:00 PM', completed: false, active: false },
    { title: 'Delivered', time: 'Estimated Friday', completed: false, active: false },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto select-none">
      {/* Backdrop */}
      <div 
        onClick={() => setIsOrderTrackingOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity" 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#111827] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-10 my-8 flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-900/40">
          <div className="flex items-center gap-2.5">
            <Package className="w-5 h-5 text-purple-600 dark:text-cyan-400" />
            <h3 className="font-display font-bold text-base text-gray-900 dark:text-white">
              Order Telemetry & Tracking
            </h3>
          </div>
          <button
            onClick={() => setIsOrderTrackingOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Order Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchOrderId}
              onChange={e => setSearchOrderId(e.target.value)}
              placeholder="Search by Order ID (e.g. SATRO-918234)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-900 dark:text-white font-mono placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          </div>

          {activeOrder ? (
            <div className="space-y-6">
              
              {/* Order Meta Header Banner */}
              <div className="p-5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-base text-purple-700 dark:text-cyan-300">
                      {activeOrder.id}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-500 border border-cyan-500/30">
                      IN TRANSIT
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Carrier: SATRO Express Logistics • Tracking #{activeOrder.trackingNumber}
                  </p>
                </div>
                <div className="text-right sm:text-right">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Total Value</span>
                  <span className="font-mono font-black text-base text-gray-900 dark:text-white">
                    {formatPrice(activeOrder.total)}
                  </span>
                </div>
              </div>

              {/* Live Tracking Timeline */}
              <div className="space-y-4">
                <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white">
                  Live Dispatch Status
                </h4>
                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-purple-500/30">
                  {steps.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      <div className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        step.completed
                          ? 'bg-purple-600 border-purple-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700'
                      }`}>
                        {step.completed && <CheckCircle2 className="w-2.5 h-2.5 fill-current" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-xs font-bold ${
                            step.active 
                              ? 'text-cyan-500 flex items-center gap-1.5 animate-pulse' 
                              : step.completed 
                              ? 'text-gray-900 dark:text-white' 
                              : 'text-gray-400'
                          }`}>
                            {step.title}
                            {step.active && <Truck className="w-3.5 h-3.5" />}
                          </p>
                          <span className="text-[11px] text-gray-400">{step.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address & Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 text-xs space-y-1">
                  <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-purple-600" />
                    Delivery Destination
                  </span>
                  <p className="text-gray-600 dark:text-gray-300">{activeOrder.shippingAddress.fullName}</p>
                  <p className="text-gray-500">{activeOrder.shippingAddress.street}</p>
                  <p className="text-gray-500">{activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.state} {activeOrder.shippingAddress.zipCode}</p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 text-xs space-y-2">
                  <span className="font-bold text-gray-900 dark:text-white">
                    Hardware In Package ({activeOrder.items.length})
                  </span>
                  <div className="space-y-1.5 max-h-24 overflow-y-auto">
                    {activeOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-gray-600 dark:text-gray-400">
                        <span className="truncate max-w-[150px]">{item.product.name} (x{item.quantity})</span>
                        <span className="font-mono text-gray-900 dark:text-white">{formatPrice(item.product.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="py-12 text-center space-y-3">
              <Package className="w-12 h-12 text-gray-400 mx-auto" />
              <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white">
                No orders found
              </h4>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                {searchOrderId ? `No order matching "${searchOrderId}" was found.` : 'You haven\'t placed any orders yet. Place a test order to watch live tracking in action!'}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
