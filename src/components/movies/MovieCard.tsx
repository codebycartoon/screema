import { Movie } from "@/types/cinema";
import { Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

const MovieCard = ({ movie, index = 0 }: MovieCardProps) => {
  return (
    <Link 
      to={`/movie/${movie.id}`}
      className="group block animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden rounded-xl bg-card shadow-card transition-all duration-500 hover:shadow-elevated hover:scale-[1.02]">
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Rating Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm">
            <Star className="w-3.5 h-3.5 text-accent fill-accent" />
            <span className="text-xs font-semibold">{movie.rating}</span>
          </div>

          {/* Quick Book Button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button variant="cinema" className="w-full">
              Book Now
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-display text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{movie.duration} min</span>
            </div>
            <span>•</span>
            <span className="line-clamp-1">{movie.genre.slice(0, 2).join(", ")}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
