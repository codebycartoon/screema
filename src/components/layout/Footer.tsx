import { Film, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Film className="w-8 h-8 text-primary" />
              <span className="font-display text-xl font-semibold">
                SCREE<span className="text-red-500">MA</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Your premium destination for the ultimate cinema experience. Book tickets, choose seats, and enjoy movies like never before.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link to="/press" className="text-muted-foreground hover:text-foreground transition-colors">Press</Link></li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-display font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/movies" className="text-muted-foreground hover:text-foreground transition-colors">Movies</Link></li>
              <li><Link to="/cinemas" className="text-muted-foreground hover:text-foreground transition-colors">Cinemas</Link></li>
              <li><Link to="/offers" className="text-muted-foreground hover:text-foreground transition-colors">Offers</Link></li>
              <li><Link to="/rewards" className="text-muted-foreground hover:text-foreground transition-colors">Rewards</Link></li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="lg:col-span-2">
            <div className="flex flex-col lg:flex-row lg:gap-8">
              {/* Support Links */}
              <div className="flex-1">
                <h4 className="font-display font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors">FAQs</Link></li>
                  <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link></li>
                  <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/accessibility" className="text-muted-foreground hover:text-foreground transition-colors">Accessibility</Link></li>
                </ul>
              </div>
              
              {/* Contact Info */}
              <div className="flex-1 mt-8 lg:mt-0">
                <h4 className="font-display font-semibold mb-4">Contact Info</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>+254 714840103</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>support@screema.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>Mombasa, Kenya</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 SCREEMA. All rights reserved. Built by Frankline Onguti.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>Made with ❤️ in Kenya</span>
            <span>•</span>
            <span>Powered by innovation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;