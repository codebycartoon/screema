import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import { NotificationProvider } from "@/hooks/useNotifications";
import ScrollToTop from "@/components/ui/scroll-to-top";
import Index from "./pages/Index";
import Movies from "./pages/Movies";
import Cinemas from "./pages/Cinemas";
import Offers from "./pages/Offers";
import Rewards from "./pages/RewardsPage";
import MovieDetail from "./pages/MovieDetail";
import Auth from "./pages/Auth";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Watchlist from "./pages/Watchlist";
import Support from "./pages/Support";
import Notifications from "./pages/Notifications";
import MyCinemaPoints from "./pages/MyCinemaPoints";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NotificationProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/movies/now-showing" element={<Movies />} />
                <Route path="/movies/coming-soon" element={<Movies />} />
                <Route path="/cinemas" element={<Cinemas />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/my-cinema-points" element={<MyCinemaPoints />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/support" element={<Support />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </NotificationProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
