import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Star, 
  TrendingUp, 
  Gift, 
  Calendar,
  Plus,
  Minus,
  Trophy,
  Zap,
  Target,
  Award,
  Coins,
  ArrowRight,
  Sparkles,
  Crown,
  Flame,
  Ticket
} from "lucide-react";
import { getUserTier, getNextTier, userTiers } from "@/data/dashboard";

interface PointsTabProps {
  userPoints: number;
}

interface PointsTransaction {
  id: string;
  type: 'earned' | 'redeemed';
  amount: number;
  description: string;
  date: Date;
  movieTitle?: string;
}

const mockTransactions: PointsTransaction[] = [
  {
    id: 'trans-001',
    type: 'earned',
    amount: 165,
    description: 'Booking: Dune Part Two',
    date: new Date('2024-12-20T10:30:00'),
    movieTitle: 'Dune: Part Two'
  },
  {
    id: 'trans-002',
    type: 'redeemed',
    amount: -500,
    description: 'Redeemed: Large Popcorn',
    date: new Date('2024-12-18T19:00:00')
  },
  {
    id: 'trans-003',
    type: 'earned',
    amount: 120,
    description: 'Booking: Oppenheimer',
    date: new Date('2024-12-15T16:00:00'),
    movieTitle: 'Oppenheimer'
  },
  {
    id: 'trans-004',
    type: 'earned',
    amount: 50,
    description: 'Birthday Bonus',
    date: new Date('2024-12-10T00:00:00')
  }
];

const PointsTab = ({ userPoints }: PointsTabProps) => {
  const currentTier = getUserTier(userPoints);
  const nextTier = getNextTier(userPoints);
  const progressToNext = nextTier ? 
    ((userPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100 : 100;

  const monthlyEarned = 335;
  const totalBookings = 3;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
              <Coins className="w-4 h-4 text-white" />
            </div>
            Cinema Points
          </h1>
          <p className="text-muted-foreground mt-1">
            Earn points with every booking and redeem for amazing rewards
          </p>
        </div>
        
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg">
          <Gift className="w-4 h-4 mr-2" />
          Redeem Points
        </Button>
      </div>

      {/* Points Balance Hero Card */}
      <Card className="overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-purple-500/20 text-white">
        <CardContent className="p-0">
          <div className="relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent)] opacity-50"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
            
            <div className="relative p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Points Balance */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Total Balance</p>
                      <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                        {userPoints.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  {/* Current Tier Badge */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{currentTier.icon}</span>
                    <div>
                      <Badge className="bg-white/20 text-white border-white/30 px-3 py-1 mb-1">
                        {currentTier.name} Member
                      </Badge>
                      <p className="text-white/70 text-sm">Current Tier</p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-white/70">This Month</span>
                      </div>
                      <div className="text-xl font-bold text-green-400">+{monthlyEarned}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Ticket className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-white/70">Bookings</span>
                      </div>
                      <div className="text-xl font-bold text-blue-400">{totalBookings}</div>
                    </div>
                  </div>
                </div>

                {/* Tier Progress */}
                <div className="space-y-6">
                  {nextTier ? (
                    <>
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-3 text-white">Next Tier: {nextTier.name}</h3>
                        <div className="flex items-center justify-center gap-3 mb-4">
                          <div className="text-center">
                            <div className="text-2xl mb-1">{currentTier.icon}</div>
                            <div className="text-xs text-white/70">{currentTier.name}</div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-white/50" />
                          <div className="text-center">
                            <div className="text-2xl mb-1">{nextTier.icon}</div>
                            <div className="text-xs text-white/70">{nextTier.name}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-white/70">{userPoints.toLocaleString()} / {nextTier.minPoints.toLocaleString()} points</span>
                          <span className="text-yellow-400 font-medium">
                            {nextTier.minPoints - userPoints} to go
                          </span>
                        </div>
                        <Progress value={progressToNext} className="h-2 bg-white/20" />
                      </div>

                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-white">
                          <Crown className="w-4 h-4 text-yellow-400" />
                          Unlock Next Benefits
                        </h4>
                        <ul className="text-sm space-y-1">
                          {nextTier.benefits.slice(0, 2).map((benefit, index) => (
                            <li key={index} className="flex items-center gap-2 text-white/80">
                              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
                      <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-yellow-400 mb-2">Maximum Tier!</h3>
                      <p className="text-sm text-white/70">You've unlocked all tier benefits</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Tier Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Your {currentTier.name} Benefits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentTier.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-muted/50 to-muted/30 border border-border/50 hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Tiers Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-purple-500" />
            Membership Tiers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {userTiers.map((tier, tierIndex) => {
              const isCurrentTier = tier.id === currentTier.id;
              const isUnlocked = userPoints >= tier.minPoints;
              
              return (
                <div 
                  key={tier.id}
                  className={`relative p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
                    isCurrentTier 
                      ? 'bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 border-purple-500 ring-2 ring-purple-500/20 shadow-lg' 
                      : isUnlocked
                        ? 'border-border/50 bg-muted/30 hover:shadow-md hover:border-border'
                        : 'border-border/30 bg-muted/10 opacity-60'
                  }`}
                >
                  {isCurrentTier && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className="text-3xl mb-3">{tier.icon}</div>
                    <h3 className={`font-bold text-lg mb-1 ${isCurrentTier ? 'text-purple-700 dark:text-purple-300' : ''}`}>
                      {tier.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {tier.minPoints === 0 ? '0' : tier.minPoints.toLocaleString()}
                      {tier.maxPoints === Infinity ? '+' : ` - ${tier.maxPoints.toLocaleString()}`} pts
                    </p>
                    
                    {isCurrentTier && (
                      <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs">
                        Current Tier
                      </Badge>
                    )}
                    {!isCurrentTier && isUnlocked && (
                      <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                        Unlocked
                      </Badge>
                    )}
                    {!isUnlocked && (
                      <Badge variant="secondary" className="text-xs">
                        Locked
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            Recent Activity
          </CardTitle>
          <Button variant="outline" size="sm">
            View Full History
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-all duration-200 group">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
                    transaction.type === 'earned' 
                      ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white' 
                      : 'bg-gradient-to-br from-red-500 to-pink-500 text-white'
                  }`}>
                    {transaction.type === 'earned' ? (
                      <Plus className="w-6 h-6" />
                    ) : (
                      <Minus className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{transaction.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{transaction.date.toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{transaction.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'earned' ? '+' : ''}{transaction.amount}
                  </p>
                  <p className="text-xs text-muted-foreground">points</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-purple-600" />
              Redeem Rewards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Use your points to get free snacks, tickets, and exclusive experiences
            </p>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center text-sm p-2 rounded bg-white/50 dark:bg-black/20">
                <span>🍿 Free Popcorn</span>
                <Badge variant="outline" className="border-purple-300 text-purple-700">500 pts</Badge>
              </div>
              <div className="flex justify-between items-center text-sm p-2 rounded bg-white/50 dark:bg-black/20">
                <span>🎫 Movie Ticket</span>
                <Badge variant="outline" className="border-purple-300 text-purple-700">1,200 pts</Badge>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Browse All Rewards
            </Button>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-blue-600" />
              Earn More Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Book more movies and participate in special promotions to earn bonus points
            </p>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center text-sm p-2 rounded bg-white/50 dark:bg-black/20">
                <span>Per Booking</span>
                <Badge variant="outline" className="border-green-300 text-green-700">+100-200 pts</Badge>
              </div>
              <div className="flex justify-between items-center text-sm p-2 rounded bg-white/50 dark:bg-black/20">
                <span>Weekend Bonus</span>
                <Badge variant="outline" className="border-blue-300 text-blue-700">+50 pts</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950">
              Book a Movie
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PointsTab;