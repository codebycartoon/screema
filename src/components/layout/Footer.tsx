import { Film, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Film className="w-8 h-8 text-primary" />
              <span className="font-display text-xl font-semibold">
                SCREE<span className="text-primary">MA</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your premium destination for the ultimate cinema experience. Book tickets, choose seats, and enjoy movies like never before.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Movies</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Now Showing</Link></li>
              <li><Link to="/coming-soon" className="text-muted-foreground hover:text-foreground transition-colors">Coming Soon</Link></li>
              <li><Link to="/offers" className="text-muted-foreground hover:text-foreground transition-colors">Offers & Promotions</Link></li>
              <li><Link to="/gift-cards" className="text-muted-foreground hover:text-foreground transition-colors">Gift Cards</Link></li>
            </ul>
          </div>

          {/* Theaters */}
          <div>
            <h4 className="font-display font-semibold mb-4">Theaters</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/theaters" className="text-muted-foreground hover:text-foreground transition-colors">Find a Theater</Link></li>
              <li><Link to="/imax" className="text-muted-foreground hover:text-foreground transition-colors">IMAX Experience</Link></li>
              <li><Link to="/dolby" className="text-muted-foreground hover:text-foreground transition-colors">Dolby Cinema</Link></li>
              <li><Link to="/4dx" className="text-muted-foreground hover:text-foreground transition-colors">4DX</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Mombasa, Kenya</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a href="tel:+254714840103" className="hover:text-foreground transition-colors">+254 714 840 103</a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a href="mailto:franklineonguti4@gmail.com" className="hover:text-foreground transition-colors break-all">franklineonguti4@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 SCREEMA. All rights reserved. Built by Frankline Onguti.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
