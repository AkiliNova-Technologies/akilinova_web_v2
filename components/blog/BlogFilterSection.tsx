"use client";

interface Category {
  id: string;
  name: string;
  count: number;
}

interface BlogsFilterSectionProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categories: Category[];
  loading?: boolean;
}

export default function BlogsFilterSection({ 
  activeCategory, 
  onCategoryChange, 
  categories,
  loading = false 
}: BlogsFilterSectionProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => onCategoryChange(category.id)}
          disabled={loading}
          className={`
            px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300
            relative overflow-hidden group border
            ${activeCategory === category.id
              ? "bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] text-white shadow-xs border-orange-200"
              : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-none"
            }
            ${loading ? "opacity-50 cursor-not-allowed" : ""}
            animate-slide-up
          `}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <span className="relative z-10">
            {category.name}
            <span className={`ml-2 text-xs ${activeCategory === category.id ? 'text-white/90' : 'text-gray-500'}`}>
              ({category.count})
            </span>
          </span>
         
        </button>
      ))}
      
      <style jsx>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-slide-up {
          animation: slide-up 0.4s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}