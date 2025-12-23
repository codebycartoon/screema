import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  XCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  Ticket,
  RefreshCw
} from "lucide-react";
import { mockBookings } from "@/data/dashboard";

const CancelledBookingsTab = () => {
  const cancelledBookings = mockBookings.filter(b => b.status === 'cancelled');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cancelled Bookings</h1>
        <p className="text-muted-foreground mt-1">
          View your cancelled movie bookings and refund status
        </p>
      </div>

      {cancelledBookings.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <XCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Cancelled Bookings</h3>
            <p className="text-muted-foreground">
              You haven't cancelled any bookings yet
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {cancelledBookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <img
                    src={booking.moviePoster}
                    alt={booking.movieTitle}
                    className="w-20 h-30 rounded-lg object-cover opacity-75"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-muted-foreground">
                          {booking.movieTitle}
                        </h3>
                        <Badge className="bg-red-500/10 text-red-600 border-red-500/20">
                          Cancelled
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-muted-foreground line-through">
                          KES {booking.totalAmount}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Cancelled: {booking.bookingDate.toLocaleDateString()}
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
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Ticket className="w-4 h-4" />
                        <span>Seats: {booking.seats.join(', ')}</span>
                      </div>
                    </div>

                    {/* Refund Status */}
                    <div className="bg-muted/50 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-sm">Refund Status</h4>
                          <p className="text-sm text-muted-foreground">
                            Refund processed to original payment method
                          </p>
                        </div>
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                          Completed
                        </Badge>
                      </div>
                      <div className="mt-2 text-sm">
                        <p className="text-muted-foreground">
                          Refund Amount: <span className="font-semibold text-foreground">KES {booking.totalAmount}</span>
                        </p>
                        <p className="text-muted-foreground">
                          Processing Time: 3-5 business days
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Rebook Similar
                      </Button>
                      <Button variant="outline" size="sm">
                        View Refund Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CancelledBookingsTab;