import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Products from "@/pages/Products";
import ImportedBrands from "@/pages/ImportedBrands";
import Admin from "@/pages/Admin";
import Jobs from "@/pages/Jobs";
import Partners from "@/pages/Partners";
import FAQ from "@/pages/FAQ";
import Quality from "@/pages/Quality";
import ForBrands from "@/pages/ForBrands";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          
          {/* Category Pages */}
          <Route path="/products/dry">
            {() => <Products initialCategory="Dry Products" />}
          </Route>
          <Route path="/products/frozen">
            {() => <Products initialCategory="Frozen Products" />}
          </Route>
          <Route path="/products/seafood">
            {() => <Products initialCategory="Seafood" />}
          </Route>
          <Route path="/products/imported-brands" component={ImportedBrands} />
          <Route path="/products/lal-qilla-basmati">
            {() => <Products initialCategory="Lal Qilla Basmati" />}
          </Route>
          
          {/* Products Index */}
          <Route path="/products">
            {() => <Products />}
          </Route>
          
          {/* Admin Upload Panel */}
          <Route path="/admin" component={Admin} />
          
          {/* Jobs Page */}
          <Route path="/jobs" component={Jobs} />
          
          {/* Partners Page */}
          <Route path="/partners" component={Partners} />
          
          {/* FAQ Page */}
          <Route path="/faq" component={FAQ} />
          
          {/* Quality Page */}
          <Route path="/quality" component={Quality} />
          
          {/* For Brands Page */}
          <Route path="/for-brands" component={ForBrands} />
          
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
