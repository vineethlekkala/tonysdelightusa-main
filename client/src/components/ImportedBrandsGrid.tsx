import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";

const FEATURED_BRANDS = [
  "Tony's Delight",
  "AROY-D",
  "Double Horse",
  "Maggi",
  "MILO",
  "Haldiram",
  "Kings",
  "FOCO",
];

const ALL_BRANDS = [
  "Tony's Delight",
  "AROY-D",
  "Double Horse",
  "Haldiram",
  "Kings",
  "FOCO",
  "Healthy Boy",
  "Maggi",
  "MILO",
  "TRS",
  "COCK",
  "Mogu Mogu",
  "MD",
  "SAWAT-D",
  "Dettol",
  "Nongshim",
  "Horlicks",
  "Periyar",
  "Uni-Eagle",
  "VICCO",
  "Himalaya",
  "Maekrua",
  "Spring Home",
  "Squid Brand",
  "Parle",
  "Britannia",
  "Shan",
  "Shezan",
  "Pavizham",
  "Dabur",
  "Cycle",
  "Gits",
  "MTR",
  "MDH",
  "Nestomalt",
  "Boost",
];

interface BrandLogo {
  name: string;
  filename: string;
  path: string;
}

interface ImportedBrandsGridProps {
  showTitle?: boolean;
  className?: string;
  variant?: "featured" | "all";
  showSearch?: boolean;
}

export function ImportedBrandsGrid({ 
  showTitle = true, 
  className, 
  variant = "all",
  showSearch = false 
}: ImportedBrandsGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const isDarkVariant = variant === "featured";

  const { data: logosData, isLoading } = useQuery<{ success: boolean; logos: BrandLogo[] }>({
    queryKey: ["brandLogos", variant],
    queryFn: async () => {
      const endpoint = variant === "featured" ? "/api/brands/featured" : "/api/brands/all";
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Failed to fetch brand logos");
      return response.json();
    },
  });

  const uploadedLogos = logosData?.logos || [];
  const hasUploadedLogos = uploadedLogos.length > 0;
  const fallbackBrands = variant === "featured" ? FEATURED_BRANDS : ALL_BRANDS;

  const filteredLogos = useMemo(() => {
    if (!searchTerm.trim()) return uploadedLogos;
    return uploadedLogos.filter(logo => 
      logo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [uploadedLogos, searchTerm]);

  const filteredFallbackBrands = useMemo(() => {
    if (!searchTerm.trim()) return fallbackBrands;
    return fallbackBrands.filter(brand => 
      brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [fallbackBrands, searchTerm]);
  
  return (
    <div className={cn("", className)}>
      {showTitle && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.span 
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#C9A86A]" />
            <span className="text-[#C9A86A] font-semibold tracking-[0.2em] uppercase text-xs">
              {variant === "featured" ? "Featured Brands" : "Global Selection"}
            </span>
            <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#C9A86A]" />
          </motion.span>
          <h2 className={cn(
            "text-4xl md:text-5xl font-heading font-bold mb-4",
            isDarkVariant ? "text-white" : "text-[#111213]"
          )}>
            {variant === "featured" ? "Our Partner Brands" : "All Partnered Brands"}
          </h2>
          <p className={cn(
            "text-lg max-w-2xl mx-auto",
            isDarkVariant ? "text-gray-400" : "text-[#444]"
          )}>
            Premium FMCG brands from across Asia and beyond, trusted by millions worldwide.
          </p>
        </motion.div>
      )}

      {showSearch && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex justify-center mb-12"
        >
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#444]" />
            <input
              type="text"
              placeholder="Search brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border-2 border-[#EDEDED] text-[#111213] placeholder:text-[#888] focus:outline-none focus:ring-2 focus:ring-[#C9A86A]/30 focus:border-[#C9A86A] text-base transition-all duration-300"
              data-testid="input-brand-search"
            />
          </div>
        </motion.div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#C9A86A] border-t-transparent"></div>
        </div>
      ) : hasUploadedLogos ? (
        <div className="flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
            {filteredLogos.map((logo, index) => (
              <motion.div
                key={logo.filename}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.02 }}
                className="brand-card group"
                data-testid={`brand-card-${logo.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                <div className={cn(
                  "w-[160px] h-[160px] flex flex-col justify-center items-center rounded-[20px] p-4 border-2 transition-all duration-300 group-hover:-translate-y-1",
                  isDarkVariant 
                    ? "bg-[#1A1A1C] border-[#2A2A2C] hover:border-[#C9A86A] hover:shadow-lg hover:shadow-[#C9A86A]/10" 
                    : "bg-white border-[#EDEDED] hover:border-[#C9A86A] hover:shadow-lg"
                )}>
                  <div className="w-full h-[90px] flex items-center justify-center mb-2">
                    <img
                      src={logo.path}
                      alt={logo.name}
                      loading="lazy"
                      className="max-w-full max-h-full object-contain transition-all duration-300"
                    />
                  </div>
                  <span className={cn(
                    "text-sm font-semibold text-center group-hover:text-[#C9A86A] transition-colors duration-300 line-clamp-2",
                    isDarkVariant ? "text-white" : "text-[#111213]"
                  )}>
                    {logo.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
            {filteredFallbackBrands.map((brand, index) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.02 }}
                className="brand-card group"
                data-testid={`brand-card-${brand.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                <div className={cn(
                  "w-[160px] h-[160px] flex flex-col justify-center items-center rounded-[20px] p-4 border-2 transition-all duration-300 group-hover:-translate-y-1",
                  isDarkVariant 
                    ? "bg-[#1A1A1C] border-[#2A2A2C] hover:border-[#C9A86A] hover:shadow-lg hover:shadow-[#C9A86A]/10" 
                    : "bg-white border-[#EDEDED] hover:border-[#C9A86A] hover:shadow-lg"
                )}>
                  <div className="w-14 h-14 rounded-full btn-gold flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all duration-300">
                    <span className="text-white font-bold text-xl">
                      {brand.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className={cn(
                    "text-sm font-semibold text-center group-hover:text-[#C9A86A] transition-colors duration-300 line-clamp-2",
                    isDarkVariant ? "text-white" : "text-[#111213]"
                  )}>
                    {brand}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {searchTerm && (hasUploadedLogos ? filteredLogos.length === 0 : filteredFallbackBrands.length === 0) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className={cn("text-lg", isDarkVariant ? "text-gray-400" : "text-[#444]")}>
            No brands found matching "{searchTerm}"
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default ImportedBrandsGrid;
