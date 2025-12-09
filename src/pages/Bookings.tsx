import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, Calendar, MapPin, Clock, QrCode, Loader2, Film, CheckCircle2, XCircle, TrendingUp, Bell } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet-async';
import TicketModal from '@/components/booking/TicketModal';
import { formatCurrency } from '@/lib/utils';

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
  const [selectedTicket, setSelectedTicket] = useState<Booking | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'upcoming' | 'total' | 'cancelled'>('all');

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
  const cancelledBookings = bookings.filter((b) => b.payment_status === 'cancelled');

  // Get notifications for upcoming movies (within 24 hours)
  const upcomingNotifications = upcomingBookings.filter((b) => {
    const now = new Date();
    const movieTime = new Date(b.showtime);
    const diff = movieTime.getTime() - now.getTime();
    const hoursUntil = diff / (1000 * 60 * 60);
    return hoursUntil <= 24 && hoursUntil > 0;
  });

  // Filter bookings based on active filter
  const getFilteredBookings = () => {
    switch (activeFilter) {
      case 'upcoming':
        return upcomingBookings;
      case 'total':
        return bookings;
      case 'cancelled':
        return cancelledBookings;
      default:
        return bookings;
    }
  };

  const filteredBookings = getFilteredBookings();

  // Calculate time until movie starts
  const getTimeUntil = (showtime: string) => {
    const now = new Date();
    const movieTime = new Date(showtime);
    const diff = movieTime.getTime() - now.getTime();
    
    if (diff < 0) return 'Started';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `in ${days}d ${hours % 24}h`;
    }
    return `in ${hours}h ${minutes}m`;
  };

  return (
    <>
      <Helmet>
        <title>My Bookings | SCREEMA</title>
        <meta name="description" content="View your movie ticket bookings and download QR codes." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-between mb-8">
              <h1 className="font-display text-3xl font-bold">My Dashboard</h1>
              
              {/* Quick Profile Card */}
              <div className="hidden md:flex items-center gap-4 glass rounded-2xl px-6 py-3 border border-border/50">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-white font-bold text-lg">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold">{user?.user_metadata?.full_name || 'User'}</div>
                  <div className="text-xs text-muted-foreground">{user?.email}</div>
                </div>
              </div>
            </div>

            {/* Stats Cards - Enterprise Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {/* Upcoming Movies */}
              <button
                onClick={() => setActiveFilter(activeFilter === 'upcoming' ? 'all' : 'upcoming')}
                className={`relative overflow-hidden glass rounded-2xl p-6 border transition-all group text-left ${
                  activeFilter === 'upcoming'
                    ? 'border-primary shadow-lg shadow-primary/20 scale-105'
                    : 'border-border/50 hover:border-primary/50'
                }`}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Film className="w-6 h-6 text-primary" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{upcomingBookings.length}</div>
                  <div className="text-sm text-muted-foreground font-medium">Upcoming Movies</div>
                  {activeFilter === 'upcoming' && (
                    <div className="mt-2 text-xs text-primary font-semibold">● Filtered</div>
                  )}
                </div>
              </button>

              {/* Total Bookings */}
              <button
                onClick={() => setActiveFilter(activeFilter === 'total' ? 'all' : 'total')}
                className={`relative overflow-hidden glass rounded-2xl p-6 border transition-all group text-left ${
                  activeFilter === 'total'
                    ? 'border-blue-500 shadow-lg shadow-blue-500/20 scale-105'
                    : 'border-border/50 hover:border-blue-500/50'
                }`}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 rounded-xl bg-blue-500/10">
                      <Ticket className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">{bookings.length}</div>
                  <div className="text-sm text-muted-foreground font-medium">Total Bookings</div>
                  {activeFilter === 'total' && (
                    <div className="mt-2 text-xs text-blue-500 font-semibold">● Filtered</div>
                  )}
                </div>
              </button>

              {/* Notifications */}
              <button
                onClick={() => setActiveFilter('all')}
                className="relative overflow-hidden glass rounded-2xl p-6 border border-border/50 hover:border-green-500/50 transition-all group text-left cursor-default"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-transparent rounded-bl-full" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 rounded-xl bg-green-500/10">
                      <Bell className="w-6 h-6 text-green-500" />
                    </div>
                    {upcomingNotifications.length > 0 && (
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    )}
                  </div>
                  <div className="text-3xl font-bold mb-1">{upcomingNotifications.length}</div>
                  <div className="text-sm text-muted-foreground font-medium">Upcoming Alerts</div>
                  {upcomingNotifications.length > 0 && (
                    <div className="mt-2 text-xs text-green-500 font-semibold">Within 24 hours</div>
                  )}
                </div>
              </button>

              {/* Cancelled */}
              <button
                onClick={() => setActiveFilter(activeFilter === 'cancelled' ? 'all' : 'cancelled')}
                className={`relative overflow-hidden glass rounded-2xl p-6 border transition-all group text-left ${
                  activeFilter === 'cancelled'
                    ? 'border-destructive shadow-lg shadow-destructive/20 scale-105'
                    : 'border-border/50 hover:border-destructive/50'
                }`}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-destructive/20 to-transparent rounded-bl-full" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 rounded-xl bg-destructive/10">
                      <XCircle className="w-6 h-6 text-destructive" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">{cancelledBookings.length}</div>
                  <div className="text-sm text-muted-foreground font-medium">Cancelled Bookings</div>
                  {activeFilter === 'cancelled' && (
                    <div className="mt-2 text-xs text-destructive font-semibold">● Filtered</div>
                  )}
                </div>
              </button>
            </div>

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
                {/* Active Filter Badge */}
                {activeFilter !== 'all' && (
                  <div className="flex items-center justify-between glass rounded-xl p-4 border border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium">
                        Showing:{' '}
                        <span className="text-primary font-bold">
                          {activeFilter === 'upcoming' && 'Upcoming Movies'}
                          {activeFilter === 'total' && 'All Bookings'}
                          {activeFilter === 'cancelled' && 'Cancelled Bookings'}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ({filteredBookings.length} {filteredBookings.length === 1 ? 'booking' : 'bookings'})
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveFilter('all')}
                    >
                      Clear Filter
                    </Button>
                  </div>
                )}

                {activeFilter === 'all' && upcomingBookings.length > 0 && (
                  <div>
                    <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      Upcoming Shows
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {upcomingBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="relative overflow-hidden glass rounded-2xl border border-border/50 transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 group"
                        >
                          {/* Gradient Accent */}
                          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent" />
                          
                          <div className="p-6">
                            <div className="flex gap-5">
                              {/* Movie Poster */}
                              <div className="relative flex-shrink-0">
                                <img
                                  src={booking.movie_poster || '/placeholder.svg'}
                                  alt={booking.movie_title}
                                  className="w-28 h-40 object-cover rounded-xl shadow-lg"
                                />
                                {/* Status Badge */}
                                <div className="absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white shadow-lg">
                                  {booking.status === 'pending' ? 'Pending' : 'Confirmed'}
                                </div>
                              </div>

                              {/* Details */}
                              <div className="flex-1 min-w-0">
                                <h3 className="font-display text-xl font-bold mb-3 truncate">
                                  {booking.movie_title}
                                </h3>

                                <div className="space-y-2 mb-4">
                                  <div className="flex items-center gap-2 text-sm">
                                    <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                                    <span className="font-medium">
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
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="w-4 h-4 flex-shrink-0" />
                                    <span>{booking.theater_name} • {booking.screen_name}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Ticket className="w-4 h-4 flex-shrink-0" />
                                    <span>Seats: {booking.seats?.join(', ') || 'N/A'}</span>
                                  </div>
                                </div>

                                {/* Countdown Badge */}
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-semibold mb-4">
                                  <Clock className="w-4 h-4" />
                                  Starts {getTimeUntil(booking.showtime)}
                                </div>

                                {/* Price & Actions */}
                                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                  <div>
                                    <div className="text-2xl font-bold text-primary">
                                      {formatCurrency(booking.total_amount || 0)}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {booking.qr_code?.substring(0, 12)}...
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="default"
                                      size="sm"
                                      onClick={() => setSelectedTicket(booking)}
                                    >
                                      <QrCode className="w-4 h-4 mr-2" />
                                      View Ticket
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-destructive hover:text-destructive"
                                      onClick={() => handleCancelBooking(booking.id)}
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Filtered View */}
                {activeFilter !== 'all' && filteredBookings.length > 0 && (
                  <div>
                    <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      {activeFilter === 'upcoming' && 'Upcoming Movies'}
                      {activeFilter === 'total' && 'All Bookings'}
                      {activeFilter === 'cancelled' && 'Cancelled Bookings'}
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {filteredBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="relative overflow-hidden glass rounded-2xl border border-border/50 transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 group"
                        >
                          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent" />
                          
                          <div className="p-6">
                            <div className="flex gap-5">
                              <div className="relative flex-shrink-0">
                                <img
                                  src={booking.movie_poster || '/placeholder.svg'}
                                  alt={booking.movie_title}
                                  className="w-28 h-40 object-cover rounded-xl shadow-lg"
                                />
                                <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                                  booking.payment_status === 'cancelled'
                                    ? 'bg-destructive text-white'
                                    : 'bg-green-500 text-white'
                                }`}>
                                  {booking.payment_status === 'cancelled' ? 'Cancelled' : 'Confirmed'}
                                </div>
                              </div>

                              <div className="flex-1 min-w-0">
                                <h3 className="font-display text-xl font-bold mb-3 truncate">
                                  {booking.movie_title}
                                </h3>

                                <div className="space-y-2 mb-4">
                                  <div className="flex items-center gap-2 text-sm">
                                    <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                                    <span className="font-medium">
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
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="w-4 h-4 flex-shrink-0" />
                                    <span>{booking.theater_name} • {booking.screen_name}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Ticket className="w-4 h-4 flex-shrink-0" />
                                    <span>Seats: {booking.seats?.join(', ') || 'N/A'}</span>
                                  </div>
                                </div>

                                {isUpcoming(booking.showtime) && booking.payment_status !== 'cancelled' && (
                                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-semibold mb-4">
                                    <Clock className="w-4 h-4" />
                                    Starts {getTimeUntil(booking.showtime)}
                                  </div>
                                )}

                                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                  <div>
                                    <div className="text-2xl font-bold text-primary">
                                      {formatCurrency(booking.total_amount || 0)}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {booking.qr_code?.substring(0, 12)}...
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    {booking.payment_status !== 'cancelled' && (
                                      <>
                                        <Button
                                          variant="default"
                                          size="sm"
                                          onClick={() => setSelectedTicket(booking)}
                                        >
                                          <QrCode className="w-4 h-4 mr-2" />
                                          View Ticket
                                        </Button>
                                        {isUpcoming(booking.showtime) && (
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-destructive hover:text-destructive"
                                            onClick={() => handleCancelBooking(booking.id)}
                                          >
                                            Cancel
                                          </Button>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeFilter === 'all' && pastBookings.length > 0 && (
                  <div>
                    <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3 text-muted-foreground">
                      <div className="p-2 rounded-lg bg-muted">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      Past Bookings
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {pastBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="glass rounded-xl p-4 border border-border/50 opacity-70 hover:opacity-100 transition-opacity"
                        >
                          <div className="flex gap-4">
                            <img
                              src={booking.movie_poster || '/placeholder.svg'}
                              alt={booking.movie_title}
                              className="w-16 h-24 object-cover rounded-lg grayscale"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-sm truncate">
                                  {booking.movie_title}
                                </h3>
                                <span
                                  className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${
                                    booking.payment_status === 'cancelled'
                                      ? 'bg-destructive/20 text-destructive'
                                      : 'bg-green-500/20 text-green-600'
                                  }`}
                                >
                                  {booking.payment_status === 'cancelled' ? 'Cancelled' : 'Completed'}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">
                                {new Date(booking.showtime).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {booking.seats?.join(', ') || 'N/A'} • {formatCurrency(booking.total_amount || 0)}
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

        {/* Ticket Modal */}
        {selectedTicket && (
          <TicketModal
            isOpen={!!selectedTicket}
            onClose={() => setSelectedTicket(null)}
            booking={{
              id: selectedTicket.id,
              movie_title: selectedTicket.movie_title,
              movie_poster: selectedTicket.movie_poster,
              theater_name: selectedTicket.theater_name,
              screen_name: selectedTicket.screen_name,
              showtime: selectedTicket.showtime,
              seats: selectedTicket.seats,
              total_amount: selectedTicket.total_amount,
              qr_code: selectedTicket.qr_code,
              status: selectedTicket.payment_status,
            }}
          />
        )}
      </div>
    </>
  );
};

export default Bookings;
