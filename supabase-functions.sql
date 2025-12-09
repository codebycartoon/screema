-- ============================================
-- ATOMIC SEAT RESERVATION FUNCTION
-- Prevents double booking!
-- Run this AFTER schema and RLS
-- ============================================

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
  -- Check if showtime exists and is active
  SELECT * INTO v_showtime
  FROM showtimes
  WHERE id = p_showtime_id AND status = 'active';
  
  IF NOT FOUND THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Showtime not found or inactive'
    );
  END IF;

  -- Check if any seats are already booked
  SELECT COUNT(*) INTO v_already_booked
  FROM booking_seats
  WHERE showtime_id = p_showtime_id
  AND seat_id = ANY(p_seat_ids);
  
  IF v_already_booked > 0 THEN
    RETURN json_build_object(
      'success', false,
      'error', 'One or more seats are already booked'
    );
  END IF;

  -- Create booking
  INSERT INTO bookings (user_id, showtime_id, total_price, status, payment_status)
  VALUES (p_user_id, p_showtime_id, p_total_price, 'pending', 'pending')
  RETURNING id INTO v_booking_id;

  -- Reserve each seat
  FOREACH v_seat_id IN ARRAY p_seat_ids
  LOOP
    -- Get seat type and calculate price
    SELECT seat_type INTO v_seat_type
    FROM seats
    WHERE id = v_seat_id;
    
    v_seat_price := CASE v_seat_type
      WHEN 'regular' THEN v_showtime.price_regular
      WHEN 'premium' THEN v_showtime.price_premium
      WHEN 'vip' THEN v_showtime.price_vip
      ELSE v_showtime.price_regular
    END;

    -- Insert booking seat
    INSERT INTO booking_seats (booking_id, seat_id, showtime_id, price)
    VALUES (v_booking_id, v_seat_id, p_showtime_id, v_seat_price);
  END LOOP;

  -- Update available seats count
  UPDATE showtimes
  SET available_seats = available_seats - array_length(p_seat_ids, 1)
  WHERE id = p_showtime_id;

  -- Return success
  RETURN json_build_object(
    'success', true,
    'booking_id', v_booking_id
  );

EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- CANCEL BOOKING FUNCTION
-- ============================================

CREATE OR REPLACE FUNCTION cancel_booking(
  p_booking_id UUID,
  p_user_id UUID
)
RETURNS JSON AS $$
DECLARE
  v_showtime_id UUID;
  v_seat_count INTEGER;
BEGIN
  -- Verify booking belongs to user
  SELECT showtime_id INTO v_showtime_id
  FROM bookings
  WHERE id = p_booking_id AND user_id = p_user_id;
  
  IF NOT FOUND THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Booking not found'
    );
  END IF;

  -- Get seat count
  SELECT COUNT(*) INTO v_seat_count
  FROM booking_seats
  WHERE booking_id = p_booking_id;

  -- Delete booking seats
  DELETE FROM booking_seats WHERE booking_id = p_booking_id;

  -- Update booking status
  UPDATE bookings
  SET status = 'cancelled', payment_status = 'refunded'
  WHERE id = p_booking_id;

  -- Release seats
  UPDATE showtimes
  SET available_seats = available_seats + v_seat_count
  WHERE id = v_showtime_id;

  RETURN json_build_object('success', true);

EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- FUNCTIONS COMPLETE ✅
-- ============================================
