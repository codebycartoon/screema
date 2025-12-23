import { Movie } from "@/types/cinema";
import { Star, Clock, Calendar, Play, Heart, Check, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/useNotifications";
import { toast } from "@/hooks/use-toast";

interface MovieHeroProps {
  movie: Movie;
  onBookNow: () => void;
  isComingSoon?: boolean;
}

const MovieHero = ({ movie, onBookNow, isComingSoon = false }: MovieHeroProps) => {
  const { addToWatchlist, removeFromWatchlist, watchlistItems } = useNotifications();

  // Check if movie is already in watchlist
  const isInWatchlist = watchlistItems.some(item => item.movieId === movie.id);

  const handleWatchTrailer = () => {
    // In a real app, this would open a trailer modal or navigate to trailer
    alert(`Opening trailer for ${movie.title}`);
  };

  const handleGetNotified = () => {
    // Add to watchlist for coming soon movies
    if (!isInWatchlist) {
      addToWatchlist(movie.id, movie.title, movie.poster);
      toast({
        title: "Notification Set",
        description: `You'll be notified when ${movie.title} tickets are available.`,
      });
    }
  };

  const handleToggleWatchlist = () => {
    if (isInWatchlist) {
      // Find the watchlist item and remove it
      const watchlistItem = watchlistItems.find(item => item.movieId === movie.id);
      if (watchlistItem) {
        removeFromWatchlist(watchlistItem.id);
        toast({
          title: "Removed from Watchlist",
          description: `${movie.title} has been removed from your watchlist.`,
        });
      }
    } else {
      // Add to watchlist
      addToWatchlist(movie.id, movie.title, movie.poster);
      toast({
        title: "Added to Watchlist",
        description: `${movie.title} has been added to your watchlist.`,
      });
    }
  };
  return (
    <div className="relative min-h-[80vh] flex items-end">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pb-16 pt-32">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-end">
          {/* Poster */}
          <div className="hidden lg:block animate-slide-up">
            <div className="relative rounded-xl overflow-hidden shadow-elevated">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
            </div>
          </div>

          {/* Info */}
          <div className="animate-slide-up animation-delay-200">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {movie.genre.map((g) => (
                <span
                  key={g}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary border border-primary/30"
                >
                  {g}
                </span>
              ))}
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mb-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-accent fill-accent" />
                <span className="font-semibold text-foreground">{movie.rating}</span>
                <span>/10</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{movie.duration} min</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(movie.releaseDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              {movie.description}
            </p>

            <div className="flex flex-wrap gap-4">
              {isComingSoon ? (
                // Coming Soon Movie Buttons
                <>
                  <Button variant="cinema" size="xl" onClick={handleGetNotified}>
                    <Bell className="w-5 h-5 mr-2" />
                    Get Notified
                  </Button>
                  <Button variant="glass" size="xl" onClick={handleWatchTrailer}>
                    <Play className="w-5 h-5 mr-2" />
                    Watch Trailer
                  </Button>
                </>
              ) : (
                // Now Showing Movie Buttons
                <>
                  <Button variant="cinema" size="xl" onClick={handleWatchTrailer}>
                    <Play className="w-5 h-5 mr-2" />
                    Watch Trailer
                  </Button>
                  <Button 
                    variant={isInWatchlist ? "default" : "glass"} 
                    size="xl" 
                    onClick={handleToggleWatchlist}
                    className={isInWatchlist ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {isInWatchlist ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Watchlisted
                      </>
                    ) : (
                      <>
                        <Heart className="w-5 h-5 mr-2" />
                        Add to Watchlist
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>

            <div className="mt-8 pt-8 border-t border-border/50">
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Director:</span>
                  <span className="ml-2 text-foreground font-medium">{movie.director}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Cast:</span>
                  <span className="ml-2 text-foreground font-medium">{movie.cast.join(", ")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHero;
