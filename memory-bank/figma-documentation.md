# Figma Design System Documentation

## Overview
This document provides comprehensive documentation of the Smart Home Dashboard design system extracted from the Figma file "Site & Portfolio view [New]".

## Document Structure
- **Total Components**: 150+ design elements
- **Main Design**: "Sites View - concept 2" - Complete smart home dashboard
- **Design Focus**: EV charging management, site portfolio, energy monitoring
- **Theme**: Dark theme (#16191b background) with blue accents (#0094ff)

---

## 🎯 Main Design: "Sites View - concept 2"

### Layout Overview
- **Full-screen dashboard** (1512px × 982px)
- **3-section layout**: Header, Sidebar, Main Content
- **Dark theme** with consistent color palette
- **Responsive design** with proper spacing and typography

### Header Component
**Global Header** - Complete navigation and notification system

#### Left Section - Branding
- **Logo**: Custom SVG logo with layered design elements
- **Apollo-style branding** with blue accent colors

#### Center Section - Search
- **Smart Search Bar**: 370px wide with rounded corners
- **Filter Dropdown**: "All" button with chevron icon
- **Placeholder**: "Search sites, fleet, customers"

#### Right Section - Notifications & User
- **7 Notification Icons**:
  - Search, Events, Issues (3), Collaboration, Mail, Alerts (2)
- **Notification Badges**: Blue circular badges with white numbers
- **User Profile**:
  - Avatar with "TM" initials
  - User info: "Name Surname", "Role", "On Call" status
  - Dropdown menu indicator

### Sidebar Component
**Collapsible Navigation** - Icon-only sidebar with hamburger menu

#### Structure
- **Header Section**: Hamburger collapse button
- **Navigation Section**: 4 Dashboard variants + Plan List + Services
- **Settings Section**: Settings menu at bottom

#### Navigation Items
- Dashboard Overview (Home icon)
- Dashboard Analytics (BarChart icon)
- Dashboard Performance (Activity icon)
- Dashboard Devices (Monitor icon)
- Plan List (Layers icon)
- Services (Zap icon)
- Settings (Settings icon)

### Main Content Areas

#### Site Information Section
- **Site Header**: "10 Woodlane Avenue" with location and capacity
- **Summary Cards**:
  - Location card with address details
  - Extras card with 4.2kWp capacity
  - Alarms/Tickets card with status indicators
- **Tags**: UK Zone A, Optimiser, Controls (3)

#### KPI Metrics Grid
**8 Comprehensive Metric Cards**:
- **EV Charging**: 12.90 kWh, £3.25 cost, 65% consumption
- **Grid Import**: 21.00 kWh, £5.25 cost
- **Other**: 8.10 kWh
- **Generation**: 3.42 kW
- **Grid Export**: 0.10 kW
- **Savings**: £12.4
- **Autonomy**: 21%
- **Self-Consumption**: 95%

#### Time Controls
- **Period Selector**: Daily/Monthly/Yearly/Lifetime
- **Date Navigation**: Previous/Next month with current date display
- **View More** button and refresh functionality

#### Energy Analytics Chart
- **Power Curves Visualization**: Interactive chart system
- **Multiple Data Lines**: Consumption, Generation, Grid, Battery, SoC
- **Time Axis**: Hourly intervals from 10:15 PM to 12:15 PM
- **Legend System**: Color-coded data indicators

#### Device Overview Grid
**9 Device Cards** in 3-column layout:
- **Grid** (Priority 1): 0.15 kW - Inactive
- **Storage** (Priority 1): 0.15 kW - 2h 31m
- **EV** (Priority 1): 1.40 kW - Charging
- **Solar** (Priority 2): 2.20 kW - Generating
- **Home** (Priority 1): 0.15 kW - Active
- **Heating** (Priority 2): 1.75 kW - Scheduled
- **Pool Pump** (Priority 3): 1.25 kW - Optimised
- **Pool Pump** (Priority 4): 1.25 kW - Optimised
- **Pool Pump** (Priority 5): 1.25 kW - Optimised
- **Battery** (Priority 1): 3.55 kW - Discharging
- **Other Loads**: 1.35 kW

#### Site Performance Section
- **Optimiser Controls**: Cost savings and optimization settings
- **Tariff Information**: Import/Export tariff display
- **Performance Metrics**: Real-time monitoring

#### Alarms & Tickets Section
- **Issue Tracking**: Status-based alarm management
- **Support Tickets**: User support ticket system
- **Notification System**: Real-time alerts and updates

---

## 🎨 Design System Components

### Color Palette
- **Primary Background**: #16191b (Dark theme)
- **Accent Blue**: #0094ff (Primary actions, highlights)
- **Text Colors**:
  - Primary: #ffffff (White)
  - Secondary: #f9fbfd (Light gray)
  - Muted: #bbc7ce (Medium gray)
  - Disabled: #727b83 (Dark gray)
- **Status Colors**:
  - Success: #18ac24 (Green)
  - Warning: #f68500 (Orange)
  - Error: #ea0556 (Red)
  - Info: #2dd1e7 (Cyan)

### Typography
- **Font Families**:
  - Primary: Open Sans
  - Secondary: Lato (Headers)
  - Monospace: Roboto (Data displays)
- **Font Sizes**:
  - Headings: 18px, 16px, 14px, 12px
  - Body: 14px, 12px, 10px
  - Data: 24px, 20px, 16px, 12px
- **Font Weights**:
  - Regular: 400
  - Medium: 500
  - SemiBold: 600
  - Bold: 700

### Spacing & Layout
- **Grid System**: 4px base unit with consistent padding
- **Component Spacing**: 4px, 8px, 12px, 16px, 24px, 32px
- **Border Radius**: 4px, 6px, 8px, 12px, 16px
- **Card Padding**: 16px, 20px, 24px
- **Section Margins**: 16px, 24px, 32px

### Interactive Elements
- **Hover States**: Scale (1.05), color transitions, background changes
- **Focus States**: Blue outline rings, proper accessibility
- **Active States**: Blue background (#0094ff), white text
- **Loading States**: Skeleton screens, progress indicators
- **Error States**: Red accents, clear messaging

### Icons
- **Icon Set**: Lucide React icons
- **Icon Sizes**: 12px, 16px, 18px, 24px, 32px
- **Icon Colors**: White, gray variants, blue accents
- **Icon Usage**: Consistent sizing and positioning

---

## 🔧 Component Library

### Basic UI Components
1. **Button**: Primary, secondary, outline, ghost variants
2. **Input**: Text inputs with focus states and validation
3. **Card**: Container components with headers and content areas
4. **Dropdown**: Select menus with proper keyboard navigation
5. **Toggle**: Switch components for boolean states
6. **Badge**: Status indicators and notification counters

### Data Visualization
1. **KPI Cards**: Metric display with trend indicators
2. **Progress Bars**: Animated progress with customizable colors
3. **Charts**: Line charts, bar charts with Recharts integration
4. **Timeline**: Event timeline components

### Layout Components
1. **Header**: Global navigation with search and notifications
2. **Sidebar**: Collapsible navigation with icon-only design
3. **Grid**: Responsive grid layouts for content organization
4. **Panel**: Content containers with proper spacing

### Device Components
1. **Device Cards**: Status display for smart home devices
2. **Device Groups**: Group management for rooms/zones
3. **Device Controls**: Individual control widgets (lights, thermostats, switches)
4. **Automation Rules**: Rule creation and management interface

### EV Charging Components
1. **Battery Cards**: Battery level and status monitoring
2. **Charging Controls**: Charging station control interface
3. **Energy Flow Charts**: Power flow visualization
4. **Charging Sessions**: Historical charging data display

### Modal Components
1. **EV Charger Modal**: Full-screen charger management interface
2. **Notification Modals**: Alert and message displays
3. **Confirmation Dialogs**: User action confirmations

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (Single column, mobile overlay)
- **Tablet**: 768px - 1024px (2-column layout)
- **Desktop**: > 1024px (3-column layout, full features)

### Mobile Optimizations
- **Collapsible Sidebar**: Icon-only with overlay
- **Touch-friendly**: 44px minimum touch targets
- **Simplified Layout**: Reduced complexity for mobile
- **Performance**: Optimized rendering for mobile devices

### Desktop Enhancements
- **Full Layout**: All features visible simultaneously
- **Hover States**: Rich hover interactions
- **Keyboard Navigation**: Full keyboard accessibility
- **Multi-tasking**: Side-by-side component usage

---

## ♿ Accessibility Features

### ARIA Support
- **Proper Labels**: All interactive elements have descriptive labels
- **Role Attributes**: Navigation, main, complementary roles
- **Live Regions**: Dynamic content updates
- **Focus Management**: Logical tab order and focus trapping

### Keyboard Navigation
- **Tab Order**: Logical navigation flow
- **Keyboard Shortcuts**: Common shortcuts for power users
- **Focus Indicators**: Clear focus rings and outlines
- **Escape Key**: Modal and dropdown closing

### Visual Accessibility
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Font Scaling**: Responsive to user font size preferences
- **Reduced Motion**: Respects user motion preferences
- **Screen Reader**: Proper semantic markup for assistive technology

---

## 🚀 Performance Considerations

### Optimization Strategies
- **Code Splitting**: Lazy loading of heavy components
- **Image Optimization**: SVG icons, optimized assets
- **Bundle Size**: Tree-shaking and minimal dependencies
- **Rendering**: Proper React patterns for efficient updates

### Loading States
- **Skeleton Screens**: Progressive content loading
- **Loading Indicators**: Spinners and progress bars
- **Error Boundaries**: Graceful error handling
- **Offline Support**: Basic offline functionality

---

## 🔄 Component Interactions

### State Management
- **Local State**: Component-specific state management
- **Global State**: User preferences, theme settings
- **Server State**: Real-time data synchronization
- **Cache Management**: Intelligent data caching strategies

### Event Handling
- **Click Events**: Proper event delegation and handling
- **Form Submissions**: Validation and error handling
- **Real-time Updates**: WebSocket connections for live data
- **User Actions**: Undo/redo functionality where applicable

---

## 📋 Implementation Guidelines

### Development Workflow
1. **Design Review**: Validate against Figma specifications
2. **Component Creation**: Build with proper TypeScript types
3. **Testing**: Unit tests and integration tests
4. **Documentation**: Update component documentation
5. **Review**: Code review and design validation

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Consistent code formatting and quality
- **Prettier**: Code formatting consistency
- **Husky**: Pre-commit hooks for quality gates

### Deployment
- **Build Process**: Optimized production builds
- **CDN Assets**: Static asset optimization
- **Monitoring**: Error tracking and performance monitoring
- **Updates**: Seamless deployment strategies

---

## 🎯 Component Extraction Status

### ✅ Completed Components
- **Header Component**: Full Figma design implementation
- **Sidebar Component**: Collapsible navigation with hamburger menu
- **Logo Component**: Reusable SVG logo component
- **KPI Cards**: Metric display components
- **Device Cards**: Smart home device status components
- **EV Charging Components**: Battery and charging station controls

### 🔄 In Progress
- **Chart Components**: Data visualization implementation
- **Modal Components**: EV charger management modal
- **Form Components**: Advanced form controls
- **Animation System**: Smooth transitions and micro-interactions

### 📋 Planned Features
- **Real-time Data**: Live updates and WebSocket integration
- **Advanced Filtering**: Multi-dimensional data filtering
- **Export Functionality**: Data export and reporting
- **Mobile App**: Progressive Web App features

---

## 📚 Resources & References

### Design Assets
- **Figma File**: "Site & Portfolio view [New]"
- **Component Library**: 150+ reusable components
- **Design Tokens**: Centralized color and typography system
- **Icon Library**: Lucide React icon set

### Technical Documentation
- **Component APIs**: TypeScript interfaces and prop documentation
- **Usage Examples**: Code examples for common use cases
- **Testing Guide**: Testing strategies and examples
- **Performance Guide**: Optimization techniques and best practices

### Development Tools
- **Next.js 16**: App Router with Server Components
- **TypeScript**: Strict type checking and IntelliSense
- **Tailwind CSS**: Utility-first CSS framework
- **React Testing Library**: Component testing utilities
- **ESLint + Prettier**: Code quality and formatting

---

*This documentation represents the complete design system extracted from the Figma file and serves as the single source of truth for implementation.*
