import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Ticket, 
  Bell, 
  Heart, 
  XCircle, 
  Star, 
  Calendar,
  TrendingUp,
  Clock
} from "lucide-react";
import { mockBookings, mockNotifications, mockWatchlist, getUserTier } from "@/data/dashboard";
import { DashboardTab } from "./DashboardSidebar";

interface DashboardOverviewProps {
  userPoints: number;
  onTabChange: (tab: DashboardTab) => void;
}

const DashboardOverview = ({ userPoints, onTabChange }: DashboardOverviewProps) => {
  const currentTier = getUserTier(userPoints);
  const totalBookings = mockBookings.length;
  const activeBookings = mockBookings.filter(b => b.status === 'confirmed').length;
  const completedBookings = mockBookings.filter(b => b.status === 'completed').length;
  const cancelledBookings = mockBookings.filter(b => b.status === 'cancelled').length;
  const unreadNotifications = mockNotifications.filter(n => !n.isRead).length;
  const watchlistCount = mockWatchlist.length;

  const recentBookings = mockBookings
    .sort((a, b) => b.bookingDate.getTime() - a.bookingDate.getTime())
    .slice(0, 3);

  const stats = [
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: Ticket,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      clickable: true,
      tab: 'bookings' as DashboardTab
    },
    {
      title: "Movie Notifications",
      value: unreadNotifications,
      icon: Bell,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      clickable: true,
      tab: 'notifications' as DashboardTab
    },
    {
      title: "Watchlist",
      value: watchlistCount,
      icon: Heart,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      clickable: true,
      tab: 'watchlist' as DashboardTab
    },
    {
      title: "Cancelled Bookings",
      value: cancelledBookings,
      icon: XCircle,
      color: "text-gray-500",
      bgColor: "bg-gray-500/10",
      clickable: true,
      tab: 'cancelled' as DashboardTab
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'completed': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your cinema experience
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{currentTier.icon}</span>
          <Badge className={`${currentTier.color} bg-transparent border-current`}>
            {currentTier.name} Member
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={stat.title}
              className={`hover:shadow-lg transition-all duration-300 ${
                stat.clickable ? 'cursor-pointer hover:scale-105' : ''
              }`}
              onClick={() => stat.clickable && onTabChange(stat.tab)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                {stat.clickable && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Click to view details
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cinema Points */}
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300" onClick={() => onTabChange('points')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Cinema Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">
              {userPoints.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">
              Click to view points history and rewards
            </p>
          </CardContent>
        </Card>

        {/* Active Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Active Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">
              {activeBookings}
            </div>
            <p className="text-sm text-muted-foreground">
              Upcoming movie experiences
            </p>
          </CardContent>
        </Card>

        {/* This Month */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">
              {completedBookings}
            </div>
            <p className="text-sm text-muted-foreground">
              Movies watched
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Bookings</CardTitle>
          <Button variant="outline" size="sm" onClick={() => onTabChange('bookings')}>
            View All
          </Button>
        </CardHeader>
        <CardContent>
          {recentBookings.length === 0 ? (
            <div className="text-center py-8">
              <Ticket className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No bookings yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Book your first movie to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                  <img
                    src={booking.moviePoster}
                    alt={booking.movieTitle}
                    className="w-16 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{booking.movieTitle}</h4>
                    <p className="text-sm text-muted-foreground">
                      {booking.theaterName} • {booking.screenName}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {booking.showtime.toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {booking.showtime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                    <p className="text-sm font-semibold mt-2">
                      KES {booking.totalAmount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;