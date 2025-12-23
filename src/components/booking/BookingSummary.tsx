import { Seat, Showtime, Movie } from "@/types/cinema";
import { theaters } from "@/data/movies";
import { Ticket, MapPin, Clock, Calendar, CreditCard, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectedSnack } from "./SnacksSection";

interface BookingSummaryProps {
  movie: Movie;
  showtime: Showtime | null;
  selectedSeats: Seat[];
  selectedSnacks?: SelectedSnack[];
  onConfirm: () => void;
}

const BookingSummary = ({ movie, showtime, selectedSeats, selectedSnacks = [], onConfirm }: BookingSummaryProps) => {
  const theater = showtime ? theaters.find(t => t.id === showtime.theaterId) : null;
  const screen = theater?.screens.find(s => s.id === showtime?.screenId);

  const calculateTicketsTotal = () => {
    if (!showtime) return 0;
    return selectedSeats.reduce((total, seat) => {
      const price = seat.type === 'vip' 
        ? showtime.price.vip 
        : seat.type === 'premium' 
          ? showtime.price.premium 
          : showtime.price.standard;
      return total + price;
    }, 0);
  };

  const calculateSnacksTotal = () => {
    return selectedSnacks.reduce((total, snack) => total + (snack.price * snack.quantity), 0);
  };

  const ticketsTotal = calculateTicketsTotal();
  const snacksTotal = calculateSnacksTotal();
  const subtotal = ticketsTotal + snacksTotal;
  const serviceFee = subtotal * 0.1;
  const grandTotal = subtotal + serviceFee;

  return (
    <div className="glass rounded-xl p-6 sticky top-24">
      <div className="flex items-center gap-2 mb-6">
        <Ticket className="w-5 h-5 text-primary" />
        <h3 className="font-display text-lg font-semibold">Booking Summary</h3>
      </div>

      {/* Movie Info */}
      <div className="flex gap-4 mb-6 pb-6 border-b border-border/50">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-20 h-28 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h4 className="font-display font-semibold line-clamp-2">{movie.title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{movie.language}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {movie.duration} min • {movie.genre.slice(0, 2).join(", ")}
          </p>
        </div>
      </div>

      {/* Show Details */}
      {showtime && theater && (
        <div className="space-y-3 mb-6 pb-6 border-b border-border/50">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">{theater.name}</p>
              <p className="text-xs text-muted-foreground">{theater.location}</p>
              {screen && (
                <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded bg-primary/20 text-primary">
                  {screen.type} • {screen.name}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm">{new Date(showtime.date).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}</p>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm">{showtime.time}</p>
          </div>
        </div>
      )}

      {/* Selected Seats */}
      {selectedSeats.length > 0 && (
        <div className="mb-6 pb-6 border-b border-border/50">
          <p className="text-sm text-muted-foreground mb-2">Selected Seats</p>
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map((seat) => (
              <span
                key={seat.id}
                className={`px-3 py-1 text-sm font-medium rounded-lg ${
                  seat.type === 'vip'
                    ? 'bg-accent/20 text-accent'
                    : seat.type === 'premium'
                    ? 'bg-primary/20 text-primary'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {seat.id}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Selected Snacks */}
      {selectedSnacks.length > 0 && (
        <div className="mb-6 pb-6 border-b border-border/50">
          <div className="flex items-center gap-2 mb-3">
            <Coffee className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Selected Snacks</p>
          </div>
          <div className="space-y-2">
            {selectedSnacks.map((snack) => (
              <div key={snack.id} className="flex justify-between items-center text-sm">
                <span className="flex-1">{snack.name}</span>
                <span className="text-muted-foreground mx-2">×{snack.quantity}</span>
                <span className="font-medium">KES {snack.price * snack.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Breakdown */}
      {(selectedSeats.length > 0 || selectedSnacks.length > 0) && showtime && (
        <div className="space-y-2 mb-6">
          {selectedSeats.length > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tickets ({selectedSeats.length})</span>
              <span>KES {ticketsTotal.toFixed(2)}</span>
            </div>
          )}
          {selectedSnacks.length > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Snacks ({selectedSnacks.reduce((sum, s) => sum + s.quantity, 0)})</span>
              <span>KES {snacksTotal.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Service Fee</span>
            <span>KES {serviceFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2 border-t border-border/50">
            <span>Total</span>
            <span className="text-primary">KES {grandTotal.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Confirm Button */}
      <Button
        variant="cinema"
        size="lg"
        className="w-full"
        disabled={!showtime || selectedSeats.length === 0}
        onClick={onConfirm}
      >
        <CreditCard className="w-4 h-4 mr-2" />
        Proceed to Payment
      </Button>

      {selectedSeats.length === 0 && (
        <p className="text-xs text-center text-muted-foreground mt-3">
          Select seats to continue
        </p>
      )}
    </div>
  );
};

export default BookingSummary;
