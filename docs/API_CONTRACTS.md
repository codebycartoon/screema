# API Contracts Documentation

## 🔌 **API Overview**

SCREEMA uses **Supabase** as the primary backend service, providing a PostgreSQL database with real-time capabilities, authentication, and file storage. All API interactions follow RESTful principles with real-time subscriptions.

## 🔐 **Authentication**

### **Base Configuration**
```typescript
const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);
```

### **Auth Endpoints**

#### **Sign Up**
```typescript
POST /auth/v1/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "data": {
    "full_name": "John Doe",
    "phone": "+1234567890"
  }
}

// Response
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "created_at": "2024-01-01T00:00:00Z"
  },
  "session": {
    "access_token": "jwt_token",
    "refresh_token": "refresh_token",
    "expires_in": 3600
  }
}
```

#### **Sign In**
```typescript
POST /auth/v1/token?grant_type=password
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

// Response
{
  "access_token": "jwt_token",
  "refresh_token": "refresh_token",
  "expires_in": 3600,
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

## 🎬 **Movies API**

### **Get All Movies**
```typescript
GET /rest/v1/movies
Authorization: Bearer {jwt_token}

// Response
[
  {
    "id": "uuid",
    "title": "Movie Title",
    "description": "Movie description",
    "poster_url": "https://example.com/poster.jpg",
    "release_date": "2024-01-01",
    "duration": 120,
    "rating": "PG-13",
    "genres": ["Action", "Adventure"],
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

### **Get Movie by ID**
```typescript
GET /rest/v1/movies?id=eq.{movie_id}
Authorization: Bearer {jwt_token}

// Response
{
  "id": "uuid",
  "title": "Movie Title",
  "description": "Detailed movie description",
  "poster_url": "https://example.com/poster.jpg",
  "backdrop_url": "https://example.com/backdrop.jpg",
  "release_date": "2024-01-01",
  "duration": 120,
  "rating": "PG-13",
  "genres": ["Action", "Adventure"],
  "cast": ["Actor 1", "Actor 2"],
  "director": "Director Name",
  "trailer_url": "https://youtube.com/watch?v=xyz"
}
```

## 🎫 **Bookings API**

### **Create Booking**
```typescript
POST /rest/v1/bookings
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "movie_id": "uuid",
  "theater_name": "Theater A",
  "showtime": "2024-01-01T19:00:00Z",
  "seats": ["A1", "A2"],
  "snacks": [
    {
      "id": "snack_id",
      "quantity": 2,
      "price": 5.99
    }
  ],
  "total_amount": 25.98
}

// Response
{
  "id": "uuid",
  "user_id": "uuid",
  "movie_id": "uuid",
  "theater_name": "Theater A",
  "showtime": "2024-01-01T19:00:00Z",
  "seats": ["A1", "A2"],
  "total_amount": 25.98,
  "status": "confirmed",
  "booking_reference": "SCR-ABC123",
  "created_at": "2024-01-01T00:00:00Z"
}
```

### **Get User Bookings**
```typescript
GET /rest/v1/bookings?user_id=eq.{user_id}&order=created_at.desc
Authorization: Bearer {jwt_token}

// Response
[
  {
    "id": "uuid",
    "movie_id": "uuid",
    "movie": {
      "title": "Movie Title",
      "poster_url": "https://example.com/poster.jpg"
    },
    "theater_name": "Theater A",
    "showtime": "2024-01-01T19:00:00Z",
    "seats": ["A1", "A2"],
    "total_amount": 25.98,
    "status": "confirmed",
    "booking_reference": "SCR-ABC123",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

### **Cancel Booking**
```typescript
PATCH /rest/v1/bookings?id=eq.{booking_id}
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "status": "cancelled",
  "cancelled_at": "2024-01-01T12:00:00Z"
}

// Response
{
  "id": "uuid",
  "status": "cancelled",
  "cancelled_at": "2024-01-01T12:00:00Z"
}
```

## 👤 **User Profile API**

### **Get User Profile**
```typescript
GET /rest/v1/users?id=eq.{user_id}
Authorization: Bearer {jwt_token}

// Response
{
  "id": "uuid",
  "email": "user@example.com",
  "full_name": "John Doe",
  "phone": "+1234567890",
  "tier_id": "gold",
  "points": 1250,
  "avatar_url": "https://example.com/avatar.jpg",
  "created_at": "2024-01-01T00:00:00Z"
}
```

### **Update User Profile**
```typescript
PATCH /rest/v1/users?id=eq.{user_id}
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "full_name": "John Smith",
  "phone": "+1234567891"
}

// Response
{
  "id": "uuid",
  "full_name": "John Smith",
  "phone": "+1234567891",
  "updated_at": "2024-01-01T12:00:00Z"
}
```

## 🔔 **Notifications API**

### **Get User Notifications**
```typescript
GET /rest/v1/notifications?user_id=eq.{user_id}&order=created_at.desc
Authorization: Bearer {jwt_token}

// Response
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "title": "Booking Confirmed",
    "message": "Your booking for Movie Title has been confirmed",
    "type": "booking",
    "is_read": false,
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

### **Mark Notification as Read**
```typescript
PATCH /rest/v1/notifications?id=eq.{notification_id}
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "is_read": true
}
```

## 🏆 **Rewards System API**

### **Get User Tier Info**
```typescript
GET /rest/v1/user_tiers?user_id=eq.{user_id}
Authorization: Bearer {jwt_token}

// Response
{
  "user_id": "uuid",
  "current_tier": "gold",
  "points": 1250,
  "points_to_next_tier": 250,
  "tier_benefits": [
    "10% discount on tickets",
    "Priority booking",
    "Free popcorn upgrade"
  ],
  "tier_progress": 0.83
}
```

### **Add Points**
```typescript
POST /rest/v1/rpc/add_user_points
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "user_id": "uuid",
  "points": 100,
  "reason": "Movie booking"
}

// Response
{
  "success": true,
  "new_total": 1350,
  "tier_updated": false
}
```

## 🔄 **Real-time Subscriptions**

### **Seat Availability Updates**
```typescript
const seatSubscription = supabase
  .channel('seat-updates')
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'bookings',
    filter: `movie_id=eq.${movieId}`
  }, (payload) => {
    // Handle seat availability changes
    console.log('Seat update:', payload);
  })
  .subscribe();
```

### **User Notifications**
```typescript
const notificationSubscription = supabase
  .channel(`user-notifications:${userId}`)
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'notifications',
    filter: `user_id=eq.${userId}`
  }, (payload) => {
    // Handle new notifications
    console.log('New notification:', payload.new);
  })
  .subscribe();
```

## 🚨 **Error Handling**

### **Standard Error Response**
```typescript
{
  "error": {
    "code": "PGRST116",
    "message": "JWT expired",
    "details": "The JWT token has expired",
    "hint": "Please refresh your token"
  }
}
```

### **Common Error Codes**
- `PGRST116`: JWT expired
- `PGRST301`: Row Level Security violation
- `23505`: Unique constraint violation
- `23503`: Foreign key constraint violation
- `42501`: Insufficient privileges

## 📊 **Rate Limits**

- **Authentication**: 60 requests per minute per IP
- **Database Operations**: 100 requests per minute per user
- **Real-time Connections**: 100 concurrent connections per user
- **File Uploads**: 10 MB per file, 100 MB per hour per user

## 🔒 **Security Headers**

All API responses include security headers:
```
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

## 📝 **Request/Response Examples**

### **TypeScript Client Usage**
```typescript
// Initialize client
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

// Fetch movies with error handling
const fetchMovies = async () => {
  try {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .order('release_date', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// Create booking with transaction
const createBooking = async (bookingData: BookingRequest) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert(bookingData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};
```

---

*This API documentation is automatically generated and kept in sync with the database schema.*