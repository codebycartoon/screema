import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllMovies, generateShowtimes, theaters } from "@/data/movies";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MovieHero from "@/components/movies/MovieHero";
import ShowtimeSelector from "@/components/booking/ShowtimeSelector";
import SeatMap from "@/components/booking/SeatMap";
import BookingSummary from "@/components/booking/BookingSummary";
import SnacksSection, { SelectedSnack } from "@/components/booking/SnacksSection";
import { Showtime, Seat } from "@/types/cinema";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Bell, Heart, Check, MapPin, Clock, Play } from "lucide-react";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToWatchlist, removeFromWatchlist, watchlistItems } = useNotifications();
  const allMovies = getAllMovies();
  const movie = allMovies.find(m => m.id === id);
  
  const [step, setStep] = useState<'showtime' | 'seats'>('showtime');
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [selectedSnacks, setSelectedSnacks] = useState<SelectedSnack[]>([]);

  // Check if movie is coming soon - explicitly check for coming soon movie IDs
  const comingSoonIds = ["7", "8", "9", "10"];
  const isComingSoon = movie ? comingSoonIds.includes(movie.id) : false;
  
  // Check if movie is already in watchlist
  const isInWatchlist = movie ? watchlistItems.some(item => item.movieId === movie.id) : false;

  const handleWatchTrailer = () => {
    alert(`Opening trailer for ${movie?.title}`);
  };

  const handleGetNotified = () => {
    if (movie && !isInWatchlist) {
      addToWatchlist(movie.id, movie.title, movie.poster);
    }
  };

  const handleToggleWatchlist = () => {
    if (!movie) return;
    
    if (isInWatchlist) {
      const watchlistItem = watchlistItems.find(item => item.movieId === movie.id);
      if (watchlistItem) {
        removeFromWatchlist(watchlistItem.id);
        toast({
          title: "Removed from Watchlist",
          description: `${movie.title} has been removed from your watchlist.`,
        });
      }
    } else {
      addToWatchlist(movie.id, movie.title, movie.poster);
      toast({
        title: "Added to Watchlist",
        description: `${movie.title} has been added to your watchlist.`,
      });
    }
  };

  // Ensure page starts at top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Movie not found</p>
      </div>
    );
  }

  const showtimes = generateShowtimes(movie.id);
  const theater = selectedShowtime ? theaters.find(t => t.id === selectedShowtime.theaterId) : null;
  const screen = theater?.screens.find(s => s.id === selectedShowtime?.screenId);

  // Generate some random booked seats
  const bookedSeats = ['A5', 'A6', 'B8', 'B9', 'C12', 'D4', 'D5', 'E10', 'F7', 'G3', 'H15'];

  const handleShowtimeSelect = (showtime: Showtime) => {
    setSelectedShowtime(showtime);
    setStep('seats');
    setSelectedSeats([]);
  };

  const handleBookNow = () => {
    setStep('showtime');
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  const calculateTicketsTotal = () => {
    if (!selectedShowtime) return 0;
    return selectedSeats.reduce((total, seat) => {
      const price = seat.type === 'vip' 
        ? selectedShowtime.price.vip 
        : seat.type === 'premium' 
          ? selectedShowtime.price.premium 
          : selectedShowtime.price.standard;
      return total + price;
    }, 0);
  };

  const calculateSnacksTotal = () => {
    return selectedSnacks.reduce((total, snack) => total + (snack.price * snack.quantity), 0);
  };

  const calculateGrandTotal = () => {
    const ticketsTotal = calculateTicketsTotal();
    const snacksTotal = calculateSnacksTotal();
    const subtotal = ticketsTotal + snacksTotal;
    const serviceFee = subtotal * 0.1;
    return subtotal + serviceFee;
  };

  const handleConfirmBooking = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to complete your booking.",
      });
      navigate('/auth', { state: { from: `/movie/${id}` } });
      return;
    }

    if (!selectedShowtime || selectedSeats.length === 0) return;

    // Parse showtime date and time into a proper Date
    const [hours, minutes] = selectedShowtime.time.split(':');
    const showtimeDate = new Date(selectedShowtime.date);
    showtimeDate.setHours(parseInt(hours), parseInt(minutes));

    navigate('/payment', {
      state: {
        movieId: movie.id,
        movieTitle: movie.title,
        moviePoster: movie.poster,
        theaterName: theater?.name || '',
        screenName: screen?.name || '',
        showtime: showtimeDate,
        seats: selectedSeats.map(s => s.id),
        snacks: selectedSnacks,
        totalAmount: calculateGrandTotal(),
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>{movie.title} - Book Tickets | SCREEMA</title>
        <meta name="description" content={`Book tickets for ${movie.title}. ${movie.description}`} />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <MovieHero movie={movie} onBookNow={handleBookNow} isComingSoon={isComingSoon} />

          <section className="py-12 bg-card/50">
            <div className="container mx-auto px-4">
              {isComingSoon ? (
                // Coming Soon Movie - Portfolio-worthy implementation
                <div className="max-w-6xl mx-auto space-y-12">
                  {/* Release Countdown & Status */}
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20 mb-4">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">
                        Releasing in {Math.ceil((new Date(movie.releaseDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                      </span>
                    </div>
                    <h2 className="font-display text-3xl font-bold mb-2">Get Ready for {movie.title}</h2>
                    <p className="text-lg text-muted-foreground">
                      Tickets go live on{" "}
                      <span className="font-semibold text-foreground">
                        {new Date(movie.releaseDate).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </p>
                  </div>

                  {/* Smart CTAs Section */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                        <Bell className="w-6 h-6 text-blue-500" />
                      </div>
                      <h3 className="font-semibold mb-2">Get Notified</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Be the first to know when tickets are available
                      </p>
                      <Button 
                        className="w-full" 
                        onClick={() => {
                          handleGetNotified();
                          toast({
                            title: "Notification Set!",
                            description: "You'll be notified when tickets go live.",
                          });
                        }}
                      >
                        <Bell className="w-4 h-4 mr-2" />
                        Notify Me
                      </Button>
                    </Card>

                    <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
                      <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-6 h-6 text-red-500" />
                      </div>
                      <h3 className="font-semibold mb-2">Add to Watchlist</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Save to your personal collection
                      </p>
                      <Button 
                        variant={isInWatchlist ? "default" : "outline"} 
                        className={`w-full ${isInWatchlist ? "bg-green-600 hover:bg-green-700" : ""}`}
                        onClick={handleToggleWatchlist}
                      >
                        {isInWatchlist ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Watchlisted
                          </>
                        ) : (
                          <>
                            <Heart className="w-4 h-4 mr-2" />
                            Add to Watchlist
                          </>
                        )}
                      </Button>
                    </Card>

                    <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
                      <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-6 h-6 text-purple-500" />
                      </div>
                      <h3 className="font-semibold mb-2">Set Reminder</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Add to your calendar
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          // Create calendar event
                          const event = {
                            title: `${movie.title} - Tickets Available`,
                            start: new Date(movie.releaseDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
                            details: `Tickets for ${movie.title} are now available for booking!`
                          };
                          const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.start}&details=${encodeURIComponent(event.details)}`;
                          window.open(calendarUrl, '_blank');
                          toast({
                            title: "Calendar Reminder",
                            description: "Opening Google Calendar to set reminder.",
                          });
                        }}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Add Reminder
                      </Button>
                    </Card>
                  </div>

                  {/* Cinema Availability Preview */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Where You Can Watch</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {theaters.slice(0, 6).map((theater) => (
                        <Card key={theater.id} className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold">{theater.name}</h4>
                              <p className="text-sm text-muted-foreground">{theater.location}</p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {Math.ceil((new Date(movie.releaseDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Schedules coming soon</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Multiple showtimes available</span>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Movie Information */}
                  <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-bold mb-4">Synopsis</h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                          {movie.description}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold mb-4">Cast & Crew</h3>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                              <span className="text-sm font-medium">D</span>
                            </div>
                            <div>
                              <p className="font-medium">{movie.director}</p>
                              <p className="text-sm text-muted-foreground">Director</p>
                            </div>
                          </div>
                          {movie.cast.slice(0, 3).map((actor, index) => (
                            <div key={actor} className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                <span className="text-sm font-medium">{actor.charAt(0)}</span>
                              </div>
                              <div>
                                <p className="font-medium">{actor}</p>
                                <p className="text-sm text-muted-foreground">Actor</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-bold mb-4">Movie Details</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center py-2 border-b border-border/50">
                            <span className="text-muted-foreground">Duration</span>
                            <span className="font-medium">{movie.duration} minutes</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-border/50">
                            <span className="text-muted-foreground">Language</span>
                            <span className="font-medium">{movie.language}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-border/50">
                            <span className="text-muted-foreground">Release Date</span>
                            <span className="font-medium">{new Date(movie.releaseDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-muted-foreground">Expected Rating</span>
                            <span className="font-medium">TBA</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold mb-4">Genres</h3>
                        <div className="flex flex-wrap gap-3">
                          {movie.genre.map((genre) => (
                            <Badge
                              key={genre}
                              variant="outline"
                              className="px-4 py-2 text-sm font-medium"
                            >
                              {genre}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Trailer Section */}
                      <div>
                        <h3 className="text-2xl font-bold mb-4">Watch Trailer</h3>
                        <Card className="p-6 text-center">
                          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                            <Play className="w-8 h-8 text-red-500" />
                          </div>
                          <p className="text-muted-foreground mb-4">
                            Get a sneak peek of what's coming
                          </p>
                          <Button onClick={handleWatchTrailer} className="w-full">
                            <Play className="w-4 h-4 mr-2" />
                            Watch Trailer
                          </Button>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Now Showing Movie - Show booking interface
                <div className="grid lg:grid-cols-[1fr_380px] gap-8">
                  {/* Main Content */}
                  <div>
                    {step === 'showtime' && (
                      <div className="animate-fade-in">
                        <h2 className="font-display text-2xl font-bold mb-6">
                          Select Showtime
                        </h2>
                        <ShowtimeSelector
                          showtimes={showtimes}
                          selectedShowtime={selectedShowtime}
                          onSelect={handleShowtimeSelect}
                        />
                      </div>
                    )}

                    {step === 'seats' && selectedShowtime && screen && (
                      <div className="animate-fade-in">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="font-display text-2xl font-bold">
                            Select Seats
                          </h2>
                          <button
                            onClick={() => setStep('showtime')}
                            className="text-sm text-primary hover:underline"
                          >
                            Change Showtime
                          </button>
                        </div>
                        <div className="glass rounded-xl p-6">
                          <SeatMap
                            rows={screen.rows}
                            seatsPerRow={screen.seatsPerRow}
                            bookedSeats={bookedSeats}
                            onSelectionChange={setSelectedSeats}
                            screenType={screen.type}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sidebar */}
                  <div>
                    <BookingSummary
                      movie={movie}
                      showtime={selectedShowtime}
                      selectedSeats={selectedSeats}
                      selectedSnacks={selectedSnacks}
                      onConfirm={handleConfirmBooking}
                    />
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Snacks Section - Only show for now showing movies */}
          {!isComingSoon && (
            <SnacksSection
              selectedSnacks={selectedSnacks}
              onSnacksChange={setSelectedSnacks}
            />
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MovieDetail;
