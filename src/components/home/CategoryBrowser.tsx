import React from 'react';
import { 
  Headphones, 
  Watch, 
  Footprints, 
  Smartphone, 
  Gamepad2, 
  Shirt, 
  ArrowUpRight 
} from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

interface CategoryBrowserProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryBrowser: React.FC<CategoryBrowserProps> = ({ onSelectCategory }) => {
  const getCategoryIcon = (name: string) => {
    switch (name) {
      case 'Headphones':
        return <Headphones className="w-6 h-6" />;
      case 'Watch':
        return <Watch className="w-6 h-6" />;
      case 'Footprints':
        return <Footprints className="w-6 h-6" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6" />;
      case 'Gamepad2':
        return <Gamepad2 className="w-6 h-6" />;
      case 'Shirt':
        return <Shirt className="w-6 h-6" />;
      default:
        return <Headphones className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-cyan-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            Explore Universes
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-gray-950 dark:text-white tracking-tight">
            Curated Categories
          </h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
          Dive into futuristic audio, carbon-plated footwear, titanium wearables, and elite gaming gear designed for creators.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 border border-gray-200 dark:border-gray-800/80 bg-white dark:bg-gray-900"
          >
            {/* Background Image with Zoom */}
            <div className="h-44 w-full relative overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />

              {/* Floating Icon with Gradient Badge */}
              <div className={`absolute top-3 left-3 w-10 h-10 rounded-xl bg-gradient-to-tr ${cat.gradient} p-0.5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <div className="w-full h-full bg-gray-900/90 rounded-[10px] flex items-center justify-center text-white">
                  {getCategoryIcon(cat.iconName)}
                </div>
              </div>

              {/* Arrow button */}
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-cyan-400 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[10px] font-bold text-purple-600 dark:text-cyan-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-200 dark:border-purple-800/50">
                  {cat.itemCount}+
                </span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                {cat.tagline}
              </p>
            </div>

            {/* Glowing bottom line on hover */}
            <div className={`h-1 w-full bg-gradient-to-r ${cat.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
          </div>
        ))}
      </div>
    </section>
  );
};
