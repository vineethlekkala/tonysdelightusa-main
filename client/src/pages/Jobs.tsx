import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Users, Send, MessageSquare, Briefcase } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Jobs() {
  usePageMeta({
    title: "Jobs & Careers | Tony's Delight USA - Join Our Team",
    description: "Join Tony's Delight USA. We're looking for talented people in wholesale sales, operations, logistics, warehousing, and brand support. View open positions.",
    ogImage: "https://tonysdelight.com/opengraph.jpg"
  });

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
              Careers
            </motion.span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-[#111213] mb-4">Jobs</h1>
            <p className="text-xl text-[#444] max-w-2xl mx-auto">
              Tony's Delight USA is growing. We are looking for talented, motivated people who want to help build a premium imported foods business in the United States.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-[24px] p-8 md:p-10 border-2 border-[#EDEDED] shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl btn-gold flex items-center justify-center shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-[#111213]">Who we're looking for</h2>
              </div>
              <p className="text-[#444] text-lg leading-relaxed">
                We are especially interested in candidates with experience in wholesale distribution, food import operations, warehousing and logistics, customer experience, sales partnerships, and brand building.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#F8F8F8] rounded-[24px] p-8 md:p-10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl btn-gold flex items-center justify-center shadow-lg">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-[#111213]">Roles we're interested in</h2>
              </div>
              <p className="text-[#444] text-lg mb-4">We are especially interested in candidates across:</p>
              <ul className="space-y-2 text-[#444] text-lg">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]"></span>
                  Wholesale sales and partnerships
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]"></span>
                  Operations and logistics
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]"></span>
                  Warehousing and inventory coordination
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]"></span>
                  Quality and sourcing support
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]"></span>
                  Marketing and brand support
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-[24px] p-8 md:p-10 border-2 border-[#C9A86A] shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl btn-gold flex items-center justify-center shadow-lg">
                  <Send className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-[#111213]">How to apply</h2>
              </div>
              <p className="text-[#444] text-lg leading-relaxed mb-6">
                Email us at <a href="mailto:info@tonysdelight.com" className="text-[#C9A86A] font-bold hover:underline">info@tonysdelight.com</a> with your resume or LinkedIn profile, your location, and a short note on how you can help Tony's Delight USA grow.
              </p>
              <Button 
                size="lg" 
                className="btn-gold h-14 px-10" 
                asChild
              >
                <a href="mailto:info@tonysdelight.com?subject=Job%20Application%20-%20Tony's%20Delight%20USA" data-testid="button-apply-email">
                  <Mail className="mr-2 h-5 w-5" />
                  Email Your Application
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#F8F8F8] rounded-[24px] p-8 md:p-10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl btn-gold flex items-center justify-center shadow-lg">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-[#111213]">Note</h2>
              </div>
              <p className="text-[#444] text-lg leading-relaxed">
                We review every message. If there is a fit, our team will reach out to schedule a conversation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
