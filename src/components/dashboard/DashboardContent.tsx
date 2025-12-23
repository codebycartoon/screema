import { useState } from "react";
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
  Clock,
  MapPin,
  Play,
  Trash2,
  QrCode,
  ArrowRight
} from "lucide-react";
import { 
  mockNotifications,
  mockMovieNotifications, 
  getUserTier,
  Booking
} from "@/data/dashboard";
import { DashboardTab } from "./DashboardSidebar";
import { useNotifications } from "@/hooks/useNotifications";
import { useNavigate } from "react-router-dom";

interface DashboardContentProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  userPoints: number;
  onViewTicket: (booking: Booking) => void;
}

type ContentView = 'recent' | 'notifications' | 'movie-notifications' | 'watchlist' | 'cancelled' | 'points';

const DashboardContent = ({ activeTab, onTabChange, userPoints, onViewTicket }: DashboardContentProps) => {
  const [currentView, setCurrentView] = useState<ContentView>('recent');
  const [movieNotifications, setMovieNotifications] = useState(mockMovieNotifications);
  const navigate = useNavigate();
  const { 
    markTabAsVisited, 
    removeFromWatchlist, 
    cancelBooking, 
    watchlistItems, 
    bookings 
  } = useNotifications();
  
  const currentTier = getUserTier(userPoints);
  const totalBookings = bookings.length;
  const unreadMovieNotifications = movieNotifications.filter(n => !n.isRead).length;
  const watchlistCount = watchlistItems.length;
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;

  const handleViewTicket = (booking: Booking) => {
    onViewTicket(booking);
  };

  const handleSeeAllClick = (tab: DashboardTab) => {
    markTabAsVisited(tab);
    onTabChange(tab);
  };

  const handleCancelBooking = (bookingId: string) => {
    cancelBooking(bookingId);
  };

  const handleRemoveFromWatchlist = (itemId: string) => {
    removeFromWatchlist(itemId);
  };

  const handleDeleteMovieNotification = (notificationId: string) => {
    setMovieNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleWatchTrailer = (movieTitle: string) => {
    // In a real app, this would open a trailer modal or navigate to trailer
    alert(`Opening trailer for ${movieTitle}`);
  };

  const handleViewMovie = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  const handleBookNow = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  const handleGetNotified = (movieTitle: string) => {
    // In a real app, this would add to notification preferences
    alert(`You'll be notified when ${movieTitle} tickets are available!`);
  };

  const stats = [
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: Ticket,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      view: 'recent' as ContentView
    },
    {
      title: "Movie Notifications",
      value: unreadMovieNotifications,
      icon: Heart,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      view: 'movie-notifications' as ContentView
    },
    {
      title: "Watchlist",
      value: watchlistCount,
      icon: Heart,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      view: 'watchlist' as ContentView
    },
    {
      title: "Cancelled Bookings",
      value: cancelledBookings,
      icon: XCircle,
      color: "text-gray-500",
      bgColor: "bg-gray-500/10",
      view: 'cancelled' as ContentView
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

  const renderRecentBookings = () => {
    const recentBookings = bookings
      .sort((a, b) => b.bookingDate.getTime() - a.bookingDate.getTime())
      .slice(0, 6);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recent Bookings</h2>
          <Button 
            variant="outline" 
            onClick={() => handleSeeAllClick('bookings')}
            className="flex items-center gap-2"
          >
            See All
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-4">
          {recentBookings.map((booking) => (
            <Card 
              key={booking.id} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => handleSeeAllClick('bookings')}
            >
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {/* Movie Poster - Bigger */}
                  <div className="relative w-28 h-40 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={booking.moviePoster}
                      alt={booking.movieTitle}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1 left-1">
                      <Badge className={`${getStatusColor(booking.status)} text-xs`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-bold mb-1">{booking.movieTitle}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {booking.theaterName} • {booking.screenName}
                        </p>
                        
                        {/* Snacks Information */}
                        {booking.snacks && booking.snacks.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Snacks Ordered:</p>
                            <div className="flex flex-wrap gap-1">
                              {booking.snacks.map((snack, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {snack.quantity}x {snack.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-right ml-4">
                        <p className="text-xl font-bold text-primary">KES {booking.totalAmount}</p>
                        <p className="text-xs text-muted-foreground mb-3">
                          Booked {booking.bookingDate.toLocaleDateString()}
                        </p>
                        
                        {/* Buttons aligned to right */}
                        <div className="flex flex-col gap-2">
                          <Button 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewTicket(booking);
                            }}
                          >
                            <QrCode className="w-4 h-4 mr-2" />
                            View Ticket
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{booking.showtime.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{booking.showtime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Ticket className="w-4 h-4 text-muted-foreground" />
                        <span>Seats: {booking.seats.join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>Screen {booking.screenName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderNotifications = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Notifications</h2>
          <Button 
            variant="outline" 
            onClick={() => handleSeeAllClick('notifications')}
            className="flex items-center gap-2"
          >
            See All
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-4">
          {mockNotifications.slice(0, 4).map((notification) => (
            <Card key={notification.id} className={`hover:shadow-lg transition-all duration-300 ${
              !notification.isRead ? 'ring-2 ring-primary/20 bg-primary/5' : ''
            }`}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bell className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{notification.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {!notification.isRead && (
                            <Badge variant="default" className="text-xs">New</Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {notification.type.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-3">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {notification.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderMovieNotifications = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Movie Notifications</h2>
          <Button 
            variant="outline" 
            onClick={() => handleSeeAllClick('movie-notifications')}
            className="flex items-center gap-2"
          >
            See All
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-4">
          {movieNotifications.slice(0, 4).map((notification) => (
            <Card 
              key={notification.id} 
              className={`hover:shadow-lg transition-all duration-300 cursor-pointer ${
                !notification.isRead ? 'ring-2 ring-primary/20 bg-primary/5' : ''
              }`}
              onClick={() => handleSeeAllClick('movie-notifications')}
            >
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {/* Movie Poster - Bigger */}
                  <div className="relative w-24 h-36 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={notification.moviePoster}
                      alt={notification.movieTitle}
                      className="w-full h-full object-cover"
                    />
                    {!notification.isRead && (
                      <div className="absolute top-1 left-1">
                        <Badge variant="default" className="text-xs">New</Badge>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-bold mb-1">{notification.movieTitle}</h3>
                        <Badge variant="outline" className="text-xs">
                          {notification.type.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMovieNotification(notification.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{notification.message}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {notification.createdAt.toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        {notification.type === 'trailer' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleWatchTrailer(notification.movieTitle);
                            }}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Watch
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewMovie(notification.movieId);
                          }}
                        >
                          View Movie
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderWatchlist = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Watchlist</h2>
          <Button 
            variant="outline" 
            onClick={() => handleSeeAllClick('watchlist')}
            className="flex items-center gap-2"
          >
            See All
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-4">
          {watchlistItems.slice(0, 4).map((item) => (
            <Card 
              key={item.id} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => handleSeeAllClick('watchlist')}
            >
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {/* Movie Poster - Same size as others with better badge positioning */}
                  <div className="relative w-24 h-36 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={item.moviePoster}
                      alt={item.movieTitle}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className={item.status === 'now_showing' ? 
                        'bg-green-500/10 text-green-600 border-green-500/20 text-xs' : 
                        'bg-blue-500/10 text-blue-600 border-blue-500/20 text-xs'
                      }>
                        {item.status === 'now_showing' ? 'Now Showing' : 'Coming Soon'}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-bold mb-1">{item.movieTitle}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <span>Genres:</span>
                          <div className="flex gap-1">
                            {item.genre.slice(0, 3).map((genre, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Release: {item.releaseDate.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-4">
                        {item.rating && item.status === 'now_showing' && (
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-semibold">{item.rating}</span>
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground mb-3">
                          Added {item.addedAt.toLocaleDateString()}
                        </p>
                        
                        {/* Buttons aligned to right */}
                        <div className="flex flex-col gap-2">
                          <Button 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (item.status === 'now_showing') {
                                handleBookNow(item.movieId);
                              } else {
                                handleGetNotified(item.movieTitle);
                              }
                            }}
                          >
                            {item.status === 'now_showing' ? 'Book Now' : 'Get Notified'}
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFromWatchlist(item.id);
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderCancelledBookings = () => {
    const cancelled = bookings.filter(b => b.status === 'cancelled');
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Cancelled Bookings</h2>
          <Button 
            variant="outline" 
            onClick={() => handleSeeAllClick('cancelled')}
            className="flex items-center gap-2"
          >
            See All
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-4">
          {cancelled.slice(0, 4).map((booking) => (
            <Card 
              key={booking.id} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => handleSeeAllClick('cancelled')}
            >
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {/* Movie Poster - Bigger */}
                  <div className="relative w-28 h-40 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={booking.moviePoster}
                      alt={booking.movieTitle}
                      className="w-full h-full object-cover opacity-75"
                    />
                    <div className="absolute top-1 left-1">
                      <Badge className="bg-red-500/10 text-red-600 border-red-500/20 text-xs">
                        Cancelled
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-bold mb-1 text-muted-foreground">
                          {booking.movieTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {booking.theaterName}
                        </p>
                        
                        {/* Snacks Information */}
                        {booking.snacks && booking.snacks.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Snacks Ordered:</p>
                            <div className="flex flex-wrap gap-1">
                              {booking.snacks.map((snack, index) => (
                                <Badge key={index} variant="outline" className="text-xs opacity-75">
                                  {snack.quantity}x {snack.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-right ml-4">
                        <p className="text-xl font-bold text-muted-foreground line-through">
                          KES {booking.totalAmount}
                        </p>
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20 mt-1 text-xs mb-3">
                          Refunded
                        </Badge>
                        
                        {/* Buttons aligned to right */}
                        <div className="flex flex-col gap-2">
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewTicket(booking);
                            }}
                          >
                            <QrCode className="w-4 h-4 mr-2" />
                            View Ticket
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{booking.showtime.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{booking.showtime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderFullBookings = () => {
    const currentBookings = bookings.filter(b => b.status === 'confirmed');
    const pastBookings = bookings.filter(b => b.status === 'completed');
    
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">My Bookings</h2>
        </div>
        
        {/* Current Bookings */}
        {currentBookings.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Current Bookings</h3>
            {currentBookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Movie Poster - Bigger */}
                    <div className="relative w-28 h-40 flex-shrink-0 rounded-lg overflow-hidden">
                      <img
                        src={booking.moviePoster}
                        alt={booking.movieTitle}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-1 left-1">
                        <Badge className={`${getStatusColor(booking.status)} text-xs`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-display text-lg font-bold mb-1">{booking.movieTitle}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {booking.theaterName} • {booking.screenName}
                          </p>
                          
                          {/* Snacks Information */}
                          {booking.snacks && booking.snacks.length > 0 && (
                            <div className="mb-3">
                              <p className="text-sm font-medium text-muted-foreground mb-1">Snacks Ordered:</p>
                              <div className="flex flex-wrap gap-1">
                                {booking.snacks.map((snack, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {snack.quantity}x {snack.name}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="text-right ml-4">
                          <p className="text-xl font-bold text-primary">KES {booking.totalAmount}</p>
                          <p className="text-xs text-muted-foreground mb-3">
                            Booked {booking.bookingDate.toLocaleDateString()}
                          </p>
                          
                          {/* Buttons aligned to right */}
                          <div className="flex flex-col gap-2">
                            <Button 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewTicket(booking);
                              }}
                            >
                              <QrCode className="w-4 h-4 mr-2" />
                              View Ticket
                            </Button>
                            <Button variant="destructive" size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCancelBooking(booking.id);
                              }}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{booking.showtime.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{booking.showtime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Ticket className="w-4 h-4 text-muted-foreground" />
                          <span>Seats: {booking.seats.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>Screen {booking.screenName}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Past Bookings */}
        {pastBookings.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Past Bookings</h3>
            {pastBookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Movie Poster - Bigger */}
                    <div className="relative w-28 h-40 flex-shrink-0 rounded-lg overflow-hidden">
                      <img
                        src={booking.moviePoster}
                        alt={booking.movieTitle}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-1 left-1">
                        <Badge className={`${getStatusColor(booking.status)} text-xs`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-display text-lg font-bold mb-1">{booking.movieTitle}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {booking.theaterName} • {booking.screenName}
                          </p>
                          
                          {/* Snacks Information */}
                          {booking.snacks && booking.snacks.length > 0 && (
                            <div className="mb-3">
                              <p className="text-sm font-medium text-muted-foreground mb-1">Snacks Ordered:</p>
                              <div className="flex flex-wrap gap-1">
                                {booking.snacks.map((snack, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {snack.quantity}x {snack.name}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="text-right ml-4">
                          <p className="text-xl font-bold text-primary">KES {booking.totalAmount}</p>
                          <p className="text-xs text-muted-foreground mb-3">
                            Booked {booking.bookingDate.toLocaleDateString()}
                          </p>
                          
                          {/* Buttons aligned to right */}
                          <div className="flex justify-end">
                            <Button 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewTicket(booking);
                              }}
                            >
                              <QrCode className="w-4 h-4 mr-2" />
                              View Ticket
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{booking.showtime.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{booking.showtime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Ticket className="w-4 h-4 text-muted-foreground" />
                          <span>Seats: {booking.seats.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>Screen {booking.screenName}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderFullNotifications = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">All Notifications</h2>
        </div>
        <div className="space-y-4">
          {mockNotifications.map((notification) => (
            <Card key={notification.id} className={`hover:shadow-lg transition-all duration-300 ${
              !notification.isRead ? 'ring-2 ring-primary/20 bg-primary/5' : ''
            }`}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bell className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{notification.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {!notification.isRead && (
                            <Badge variant="default" className="text-xs">New</Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {notification.type.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-3">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {notification.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderFullMovieNotifications = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">All Movie Notifications</h2>
        </div>
        <div className="space-y-4">
          {movieNotifications.map((notification) => (
            <Card key={notification.id} className={`hover:shadow-lg transition-all duration-300 ${
              !notification.isRead ? 'ring-2 ring-primary/20 bg-primary/5' : ''
            }`}>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {/* Movie Poster - Bigger */}
                  <div className="relative w-24 h-36 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={notification.moviePoster}
                      alt={notification.movieTitle}
                      className="w-full h-full object-cover"
                    />
                    {!notification.isRead && (
                      <div className="absolute top-1 left-1">
                        <Badge variant="default" className="text-xs">New</Badge>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display text-lg font-bold mb-1">{notification.movieTitle}</h3>
                        <Badge variant="outline" className="text-xs">
                          {notification.type.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMovieNotification(notification.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{notification.message}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {notification.createdAt.toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        {notification.type === 'trailer' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleWatchTrailer(notification.movieTitle);
                            }}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Watch
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewMovie(notification.movieId);
                          }}
                        >
                          View Movie
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderFullWatchlist = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">My Watchlist</h2>
        </div>
        <div className="space-y-4">
          {watchlistItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {/* Movie Poster - Bigger with better badge positioning */}
                  <div className="relative w-24 h-36 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={item.moviePoster}
                      alt={item.movieTitle}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className={item.status === 'now_showing' ? 
                        'bg-green-500/10 text-green-600 border-green-500/20 text-xs' : 
                        'bg-blue-500/10 text-blue-600 border-blue-500/20 text-xs'
                      }>
                        {item.status === 'now_showing' ? 'Now Showing' : 'Coming Soon'}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-display text-lg font-bold mb-1">{item.movieTitle}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Genres:</span>
                          <div className="flex gap-1">
                            {item.genre.slice(0, 3).map((genre, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {item.rating && (
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-semibold">{item.rating}</span>
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground">
                          Added {item.addedAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Release: {item.releaseDate.toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.status === 'now_showing') {
                            handleBookNow(item.movieId);
                          } else {
                            handleGetNotified(item.movieTitle);
                          }
                        }}
                      >
                        {item.status === 'now_showing' ? 'Book Now' : 'Get Notified'}
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFromWatchlist(item.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderFullCancelledBookings = () => {
    const cancelled = bookings.filter(b => b.status === 'cancelled');
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">All Cancelled Bookings</h2>
        </div>
        <div className="space-y-4">
          {cancelled.map((booking) => (
            <Card key={booking.id} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {/* Movie Poster - Bigger */}
                  <div className="relative w-28 h-40 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={booking.moviePoster}
                      alt={booking.movieTitle}
                      className="w-full h-full object-cover opacity-75"
                    />
                    <div className="absolute top-1 left-1">
                      <Badge className="bg-red-500/10 text-red-600 border-red-500/20 text-xs">
                        Cancelled
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-bold mb-1 text-muted-foreground">
                          {booking.movieTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {booking.theaterName}
                        </p>
                        
                        {/* Snacks Information */}
                        {booking.snacks && booking.snacks.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Snacks Ordered:</p>
                            <div className="flex flex-wrap gap-1">
                              {booking.snacks.map((snack, index) => (
                                <Badge key={index} variant="outline" className="text-xs opacity-75">
                                  {snack.quantity}x {snack.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-right ml-4">
                        <p className="text-xl font-bold text-muted-foreground line-through">
                          KES {booking.totalAmount}
                        </p>
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20 mt-1 text-xs mb-3">
                          Refunded
                        </Badge>
                        
                        {/* Buttons aligned to right */}
                        <div className="flex justify-end">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewTicket(booking);
                            }}
                          >
                            <QrCode className="w-4 h-4 mr-2" />
                            View Ticket
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{booking.showtime.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{booking.showtime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderFullPoints = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Cinema Points</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Your Points Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary mb-4">
              {userPoints.toLocaleString()} Points
            </div>
            <div className={`${currentTier.bgColor} rounded-lg p-4 border border-border/50`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{currentTier.icon}</span>
                <Badge className={`${currentTier.color} bg-transparent border-current`}>
                  {currentTier.name} Member
                </Badge>
              </div>
              <div className="space-y-1">
                {currentTier.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-current rounded-full" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderPoints = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Cinema Points</h2>
          <Button 
            variant="outline" 
            onClick={() => handleSeeAllClick('points')}
            className="flex items-center gap-2"
          >
            See All
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Your Points Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary mb-4">
              {userPoints.toLocaleString()} Points
            </div>
            <div className={`${currentTier.bgColor} rounded-lg p-4 border border-border/50`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{currentTier.icon}</span>
                <Badge className={`${currentTier.color} bg-transparent border-current`}>
                  {currentTier.name} Member
                </Badge>
              </div>
              <div className="space-y-1">
                {currentTier.benefits.slice(0, 3).map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-current rounded-full" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderContent = () => {
    // If activeTab is from sidebar navigation, show full content for that tab
    if (activeTab !== 'overview') {
      switch (activeTab) {
        case 'bookings':
          return renderFullBookings();
        case 'notifications':
          return renderFullNotifications();
        case 'movie-notifications':
          return renderFullMovieNotifications();
        case 'watchlist':
          return renderFullWatchlist();
        case 'cancelled':
          return renderFullCancelledBookings();
        case 'points':
          return renderFullPoints();
        default:
          return renderRecentBookings();
      }
    }
    
    // Otherwise show the current view based on stats card clicks (overview mode)
    switch (currentView) {
      case 'notifications':
        return renderNotifications();
      case 'movie-notifications':
        return renderMovieNotifications();
      case 'watchlist':
        return renderWatchlist();
      case 'cancelled':
        return renderCancelledBookings();
      case 'points':
        return renderPoints();
      default:
        return renderRecentBookings();
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Only show welcome section and stats for overview */}
      {activeTab === 'overview' && (
        <>
          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Welcome back!</h1>
              <p className="text-muted-foreground mt-1">
                Here's your cinema activity overview
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
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
                  onClick={() => setCurrentView(stat.view)}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Click to view details
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {/* Content Area */}
      <div>
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardContent;