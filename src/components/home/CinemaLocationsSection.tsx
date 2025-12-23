import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Car, Utensils, Accessibility } from "lucide-react";
import { theaters } from "@/data/movies";

const CinemaLocationsSection = () => {
  // Extended theater data with facilities
  const cinemaLocations = theaters.map(theater => ({
    ...theater,
    facilities: [
      theater.screens.some(s => s.type === 'IMAX') && 'IMAX',
      theater.screens.some(s => s.type === 'Dolby') && 'Dolby Atmos',
      theater.screens.some(s => s.type === '4DX') && '4DX',
      'Parking',
      'Snacks',
      'Wheelchair Access'
    ].filter(Boolean) as string[],
    image: theater.id === '1' 
      ? 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=400&fit=crop'
      : 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop'
  }));

  const getFacilityIcon = (facility: string) => {
    switch (facility) {
      case 'Parking': return <Car className="w-3 h-3" />;
      case 'Snacks': return <Utensils className="w-3 h-3" />;
      case 'Wheelchair Access': return <Accessibility className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Cinema <span className="text-gradient">Locations</span>
            </h2>
            <p className="text-muted-foreground">
              Find the perfect cinema near you
            </p>
          </div>

          <Link to="/cinemas">
            <Button variant="outline">
              View All Locations
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cinemaLocations.map((cinema, index) => (
            <div 
              key={cinema.id}
              className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Cinema Image */}
              <div className="relative aspect-[2/1] overflow-hidden">
                <img
                  src={cinema.image}
                  alt={cinema.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                
                {/* Screen Count Badge */}
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                    {cinema.screens.length} Screens
                  </Badge>
                </div>

                {/* Location Info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white/90 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{cinema.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {cinema.name}
                </h3>

                {/* Screen Types */}
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Screen Types:</p>
                  <div className="flex flex-wrap gap-2">
                    {cinema.screens.map(screen => (
                      <Badge key={screen.id} variant="secondary" className="text-xs">
                        {screen.name} ({screen.type})
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Facilities */}
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Facilities:</p>
                  <div className="flex flex-wrap gap-2">
                    {cinema.facilities.map(facility => (
                      <Badge key={facility} variant="outline" className="text-xs">
                        {getFacilityIcon(facility)}
                        <span className="ml-1">{facility}</span>
                      </Badge>
                    ))}
                  </div>
                </div>

                <Link to={`/cinema/${cinema.id}/showtimes`}>
                  <Button variant="cinema" className="w-full">
                    View Showtimes
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Map Preview Placeholder */}
        <div className="mt-12 bg-card rounded-xl p-8 text-center">
          <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Interactive Map Coming Soon</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Find the nearest SCREEMA location with our interactive map
          </p>
        </div>
      </div>
    </section>
  );
};

export default CinemaLocationsSection;