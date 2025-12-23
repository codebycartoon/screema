import { Star, Shield, Smartphone, Gift } from "lucide-react";

const ValuePropsSection = () => {
  const valueProps = [
    {
      icon: <Star className="w-8 h-8 text-primary" />,
      title: "Earn Cinema Points",
      description: "Get 10 points for every KES 100 spent on tickets and snacks",
      highlight: "On every booking"
    },
    {
      icon: <Gift className="w-8 h-8 text-primary" />,
      title: "Redeem for Rewards",
      description: "Use points for free tickets, snacks, and exclusive experiences",
      highlight: "Free popcorn at 500 points"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Secure Payments",
      description: "Bank-grade encryption with multiple payment options",
      highlight: "100% secure"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-primary" />,
      title: "Digital QR Tickets",
      description: "No printing needed. Just scan your phone and enter",
      highlight: "Instant delivery"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-card/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-gradient">SCREEMA</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience cinema like never before with our premium features and rewards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valueProps.map((prop, index) => (
            <div 
              key={index}
              className="group text-center animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  {prop.icon}
                </div>
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {prop.title}
              </h3>
              
              <p className="text-muted-foreground mb-3 leading-relaxed">
                {prop.description}
              </p>
              
              <div className="inline-block px-3 py-1 bg-accent/20 text-accent text-sm font-medium rounded-full">
                {prop.highlight}
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border/50">
          <div className="text-center">
            <div className="font-display text-3xl font-bold text-primary mb-2">50K+</div>
            <div className="text-sm text-muted-foreground">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="font-display text-3xl font-bold text-primary mb-2">15</div>
            <div className="text-sm text-muted-foreground">Cinema Locations</div>
          </div>
          <div className="text-center">
            <div className="font-display text-3xl font-bold text-primary mb-2">100+</div>
            <div className="text-sm text-muted-foreground">Movies Monthly</div>
          </div>
          <div className="text-center">
            <div className="font-display text-3xl font-bold text-primary mb-2">4.8★</div>
            <div className="text-sm text-muted-foreground">Customer Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuePropsSection;