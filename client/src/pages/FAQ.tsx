import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Mail } from "lucide-react";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you sell directly to consumers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Tony's Delight USA focuses on wholesale and distribution partnerships. We do not sell directly to individual consumers."
      }
    },
    {
      "@type": "Question",
      "name": "Who can work with Tony's Delight USA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We work with retailers, distributors, foodservice operators, and select brand partners looking for wholesale distribution in the United States."
      }
    },
    {
      "@type": "Question",
      "name": "What types of products do you distribute?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our portfolio includes dry goods, frozen products, seafood, and select imported international food brands."
      }
    },
    {
      "@type": "Question",
      "name": "What regions do you serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tony's Delight USA is building its distribution footprint across the United States. Availability may vary by product and partner."
      }
    },
    {
      "@type": "Question",
      "name": "How do I place a wholesale enquiry?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wholesale and partnership enquiries can be submitted by emailing info@tonysdelight.com or through the contact page."
      }
    },
    {
      "@type": "Question",
      "name": "Do you help international brands enter the U.S. market?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We selectively support international food and consumer packaged goods brands with U.S. market entry, distribution guidance, and operational alignment."
      }
    }
  ]
};

export default function FAQ() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-schema";
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById("faq-schema");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);
  const faqs = [
    {
      question: "Do you sell directly to consumers?",
      answer: "At this time, Tony's Delight USA is focused on wholesale and distribution partnerships."
    },
    {
      question: "How do I place a wholesale order?",
      answer: "Email info@tonysdelight.com with your company details, the categories you are interested in, and your delivery region."
    },
    {
      question: "Do you have minimum order quantities (MOQ)?",
      answer: "MOQ and case pack requirements vary by product category. Contact us and we will confirm details based on your needs."
    },
    {
      question: "Which regions do you distribute to?",
      answer: "We are building our U.S. distribution footprint. Share your location and target region and we will confirm current coverage and options."
    },
    {
      question: "Do you work with restaurants and foodservice buyers?",
      answer: "Yes. We welcome foodservice enquiries and can discuss availability and distribution options."
    },
    {
      question: "Can brands partner with Tony's Delight USA for distribution?",
      answer: "Yes. If you are a brand seeking U.S. distribution, email info@tonysdelight.com with product details and current markets."
    },
    {
      question: "Do you provide pricing on the website?",
      answer: "No. Pricing is provided directly to wholesale and distribution partners based on category, volumes, and logistics."
    },
    {
      question: "How do I contact you?",
      answer: "Use our Contact page or email info@tonysdelight.com. You can also call +1 (512) 737-2956."
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
              Help
            </motion.span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-[#111213] mb-4">FAQ</h1>
            <p className="text-xl text-[#444] max-w-2xl mx-auto">
              Below are answers to common questions about Tony's Delight USA. For wholesale enquiries, contact us at <a href="mailto:info@tonysdelight.com" className="text-[#C9A86A] font-bold hover:underline">info@tonysdelight.com</a>.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-[24px] p-6 md:p-10 border-2 border-[#EDEDED] shadow-lg"
            >
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-[#EDEDED] last:border-0">
                    <AccordionTrigger className="text-left font-bold text-[#111213] hover:text-[#C9A86A] py-6" data-testid={`faq-question-${idx}`}>
                      <span className="flex items-start gap-3">
                        <HelpCircle className="h-5 w-5 text-[#C9A86A] shrink-0 mt-0.5" />
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-[#444] pb-6 pl-8">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 bg-[#F8F8F8] rounded-[24px] p-8 md:p-10 text-center"
            >
              <h2 className="text-2xl font-heading font-bold text-[#111213] mb-4">Still have questions?</h2>
              <p className="text-[#444] mb-6">
                For wholesale enquiries, reach out and we'll get back to you.
              </p>
              <Button size="lg" className="btn-gold h-14 px-10" asChild>
                <Link href="/contact" data-testid="button-faq-contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Wholesale Enquiries
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
