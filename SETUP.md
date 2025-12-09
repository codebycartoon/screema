# SCREEMA - Development Setup Guide

Complete guide to setting up SCREEMA for local development.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required
- **Node.js** (v18.0.0 or higher)
  - Download: https://nodejs.org/
  - Verify: `node --version`
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
  - Comes with Node.js
  - Verify: `npm --version`
- **Git** (v2.30.0 or higher)
  - Download: https://git-scm.com/
  - Verify: `git --version`

### Recommended
- **VS Code** - Recommended IDE
  - Download: https://code.visualstudio.com/
- **VS Code Extensions**:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

---

## Quick Start (5 minutes)

```bash
# 1. Clone the repository
git clone https://github.com/codebycartoon/screema.git
cd screema

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# Navigate to http://localhost:5173
```

That's it! The app should now be running locally.

---

## Detailed Setup

### Step 1: Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/codebycartoon/screema.git

# OR using SSH
git clone git@github.com:codebycartoon/screema.git

# Navigate to project directory
cd screema
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# OR using yarn
yarn install

# OR using pnpm
pnpm install
```

This will install all dependencies listed in `package.json`.

**Installation time:** ~2-3 minutes (depending on internet speed)

### Step 3: Environment Configuration

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env

# OR create manually
touch .env
```

Add the following variables:

```env
# Supabase Configuration (Optional for demo)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

**Note:** The app works with mock data without Supabase configuration.

### Step 4: Start Development Server

```bash
npm run dev
```

You should see output like:

```
  VITE v5.4.19  ready in 523 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Step 5: Open in Browser

Navigate to `http://localhost:5173`

The app should load with hot module replacement (HMR) enabled.

---

## Project Structure

```
screema/
├── .github/              # GitHub Actions workflows
├── public/               # Static assets
├── screenshots/          # App screenshots
├── src/
│   ├── components/       # React components
│   │   ├── booking/      # Booking-related
│   │   ├── home/         # Homepage sections
│   │   ├── layout/       # Header, Footer
│   │   ├── movies/       # Movie components
│   │   └── ui/           # shadcn/ui components
│   ├── hooks/            # Custom React hooks
│   ├── integrations/     # External services
│   ├── lib/              # Utilities
│   ├── pages/            # Route pages
│   ├── types/            # TypeScript types
│   ├── data/             # Mock data
│   ├── App.tsx           # Root component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── .env.example          # Environment template
├── .gitignore            # Git ignore rules
├── components.json       # shadcn/ui config
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML template
├── package.json          # Dependencies
├── postcss.config.js     # PostCSS config
├── tailwind.config.ts    # Tailwind config
├── tsconfig.json         # TypeScript config
├── vite.config.ts        # Vite configuration
└── README.md             # Project documentation
```

---

## Available Scripts

### Development

```bash
# Start dev server with HMR
npm run dev

# Start dev server and expose to network
npm run dev -- --host
```

### Building

```bash
# Production build
npm run build

# Development build (no minification)
npm run build:dev

# Build with bundle analyzer
npm run build:analyze
```

### Testing & Quality

```bash
# Run ESLint
npm run lint

# Fix ESLint errors
npm run lint:fix

# Type check without emitting files
npm run type-check

# Format code with Prettier
npm run format
```

### Preview

```bash
# Preview production build locally
npm run preview
```

### Cleanup

```bash
# Clean build artifacts and cache
npm run clean
```

---

## IDE Setup

### VS Code

#### Recommended Extensions

Install these extensions for the best development experience:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

#### Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

---

## Supabase Setup (Optional)

To use real backend instead of mock data:

### 1. Create Supabase Project

1. Go to https://supabase.com
2. Sign up / Sign in
3. Create new project
4. Wait for database to initialize (~2 minutes)

### 2. Get API Credentials

1. Go to Project Settings > API
2. Copy:
   - Project URL
   - Anon/Public key

### 3. Configure Environment

Add to `.env`:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Create Database Tables

Run these SQL commands in Supabase SQL Editor:

```sql
-- Movies table
CREATE TABLE movies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  genre TEXT[],
  duration INTEGER,
  rating DECIMAL(3,1),
  release_date DATE,
  poster_url TEXT,
  trailer_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Showtimes table
CREATE TABLE showtimes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  movie_id UUID REFERENCES movies(id),
  date DATE NOT NULL,
  time TIME NOT NULL,
  available_seats INTEGER,
  total_seats INTEGER,
  price DECIMAL(10,2),
  screen TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  movie_id UUID REFERENCES movies(id),
  showtime_id UUID REFERENCES showtimes(id),
  seats TEXT[],
  seat_types JSONB,
  total_price DECIMAL(10,2),
  status TEXT DEFAULT 'pending',
  qr_code TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE showtimes ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Movies are viewable by everyone"
  ON movies FOR SELECT
  USING (true);

CREATE POLICY "Showtimes are viewable by everyone"
  ON showtimes FOR SELECT
  USING (true);

CREATE POLICY "Users can view their own bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### 5. Seed Sample Data

```sql
-- Insert sample movies
INSERT INTO movies (title, description, genre, duration, rating, release_date, poster_url)
VALUES 
  ('Inception', 'A thief who steals corporate secrets...', 
   ARRAY['Action', 'Sci-Fi', 'Thriller'], 148, 8.8, '2010-07-16',
   'https://image.tmdb.org/t/p/w500/inception.jpg'),
  -- Add more movies...
```

---

## Troubleshooting

### Port Already in Use

If port 5173 is already in use:

```bash
# Use a different port
npm run dev -- --port 3000
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Restart TypeScript server in VS Code
# Press: Ctrl+Shift+P (Windows) or Cmd+Shift+P (Mac)
# Type: "TypeScript: Restart TS Server"
```

### Build Errors

```bash
# Clean and rebuild
npm run clean
npm run build
```

### Vite Cache Issues

```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

---

## Git Workflow

### Initial Setup

```bash
# Configure git commit template
git config commit.template .gitmessage

# Set your identity
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### Creating a Feature

```bash
# Create feature branch
git checkout -b feature/seat-selection

# Make changes and commit
git add .
git commit -m "feat: add interactive seat selection"

# Push to remote
git push origin feature/seat-selection

# Create Pull Request on GitHub
```

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting, no code change
refactor: code refactoring
test: adding tests
chore: maintenance
```

---

## Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Deploy to Netlify

```bash
# Build the project
npm run build

# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

---

## Performance Tips

### Development

- Use `npm run dev` for fast HMR
- Keep browser DevTools open for debugging
- Use React DevTools extension

### Production

- Always run `npm run build` before deploying
- Test with `npm run preview` locally
- Monitor bundle size with build analyzer

---

## Getting Help

### Documentation
- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com/)

### Community
- GitHub Issues: https://github.com/codebycartoon/screema/issues
- Email: franklineonguti4@gmail.com

---

## Next Steps

After setup:

1. ✅ Explore the codebase
2. ✅ Read ARCHITECTURE.md
3. ✅ Check FEATURES.md
4. ✅ Review CONTRIBUTING.md
5. ✅ Start building!

---

**Happy Coding! 🚀**
