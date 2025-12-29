import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const PRODUCT_ITEMS = [
  { label: "Dry Products", href: "/products/dry" },
  { label: "Frozen Products", href: "/products/frozen" },
  { label: "Seafood", href: "/products/seafood" },
  { label: "Imported Brands", href: "/products/imported-brands" },
  { label: "Lal Qilla Basmati", href: "/products/lal-qilla-basmati" },
];

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products", hasDropdown: true },
  { label: "For Brands", href: "/for-brands" },
  { label: "Partners", href: "/partners" },
  { label: "Quality", href: "/quality" },
  { label: "FAQ", href: "/faq" },
  { label: "Jobs", href: "/jobs" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);

  const isProductsActive = location.startsWith("/products");

  return (
    <nav 
      className="fixed top-0 left-0 right-0 w-full bg-white shadow-md border-b border-gray-200"
      style={{ zIndex: 9999 }}
    >
      <div className="container-custom">
        <div className="flex h-20 items-center justify-between relative">
          <Link 
            href="/" 
            className="flex items-center"
          >
            <img 
              src="/logo.png" 
              alt="Tony's Delight USA" 
              className="h-16 w-auto object-contain transition-transform duration-300 ease-out hover:scale-105"
            />
          </Link>

          <div className="hidden xl:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              item.hasDropdown ? (
                <div 
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setShowProductsDropdown(true)}
                  onMouseLeave={() => setShowProductsDropdown(false)}
                >
                  <Link 
                    href={item.href}
                    className={cn(
                      "text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 py-2 relative group flex items-center gap-1",
                      isProductsActive
                        ? "text-[#C9A86A]"
                        : "text-[#222222] hover:text-[#C9A86A]"
                    )}
                  >
                    {item.label}
                    <ChevronDown className="h-3 w-3" />
                    <span className={cn(
                      "absolute bottom-0 left-0 w-full h-0.5 bg-[#C9A86A] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                      isProductsActive ? "scale-x-100" : ""
                    )} />
                  </Link>
                  
                  {showProductsDropdown && (
                    <div className="absolute top-full left-0 pt-2">
                      <div className="bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px]">
                        {PRODUCT_ITEMS.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              "block px-4 py-2 text-sm font-medium transition-colors",
                              location === subItem.href
                                ? "bg-[#C9A86A]/10 text-[#C9A86A]"
                                : "text-[#222222] hover:bg-gray-50 hover:text-[#C9A86A]"
                            )}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={cn(
                    "text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 py-2 relative group",
                    location === item.href
                      ? "text-[#C9A86A]"
                      : "text-[#222222] hover:text-[#C9A86A]"
                  )}
                >
                  {item.label}
                  <span className={cn(
                    "absolute bottom-0 left-0 w-full h-0.5 bg-[#C9A86A] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                    location === item.href ? "scale-x-100" : ""
                  )} />
                </Link>
              )
            ))}
          </div>

          <button
            className="xl:hidden p-2 transition-colors text-[#222222] hover:text-[#C9A86A]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="xl:hidden bg-white absolute w-full shadow-lg animate-in slide-in-from-top-5 border-t border-gray-200" style={{ zIndex: 9999 }}>
          <div className="container-custom py-6 flex flex-col gap-2">
            <Link 
              href="/"
              className={cn(
                "text-base font-bold py-3 px-4 rounded-lg transition-all duration-300",
                location === "/"
                  ? "bg-[#C9A86A]/10 text-[#C9A86A] border border-[#C9A86A]/30"
                  : "text-[#222222] hover:bg-gray-50 hover:text-[#C9A86A]"
              )}
              onClick={() => setIsOpen(false)}
              data-testid="link-mobile-home"
            >
              Home
            </Link>
            <Link 
              href="/about"
              className={cn(
                "text-base font-bold py-3 px-4 rounded-lg transition-all duration-300",
                location === "/about"
                  ? "bg-[#C9A86A]/10 text-[#C9A86A] border border-[#C9A86A]/30"
                  : "text-[#222222] hover:bg-gray-50 hover:text-[#C9A86A]"
              )}
              onClick={() => setIsOpen(false)}
              data-testid="link-mobile-about"
            >
              About Us
            </Link>
            
            <div className="py-2 px-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#888]">Products</span>
            </div>
            {PRODUCT_ITEMS.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "text-base font-bold py-3 px-4 pl-8 rounded-lg transition-all duration-300",
                  location === item.href
                    ? "bg-[#C9A86A]/10 text-[#C9A86A] border border-[#C9A86A]/30"
                    : "text-[#222222] hover:bg-gray-50 hover:text-[#C9A86A]"
                )}
                onClick={() => setIsOpen(false)}
                data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
              </Link>
            ))}
            
            <Link 
              href="/for-brands"
              className={cn(
                "text-base font-bold py-3 px-4 rounded-lg transition-all duration-300",
                location === "/for-brands"
                  ? "bg-[#C9A86A]/10 text-[#C9A86A] border border-[#C9A86A]/30"
                  : "text-[#222222] hover:bg-gray-50 hover:text-[#C9A86A]"
              )}
              onClick={() => setIsOpen(false)}
              data-testid="link-mobile-for-brands"
            >
              For Brands
            </Link>
            <Link 
              href="/partners"
              className={cn(
                "text-base font-bold py-3 px-4 rounded-lg transition-all duration-300",
                location === "/partners"
                  ? "bg-[#C9A86A]/10 text-[#C9A86A] border border-[#C9A86A]/30"
                  : "text-[#222222] hover:bg-gray-50 hover:text-[#C9A86A]"
              )}
              onClick={() => setIsOpen(false)}
              data-testid="link-mobile-partners"
            >
              Partners
            </Link>
            <Link 
              href="/quality"
              className={cn(
                "text-base font-bold py-3 px-4 rounded-lg transition-all duration-300",
                location === "/quality"
                  ? "bg-[#C9A86A]/10 text-[#C9A86A] border border-[#C9A86A]/30"
                  : "text-[#222222] hover:bg-gray-50 hover:text-[#C9A86A]"
              )}
              onClick={() => setIsOpen(false)}
              data-testid="link-mobile-quality"
            >
              Quality
            </Link>
            <Link 
              href="/faq"
              className={cn(
                "text-base font-bold py-3 px-4 rounded-lg transition-all duration-300",
                location === "/faq"
                  ? "bg-[#C9A86A]/10 text-[#C9A86A] border border-[#C9A86A]/30"
                  : "text-[#222222] hover:bg-gray-50 hover:text-[#C9A86A]"
              )}
              onClick={() => setIsOpen(false)}
              data-testid="link-mobile-faq"
            >
              FAQ
            </Link>
            <Link 
              href="/jobs"
              className={cn(
                "text-base font-bold py-3 px-4 rounded-lg transition-all duration-300",
                location === "/jobs"
                  ? "bg-[#C9A86A]/10 text-[#C9A86A] border border-[#C9A86A]/30"
                  : "text-[#222222] hover:bg-gray-50 hover:text-[#C9A86A]"
              )}
              onClick={() => setIsOpen(false)}
              data-testid="link-mobile-jobs"
            >
              Jobs
            </Link>
            <Link 
              href="/contact"
              className={cn(
                "text-base font-bold py-3 px-4 rounded-lg transition-all duration-300",
                location === "/contact"
                  ? "bg-[#C9A86A]/10 text-[#C9A86A] border border-[#C9A86A]/30"
                  : "text-[#222222] hover:bg-gray-50 hover:text-[#C9A86A]"
              )}
              onClick={() => setIsOpen(false)}
              data-testid="link-mobile-contact"
            >
              Contact
            </Link>
            
            <div className="mt-4 pt-4 border-t border-gray-100 px-4">
              <a href="tel:+15127372956" className="flex items-center gap-3 text-base font-medium text-[#C9A86A]" data-testid="link-phone">
                <Phone className="h-5 w-5" />
                <span>+1 (512) 737-2956</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
