import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface ComingSoonMovie {
  id: string;
  title: string;
  poster: string;
  genre: string[];
  releaseDate: string;
}

const comingSoonMovies: ComingSoonMovie[] = [
  {
    id: "cs1",
    title: "Deadpool & Wolverine",
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
    genre: ["Action", "Comedy", "Superhero"],
    releaseDate: "2024-07-26"
  },
  {
    id: "cs2",
    title: "Gladiator II",
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    genre: ["Action", "Drama", "Historical"],
    releaseDate: "2024-11-22"
  },
  {
    id: "cs3",
    title: "Wicked",
    poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=600&fit=crop",
    genre: ["Fantasy", "Musical", "Adventure"],
    releaseDate: "2024-11-27"
  },
  {
    id: "cs4",
    title: "Dune: Part Three",
    poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    releaseDate: "2026-12-18"
  }
];

const ComingSoonSection = () => {
  const handleNotifyMe = (movieTitle: string) => {
    toast({
      title: "Notification Set! 🔔",
      description: `We'll notify you when "${movieTitle}" is available for booking.`,
    });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-card/50 to-background">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Coming <span className="text-gradient">Soon</span>
          </h2>
          <p className="text-muted-foreground">
            Get notified when these movies are available for booking
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {comingSoonMovies.map((movie, index) => (
            <div
              key={movie.id}
              className="group relative"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Movie Card */}
              <div className="relative overflow-hidden rounded-xl bg-card border border-border/50 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
                {/* Poster */}
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Coming Soon Badge */}
                  <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    Coming Soon
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {movie.title}
                  </h3>

                  {/* Genre Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {movie.genre.slice(0, 2).map((g) => (
                      <span
                        key={g}
                        className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                      >
                        {g}
                      </span>
                    ))}
                  </div>

                  {/* Release Date */}
                  <p className="text-sm text-muted-foreground mb-3">
                    {new Date(movie.releaseDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>

                  {/* Notify Me Button */}
                  <Button
                    onClick={() => handleNotifyMe(movie.title)}
                    variant="outline"
                    size="sm"
                    className="w-full group/btn"
                  >
                    <Bell className="w-4 h-4 mr-2 group-hover/btn:animate-pulse" />
                    Notify Me
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComingSoonSection;
