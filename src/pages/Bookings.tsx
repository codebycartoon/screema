import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, Calendar, MapPin, Clock, QrCode, Loader2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet-async';

interface Booking {
  id: string;
  movie_id: string;
  movie_title: string;
  movie_poster: string | null;
  theater_name: string;
  screen_name: string;
  showtime: string;
  seats: string[];
  total_amount: number;
  payment_status: string;
  booking_reference: string;
  qr_code: string | null;
  created_at: string;
  cancelled_at: string | null;
}

const Bookings = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      // Fetch from Supabase database
      const { data: dbBookings, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      // Also get localStorage bookings for demo data
      const localBookings = JSON.parse(localStorage.getItem('demo_bookings') || '[]')
        .filter((b: any) => b.user_id === user?.id);

      // Merge both sources (database + localStorage)
      const allBookings = [...(dbBookings || []), ...localBookings];
      
      // Remove duplicates by ID
      const uniqueBookings = allBookings.filter((booking, index, self) =>
        index === self.findIndex((b) => b.id === booking.id)
      );

      setBookings(uniqueBookings as Booking[]);
    } catch (error) {
      console.error('Fetch bookings error:', error);
      toast({
        title: 'Error',
        description: 'Failed to load bookings.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      // Update in Supabase database
      const { error: dbError } = await supabase
        .from('bookings')
        .update({ 
          status: 'cancelled',
          payment_status: 'refunded'
        })
        .eq('id', bookingId);

      if (dbError) {
        console.error('Database error:', dbError);
      }

      // Also update localStorage
      const demoBookings = JSON.parse(localStorage.getItem('demo_bookings') || '[]');
      const updatedBookings = demoBookings.map((b: any) => 
        b.id === bookingId 
          ? { ...b, status: 'cancelled', payment_status: 'refunded' }
          : b
      );
      localStorage.setItem('demo_bookings', JSON.stringify(updatedBookings));
      
      fetchBookings();

      toast({
        title: 'Booking Cancelled',
        description: 'Your booking has been cancelled successfully.',
      });

      fetchBookings();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to cancel booking.',
        variant: 'destructive',
      });
    }
  };

  const isUpcoming = (showtime: string) => {
    return new Date(showtime) > new Date();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const upcomingBookings = bookings.filter(
    (b) => isUpcoming(b.showtime) && b.payment_status !== 'cancelled'
  );
  const pastBookings = bookings.filter(
    (b) => !isUpcoming(b.showtime) || b.payment_status === 'cancelled'
  );

  return (
    <>
      <Helmet>
        <title>My Bookings | SCREEMA</title>
        <meta name="description" content="View your movie ticket bookings and download QR codes." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="font-display text-3xl font-bold mb-8">My Bookings</h1>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : bookings.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center border border-border/50">
                <Ticket className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h2 className="font-display text-xl font-bold mb-2">No Bookings Yet</h2>
                <p className="text-muted-foreground mb-6">
                  You haven't booked any tickets yet. Browse our movies and book your first show!
                </p>
                <Button variant="cinema" onClick={() => navigate('/')}>
                  Browse Movies
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                {upcomingBookings.length > 0 && (
                  <div>
                    <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Upcoming Shows
                    </h2>
                    <div className="space-y-4">
                      {upcomingBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="glass rounded-xl p-6 border border-border/50 transition-all hover:border-primary/50"
                        >
                          <div className="flex gap-6">
                            <img
                              src={booking.movie_poster || '/placeholder.svg'}
                              alt={booking.movie_title}
                              className="w-24 h-36 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-display text-lg font-bold">
                                  {booking.movie_title}
                                </h3>
                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/20 text-primary">
                                  {booking.booking_reference}
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-4">
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4" />
                                  {booking.theater_name}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4" />
                                  {new Date(booking.showtime).toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric',
                                  })}{' '}
                                  •{' '}
                                  {new Date(booking.showtime).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </div>
                              </div>

                              <div className="flex items-center gap-4 mb-4">
                                <span className="text-sm">
                                  <span className="text-muted-foreground">Screen: </span>
                                  {booking.screen_name}
                                </span>
                                <span className="text-sm">
                                  <span className="text-muted-foreground">Seats: </span>
                                  {booking.seats.join(', ')}
                                </span>
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-primary">
                                  ${booking.total_amount.toFixed(2)}
                                </span>
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      setSelectedBooking(
                                        selectedBooking === booking.id ? null : booking.id
                                      )
                                    }
                                  >
                                    <QrCode className="w-4 h-4 mr-2" />
                                    Show QR
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:text-destructive"
                                    onClick={() => handleCancelBooking(booking.id)}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>

                              {selectedBooking === booking.id && (
                                <div className="mt-4 p-4 bg-background/50 rounded-lg flex items-center justify-center">
                                  <div className="text-center">
                                    <div className="w-32 h-32 bg-foreground/10 rounded-lg flex items-center justify-center mb-2">
                                      <QrCode className="w-24 h-24" />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                      {booking.qr_code}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {pastBookings.length > 0 && (
                  <div>
                    <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-5 h-5" />
                      Past Bookings
                    </h2>
                    <div className="space-y-4">
                      {pastBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="glass rounded-xl p-6 border border-border/50 opacity-60"
                        >
                          <div className="flex gap-6">
                            <img
                              src={booking.movie_poster || '/placeholder.svg'}
                              alt={booking.movie_title}
                              className="w-20 h-28 object-cover rounded-lg grayscale"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-display text-lg font-bold">
                                  {booking.movie_title}
                                </h3>
                                <span
                                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                                    booking.payment_status === 'cancelled'
                                      ? 'bg-destructive/20 text-destructive'
                                      : 'bg-muted text-muted-foreground'
                                  }`}
                                >
                                  {booking.payment_status === 'cancelled' ? 'Cancelled' : 'Completed'}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {new Date(booking.showtime).toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Bookings;
