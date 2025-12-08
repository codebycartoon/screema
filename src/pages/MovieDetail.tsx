import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movies, generateShowtimes, theaters } from "@/data/movies";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MovieHero from "@/components/movies/MovieHero";
import ShowtimeSelector from "@/components/booking/ShowtimeSelector";
import SeatMap from "@/components/booking/SeatMap";
import BookingSummary from "@/components/booking/BookingSummary";
import { Showtime, Seat } from "@/types/cinema";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const movie = movies.find(m => m.id === id);
  
  const [step, setStep] = useState<'showtime' | 'seats'>('showtime');
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

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

  const calculateTotal = () => {
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
        totalAmount: calculateTotal(),
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
          <MovieHero movie={movie} onBookNow={handleBookNow} />

          <section className="py-12 bg-card/50">
            <div className="container mx-auto px-4">
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
                    onConfirm={handleConfirmBooking}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MovieDetail;
