import { movies } from "@/data/movies";
import { Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredMovies = movies.slice(0, 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  const movie = featuredMovies[currentIndex];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Images */}
      {featuredMovies.map((m, index) => (
        <div
          key={m.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={m.backdrop}
            alt={m.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />

      {/* Content */}
      <div className="relative container mx-auto px-4 pt-24">
        <div className="max-w-2xl">
          <div className="animate-fade-in">
            <p className="text-primary font-medium mb-4 tracking-wider uppercase text-sm">
              Now Showing
            </p>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {movie.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent/20 border border-accent/30">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span className="font-semibold text-accent">{movie.rating}</span>
              </div>
              <span className="text-muted-foreground">{movie.duration} min</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{movie.genre.join(", ")}</span>
            </div>

            <p className="text-lg text-muted-foreground mb-8 line-clamp-3">
              {movie.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to={`/movie/${movie.id}`}>
                <Button variant="cinema" size="xl">
                  Book Tickets
                </Button>
              </Link>
              <Button variant="glass" size="xl">
                <Play className="w-5 h-5 mr-2" />
                Watch Trailer
              </Button>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex gap-2 mt-12">
            {featuredMovies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-12 bg-primary' 
                    : 'w-6 bg-muted hover:bg-muted-foreground'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Side Poster Preview */}
      <div className="hidden lg:block absolute right-12 bottom-24 w-72">
        <div className="relative">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full rounded-xl shadow-elevated transform rotate-3 hover:rotate-0 transition-transform duration-500"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
          <div className="absolute -inset-4 bg-primary/20 blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
