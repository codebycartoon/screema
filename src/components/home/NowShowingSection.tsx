import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import NowShowingCard from "@/components/movies/NowShowingCard";
import { getNowShowingHero } from "@/data/movies";

const NowShowingSection = () => {
  const nowShowingMovies = getNowShowingHero();

  return (
    <section className="py-16 bg-gradient-to-b from-background to-card/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Now <span className="text-gradient">Showing</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Catch the hottest movies in theaters today
            </p>
          </div>

          <Link to="/movies/now-showing">
            <Button variant="outline" className="shrink-0">
              View All Now Showing
            </Button>
          </Link>
        </div>

        {/* Carousel */}
        <Carousel
          itemWidth={280}
          mobileItemWidth={200}
          gap={24}
          className="px-4 -mx-4"
        >
          {nowShowingMovies.map((movie) => (
            <NowShowingCard key={movie.id} movie={movie} />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default NowShowingSection;