# Developer Portfolio

## Overview

This is a developer portfolio application showcasing Minecraft plugins and Discord bots for Fl1uxxNoob, a 19-year-old developer from Lombardy, Italy. The project is built as a full-stack web application with a React frontend and Express.js backend, featuring a modern dark theme design with interactive mouse-following light effects optimized for showcasing development projects.

## System Architecture

The application follows a modern full-stack architecture with clear separation between client and server:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom dark theme
- **UI Components**: Radix UI primitives with shadcn/ui components
- **Animations**: Framer Motion for smooth animations and transitions
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Storage**: PostgreSQL sessions with connect-pg-simple
- **Development**: Hot module replacement with Vite integration

## Key Components

### Client-Side Components
1. **Navigation**: Fixed navigation with smooth scrolling and active section detection (includes Screenshots section)
2. **HeroSection**: Landing section with animated floating lights background, gradient animations, call-to-action, and interactive mouse light
3. **AboutSection**: Personal introduction with expanded skill tags (Java, Python, C++, C#, JavaScript, HTML, CSS, SQLite) and animations
4. **PluginsSection**: Showcase of Minecraft plugins with status indicators and mouse interaction
5. **BotsSection**: Display of Discord bots with feature highlights and mouse effects
6. **ScreenshotsSection**: Interactive carousel showcasing plugin and bot screenshots with category filtering
7. **ContactSection**: Contact form with toast notifications and interactive lighting
8. **Footer**: Simple footer with copyright information
9. **MouseLight**: Interactive mouse-following light effect component for enhanced user experience

### Server-Side Components
1. **Storage Interface**: Abstraction layer for data operations (currently in-memory)
2. **Route Handlers**: Express.js routes with /api prefix
3. **Vite Integration**: Development server with HMR support
4. **Error Handling**: Centralized error handling middleware

### Data Models
- **User Schema**: Basic user model with username and password fields
- **Project Data**: Real project information for 6 Minecraft plugins (AFKGuard, ControlPlayers, BetterClaim, BossCore, TNTTag, DeathSwap) and 1 Discord moderation bot
- **Plugin Detail System**: Individual pages with multiple screenshots and detailed feature explanations
- **Bot Detail System**: Dedicated pages for Discord bots with comprehensive functionality showcases
- **Screenshot Management**: Structured data for project demonstrations with category filtering
- **Mouse Position Tracking**: Custom hook for real-time cursor coordinates

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **Server Processing**: Express.js handles requests through route handlers  
3. **Data Storage**: Storage interface abstracts database operations
4. **Response Handling**: JSON responses with proper error handling
5. **UI Updates**: React components update based on server responses

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React ecosystem with hooks and context
- **Styling**: Tailwind CSS with PostCSS processing
- **Icons**: Lucide React icons and React Icons
- **Animations**: Framer Motion for page transitions
- **Forms**: React Hook Form with Hookform Resolvers
- **HTTP Client**: Fetch API with TanStack Query wrapper

### Backend Dependencies
- **Database**: Drizzle ORM with PostgreSQL dialect
- **Authentication**: Session-based (infrastructure ready)
- **Development**: TSX for TypeScript execution
- **Build**: ESBuild for production bundling

### Development Tools
- **TypeScript**: Strict type checking across the stack
- **ESLint/Prettier**: Code formatting and linting (implied by structure)
- **Vite Plugins**: Runtime error overlay and cartographer for Replit

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20 runtime  
- **Database**: PostgreSQL 16 module
- **Port Configuration**: Local port 5000, external port 80
- **Hot Reload**: Vite HMR with Express.js middleware integration

### Production Build
- **Frontend**: Vite build with code splitting and optimization
- **Backend**: ESBuild bundling with external package handling
- **Assets**: Static file serving from dist/public directory
- **Database**: Neon Database for serverless PostgreSQL hosting

### Environment Configuration
- **Development**: `npm run dev` with TSX execution
- **Production**: `npm run build` followed by `npm run start`
- **Database Migration**: `npm run db:push` for schema updates

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- **June 21, 2025 - Enhanced Plugin/Bot Detail System**: Created individual detail pages for each plugin and bot with dedicated URLs (/plugin/:id, /bot/:id). Implemented multi-screenshot carousel system with navigation controls and detailed feature explanations. Added comprehensive content management system with structured data for easy expansion.
- **June 21, 2025 - Advanced Animated Background**: Enhanced floating lights with multiple animation types (float, drift, spiral, pulse) and increased particle count to 6 lights with varied sizes and timing. Added rotation effects and improved visual complexity for more engaging background animation.
- **June 21, 2025 - Navigation System**: Updated routing to support plugin and bot detail pages with smooth transitions. Added "Dettagli" buttons to plugin and bot cards for accessing individual project pages with full documentation.
- **June 21, 2025 - Content Structure**: Created comprehensive guide (GUIDA_AGGIUNTA_CONTENUTI.md) for adding new plugins, bots, screenshots, and descriptions. Established data structure for expandable content management.
- **June 21, 2025 - Animated Background & Screenshots Section**: Added floating animated lights background to hero section with CSS keyframe animations. Created comprehensive Screenshots section with interactive carousel, category filtering (All/Plugins/Bots), and project demonstrations. Enhanced skills section with JavaScript, HTML, CSS additions.
- **June 21, 2025 - Interactive Mouse Effects**: Added mouse-following light effect throughout the portfolio sections for enhanced user experience. Created custom useMousePosition hook and MouseLight component with configurable intensity and size.
- **June 21, 2025 - Real Project Data**: Updated portfolio with authentic project information including 6 Minecraft plugins (AFKGuard, ControlPlayers, BetterClaim, BossCore, TNTTag, DeathSwap) and 1 Discord moderation bot with direct GitHub links.

## Changelog

- June 21, 2025. Portfolio development and interactive enhancements