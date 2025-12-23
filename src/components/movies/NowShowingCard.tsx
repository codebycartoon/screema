import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroMovie } from "@/data/movies";
import { cn } from "@/lib/utils";

interface NowShowingCardProps {
  movie: HeroMovie;
  className?: string;
}

const NowShowingCard = ({ movie, className }: NowShowingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getSeatAvailabilityColor = (availability: 'high' | 'medium' | 'low') => {
    switch (availability) {
      case 'high': return 'bg-green-500/90 text-white border-green-500';
      case 'medium': return 'bg-yellow-500/90 text-white border-yellow-500';
      case 'low': return 'bg-red-500/90 text-white border-red-500';
    }
  };

  const getSeatAvailabilityText = (availability: 'high' | 'medium' | 'low') => {
    switch (availability) {
      case 'high': return 'Available';
      case 'medium': return 'Limited';
      case 'low': return 'Few Left';
    }
  };

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
        
        {/* Age Rating Badge - Top Right */}
        <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-background/90 backdrop-blur-sm border border-border/50">
          <span className="text-xs font-semibold">PG-13</span>
        </div>

        {/* Seat Availability Badge - Top Left */}
        <div className="absolute top-3 left-3">
          <Badge 
            variant="outline" 
            className={cn(
              "text-xs font-medium border-0",
              getSeatAvailabilityColor(movie.seatAvailability)
            )}
          >
            <Users className="w-3 h-3 mr-1" />
            {getSeatAvailabilityText(movie.seatAvailability)}
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
            
            {/* Rating (left) and Genre (right) */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span className="font-medium">{movie.rating}</span>
              </div>
              <div className="text-sm text-white/90">
                {movie.genre.slice(0, 3).join(", ")}
              </div>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-1 text-sm text-white/90">
              <Clock className="w-4 h-4" />
              <span>{movie.duration}m</span>
            </div>

            {/* Book Ticket Button */}
            <Link to={`/movie/${movie.id}`} className="block">
              <Button variant="cinema" className="w-full">
                Book Ticket
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowShowingCard;