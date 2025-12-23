export interface UserTier {
  id: string;
  name: string;
  minPoints: number;
  maxPoints: number;
  color: string;
  bgColor: string;
  icon: string;
  benefits: string[];
}

export interface Booking {
  id: string;
  movieId: string;
  movieTitle: string;
  moviePoster: string;
  theaterName: string;
  screenName: string;
  showtime: Date;
  seats: string[];
  snacks?: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  bookingDate: Date;
  qrCode?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'system' | 'booking' | 'promotion' | 'account';
  isRead: boolean;
  createdAt: Date;
  icon?: string;
}

export interface MovieNotification {
  id: string;
  movieId: string;
  movieTitle: string;
  moviePoster: string;
  releaseDate: Date;
  message: string;
  type: 'release' | 'trailer' | 'tickets_available';
  isRead: boolean;
  createdAt: Date;
}

export interface WatchlistItem {
  id: string;
  movieId: string;
  movieTitle: string;
  moviePoster: string;
  releaseDate: Date;
  genre: string[];
  rating?: number;
  addedAt: Date;
  status: 'coming_soon' | 'now_showing';
}

export const userTiers: UserTier[] = [
  // Bronze Tier (III → II → I)
  {
    id: 'bronze-iii',
    name: 'Bronze III',
    minPoints: 0,
    maxPoints: 299,
    color: 'text-amber-700',
    bgColor: 'bg-card',
    icon: '🟤',
    benefits: ['5 points per KES 100', 'Basic email updates', 'Standard booking']
  },
  {
    id: 'bronze-ii',
    name: 'Bronze II',
    minPoints: 300,
    maxPoints: 599,
    color: 'text-amber-600',
    bgColor: 'bg-card',
    icon: '🟤',
    benefits: ['7 points per KES 100', 'Birthday bonus', 'Email updates']
  },
  {
    id: 'bronze-i',
    name: 'Bronze I',
    minPoints: 600,
    maxPoints: 999,
    color: 'text-amber-600',
    bgColor: 'bg-card',
    icon: '🟤',
    benefits: ['10 points per KES 100', 'Birthday bonus', 'Priority email updates']
  },
  
  // Silver Tier (III → II → I)
  {
    id: 'silver-iii',
    name: 'Silver III',
    minPoints: 1000,
    maxPoints: 1499,
    color: 'text-slate-600',
    bgColor: 'bg-card',
    icon: '⚪',
    benefits: ['12 points per KES 100', 'Priority booking window', 'Exclusive monthly offers']
  },
  {
    id: 'silver-ii',
    name: 'Silver II',
    minPoints: 1500,
    maxPoints: 1999,
    color: 'text-slate-500',
    bgColor: 'bg-card',
    icon: '⚪',
    benefits: ['14 points per KES 100', 'Priority booking', 'Free birthday ticket', 'Exclusive offers']
  },
  {
    id: 'silver-i',
    name: 'Silver I',
    minPoints: 2000,
    maxPoints: 2499,
    color: 'text-slate-500',
    bgColor: 'bg-card',
    icon: '⚪',
    benefits: ['15 points per KES 100', 'Advanced priority booking', 'Free birthday ticket', 'Weekly offers']
  },

  // Gold Tier (III → II → I)
  {
    id: 'gold-iii',
    name: 'Gold III',
    minPoints: 2500,
    maxPoints: 3499,
    color: 'text-yellow-600',
    bgColor: 'bg-card',
    icon: '🟡',
    benefits: ['18 points per KES 100', 'VIP booking access', 'Monthly free snacks', 'Premium support']
  },
  {
    id: 'gold-ii',
    name: 'Gold II',
    minPoints: 3500,
    maxPoints: 4499,
    color: 'text-yellow-500',
    bgColor: 'bg-card',
    icon: '🟡',
    benefits: ['20 points per KES 100', 'VIP booking access', 'Bi-weekly free snacks', 'Premium support']
  },
  {
    id: 'gold-i',
    name: 'Gold I',
    minPoints: 4500,
    maxPoints: 4999,
    color: 'text-yellow-500',
    bgColor: 'bg-card',
    icon: '🟡',
    benefits: ['22 points per KES 100', 'Advanced VIP access', 'Weekly free snacks', 'Premium support']
  },

  // Platinum Tier (III → II → I)
  {
    id: 'platinum-iii',
    name: 'Platinum III',
    minPoints: 5000,
    maxPoints: 6999,
    color: 'text-cyan-600',
    bgColor: 'bg-card',
    icon: '⭐',
    benefits: ['25 points per KES 100', 'Platinum lounge access', 'Free monthly tickets', 'Personal concierge']
  },
  {
    id: 'platinum-ii',
    name: 'Platinum II',
    minPoints: 7000,
    maxPoints: 8499,
    color: 'text-cyan-500',
    bgColor: 'bg-card',
    icon: '⭐',
    benefits: ['27 points per KES 100', 'Platinum lounge access', 'Bi-weekly free tickets', 'Personal concierge']
  },
  {
    id: 'platinum-i',
    name: 'Platinum I',
    minPoints: 8500,
    maxPoints: 9999,
    color: 'text-cyan-500',
    bgColor: 'bg-card',
    icon: '⭐',
    benefits: ['30 points per KES 100', 'Advanced platinum access', 'Weekly free tickets', 'Priority concierge']
  },

  // Diamond Tier (III → II → I)
  {
    id: 'diamond-iii',
    name: 'Diamond III',
    minPoints: 10000,
    maxPoints: 12999,
    color: 'text-blue-600',
    bgColor: 'bg-card',
    icon: '💎',
    benefits: ['35 points per KES 100', 'Diamond lounge access', 'Unlimited monthly tickets', 'Private screenings']
  },
  {
    id: 'diamond-ii',
    name: 'Diamond II',
    minPoints: 13000,
    maxPoints: 15999,
    color: 'text-blue-500',
    bgColor: 'bg-card',
    icon: '💎',
    benefits: ['40 points per KES 100', 'Diamond lounge access', 'Unlimited tickets', 'Weekly private screenings']
  },
  {
    id: 'diamond-i',
    name: 'Diamond I',
    minPoints: 16000,
    maxPoints: 19999,
    color: 'text-blue-500',
    bgColor: 'bg-card',
    icon: '💎',
    benefits: ['45 points per KES 100', 'Elite diamond access', 'Unlimited everything', 'On-demand screenings']
  },

  // Elite Tier
  {
    id: 'elite',
    name: 'Elite',
    minPoints: 20000,
    maxPoints: 29999,
    color: 'text-purple-600',
    bgColor: 'bg-card',
    icon: '👑',
    benefits: ['50 points per KES 100', 'Elite crown lounge', 'VIP red carpet events', 'Celebrity meet & greets', 'Custom experiences']
  },

  // Champion Tier
  {
    id: 'champion',
    name: 'Champion',
    minPoints: 30000,
    maxPoints: 49999,
    color: 'text-red-600',
    bgColor: 'bg-card',
    icon: '🏆',
    benefits: ['60 points per KES 100', 'Champion wings access', 'Exclusive premieres', 'Director meet & greets', 'Behind-the-scenes access']
  },

  // Unreal Tier
  {
    id: 'unreal',
    name: 'Unreal',
    minPoints: 50000,
    maxPoints: Infinity,
    color: 'text-transparent bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text',
    bgColor: 'bg-card',
    icon: '🌟',
    benefits: ['100 points per KES 100', 'Mythical flame access', 'Private theater ownership', 'Movie production involvement', 'Lifetime legendary status', 'Reality-bending perks']
  }
];

export const getUserTier = (points: number): UserTier => {
  return userTiers.find(tier => points >= tier.minPoints && points <= tier.maxPoints) || userTiers[0];
};

export const getNextTier = (currentPoints: number): UserTier | null => {
  const currentTier = getUserTier(currentPoints);
  const currentIndex = userTiers.findIndex(tier => tier.id === currentTier.id);
  return currentIndex < userTiers.length - 1 ? userTiers[currentIndex + 1] : null;
};

export const getCurrentDivisionTiers = (currentPoints: number): UserTier[] => {
  const currentTier = getUserTier(currentPoints);
  const tierFamily = currentTier.id.split('-')[0]; // bronze, silver, gold, etc.
  
  // For legendary ranks (elite, champion, unreal), return just those 3
  if (['elite', 'champion', 'unreal'].includes(tierFamily)) {
    return userTiers.filter(tier => ['elite', 'champion', 'unreal'].includes(tier.id));
  }
  
  // For regular tiers, return the 3 divisions (III, II, I)
  return userTiers.filter(tier => tier.id.startsWith(tierFamily));
};

// Mock data
export const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    title: 'Booking Confirmed',
    message: 'Your booking for Dune: Part Two has been confirmed. Show starts at 7:30 PM.',
    type: 'booking',
    isRead: false,
    createdAt: new Date('2024-12-22T10:30:00')
  },
  {
    id: 'notif-002',
    title: 'Special Offer',
    message: 'Get 20% off on your next booking! Use code SAVE20. Valid until Dec 31st.',
    type: 'promotion',
    isRead: false,
    createdAt: new Date('2024-12-21T15:00:00')
  },
  {
    id: 'notif-003',
    title: 'Account Update',
    message: 'Your profile has been successfully updated with new contact information.',
    type: 'account',
    isRead: true,
    createdAt: new Date('2024-12-20T09:15:00')
  },
  {
    id: 'notif-004',
    title: 'System Maintenance',
    message: 'Scheduled maintenance on Dec 25th from 2:00 AM to 4:00 AM. Services may be temporarily unavailable.',
    type: 'system',
    isRead: true,
    createdAt: new Date('2024-12-19T14:20:00')
  }
];

export const mockMovieNotifications: MovieNotification[] = [
  {
    id: 'movie-notif-001',
    movieId: '4',
    movieTitle: 'Avatar: The Way of Water',
    moviePoster: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=600&fit=crop',
    releaseDate: new Date('2025-01-15T00:00:00'),
    message: 'Now available for booking! Get your tickets early.',
    type: 'tickets_available',
    isRead: false,
    createdAt: new Date('2024-12-22T08:00:00')
  },
  {
    id: 'movie-notif-002',
    movieId: '5',
    movieTitle: 'The Batman 2',
    moviePoster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop',
    releaseDate: new Date('2025-02-20T00:00:00'),
    message: 'New trailer released! Watch it now.',
    type: 'trailer',
    isRead: false,
    createdAt: new Date('2024-12-21T15:30:00')
  },
  {
    id: 'movie-notif-003',
    movieId: '6',
    movieTitle: 'Guardians of the Galaxy Vol. 3',
    moviePoster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop',
    releaseDate: new Date('2025-03-10T00:00:00'),
    message: 'Coming to theaters March 10th, 2025',
    type: 'release',
    isRead: true,
    createdAt: new Date('2024-12-20T12:00:00')
  }
];

export const mockBookings: Booking[] = [
  {
    id: 'book-001',
    movieId: '1',
    movieTitle: 'Dune: Part Two',
    moviePoster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop',
    theaterName: 'SCREEMA Downtown',
    screenName: 'IMAX Screen 1',
    showtime: new Date('2024-12-25T19:30:00'),
    seats: ['A5', 'A6'],
    snacks: [
      { name: 'Large Popcorn', quantity: 1, price: 400 },
      { name: 'Large Soft Drink', quantity: 2, price: 250 }
    ],
    totalAmount: 1650,
    status: 'confirmed',
    bookingDate: new Date('2024-12-20T10:30:00'),
    qrCode: 'QR001'
  },
  {
    id: 'book-002',
    movieId: '2',
    movieTitle: 'Oppenheimer',
    moviePoster: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=600&fit=crop',
    theaterName: 'SCREEMA Mall Plaza',
    screenName: 'Dolby Screen 2',
    showtime: new Date('2024-12-15T16:00:00'),
    seats: ['B8', 'B9'],
    totalAmount: 1200,
    status: 'completed',
    bookingDate: new Date('2024-12-10T14:20:00')
  },
  {
    id: 'book-003',
    movieId: '3',
    movieTitle: 'Spider-Man: No Way Home',
    moviePoster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop',
    theaterName: 'SCREEMA Westside',
    screenName: '4DX Screen 1',
    showtime: new Date('2024-12-18T21:00:00'),
    seats: ['C5'],
    totalAmount: 800,
    status: 'cancelled',
    bookingDate: new Date('2024-12-16T09:15:00')
  }
];

export const mockWatchlist: WatchlistItem[] = [
  {
    id: 'watch-001',
    movieId: '4',
    movieTitle: 'Avatar: The Way of Water',
    moviePoster: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=600&fit=crop',
    releaseDate: new Date('2025-01-15T00:00:00'),
    genre: ['Sci-Fi', 'Adventure'],
    rating: 8.5,
    addedAt: new Date('2024-12-15T10:00:00'),
    status: 'now_showing'
  },
  {
    id: 'watch-002',
    movieId: '5',
    movieTitle: 'The Batman 2',
    moviePoster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop',
    releaseDate: new Date('2025-02-20T00:00:00'),
    genre: ['Action', 'Crime'],
    addedAt: new Date('2024-12-18T16:30:00'),
    status: 'coming_soon'
  },
  {
    id: 'watch-003',
    movieId: '6',
    movieTitle: 'Guardians of the Galaxy Vol. 3',
    moviePoster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop',
    releaseDate: new Date('2025-03-10T00:00:00'),
    genre: ['Action', 'Comedy', 'Sci-Fi'],
    addedAt: new Date('2024-12-20T14:45:00'),
    status: 'coming_soon'
  }
];