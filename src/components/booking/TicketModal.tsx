import { X, Download, Share2, MapPin, Clock, Ticket, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: {
    id: string;
    movie_title: string;
    movie_poster: string | null;
    theater_name: string;
    screen_name: string;
    showtime: string;
    seats: string[];
    total_amount: number;
    qr_code: string | null;
    status: string;
  };
}

const TicketModal = ({ isOpen, onClose, booking }: TicketModalProps) => {
  const handleDownload = () => {
    // Simulate download
    alert('Ticket download feature - Coming soon!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${booking.movie_title} Ticket`,
        text: `My ticket for ${booking.movie_title}`,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        {/* Ticket Design - Boarding Pass Style */}
        <div className="relative bg-gradient-to-br from-background to-card">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top Section - Movie Info */}
          <div className="p-6 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <Film className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">SCREEMA E-TICKET</span>
            </div>
            
            <h2 className="font-display text-2xl font-bold mb-6">{booking.movie_title}</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-xs text-muted-foreground mb-1">DATE & TIME</div>
                <div className="font-semibold">
                  {new Date(booking.showtime).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(booking.showtime).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground mb-1">VENUE</div>
                <div className="font-semibold">{booking.theater_name}</div>
                <div className="text-sm text-muted-foreground">{booking.screen_name}</div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground mb-1">SEATS</div>
                <div className="font-semibold">{booking.seats?.join(', ') || 'N/A'}</div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground mb-1">TICKET ID</div>
                <div className="font-mono text-sm">{booking.id.substring(0, 8).toUpperCase()}</div>
              </div>
            </div>
          </div>

          {/* Perforated Line */}
          <div className="relative h-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-dashed border-border/50" />
            </div>
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background" />
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background" />
          </div>

          {/* Bottom Section - QR Code */}
          <div className="p-6 pt-8">
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-xl">
                <div className="text-center">
                  <div className="w-40 h-40 bg-foreground/5 rounded-xl flex items-center justify-center">
                    <div className="text-xs text-muted-foreground">QR CODE</div>
                  </div>
                </div>
              </div>
              
              <p className="text-xs font-mono text-muted-foreground mb-1">{booking.qr_code}</p>
              <p className="text-xs text-muted-foreground text-center mb-6">
                Show this QR code at the cinema entrance
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3 w-full">
                <Button variant="outline" className="flex-1" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className={`p-3 text-center text-sm font-semibold ${
            booking.status === 'confirmed' 
              ? 'bg-green-500/20 text-green-600' 
              : 'bg-yellow-500/20 text-yellow-600'
          }`}>
            {booking.status === 'confirmed' ? '✓ CONFIRMED' : '⏳ PENDING CONFIRMATION'}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketModal;
