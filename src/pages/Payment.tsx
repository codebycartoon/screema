import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Smartphone, Wallet, Check, Loader2, ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet-async';

interface BookingData {
  movieId: string;
  movieTitle: string;
  moviePoster: string;
  theaterName: string;
  screenName: string;
  showtime: Date;
  seats: string[];
  totalAmount: number;
}

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const bookingData = location.state as BookingData | null;

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth', { state: { from: location } });
    }
  }, [user, authLoading, navigate, location]);

  useEffect(() => {
    if (!bookingData) {
      navigate('/');
    }
  }, [bookingData, navigate]);

  if (authLoading || !bookingData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handlePayment = async () => {
    console.log('Payment started', { bookingData, user });
    setIsProcessing(true);

    try {
      // Validate data
      if (!bookingData) {
        throw new Error('No booking data found. Please select seats again.');
      }
      
      if (!user) {
        throw new Error('Please sign in to complete booking.');
      }

      if (!bookingData.seats || bookingData.seats.length === 0) {
        throw new Error('No seats selected. Please select seats.');
      }

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate QR code
      const qrCode = `QR-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;
      
      // Create booking object
      const newBooking = {
        id: Date.now().toString(),
        user_id: user.id,
        movie_title: bookingData.movieTitle || 'Unknown Movie',
        movie_poster: bookingData.moviePoster || '',
        theater_name: bookingData.theaterName || 'Unknown Theater',
        screen_name: bookingData.screenName || 'Unknown Screen',
        showtime: bookingData.showtime ? bookingData.showtime.toISOString() : new Date().toISOString(),
        seats: bookingData.seats,
        total_amount: (bookingData.totalAmount || 0) + 1.5, // Include service fee
        payment_status: 'paid',
        payment_method: paymentMethod,
        qr_code: qrCode,
        status: 'confirmed',
        created_at: new Date().toISOString(),
      };
      
      console.log('Saving booking:', newBooking);
      
      // Store booking in localStorage for demo
      const existingBookings = JSON.parse(localStorage.getItem('demo_bookings') || '[]');
      existingBookings.push(newBooking);
      localStorage.setItem('demo_bookings', JSON.stringify(existingBookings));

      console.log('Booking saved successfully');

      toast({
        title: 'Payment Successful! 🎉',
        description: 'Your tickets have been booked. Check your bookings for the QR code.',
      });

      // Navigate to bookings
      setTimeout(() => {
        navigate('/bookings');
      }, 500);
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment Failed',
        description: error?.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const serviceFee = 1.5;
  const grandTotal = bookingData.totalAmount + serviceFee;

  return (
    <>
      <Helmet>
        <title>Payment | SCREEMA</title>
        <meta name="description" content="Complete your booking payment securely." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <div className="grid md:grid-cols-[1fr_360px] gap-8">
              {/* Payment Form */}
              <div className="glass rounded-2xl p-6 border border-border/50">
                <h1 className="font-display text-2xl font-bold mb-6">Payment Details</h1>

                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid grid-cols-3 gap-4 mb-8"
                >
                  <Label
                    htmlFor="card"
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-primary bg-primary/10'
                        : 'border-border/50 hover:border-primary/50'
                    }`}
                  >
                    <RadioGroupItem value="card" id="card" className="sr-only" />
                    <CreditCard className="w-6 h-6" />
                    <span className="text-sm font-medium">Card</span>
                  </Label>

                  <Label
                    htmlFor="wallet"
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'wallet'
                        ? 'border-primary bg-primary/10'
                        : 'border-border/50 hover:border-primary/50'
                    }`}
                  >
                    <RadioGroupItem value="wallet" id="wallet" className="sr-only" />
                    <Wallet className="w-6 h-6" />
                    <span className="text-sm font-medium">Wallet</span>
                  </Label>

                  <Label
                    htmlFor="upi"
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-primary bg-primary/10'
                        : 'border-border/50 hover:border-primary/50'
                    }`}
                  >
                    <RadioGroupItem value="upi" id="upi" className="sr-only" />
                    <Smartphone className="w-6 h-6" />
                    <span className="text-sm font-medium">UPI</span>
                  </Label>
                </RadioGroup>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="4242 4242 4242 4242"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        maxLength={19}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(formatExpiry(e.target.value))}
                          maxLength={5}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          maxLength={4}
                          type="password"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'wallet' && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Wallet className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Demo wallet payment - Click "Pay Now" to simulate</p>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        placeholder="yourname@upi"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-6 p-3 rounded-lg bg-muted/50">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-muted-foreground">
                    Your payment is secured with 256-bit SSL encryption
                  </span>
                </div>
              </div>

              {/* Order Summary */}
              <div className="glass rounded-2xl p-6 border border-border/50 h-fit">
                <h2 className="font-display text-xl font-bold mb-4">Order Summary</h2>

                <div className="flex gap-4 mb-6">
                  <img
                    src={bookingData.moviePoster}
                    alt={bookingData.movieTitle}
                    className="w-20 h-28 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold">{bookingData.movieTitle}</h3>
                    <p className="text-sm text-muted-foreground">{bookingData.theaterName}</p>
                    <p className="text-sm text-muted-foreground">{bookingData.screenName}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(bookingData.showtime).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}{' '}
                      •{' '}
                      {new Date(bookingData.showtime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Seats: </span>
                    <span className="font-medium">{bookingData.seats.join(', ')}</span>
                  </p>
                </div>

                <div className="border-t border-border/50 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tickets ({bookingData.seats.length})</span>
                    <span>${bookingData.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span>${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-border/50">
                    <span>Total</span>
                    <span className="text-primary">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  variant="cinema"
                  className="w-full mt-6"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Pay ${grandTotal.toFixed(2)}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Payment;
