import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Globe, Target, Truck, Palette, ShoppingCart, Mail, Users, CheckCircle } from "lucide-react";

export default function ForBrands() {
  const whoFor = [
    "Based outside the United States",
    "Preparing for or exploring U.S. market entry",
    "Interested in wholesale distribution, retail placement, or e-commerce",
    "Focused on long-term brand building rather than short-term experimentation",
  ];

  const supportAreas = [
    {
      icon: Target,
      title: "Market entry strategy",
      items: [
        "U.S. market positioning and channel strategy",
        "Product-market fit assessment",
        "Pricing and go-to-market considerations",
      ],
    },
    {
      icon: Truck,
      title: "Distribution and logistics guidance",
      items: [
        "Import and distribution pathway guidance",
        "Wholesale and distributor introductions",
        "Storage, fulfillment, and logistics coordination discussions",
      ],
    },
    {
      icon: Palette,
      title: "Branding and positioning",
      items: [
        "U.S.-focused branding and messaging feedback",
        "Packaging and labeling considerations for the U.S. market",
        "Category and competitive landscape insights",
      ],
    },
    {
      icon: ShoppingCart,
      title: "Amazon and e-commerce enablement",
      items: [
        "Amazon FBA setup guidance",
        "Listing structure and launch planning",
        "Channel prioritization and sequencing",
      ],
    },
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
              Brand Partners
            </motion.span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-[#111213] mb-4">For Brands</h1>
            <p className="text-xl text-[#444] max-w-3xl mx-auto">
              Tony's Delight USA works with select international food and consumer packaged goods brands exploring entry into the United States market. Built from real-world importing, distribution, and e-commerce experience, we help brands navigate the early stages of U.S. expansion with clarity and structure.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#F8F8F8] rounded-[24px] p-8 md:p-10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl btn-gold flex items-center justify-center shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-[#111213]">Who this is for</h2>
              </div>
              <p className="text-[#444] text-lg mb-4">This program is designed for established international brands that are:</p>
              <ul className="space-y-3">
                {whoFor.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[#444]">
                    <CheckCircle className="h-4 w-4 text-[#C9A86A] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl btn-gold flex items-center justify-center shadow-lg">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-[#111213]">How we may support brands</h2>
              </div>
              <p className="text-[#444] text-lg mb-8">
                Depending on readiness and alignment, Tony's Delight USA may support brands with:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supportAreas.map((area, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="bg-white rounded-[20px] p-6 border-2 border-[#EDEDED] hover:border-[#C9A86A] transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <area.icon className="h-5 w-5 text-[#C9A86A]" />
                      <h3 className="font-bold text-[#111213]">{area.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {area.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2 text-[#444] text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A] mt-2 shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-[24px] p-8 md:p-10 border-2 border-[#EDEDED] shadow-lg"
            >
              <h2 className="text-xl font-heading font-bold text-[#111213] mb-4">How we work</h2>
              <p className="text-[#444] leading-relaxed">
                We approach brand partnerships thoughtfully and selectively. Our focus is on building sustainable, compliant, and scalable pathways into the U.S. market rather than rapid or transactional launches.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#111213] rounded-[24px] p-8 md:p-10 text-center"
            >
              <h2 className="text-2xl font-heading font-bold text-white mb-4">Getting in touch</h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                International brands interested in exploring U.S. market entry can reach out for an initial discussion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-gold h-14 px-10" asChild>
                  <Link href="/contact" data-testid="button-contact-brands">
                    Contact Us
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-10 border-2 border-white text-white hover:bg-white hover:text-[#111213]" asChild>
                  <a href="mailto:info@tonysdelight.com" data-testid="button-email-brands">
                    <Mail className="mr-2 h-5 w-5" />
                    info@tonysdelight.com
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
