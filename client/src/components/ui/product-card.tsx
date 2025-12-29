import { motion } from "framer-motion";
import { Product } from "@/lib/google-sheets";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isValidUrl = product.imageUrl && 
    product.imageUrl.startsWith('http') &&
    !product.imageUrl.includes('/...');
  
  const imageUrl = isValidUrl 
    ? product.imageUrl 
    : `https://via.placeholder.com/400x300/1e3a5f/ffffff?text=${encodeURIComponent(product.title || 'Product')}`;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group"
      data-testid={`card-product-${product.id}`}
    >
      <div className="h-full overflow-hidden rounded-2xl flex flex-col bg-white/[0.04] backdrop-blur-md border border-white/[0.08] transition-all duration-500 hover:bg-white/[0.08] hover:border-[#F7C948]/30 hover:shadow-[0_0_40px_rgba(247,201,72,0.15)]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={product.title}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = `https://via.placeholder.com/400x300/1e3a5f/ffffff?text=${encodeURIComponent(product.title || 'Product')}`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent" />
          <div className="absolute top-3 right-3">
            <Badge className="bg-[#F7C948]/90 text-[#0B1220] hover:bg-[#F7C948] border-0 font-semibold shadow-lg">
              {product.category}
            </Badge>
          </div>
        </div>
        
        <div className="p-5 flex-grow">
          <h3 className="font-heading font-bold text-lg mb-2 line-clamp-2 text-white group-hover:text-[#F7C948] transition-colors duration-300">
            {product.title}
          </h3>
          <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">
            {product.description || 'Premium quality product'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
