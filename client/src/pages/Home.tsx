import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Truck, Globe, ShieldCheck, Users, Leaf, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { ImportedBrandsGrid } from "@/components/ImportedBrandsGrid";

const defaultHeroImage = "https://res.cloudinary.com/dy5aj3j06/image/upload/v1765475216/a90484e0-ea0b-40fc-a17f-3ef1fad9d763.png";

import dryProductsBgImg from "@assets/stock_images/dry_goods_spices_flo_77730ed3.jpg";
import frozenBgImg from "@assets/stock_images/frozen_indian_food_s_60dbd79f.jpg";
import seafoodBgImg from "@assets/stock_images/fresh_raw_seafood_di_63f9c282.jpg";
import basmatiBgImg from "@assets/stock_images/premium_basmati_rice_a8daa372.jpg";
import warehouseImg from "@assets/stock_images/modern_food_warehous_22bd2451.jpg";

interface Product {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  category: string;
}

interface CategoryConfig {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bgImage: string;
  link: string;
}


function LuxuryCategorySection({
  config,
  products,
  loading,
  index
}: {
  config: CategoryConfig;
  products: Product[];
  loading: boolean;
  index: number;
}) {
  const isAlt = index % 2 === 1;
  
  return (
    <section className={cn("relative py-24 md:py-32 overflow-hidden", isAlt ? "bg-[#F8F8F8]" : "bg-white")}>
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#C9A86A]" />
            <span className="text-[#C9A86A] font-semibold tracking-[0.2em] uppercase text-xs">
              {config.subtitle}
            </span>
            <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#C9A86A]" />
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#111213] mb-5 tracking-tight">
            {config.title}
          </h2>
          <p className="text-lg text-[#444] max-w-2xl mx-auto leading-relaxed">
            {config.description}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#C9A86A] border-t-transparent"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product, productIndex) => {
              const isValidUrl = product.imageUrl && 
                product.imageUrl.startsWith('http') && 
                !product.imageUrl.includes('/...');
              const displayImage = isValidUrl 
                ? product.imageUrl 
                : `https://via.placeholder.com/400x300/F8F8F8/111213?text=${encodeURIComponent(product.title || 'Product')}`;
              
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: productIndex * 0.1 }}
                  className="group"
                  data-testid={`card-${config.id}-product-${product.id}`}
                >
                  <div className="relative bg-white rounded-[20px] overflow-hidden border border-[#EDEDED] transition-all duration-300 hover:shadow-xl hover:border-[#C9A86A] hover:-translate-y-2">
                    <div className="relative h-60 overflow-hidden">
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
                      <p className="text-[#444] text-sm leading-relaxed mb-4">
                        {product.description || 'Premium quality product'}
                      </p>
                      <Button 
                        size="sm" 
                        className="btn-gold w-full" 
                        asChild
                      >
                        <Link href="/contact">Wholesale Enquiries</Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : null}

        {products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center mt-14"
          >
            <Button 
              size="lg" 
              className="btn-gold h-14 px-10 text-base" 
              asChild
            >
              <Link href={config.link}>
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

interface HomepageImage {
  id: string;
  slotId: string;
  imageUrl: string;
  title: string | null;
  description: string | null;
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [heroImage, setHeroImage] = useState(defaultHeroImage);
  const [dryProducts, setDryProducts] = useState<Product[]>([]);
  const [dryLoading, setDryLoading] = useState(true);
  const [frozenProducts, setFrozenProducts] = useState<Product[]>([]);
  const [frozenLoading, setFrozenLoading] = useState(true);
  const [seafoodProducts, setSeafoodProducts] = useState<Product[]>([]);
  const [seafoodLoading, setSeafoodLoading] = useState(true);
  const [basmatiProducts, setBasmatiProducts] = useState<Product[]>([]);
  const [basmatiLoading, setBasmatiLoading] = useState(true);

  useEffect(() => {
    async function fetchHeroBackground() {
      try {
        const response = await fetch('/api/homepage-images/hero-background');
        const data = await response.json();
        if (data.success && data.image?.imageUrl) {
          setHeroImage(data.image.imageUrl);
        }
      } catch (error) {
        console.error('Error fetching hero background:', error);
      }
    }
    fetchHeroBackground();
    
    async function fetchDryProducts() {
      try {
        const response = await fetch('/api/products/Dry%20Products');
        const data = await response.json();
        if (data.success && data.products) {
          const validProducts = data.products.filter((p: Product) => p.title && p.title.trim() !== '');
          setDryProducts(validProducts);
        }
      } catch (error) {
        console.error('Error fetching dry products:', error);
      } finally {
        setDryLoading(false);
      }
    }

    async function fetchFrozenProducts() {
      try {
        const response = await fetch('/api/products/Frozen%20Products');
        const data = await response.json();
        if (data.success && data.products) {
          const validProducts = data.products.filter((p: Product) => p.title && p.title.trim() !== '');
          setFrozenProducts(validProducts);
        }
      } catch (error) {
        console.error('Error fetching frozen products:', error);
      } finally {
        setFrozenLoading(false);
      }
    }

    async function fetchSeafoodProducts() {
      try {
        const response = await fetch('/api/products/Seafood');
        const data = await response.json();
        if (data.success && data.products) {
          const validProducts = data.products.filter((p: Product) => p.title && p.title.trim() !== '');
          setSeafoodProducts(validProducts);
        }
      } catch (error) {
        console.error('Error fetching seafood products:', error);
      } finally {
        setSeafoodLoading(false);
      }
    }

    async function fetchBasmatiProducts() {
      try {
        const response = await fetch('/api/products/Lal%20Qilla%20Basmati');
        const data = await response.json();
        if (data.success && data.products) {
          const validProducts = data.products.filter((p: Product) => p.title && p.title.trim() !== '');
          setBasmatiProducts(validProducts);
        }
      } catch (error) {
        console.error('Error fetching basmati products:', error);
      } finally {
        setBasmatiLoading(false);
      }
    }

    fetchDryProducts();
    fetchFrozenProducts();
    fetchSeafoodProducts();
    fetchBasmatiProducts();
  }, []);

  const categoryConfigs: CategoryConfig[] = [
    {
      id: "lal-qilla-basmati",
      title: "Lal Qilla Basmati",
      subtitle: "Premium Rice Collection",
      description: "Premium basmati rice offerings for wholesale and distribution partners.",
      bgImage: basmatiBgImg,
      link: "/products/lal-qilla-basmati",
    },
    {
      id: "dry-products",
      title: "Dry Products",
      subtitle: "Pantry Essentials",
      description: "Pantry staples and dry goods selected for quality and reliability.",
      bgImage: dryProductsBgImg,
      link: "/products/dry",
    },
    {
      id: "seafood",
      title: "Seafood",
      subtitle: "From the Ocean",
      description: "Carefully sourced seafood offerings for wholesale partners.",
      bgImage: seafoodBgImg,
      link: "/products/seafood",
    },
    {
      id: "frozen-products",
      title: "Frozen Products",
      subtitle: "Premium Selection",
      description: "Frozen items curated for consistent quality and cold-chain handling.",
      bgImage: frozenBgImg,
      link: "/products/frozen",
    },
  ];

  const categoryData = [
    { config: categoryConfigs[0], products: basmatiProducts, loading: basmatiLoading },
    { config: categoryConfigs[1], products: dryProducts, loading: dryLoading },
    { config: categoryConfigs[2], products: seafoodProducts, loading: seafoodLoading },
    { config: categoryConfigs[3], products: frozenProducts, loading: frozenLoading },
  ];

  const features = [
    { icon: Globe, text: "Trusted International Sourcing" },
    { icon: Truck, text: "Wholesale Ready" },
    { icon: ShieldCheck, text: "Quality First" },
    { icon: Users, text: "Relationship Driven" },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-white" ref={containerRef}>
      <section className="relative min-h-screen overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm" />
        
        <div className="container-custom relative z-10 flex flex-col justify-center min-h-screen pt-24 pb-16">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 py-2 px-4 rounded-full border border-[#C9A86A] bg-[#C9A86A]/20 text-sm font-bold tracking-[0.15em] uppercase mb-6 text-[#C9A86A]"
            >
              <Leaf className="h-4 w-4" />
              Premium Wholesale
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 tracking-tight text-white"
            >
              Bringing Global Flavors{" "}
              <span className="text-[#C9A86A]">to the United States</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/80 mb-10 max-w-xl font-light leading-relaxed"
            >
              Tony's Delight USA is a family-run importer and distributor of premium international food products. We partner with wholesalers, retailers, and distributors who want quality and consistency.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg" 
                className="btn-gold text-lg h-14 px-10" 
                asChild
              >
                <Link href="/contact" data-testid="button-hero-enquiries">Wholesale Enquiries</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#111213] font-bold text-lg h-14 px-10 rounded-[14px] transition-all duration-300" 
                asChild
              >
                <a href="tel:+15127372956" data-testid="button-hero-call">
                  <Phone className="mr-2 h-5 w-5" />
                  Call +1 (512) 737-2956
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#111213] mb-6">
              Who We Are
            </h2>
            <p className="text-xl text-[#444] leading-relaxed">
              Tony's Delight USA is built on long-term relationships, trusted sourcing, and a simple promise: only products we would proudly serve our own families. We are expanding into the U.S. to make global pantry staples and specialty imports easier to access through wholesale and distribution partners.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 bg-[#F8F8F8]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#111213] mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-[#444] max-w-2xl mx-auto">
              Browse our product categories for wholesale and distribution
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Dry Products", link: "/products/dry", image: dryProductsBgImg },
              { title: "Frozen Products", link: "/products/frozen", image: frozenBgImg },
              { title: "Seafood", link: "/products/seafood", image: seafoodBgImg },
              { title: "Imported Brands", link: "/products/imported-brands", image: warehouseImg },
              { title: "Lal Qilla Basmati", link: "/products/lal-qilla-basmati", image: basmatiBgImg },
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={category.link}>
                  <div className="group relative h-64 rounded-[24px] overflow-hidden cursor-pointer" data-testid={`card-category-${category.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-heading font-bold text-white mb-2 group-hover:text-[#C9A86A] transition-colors">
                        {category.title}
                      </h3>
                      <span className="inline-flex items-center text-sm font-medium text-white/80 group-hover:text-[#C9A86A] transition-colors">
                        View Products <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#111213] mb-4">
              Why Tony's Delight USA
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Globe, 
                title: "Trusted International Sourcing", 
                description: "Carefully selected products from established suppliers and brands." 
              },
              { 
                icon: Truck, 
                title: "Wholesale Ready", 
                description: "Built for distributors, retailers, and foodservice buyers who need consistency." 
              },
              { 
                icon: ShieldCheck, 
                title: "Quality First", 
                description: "Clean labeling, reliable packaging, and a focus on customer experience." 
              },
              { 
                icon: Users, 
                title: "Relationship Driven", 
                description: "We prioritize partnerships, responsiveness, and long-term growth." 
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 rounded-[24px] border-2 border-[#EDEDED] hover:border-[#C9A86A] transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl btn-gold flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold text-[#111213] mb-3">
                  {item.title}
                </h3>
                <p className="text-[#444] text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 bg-[#111213] rounded-t-[60px]">
        <div className="container-custom">
          <ImportedBrandsGrid showTitle={true} variant="featured" />
        </div>
      </section>

      <section className="relative py-24 md:py-32 bg-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#111213] mb-6">
              Stock Tony's Delight USA
            </h2>
            <p className="text-xl text-[#444] mb-12 max-w-2xl mx-auto">
              For wholesale, distribution, and partnership enquiries, contact our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="btn-gold h-14 px-10" 
                asChild
              >
                <Link href="/contact" data-testid="button-cta-contact">
                  Contact Us <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-[#111213] bg-transparent text-[#111213] hover:bg-[#111213] hover:text-white font-bold h-14 px-10 rounded-[14px] transition-all duration-300"
                asChild
              >
                <a href="tel:+15127372956" data-testid="button-cta-call">
                  <Phone className="mr-2 h-5 w-5" />
                  Call +1 (512) 737-2956
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
