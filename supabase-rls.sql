-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Run this AFTER creating the schema
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE theaters ENABLE ROW LEVEL SECURITY;
ALTER TABLE screens ENABLE ROW LEVEL SECURITY;
ALTER TABLE seats ENABLE ROW LEVEL SECURITY;
ALTER TABLE showtimes ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_seats ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PROFILES POLICIES
-- ============================================
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- ============================================
-- MOVIES POLICIES (Public Read)
-- ============================================
CREATE POLICY "Anyone can view movies"
  ON movies FOR SELECT
  USING (true);

-- ============================================
-- THEATERS POLICIES (Public Read)
-- ============================================
CREATE POLICY "Anyone can view theaters"
  ON theaters FOR SELECT
  USING (true);

-- ============================================
-- SCREENS POLICIES (Public Read)
-- ============================================
CREATE POLICY "Anyone can view screens"
  ON screens FOR SELECT
  USING (true);

-- ============================================
-- SEATS POLICIES (Public Read)
-- ============================================
CREATE POLICY "Anyone can view seats"
  ON seats FOR SELECT
  USING (true);

-- ============================================
-- SHOWTIMES POLICIES (Public Read)
-- ============================================
CREATE POLICY "Anyone can view showtimes"
  ON showtimes FOR SELECT
  USING (true);

-- ============================================
-- BOOKINGS POLICIES (User-Specific)
-- ============================================
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings"
  ON bookings FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- BOOKING_SEATS POLICIES
-- ============================================
CREATE POLICY "Users can view own booking seats"
  ON booking_seats FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = booking_seats.booking_id
      AND bookings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create booking seats"
  ON booking_seats FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = booking_seats.booking_id
      AND bookings.user_id = auth.uid()
    )
  );

-- ============================================
-- RLS POLICIES COMPLETE ✅
-- ============================================
