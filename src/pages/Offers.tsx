import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Star, Calendar, Users, Clock, Percent } from "lucide-react";
import { getOffersHero } from "@/data/movies";
import { Helmet } from "react-helmet-async";

const Offers = () => {
  const activeOffers = getOffersHero();
  
  // Additional offers for a complete page
  const allOffers = [
    ...activeOffers,
    {
      id: "4",
      headline: "Family Pack Special",
      value: "4 tickets for the price of 3",
      expiry: "Valid on weekends",
      badge: "Family Deal",
      isActive: true,
      isPublic: true,
      backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop"
    },
    {
      id: "5",
      headline: "Birthday Celebration",
      value: "Free birthday cake with group booking",
      expiry: "Book 5+ tickets",
      badge: "Special Occasion",
      isActive: true,
      isPublic: true,
      backdrop: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=1080&fit=crop"
    },
    {
      id: "6",
      headline: "Senior Citizen Discount",
      value: "30% off for 60+ years",
      expiry: "Valid with ID",
      badge: "Age Discount",
      isActive: true,
      isPublic: true,
      backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=1080&fit=crop"
    }
  ];

  const getOfferIcon = (headline: string) => {
    if (headline.includes('Points')) return <Star className="w-6 h-6" />;
    if (headline.includes('Student')) return <Users className="w-6 h-6" />;
    if (headline.includes('IMAX')) return <Gift className="w-6 h-6" />;
    if (headline.includes('Family')) return <Users className="w-6 h-6" />;
    if (headline.includes('Birthday')) return <Gift className="w-6 h-6" />;
    if (headline.includes('Senior')) return <Clock className="w-6 h-6" />;
    return <Percent className="w-6 h-6" />;
  };

  return (
    <>
      <Helmet>
        <title>Offers & Promotions - SCREEMA</title>
        <meta name="description" content="Discover exclusive offers, discounts, and promotions at SCREEMA cinemas." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          {/* Header */}
          <section className="py-12 bg-gradient-to-b from-card/50 to-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                  Exclusive <span className="text-gradient">Offers</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Save more on your favorite movies with our special promotions and deals
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-primary mb-1">{allOffers.length}</div>
                  <div className="text-sm text-muted-foreground">Active Offers</div>
                </div>
                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-primary mb-1">30%</div>
                  <div className="text-sm text-muted-foreground">Max Discount</div>
                </div>
                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-primary mb-1">2×</div>
                  <div className="text-sm text-muted-foreground">Bonus Points</div>
                </div>
                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-primary mb-1">50K+</div>
                  <div className="text-sm text-muted-foreground">Members Saved</div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Offers */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-2xl font-bold mb-8 text-center">
                Featured <span className="text-gradient">Deals</span>
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {allOffers.slice(0, 2).map((offer, index) => (
                  <div 
                    key={offer.id}
                    className="group relative overflow-hidden rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="relative aspect-[2/1] overflow-hidden">
                      <img
                        src={offer.backdrop}
                        alt={offer.headline}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/20" />
                      
                      <div className="absolute inset-0 p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                            {getOfferIcon(offer.headline)}
                          </div>
                          <Badge variant="outline" className="text-primary border-primary/30">
                            {offer.badge}
                          </Badge>
                        </div>
                        
                        <h3 className="font-display text-3xl font-bold mb-3 text-white">
                          {offer.headline}
                        </h3>
                        
                        <p className="text-xl font-semibold text-accent mb-3">
                          {offer.value}
                        </p>
                        
                        <p className="text-white/80 mb-6">
                          {offer.expiry}
                        </p>
                        
                        <Button variant="cinema" className="w-fit">
                          View Eligible Movies
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* All Offers Grid */}
          <section className="py-12 bg-gradient-to-b from-background to-card/50">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-2xl font-bold mb-8 text-center">
                All <span className="text-gradient">Offers</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allOffers.map((offer, index) => (
                  <div 
                    key={offer.id}
                    className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={offer.backdrop}
                        alt={offer.headline}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      
                      <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-primary border-primary/30">
                          {offer.badge}
                        </Badge>
                      </div>
                      
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                            {getOfferIcon(offer.headline)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {offer.headline}
                      </h3>
                      
                      <p className="text-lg font-semibold text-accent mb-2">
                        {offer.value}
                      </p>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        {offer.expiry}
                      </p>
                      
                      <Button variant="cinema" size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How to Redeem */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-display text-3xl font-bold mb-4">
                    How to <span className="text-gradient">Redeem Offers</span>
                  </h2>
                  <p className="text-muted-foreground">
                    Follow these simple steps to save on your next movie experience
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">1</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-3">Choose Your Movie</h3>
                    <p className="text-muted-foreground">
                      Select from eligible movies showing the offer badge
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">2</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-3">Apply at Checkout</h3>
                    <p className="text-muted-foreground">
                      Discounts are automatically applied or enter promo code
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">3</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-3">Enjoy & Save</h3>
                    <p className="text-muted-foreground">
                      Complete your booking and enjoy the savings
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="py-12 bg-gradient-to-b from-card/50 to-background">
            <div className="container mx-auto px-4">
              <div className="bg-card rounded-xl p-8 text-center max-w-2xl mx-auto">
                <Gift className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold mb-4">
                  Never Miss an <span className="text-gradient">Offer</span>
                </h3>
                <p className="text-muted-foreground mb-6">
                  Subscribe to our newsletter and be the first to know about exclusive deals and promotions
                </p>
                <Link to="/#newsletter">
                  <Button variant="cinema" size="lg">
                    Subscribe Now
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Offers;