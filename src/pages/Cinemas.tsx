import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Car, Utensils, Accessibility, Phone, Clock } from "lucide-react";
import { theaters } from "@/data/movies";
import { Helmet } from "react-helmet-async";

const Cinemas = () => {
  // Extended theater data with more details
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
      : 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop',
    phone: theater.id === '1' ? '+254 700 123 456' : '+254 700 123 457',
    hours: 'Daily 10:00 AM - 11:00 PM',
    address: theater.id === '1' ? 'Westlands, Nairobi' : 'Brooklyn Heights, Nairobi'
  }));

  const getFacilityIcon = (facility: string) => {
    switch (facility) {
      case 'Parking': return <Car className="w-4 h-4" />;
      case 'Snacks': return <Utensils className="w-4 h-4" />;
      case 'Wheelchair Access': return <Accessibility className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Cinema Locations - SCREEMA</title>
        <meta name="description" content="Find SCREEMA cinema locations near you with IMAX, Dolby, and 4DX screens." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          {/* Header */}
          <section className="py-12 bg-gradient-to-b from-card/50 to-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                  Cinema <span className="text-gradient">Locations</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Find the perfect cinema near you with premium screens and facilities
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-primary mb-1">{theaters.length}</div>
                  <div className="text-sm text-muted-foreground">Locations</div>
                </div>
                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-primary mb-1">
                    {theaters.reduce((acc, t) => acc + t.screens.length, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Screens</div>
                </div>
                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-primary mb-1">5</div>
                  <div className="text-sm text-muted-foreground">IMAX Screens</div>
                </div>
                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-primary mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Digital</div>
                </div>
              </div>
            </div>
          </section>

          {/* Cinema Locations */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="space-y-8">
                {cinemaLocations.map((cinema, index) => (
                  <div 
                    key={cinema.id}
                    className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      {/* Image */}
                      <div className="relative aspect-[2/1] lg:aspect-square overflow-hidden">
                        <img
                          src={cinema.image}
                          alt={cinema.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                        
                        <div className="absolute top-4 right-4">
                          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                            {cinema.screens.length} Screens
                          </Badge>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-2 text-white/90">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{cinema.address}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8">
                        <h2 className="font-display text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                          {cinema.name}
                        </h2>

                        <div className="space-y-4 mb-6">
                          {/* Contact Info */}
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <Phone className="w-4 h-4" />
                            <span>{cinema.phone}</span>
                          </div>
                          
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{cinema.hours}</span>
                          </div>
                        </div>

                        {/* Screen Types */}
                        <div className="mb-6">
                          <h3 className="font-semibold mb-3">Screen Types</h3>
                          <div className="grid grid-cols-2 gap-3">
                            {cinema.screens.map(screen => (
                              <div key={screen.id} className="bg-background rounded-lg p-3">
                                <div className="font-medium">{screen.name}</div>
                                <div className="text-sm text-muted-foreground">{screen.type}</div>
                                <div className="text-xs text-muted-foreground">
                                  {screen.rows}×{screen.seatsPerRow} seats
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Facilities */}
                        <div className="mb-6">
                          <h3 className="font-semibold mb-3">Facilities</h3>
                          <div className="flex flex-wrap gap-2">
                            {cinema.facilities.map(facility => (
                              <Badge key={facility} variant="outline" className="text-sm">
                                {getFacilityIcon(facility)}
                                <span className="ml-2">{facility}</span>
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Link to={`/cinema/${cinema.id}/showtimes`} className="flex-1">
                            <Button variant="cinema" className="w-full">
                              View Showtimes
                            </Button>
                          </Link>
                          <Button variant="outline">
                            Get Directions
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Map Section */}
          <section className="py-12 bg-gradient-to-b from-background to-card/50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="font-display text-3xl font-bold mb-4">
                  Find Us on the <span className="text-gradient">Map</span>
                </h2>
                <p className="text-muted-foreground">
                  Interactive map coming soon to help you find the nearest location
                </p>
              </div>

              <div className="bg-card rounded-xl p-12 text-center">
                <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center mb-6">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-display text-xl font-semibold mb-2">Interactive Map</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Coming soon: Find directions, parking info, and real-time updates for all our locations
                    </p>
                  </div>
                </div>
                
                <Button variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
                  Enable Location Services
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Cinemas;