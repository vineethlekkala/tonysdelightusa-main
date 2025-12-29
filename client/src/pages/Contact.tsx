import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Loader2, Instagram, Globe } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you as soon as possible.",
        });
        form.reset();
      } else {
        const subject = encodeURIComponent("Wholesale Enquiry - Tony's Delight USA");
        const body = encodeURIComponent(`Name: ${values.name}\nCompany: ${values.company}\nEmail: ${values.email}\nPhone: ${values.phone}\n\nMessage:\n${values.message}`);
        window.location.href = `mailto:info@tonysdelight.com?subject=${subject}&body=${body}`;
      }
    } catch (error) {
      const subject = encodeURIComponent("Wholesale Enquiry - Tony's Delight USA");
      const body = encodeURIComponent(`Name: ${form.getValues('name')}\nCompany: ${form.getValues('company')}\nEmail: ${form.getValues('email')}\nPhone: ${form.getValues('phone')}\n\nMessage:\n${form.getValues('message')}`);
      window.location.href = `mailto:info@tonysdelight.com?subject=${subject}&body=${body}`;
    } finally {
      setIsSubmitting(false);
    }
  }

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
              Get In Touch
            </motion.span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-[#111213] mb-4">Contact</h1>
            <p className="text-xl text-[#444] max-w-2xl mx-auto">
              For wholesale, distribution, and partnership enquiries, please contact us using the details below.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-[24px] border-2 border-[#C9A86A] shadow-xl"
            >
              <h2 className="text-2xl font-bold mb-6 text-[#111213]">Send us a message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#111213] font-semibold">Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              {...field} 
                              data-testid="input-name"
                              className="bg-white border-2 border-[#EDEDED] text-[#111213] placeholder:text-[#888] focus:border-[#C9A86A] focus:ring-[#C9A86A]/20 rounded-xl h-12"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#111213] font-semibold">Company *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Company name" 
                              {...field} 
                              data-testid="input-company"
                              className="bg-white border-2 border-[#EDEDED] text-[#111213] placeholder:text-[#888] focus:border-[#C9A86A] focus:ring-[#C9A86A]/20 rounded-xl h-12"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#111213] font-semibold">Email *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="your@email.com" 
                              {...field} 
                              data-testid="input-email"
                              className="bg-white border-2 border-[#EDEDED] text-[#111213] placeholder:text-[#888] focus:border-[#C9A86A] focus:ring-[#C9A86A]/20 rounded-xl h-12"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#111213] font-semibold">Phone *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="+1 (555) 123-4567" 
                              {...field} 
                              data-testid="input-phone"
                              className="bg-white border-2 border-[#EDEDED] text-[#111213] placeholder:text-[#888] focus:border-[#C9A86A] focus:ring-[#C9A86A]/20 rounded-xl h-12"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#111213] font-semibold">Message *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?" 
                            className="min-h-[120px] bg-white border-2 border-[#EDEDED] text-[#111213] placeholder:text-[#888] focus:border-[#C9A86A] focus:ring-[#C9A86A]/20 rounded-xl" 
                            data-testid="input-message"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    data-testid="button-submit"
                    disabled={isSubmitting}
                    className="w-full btn-gold h-12 px-8 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                  
                  <p className="text-sm text-[#666] text-center">
                    We respond as soon as possible. Please include your company name and the products you're interested in.
                  </p>
                </form>
              </Form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-8 text-[#111213]">Contact Information</h2>
              
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[24px] p-8 border-2 border-[#EDEDED] shadow-lg"
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl btn-gold flex items-center justify-center shadow-lg">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#888] uppercase tracking-wider mb-1">Email</h3>
                        <a 
                          href="mailto:info@tonysdelight.com" 
                          className="text-xl font-bold text-[#111213] hover:text-[#C9A86A] transition-colors"
                          data-testid="link-email"
                        >
                          info@tonysdelight.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl btn-gold flex items-center justify-center shadow-lg">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#888] uppercase tracking-wider mb-1">Phone</h3>
                        <a 
                          href="tel:+15127372956" 
                          className="text-xl font-bold text-[#111213] hover:text-[#C9A86A] transition-colors"
                          data-testid="link-phone"
                        >
                          +1 (512) 737-2956
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl btn-gold flex items-center justify-center shadow-lg">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#888] uppercase tracking-wider mb-1">Location</h3>
                        <p className="text-xl font-bold text-[#111213]">
                          United States (Texas)
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <div className="bg-[#F8F8F8] rounded-[24px] p-8 text-center">
                  <h3 className="text-lg font-bold text-[#111213] mb-4">Prefer to call?</h3>
                  <Button 
                    size="lg" 
                    className="btn-gold h-14 px-10" 
                    asChild
                  >
                    <a href="tel:+15127372956" data-testid="button-call">
                      <Phone className="mr-2 h-5 w-5" />
                      Call +1 (512) 737-2956
                    </a>
                  </Button>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-[24px] p-8 border-2 border-[#EDEDED] shadow-lg"
                >
                  <h3 className="text-lg font-bold text-[#111213] mb-6">Social</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-bold text-[#888] uppercase tracking-wider block mb-2">USA</span>
                      <a 
                        href="https://www.instagram.com/tonysdelightusa/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#111213] hover:text-[#C9A86A] transition-colors"
                        data-testid="link-contact-instagram-usa"
                      >
                        <Instagram className="h-5 w-5" />
                        @tonysdelightusa
                      </a>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-[#888] uppercase tracking-wider block mb-2">UK</span>
                      <a 
                        href="https://tonysdelight.co.uk" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#111213] hover:text-[#C9A86A] transition-colors mb-1"
                        data-testid="link-contact-website-uk"
                      >
                        <Globe className="h-5 w-5" />
                        tonysdelight.co.uk
                      </a>
                      <a 
                        href="https://www.instagram.com/tonysdelightuk/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#111213] hover:text-[#C9A86A] transition-colors"
                        data-testid="link-contact-instagram-uk"
                      >
                        <Instagram className="h-5 w-5" />
                        @tonysdelightuk
                      </a>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-[#888] uppercase tracking-wider block mb-2">EU</span>
                      <a 
                        href="https://www.instagram.com/tonysdelighteu/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#111213] hover:text-[#C9A86A] transition-colors mb-1"
                        data-testid="link-contact-instagram-eu"
                      >
                        <Instagram className="h-5 w-5" />
                        @tonysdelighteu
                      </a>
                      <span className="text-sm text-[#888] italic">Website coming soon</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
