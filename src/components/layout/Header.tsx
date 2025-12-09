import { useState } from "react";
import { Film, Search, User, LogOut, Loader2, LayoutDashboard, Settings, HelpCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { movies } from "@/data/movies";

const Header = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Film className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-display text-xl font-semibold tracking-tight">
              SCREE<span className="text-primary">MA</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Now Showing
            </Link>
            <Link 
              to="/coming-soon" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Coming Soon
            </Link>
            <Link 
              to="/theaters" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Theaters
            </Link>
            <Link 
              to="/offers" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Offers
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden md:flex"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
            </Button>
            
            {loading ? (
              <Button variant="ghost" size="icon" disabled>
                <Loader2 className="w-5 h-5 animate-spin" />
              </Button>
            ) : user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="cinema" size="sm" className="hidden sm:flex min-w-[120px] justify-start">
                      <User className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">
                        {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Account'}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/bookings" className="cursor-pointer">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <Settings className="w-4 h-4 mr-2" />
                        Profile Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/help" className="cursor-pointer">
                        <HelpCircle className="w-4 h-4 mr-2" />
                        Help & Support
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="cinema" size="sm" className="hidden sm:flex" asChild>
                  <Link to="/auth">
                    <User className="w-4 h-4" />
                    Sign In
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Search Movies</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search for movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Search Results */}
            <div className="max-h-[400px] overflow-y-auto space-y-2">
              {searchQuery.trim() === "" ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Start typing to search for movies</p>
                </div>
              ) : (
                <>
                  {movies
                    .filter((movie) =>
                      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      movie.genre.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
                      movie.description.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((movie) => (
                      <button
                        key={movie.id}
                        onClick={() => {
                          navigate(`/movie/${movie.id}`);
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-colors text-left"
                      >
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="w-16 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{movie.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {movie.genre.join(", ")} • {movie.duration} min
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary font-medium">
                              ⭐ {movie.rating}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {movie.releaseDate}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  
                  {movies.filter((movie) =>
                    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    movie.genre.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    movie.description.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No movies found for "{searchQuery}"</p>
                      <p className="text-sm mt-2">Try searching with different keywords</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
