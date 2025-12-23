import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { Navigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import DashboardSidebar, { DashboardTab } from "@/components/dashboard/DashboardSidebar";
import DashboardContent from "@/components/dashboard/DashboardContent";
import TicketModal from "@/components/dashboard/TicketModal";
import { Booking } from "@/data/dashboard";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const { 
    unreadNotifications, 
    unreadMovieNotifications,
    watchlistBadge,
    cancelledBookingsBadge,
    markTabAsVisited,
    watchlistItems,
    bookings
  } = useNotifications();
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  
  // Mock user points - in real app, this would come from user data
  const userPoints = 3250;
  
  // Calculate counts from context
  const watchlistCount = watchlistItems.length;
  const cancelledCount = bookings.filter(b => b.status === 'cancelled').length;

  // Mark tab as visited when it changes
  useEffect(() => {
    if (activeTab !== 'overview') {
      markTabAsVisited(activeTab);
    }
  }, [activeTab, markTabAsVisited]);

  const handleTabChange = (tab: DashboardTab) => {
    setActiveTab(tab);
    // Mark as visited immediately when clicked
    if (tab !== 'overview') {
      markTabAsVisited(tab);
    }
  };

  const handleViewTicket = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsTicketModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex">
          <DashboardSidebar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            userPoints={userPoints}
            notificationCount={unreadNotifications}
            movieNotificationCount={unreadMovieNotifications}
            watchlistCount={watchlistBadge}
            cancelledCount={cancelledBookingsBadge}
          />
          <main className="flex-1 h-[calc(100vh-4rem)] overflow-auto ml-80">
            <DashboardContent 
              activeTab={activeTab}
              onTabChange={handleTabChange}
              userPoints={userPoints}
              onViewTicket={handleViewTicket}
            />
          </main>
        </div>
      </div>
      
      {/* Ticket Modal at absolute root level */}
      <TicketModal
        booking={selectedBooking}
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
      />
    </>
  );
};

export default Dashboard;