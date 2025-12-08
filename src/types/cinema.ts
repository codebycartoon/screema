export interface Movie {
  id: string;
  title: string;
  poster: string;
  backdrop: string;
  genre: string[];
  rating: number;
  duration: number;
  releaseDate: string;
  description: string;
  director: string;
  cast: string[];
  language: string;
}

export interface Theater {
  id: string;
  name: string;
  location: string;
  screens: Screen[];
}

export interface Screen {
  id: string;
  name: string;
  type: 'Standard' | 'IMAX' | 'Dolby' | '4DX';
  rows: number;
  seatsPerRow: number;
}

export interface Showtime {
  id: string;
  movieId: string;
  theaterId: string;
  screenId: string;
  time: string;
  date: string;
  price: {
    standard: number;
    premium: number;
    vip: number;
  };
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'standard' | 'premium' | 'vip' | 'wheelchair';
  status: 'available' | 'selected' | 'booked' | 'blocked';
}

export interface Booking {
  id: string;
  movieId: string;
  showtimeId: string;
  seats: Seat[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  qrCode: string;
}
