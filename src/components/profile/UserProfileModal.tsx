import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Package, 
  Heart, 
  ShieldCheck, 
  CreditCard, 
  MapPin, 
  Sparkles, 
  LogOut, 
  ChevronRight,
  Award,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

export const UserProfileModal: React.FC = () => {
  const { 
    isProfileOpen, 
    setIsProfileOpen, 
    orders, 
    wishlist, 
    setIsOrderTrackingOpen, 
    setIsWishlistOpen,
    showToast,
    currency
  } = useCart();
  const { theme, setTheme } = useTheme();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses' | 'payment'>('overview');
  const [userName, setUserName] = useState('Alex Mercer');
  const [userEmail] = useState('alex.mercer@satro.io');
  const [isEditingName, setIsEditingName] = useState(false);

  if (!isProfileOpen) return null;

  const handleOpenOrders = () => {
    setIsProfileOpen(false);
    setIsOrderTrackingOpen(true);
  };

  const handleOpenWishlist = () => {
    setIsProfileOpen(false);
    setIsWishlistOpen(true);
  };

  const handleLogOut = () => {
    showToast('Signed out of SATRO Account', 'info');
    setIsProfileOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsProfileOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#101726] rounded-3xl shadow-2xl border border-gray-200/80 dark:border-gray-800 overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="relative p-6 sm:p-8 bg-gradient-to-r from-purple-900 via-indigo-950 to-gray-950 text-white overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 left-1/3 w-48 h-48 bg-cyan-500/20 dark:bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setIsProfileOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close Profile"
            >
              <X className="w-5 h-5" />
            </button>

            {/* User Info Bar */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10 text-center sm:text-left">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 p-0.5 shadow-xl shadow-purple-500/30">
                  <div className="w-full h-full rounded-[14px] bg-gray-950 flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" 
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-gray-950 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                </span>
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  {isEditingName ? (
                    <div className="flex items-center gap-2">
                      <input 
                        type="text" 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)}
                        className="bg-white/15 px-2.5 py-1 rounded-lg text-white font-bold text-lg focus:outline-none border border-white/30"
                      />
                      <button 
                        onClick={() => {
                          setIsEditingName(false);
                          showToast('Profile name updated!', 'success');
                        }}
                        className="text-xs bg-emerald-500 text-white font-bold px-2 py-1 rounded-md"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <h2 className="font-display font-black text-2xl text-white flex items-center gap-2">
                      {userName}
                      <button 
                        onClick={() => setIsEditingName(true)}
                        className="text-xs text-gray-400 hover:text-white font-normal"
                      >
                        (edit)
                      </button>
                    </h2>
                  )}

                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-extrabold tracking-wider uppercase">
                    <Award className="w-3.5 h-3.5 text-amber-400" /> VIP Diamond
                  </span>
                </div>

                <p className="text-sm text-gray-300 font-mono">{userEmail}</p>

                <div className="flex items-center justify-center sm:justify-start gap-4 pt-1 text-xs text-gray-400">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Account
                  </span>
                  <span>•</span>
                  <span className="text-gray-300">Member since Jan 2025</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/10 relative z-10 text-center">
              <button 
                onClick={handleOpenOrders}
                className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
              >
                <span className="text-xl sm:text-2xl font-black font-display text-white group-hover:text-cyan-300 transition-colors">
                  {orders.length}
                </span>
                <span className="block text-[11px] text-gray-300 font-medium">Orders Placed</span>
              </button>

              <button 
                onClick={handleOpenWishlist}
                className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
              >
                <span className="text-xl sm:text-2xl font-black font-display text-white group-hover:text-rose-400 transition-colors">
                  {wishlist.length}
                </span>
                <span className="block text-[11px] text-gray-300 font-medium">Saved Items</span>
              </button>

              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xl sm:text-2xl font-black font-display text-amber-400">
                  2,450
                </span>
                <span className="block text-[11px] text-gray-300 font-medium">SATRO Coins</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 px-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3.5 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-purple-600 dark:border-cyan-400 text-purple-600 dark:text-cyan-400'
                  : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Account Overview
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-3.5 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'border-purple-600 dark:border-cyan-400 text-purple-600 dark:text-cyan-400'
                  : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Recent Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`py-3.5 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'addresses'
                  ? 'border-purple-600 dark:border-cyan-400 text-purple-600 dark:text-cyan-400'
                  : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Saved Addresses
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              className={`py-3.5 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'payment'
                  ? 'border-purple-600 dark:border-cyan-400 text-purple-600 dark:text-cyan-400'
                  : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Payment Methods
            </button>
          </div>

          {/* Modal Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* VIP Perks Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/5 to-purple-500/10 border border-amber-400/30 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" /> VIP Club Advantage
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      Active: 20% Instant Discount on all flagship hardware drops
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Coupon auto-applied at checkout: <span className="font-mono font-bold text-purple-600 dark:text-cyan-400">SATRO20</span>
                    </p>
                  </div>
                  <span className="hidden sm:inline-flex px-3 py-1.5 rounded-xl bg-amber-500 text-gray-950 font-black text-xs shadow-sm">
                    Active
                  </span>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div 
                    onClick={handleOpenOrders}
                    className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-purple-500/40 bg-gray-50/50 dark:bg-gray-800/40 cursor-pointer transition-all hover:shadow-md group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Package className="w-5 h-5" />
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">Track Live Deliveries</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Check real-time delivery telemetry & past invoices
                    </p>
                  </div>

                  <div 
                    onClick={handleOpenWishlist}
                    className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-rose-500/40 bg-gray-50/50 dark:bg-gray-800/40 cursor-pointer transition-all hover:shadow-md group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Heart className="w-5 h-5" />
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">Saved Wishlist Drops</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {wishlist.length} drops saved for next drop cycle
                    </p>
                  </div>
                </div>

                {/* Account Preferences Summary */}
                <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Settings & Appearance</h4>
                  <div className="flex items-center justify-between text-xs py-1 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-gray-600 dark:text-gray-400">Current Theme</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold capitalize text-purple-600 dark:text-cyan-400">
                        {theme === 'red-light' ? 'Red Light 🔥' : theme === 'dark' ? 'Dark Mode 🌙' : 'Light Mode ☀️'}
                      </span>
                      <button
                        onClick={() => setTheme(theme === 'red-light' ? 'dark' : theme === 'dark' ? 'light' : 'red-light')}
                        className="text-[11px] text-gray-400 hover:underline"
                      >
                        (Change)
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1">
                    <span className="text-gray-600 dark:text-gray-400">Selected Currency</span>
                    <span className="font-bold font-mono text-gray-900 dark:text-white">
                      {currency.code} ({currency.symbol})
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-4">
                {orders.length > 0 ? (
                  orders.map(order => (
                    <div 
                      key={order.id} 
                      className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-purple-600 dark:text-cyan-400">
                            {order.id}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                            {order.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {order.items.length} items • Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={handleOpenOrders}
                        className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-500 transition-colors"
                      >
                        Track
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-500 mx-auto flex items-center justify-center">
                      <Clock className="w-7 h-7" />
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">No Orders Placed Yet</p>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto">
                      Explore our flagship catalog and claim limited edition hardware drops!
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl border border-purple-500/40 bg-purple-50/20 dark:bg-purple-950/20 relative">
                  <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-extrabold">
                    PRIMARY
                  </span>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-purple-600 dark:text-cyan-400 mt-0.5" />
                    <div className="space-y-1 text-xs">
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm">{userName}</h4>
                      <p className="text-gray-600 dark:text-gray-300">742 Evergreen Cyber Way, Suite 4B</p>
                      <p className="text-gray-600 dark:text-gray-300">San Francisco, CA 94107, United States</p>
                      <p className="text-gray-500 dark:text-gray-400 pt-1">+1 (555) 382-9014</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => showToast('Address manager ready', 'info')}
                  className="w-full py-3 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 hover:border-purple-500 transition-colors"
                >
                  + Add New Delivery Address
                </button>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">Visa ending in •••• 4242</p>
                      <p className="text-[11px] text-gray-500">Expires 09/28 • Default Payment</p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>

                <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">UPI / Instant Pay</p>
                      <p className="text-[11px] text-gray-500">alex.mercer@okhdfcbank</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">Verified</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="p-4 sm:p-5 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0c1220] flex items-center justify-between text-xs">
            <button
              onClick={handleLogOut}
              className="flex items-center gap-1.5 text-rose-500 hover:text-rose-600 font-bold transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>

            <button
              onClick={() => setIsProfileOpen(false)}
              className="px-5 py-2 rounded-xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-bold transition-transform hover:scale-105"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
