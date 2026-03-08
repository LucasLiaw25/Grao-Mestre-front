import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="font-serif text-3xl font-bold tracking-tight mb-6">Grão Mestre.</h2>
            <p className="text-secondary-foreground/70 max-w-sm text-balance leading-relaxed">
              Elevating the daily ritual. We source, roast, and deliver the world's most extraordinary coffees, directly to your door.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-6 tracking-wide uppercase text-sm text-primary">Shop</h3>
            <ul className="space-y-4">
              <li><Link to="/products" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">All Products</Link></li>
              <li><Link to="/products" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">Single Origin</Link></li>
              <li><Link to="/products" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">Blends</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-6 tracking-wide uppercase text-sm text-primary">Company</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">Our Story</a></li>
              <li><a href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">Sustainability</a></li>
              <li><a href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-secondary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-secondary-foreground/50">
            © {new Date().getFullYear()} Grão Mestre. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-secondary-foreground/50 hover:text-secondary-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-secondary-foreground/50 hover:text-secondary-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
