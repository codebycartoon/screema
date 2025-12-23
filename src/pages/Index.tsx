import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroCarousel from "@/components/home/HeroCarousel";
import NowShowingSection from "@/components/home/NowShowingSection";
import ComingSoonSection from "@/components/home/ComingSoonSection";
import ValuePropsSection from "@/components/home/ValuePropsSection";
import CinemaLocationsSection from "@/components/home/CinemaLocationsSection";
import SnacksPromoSection from "@/components/home/SnacksPromoSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import DigitalTicketsSection from "@/components/home/DigitalTicketsSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SCREEMA - Premium Cinema Ticket Booking</title>
        <meta name="description" content="Book movie tickets online at SCREEMA. Choose from IMAX, Dolby, and 4DX experiences. Interactive seat selection, instant e-tickets, and exclusive offers." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroCarousel />
          <NowShowingSection />
          <ComingSoonSection />
          <ValuePropsSection />
          <CinemaLocationsSection />
          <SnacksPromoSection />
          <TestimonialsSection />
          <DigitalTicketsSection />
          <NewsletterSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
