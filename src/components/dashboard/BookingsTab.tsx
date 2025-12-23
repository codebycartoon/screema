import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Ticket, 
  QrCode,
  Download,
  Coffee
} from "lucide-react";
import { mockBookings, Booking } from "@/data/dashboard";

const BookingsTab = () => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const currentBookings = mockBookings.filter(b => b.status === 'confirmed');
  const pastBookings = mockBookings.filter(b => b.status === 'completed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'completed': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const BookingCard = ({ booking, showActions = false }: { booking: Booking; showActions?: boolean }) => (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <img
            src={booking.moviePoster}
            alt={booking.movieTitle}
            className="w-20 h-30 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-display text-lg font-semibold">{booking.movieTitle}</h3>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">KES {booking.totalAmount}</p>
                <p className="text-xs text-muted-foreground">
                  Booked: {booking.bookingDate.toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{booking.theaterName} • {booking.screenName}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{booking.showtime.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{booking.showtime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Ticket className="w-4 h-4 text-muted-foreground" />
                <span>Seats: {booking.seats.join(', ')}</span>
              </div>
              {booking.snacks && booking.snacks.length > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <Coffee className="w-4 h-4 text-muted-foreground" />
                  <span>
                    Snacks: {booking.snacks.map(s => `${s.name} (${s.quantity})`).join(', ')}
                  </span>
                </div>
              )}
            </div>

            {showActions && booking.status === 'confirmed' && (
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <QrCode className="w-4 h-4 mr-2" />
                  Show QR Code
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your current and past movie bookings
        </p>
      </div>

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="current">
            Current Bookings ({currentBookings.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past Bookings ({pastBookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          {currentBookings.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Ticket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Current Bookings</h3>
                <p className="text-muted-foreground mb-6">
                  You don't have any upcoming movie bookings
                </p>
                <Button>Book a Movie</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {currentBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} showActions={true} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastBookings.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Ticket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Past Bookings</h3>
                <p className="text-muted-foreground">
                  Your completed bookings will appear here
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingsTab;