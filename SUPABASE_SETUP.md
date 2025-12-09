# SCREEMA - Complete Supabase Setup Guide

## Overview
Transform SCREEMA from demo to production-ready cinema booking system with real backend, authentication, and atomic seat reservation.

## Quick Start Checklist
- [ ] Create Supabase project
- [ ] Run database schema SQL
- [ ] Enable Row Level Security
- [ ] Create seat reservation function
- [ ] Configure authentication
- [ ] Update environment variables
- [ ] Test the system
- [ ] Deploy to production

---

## 1. Create Supabase Project

### Sign Up & Create Project
1. Go to https://supabase.com
2. Sign up with GitHub
3. Click "New Project"
4. Name: `screema-production`
5. Generate strong database password (save it!)
6. Choose region closest to users
7. Wait 2-3 minutes for initialization

### Get API Credentials
1. Go to Settings → API
2. Copy Project URL and Anon/Public Key

---

## 2. Database Schema

Run this in Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROFILES TABLE
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- MOVIES TABLE
CREATE TABLE movies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  poster_url TEXT,
  backdrop_url TEXT,
  genre TEXT[] NOT NULL DEFAULT '{}',
  rating DECIMAL(3,1) CHECK (rating >= 0 AND rating <= 10),
  duration INTEGER NOT NULL,
  release_date DATE,
  director TEXT,
  cast TEXT[],
  language TEXT DEFAULT 'English',
  status TEXT DEFAULT 'now_showing' CHECK (status IN ('now_showing', 'coming_soon', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- THEATERS TABLE
CREATE TABLE theaters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SCREENS TABLE
CREATE TABLE screens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  theater_id UUID NOT NULL REFERENCES theaters(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  screen_type TEXT DEFAULT 'Standard' CHECK (screen_type IN ('Standard', 'IMAX', 'Dolby', '4DX')),
  total_seats INTEGER NOT NULL,
  rows INTEGER NOT NULL,
  seats_per_row INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SEATS TABLE
CREATE TABLE seats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  screen_id UUID NOT NULL REFERENCES screens(id) ON DELETE CASCADE,
  seat_number TEXT NOT NULL,
  row_label TEXT NOT NULL,
  seat_index INTEGER NOT NULL,
  seat_type TEXT DEFAULT 'regular' CHECK (seat_type IN ('regular', 'premium', 'vip')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(screen_id, seat_number)
);

-- SHOWTIMES TABLE
CREATE TABLE showtimes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  movie_id UUID NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
  screen_id UUID NOT NULL REFERENCES screens(id) ON DELETE CASCADE,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  price_regular DECIMAL(10,2) NOT NULL DEFAULT 12.00,
  price_premium DECIMAL(10,2) NOT NULL DEFAULT 16.00,
  price_vip DECIMAL(10,2) NOT NULL DEFAULT 25.00,
  available_seats INTEGER NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- BOOKINGS TABLE
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  showtime_id UUID NOT NULL REFERENCES showtimes(id) ON DELETE CASCADE,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  qr_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- BOOKING_SEATS TABLE (Prevents double booking)
CREATE TABLE booking_seats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  seat_id UUID NOT NULL REFERENCES seats(id) ON DELETE CASCADE,
  showtime_id UUID NOT NULL REFERENCES showtimes(id) ON DELETE CASCADE,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(seat_id, showtime_id)
);

-- INDEXES
CREATE INDEX idx_movies_status ON movies(status);
CREATE INDEX idx_showtimes_movie ON showtimes(movie_id);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_booking_seats_showtime ON booking_seats(showtime_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'phone', NULL)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## 3. Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE theaters ENABLE ROW LEVEL SECURITY;
ALTER TABLE screens ENABLE ROW LEVEL SECURITY;
ALTER TABLE seats ENABLE ROW LEVEL SECURITY;
ALTER TABLE showtimes ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_seats ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only see/edit their own
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Movies: Public read
CREATE POLICY "Anyone can view movies" ON movies FOR SELECT USING (true);

-- Theaters: Public read
CREATE POLICY "Anyone can view theaters" ON theaters FOR SELECT USING (true);

-- Screens: Public read
CREATE POLICY "Anyone can view screens" ON screens FOR SELECT USING (true);

-- Seats: Public read
CREATE POLICY "Anyone can view seats" ON seats FOR SELECT USING (true);

-- Showtimes: Public read
CREATE POLICY "Anyone can view showtimes" ON showtimes FOR SELECT USING (true);

-- Bookings: Users can only see their own
CREATE POLICY "Users can view own bookings" ON bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own bookings" ON bookings FOR UPDATE USING (auth.uid() = user_id);

-- Booking Seats: Users can only see their own
CREATE POLICY "Users can view own booking seats" ON booking_seats FOR SELECT
  USING (EXISTS (SELECT 1 FROM bookings WHERE bookings.id = booking_seats.booking_id AND bookings.user_id = auth.uid()));
CREATE POLICY "Users can create booking seats" ON booking_seats FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM bookings WHERE bookings.id = booking_seats.booking_id AND bookings.user_id = auth.uid()));
```

---

## 4. Atomic Seat Reservation Function

**CRITICAL: Prevents double booking!**

```sql
CREATE OR REPLACE FUNCTION reserve_seats(
  p_user_id UUID,
  p_showtime_id UUID,
  p_seat_ids UUID[],
  p_total_price DECIMAL
)
RETURNS JSON AS $$
DECLARE
  v_booking_id UUID;
  v_seat_id UUID;
  v_seat_price DECIMAL;
  v_seat_type TEXT;
  v_showtime RECORD;
  v_already_booked INTEGER;
BEGIN
  -- Check showtime exists
  SELECT * INTO v_showtime FROM showtimes WHERE id = p_showtime_id AND status = 'active';
  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'error', 'Showtime not found');
  END IF;

  -- Check if seats already booked
  SELECT COUNT(*) INTO v_already_booked
  FROM booking_seats WHERE showtime_id = p_showtime_id AND seat_id = ANY(p_seat_ids);
  IF v_already_booked > 0 THEN
    RETURN json_build_object('success', false, 'error', 'Seats already booked');
  END IF;

  -- Create booking
  INSERT INTO bookings (user_id, showtime_id, total_price, status, payment_status)
  VALUES (p_user_id, p_showtime_id, p_total_price, 'pending', 'pending')
  RETURNING id INTO v_booking_id;

  -- Reserve each seat
  FOREACH v_seat_id IN ARRAY p_seat_ids LOOP
    SELECT seat_type INTO v_seat_type FROM seats WHERE id = v_seat_id;
    v_seat_price := CASE v_seat_type
      WHEN 'regular' THEN v_showtime.price_regular
      WHEN 'premium' THEN v_showtime.price_premium
      WHEN 'vip' THEN v_showtime.price_vip
      ELSE v_showtime.price_regular
    END;
    INSERT INTO booking_seats (booking_id, seat_id, showtime_id, price)
    VALUES (v_booking_id, v_seat_id, p_showtime_id, v_seat_price);
  END LOOP;

  -- Update available seats
  UPDATE showtimes SET available_seats = available_seats - array_length(p_seat_ids, 1)
  WHERE id = p_showtime_id;

  RETURN json_build_object('success', true, 'booking_id', v_booking_id);
EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 5. Frontend Integration

### Install Supabase
```bash
npm install @supabase/supabase-js
```

### Environment Variables
Create `.env`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Update Supabase Client
`src/integrations/supabase/client.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

## 6. Testing

### Test Auth
```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'test@example.com',
  password: 'password123',
  options: {
    data: { full_name: 'Test User', phone: '1234567890' }
  }
});
```

### Test Booking
```typescript
const { data, error } = await supabase.rpc('reserve_seats', {
  p_user_id: userId,
  p_showtime_id: showtimeId,
  p_seat_ids: [seatId1, seatId2],
  p_total_price: 25.98
});
```

---

## What This Achieves

### Junior Level ❌
- Mock data
- No authentication
- Double booking possible

### Senior Level ✅
- Real database
- Secure authentication
- Atomic seat reservation
- Prevents double booking
- Row Level Security
- Production-ready

---

**Your cinema system is now production-ready! 🎉**
