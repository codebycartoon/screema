# SCREEMA Architecture Documentation

## 🏗️ **System Overview**

SCREEMA is built as a modern, scalable web application using a **JAMstack architecture** with real-time capabilities. The system prioritizes performance, security, and user experience.

## 📐 **Architecture Diagram**

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React App)                     │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Pages     │  │ Components  │  │   Hooks     │         │
│  │             │  │             │  │             │         │
│  │ • Auth      │  │ • UI System │  │ • useAuth   │         │
│  │ • Dashboard │  │ • Booking   │  │ • useNotif  │         │
│  │ • Movies    │  │ • Movies    │  │ • useData   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│                   State Management                          │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ React Context + Custom Hooks + Local State             │ │
│  └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                  API Integration Layer                      │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │           Supabase Client SDK                           │ │
│  │  • Authentication  • Database  • Real-time             │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Backend Services                          │
├─────────────────────────────────────────────────────────────┤
│                    Supabase Platform                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ PostgreSQL  │  │    Auth     │  │  Real-time  │         │
│  │ Database    │  │   Service   │  │  Websockets │         │
│  │             │  │             │  │             │         │
│  │ • Movies    │  │ • JWT Tokens│  │ • Live Data │         │
│  │ • Users     │  │ • Sessions  │  │ • Presence  │         │
│  │ • Bookings  │  │ • RLS       │  │ • Updates   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Deployment                             │
├─────────────────────────────────────────────────────────────┤
│                    Vercel Platform                          │
│  • Edge Network    • Automatic Scaling   • CI/CD           │
│  • Global CDN      • Preview Deployments • Analytics       │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 **Core Technologies**

### **Frontend Stack**
- **React 18**: Component-based UI with concurrent features
- **TypeScript**: Static type checking and enhanced developer experience
- **Vite**: Fast build tool with HMR and optimized bundling
- **Tailwind CSS**: Utility-first styling with custom design system
- **Shadcn/ui**: Accessible, customizable component library

### **Backend Services**
- **Supabase**: Backend-as-a-Service providing:
  - PostgreSQL database with real-time subscriptions
  - JWT-based authentication with Row Level Security
  - File storage and CDN
  - Edge functions (planned)

### **Deployment & Infrastructure**
- **Vercel**: Edge deployment with automatic scaling
- **GitHub**: Version control and CI/CD integration
- **Cloudflare**: DNS and additional CDN layer

## 🔐 **Security Architecture**

### **Authentication Flow**
```
User Login Request
       │
       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │───▶│  Supabase Auth  │───▶│   PostgreSQL    │
│                 │    │                 │    │                 │
│ • Login Form    │    │ • JWT Creation  │    │ • User Lookup   │
│ • Validation    │    │ • Session Mgmt  │    │ • RLS Policies  │
│ • State Update  │    │ • Token Refresh │    │ • Data Access   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
       │                        │                        │
       ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Local Storage   │    │   HTTP Headers  │    │  Row Level      │
│                 │    │                 │    │  Security       │
│ • JWT Token     │    │ • Authorization │    │                 │
│ • User Data     │    │ • Bearer Token  │    │ • User Context  │
│ • Preferences   │    │ • Auto Refresh  │    │ • Data Isolation│
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Data Security**
- **Row Level Security (RLS)**: Database-level access control
- **JWT Tokens**: Stateless authentication with automatic refresh
- **HTTPS Everywhere**: Encrypted data transmission
- **Input Validation**: Client and server-side validation
- **SQL Injection Prevention**: Parameterized queries via Supabase

## 📊 **Data Architecture**

### **Database Schema**
```sql
-- Core Tables
users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  full_name TEXT,
  phone TEXT,
  tier_id TEXT,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP
)

movies (
  id UUID PRIMARY KEY,
  title TEXT,
  description TEXT,
  poster_url TEXT,
  release_date DATE,
  duration INTEGER,
  rating TEXT,
  genres TEXT[]
)

bookings (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  movie_id UUID REFERENCES movies(id),
  theater_name TEXT,
  showtime TIMESTAMP,
  seats TEXT[],
  total_amount DECIMAL,
  status TEXT,
  created_at TIMESTAMP
)

notifications (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title TEXT,
  message TEXT,
  type TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP
)
```

### **State Management Strategy**

```typescript
// Context-based state management
interface AppState {
  // Authentication
  user: User | null;
  session: Session | null;
  loading: boolean;
  
  // Application data
  movies: Movie[];
  bookings: Booking[];
  notifications: Notification[];
  
  // UI state
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
}

// Custom hooks for data fetching
const useAuth = () => { /* Supabase auth integration */ };
const useMovies = () => { /* Movie data with caching */ };
const useBookings = () => { /* User booking history */ };
const useNotifications = () => { /* Real-time notifications */ };
```

## 🚀 **Performance Architecture**

### **Optimization Strategies**
1. **Code Splitting**: Route-based lazy loading
2. **Image Optimization**: WebP format with fallbacks
3. **Bundle Analysis**: Webpack bundle analyzer integration
4. **Caching Strategy**: Browser caching + CDN
5. **Real-time Optimization**: Selective subscriptions

### **Build Process**
```bash
# Development
npm run dev          # Vite dev server with HMR
npm run type-check   # TypeScript validation
npm run lint         # ESLint code quality

# Production
npm run build        # Optimized production build
npm run preview      # Local production preview
npm run analyze      # Bundle size analysis
```

## 🔄 **Real-time Features**

### **Supabase Real-time Integration**
```typescript
// Real-time seat availability
const seatSubscription = supabase
  .channel('seat-updates')
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'bookings'
  }, (payload) => {
    updateSeatAvailability(payload.new);
  })
  .subscribe();

// Live notifications
const notificationSubscription = supabase
  .channel(`user-notifications:${userId}`)
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'notifications',
    filter: `user_id=eq.${userId}`
  }, (payload) => {
    addNotification(payload.new);
  })
  .subscribe();
```

## 📱 **Mobile & Responsive Strategy**

### **Responsive Breakpoints**
```css
/* Tailwind CSS breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

### **Mobile-First Approach**
- Touch-optimized interactions
- Swipe gestures for carousels
- Responsive navigation patterns
- Progressive Web App (PWA) capabilities

## 🔍 **Monitoring & Analytics**

### **Performance Monitoring**
- **Vercel Analytics**: Core web vitals tracking
- **Lighthouse CI**: Automated performance testing
- **Bundle Analysis**: Size and dependency tracking

### **Error Handling**
```typescript
// Global error boundary
class ErrorBoundary extends Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to monitoring service
    console.error('Application error:', error, errorInfo);
  }
}

// API error handling
const handleApiError = (error: PostgrestError) => {
  if (error.code === 'PGRST116') {
    // Handle authentication errors
    redirectToLogin();
  } else {
    // Show user-friendly error message
    toast.error('Something went wrong. Please try again.');
  }
};
```

## 🚀 **Deployment Pipeline**

### **CI/CD Workflow**
```yaml
# GitHub Actions (planned)
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm run test
      - name: Type check
        run: npm run type-check
      - name: Lint
        run: npm run lint
      - name: Build
        run: npm run build
      - name: Deploy to Vercel
        uses: vercel/action@v1
```

## 🔮 **Future Architecture Considerations**

### **Planned Enhancements**
1. **Microservices**: Extract payment processing
2. **Caching Layer**: Redis for session management
3. **Message Queue**: Background job processing
4. **CDN Optimization**: Image and asset optimization
5. **Edge Functions**: Server-side logic at the edge
6. **Testing Infrastructure**: Comprehensive test suite

### **Scalability Roadmap**
- **Database Sharding**: User-based partitioning
- **Load Balancing**: Multi-region deployment
- **Caching Strategy**: Multi-layer caching
- **API Rate Limiting**: Prevent abuse
- **Monitoring**: Advanced observability

---

*This architecture supports the current scale and provides a foundation for future growth.*