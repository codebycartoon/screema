import { useState } from "react";
import { Heart, Calendar, Star, Trash2, Eye, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { Navigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import DashboardSidebar, { DashboardTab } from "@/components/dashboard/DashboardSidebar";
import { cn } from "@/lib/utils";

// Mock watchlist data with more movie-like structure
const mockWatchlist = [
  {
    id: 1,
    title: "Dune: Part Two",
    poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    releaseDate: "2024-03-01",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    rating: 8.2,
    duration: 166,
    status: "coming-soon"
  },
  {
    id: 2,
    title: "The Batman",
    poster: "https://image.tmdb.org/t/p/w500/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
    releaseDate: "2024-01-15",
    genre: ["Action", "Crime", "Drama"],
    rating: 7.8,
    duration: 176,
    status: "now-showing"
  },
  {
    id: 3,
    title: "Spider-Man: Across the Spider-Verse",
    poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    releaseDate: "2024-02-20",
    genre: ["Animation", "Action", "Adventure"],
    rating: 8.7,
    duration: 140,
    status: "now-showing"
  },
  {
    id: 4,
    title: "Oppenheimer",
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    releaseDate: "2024-01-10",
    genre: ["Biography", "Drama", "History"],
    rating: 8.4,
    duration: 180,
    status: "now-showing"
  },
  {
    id: 5,
    title: "Guardians of the Galaxy Vol. 3",
    poster: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
    releaseDate: "2024-04-15",
    genre: ["Action", "Adventure", "Comedy"],
    rating: 8.0,
    duration: 150,
    status: "coming-soon"
  },
  {
    id: 6,
    title: "John Wick: Chapter 4",
    poster: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    releaseDate: "2024-03-24",
    genre: ["Action", "Crime", "Thriller"],
    rating: 7.9,
    duration: 169,
    status: "coming-soon"
  }
];

interface WatchlistCardProps {
  movie: typeof mockWatchlist[0];
  onRemove: (id: number) => void;
}

const WatchlistCard = ({ movie, onRemove }: WatchlistCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'now-showing':
        return <Badge className="bg-green-500/90 text-white border-green-500 text-xs font-medium">Now Showing</Badge>;
      case 'coming-soon':
        return <Badge className="bg-blue-500/90 text-white border-blue-500 text-xs font-medium">Coming Soon</Badge>;
      default:
        return null;
    }
  };

  return (
    <div 
      className="relative bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Poster - Full Card */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            isHovered && "scale-110"
          )}
          loading="lazy"
        />
        
        {/* Status Badge - Top Right */}
        <div className="absolute top-3 right-3">
          {getStatusBadge(movie.status)}
        </div>

        {/* Remove from Watchlist Button */}
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-3 left-3 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          onClick={() => onRemove(movie.id)}
          style={{ display: isHovered ? 'flex' : 'none' }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>

        {/* Hover Overlay with Details - Only visible when this specific card is hovered */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent transition-all duration-300 flex flex-col justify-end p-4",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <div className="text-white space-y-3">
            {/* Movie Name */}
            <h3 className="font-display text-xl font-bold line-clamp-2">
              {movie.title}
            </h3>
            
            {/* Rating and Genre */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span className="font-medium">{movie.rating}</span>
              </div>
              <div className="text-sm text-white/90">
                {movie.genre.slice(0, 3).join(", ")}
              </div>
            </div>

            {/* Duration or Release Date */}
            <div className="flex items-center gap-1 text-sm text-white/90">
              {movie.status === 'now-showing' ? (
                <>
                  <Clock className="w-4 h-4" />
                  <span>{movie.duration}m</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(movie.releaseDate).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </>
              )}
            </div>

            {/* Action Button */}
            <Link to={`/movie/${movie.id}`} className="block">
              <Button variant="cinema" className="w-full">
                {movie.status === 'now-showing' ? (
                  'Book Ticket'
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Watchlist = () => {
  const { user, loading } = useAuth();
  const { 
    unreadNotifications, 
    unreadMovieNotifications,
    watchlistBadge,
    cancelledBookingsBadge,
    watchlistItems,
    bookings
  } = useNotifications();
  const [watchlist, setWatchlist] = useState(mockWatchlist);

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

  const removeFromWatchlist = (id: number) => {
    setWatchlist(prev => prev.filter(movie => movie.id !== id));
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex">
          <DashboardSidebar
            activeTab={'watchlist' as DashboardTab}
            onTabChange={() => {}}
            userPoints={userPoints}
            notificationCount={unreadNotifications}
            movieNotificationCount={unreadMovieNotifications}
            watchlistCount={watchlistBadge}
            cancelledCount={cancelledBookingsBadge}
          />
          <main className="flex-1 h-[calc(100vh-4rem)] overflow-auto ml-80">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-white fill-white" />
                  </div>
                  My Watchlist
                </h1>
                <p className="text-muted-foreground mt-2">
                  Movies you want to watch • {watchlist.length} items
                </p>
              </div>

              {watchlist.length === 0 ? (
                <Card className="text-center py-16">
                  <CardContent>
                    <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
                      <Heart className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">Your watchlist is empty</h3>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                      Start adding movies you want to watch to keep track of them and get notified when they're available
                    </p>
                    <Link to="/movies">
                      <Button size="lg" className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700">
                        Browse Movies
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {watchlist.map((movie) => (
                    <WatchlistCard 
                      key={movie.id} 
                      movie={movie} 
                      onRemove={removeFromWatchlist}
                    />
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Watchlist;