-- ============================================
-- SEED DATA FOR SCREEMA
-- Run this to populate your database with sample data
-- ============================================

-- Insert Theaters
INSERT INTO theaters (id, name, location) VALUES
  ('11111111-1111-1111-1111-111111111111', 'CinePlex Grand', 'Downtown Manhattan'),
  ('22222222-2222-2222-2222-222222222222', 'StarLight Cinema', 'Brooklyn Heights')
ON CONFLICT (id) DO NOTHING;

-- Insert Screens
INSERT INTO screens (id, theater_id, name, screen_type, total_seats, rows, seats_per_row) VALUES
  ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Screen 1', 'IMAX', 240, 12, 20),
  ('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'Screen 2', 'Dolby', 180, 10, 18),
  ('55555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', 'Screen A', '4DX', 112, 8, 14)
ON CONFLICT (id) DO NOTHING;

-- Insert Sample Movies
INSERT INTO movies (id, title, description, poster_url, backdrop_url, genre, rating, duration, release_date, director, movie_cast, status) VALUES
  (
    '10000000-0000-0000-0000-000000000001',
    'Dune: Part Two',
    'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop',
    ARRAY['Sci-Fi', 'Adventure', 'Drama'],
    8.8,
    166,
    '2024-03-01',
    'Denis Villeneuve',
    ARRAY['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson'],
    'now_showing'
  ),
  (
    '10000000-0000-0000-0000-000000000002',
    'Oppenheimer',
    'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&h=1080&fit=crop',
    ARRAY['Biography', 'Drama', 'History'],
    8.5,
    180,
    '2023-07-21',
    'Christopher Nolan',
    ARRAY['Cillian Murphy', 'Emily Blunt', 'Matt Damon'],
    'now_showing'
  ),
  (
    '10000000-0000-0000-0000-000000000003',
    'The Batman',
    'When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate.',
    'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1920&h=1080&fit=crop',
    ARRAY['Action', 'Crime', 'Drama'],
    8.0,
    176,
    '2022-03-04',
    'Matt Reeves',
    ARRAY['Robert Pattinson', 'Zoë Kravitz', 'Paul Dano'],
    'now_showing'
  ),
  (
    '10000000-0000-0000-0000-000000000004',
    'Interstellar',
    'A team of explorers travel through a wormhole in space in an attempt to ensure humanity''s survival.',
    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&h=1080&fit=crop',
    ARRAY['Sci-Fi', 'Adventure', 'Drama'],
    8.7,
    169,
    '2014-11-07',
    'Christopher Nolan',
    ARRAY['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    'now_showing'
  ),
  (
    '10000000-0000-0000-0000-000000000005',
    'Avatar: The Way of Water',
    'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop',
    ARRAY['Action', 'Adventure', 'Fantasy'],
    7.6,
    192,
    '2022-12-16',
    'James Cameron',
    ARRAY['Sam Worthington', 'Zoe Saldaña', 'Sigourney Weaver'],
    'now_showing'
  ),
  (
    '10000000-0000-0000-0000-000000000006',
    'Inception',
    'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.',
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=1080&fit=crop',
    ARRAY['Action', 'Sci-Fi', 'Thriller'],
    8.8,
    148,
    '2010-07-16',
    'Christopher Nolan',
    ARRAY['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
    'now_showing'
  )
ON CONFLICT (id) DO NOTHING;

-- Generate Seats for Screen 1 (IMAX - 12 rows x 20 seats = 240 seats)
DO $$
DECLARE
  row_letter TEXT;
  seat_num INTEGER;
  seat_type_val TEXT;
BEGIN
  FOR i IN 1..12 LOOP
    row_letter := CHR(64 + i); -- A, B, C, etc.
    FOR seat_num IN 1..20 LOOP
      -- First 2 rows are VIP
      IF i <= 2 THEN
        seat_type_val := 'vip';
      -- Rows 3-4 are premium
      ELSIF i <= 4 THEN
        seat_type_val := 'premium';
      -- Rest are regular
      ELSE
        seat_type_val := 'regular';
      END IF;
      
      INSERT INTO seats (screen_id, seat_number, row_label, seat_index, seat_type)
      VALUES (
        '33333333-3333-3333-3333-333333333333',
        row_letter || seat_num,
        row_letter,
        seat_num,
        seat_type_val
      )
      ON CONFLICT (screen_id, seat_number) DO NOTHING;
    END LOOP;
  END LOOP;
END $$;

-- Generate Seats for Screen 2 (Dolby - 10 rows x 18 seats = 180 seats)
DO $$
DECLARE
  row_letter TEXT;
  seat_num INTEGER;
  seat_type_val TEXT;
BEGIN
  FOR i IN 1..10 LOOP
    row_letter := CHR(64 + i);
    FOR seat_num IN 1..18 LOOP
      IF i <= 2 THEN
        seat_type_val := 'vip';
      ELSIF i <= 4 THEN
        seat_type_val := 'premium';
      ELSE
        seat_type_val := 'regular';
      END IF;
      
      INSERT INTO seats (screen_id, seat_number, row_label, seat_index, seat_type)
      VALUES (
        '44444444-4444-4444-4444-444444444444',
        row_letter || seat_num,
        row_letter,
        seat_num,
        seat_type_val
      )
      ON CONFLICT (screen_id, seat_number) DO NOTHING;
    END LOOP;
  END LOOP;
END $$;

-- Generate Seats for Screen A (4DX - 8 rows x 14 seats = 112 seats)
DO $$
DECLARE
  row_letter TEXT;
  seat_num INTEGER;
  seat_type_val TEXT;
BEGIN
  FOR i IN 1..8 LOOP
    row_letter := CHR(64 + i);
    FOR seat_num IN 1..14 LOOP
      IF i <= 2 THEN
        seat_type_val := 'vip';
      ELSIF i <= 3 THEN
        seat_type_val := 'premium';
      ELSE
        seat_type_val := 'regular';
      END IF;
      
      INSERT INTO seats (screen_id, seat_number, row_label, seat_index, seat_type)
      VALUES (
        '55555555-5555-5555-5555-555555555555',
        row_letter || seat_num,
        row_letter,
        seat_num,
        seat_type_val
      )
      ON CONFLICT (screen_id, seat_number) DO NOTHING;
    END LOOP;
  END LOOP;
END $$;

-- Insert Showtimes (for next 7 days)
DO $$
DECLARE
  movie_ids UUID[] := ARRAY[
    '10000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000004',
    '10000000-0000-0000-0000-000000000005',
    '10000000-0000-0000-0000-000000000006'
  ];
  screen_ids UUID[] := ARRAY[
    '33333333-3333-3333-3333-333333333333',
    '44444444-4444-4444-4444-444444444444',
    '55555555-5555-5555-5555-555555555555'
  ];
  times TEXT[] := ARRAY['10:30', '13:45', '16:30', '19:15', '22:00'];
  movie_id UUID;
  screen_id UUID;
  show_time TEXT;
  day_offset INTEGER;
  show_date DATE;
  start_ts TIMESTAMP;
  end_ts TIMESTAMP;
  total_seats_count INTEGER;
BEGIN
  -- For each day in next 7 days
  FOR day_offset IN 0..6 LOOP
    show_date := CURRENT_DATE + day_offset;
    
    -- For each movie
    FOREACH movie_id IN ARRAY movie_ids LOOP
      -- For each screen
      FOREACH screen_id IN ARRAY screen_ids LOOP
        -- Get total seats for this screen
        SELECT total_seats INTO total_seats_count FROM screens WHERE id = screen_id;
        
        -- For each time slot
        FOREACH show_time IN ARRAY times LOOP
          start_ts := (show_date || ' ' || show_time || ':00')::TIMESTAMP;
          end_ts := start_ts + INTERVAL '3 hours'; -- Assume 3 hour duration
          
          INSERT INTO showtimes (
            movie_id,
            screen_id,
            start_time,
            end_time,
            price_regular,
            price_premium,
            price_vip,
            available_seats,
            status
          ) VALUES (
            movie_id,
            screen_id,
            start_ts,
            end_ts,
            12.00,
            16.00,
            25.00,
            total_seats_count,
            'active'
          )
          ON CONFLICT DO NOTHING;
        END LOOP;
      END LOOP;
    END LOOP;
  END LOOP;
END $$;

-- ============================================
-- SEED DATA COMPLETE ✅
-- You now have:
-- - 2 Theaters
-- - 3 Screens
-- - 532 Seats
-- - 6 Movies
-- - 630 Showtimes (6 movies x 3 screens x 5 times x 7 days)
-- ============================================
