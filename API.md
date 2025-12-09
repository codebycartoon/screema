# SCREEMA API Documentation

## Overview

SCREEMA uses Supabase as the backend service, providing a RESTful API for all data operations. This document outlines the API structure and usage.

## Base URL

```
Production: https://your-project.supabase.co/rest/v1
```

## Authentication

All authenticated requests require a JWT token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Movies

#### Get All Movies
```http
GET /movies
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Inception",
      "description": "A thief who steals corporate secrets...",
      "genre": ["Action", "Sci-Fi", "Thriller"],
      "duration": 148,
      "rating": 8.8,
      "release_date": "2010-07-16",
      "poster_url": "https://...",
      "trailer_url": "https://...",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Get Movie by ID
```http
GET /movies/:id
```

**Parameters:**
- `id` (string, required) - Movie UUID

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "title": "Inception",
    "description": "A thief who steals corporate secrets...",
    "genre": ["Action", "Sci-Fi", "Thriller"],
    "duration": 148,
    "rating": 8.8,
    "release_date": "2010-07-16",
    "poster_url": "https://...",
    "trailer_url": "https://...",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### Showtimes

#### Get Showtimes for Movie
```http
GET /showtimes?movie_id=eq.<movie_id>
```

**Query Parameters:**
- `movie_id` (string, required) - Movie UUID

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "movie_id": "uuid",
      "date": "2024-12-15",
      "time": "14:30:00",
      "available_seats": 120,
      "total_seats": 150,
      "price": 12.99,
      "screen": "Screen 1",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Bookings

#### Create Booking
```http
POST /bookings
```

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "movie_id": "uuid",
  "showtime_id": "uuid",
  "seats": ["A1", "A2", "A3"],
  "seat_types": {
    "A1": "regular",
    "A2": "regular",
    "A3": "premium"
  },
  "total_price": 38.97
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "user_id": "uuid",
    "movie_id": "uuid",
    "showtime_id": "uuid",
    "seats": ["A1", "A2", "A3"],
    "total_price": 38.97,
    "status": "confirmed",
    "qr_code": "base64-encoded-qr",
    "created_at": "2024-12-08T10:30:00Z"
  }
}
```

#### Get User Bookings
```http
GET /bookings?user_id=eq.<user_id>
```

**Headers:**
```http
Authorization: Bearer <token>
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "movie_id": "uuid",
      "showtime_id": "uuid",
      "seats": ["A1", "A2"],
      "total_price": 25.98,
      "status": "confirmed",
      "qr_code": "base64-encoded-qr",
      "created_at": "2024-12-08T10:30:00Z",
      "movie": {
        "title": "Inception",
        "poster_url": "https://..."
      },
      "showtime": {
        "date": "2024-12-15",
        "time": "14:30:00"
      }
    }
  ]
}
```

#### Cancel Booking
```http
PATCH /bookings/:id
```

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "cancelled"
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "status": "cancelled",
    "updated_at": "2024-12-08T11:00:00Z"
  }
}
```

### Authentication

#### Sign Up
```http
POST /auth/v1/signup
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "data": {
    "full_name": "John Doe"
  }
}
```

**Response:**
```json
{
  "access_token": "jwt-token",
  "token_type": "bearer",
  "expires_in": 3600,
  "refresh_token": "refresh-token",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "user_metadata": {
      "full_name": "John Doe"
    }
  }
}
```

#### Sign In
```http
POST /auth/v1/token?grant_type=password
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "access_token": "jwt-token",
  "token_type": "bearer",
  "expires_in": 3600,
  "refresh_token": "refresh-token",
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

#### Sign Out
```http
POST /auth/v1/logout
```

**Headers:**
```http
Authorization: Bearer <token>
```

**Response:**
```http
204 No Content
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request parameters",
  "message": "Seat A1 is already booked"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Movie with id 'xyz' not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## Rate Limiting

- **Authenticated requests:** 100 requests per minute
- **Unauthenticated requests:** 30 requests per minute

## Data Models

### Movie
```typescript
interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string[];
  duration: number; // minutes
  rating: number; // 0-10
  release_date: string; // ISO 8601
  poster_url: string;
  trailer_url: string;
  created_at: string; // ISO 8601
}
```

### Showtime
```typescript
interface Showtime {
  id: string;
  movie_id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM:SS
  available_seats: number;
  total_seats: number;
  price: number;
  screen: string;
  created_at: string; // ISO 8601
}
```

### Booking
```typescript
interface Booking {
  id: string;
  user_id: string;
  movie_id: string;
  showtime_id: string;
  seats: string[];
  seat_types: Record<string, 'regular' | 'premium' | 'vip'>;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  qr_code: string; // base64
  created_at: string; // ISO 8601
  updated_at: string; // ISO 8601
}
```

### User
```typescript
interface User {
  id: string;
  email: string;
  user_metadata: {
    full_name: string;
    avatar_url?: string;
  };
  created_at: string; // ISO 8601
}
```

## Client Usage Examples

### Using TanStack Query

```typescript
// Fetch movies
const { data: movies } = useQuery({
  queryKey: ['movies'],
  queryFn: async () => {
    const { data } = await supabase
      .from('movies')
      .select('*');
    return data;
  }
});

// Create booking
const createBooking = useMutation({
  mutationFn: async (booking: BookingInput) => {
    const { data } = await supabase
      .from('bookings')
      .insert(booking)
      .select()
      .single();
    return data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries(['bookings']);
  }
});
```

### Using Fetch API

```typescript
// Get movies
const response = await fetch('https://your-project.supabase.co/rest/v1/movies', {
  headers: {
    'apikey': 'your-anon-key',
    'Authorization': 'Bearer your-anon-key'
  }
});
const movies = await response.json();

// Create booking (authenticated)
const response = await fetch('https://your-project.supabase.co/rest/v1/bookings', {
  method: 'POST',
  headers: {
    'apikey': 'your-anon-key',
    'Authorization': `Bearer ${userToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    movie_id: 'uuid',
    showtime_id: 'uuid',
    seats: ['A1', 'A2'],
    total_price: 25.98
  })
});
const booking = await response.json();
```

## Webhooks (Future)

### Booking Confirmation
```http
POST https://your-app.com/webhooks/booking-confirmed
```

**Payload:**
```json
{
  "event": "booking.confirmed",
  "data": {
    "booking_id": "uuid",
    "user_email": "user@example.com",
    "movie_title": "Inception",
    "showtime": "2024-12-15 14:30"
  }
}
```

## Testing

### Postman Collection
Import the Postman collection from `/docs/postman-collection.json` for easy API testing.

### cURL Examples

```bash
# Get all movies
curl -X GET 'https://your-project.supabase.co/rest/v1/movies' \
  -H 'apikey: your-anon-key'

# Create booking
curl -X POST 'https://your-project.supabase.co/rest/v1/bookings' \
  -H 'apikey: your-anon-key' \
  -H 'Authorization: Bearer user-token' \
  -H 'Content-Type: application/json' \
  -d '{
    "movie_id": "uuid",
    "showtime_id": "uuid",
    "seats": ["A1", "A2"],
    "total_price": 25.98
  }'
```

## Support

For API issues or questions:
- Email: franklineonguti4@gmail.com
- GitHub Issues: https://github.com/codebycartoon/screema/issues
