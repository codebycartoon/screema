import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockNotifications, mockMovieNotifications, mockWatchlist, mockBookings } from '@/data/dashboard';

interface NotificationContextType {
  unreadNotifications: number;
  unreadMovieNotifications: number;
  watchlistBadge: number;
  cancelledBookingsBadge: number;
  markNotificationsAsRead: () => void;
  markMovieNotificationsAsRead: () => void;
  visitedTabs: Set<string>;
  markTabAsVisited: (tab: string) => void;
  removeFromWatchlist: (id: string) => void;
  addToWatchlist: (movieId: string, movieTitle: string, moviePoster: string) => void;
  cancelBooking: (id: string) => void;
  watchlistItems: typeof mockWatchlist;
  bookings: typeof mockBookings;
  resetAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [visitedTabs, setVisitedTabs] = useState<Set<string>>(new Set());
  const [notificationsRead, setNotificationsRead] = useState(false);
  const [movieNotificationsRead, setMovieNotificationsRead] = useState(false);
  const [watchlistItems, setWatchlistItems] = useState(mockWatchlist);
  const [bookings, setBookings] = useState(mockBookings);

  // Calculate unread counts based on visited status
  const unreadNotifications = notificationsRead || visitedTabs.has('notifications') 
    ? 0 
    : mockNotifications.filter(n => !n.isRead).length;
    
  const unreadMovieNotifications = movieNotificationsRead || visitedTabs.has('movie-notifications')
    ? 0 
    : mockMovieNotifications.filter(n => !n.isRead).length;

  // Show badge for watchlist and cancelled bookings until visited
  const watchlistBadge = visitedTabs.has('watchlist') ? 0 : watchlistItems.length;
  const cancelledBookingsBadge = visitedTabs.has('cancelled') ? 0 : bookings.filter(b => b.status === 'cancelled').length;

  const markNotificationsAsRead = () => {
    setNotificationsRead(true);
  };

  const markMovieNotificationsAsRead = () => {
    setMovieNotificationsRead(true);
  };

  const markTabAsVisited = (tab: string) => {
    setVisitedTabs(prev => new Set([...prev, tab]));
  };

  const removeFromWatchlist = (id: string) => {
    setWatchlistItems(prev => prev.filter(item => item.id !== id));
  };

  const addToWatchlist = (movieId: string, movieTitle: string, moviePoster: string) => {
    // Check if movie is already in watchlist to prevent duplicates
    const isAlreadyInWatchlist = watchlistItems.some(item => item.movieId === movieId);
    if (isAlreadyInWatchlist) {
      return; // Don't add if already exists
    }

    const newItem = {
      id: `watch-${Date.now()}`,
      movieId,
      movieTitle,
      moviePoster,
      releaseDate: new Date(), // For now showing movies, they're already released
      genre: ['Action'], // Default genre, in real app this would come from movie data
      rating: 8.0, // Default rating
      addedAt: new Date(),
      status: 'now_showing' as const
    };
    setWatchlistItems(prev => [...prev, newItem]);
  };

  const cancelBooking = (id: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id ? { ...booking, status: 'cancelled' as const } : booking
    ));
  };

  // Load visited tabs from localStorage on mount
  useEffect(() => {
    const savedVisitedTabs = localStorage.getItem('visitedTabs');
    if (savedVisitedTabs) {
      try {
        const parsed = JSON.parse(savedVisitedTabs);
        setVisitedTabs(new Set(parsed));
      } catch (error) {
        console.error('Error parsing visited tabs:', error);
      }
    }
  }, []);

  // Save visited tabs to localStorage
  useEffect(() => {
    localStorage.setItem('visitedTabs', JSON.stringify([...visitedTabs]));
  }, [visitedTabs]);

  const resetAllNotifications = () => {
    setVisitedTabs(new Set());
    setNotificationsRead(false);
    setMovieNotificationsRead(false);
    setWatchlistItems(mockWatchlist);
    setBookings(mockBookings);
    localStorage.removeItem('visitedTabs');
  };

  return (
    <NotificationContext.Provider value={{
      unreadNotifications,
      unreadMovieNotifications,
      watchlistBadge,
      cancelledBookingsBadge,
      markNotificationsAsRead,
      markMovieNotificationsAsRead,
      visitedTabs,
      markTabAsVisited,
      removeFromWatchlist,
      addToWatchlist,
      cancelBooking,
      watchlistItems,
      bookings,
      resetAllNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};