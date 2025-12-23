import { Film, Search, User, Ticket, LogOut, Loader2, Star, Heart, Bell } from "lucide-react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SearchModal from "./SearchModal";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Header = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was a problem signing you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSearchClick = () => {
    setSearchOpen(true);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* LEFT: Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Film className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-display text-xl font-semibold tracking-tight">
              SCREE<span className="text-red-500">MA</span>
            </span>
          </Link>

          {/* MIDDLE: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/movies" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Movies
            </Link>
            <Link 
              to="/cinemas" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Cinemas
            </Link>
            <Link 
              to="/offers" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Offers
            </Link>
            <Link 
              to="/rewards" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Rewards
            </Link>
          </nav>

          {/* RIGHT: Search + Auth */}
          <div className="flex items-center gap-4">
            {/* Search Icon */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSearchClick}
              className="text-muted-foreground hover:text-foreground"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Auth State */}
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            ) : user ? (
              /* Logged In: Profile Avatar */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end" forceMount>
                  {/* User Info Header */}
                  <div className="flex flex-col space-y-1 p-3 border-b border-border">
                    <p className="text-sm font-medium leading-none">
                      {user.user_metadata?.full_name || 'User'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  
                  {/* Main Actions */}
                  <div className="py-1">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">Dashboard</div>
                            <div className="text-xs text-muted-foreground">Bookings & overview</div>
                          </div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem asChild>
                      <Link to="/notifications" className="cursor-pointer">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                            <Bell className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">Notifications</div>
                            <div className="text-xs text-muted-foreground">Movie updates & alerts</div>
                          </div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem asChild>
                      <Link to="/my-cinema-points" className="cursor-pointer">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mr-3">
                            <Star className="h-4 w-4 text-accent" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">My Cinema Points</div>
                            <div className="text-xs text-muted-foreground">⭐ 1,250 points</div>
                          </div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="cursor-pointer">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center mr-3">
                            <User className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="font-medium">Settings</div>
                            <div className="text-xs text-muted-foreground">Account & preferences</div>
                          </div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  </div>
                  
                  {/* Optional Actions */}
                  <div className="py-1 border-t border-border">
                    <DropdownMenuItem asChild>
                      <Link to="/bookings" className="cursor-pointer">
                        <Ticket className="mr-3 h-4 w-4" />
                        <span>Booking History</span>
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem asChild>
                      <Link to="/watchlist" className="cursor-pointer">
                        <Heart className="mr-3 h-4 w-4" />
                        <span>Watchlist</span>
                      </Link>
                    </DropdownMenuItem>
                  </div>
                  
                  {/* Support & Logout */}
                  <DropdownMenuSeparator />
                  <div className="py-1">
                    <DropdownMenuItem asChild>
                      <Link to="/support" className="cursor-pointer text-muted-foreground">
                        <div className="flex items-center text-xs">
                          <div className="w-6 h-6 flex items-center justify-center mr-2">
                            <span>?</span>
                          </div>
                          <span>Help & Support</span>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
                      <LogOut className="mr-3 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Not Logged In: Sign In Button */
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
};

export default Header;