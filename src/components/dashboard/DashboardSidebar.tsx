import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Ticket, 
  Bell, 
  Heart, 
  XCircle, 
  Star,
  User,
  Settings,
  LogOut,
  Film
} from "lucide-react";
import { getUserTier, getNextTier } from "@/data/dashboard";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export type DashboardTab = 'overview' | 'bookings' | 'notifications' | 'movie-notifications' | 'watchlist' | 'cancelled' | 'points';

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  userPoints: number;
  notificationCount: number;
  movieNotificationCount: number;
  watchlistCount: number;
  cancelledCount: number;
}

const DashboardSidebar = ({ 
  activeTab, 
  onTabChange, 
  userPoints, 
  notificationCount,
  movieNotificationCount, 
  watchlistCount, 
  cancelledCount
}: DashboardSidebarProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
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
  
  const currentTier = getUserTier(userPoints);
  const nextTier = getNextTier(userPoints);
  const progressToNext = nextTier ? 
    ((userPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100 : 100;

  const menuItems = [
    {
      id: 'overview' as DashboardTab,
      label: 'Overview',
      icon: LayoutDashboard,
      count: 0,
      path: '/dashboard'
    },
    {
      id: 'bookings' as DashboardTab,
      label: 'My Bookings',
      icon: Ticket,
      count: 0,
      path: '/dashboard'
    },
    {
      id: 'notifications' as DashboardTab,
      label: 'Notifications',
      icon: Bell,
      count: movieNotificationCount,
      path: '/notifications'
    },
    {
      id: 'points' as DashboardTab,
      label: 'My Cinema Points',
      icon: Star,
      count: 0,
      path: '/my-cinema-points'
    },
    {
      id: 'watchlist' as DashboardTab,
      label: 'Watchlist',
      icon: Heart,
      count: watchlistCount,
      path: '/watchlist'
    },
    {
      id: 'cancelled' as DashboardTab,
      label: 'Cancelled Bookings',
      icon: XCircle,
      count: cancelledCount,
      path: '/dashboard'
    }
  ];

  return (
    <div className="bg-card border-r border-border/50 w-80 flex flex-col fixed left-0 top-16 bottom-0 z-10">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold">Dashboard</h2>
        </div>

        {/* User Badge */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">
                {user?.user_metadata?.full_name || 'User'}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Tier Badge */}
          <div className={`${currentTier.bgColor} rounded-lg p-4 border border-border/50`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{currentTier.icon}</span>
                <Badge className={`${currentTier.color} bg-transparent border-current`}>
                  {currentTier.name} Member
                </Badge>
              </div>
              <span className="text-sm font-bold">{userPoints.toLocaleString()}</span>
            </div>
            
            {nextTier && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress to {nextTier.name}</span>
                  <span>{nextTier.minPoints - userPoints} points to go</span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(progressToNext, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = (item.path === '/dashboard' && activeTab === item.id) || 
                          (item.path !== '/dashboard' && location.pathname === item.path);
          
          if (item.path === '/dashboard') {
            // Dashboard internal navigation
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1 text-left font-medium">{item.label}</span>
                {item.count > 0 && (
                  <Badge 
                    variant={isActive ? "secondary" : "default"}
                    className="text-xs"
                  >
                    {item.count}
                  </Badge>
                )}
              </button>
            );
          } else {
            // External page navigation
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1 text-left font-medium">{item.label}</span>
                {item.count > 0 && (
                  <Badge 
                    variant={isActive ? "secondary" : "default"}
                    className="text-xs"
                  >
                    {item.count}
                  </Badge>
                )}
              </Link>
            );
          }
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border/50 space-y-2">
        <Link
          to="/settings"
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            location.pathname === '/settings'
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
              : 'hover:bg-muted text-muted-foreground hover:text-foreground'
          }`}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          <span className="flex-1 text-left">Settings</span>
        </Link>
        
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className="flex-1 text-left">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;