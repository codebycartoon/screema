import { useState, useEffect } from "react";
import { Star, Clock, Users, ChevronLeft, ChevronRight, Calendar, Play, Sparkles, Bell, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { getNowShowingHero, getComingSoonHero, getOffersHero, HeroMovie, ComingSoonMovie, Offer } from "@/data/movies";

type HeroSlide = (HeroMovie & { type: 'now-showing' }) | (ComingSoonMovie & { type: 'coming-soon' }) | (Offer & { type: 'offer' });

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // Create prioritized mixed content feed
  const createHeroSlides = (): HeroSlide[] => {
    const nowShowing = getNowShowingHero().slice(0, 3).map(item => ({ ...item, type: 'now-showing' as const }));
    const comingSoon = getComingSoonHero().slice(0, 2).map(item => ({ ...item, type: 'coming-soon' as const }));
    const offers = getOffersHero().slice(0, 2).map(item => ({ ...item, type: 'offer' as const }));

    // Priority stack: Active Offers → Now Showing → Coming Soon
    return [
      ...offers,      // Highest conversion
      ...nowShowing,  // Currently playable
      ...comingSoon   // Hype builder
    ];
  };

  const slides = createHeroSlides();
  const currentSlide = slides[currentIndex];

  // Autoplay with progress indicator
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentIndex(current => (current + 1) % slides.length);
          return 0;
        }
        return prev + 2; // 5 seconds total (100 / 2 = 50 intervals of 100ms)
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setProgress(0);
  };

  const handleSlideClick = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const getSeatAvailabilityColor = (availability: 'high' | 'medium' | 'low') => {
    switch (availability) {
      case 'high': return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'medium': return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'low': return 'bg-red-500/15 text-red-400 border-red-500/30';
    }
  };

  const renderNowShowingSlide = (movie: HeroMovie) => (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with cinematic tone */}
      <div className="absolute inset-0">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/40" />
        <div className="absolute inset-0 bg-black/20" /> {/* Darker cinematic tone */}
      </div>

      <div className="relative container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Self-identifying badge */}
          <div className="flex items-center gap-3 mb-8">
            <Badge className="bg-red-500/15 text-red-400 border-red-500/30 px-4 py-2 text-sm font-medium">
              🔴 NOW SHOWING
            </Badge>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-semibold text-foreground">{movie.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{movie.duration}m</span>
              </div>
              {movie.nextShowtime && (
                <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">
                  Next: {movie.nextShowtime}
                </Badge>
              )}
            </div>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[0.9] tracking-tight">
            {movie.title}
          </h1>

          {/* One-line hook, not synopsis */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
            {movie.description.split('.')[0]}.
          </p>

          {/* Pricing and availability */}
          <div className="flex items-center gap-6 mb-10">
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-muted-foreground">From</span>
              <span className="text-3xl font-bold text-primary">KES {movie.fromPrice}</span>
            </div>
            <Badge 
              variant="outline" 
              className={`${getSeatAvailabilityColor(movie.seatAvailability)} px-3 py-1`}
            >
              <Users className="w-4 h-4 mr-2" />
              {movie.seatAvailability === 'high' ? 'Great availability' : 
               movie.seatAvailability === 'medium' ? 'Limited seats' : 'Few seats left'}
            </Badge>
          </div>

          {/* Context-aware CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={`/movie/${movie.id}`}>
              <Button variant="cinema" size="xl" className="min-w-[180px] h-14 text-lg font-semibold">
                Book Tickets
              </Button>
            </Link>
            <Link to={`/movie/${movie.id}`}>
              <Button variant="outline" size="xl" className="min-w-[180px] h-14 text-lg border-2">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Side poster */}
      <div className="hidden xl:block absolute right-8 bottom-16 w-80">
        <div className="relative">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-700"
          />
        </div>
      </div>
    </div>
  );

  const renderComingSoonSlide = (movie: ComingSoonMovie) => (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with brighter/softer overlay */}
      <div className="absolute inset-0">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/75 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-background/30" />
        <div className="absolute inset-0 bg-blue-500/5" /> {/* Brighter/softer overlay */}
      </div>

      <div className="relative container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Self-identifying badge */}
          <div className="flex items-center gap-3 mb-8">
            <Badge className="bg-blue-500/15 text-blue-400 border-blue-500/30 px-4 py-2 text-sm font-medium">
              🔵 COMING SOON
            </Badge>
            <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">
              {new Date(movie.releaseDate).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </Badge>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[0.9] tracking-tight">
            {movie.title}
          </h1>

          {/* Genre tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genre.slice(0, 3).map(genre => (
              <Badge key={genre} variant="secondary" className="px-3 py-1 text-sm">
                {genre}
              </Badge>
            ))}
          </div>

          {/* One-line hook */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl">
            {movie.description.split('.')[0]}.
          </p>

          {/* Context-aware CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={`/movie/${movie.id}`}>
              <Button variant="cinema" size="xl" className="min-w-[180px] h-14 text-lg font-semibold">
                <Bell className="w-5 h-5 mr-2" />
                Notify Me
              </Button>
            </Link>
            <Link to={`/movie/${movie.id}`}>
              <Button variant="outline" size="xl" className="min-w-[180px] h-14 text-lg border-2">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Side poster */}
      <div className="hidden xl:block absolute right-8 bottom-16 w-80">
        <div className="relative">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-700"
          />
        </div>
      </div>
    </div>
  );

  const renderOfferSlide = (offer: Offer) => (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with accent color strip */}
      <div className="absolute inset-0">
        <img
          src={offer.backdrop}
          alt={offer.headline}
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/40" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent" /> {/* Accent strip */}
      </div>

      <div className="relative container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Self-identifying badge */}
          <Badge className="bg-yellow-500/15 text-yellow-400 border-yellow-500/30 px-4 py-2 text-sm font-medium mb-8">
            🟡 LIMITED OFFER
          </Badge>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[0.9] tracking-tight">
            {offer.headline}
          </h1>

          {/* Value proposition - one-line hook */}
          <div className="mb-10">
            <p className="text-2xl md:text-4xl font-bold text-accent mb-2">
              {offer.value}
            </p>
            <p className="text-lg text-muted-foreground">
              {offer.expiry}
            </p>
          </div>

          {/* Context-aware CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/offers">
              <Button variant="cinema" size="xl" className="min-w-[200px] h-14 text-lg font-semibold">
                <Gift className="w-5 h-5 mr-2" />
                Redeem Offer
              </Button>
            </Link>
            <Link to="/offers">
              <Button variant="outline" size="xl" className="min-w-[180px] h-14 text-lg border-2">
                See Terms
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentSlide = () => {
    if (!currentSlide) return null;

    switch (currentSlide.type) {
      case 'now-showing':
        return renderNowShowingSlide(currentSlide as HeroMovie);
      case 'coming-soon':
        return renderComingSoonSlide(currentSlide as ComingSoonMovie);
      case 'offer':
        return renderOfferSlide(currentSlide as Offer);
      default:
        return null;
    }
  };

  return (
    <section 
      className="relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Carousel Content */}
      {renderCurrentSlide()}

      {/* Navigation Controls - Bottom left grouped without container */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-8 z-30">
          <div className="flex items-center gap-4">
            {/* Left Arrow */}
            <button
              onClick={handlePrevious}
              className="p-3 rounded-full bg-background/20 backdrop-blur-xl border border-white/10 hover:bg-background/30 hover:scale-105 transition-all duration-300 opacity-80 hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Progress Dots Container */}
            <div className="flex gap-2 bg-background/15 backdrop-blur-xl rounded-full px-4 py-2 border border-white/10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideClick(index)}
                  className="relative w-2 h-2 group"
                >
                  {/* Background dot */}
                  <div className="w-full h-full rounded-full bg-white/25 group-hover:bg-white/40 transition-colors" />
                  
                  {/* Progress indicator for current dot */}
                  {index === currentIndex && (
                    <div className="absolute inset-0">
                      {/* Progress ring */}
                      <svg 
                        className="absolute -inset-1 w-4 h-4 -rotate-90" 
                        viewBox="0 0 16 16"
                      >
                        <circle
                          cx="8"
                          cy="8"
                          r="6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="text-primary/60"
                          strokeDasharray={`${(progress / 100) * 37.7} 37.7`}
                          strokeLinecap="round"
                        />
                      </svg>
                      {/* Center dot */}
                      <div className="w-full h-full rounded-full bg-primary" />
                    </div>
                  )}
                  
                  {/* Completed dots */}
                  {index < currentIndex && (
                    <div className="absolute inset-0 w-full h-full rounded-full bg-primary/80" />
                  )}
                </button>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-background/20 backdrop-blur-xl border border-white/10 hover:bg-background/30 hover:scale-105 transition-all duration-300 opacity-80 hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroCarousel;