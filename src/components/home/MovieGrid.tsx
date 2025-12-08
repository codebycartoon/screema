import { movies } from "@/data/movies";
import MovieCard from "@/components/movies/MovieCard";
import { useState } from "react";
import { cn } from "@/lib/utils";

const genres = ["All", "Sci-Fi", "Action", "Drama", "Adventure", "Thriller"];

const MovieGrid = () => {
  const [selectedGenre, setSelectedGenre] = useState("All");

  const filteredMovies = selectedGenre === "All"
    ? movies
    : movies.filter(movie => movie.genre.includes(selectedGenre));

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Now <span className="text-gradient">Showing</span>
            </h2>
            <p className="text-muted-foreground">
              Book your favorite movies playing near you
            </p>
          </div>

          {/* Genre Filters */}
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  selectedGenre === genre
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-secondary hover:bg-secondary/80"
                )}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredMovies.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieGrid;
