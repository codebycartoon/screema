-- Fix RLS policy for bookings to allow inserts
-- Run this in Supabase SQL Editor

-- Drop existing policies
DROP POLICY IF EXISTS "Users can create own bookings" ON bookings;

-- Create new policy that allows authenticated users to insert bookings
CREATE POLICY "Users can create own bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Also make sure the policy allows selecting
DROP POLICY IF EXISTS "Users can view own bookings" ON bookings;

CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Check if RLS is enabled (it should be)
-- If you see "Row Level Security is not enabled", run:
-- ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
