import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Share2, 
  Calendar, 
  Clock, 
  MapPin, 
  Ticket,
  QrCode,
  X
} from "lucide-react";
import { Booking } from "@/data/dashboard";
import QRCode from "react-qr-code";

interface TicketModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

const TicketModal = ({ booking, isOpen, onClose }: TicketModalProps) => {
  const [qrData, setQrData] = useState<string>("");

  useEffect(() => {
    if (booking && isOpen) {
      // Generate QR code data with booking information
      const qrCodeData = JSON.stringify({
        bookingId: booking.id,
        movieTitle: booking.movieTitle,
        showtime: booking.showtime.toISOString(),
        seats: booking.seats,
        theater: booking.theaterName,
        screen: booking.screenName
      });
      setQrData(qrCodeData);
    }
  }, [booking, isOpen]);

  const handleDownload = () => {
    if (!booking) return;
    
    // Create a downloadable ticket
    const ticketData = {
      bookingId: booking.id,
      movieTitle: booking.movieTitle,
      theater: booking.theaterName,
      screen: booking.screenName,
      showtime: booking.showtime.toLocaleString(),
      seats: booking.seats.join(', '),
      totalAmount: booking.totalAmount,
      qrData: qrData
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ticketData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `ticket-${booking.id}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleShare = async () => {
    if (!booking) return;

    const shareData = {
      title: `Movie Ticket - ${booking.movieTitle}`,
      text: `I'm watching ${booking.movieTitle} at ${booking.theaterName} on ${booking.showtime.toLocaleDateString()}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(
          `${shareData.title}\n${shareData.text}\n${shareData.url}`
        );
        // You could show a toast notification here
        alert("Ticket details copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'completed': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  if (!booking || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-background border rounded-lg shadow-lg w-[90vw] max-w-md max-h-[90vh] overflow-y-auto p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        
        {/* Header */}
        <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-6 relative z-10">
          <h2 className="text-lg font-semibold leading-none tracking-tight flex items-center gap-2">
            <Ticket className="w-5 h-5" />
            Digital Ticket
          </h2>
        </div>
        
        <div className="space-y-4 relative z-10">
          {/* Movie Poster and Basic Info */}
          <div className="flex gap-4">
            <div className="relative w-16 h-24 sm:w-20 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden">
              <img
                src={booking.moviePoster}
                alt={booking.movieTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1 left-1">
                <Badge className={`${getStatusColor(booking.status)} text-xs`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-base sm:text-lg font-bold mb-1 truncate">{booking.movieTitle}</h3>
              <p className="text-sm text-muted-foreground mb-2 truncate">
                {booking.theaterName}
              </p>
              <p className="text-lg font-bold text-primary">
                KES {booking.totalAmount}
              </p>
            </div>
          </div>

          {/* Booking Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="truncate">{booking.showtime.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="truncate">{booking.showtime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="truncate">Screen {booking.screenName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Ticket className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="truncate">Seats: {booking.seats.join(', ')}</span>
            </div>
          </div>

          {/* Snacks Information */}
          {booking.snacks && booking.snacks.length > 0 && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Snacks Ordered:</p>
              <div className="flex flex-wrap gap-1">
                {booking.snacks.map((snack, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {snack.quantity}x {snack.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* QR Code */}
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <QrCode className="w-4 h-4" />
              Scan at Cinema
            </div>
            {qrData && (
              <div className="w-32 h-32 sm:w-36 sm:h-36 border rounded-lg p-2 bg-white flex items-center justify-center">
                <QRCode
                  value={qrData}
                  size={120}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  viewBox={`0 0 120 120`}
                />
              </div>
            )}
            <p className="text-xs text-muted-foreground text-center">
              Show this QR code at the cinema entrance
            </p>
            <p className="text-xs text-orange-600 font-medium text-center">
              Please arrive at theatre 15 minutes before the movie
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleDownload}
              className="flex-1"
              variant="outline"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button 
              onClick={handleShare}
              className="flex-1"
              variant="outline"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;