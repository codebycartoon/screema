import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Star, Trophy, Ticket, Popcorn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Helmet } from "react-helmet-async";

const RewardsPage = () => {
  const { user } = useAuth();
  const [userPoints] = useState(1250);
  
  const rewardTiers = [
    {
      name: "Silver",
      minPoints: 0,
      maxPoints: 999,
      icon: <Star className="w-6 h-6" />,
      benefits: ["10 points per KES 100", "Birthday bonus", "Email updates"],
      color: "text-gray-400"
    },
    {
      name: "Gold", 
      minPoints: 1000,
      maxPoints: 2499,
      icon: <Trophy className="w-6 h-6" />,
      benefits: ["15 points per KES 100", "Priority booking", "Exclusive offers"],
      color: "text-yellow-500"
    }
  ];

  const rewardItems = [
    {
      id: 1,
      name: "Free Movie Ticket",
      points: 1500,
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=200&fit=crop",
      icon: <Ticket className="w-5 h-5" />,
      category: "Tickets",
      popular: true
    },
    {
      id: 2,
      name: "Large Popcorn",
      points: 500,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      icon: <Popcorn className="w-5 h-5" />,
      category: "Snacks",
      popular: true
    }
  ];

  const getCurrentTier = () => {
    return rewardTiers.find(tier => userPoints >= tier.minPoints && userPoints <= tier.maxPoints) || rewardTiers[0];
  };

  const currentTier = getCurrentTier();

  if (!user) {
    return (
      <>
        <Helmet>
          <title>Rewards Program - SCREEMA</title>
          <meta name="description" content="Join the SCREEMA rewards program and earn points on every booking." />
        </Helmet>
        
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-20">
            <section className="py-20">
              <div className="container mx-auto px-4 text-center">
                <Gift className="w-16 h-16 text-primary mx-auto mb-6" />
                <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                  Join SCREEMA <span className="text-gradient">Rewards</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                  Earn points on every booking and redeem them for free tickets, snacks, and exclusive experiences
                </p>
                <Link to="/auth">
                  <Button variant="cinema" size="lg">
                    Sign Up to Start Earning
                  </Button>
                </Link>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Rewards - SCREEMA</title>
        <meta name="description" content="View your SCREEMA rewards points and redeem exclusive offers." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <section className="py-12 bg-gradient-to-b from-card/50 to-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                    My <span className="text-gradient">Rewards</span>
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Welcome back, {user.user_metadata?.full_name || 'Member'}!
                  </p>
                </div>

                <div className="bg-card rounded-xl p-8 shadow-elevated mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center ${currentTier.color}`}>
                          {currentTier.icon}
                        </div>
                        <Badge variant="outline" className={`${currentTier.color} border-current`}>
                          {currentTier.name} Member
                        </Badge>
                      </div>
                      
                      <div className="text-4xl font-bold text-primary mb-2">
                        {userPoints.toLocaleString()} Points
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold">Your Benefits:</h3>
                      {currentTier.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Star className="w-4 h-4 text-accent" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl font-bold mb-4">
                  Redeem <span className="text-gradient">Rewards</span>
                </h2>
                <p className="text-muted-foreground">
                  Use your points to unlock amazing rewards and experiences
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewardItems.map((item) => (
                  <div 
                    key={item.id}
                    className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300"
                  >
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {item.popular && (
                        <div className="absolute top-3 left-3">
                          <Badge variant="default" className="bg-accent text-accent-foreground">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Popular
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                          {item.icon}
                        </div>
                        <h3 className="font-display text-lg font-semibold">
                          {item.name}
                        </h3>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-primary">{item.points}</span>
                        <span className="text-sm text-muted-foreground">points</span>
                      </div>

                      <Button 
                        variant={userPoints >= item.points ? "cinema" : "outline"} 
                        className="w-full"
                        disabled={userPoints < item.points}
                      >
                        {userPoints >= item.points ? "Redeem Now" : "Not Enough Points"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RewardsPage;