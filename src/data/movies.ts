import { Movie, Showtime, Theater } from "@/types/cinema";

// Hero carousel data types
export interface HeroMovie extends Movie {
  nextShowtime?: string;
  seatAvailability: 'high' | 'medium' | 'low';
  fromPrice: number;
  trailerUrl?: string;
}

export interface ComingSoonMovie extends Movie {
  trailerUrl?: string;
}

export interface Offer {
  id: string;
  headline: string;
  value: string;
  expiry: string;
  badge: string;
  isActive: boolean;
  isPublic: boolean;
  backdrop: string;
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "Dune: Part Two",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    rating: 8.8,
    duration: 166,
    releaseDate: "2024-03-01",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
    language: "English"
  },
  {
    id: "2",
    title: "Oppenheimer",
    poster: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&h=1080&fit=crop",
    genre: ["Biography", "Drama", "History"],
    rating: 8.5,
    duration: 180,
    releaseDate: "2023-07-21",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
    language: "English"
  },
  {
    id: "3",
    title: "The Batman",
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1920&h=1080&fit=crop",
    genre: ["Action", "Crime", "Drama"],
    rating: 8.0,
    duration: 176,
    releaseDate: "2022-03-04",
    description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate.",
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"],
    language: "English"
  },
  {
    id: "4",
    title: "Interstellar",
    poster: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&h=1080&fit=crop",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    rating: 8.7,
    duration: 169,
    releaseDate: "2014-11-07",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    language: "English"
  },
  {
    id: "5",
    title: "Avatar: The Way of Water",
    poster: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop",
    genre: ["Action", "Adventure", "Fantasy"],
    rating: 7.6,
    duration: 192,
    releaseDate: "2022-12-16",
    description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.",
    director: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldaña", "Sigourney Weaver"],
    language: "English"
  },
  {
    id: "6",
    title: "Inception",
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=1080&fit=crop",
    genre: ["Action", "Sci-Fi", "Thriller"],
    rating: 8.8,
    duration: 148,
    releaseDate: "2010-07-16",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    language: "English"
  }
];

export const theaters: Theater[] = [
  {
    id: "1",
    name: "SCREEMA Grand",
    location: "Downtown Mombasa",
    screens: [
      { id: "s1", name: "Screen 1", type: "IMAX", rows: 12, seatsPerRow: 20 },
      { id: "s2", name: "Screen 2", type: "Dolby", rows: 10, seatsPerRow: 18 },
      { id: "s3", name: "Screen 3", type: "Standard", rows: 8, seatsPerRow: 16 }
    ]
  },
  {
    id: "2",
    name: "SCREEMA Cinema",
    location: "Nyali Heights",
    screens: [
      { id: "s4", name: "Screen A", type: "4DX", rows: 8, seatsPerRow: 14 },
      { id: "s5", name: "Screen B", type: "Standard", rows: 10, seatsPerRow: 16 }
    ]
  }
];

export const generateShowtimes = (movieId: string): Showtime[] => {
  const times = ["10:30 AM", "1:45 PM", "4:30 PM", "7:15 PM", "10:00 PM"];
  const showtimes: Showtime[] = [];
  
  theaters.forEach(theater => {
    theater.screens.forEach(screen => {
      times.forEach((time, index) => {
        showtimes.push({
          id: `${movieId}-${theater.id}-${screen.id}-${index}`,
          movieId,
          theaterId: theater.id,
          screenId: screen.id,
          time,
          date: new Date().toISOString().split('T')[0],
          price: {
            standard: screen.type === 'IMAX' ? 18 : screen.type === 'Dolby' ? 16 : 12,
            premium: screen.type === 'IMAX' ? 24 : screen.type === 'Dolby' ? 22 : 16,
            vip: screen.type === 'IMAX' ? 35 : screen.type === 'Dolby' ? 32 : 25
          }
        });
      });
    });
  });
  
  return showtimes;
};

// Hero carousel data generators
export const getNowShowingHero = (): HeroMovie[] => {
  const today = new Date();
  const nowShowing = movies.filter(movie => {
    const releaseDate = new Date(movie.releaseDate);
    return releaseDate <= today;
  });

  return nowShowing.slice(0, 5).map(movie => {
    const showtimes = generateShowtimes(movie.id);
    const nextShowtime = showtimes.length > 0 ? showtimes[0].time : undefined;
    const basePrice = showtimes.length > 0 ? showtimes[0].price.standard : 12;
    
    // Generate stable seat availability based on movie ID
    const movieIdNum = parseInt(movie.id);
    const availabilityValue = (movieIdNum * 37) % 100; // Deterministic pseudo-random
    const seatAvailability = availabilityValue > 70 ? 'low' : availabilityValue > 40 ? 'medium' : 'high';
    
    return {
      ...movie,
      nextShowtime,
      seatAvailability,
      fromPrice: basePrice,
      trailerUrl: `https://youtube.com/watch?v=${movie.id}`
    };
  });
};

// Get all movies including coming soon ones
export const getAllMovies = (): Movie[] => {
  const today = new Date();
  const comingSoon = movies.filter(movie => {
    const releaseDate = new Date(movie.releaseDate);
    return releaseDate > today;
  });

  // Add some future movies for demo - using dates definitely in the future
  const futureMovies: Movie[] = [
    {
      id: "7",
      title: "Blade Runner 2099",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop",
      genre: ["Sci-Fi", "Thriller", "Action"],
      rating: 0,
      duration: 155,
      releaseDate: "2025-06-15",
      description: "The next chapter in the Blade Runner saga explores the future of humanity and artificial intelligence.",
      director: "Denis Villeneuve",
      cast: ["Ryan Gosling", "Ana de Armas", "Jared Leto"],
      language: "English"
    },
    {
      id: "8",
      title: "Marvel's Fantastic Four",
      poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1920&h=1080&fit=crop",
      genre: ["Action", "Adventure", "Sci-Fi"],
      rating: 0,
      duration: 140,
      releaseDate: "2025-07-25",
      description: "Marvel's first family joins the MCU in this highly anticipated superhero adventure.",
      director: "Matt Shakman",
      cast: ["Pedro Pascal", "Vanessa Kirby", "Joseph Quinn"],
      language: "English"
    },
    {
      id: "9",
      title: "Avatar 3: The Seed Bearer",
      poster: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=1080&fit=crop",
      genre: ["Sci-Fi", "Adventure", "Action"],
      rating: 0,
      duration: 190,
      releaseDate: "2025-12-20",
      description: "Jake Sully and Neytiri's family faces new challenges as they explore uncharted territories of Pandora.",
      director: "James Cameron",
      cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
      language: "English"
    },
    {
      id: "10",
      title: "The Batman Part II",
      poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1920&h=1080&fit=crop",
      genre: ["Action", "Crime", "Drama"],
      rating: 0,
      duration: 175,
      releaseDate: "2025-10-03",
      description: "Batman continues his war on crime in Gotham City, facing new villains and uncovering deeper conspiracies.",
      director: "Matt Reeves",
      cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"],
      language: "English"
    }
  ];

  return [...movies, ...futureMovies];
};

export const getComingSoonHero = (): ComingSoonMovie[] => {
  // For demo purposes, always return the future movies regardless of current date
  const futureMovies: ComingSoonMovie[] = [
    {
      id: "7",
      title: "Blade Runner 2099",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop",
      genre: ["Sci-Fi", "Thriller", "Action"],
      rating: 0,
      duration: 155,
      releaseDate: "2025-06-15",
      description: "The next chapter in the Blade Runner saga explores the future of humanity and artificial intelligence.",
      director: "Denis Villeneuve",
      cast: ["Ryan Gosling", "Ana de Armas", "Jared Leto"],
      language: "English",
      trailerUrl: "https://youtube.com/watch?v=7"
    },
    {
      id: "8",
      title: "Marvel's Fantastic Four",
      poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1920&h=1080&fit=crop",
      genre: ["Action", "Adventure", "Sci-Fi"],
      rating: 0,
      duration: 140,
      releaseDate: "2025-07-25",
      description: "Marvel's first family joins the MCU in this highly anticipated superhero adventure.",
      director: "Matt Shakman",
      cast: ["Pedro Pascal", "Vanessa Kirby", "Joseph Quinn"],
      language: "English",
      trailerUrl: "https://youtube.com/watch?v=8"
    },
    {
      id: "9",
      title: "Avatar 3: The Seed Bearer",
      poster: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=1080&fit=crop",
      genre: ["Sci-Fi", "Adventure", "Action"],
      rating: 0,
      duration: 190,
      releaseDate: "2025-12-20",
      description: "Jake Sully and Neytiri's family faces new challenges as they explore uncharted territories of Pandora.",
      director: "James Cameron",
      cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
      language: "English",
      trailerUrl: "https://youtube.com/watch?v=9"
    },
    {
      id: "10",
      title: "The Batman Part II",
      poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1920&h=1080&fit=crop",
      genre: ["Action", "Crime", "Drama"],
      rating: 0,
      duration: 175,
      releaseDate: "2025-10-03",
      description: "Batman continues his war on crime in Gotham City, facing new villains and uncovering deeper conspiracies.",
      director: "Matt Reeves",
      cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"],
      language: "English",
      trailerUrl: "https://youtube.com/watch?v=10"
    }
  ];

  return futureMovies;
};

export const getOffersHero = (): Offer[] => {
  return [
    {
      id: "1",
      headline: "Double Points Tuesday",
      value: "2× points on all tickets",
      expiry: "Ends in 3 days",
      badge: "Auto-applied",
      isActive: true,
      isPublic: true,
      backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop"
    },
    {
      id: "2",
      headline: "Student Discount",
      value: "25% off with valid student ID",
      expiry: "Valid all semester",
      badge: "Show ID at counter",
      isActive: true,
      isPublic: true,
      backdrop: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=1080&fit=crop"
    },
    {
      id: "3",
      headline: "IMAX Weekend Special",
      value: "Buy 2 get 1 free IMAX tickets",
      expiry: "Weekends only",
      badge: "Premium screens",
      isActive: true,
      isPublic: true,
      backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=1080&fit=crop"
    }
  ];
};
