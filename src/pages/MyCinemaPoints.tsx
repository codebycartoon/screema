import { useState } from "react";
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
  Award,
  Coins,
  ArrowRight,
  Sparkles,
  Crown,
  Flame,
  Ticket,
  Eye
} from "lucide-react";
import { getUserTier, getNextTier, userTiers, getCurrentDivisionTiers } from "@/data/dashboard";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { Navigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import DashboardSidebar, { DashboardTab } from "@/components/dashboard/DashboardSidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

const MyCinemaPoints = () => {
  const { user, loading } = useAuth();
  const { 
    unreadNotifications, 
    unreadMovieNotifications,
    watchlistBadge,
    cancelledBookingsBadge,
    bookings
  } = useNotifications();
  const userPoints = 3250; // Mock user points - in real app, this would come from user data
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const currentTier = getUserTier(userPoints);
  const nextTier = getNextTier(userPoints);
  const progressToNext = nextTier ? 
    ((userPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100 : 100;

  const monthlyEarned = 335;
  const totalBookings = 3;

  return (
    <>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex">
          <DashboardSidebar
            activeTab={'points' as DashboardTab}
            onTabChange={() => {}}
            userPoints={userPoints}
            notificationCount={unreadNotifications}
            movieNotificationCount={unreadMovieNotifications}
            watchlistCount={watchlistBadge}
            cancelledCount={cancelledBookingsBadge}
          />
          <main className="flex-1 h-[calc(100vh-4rem)] overflow-auto ml-80">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
              <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                  <Coins className="w-4 h-4 text-white" />
                </div>
                My Cinema Points
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

          {/* Current Division Tiers */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-purple-500" />
                Your Division
              </CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    See All Tiers
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-purple-500" />
                      All Membership Tiers
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-8 mt-6">
                    {/* Bronze Division */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-amber-700 dark:text-amber-400">Bronze Division</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {userTiers.filter(tier => tier.id.startsWith('bronze')).map((tier) => {
                          const isCurrentTier = tier.id === currentTier.id;
                          const isUnlocked = userPoints >= tier.minPoints;
                          
                          return (
                            <div 
                              key={tier.id}
                              className={`relative p-4 rounded-xl border transition-all duration-300 ${
                                isCurrentTier 
                                  ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-lg bg-amber-50 dark:bg-amber-950' 
                                  : isUnlocked
                                    ? 'border-border/50 bg-muted/30'
                                    : 'border-border/30 bg-muted/10 opacity-60'
                              }`}
                            >
                              {isCurrentTier && (
                                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                                  <Crown className="w-3 h-3 text-white" />
                                </div>
                              )}
                              
                              <div className="text-center">
                                <div className="text-2xl mb-2">{tier.icon}</div>
                                <h4 className="font-bold text-sm mb-1">{tier.name}</h4>
                                <p className="text-xs text-muted-foreground mb-2">
                                  {tier.minPoints.toLocaleString()} - {tier.maxPoints.toLocaleString()} pts
                                </p>
                                
                                {isCurrentTier && (
                                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs">
                                    Current
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
                    </div>

                    {/* Silver Division */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-slate-600 dark:text-slate-400">Silver Division</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {userTiers.filter(tier => tier.id.startsWith('silver')).map((tier) => {
                          const isCurrentTier = tier.id === currentTier.id;
                          const isUnlocked = userPoints >= tier.minPoints;
                          
                          return (
                            <div 
                              key={tier.id}
                              className={`relative p-4 rounded-xl border transition-all duration-300 ${
                                isCurrentTier 
                                  ? 'border-slate-500 ring-2 ring-slate-500/20 shadow-lg bg-slate-50 dark:bg-slate-950' 
                                  : isUnlocked
                                    ? 'border-border/50 bg-muted/30'
                                    : 'border-border/30 bg-muted/10 opacity-60'
                              }`}
                            >
                              {isCurrentTier && (
                                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-slate-500 to-gray-500 flex items-center justify-center shadow-lg">
                                  <Crown className="w-3 h-3 text-white" />
                                </div>
                              )}
                              
                              <div className="text-center">
                                <div className="text-2xl mb-2">{tier.icon}</div>
                                <h4 className="font-bold text-sm mb-1">{tier.name}</h4>
                                <p className="text-xs text-muted-foreground mb-2">
                                  {tier.minPoints.toLocaleString()} - {tier.maxPoints.toLocaleString()} pts
                                </p>
                                
                                {isCurrentTier && (
                                  <Badge className="bg-gradient-to-r from-slate-500 to-gray-500 text-white text-xs">
                                    Current
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
                    </div>

                    {/* Gold Division */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-yellow-600 dark:text-yellow-400">Gold Division</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {userTiers.filter(tier => tier.id.startsWith('gold')).map((tier) => {
                          const isCurrentTier = tier.id === currentTier.id;
                          const isUnlocked = userPoints >= tier.minPoints;
                          
                          return (
                            <div 
                              key={tier.id}
                              className={`relative p-4 rounded-xl border transition-all duration-300 ${
                                isCurrentTier 
                                  ? 'border-yellow-500 ring-2 ring-yellow-500/20 shadow-lg bg-yellow-50 dark:bg-yellow-950' 
                                  : isUnlocked
                                    ? 'border-border/50 bg-muted/30'
                                    : 'border-border/30 bg-muted/10 opacity-60'
                              }`}
                            >
                              {isCurrentTier && (
                                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center shadow-lg">
                                  <Crown className="w-3 h-3 text-white" />
                                </div>
                              )}
                              
                              <div className="text-center">
                                <div className="text-2xl mb-2">{tier.icon}</div>
                                <h4 className="font-bold text-sm mb-1">{tier.name}</h4>
                                <p className="text-xs text-muted-foreground mb-2">
                                  {tier.minPoints.toLocaleString()} - {tier.maxPoints.toLocaleString()} pts
                                </p>
                                
                                {isCurrentTier && (
                                  <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs">
                                    Current
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
                    </div>

                    {/* Platinum Division */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-cyan-600 dark:text-cyan-400">Platinum Division</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {userTiers.filter(tier => tier.id.startsWith('platinum')).map((tier) => {
                          const isCurrentTier = tier.id === currentTier.id;
                          const isUnlocked = userPoints >= tier.minPoints;
                          
                          return (
                            <div 
                              key={tier.id}
                              className={`relative p-4 rounded-xl border transition-all duration-300 ${
                                isCurrentTier 
                                  ? 'border-cyan-500 ring-2 ring-cyan-500/20 shadow-lg bg-cyan-50 dark:bg-cyan-950' 
                                  : isUnlocked
                                    ? 'border-border/50 bg-muted/30'
                                    : 'border-border/30 bg-muted/10 opacity-60'
                              }`}
                            >
                              {isCurrentTier && (
                                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg">
                                  <Crown className="w-3 h-3 text-white" />
                                </div>
                              )}
                              
                              <div className="text-center">
                                <div className="text-2xl mb-2">{tier.icon}</div>
                                <h4 className="font-bold text-sm mb-1">{tier.name}</h4>
                                <p className="text-xs text-muted-foreground mb-2">
                                  {tier.minPoints.toLocaleString()} - {tier.maxPoints.toLocaleString()} pts
                                </p>
                                
                                {isCurrentTier && (
                                  <Badge className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-xs">
                                    Current
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
                    </div>

                    {/* Diamond Division */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400">Diamond Division</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {userTiers.filter(tier => tier.id.startsWith('diamond')).map((tier) => {
                          const isCurrentTier = tier.id === currentTier.id;
                          const isUnlocked = userPoints >= tier.minPoints;
                          
                          return (
                            <div 
                              key={tier.id}
                              className={`relative p-4 rounded-xl border transition-all duration-300 ${
                                isCurrentTier 
                                  ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-lg bg-blue-50 dark:bg-blue-950' 
                                  : isUnlocked
                                    ? 'border-border/50 bg-muted/30'
                                    : 'border-border/30 bg-muted/10 opacity-60'
                              }`}
                            >
                              {isCurrentTier && (
                                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
                                  <Crown className="w-3 h-3 text-white" />
                                </div>
                              )}
                              
                              <div className="text-center">
                                <div className="text-2xl mb-2">{tier.icon}</div>
                                <h4 className="font-bold text-sm mb-1">{tier.name}</h4>
                                <p className="text-xs text-muted-foreground mb-2">
                                  {tier.minPoints.toLocaleString()} - {tier.maxPoints.toLocaleString()} pts
                                </p>
                                
                                {isCurrentTier && (
                                  <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs">
                                    Current
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
                    </div>

                    {/* Legendary Ranks */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-600 via-red-600 to-orange-600 bg-clip-text text-transparent">Legendary Ranks</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {userTiers.filter(tier => ['elite', 'champion', 'unreal'].includes(tier.id)).map((tier) => {
                          const isCurrentTier = tier.id === currentTier.id;
                          const isUnlocked = userPoints >= tier.minPoints;
                          
                          return (
                            <div 
                              key={tier.id}
                              className={`relative p-4 rounded-xl border transition-all duration-300 ${
                                isCurrentTier 
                                  ? 'border-purple-500 ring-2 ring-purple-500/20 shadow-lg bg-purple-50 dark:bg-purple-950' 
                                  : isUnlocked
                                    ? 'border-border/50 bg-muted/30'
                                    : 'border-border/30 bg-muted/10 opacity-60'
                              }`}
                            >
                              {isCurrentTier && (
                                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                                  <Crown className="w-3 h-3 text-white" />
                                </div>
                              )}
                              
                              <div className="text-center">
                                <div className="text-3xl mb-2">{tier.icon}</div>
                                <h4 className={`font-bold text-base mb-1 ${tier.color}`}>
                                  {tier.name}
                                </h4>
                                <p className="text-xs text-muted-foreground mb-2">
                                  {tier.minPoints.toLocaleString()}{tier.maxPoints === Infinity ? '+' : ` - ${tier.maxPoints.toLocaleString()}`} pts
                                </p>
                                
                                {isCurrentTier && (
                                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                                    Current
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
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {getCurrentDivisionTiers(userPoints).map((tier) => {
                  const isCurrentTier = tier.id === currentTier.id;
                  const isUnlocked = userPoints >= tier.minPoints;
                  
                  return (
                    <div 
                      key={tier.id}
                      className={`relative p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
                        isCurrentTier 
                          ? 'border-primary ring-2 ring-primary/20 shadow-lg bg-primary/5' 
                          : isUnlocked
                            ? 'border-border/50 bg-muted/30 hover:shadow-md hover:border-border'
                            : 'border-border/30 bg-muted/10 opacity-60'
                      }`}
                    >
                      {isCurrentTier && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                          <Crown className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      <div className="text-center">
                        <div className="text-4xl mb-3">{tier.icon}</div>
                        <h3 className={`font-bold text-lg mb-2 ${isCurrentTier ? 'text-primary' : ''}`}>
                          {tier.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {tier.minPoints.toLocaleString()}{tier.maxPoints === Infinity ? '+' : ` - ${tier.maxPoints.toLocaleString()}`} pts
                        </p>
                        
                        {isCurrentTier && (
                          <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white mb-3">
                            Current Tier
                          </Badge>
                        )}
                        {!isCurrentTier && isUnlocked && (
                          <Badge variant="outline" className="border-green-500 text-green-600 mb-3">
                            Unlocked
                          </Badge>
                        )}
                        {!isUnlocked && (
                          <Badge variant="secondary" className="mb-3">
                            Locked
                          </Badge>
                        )}

                        {/* Show top benefits */}
                        <div className="text-left space-y-1">
                          {tier.benefits.slice(0, 2).map((benefit, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {benefit}
                            </div>
                          ))}
                          {tier.benefits.length > 2 && (
                            <div className="text-xs text-muted-foreground/70 mt-2">
                              +{tier.benefits.length - 2} more benefits
                            </div>
                          )}
                        </div>
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
            <Card className="overflow-hidden border-purple-200 dark:border-purple-800">
              <CardHeader className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
                <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                  <Gift className="w-5 h-5" />
                  Redeem Rewards
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-foreground mb-4">
                  Use your points to get free snacks, tickets, and exclusive experiences
                </p>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center text-sm p-3 rounded-lg bg-muted/50 border border-border/50">
                    <span className="font-medium text-foreground">🍿 Free Popcorn</span>
                    <Badge variant="outline" className="border-purple-300 text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950">500 pts</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm p-3 rounded-lg bg-muted/50 border border-border/50">
                    <span className="font-medium text-foreground">🎫 Movie Ticket</span>
                    <Badge variant="outline" className="border-purple-300 text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950">1,200 pts</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm p-3 rounded-lg bg-muted/50 border border-border/50">
                    <span className="font-medium text-foreground">🥤 Combo Deal</span>
                    <Badge variant="outline" className="border-purple-300 text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950">800 pts</Badge>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  Browse All Rewards
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-blue-200 dark:border-blue-800">
              <CardHeader className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <Star className="w-5 h-5" />
                  Earn More Points
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-foreground mb-4">
                  Book more movies and participate in special promotions to earn bonus points
                </p>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center text-sm p-3 rounded-lg bg-muted/50 border border-border/50">
                    <span className="font-medium text-foreground">Per Booking</span>
                    <Badge variant="outline" className="border-green-300 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-950">+100-200 pts</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm p-3 rounded-lg bg-muted/50 border border-border/50">
                    <span className="font-medium text-foreground">Weekend Bonus</span>
                    <Badge variant="outline" className="border-blue-300 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950">+50 pts</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm p-3 rounded-lg bg-muted/50 border border-border/50">
                    <span className="font-medium text-foreground">Referral Bonus</span>
                    <Badge variant="outline" className="border-orange-300 text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950">+300 pts</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950 dark:text-blue-300 dark:border-blue-700">
                  Book a Movie
                </Button>
              </CardContent>
            </Card>
          </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default MyCinemaPoints;