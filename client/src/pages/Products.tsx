import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Product, fetchProductsByCategory, fetchProducts } from "@/lib/google-sheets";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";

const CATEGORIES = [
  { label: "All", href: "/products" },
  { label: "Dry Products", href: "/products/dry" },
  { label: "Frozen Products", href: "/products/frozen" },
  { label: "Seafood", href: "/products/seafood" },
  { label: "Imported Brands", href: "/products/imported-brands" },
  { label: "Lal Qilla Basmati", href: "/products/lal-qilla-basmati" },
];

const CATEGORY_INTROS: { [key: string]: string } = {
  "Dry Products": "Pantry staples and dry goods selected for quality and reliability. Contact us for wholesale availability and pack sizes.",
  "Frozen Products": "Frozen items curated for consistent quality and cold-chain handling. Contact us for wholesale enquiries.",
  "Seafood": "Carefully sourced seafood offerings for wholesale partners. Contact us for current availability and distribution details.",
  "Imported Brands": "A growing selection of trusted international brands. Contact us to discuss distribution and wholesale opportunities.",
  "Lal Qilla Basmati": "Premium basmati rice offerings for wholesale and distribution partners. Contact us for pack sizes and availability.",
};

interface ProductsProps {
  initialCategory?: string;
}

export default function Products({ initialCategory }: ProductsProps) {
  const [location, setLocation] = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(location.split("?")[1]);
  const activeCategory = initialCategory || query.get("category") || "All";
  const categoryIntro = CATEGORY_INTROS[activeCategory] || "Browse our categories below. For wholesale availability and distribution enquiries, contact us.";

  // Dynamic meta tags based on category
  const getMetaForCategory = (category: string) => {
    const metaMap: { [key: string]: { title: string; description: string } } = {
      "Dry Products": {
        title: "Dry Products | Tony's Delight USA - Wholesale Pantry Staples",
        description: "Browse our selection of premium dry products and pantry staples for wholesale distribution. Contact us for availability and pack sizes."
      },
      "Frozen Products": {
        title: "Frozen Products | Tony's Delight USA - Wholesale Frozen Foods",
        description: "Premium frozen food products for wholesale partners. Quality assured cold-chain handling. Contact us for wholesale enquiries."
      },
      "Seafood": {
        title: "Seafood | Tony's Delight USA - Wholesale Seafood Distribution",
        description: "Carefully sourced seafood products for wholesale distribution across the United States. Contact us for current availability."
      },
      "Imported Brands": {
        title: "Imported Brands | Tony's Delight USA - International Food Brands",
        description: "Trusted international food brands available for wholesale distribution in the United States. Contact us for partnership opportunities."
      },
      "Lal Qilla Basmati": {
        title: "Lal Qilla Basmati Rice | Tony's Delight USA - Premium Basmati Wholesale",
        description: "Premium Lal Qilla basmati rice for wholesale and distribution partners. Contact us for pack sizes and availability."
      },
      "All": {
        title: "Products | Tony's Delight USA - Wholesale Food Distribution",
        description: "Browse our complete range of premium international food products for wholesale and distribution across the United States."
      }
    };
    return metaMap[category] || metaMap["All"];
  };

  usePageMeta({
    ...getMetaForCategory(activeCategory),
    ogImage: "https://tonysdelight.com/opengraph.jpg"
  });

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      if (activeCategory === "All") {
        const data = await fetchProducts();
        setProducts(data);
      } else {
        const data = await fetchProductsByCategory(activeCategory);
        setProducts(data);
      }
      setLoading(false);
    };
    loadData();
  }, [activeCategory]);

  const getHrefForCategory = (catLabel: string) => {
    const found = CATEGORIES.find(c => c.label === catLabel);
    return found ? found.href : "/products";
  };

  const isActive = (catLabel: string) => {
    if (catLabel === "All" && activeCategory === "All") return true;
    return catLabel === activeCategory;
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-20 md:py-24 bg-[#F8F8F8]">
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-3 py-2 px-5 rounded-full border-2 border-[#C9A86A] bg-[#C9A86A]/10 text-sm font-bold tracking-wider uppercase mb-6 text-[#C9A86A]"
            >
              {activeCategory === "All" ? "All Products" : activeCategory}
            </motion.span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-[#111213] mb-4">
              {activeCategory === "All" ? "Products" : activeCategory}
            </h1>
            <p className="text-xl text-[#444] max-w-2xl mx-auto">
              {categoryIntro}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-64 flex-shrink-0 space-y-2 lg:sticky lg:top-24"
            >
              <div className="flex items-center gap-2 font-bold text-lg mb-4 text-[#111213]">
                <Filter className="h-5 w-5 text-[#C9A86A]" /> Categories
              </div>
              <div className="flex flex-wrap lg:flex-col gap-2 bg-white p-4 rounded-xl border border-[#EDEDED]">
                {CATEGORIES.map((cat) => (
                  <Button
                    key={cat.label}
                    variant="ghost"
                    className={cn(
                      "justify-start rounded-xl transition-all duration-300",
                      isActive(cat.label) 
                        ? "btn-gold text-white" 
                        : "text-[#111213] hover:text-[#C9A86A] hover:bg-[#C9A86A]/5 border border-[#EDEDED]"
                    )}
                    onClick={() => setLocation(cat.href)}
                    data-testid={`button-category-${cat.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {cat.label}
                  </Button>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-grow w-full"
            >
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="space-y-3">
                      <Skeleton className="h-48 w-full rounded-xl bg-[#F8F8F8]" />
                      <Skeleton className="h-4 w-3/4 bg-[#F8F8F8]" />
                      <Skeleton className="h-4 w-1/2 bg-[#F8F8F8]" />
                    </div>
                  ))}
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product, index) => {
                    const isValidUrl = product.imageUrl && 
                      product.imageUrl.startsWith('http') && 
                      !product.imageUrl.includes('/...');
                    const displayImage = isValidUrl 
                      ? product.imageUrl 
                      : `https://via.placeholder.com/400x300/F8F8F8/111213?text=${encodeURIComponent(product.title || 'Product')}`;
                    
                    return (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        className="group"
                        data-testid={`card-product-${product.id}`}
                      >
                        <div className="relative bg-white rounded-[20px] overflow-hidden border border-[#EDEDED] transition-all duration-300 hover:shadow-xl hover:border-[#C9A86A] hover:-translate-y-2">
                          <div className="relative h-56 overflow-hidden">
                            <img 
                              src={displayImage} 
                              alt={product.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-heading font-bold text-[#111213] mb-2 group-hover:text-[#C9A86A] transition-colors duration-300">
                              {product.title}
                            </h3>
                            <p className="text-[#444] text-sm leading-relaxed line-clamp-2 mb-4">
                              {product.description || 'Premium quality product'}
                            </p>
                            <Button 
                              className="btn-gold w-full" 
                              asChild
                            >
                              <Link href="/contact" data-testid={`button-enquiry-${product.id}`}>
                                Wholesale Enquiries
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-[#444] text-lg mb-6">Contact us for product availability.</p>
                  <Button 
                    size="lg" 
                    className="btn-gold h-14 px-10" 
                    asChild
                  >
                    <Link href="/contact">
                      Wholesale Enquiries <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 bg-[#F8F8F8]">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#111213] mb-6">
              Interested in these products?
            </h2>
            <p className="text-lg text-[#444] mb-8 max-w-xl mx-auto">
              Contact us for wholesale pricing, availability, and distribution enquiries.
            </p>
            <Button 
              size="lg" 
              className="btn-gold h-14 px-10" 
              asChild
            >
              <Link href="/contact" data-testid="button-products-contact">
                Contact Us <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
