import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headphones, ArrowUpRight } from 'lucide-react';

export const ValueProps: React.FC = () => {
  const perks = [
    {
      icon: <Truck className="w-6 h-6 text-cyan-400" />,
      title: 'Hyper-Speed Dispatch',
      description: 'Dispatched within 2 hours from smart fulfillment hubs with live courier telemetry.',
      gradient: 'from-cyan-500/10 to-blue-500/5',
      border: 'border-cyan-500/30',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
      title: 'Biometric Encrypted Pay',
      description: 'Military-grade 256-bit SSL encryption supporting Card, UPI, Apple Pay, & zero-risk COD.',
      gradient: 'from-purple-500/10 to-indigo-500/5',
      border: 'border-purple-500/30',
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-emerald-400" />,
      title: '30-Day Zero Friction',
      description: 'Hassle-free replacement guarantee. Doorstep pickup with instant automated refund.',
      gradient: 'from-emerald-500/10 to-teal-500/5',
      border: 'border-emerald-500/30',
    },
    {
      icon: <Headphones className="w-6 h-6 text-amber-400" />,
      title: '24/7 VIP Concierge',
      description: 'Talk to certified audio engineers & gear specialists in under 60 seconds anytime.',
      gradient: 'from-amber-500/10 to-orange-500/5',
      border: 'border-amber-500/30',
    },
  ];

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {perks.map((perk, index) => (
          <div
            key={index}
            className={`p-6 rounded-3xl bg-gradient-to-br ${perk.gradient} border ${perk.border} backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-xl group relative`}
          >
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
              {perk.icon}
            </div>
            <h3 className="font-display font-bold text-base text-gray-900 dark:text-white mb-2 flex items-center justify-between">
              {perk.title}
              <ArrowUpRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              {perk.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
