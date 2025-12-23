import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, Mail, Gift, Star, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      toast({
        title: "Welcome to SCREEMA!",
        description: "You'll receive exclusive offers and movie updates.",
      });
    }, 1000);
  };

  const benefits = [
    {
      icon: <Star className="w-5 h-5" />,
      text: "Early access to tickets"
    },
    {
      icon: <Gift className="w-5 h-5" />,
      text: "Exclusive member discounts"
    },
    {
      icon: <Bell className="w-5 h-5" />,
      text: "New movie notifications"
    }
  ];

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="font-display text-3xl font-bold mb-4">
              Welcome to the <span className="text-gradient">SCREEMA Family!</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              You're all set! Check your email for a special welcome offer.
            </p>
            <Badge variant="outline" className="text-accent border-accent/30">
              <Gift className="w-4 h-4 mr-2" />
              20% off your first booking
            </Badge>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <Badge variant="outline" className="text-accent border-accent/30">
                  Free to join
                </Badge>
              </div>

              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Never Miss a <span className="text-gradient">Blockbuster</span>
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                Get exclusive access to advance bookings, member-only discounts, and be the first to know about new releases.
              </p>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 animate-fade-in"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      {benefit.icon}
                    </div>
                    <span className="text-muted-foreground">{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Newsletter Form */}
              <form onSubmit={handleSubscribe} className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button 
                  type="submit" 
                  variant="cinema"
                  disabled={isLoading}
                  className="px-8"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground mt-3">
                By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
              </p>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="bg-card rounded-2xl p-8 shadow-elevated">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">Stay Updated</h3>
                  <p className="text-sm text-muted-foreground">Join 25,000+ movie enthusiasts</p>
                </div>

                {/* Mock Notifications */}
                <div className="space-y-3">
                  <div className="bg-background rounded-lg p-3 border-l-4 border-primary">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium">New Release Alert</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Dune: Part Two tickets now available</p>
                  </div>
                  
                  <div className="bg-background rounded-lg p-3 border-l-4 border-accent">
                    <div className="flex items-center gap-2 mb-1">
                      <Gift className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Exclusive Offer</span>
                    </div>
                    <p className="text-xs text-muted-foreground">25% off weekend bookings</p>
                  </div>
                  
                  <div className="bg-background rounded-lg p-3 border-l-4 border-green-500">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">Booking Confirmed</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Your tickets are ready!</p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;