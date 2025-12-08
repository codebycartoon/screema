import { Film, Search, User, Ticket, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

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
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="w-5 h-5" />
            </Button>
            
            {loading ? (
              <Button variant="ghost" size="icon" disabled>
                <Loader2 className="w-5 h-5 animate-spin" />
              </Button>
            ) : user ? (
              <>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/bookings">
                    <Ticket className="w-5 h-5" />
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="cinema" size="sm" className="hidden sm:flex">
                      <User className="w-4 h-4" />
                      Account
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/bookings" className="cursor-pointer">
                        <Ticket className="w-4 h-4 mr-2" />
                        My Bookings
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
                <Button variant="ghost" size="icon">
                  <Ticket className="w-5 h-5" />
                </Button>
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
    </header>
  );
};

export default Header;
