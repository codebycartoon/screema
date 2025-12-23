# SCREEMA - Premium Cinema Experience

## Project Overview

SCREEMA is a modern cinema booking platform built with React, TypeScript, and Tailwind CSS. This project showcases a complete cinema booking system with user authentication, seat selection, payment processing, and user dashboard functionality.

**Built by:** Frankline Onguti  
**Location:** Mombasa, Kenya  
**Contact:** support@screema.com | +254 714840103

## Features

- 🎬 Movie browsing with now showing and coming soon sections
- 🎫 Interactive seat selection and booking
- 🍿 Snacks and concessions ordering
- 👤 User authentication and profile management
- 📱 Responsive design for all devices
- 🎯 Rewards and loyalty program
- 📊 User dashboard with booking history
- 🔔 Notification system
- 💳 Payment processing interface

## Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **Build Tool:** Vite
- **UI Components:** Shadcn/ui
- **Icons:** Lucide React
- **Routing:** React Router
- **State Management:** React Context
- **Authentication:** Supabase Auth
- **Styling:** Tailwind CSS with custom design system

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd screema-cinema
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Add your Supabase credentials and other environment variables
```

4. Start the development server
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── booking/        # Booking-related components
│   ├── dashboard/      # User dashboard components
│   ├── home/          # Homepage sections
│   ├── layout/        # Layout components (Header, Footer)
│   ├── movies/        # Movie-related components
│   └── ui/            # Base UI components
├── data/              # Mock data and constants
├── hooks/             # Custom React hooks
├── integrations/      # Third-party integrations
├── lib/               # Utility functions
├── pages/             # Page components
└── types/             # TypeScript type definitions
```

## Key Features Implementation

### Movie Booking System
- Interactive seat map with different seat types (Standard, Premium, VIP)
- Real-time seat availability
- Showtime selection across multiple theaters
- Snacks and concessions integration

### User Dashboard
- Booking history and management
- Watchlist functionality
- Notification system with badges
- Rewards points tracking
- Profile management

### Coming Soon Movies
- Portfolio-worthy implementation with smart CTAs
- Release countdown and cinema availability preview
- Notification system for ticket availability
- Calendar reminder integration

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions
- Progressive Web App (PWA) support

## Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Contributing

This is a portfolio project by Frankline Onguti. If you'd like to suggest improvements or report issues, please feel free to reach out.

## License

This project is created for portfolio purposes. All rights reserved by Frankline Onguti.

## Contact

- **Developer:** Frankline Onguti
- **Email:** support@screema.com
- **Phone:** +254 714840103
- **Location:** Mombasa, Kenya

---

*Built with ❤️ in Kenya*