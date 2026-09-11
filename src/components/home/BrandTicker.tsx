import React from 'react';
import { Sparkles, Zap, Shield, Award, Cpu, Radio, Flame } from 'lucide-react';

export const BrandTicker: React.FC = () => {
  const tickerItems = [
    { label: 'SPATIAL 360° AUDIO', icon: <Radio className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> },
    { label: 'TITANIUM GRADE-5', icon: <Shield className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> },
    { label: 'CARBON FIBER PLATE', icon: <Zap className="w-3.5 h-3.5 text-amber-500" /> },
    { label: 'RAPID TRIGGER 8000Hz', icon: <Cpu className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> },
    { label: 'BIOMETRIC ENCRYPTED', icon: <Award className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> },
    { label: '45-MIN DRONE DISPATCH', icon: <Flame className="w-3.5 h-3.5 text-rose-500" /> },
    { label: 'NASA AEROGEL INSULATION', icon: <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> },
  ];

  // Repeat for continuous infinite marquee loop
  const displayItems = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div className="py-4 border-y border-purple-100 dark:border-gray-800 bg-gradient-to-r from-purple-50/80 via-white to-cyan-50/80 dark:from-gray-900/60 dark:via-gray-900 dark:to-gray-900/60 overflow-hidden select-none relative backdrop-blur-sm">
      {/* Edge gradient masks */}
      <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-gray-50 dark:from-[#0b0f19] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-gray-50 dark:from-[#0b0f19] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee-infinite flex items-center gap-8 whitespace-nowrap">
        {displayItems.map((item, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 border border-purple-200/60 dark:border-gray-700/50 shadow-xs hover:shadow-md hover:scale-105 transition-transform duration-200 cursor-default"
          >
            {item.icon}
            <span className="font-display font-black text-xs tracking-wider text-gray-800 dark:text-gray-200">
              {item.label}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 dark:bg-cyan-400 ml-1" />
          </div>
        ))}
      </div>
    </div>
  );
};
