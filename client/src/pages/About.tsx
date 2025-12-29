import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ArrowRight,
  Users,
  Heart,
  Handshake,
  Phone
} from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function About() {
  usePageMeta({
    title: "About Us | Tony's Delight USA - Premium Food Importers & Distributors",
    description: "Learn about Tony's Delight USA - a family-run importer and distributor bringing premium international food products to the United States market.",
    ogImage: "https://tonysdelight.com/opengraph.jpg"
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <section className="relative py-24 md:py-32 overflow-hidden bg-[#F8F8F8]">
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-3 py-2 px-5 rounded-full border-2 border-[#C9A86A] bg-[#C9A86A]/10 text-sm font-bold tracking-wider uppercase mb-6 text-[#C9A86A]"
            >
              About Us
            </motion.span>
            <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight text-[#111213]">
              About Tony's Delight USA
            </h1>
            <p className="text-xl md:text-2xl text-[#444] max-w-3xl mx-auto font-light">
              A family-run importer and distributor bringing premium international food products to the United States
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 text-[#C9A86A] font-bold tracking-widest uppercase text-xs mb-4">
                <span className="w-8 h-[2px] bg-[#C9A86A]" />
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-[#111213]">
                Our Story
              </h2>
              <div className="space-y-4 text-[#444] text-lg leading-relaxed">
                <p>
                  Tony's Delight began as a family-led effort to bring trusted, high-quality international foods to communities that value authentic flavors. The business has grown through relationships, consistency, and a clear focus on quality over shortcuts.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white p-8 md:p-10 rounded-[24px] border-2 border-[#C9A86A] shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl btn-gold flex items-center justify-center shadow-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-[#111213]">Expansion to the United States</h3>
                </div>
                <p className="text-[#444] text-lg leading-relaxed">
                  Tony's Delight USA was created to serve U.S. wholesalers, retailers, and distributors looking for dependable imported products and a partner who thinks long-term. Our goal is simple: build a U.S. distribution footprint that supports scale while protecting the customer experience.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 bg-[#F8F8F8]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-[#C9A86A] font-bold tracking-widest uppercase text-xs mb-4">
              <span className="w-8 h-[2px] bg-[#C9A86A]" />
              Leadership
              <span className="w-8 h-[2px] bg-[#C9A86A]" />
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#111213] mb-4">
              Founders
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-[24px] p-8 md:p-10 border-2 border-[#EDEDED] shadow-lg hover:border-[#C9A86A] transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl btn-gold flex items-center justify-center mb-6 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-[#111213] mb-4">Tony Philip Perumpankuzhy</h3>
              <p className="text-[#444] text-lg leading-relaxed">
                Tony Philip Perumpankuzhy leads Tony's Delight with a hands-on approach to sourcing, product selection, and partnerships. His leadership is grounded in family values and a deep commitment to trust.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-[24px] p-8 md:p-10 border-2 border-[#EDEDED] shadow-lg hover:border-[#C9A86A] transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl btn-gold flex items-center justify-center mb-6 shadow-lg">
                <Handshake className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-[#111213] mb-4">Vineeth Reddy Lekkala</h3>
              <p className="text-[#444] text-lg leading-relaxed">
                Vineeth Reddy Lekkala is the U.S. partner for Tony's Delight USA. Vineeth is originally from Hyderabad, India, attended medical school in the United Kingdom, and is currently an outpatient Internal Medicine physician in Marble Falls, Texas. His medical mindset brings an obsessive focus on quality control, consistency, and customer experience, with the same standards he expects in clinical practice.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-[#C9A86A] font-bold tracking-widest uppercase text-xs mb-4">
              <span className="w-8 h-[2px] bg-[#C9A86A]" />
              Our Heart
              <span className="w-8 h-[2px] bg-[#C9A86A]" />
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#111213] mb-4">
              Family
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-[24px] p-8 border-2 border-[#EDEDED] shadow-lg hover:border-[#C9A86A] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl btn-gold flex items-center justify-center mb-6 shadow-lg">
                <Heart className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-heading font-bold text-[#111213] mb-3">Sheba</h3>
              <p className="text-[#444] leading-relaxed">
                Sheba is an important part of the Tony's Delight journey, bringing strength, support, and family-centered perspective that shapes how the brand shows up and serves others.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-[24px] p-8 border-2 border-[#EDEDED] shadow-lg hover:border-[#C9A86A] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl btn-gold flex items-center justify-center mb-6 shadow-lg">
                <Heart className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-heading font-bold text-[#111213] mb-3">Tashi Lekkala</h3>
              <p className="text-[#444] leading-relaxed">
                Tashi Lekkala is originally from the Philippines. She completed nursing school in the Philippines and later attended medical school in the Philippines. Vineeth and Tashi met in McKinney, Texas during their U.S. clinical experience observerships at a heart clinic. Her Filipino identity and international exposure add a meaningful cultural dimension to the family and the future vision of what Tony's Delight can represent globally.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-[24px] p-8 border-2 border-[#EDEDED] shadow-lg hover:border-[#C9A86A] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl btn-gold flex items-center justify-center mb-6 shadow-lg">
                <Heart className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-heading font-bold text-[#111213] mb-3">Vihaan</h3>
              <p className="text-[#444] leading-relaxed">
                Vihaan is Vineeth and Tashi's son. He represents the next generation and the long-term mindset behind Tony's Delight USA: building something enduring, trusted, and family-first.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 bg-[#F8F8F8]">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#111213] mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-[#444] mb-12 max-w-2xl mx-auto">
              Get in touch for wholesale, distribution, and partnership enquiries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="btn-gold h-14 px-10" 
                asChild
              >
                <Link href="/contact" data-testid="button-about-contact">
                  Contact Us <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-[#111213] bg-transparent text-[#111213] hover:bg-[#111213] hover:text-white font-bold h-14 px-10 rounded-[14px] transition-all duration-300"
                asChild
              >
                <a href="tel:+15127372956" data-testid="button-about-call">
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
