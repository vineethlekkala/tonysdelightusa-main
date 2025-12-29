import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, Package, Tag, Thermometer, FileCheck, Mail } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Quality() {
  usePageMeta({
    title: "Quality & Compliance | Tony's Delight USA - Our Standards",
    description: "Learn about Tony's Delight USA quality standards, sourcing practices, packaging requirements, and compliance approach for wholesale food distribution.",
    ogImage: "https://tonysdelight.com/opengraph.jpg"
  });

  const sections = [
    {
      icon: Package,
      title: "Sourcing Standards",
      content: "We work with established suppliers and brands and prioritize products that meet our expectations for consistency, packaging integrity, and dependable supply."
    },
    {
      icon: Tag,
      title: "Packaging and Labeling",
      content: "We prioritize clear labeling, packaging durability, and practical wholesale handling. Specific label details and case pack information are confirmed during wholesale onboarding."
    },
    {
      icon: Thermometer,
      title: "Cold Chain and Handling",
      content: "For frozen and seafood categories, we emphasize responsible cold chain handling and storage practices appropriate for the category and distribution channel."
    },
    {
      icon: FileCheck,
      title: "Regulatory Awareness",
      content: "We take compliance seriously and work with partners to support responsible importing, storage, and distribution practices. For product-specific documentation and requirements, contact us at info@tonysdelight.com."
    }
  ];

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
              Standards
            </motion.span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-[#111213] mb-4">Quality & Compliance</h1>
            <p className="text-xl text-[#444] max-w-2xl mx-auto">
              Tony's Delight USA is committed to protecting quality and consistency across our wholesale and distribution partnerships. Our standards are designed to support trust, repeatability, and a reliable customer experience.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-white rounded-[24px] p-8 md:p-10 border-2 border-[#EDEDED] hover:border-[#C9A86A] transition-colors shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl btn-gold flex items-center justify-center shadow-lg shrink-0">
                    <section.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-heading font-bold text-[#111213] mb-3">{section.title}</h2>
                    <p className="text-[#444] leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[#111213] rounded-[24px] p-8 md:p-10 text-center mt-12"
            >
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#C9A86A] flex items-center justify-center shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-heading font-bold text-white mb-4">Questions about Quality?</h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                For questions related to quality, documentation, or product handling, email info@tonysdelight.com.
              </p>
              <Button size="lg" className="btn-gold h-14 px-10" asChild>
                <Link href="/contact" data-testid="button-quality-contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Us
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
