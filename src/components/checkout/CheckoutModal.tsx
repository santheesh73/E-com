import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  QrCode, 
  Building, 
  Banknote, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  Sparkles 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import type { ShippingAddress } from '../../types';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    finalTotal, 
    shippingFee, 
    discountAmount, 
    subtotal, 
    formatPrice, 
    createOrder,
    lastOrder,
    setIsOrderTrackingOpen
  } = useCart();

  const [step, setStep] = useState<'address' | 'payment' | 'confirmation'>('address');

  // Address state
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Santheesh Kumar',
    email: 'santheesh@example.com',
    phone: '+1 (555) 382-9012',
    street: '742 Cyber Matrix Blvd, Suite 400',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94107',
    country: 'United States',
  });

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('742');

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = () => {
    createOrder(address, paymentMethod);
    setStep('confirmation');
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('address');
  };

  const handleTrackOrderFromReceipt = () => {
    handleClose();
    setIsOrderTrackingOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto select-none">
      {/* Backdrop */}
      <div 
        onClick={step === 'confirmation' ? handleClose : undefined}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#111827] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-10 my-8">
        
        {/* Modal Top Bar */}
        <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-900/40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-black text-sm">
              S
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-gray-900 dark:text-white">
                SATRO Checkout
              </h3>
              <p className="text-[10px] text-gray-400">256-Bit Encrypted Secure Session</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step progress indicator */}
        {step !== 'confirmation' && (
          <div className="px-6 py-3 bg-purple-500/5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-center gap-6 text-xs font-semibold">
            <span className={`flex items-center gap-1.5 ${step === 'address' ? 'text-purple-600 dark:text-cyan-400 font-bold' : 'text-emerald-500'}`}>
              <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold">1</span>
              Shipping Details
            </span>
            <span className="text-gray-400">→</span>
            <span className={`flex items-center gap-1.5 ${step === 'payment' ? 'text-purple-600 dark:text-cyan-400 font-bold' : 'text-gray-400'}`}>
              <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold">2</span>
              Payment & Review
            </span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          
          {/* STEP 1: SHIPPING ADDRESS */}
          {step === 'address' && (
            <div className="space-y-5">
              <h4 className="font-display font-bold text-lg text-gray-900 dark:text-white">
                Where should we dispatch your drop?
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-400 block mb-1">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={e => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-purple-500/20"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-400 block mb-1">
                    Email for Tracking Updates
                  </label>
                  <input
                    type="email"
                    value={address.email}
                    onChange={e => setAddress({ ...address, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white font-medium"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-400 block mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={e => setAddress({ ...address, street: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-400 block mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={e => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-400 block mb-1">
                    State / Region
                  </label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={e => setAddress({ ...address, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-400 block mb-1">
                    Zip / Postal Code
                  </label>
                  <input
                    type="text"
                    value={address.zipCode}
                    onChange={e => setAddress({ ...address, zipCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-400 block mb-1">
                    Phone Contact
                  </label>
                  <input
                    type="text"
                    value={address.phone}
                    onChange={e => setAddress({ ...address, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white font-medium"
                    required
                  />
                </div>
              </div>

              {/* Order quick summary */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs">
                <span>{cart.length} items in cart</span>
                <span className="font-bold text-sm text-gray-900 dark:text-white">
                  Total: {formatPrice(finalTotal)}
                </span>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setStep('payment')}
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all hover:scale-105"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PAYMENT & REVIEW */}
          {step === 'payment' && (
            <div className="space-y-6">
              <h4 className="font-display font-bold text-lg text-gray-900 dark:text-white">
                Select Payment Method
              </h4>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-cyan-400'
                      : 'border-gray-200 dark:border-gray-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-cyan-400'
                      : 'border-gray-200 dark:border-gray-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <QrCode className="w-5 h-5" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-cyan-400'
                      : 'border-gray-200 dark:border-gray-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Building className="w-5 h-5" />
                  <span>Net Banking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-cyan-400'
                      : 'border-gray-200 dark:border-gray-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Banknote className="w-5 h-5" />
                  <span>COD</span>
                </button>
              </div>

              {/* Payment Details Form */}
              {paymentMethod === 'card' && (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-900 to-purple-950 text-white border border-purple-500/30 space-y-4 shadow-xl">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono text-purple-300">SATRO TITANIUM CARD</span>
                    <Lock className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 block mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      className="w-full bg-black/40 border border-purple-500/40 rounded-xl px-3 py-2 text-sm font-mono tracking-widest text-cyan-300"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-gray-400 block mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(e.target.value)}
                        className="w-full bg-black/40 border border-purple-500/40 rounded-xl px-3 py-2 text-xs font-mono text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 block mb-1">CVV</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={e => setCardCvv(e.target.value)}
                        className="w-full bg-black/40 border border-purple-500/40 rounded-xl px-3 py-2 text-xs font-mono text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-800 text-center space-y-3">
                  <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl shadow border flex items-center justify-center">
                    <div className="w-full h-full bg-[radial-gradient(#000_2px,transparent_2px)] [background-size:8px_8px] border-2 border-dashed border-gray-400 flex items-center justify-center text-[10px] font-bold text-gray-700">
                      SCAN VIA UPI
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Scan with Google Pay, PhonePe, Paytm, or any UPI app to pay {formatPrice(finalTotal)}.
                  </p>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-800 text-xs space-y-2">
                  <span className="font-bold text-gray-700 dark:text-gray-300">Popular Banks:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {['HDFC Bank', 'Chase Morgan', 'ICICI Bank', 'HSBC Global'].map(b => (
                      <button
                        key={b}
                        type="button"
                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 text-center font-semibold hover:border-purple-500"
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-300 space-y-1">
                  <strong>Cash on Delivery:</strong> Pay in cash or contactless card when your package is delivered to your doorstep.
                </div>
              )}

              {/* Price summary review */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 text-xs space-y-1.5">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-500 font-semibold">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500">
                  <span>Shipping Fee</span>
                  <span>{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</span>
                </div>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold text-sm text-gray-900 dark:text-white">
                  <span>Grand Total</span>
                  <span className="font-mono text-base text-purple-600 dark:text-cyan-400">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Back and Place Order Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep('address')}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Address</span>
                </button>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-purple-600/30 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authorize & Pay {formatPrice(finalTotal)}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ORDER CONFIRMED */}
          {step === 'confirmation' && lastOrder && (
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest">
                  Order Confirmed
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-gray-950 dark:text-white">
                  Thank You, {lastOrder.shippingAddress.fullName.split(' ')[0]}!
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Confirmation and tracking details have been sent to <span className="font-semibold text-gray-900 dark:text-white">{lastOrder.shippingAddress.email}</span>
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-800 text-left text-xs space-y-3">
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                  <span className="text-gray-400">Order ID:</span>
                  <span className="font-mono font-bold text-purple-600 dark:text-cyan-400">{lastOrder.id}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                  <span className="text-gray-400">Tracking Code:</span>
                  <span className="font-mono font-bold text-gray-900 dark:text-white">{lastOrder.trackingNumber}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                  <span className="text-gray-400">Dispatch Speed:</span>
                  <span className="text-emerald-500 font-semibold">{lastOrder.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between pt-1 font-bold text-sm">
                  <span>Total Charged:</span>
                  <span className="font-mono text-purple-600 dark:text-cyan-400">{formatPrice(lastOrder.total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleTrackOrderFromReceipt}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Track This Order Live</span>
                </button>

                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-bold text-xs transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
