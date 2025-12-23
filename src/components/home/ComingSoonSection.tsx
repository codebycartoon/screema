import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import ComingSoonCard from "@/components/movies/ComingSoonCard";
import { getComingSoonHero } from "@/data/movies";

const ComingSoonSection = () => {
  const comingSoonMovies = getComingSoonHero();

  return (
    <section className="py-16 bg-gradient-to-b from-card/50 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Coming <span className="text-gradient">Soon</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Mark your calendar for these upcoming releases
            </p>
          </div>

          <Link to="/movies/coming-soon">
            <Button variant="outline" className="shrink-0">
              View All Coming Soon
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
          {comingSoonMovies.map((movie) => (
            <ComingSoonCard key={movie.id} movie={movie} />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default ComingSoonSection;