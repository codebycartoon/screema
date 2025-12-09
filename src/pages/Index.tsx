import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import MovieGrid from "@/components/home/MovieGrid";
import ComingSoonSection from "@/components/home/ComingSoonSection";
import FeaturesSection from "@/components/home/FeaturesSection";
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
          <HeroSection />
          <MovieGrid />
          <ComingSoonSection />
          <FeaturesSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
