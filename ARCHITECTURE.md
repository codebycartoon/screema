# SCREEMA Architecture Documentation

## System Overview

SCREEMA is a modern single-page application (SPA) built with React and TypeScript, following a component-based architecture with clear separation of concerns.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │  Browser   │  │   Mobile   │  │   Tablet   │            │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘            │
│        └────────────────┴────────────────┘                   │
│                         │                                     │
└─────────────────────────┼─────────────────────────────────────┘
                          │
┌─────────────────────────┼─────────────────────────────────────┐
│                    Presentation Layer                         │
│  ┌──────────────────────▼──────────────────────┐             │
│  │           React Application (SPA)            │             │
│  │  ┌────────────────────────────────────────┐ │             │
│  │  │         React Router (v6)              │ │             │
│  │  │  - Client-side routing                 │ │             │
│  │  │  - Protected routes                    │ │             │
│  │  │  - Lazy loading                        │ │             │
│  │  └────────────────────────────────────────┘ │             │
│  │  ┌────────────────────────────────────────┐ │             │
│  │  │         Component Tree                 │ │             │
│  │  │  - Pages (Route components)            │ │             │
│  │  │  - Feature components                  │ │             │
│  │  │  - UI components (shadcn/ui)           │ │             │
│  │  └────────────────────────────────────────┘ │             │
│  └──────────────────────────────────────────────┘             │
└───────────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────┼─────────────────────────────────────┐
│                    State Management Layer                     │
│  ┌──────────────────────▼──────────────────────┐             │
│  │  TanStack Query (Server State)              │             │
│  │  - Data fetching & caching                  │             │
│  │  - Automatic refetching                     │             │
│  │  - Optimistic updates                       │             │
│  └──────────────────────────────────────────────┘             │
│  ┌──────────────────────────────────────────────┐             │
│  │  React Context (Client State)               │             │
│  │  - Authentication state                     │             │
│  │  - Theme preferences                        │             │
│  │  - User session                             │             │
│  └──────────────────────────────────────────────┘             │
└───────────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────┼─────────────────────────────────────┐
│                    Data/API Layer                             │
│  ┌──────────────────────▼──────────────────────┐             │
│  │         Supabase Client                     │             │
│  │  - Authentication                           │             │
│  │  - Database queries                         │             │
│  │  - Real-time subscriptions                  │             │
│  └──────────────────────────────────────────────┘             │
└───────────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────┼─────────────────────────────────────┐
│                    Backend Services                           │
│  ┌──────────────────────▼──────────────────────┐             │
│  │            Supabase (BaaS)                  │             │
│  │  ┌────────────────────────────────────────┐ │             │
│  │  │  PostgreSQL Database                   │ │             │
│  │  │  - Movies, Bookings, Users             │ │             │
│  │  └────────────────────────────────────────┘ │             │
│  │  ┌────────────────────────────────────────┐ │             │
│  │  │  Authentication Service                │ │             │
│  │  │  - JWT tokens                          │ │             │
│  │  │  - Session management                  │ │             │
│  │  └────────────────────────────────────────┘ │             │
│  │  ┌────────────────────────────────────────┐ │             │
│  │  │  Storage Service                       │ │             │
│  │  │  - Movie posters                       │ │             │
│  │  │  - User avatars                        │ │             │
│  │  └────────────────────────────────────────┘ │             │
│  └──────────────────────────────────────────────┘             │
└───────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Page Components (Routes)
```
src/pages/
├── Index.tsx           # Homepage - Movie catalog
├── MovieDetail.tsx     # Movie details & booking
├── Auth.tsx            # Login/Signup
├── Payment.tsx         # Payment processing
├── Bookings.tsx        # User booking history
└── NotFound.tsx        # 404 page
```

### Feature Components
```
src/components/
├── booking/
│   ├── SeatMap.tsx              # Interactive seat selection
│   ├── ShowtimeSelector.tsx     # Date/time picker
│   └── BookingSummary.tsx       # Booking review
├── home/
│   ├── HeroSection.tsx          # Landing hero
│   ├── FeaturesSection.tsx      # Feature highlights
│   └── MovieGrid.tsx            # Movie catalog grid
├── movies/
│   ├── MovieCard.tsx            # Movie display card
│   └── MovieHero.tsx            # Movie detail hero
└── layout/
    ├── Header.tsx               # Navigation bar
    └── Footer.tsx               # Footer section
```

## Data Flow

### Booking Flow Example

```
User Action → Component → Hook → API → Database
    │            │         │      │       │
    │            │         │      │       │
    ▼            ▼         ▼      ▼       ▼
Click Seat → SeatMap → useBooking → Supabase → bookings table
                │
                ├─ Update local state
                ├─ Validate selection
                └─ Trigger re-render
```

### Authentication Flow

```
1. User submits credentials
   └─▶ Auth.tsx component

2. Form validation
   └─▶ React Hook Form + Zod

3. API call
   └─▶ Supabase Auth

4. Token received
   └─▶ Store in AuthContext

5. Redirect to protected route
   └─▶ React Router
```

## State Management Strategy

### Server State (TanStack Query)
- Movie data
- Booking information
- User bookings
- Showtime availability

**Benefits:**
- Automatic caching
- Background refetching
- Optimistic updates
- Loading/error states

### Client State (React Context)
- Authentication status
- User session
- Theme preferences
- UI state (modals, toasts)

**Benefits:**
- Simple API
- No external dependencies
- Built-in React feature

### Local Component State (useState)
- Form inputs
- UI toggles
- Temporary data
- Component-specific state

## Routing Strategy

```typescript
<BrowserRouter>
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<Index />} />
    <Route path="/movie/:id" element={<MovieDetail />} />
    <Route path="/auth" element={<Auth />} />
    
    {/* Protected routes */}
    <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
    <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
    
    {/* Catch-all */}
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

## Performance Optimizations

### Code Splitting
```typescript
// Lazy load heavy components
const MovieDetail = lazy(() => import('./pages/MovieDetail'));
const Payment = lazy(() => import('./pages/Payment'));
```

### Image Optimization
- Lazy loading with Intersection Observer
- Responsive images with srcset
- WebP format with fallbacks
- Placeholder blur effect

### Bundle Optimization
- Tree shaking (Vite)
- Minification
- Compression (gzip/brotli)
- CSS purging (Tailwind)

## Security Architecture

### Authentication
- JWT tokens stored in httpOnly cookies
- Refresh token rotation
- Session timeout
- CSRF protection

### Data Validation
- Client-side: Zod schemas
- Server-side: Supabase RLS policies
- Input sanitization
- XSS prevention (React escaping)

### API Security
- Environment variables for secrets
- CORS configuration
- Rate limiting
- SQL injection prevention (Supabase)

## Database Schema

### Entity Relationship Diagram

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│    Users    │         │   Movies    │         │  Showtimes  │
├─────────────┤         ├─────────────┤         ├─────────────┤
│ id (PK)     │         │ id (PK)     │         │ id (PK)     │
│ email       │         │ title       │         │ movie_id(FK)│
│ name        │         │ description │         │ date        │
│ created_at  │         │ genre       │         │ time        │
└──────┬──────┘         │ duration    │         │ price       │
       │                │ rating      │         └──────┬──────┘
       │                │ poster_url  │                │
       │                └──────┬──────┘                │
       │                       │                       │
       │                       │                       │
       │                ┌──────┴───────────────────────┘
       │                │
       │         ┌──────▼──────┐
       │         │  Bookings   │
       │         ├─────────────┤
       └────────▶│ id (PK)     │
                 │ user_id(FK) │
                 │ movie_id(FK)│
                 │ showtime_id │
                 │ seats       │
                 │ total_price │
                 │ status      │
                 │ created_at  │
                 └─────────────┘
```

## Deployment Architecture

### Build Process
```
Source Code → TypeScript Compilation → Vite Build → Optimized Bundle
     │              │                      │              │
     │              │                      │              │
     ▼              ▼                      ▼              ▼
  .tsx/.ts      Type Check            Tree Shake      dist/
                                      Minify
                                      Compress
```

### Hosting (Vercel)
- Edge network CDN
- Automatic HTTPS
- Serverless functions (if needed)
- Preview deployments
- Analytics

## Scalability Considerations

### Current Architecture
- Client-side rendering (CSR)
- Static hosting
- Serverless backend (Supabase)

### Future Improvements
- Server-side rendering (Next.js)
- Edge caching (Cloudflare)
- Database read replicas
- Redis caching layer
- WebSocket for real-time updates
- Microservices for payment/notifications

## Technology Decisions

### Why React?
- Component reusability
- Large ecosystem
- Strong TypeScript support
- Virtual DOM performance

### Why TypeScript?
- Type safety
- Better IDE support
- Catch errors early
- Self-documenting code

### Why Vite?
- Fast HMR
- Modern build tool
- ESM-first
- Better DX than Webpack

### Why Tailwind CSS?
- Utility-first approach
- Consistent design system
- Small bundle size (purged)
- Rapid development

### Why TanStack Query?
- Declarative data fetching
- Automatic caching
- Background updates
- Optimistic UI

### Why Supabase?
- PostgreSQL database
- Built-in authentication
- Real-time capabilities
- RESTful API
- Open source

## Monitoring & Analytics

### Recommended Tools
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics / Plausible
- **Performance**: Lighthouse CI
- **Uptime**: UptimeRobot
- **Logs**: Vercel Analytics

## Development Workflow

```
1. Feature Branch
   └─▶ git checkout -b feature/seat-selection

2. Development
   └─▶ npm run dev (local testing)

3. Commit
   └─▶ git commit -m "feat: add seat selection"

4. Push & PR
   └─▶ git push origin feature/seat-selection

5. Code Review
   └─▶ GitHub PR review

6. Merge to Main
   └─▶ Automatic deployment (Vercel)

7. Production
   └─▶ Live at screema.vercel.app
```

## Testing Strategy

### Unit Tests (Recommended)
```typescript
// Component tests
describe('SeatMap', () => {
  it('renders available seats', () => {
    // Test implementation
  });
});

// Hook tests
describe('useBooking', () => {
  it('calculates total price correctly', () => {
    // Test implementation
  });
});
```

### Integration Tests
- User flows (booking journey)
- API integration
- Authentication flow

### E2E Tests (Playwright)
- Critical user paths
- Payment flow
- Booking confirmation

## Conclusion

SCREEMA follows modern web development best practices with a focus on:
- **Maintainability**: Clear structure, TypeScript, documentation
- **Performance**: Code splitting, lazy loading, optimized builds
- **Scalability**: Modular architecture, serverless backend
- **Developer Experience**: Fast HMR, type safety, modern tooling
- **User Experience**: Responsive design, smooth animations, accessibility

This architecture supports current needs while allowing for future growth and feature additions.
