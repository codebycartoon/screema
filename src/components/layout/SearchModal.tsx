import { useState, useEffect } from "react";
import { Search, Film, MapPin, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { movies, theaters } from "@/data/movies";
import { Movie, Theater } from "@/types/cinema";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SearchResults {
  movies: Movie[];
  theaters: Theater[];
}

const SearchModal = ({ open, onOpenChange }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>({ movies: [], theaters: [] });
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults({ movies: [], theaters: [] });
      return;
    }

    setIsSearching(true);
    const timeoutId = setTimeout(() => {
      performSearch(query);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const performSearch = (searchQuery: string) => {
    const lowerQuery = searchQuery.toLowerCase();
    
    // Search movies
    const movieResults = movies.filter(movie => 
      movie.title.toLowerCase().includes(lowerQuery) ||
      movie.genre.some(g => g.toLowerCase().includes(lowerQuery)) ||
      movie.director.toLowerCase().includes(lowerQuery) ||
      movie.cast.some(c => c.toLowerCase().includes(lowerQuery))
    );

    // Search theaters
    const theaterResults = theaters.filter(theater =>
      theater.name.toLowerCase().includes(lowerQuery) ||
      theater.location.toLowerCase().includes(lowerQuery)
    );

    setResults({ movies: movieResults, theaters: theaterResults });
  };

  const handleClose = () => {
    setQuery("");
    setResults({ movies: [], theaters: [] });
    onOpenChange(false);
  };

  const hasResults = results.movies.length > 0 || results.theaters.length > 0;
  const showEmptyState = query.trim() && !isSearching && !hasResults;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="sr-only">Search Movies and Cinemas</DialogTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search movies, genres, directors, or cinemas..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10 h-12 text-base"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuery("")}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {isSearching && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          )}

          {showEmptyState && (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No results found for "{query}"</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try searching for movie titles, genres, directors, or cinema names
              </p>
            </div>
          )}

          {hasResults && (
            <div className="space-y-6">
              {/* Movies Results */}
              {results.movies.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Film className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold">Movies ({results.movies.length})</h3>
                  </div>
                  <div className="space-y-3">
                    {results.movies.slice(0, 5).map((movie) => (
                      <Link
                        key={movie.id}
                        to={`/movie/${movie.id}`}
                        onClick={handleClose}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="w-12 h-16 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-1">
                            {movie.title}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {movie.genre.join(", ")} • {movie.duration} min
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              ★ {movie.rating}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {movie.director}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Theaters Results */}
              {results.theaters.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold">Cinemas ({results.theaters.length})</h3>
                  </div>
                  <div className="space-y-3">
                    {results.theaters.map((theater) => (
                      <div
                        key={theater.id}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium">{theater.name}</h4>
                          <p className="text-sm text-muted-foreground">{theater.location}</p>
                          <div className="flex gap-1 mt-1">
                            {theater.screens.map((screen) => (
                              <Badge key={screen.id} variant="outline" className="text-xs">
                                {screen.type}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {!query.trim() && (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Start typing to search</p>
              <p className="text-sm text-muted-foreground mt-1">
                Find movies, genres, directors, or cinema locations
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;