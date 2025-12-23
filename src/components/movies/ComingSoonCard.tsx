import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ComingSoonMovie } from "@/data/movies";
import { cn } from "@/lib/utils";

interface ComingSoonCardProps {
  movie: ComingSoonMovie;
  className?: string;
}

const ComingSoonCard = ({ movie, className }: ComingSoonCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "relative bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1",
        className
      )}
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
        
        {/* Coming Soon Badge - Top Right */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-blue-500/90 text-white border-blue-500 text-xs font-medium">
            Coming Soon
          </Badge>
        </div>

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
            
            {/* Release Date */}
            <div className="flex items-center gap-1 text-sm text-white/90">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(movie.releaseDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>

            {/* Genre */}
            <div className="text-sm text-white/90">
              {movie.genre.slice(0, 3).join(" • ")}
            </div>

            {/* View Details Button */}
            <Link to={`/movie/${movie.id}`} className="block">
              <Button variant="cinema" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonCard;