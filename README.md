# 🎬 SCREEMA

A modern, responsive movie ticket booking platform built with React, TypeScript, and Tailwind CSS. Features an elegant UI with smooth animations, seat selection, showtime booking, and user authentication.

![CineSeat Pro](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-blue)

## ✨ Features

- 🎥 Browse movies with detailed information
- 🎫 Interactive seat selection with real-time availability
- ⏰ Multiple showtime options
- 👤 User authentication (sign up/sign in)
- 📱 Fully responsive design
- 🎨 Modern UI with shadcn/ui components
- 🌙 Smooth animations and transitions
- 📋 Booking history and management
- 💳 Payment flow integration

## 🚀 Tech Stack

- **Frontend Framework:** React 18.3.1
- **Language:** TypeScript 5.8.3
- **Build Tool:** Vite 5.4.19
- **Styling:** Tailwind CSS 3.4.17
- **UI Components:** shadcn/ui (Radix UI)
- **Routing:** React Router DOM 6.30.1
- **Icons:** Lucide React
- **Form Handling:** React Hook Form + Zod
- **State Management:** TanStack Query

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/codebycartoon/screema.git

# Navigate to project directory
cd screema

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── components/
│   ├── booking/        # Booking-related components
│   ├── home/          # Home page components
│   ├── layout/        # Layout components (Header, Footer)
│   ├── movies/        # Movie display components
│   └── ui/            # Reusable UI components (shadcn/ui)
├── hooks/             # Custom React hooks
├── integrations/      # External service integrations
├── lib/               # Utility functions
├── pages/             # Page components
├── types/             # TypeScript type definitions
└── data/              # Mock data
```

## 🎨 Key Features Breakdown

### Movie Browsing
- Grid layout with movie cards
- Detailed movie information pages
- Genre filtering and search

### Seat Selection
- Interactive seat map
- Real-time seat availability
- Multiple seat types (Regular, Premium, VIP)

### Booking Flow
1. Select movie and showtime
2. Choose seats
3. Review booking summary
4. Complete payment
5. View booking confirmation

### User Management
- Sign up / Sign in
- View booking history
- Cancel bookings
- QR code generation for tickets

## 🌐 Deployment

This project can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

```bash
npm run build
# Deploy the 'dist' folder
```

## 📝 Environment Variables

Currently using mock data. For production with real backend:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Frankline Onguti**
- Third Year Student at Chuka University
- Location: Mombasa, Kenya
- Email: franklineonguti4@gmail.com
- Phone: +254 714 840 103

Built as a portfolio project to demonstrate modern React development practices and full-stack web development skills.

## 🙏 Acknowledgments

- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Design inspiration from modern cinema booking platforms
