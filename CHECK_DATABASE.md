# Check Your Supabase Database

## Step 1: Check if you have data

Go to Supabase Dashboard → Table Editor

### Check these tables:

1. **showtimes** table
   - Do you see any rows?
   - If EMPTY → Run `supabase-seed-data.sql`

2. **movies** table
   - Do you see 6 movies?
   - If EMPTY → Run `supabase-seed-data.sql`

3. **theaters** table
   - Do you see 2 theaters?
   - If EMPTY → Run `supabase-seed-data.sql`

---

## Step 2: If tables are empty, run seed data

1. Go to **SQL Editor**
2. Click **New query**
3. Copy ALL content from `supabase-seed-data.sql`
4. Paste and click **Run**
5. Wait ~10 seconds

This will create:
- 2 theaters
- 3 screens
- 532 seats
- 6 movies
- **630 showtimes** ← This is what you need!

---

## Step 3: Test booking again

After running the seed data:
1. Go to your site
2. Make a booking
3. Check Supabase → bookings table
4. You should see your booking!

---

## Why bookings aren't saving:

The booking code tries to find a showtime in the database. If there are no showtimes, it can't create a booking record (because `showtime_id` is required).

**Solution:** Run the seed data SQL to populate your database!
