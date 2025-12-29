import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Handshake, CheckCircle, Mail, Phone, Users, Package, MessageSquare } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Partners() {
  usePageMeta({
    title: "Partners | Tony's Delight USA - Why Work With Us",
    description: "Partner with Tony's Delight USA for reliable wholesale food distribution. Relationship driven, quality focused, and built for long-term partnerships.",
    ogImage: "https://tonysdelight.com/opengraph.jpg"
  });

  const benefits = [
    { title: "Relationship Driven", desc: "We prioritize long-term partnerships over one-off transactions." },
    { title: "Consistency Matters", desc: "We focus on reliable sourcing, packaging, and repeatable standards." },
    { title: "Wholesale Focused", desc: "Our model is built for distributors, retailers, and foodservice buyers." },
    { title: "Quality First", desc: "We protect the customer experience and avoid shortcuts that compromise trust." },
    { title: "Responsive Communication", desc: "Clear timelines, quick follow-ups, and practical problem solving." },
  ];

  const workWith = [
    "Distributors and wholesale partners",
    "Ethnic and specialty grocery retailers",
    "Foodservice buyers and restaurant supply partners",
    "Brands seeking U.S. distribution partnerships",
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
              Partnerships
            </motion.span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-[#111213] mb-4">Partners</h1>
            <p className="text-xl text-[#444] max-w-2xl mx-auto">
              Tony's Delight USA partners with wholesalers, retailers, and distributors who want premium international food products backed by consistent standards and responsive communication.
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
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl btn-gold flex items-center justify-center shadow-lg">
                  <Handshake className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-[#111213]">Why Work With Us</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="bg-white rounded-[20px] p-6 border-2 border-[#EDEDED] hover:border-[#C9A86A] transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#C9A86A] mt-1 shrink-0" />
                      <div>
                        <h3 className="font-bold text-[#111213] mb-1">{benefit.title}</h3>
                        <p className="text-[#444] text-sm">{benefit.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

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
                <h2 className="text-2xl font-heading font-bold text-[#111213]">Who We Work With</h2>
              </div>
              <p className="text-[#444] text-lg mb-4">We typically work with:</p>
              <ul className="space-y-3">
                {workWith.map((item, idx) => (
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
              className="bg-white rounded-[24px] p-8 md:p-10 border-2 border-[#C9A86A] shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl btn-gold flex items-center justify-center shadow-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-[#111213]">What to Send Us</h2>
              </div>
              <p className="text-[#444] text-lg mb-4">
                To start a partnership conversation, email <a href="mailto:info@tonysdelight.com" className="text-[#C9A86A] font-bold hover:underline">info@tonysdelight.com</a> with:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-[#444]">
                  <CheckCircle className="h-4 w-4 text-[#C9A86A] shrink-0" />
                  Your company name and location
                </li>
                <li className="flex items-center gap-3 text-[#444]">
                  <CheckCircle className="h-4 w-4 text-[#C9A86A] shrink-0" />
                  The regions you serve
                </li>
                <li className="flex items-center gap-3 text-[#444]">
                  <CheckCircle className="h-4 w-4 text-[#C9A86A] shrink-0" />
                  The product categories you are interested in
                </li>
                <li className="flex items-center gap-3 text-[#444]">
                  <CheckCircle className="h-4 w-4 text-[#C9A86A] shrink-0" />
                  Any relevant volume expectations or distribution goals
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#111213] rounded-[24px] p-8 md:p-10 text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#C9A86A] flex items-center justify-center shadow-lg">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-heading font-bold text-white mb-4">Ready to Partner?</h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                For wholesale and distribution enquiries, contact us at info@tonysdelight.com or visit the Contact page.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-gold h-14 px-10" asChild>
                  <Link href="/contact" data-testid="button-contact-partners">
                    Contact Us
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-10 border-2 border-white text-white hover:bg-white hover:text-[#111213]" asChild>
                  <a href="mailto:info@tonysdelight.com" data-testid="button-email-partners">
                    <Mail className="mr-2 h-5 w-5" />
                    Email Us
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
