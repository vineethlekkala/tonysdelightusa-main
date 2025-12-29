import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ImportedBrandsGrid } from "@/components/ImportedBrandsGrid";
import { ArrowRight } from "lucide-react";

export default function ImportedBrands() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
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
              Global Selection
            </motion.span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-[#111213] mb-4">
              Imported Brands
            </h1>
            <p className="text-xl text-[#444] max-w-2xl mx-auto">
              A growing selection of trusted international brands. Contact us to discuss distribution and wholesale opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-white">
        <div className="container-custom relative z-10">
          <ImportedBrandsGrid showTitle={false} variant="all" showSearch={true} />
        </div>
      </section>

      <section className="relative py-20 md:py-24 bg-[#F8F8F8]">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#111213] mb-6">
              Looking for Specific Brands?
            </h2>
            <p className="text-xl text-[#444] mb-10 max-w-2xl mx-auto">
              Contact us for wholesale pricing on any of our imported brand products.
            </p>
            <Button 
              size="lg" 
              className="btn-gold h-14 px-10" 
              asChild
            >
              <Link href="/contact" data-testid="button-brands-contact">
                Wholesale Enquiries <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
