import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, Calendar } from "lucide-react";
import { getNowShowingHero, getComingSoonHero, generateShowtimes } from "@/data/movies";
import { Helmet } from "react-helmet-async";

const Movies = () => {
  const [activeTab, setActiveTab] = useState<'now-showing' | 'coming-soon'>('now-showing');
  
  const nowShowingMovies = getNowShowingHero();
  const comingSoonMovies = getComingSoonHero();

  const getSeatAvailabilityColor = (availability: 'high' | 'medium' | 'low') => {
    switch (availability) {
      case 'high': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  return (
    <>
      <Helmet>
        <title>Movies - SCREEMA</title>
        <meta name="description" content="Browse all movies now showing and coming soon at SCREEMA cinemas." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          {/* Header */}
          <section className="py-12 bg-gradient-to-b from-card/50 to-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                  All <span className="text-gradient">Movies</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Discover the latest blockbusters and upcoming releases
                </p>
              </div>

              {/* Tabs */}
              <div className="flex justify-center mb-8">
                <div className="flex gap-1 bg-card rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab('now-showing')}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                      activeTab === 'now-showing'
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Now Showing ({nowShowingMovies.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('coming-soon')}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                      activeTab === 'coming-soon'
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Coming Soon ({comingSoonMovies.length})
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Movies Grid */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              {activeTab === 'now-showing' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {nowShowingMovies.map((movie, index) => (
                    <div 
                      key={movie.id}
                      className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex gap-4 p-6">
                        <div className="relative w-24 h-36 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded bg-background/80 backdrop-blur-sm">
                            <Star className="w-3 h-3 text-accent fill-accent" />
                            <span className="text-xs font-semibold">{movie.rating}</span>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors mb-2">
                            {movie.title}
                          </h3>
                          
                          <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{movie.duration} min</span>
                            </div>
                            <span>•</span>
                            <span className="line-clamp-1">{movie.genre.slice(0, 2).join(", ")}</span>
                          </div>

                          {movie.nextShowtime && (
                            <Badge variant="outline" className="text-primary border-primary/30 mb-3">
                              Next: {movie.nextShowtime}
                            </Badge>
                          )}

                          <div className="flex items-center justify-between mb-4">
                            <span className="text-lg font-bold text-primary">From KES {movie.fromPrice}</span>
                            <Badge 
                              variant="outline" 
                              className={getSeatAvailabilityColor(movie.seatAvailability)}
                            >
                              <Users className="w-3 h-3 mr-1" />
                              {movie.seatAvailability === 'high' ? 'Good availability' : 
                               movie.seatAvailability === 'medium' ? 'Limited seats' : 'Few seats left'}
                            </Badge>
                          </div>

                          <Link to={`/movie/${movie.id}`}>
                            <Button variant="cinema" className="w-full">
                              Book Now
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {comingSoonMovies.map((movie, index) => (
                    <div 
                      key={movie.id}
                      className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <img
                          src={movie.backdrop}
                          alt={movie.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                        
                        <div className="absolute top-4 left-4">
                          <Badge variant="outline" className="text-primary border-primary/30 bg-background/80 backdrop-blur-sm">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(movie.releaseDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </Badge>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="font-display text-xl font-bold text-white mb-2 line-clamp-2">
                            {movie.title}
                          </h3>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex gap-2 mb-4">
                          {movie.genre.slice(0, 3).map(genre => (
                            <Badge key={genre} variant="secondary" className="text-xs">
                              {genre}
                            </Badge>
                          ))}
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {movie.description}
                        </p>

                        <div className="text-sm text-muted-foreground mb-4">
                          <p><strong>Director:</strong> {movie.director}</p>
                          <p><strong>Cast:</strong> {movie.cast.slice(0, 2).join(", ")}</p>
                        </div>

                        <Link to={`/movie/${movie.id}`}>
                          <Button variant="cinema" className="w-full">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Movies;