import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Calendar, 
  Play, 
  Ticket,
  Trash2,
  Clock,
  CheckCircle2,
  Filter,
  Search,
  MoreHorizontal
} from "lucide-react";
import { mockNotifications, mockMovieNotifications } from "@/data/dashboard";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { Navigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import DashboardSidebar, { DashboardTab } from "@/components/dashboard/DashboardSidebar";

const Notifications = () => {
  const { user, loading } = useAuth();
  const { 
    unreadNotifications, 
    unreadMovieNotifications,
    watchlistBadge,
    cancelledBookingsBadge,
    watchlistItems,
    bookings
  } = useNotifications();
  const [movieNotifications, setMovieNotifications] = useState(mockMovieNotifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const navigate = useNavigate();

  // Mock user points - in real app, this would come from user data
  const userPoints = 3250;
  
  // Calculate counts from context
  const watchlistCount = watchlistItems.length;
  const cancelledCount = bookings.filter(b => b.status === 'cancelled').length;

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

  const deleteMovieNotification = (id: string) => {
    setMovieNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAsRead = (id: string) => {
    setMovieNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setMovieNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const handleWatchTrailer = (movieTitle: string) => {
    alert(`Opening trailer for ${movieTitle}`);
  };

  const handleViewMovie = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  const handleBookNow = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'release': return Calendar;
      case 'trailer': return Play;
      case 'tickets_available': return Ticket;
      default: return Bell;
    }
  };

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case 'release': 
        return {
          iconBg: 'bg-blue-50 dark:bg-blue-950',
          iconColor: 'text-blue-600 dark:text-blue-400',
          borderColor: 'border-l-blue-500'
        };
      case 'trailer': 
        return {
          iconBg: 'bg-purple-50 dark:bg-purple-950',
          iconColor: 'text-purple-600 dark:text-purple-400',
          borderColor: 'border-l-purple-500'
        };
      case 'tickets_available': 
        return {
          iconBg: 'bg-green-50 dark:bg-green-950',
          iconColor: 'text-green-600 dark:text-green-400',
          borderColor: 'border-l-green-500'
        };
      default: 
        return {
          iconBg: 'bg-gray-50 dark:bg-gray-950',
          iconColor: 'text-gray-600 dark:text-gray-400',
          borderColor: 'border-l-gray-500'
        };
    }
  };

  const filteredNotifications = movieNotifications.filter(notification => {
    const matchesSearch = notification.movieTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || 
                         (filterType === "unread" && !notification.isRead) ||
                         (filterType === "read" && notification.isRead) ||
                         notification.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const unreadCount = movieNotifications.filter(n => !n.isRead).length;

  return (
    <>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex">
          <DashboardSidebar
            activeTab={'notifications' as DashboardTab}
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
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-white" />
                </div>
                Notifications
              </h1>
              <p className="text-muted-foreground mt-1">
                Stay updated with your favorite movies and releases
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                  {unreadCount} unread
                </Badge>
              )}
              {unreadCount > 0 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={markAllAsRead}
                  className="whitespace-nowrap"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Mark all read
                </Button>
              )}
            </div>
          </div>

          {/* Search and Filter Bar */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filterType === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={filterType === "unread" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType("unread")}
                  >
                    Unread
                  </Button>
                  <Button
                    variant={filterType === "tickets_available" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType("tickets_available")}
                  >
                    Tickets
                  </Button>
                  <Button
                    variant={filterType === "trailer" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType("trailer")}
                  >
                    Trailers
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {searchQuery || filterType !== "all" ? "No matching notifications" : "No notifications yet"}
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {searchQuery || filterType !== "all" 
                    ? "Try adjusting your search or filter criteria."
                    : "You're all caught up! New notifications will appear here when available."
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                const styles = getNotificationStyle(notification.type);
                
                return (
                  <Card 
                    key={notification.id} 
                    className={`transition-all duration-200 hover:shadow-md ${
                      !notification.isRead 
                        ? `${styles.borderColor} border-l-4 bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-950/50` 
                        : 'hover:bg-muted/30'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Movie Poster */}
                        <div className="relative shrink-0">
                          <img
                            src={notification.moviePoster}
                            alt={notification.movieTitle}
                            className="w-16 h-24 rounded-lg object-cover shadow-sm"
                          />
                          <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full ${styles.iconBg} border-2 border-background flex items-center justify-center`}>
                            <Icon className={`w-3 h-3 ${styles.iconColor}`} />
                          </div>
                          {!notification.isRead && (
                            <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-background"></div>
                          )}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-base mb-1 line-clamp-1">
                                {notification.movieTitle}
                              </h3>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge 
                                  variant="secondary" 
                                  className="text-xs capitalize"
                                >
                                  {notification.type.replace('_', ' ')}
                                </Badge>
                                {!notification.isRead && (
                                  <Badge className="text-xs bg-blue-500 hover:bg-blue-600">
                                    New
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteMovieNotification(notification.id)}
                              className="text-muted-foreground hover:text-destructive shrink-0 ml-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {notification.message}
                          </p>

                          {/* Metadata */}
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>Release: {notification.releaseDate.toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{notification.createdAt.toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                              {!notification.isRead && (
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-xs h-7"
                                >
                                  Mark read
                                </Button>
                              )}
                              {notification.type === 'tickets_available' && (
                                <Button 
                                  size="sm"
                                  onClick={() => handleBookNow(notification.movieId)}
                                  className="h-7 text-xs"
                                >
                                  Book Now
                                </Button>
                              )}
                              {notification.type === 'trailer' && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleWatchTrailer(notification.movieTitle)}
                                  className="h-7 text-xs"
                                >
                                  <Play className="w-3 h-3 mr-1" />
                                  Trailer
                                </Button>
                              )}
                            </div>
                            
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewMovie(notification.movieId)}
                              className="text-xs h-7"
                            >
                              View Movie
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Notifications;