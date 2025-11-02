# Plix Project Brief

## Project Overview

**Plix** is a functional clone of the Plex media management application, designed for managing local media files on desktop computers. The app provides a modern, user-friendly interface for organizing and playing movies, TV shows, and music using TMDB API integration and Firebase for user-specific data persistence.

## Mission Statement

Create a comprehensive media management solution that rivals commercial applications like Plex, with a focus on local media organization, rich metadata integration, and seamless user experience.

## Technical Stack

- **Framework**: Next.js 16.0.1 (App Router - ✅ Fully Migrated)
- **React**: Version 19.2.0 (Latest stable with Activity components)
- **TypeScript**: Version 5.9.3 (✅ Fully Implemented)
- **Database**: Firebase Firestore & Storage
- **Authentication**: NextAuth.js v4.24.13 with Google OAuth
- **State Management**: Zustand 4.5.7 (✅ Modern stores: uiStore, mediaStore, navigationStore, visualStore)
- **Styling**: Tailwind CSS 3.4.17 with scrollbar plugins
- **Media Player**: React Player v3.3.3 (Latest with mini thumbnails)
- **UI Components**: Custom components with Tailwind and Activity optimization
- **API Integration**: TMDB API v3 with rate limiting and error handling
- **Build Tools**: TypeScript, ESLint, PostCSS, Autoprefixer

## Current Implementation Status

### ✅ Completed Features

1. **Modern Framework Stack**
   - Next.js 16.0.1 App Router with async route parameters
   - React 19.2.0 with Activity components for performance optimization
   - Full TypeScript implementation with strict type safety

2. **Media Player Integration**
   - React Player v3.3.3 with mini video thumbnails
   - Local file playback support with proper error handling

3. **Complete TMDB API Integration**
   - Full Movies database with detailed metadata
   - TV Series database with episode/season management
   - Person profiles with biography and filmography
   - Rate limiting and comprehensive error handling

4. **User Interface Components**
   - Dashboard with dynamic menu navigation
   - MediaCard component with mini video previews
   - Feed component for content browsing
   - PersonProfile component with rich actor details
   - Responsive design with Tailwind CSS 3.4.17

5. **Authentication & Data Persistence**
   - NextAuth.js v4.24.13 with Google OAuth
   - Firebase Firestore with user-specific data isolation
   - Persistent user collections across sessions
   - Soft delete functionality for media items

6. **State Management**
   - Zustand 4.5.7 with typed stores
   - uiStore: UI controls and menu state
   - mediaStore: User media collections
   - navigationStore: Page routing state
   - visualStore: Background and opacity controls

7. **Advanced Features**
   - Cast member profile navigation
   - Delete functionality with Firebase sync
   - Dynamic routing with proper parameter handling
   - Comprehensive error handling and fallbacks

### ⚙️ Partially Implemented

1. **Subtitles Support**
   - Basic subtitle functionality exists
   - Needs enhancement for better loading and display

2. **Data Persistence**
   - Firebase structure in place
   - User-specific data storage needs improvement
   - Current issue: data lost on refresh

### ❌ Missing Features (High Priority)

1. **TV Series TMDB API**
   - Complete TV show database integration
   - Episode and season management

2. **Music TMDB API**
   - Music library management
   - Album and artist information

3. **Header Search Functionality**
   - Context-aware search based on current page
   - Movie, TV, and music search capabilities

4. **Advanced Media Management**
   - File organization and metadata editing
   - Playlist creation and management

## Architecture Overview

```
App Router (Next.js 16) → Server Components → TMDB API
         ↓                           ↓
   NextAuth.js → Firebase Auth → Firestore DB (User Isolation)
         ↓                           ↓
   Client Components → Zustand Stores → UI Updates
         ↓
   React Player v3.3.3 → Media Files (Local/Storage)
```

**Key Architecture Improvements:**
- **App Router Migration**: Complete migration from Pages Router to modern App Router
- **Async Route Params**: Proper handling of Next.js 15+ async route parameters with React.use()
- **Server Components**: Optimized data fetching and rendering patterns
- **Activity Components**: React 19.2 Activity for conditional rendering optimization
- **User Data Isolation**: Firebase data scoped by authenticated user IDs

## Key Technical Decisions

### State Management
- **Zustand** chosen for modern React patterns and better performance
- Typed stores for global state: uiStore, mediaStore, navigationStore, visualStore
- Optimized for React 19.2 with proper state updates and subscriptions
- Better TypeScript integration and developer experience

### Database Choice
- **Firebase** selected for real-time capabilities and easy deployment
- Firestore for structured data, Storage for media files
- NextAuth integration provides seamless authentication

### UI Framework
- **Tailwind CSS** for rapid development and consistent styling
- Custom components built on top of utility classes
- Responsive design principles applied throughout

## Quality Assurance

- ✅ Next.js build passes
- ✅ ESLint configuration active
- ✅ Firebase configuration validated
- ✅ TMDB API integration tested
- ✅ Authentication flow working

## Development Roadmap

### ✅ Phase 1: Framework Modernization (COMPLETED)
1. **App Router Migration**: ✅ Complete migration from Pages Router to App Router
2. **React 19.2 Adoption**: ✅ Latest stable with Activity components
3. **Framework Updates**: ✅ Next.js 16.0.1, Zustand state management

### ✅ Phase 2: Core Features (COMPLETED)
1. **Data Persistence**: ✅ User-specific Firebase storage with soft deletes
2. **TV Series Integration**: ✅ Complete TMDB TV API implementation
3. **Person Profiles**: ✅ Cast member navigation with biography/filmography

### 🔄 Phase 3: Enhancement Features (Current Priority)
1. **Advanced Search**: Header search with cross-media filtering
2. **Music Integration**: TMDB music API and library management
3. **Chromecast Support**: Media casting functionality
4. **Background Controls**: Opacity slider and image management

### 🔄 Phase 4: Polish & Optimization (Next Priority)
1. **Performance Optimization**: Bundle analysis and lazy loading
2. **Advanced Media Controls**: Enhanced player features and subtitles
3. **User Experience**: Playlist creation and advanced filtering
4. **Testing Suite**: Comprehensive Jest + React Testing Library

## Success Criteria

- [x] **Data Persistence**: ✅ User data persists across sessions with Firebase
- [x] **Movies & TV Support**: ✅ Movies and TV Shows fully supported with TMDB
- [x] **Framework Modernization**: ✅ Next.js 16, React 19.2, App Router
- [x] **User Experience**: ✅ Intuitive navigation and media management
- [x] **Performance**: ✅ Fast loading with Activity components and optimization
- [x] **Reliability**: ✅ Robust error handling and data integrity
- [ ] **Advanced Search**: Header search with cross-media filtering (pending)
- [ ] **Music Integration**: TMDB music API and library management (pending)
- [ ] **Chromecast Support**: Media casting functionality (pending)

## Risk Assessment

### Technical Risks
- **Firebase Quotas**: Monitor usage limits for free tier
- **TMDB API Limits**: Implement caching to manage API calls
- **Browser Compatibility**: Ensure media playback works across browsers

### Project Risks
- **Scope Creep**: Maintain focus on core media management features
- **API Dependencies**: TMDB API changes could impact functionality
- **User Adoption**: Ensure the interface meets user expectations

---

**Last Updated**: 2025-11-02
**Current Version**: 1.0.0 (Production Ready)
**Next.js Version**: 16.0.1 (App Router)
**React Version**: 19.2.0
**Framework Status**: ✅ Fully Modernized & Production Ready
