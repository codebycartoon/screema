import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Coffee, Gift, Star } from "lucide-react";

const SnacksPromoSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-accent/5 via-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Coffee className="w-10 h-10 text-primary" />
            <Gift className="w-8 h-8 text-accent" />
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Premium <span className="text-gradient">Cinema Snacks</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Complete your movie experience with our selection of fresh popcorn, gourmet snacks, 
            and refreshing beverages. Available for selection during your booking process.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Fresh & Hot</h3>
              <p className="text-sm text-muted-foreground">
                Freshly prepared snacks and hot beverages made to order
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">
                High-quality ingredients and gourmet options for every taste
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Earn Rewards</h3>
              <p className="text-sm text-muted-foreground">
                Get points on every purchase and redeem for free treats
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/movies">
              <Button variant="cinema" size="lg">
                Book Tickets & Add Snacks
              </Button>
            </Link>
            <Link to="/rewards">
              <Button variant="outline" size="lg">
                <Gift className="w-4 h-4 mr-2" />
                View Rewards Program
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SnacksPromoSection;