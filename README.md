# VocaB.AI - Multi-Service AI Platform

A modern Next.js application that provides access to multiple AI services including SARATHI-AI, CHITRA-AI, and Vani AI. The platform features Google OAuth authentication, user management, and a comprehensive landing page showcasing the services.

## 🏗️ Architecture Overview

The application follows a modern Next.js 13+ architecture with the App Router, featuring a component-based design with clear separation of concerns.

```
vocab-ai-new/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── timesheets/        # Timesheets page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── public/               # Static assets
└── styles/               # Additional stylesheets
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 13+** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Hooks** - State management and side effects

### Backend & APIs
- **Next.js API Routes** - Server-side functionality
- **Google OAuth 2.0** - Authentication provider
- **RESTful APIs** - Communication with external services

### Development Tools
- **pnpm** - Fast, disk space efficient package manager
- **PostCSS** - CSS processing
- **ESLint & TypeScript** - Code quality and type checking

## 🏛️ Core Components

### Authentication System
- **Google OAuth Integration** (`lib/google-auth.ts`)
- **Auth Hook** (`hooks/use-auth.ts`) - Centralized authentication state
- **Protected Routes** - Conditional rendering based on auth status

### UI Components

#### Layout Components
- **Header** (`components/header.tsx`) - Navigation with auth integration
- **Footer** (`components/footer.tsx`) - Site footer
- **Theme Provider** (`components/theme-provider.tsx`) - Theme management

#### Landing Page Sections
- **Hero Section** (`components/hero-section.tsx`) - Main landing area
- **Features Section** (`components/features-section.tsx`) - Product features
- **Why Choose Us** (`components/why-choose-us.tsx`) - Value propositions
- **Team Section** (`components/team-section.tsx`) - Team showcase
- **Gallery Section** (`components/gallery-section.tsx`) - Visual content
- **Contact Section** (`components/contact-section.tsx`) - Contact form
- **FAQ Section** (`components/faq-section.tsx`) - Frequently asked questions

#### Functional Components
- **Timesheets Component** (`components/timesheets-component.tsx`) - Time tracking
- **Auth Debug** (`components/auth-debug.tsx`) - Development authentication helper

### Custom Hooks
- **useAuth** (`hooks/use-auth.ts`) - Authentication state management
- **useMobile** (`hooks/use-mobile.tsx`) - Mobile device detection
- **useToast** (`hooks/use-toast.ts`) - Toast notification system

## 🌐 API Routes

### Authentication
- `GET/POST /api/auth/callback/google` - Google OAuth callback handling
- `GET /api/auth/user` - User session management

### Contact
- `POST /api/contact` - Contact form submission

## 🔧 Key Features

### Multi-Service Integration
The platform integrates three AI services:

1. **SARATHI-AI** - Accessible at `http://27.111.72.61:9002`
2. **CHITRA-AI** - Internal service (placeholder link)
3. **Vani AI** - External service at `https://vad-dg6d.onrender.com`

### Responsive Design
- Mobile-first approach using Tailwind CSS
- Responsive navigation with mobile hamburger menu
- Adaptive layouts across all components

### User Experience
- Smooth scroll navigation between sections
- Active section highlighting in navigation
- Profile image handling with fallbacks
- Loading states and error handling

### Authentication Flow
1. Users can access public content without authentication
2. Login required for accessing AI services and timesheets
3. Google OAuth provides secure authentication
4. Session management with automatic token refresh

## 📱 Responsive Behavior

The application is fully responsive with:
- **Desktop**: Full navigation, dropdown menus, profile pictures
- **Tablet**: Adapted layouts with touch-friendly interactions
- **Mobile**: Hamburger menu, stacked layouts, optimized forms

## 🔒 Security Features

- **OAuth 2.0** implementation for secure authentication
- **Environment variables** for sensitive configuration
- **CORS handling** for API security
- **Client-side route protection**

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation
```bash
# Install dependencies
pnpm install

# Set up environment variables
cp env.example .env.local

# Run development server
pnpm dev
```

### Environment Configuration
Required environment variables:
- Google OAuth credentials
- API endpoints for AI services
- Database connection strings (if applicable)

## 📂 File Organization

### Component Structure
Components follow a modular approach:
- Single responsibility principle
- Reusable and composable
- TypeScript interfaces for props
- Consistent naming conventions

### Styling Approach
- Tailwind CSS for utility-first styling
- Consistent color palette and spacing
- Responsive design patterns
- Dark/light theme support

### State Management
- React hooks for local state
- Custom hooks for shared logic
- Context providers for global state
- Server state via API routes

## 🔮 Future Enhancements

- Additional AI service integrations
- Enhanced user dashboard
- Real-time notifications
- Advanced timesheets features
- Multi-language support

## 📄 License

This project is proprietary software developed for VocaB.AI platform. 