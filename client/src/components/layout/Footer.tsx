import { Link } from "wouter";
import { MapPin, Phone, Mail, Globe, Instagram } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-[#111213] text-gray-400 pt-20 pb-10">
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div>
          <h3 className="text-white font-heading text-xl font-bold mb-6">About Tony's Delight USA</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Tony's Delight USA is a family-run importer and distributor of premium international food products. We partner with wholesalers, retailers, and distributors who want quality and consistency.
          </p>
        </div>

        <div>
          <h3 className="text-white font-heading text-lg font-bold mb-6">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/" className="text-gray-400 hover:text-[#C9A86A] transition-colors">Home</Link></li>
            <li><Link href="/about" className="text-gray-400 hover:text-[#C9A86A] transition-colors">About Us</Link></li>
            <li><Link href="/products" className="text-gray-400 hover:text-[#C9A86A] transition-colors">Products</Link></li>
            <li><Link href="/for-brands" className="text-gray-400 hover:text-[#C9A86A] transition-colors">For Brands</Link></li>
            <li><Link href="/partners" className="text-gray-400 hover:text-[#C9A86A] transition-colors">Partners</Link></li>
            <li><Link href="/quality" className="text-gray-400 hover:text-[#C9A86A] transition-colors">Quality</Link></li>
            <li><Link href="/faq" className="text-gray-400 hover:text-[#C9A86A] transition-colors">FAQ</Link></li>
            <li><Link href="/jobs" className="text-gray-400 hover:text-[#C9A86A] transition-colors">Jobs</Link></li>
            <li><Link href="/contact" className="text-gray-400 hover:text-[#C9A86A] transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-heading text-lg font-bold mb-6">Our Regions</h3>
          <p className="text-gray-500 text-xs mb-4">Serving customers worldwide</p>
          <ul className="space-y-4 text-sm">
            <li>
              <span className="text-white font-medium block mb-1">USA</span>
              <a 
                href="https://tonysdelight.com"
                className="flex items-center gap-2 text-gray-400 hover:text-[#C9A86A] transition-colors mb-1"
                data-testid="link-website-usa"
              >
                <Globe className="h-4 w-4" />
                Tony's Delight USA
              </a>
              <a 
                href="https://www.instagram.com/tonysdelightusa/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-[#C9A86A] transition-colors"
                data-testid="link-instagram-usa"
              >
                <Instagram className="h-4 w-4" />
                @tonysdelightusa
              </a>
            </li>
            <li>
              <span className="text-white font-medium block mb-1">UK</span>
              <a 
                href="https://tonysdelight.co.uk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-[#C9A86A] transition-colors mb-1"
                data-testid="link-website-uk"
              >
                <Globe className="h-4 w-4" />
                Tony's Delight UK
              </a>
              <a 
                href="https://www.instagram.com/tonysdelightuk/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-[#C9A86A] transition-colors"
                data-testid="link-instagram-uk"
              >
                <Instagram className="h-4 w-4" />
                @tonysdelightuk
              </a>
            </li>
            <li>
              <span className="text-white font-medium block mb-1">EU</span>
              <a 
                href="https://tonysdelighteu.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-[#C9A86A] transition-colors mb-1"
                data-testid="link-website-eu"
              >
                <Globe className="h-4 w-4" />
                Tony's Delight EU
              </a>
              <a 
                href="https://www.instagram.com/tonysdelighteu/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-[#C9A86A] transition-colors"
                data-testid="link-instagram-eu"
              >
                <Instagram className="h-4 w-4" />
                @tonysdelighteu
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-heading text-lg font-bold mb-6">Contact</h3>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#C9A86A]/10 flex items-center justify-center">
                <Mail className="h-4 w-4 text-[#C9A86A]" />
              </div>
              <a href="mailto:info@tonysdelight.com" className="hover:text-[#C9A86A] transition-colors">info@tonysdelight.com</a>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#C9A86A]/10 flex items-center justify-center">
                <Phone className="h-4 w-4 text-[#C9A86A]" />
              </div>
              <a href="tel:+15127372956" className="hover:text-[#C9A86A] transition-colors">+1 (512) 737-2956</a>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#C9A86A]/10 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="h-4 w-4 text-[#C9A86A]" />
              </div>
              <span>United States (Texas)</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-custom pt-8 border-t border-[#2A2A2C]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-xs text-gray-500">
          <div>
            <p className="text-gray-400 font-medium mb-2">Legal Entity</p>
            <p className="leading-relaxed">
              Tony's Delight USA is owned and operated by Tony's Delight USA LLC.
            </p>
            <p className="mt-2 leading-relaxed">
              Registered Address:<br />
              5900 Balcones Drive #26144<br />
              Austin, TX 78731<br />
              United States
            </p>
            <p className="mt-2">
              Phone: <a href="tel:+15127372956" className="hover:text-[#C9A86A] transition-colors">+1 (512) 737-2956</a>
            </p>
          </div>
          <div>
            <p className="text-gray-400 font-medium mb-2">Tony's Delight Global</p>
            <p className="leading-relaxed">
              Tony's Delight USA is part of the Tony's Delight global family of companies. Tony's Delight operates internationally through regional entities in the United States, United Kingdom, and European Union, with global sourcing, manufacturing partnerships, and production operations rooted in India. Each regional entity operates independently while sharing the same commitment to quality, authenticity, and consistent standards across markets.
            </p>
          </div>
        </div>
        <div className="text-center text-gray-500 text-xs">
          <p>&copy; {currentYear} Tony's Delight USA LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
