# Design System Tokens - Complete Specification

## Overview
Comprehensive design tokens extracted from the Figma "Site & Portfolio view [New]" design system. These tokens ensure pixel-perfect implementation across all components.

## Color Palette
**Primary color system with exact hex values and usage contexts**

### Background Colors
```css
/* Primary backgrounds */
--background-primary: #16191b;          /* Main dashboard background */
--background-secondary: #1a1d1f;        /* Card backgrounds, secondary areas */
--background-tertiary: #222629;         /* Component backgrounds, panels */
--background-surface: #2a2f32;          /* Elevated surfaces, hover states */

/* Interactive backgrounds */
--background-hover: rgba(255, 255, 255, 0.05);    /* Subtle hover effects */
--background-active: rgba(0, 148, 255, 0.1);     /* Active/selected states */
--background-overlay: rgba(0, 0, 0, 0.5);        /* Modal overlays, backdrops */
```

### Text Colors
```css
/* Primary text hierarchy */
--text-primary: #ffffff;                /* Main headings, important text */
--text-secondary: #f9fbfd;              /* Body text, labels */
--text-tertiary: #d2dbe0;               /* Secondary labels, captions */
--text-muted: #bbc7ce;                  /* Muted text, placeholders */
--text-disabled: #727b83;               /* Disabled text, hints */

/* Interactive text */
--text-interactive: #ffffff;            /* Buttons, links */
--text-interactive-hover: #ffffff;      /* Hover states */
--text-accent: #00c8ff;                 /* Accent text, highlights */
```

### Brand Colors
```css
/* Primary brand colors */
--brand-primary: #0094ff;               /* Primary actions, highlights */
--brand-primary-hover: #0080e6;         /* Hover state */
--brand-primary-active: #006bb3;        /* Active/pressed state */
--brand-secondary: #00a590;             /* Secondary actions */
--brand-tertiary: #7a59fa;              /* Tertiary actions */

/* Status colors */
--status-success: #18ac24;              /* Success states, positive indicators */
--status-warning: #f68500;              /* Warning states, attention needed */
--status-error: #ea0556;                /* Error states, critical issues */
--status-info: #2dd1e7;                 /* Informational states */
--status-neutral: #6b7682;              /* Neutral states, default */
```

### Border Colors
```css
/* Border system */
--border-light: #2a2f32;                /* Light borders, dividers */
--border-medium: #3f464b;              /* Medium borders, sections */
--border-strong: #50516a;               /* Strong borders, emphasis */
--border-focus: #0094ff;                /* Focus rings, active borders */
```

### Gradient Colors
```css
/* Gradient definitions */
--gradient-primary: linear-gradient(135deg, #0094ff 0%, #00a590 100%);
--gradient-secondary: linear-gradient(135deg, #7a59fa 0%, #0094ff 100%);
--gradient-accent: linear-gradient(90deg, #00a590 0%, #0094ff 50%, #7a59fa 100%);
```

## Typography System
**Complete typography specification with exact measurements**

### Font Families
```css
/* Primary font stack */
--font-primary: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-secondary: 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-mono: 'Roboto Mono', 'SF Mono', Monaco, 'Cascadia Code', 'Segoe UI Mono', Consolas, monospace;
```

### Font Sizes
**Pixel-perfect size definitions**
```css
/* Headings */
--font-size-xs: 10px;                   /* 10px - Extra small labels */
--font-size-sm: 12px;                   /* 12px - Small labels, captions */
--font-size-base: 14px;                 /* 14px - Body text, buttons */
--font-size-lg: 16px;                   /* 16px - Subheadings, form labels */
--font-size-xl: 18px;                   /* 18px - Section headings */
--font-size-2xl: 20px;                  /* 20px - Page headings */
--font-size-3xl: 24px;                  /* 24px - Large headings, KPI values */
--font-size-4xl: 28px;                  /* 28px - Hero text, major headings */
--font-size-5xl: 32px;                  /* 32px - Display text, major KPIs */

/* Data display sizes */
--font-size-data-sm: 12px;              /* Small data labels */
--font-size-data-base: 14px;            /* Standard data text */
--font-size-data-lg: 16px;              /* Large data labels */
--font-size-data-xl: 20px;              /* Data values */
--font-size-data-2xl: 24px;             /* Large KPI values */
--font-size-data-3xl: 28px;             /* Major KPI displays */
```

### Font Weights
```css
--font-weight-light: 300;               /* Light text, secondary info */
--font-weight-regular: 400;             /* Regular body text */
--font-weight-medium: 500;              /* Medium emphasis */
--font-weight-semibold: 600;            /* Semi-bold headings */
--font-weight-bold: 700;                /* Bold headings, emphasis */
```

### Line Heights
```css
--line-height-tight: 1.2;               /* Compact text */
--line-height-normal: 1.4;              /* Standard text */
--line-height-relaxed: 1.5;             /* Relaxed text */
--line-height-loose: 1.6;               /* Loose text spacing */

/* Specific line heights for sizes */
--line-height-10: 16px;                 /* 10px text line height */
--line-height-12: 18px;                 /* 12px text line height */
--line-height-14: 20px;                 /* 14px text line height */
--line-height-16: 22px;                 /* 16px text line height */
--line-height-18: 24px;                 /* 18px text line height */
--line-height-20: 24px;                 /* 20px text line height */
--line-height-24: 32px;                 /* 24px text line height */
--line-height-28: 36px;                 /* 28px text line height */
--line-height-32: 40px;                 /* 32px text line height */
```

### Letter Spacing
```css
--letter-spacing-tight: -0.02em;        /* Tight spacing */
--letter-spacing-normal: 0em;            /* Normal spacing */
--letter-spacing-wide: 0.02em;          /* Wide spacing */
--letter-spacing-wider: 0.04em;         /* Extra wide spacing */
```

## Spacing System
**4px grid system with exact measurements**

### Base Units
```css
/* 4px base grid */
--spacing-1: 4px;                       /* 1 unit */
--spacing-2: 8px;                       /* 2 units */
--spacing-3: 12px;                      /* 3 units */
--spacing-4: 16px;                      /* 4 units */
--spacing-5: 20px;                      /* 5 units */
--spacing-6: 24px;                      /* 6 units */
--spacing-8: 32px;                      /* 8 units */
--spacing-10: 40px;                     /* 10 units */
--spacing-12: 48px;                     /* 12 units */
--spacing-16: 64px;                     /* 16 units */
--spacing-20: 80px;                     /* 20 units */
--spacing-24: 96px;                     /* 24 units */
```

### Semantic Spacing
```css
/* Component spacing */
--spacing-component-xs: 4px;           /* Tight component spacing */
--spacing-component-sm: 8px;           /* Small component spacing */
--spacing-component-md: 16px;          /* Medium component spacing */
--spacing-component-lg: 24px;          /* Large component spacing */
--spacing-component-xl: 32px;          /* Extra large spacing */

/* Section spacing */
--spacing-section-sm: 16px;             /* Small section gaps */
--spacing-section-md: 24px;             /* Medium section gaps */
--spacing-section-lg: 32px;             /* Large section gaps */
--spacing-section-xl: 48px;             /* Extra large section gaps */

/* Layout spacing */
--spacing-layout-xs: 8px;              /* Tight layout spacing */
--spacing-layout-sm: 16px;             /* Small layout spacing */
--spacing-layout-md: 24px;             /* Medium layout spacing */
--spacing-layout-lg: 32px;             /* Large layout spacing */
--spacing-layout-xl: 48px;             /* Extra large layout spacing */
```

## Border Radius
**Consistent corner radius system**

```css
/* Radius scale */
--radius-none: 0px;                     /* No radius */
--radius-sm: 2px;                       /* Small radius */
--radius-base: 4px;                     /* Base radius */
--radius-md: 6px;                       /* Medium radius */
--radius-lg: 8px;                       /* Large radius */
--radius-xl: 12px;                      /* Extra large radius */
--radius-2xl: 16px;                     /* Double extra large */
--radius-3xl: 20px;                     /* Triple extra large */
--radius-full: 9999px;                  /* Fully rounded */

/* Component-specific radii */
--radius-button: 8px;                   /* Button corners */
--radius-card: 16px;                    /* Card corners */
--radius-modal: 16px;                   /* Modal corners */
--radius-input: 8px;                    /* Input field corners */
--radius-badge: 12px;                   /* Badge corners */
--radius-avatar: 50%;                   /* Avatar fully rounded */
```

## Shadows
**Elevation system with exact shadow definitions**

```css
/* Shadow scale */
--shadow-none: none;                    /* No shadow */
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);  /* Subtle shadow */
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
--shadow-base: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Component-specific shadows */
--shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-modal: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-dropdown: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-tooltip: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
```

## Z-Index Scale
**Layering system for proper stacking**

```css
/* Base layers */
--z-index-base: 0;                      /* Base layer */
--z-index-docked: 10;                   /* Docked elements */
--z-index-dropdown: 1000;               /* Dropdown menus */
--z-index-sticky: 1020;                 /* Sticky elements */
--z-index-banner: 1030;                 /* Banners, alerts */
--z-index-overlay: 1040;                /* Overlays, modals */
--z-index-modal: 1050;                  /* Modal dialogs */
--z-index-popover: 1060;                /* Popovers, tooltips */
--z-index-skipLink: 1070;               /* Skip links */
--z-index-toast: 1080;                  /* Toast notifications */
--z-index-tooltip: 1090;                /* Tooltip elements */
```

## Transitions & Animations
**Motion design system**

### Transition Durations
```css
--duration-fast: 150ms;                 /* Fast transitions */
--duration-base: 200ms;                 /* Standard transitions */
--duration-slow: 300ms;                 /* Slow transitions */
--duration-slower: 500ms;               /* Very slow transitions */
```

### Transition Easing
```css
--easing-linear: linear;                /* Linear easing */
--easing-in: cubic-bezier(0.4, 0, 1, 1); /* Ease in */
--easing-out: cubic-bezier(0, 0, 0.2, 1); /* Ease out */
--easing-in-out: cubic-bezier(0.4, 0, 0.2, 1); /* Ease in out */
--easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Bounce effect */
```

### Animation Definitions
```css
/* Hover animations */
--animation-hover-scale: scale(1.05);   /* Scale on hover */
--animation-hover-lift: translateY(-2px); /* Lift on hover */
--animation-fade-in: opacity 0 to 1;    /* Fade in effect */
--animation-slide-up: translateY(10px) to translateY(0); /* Slide up */
--animation-slide-down: translateY(-10px) to translateY(0); /* Slide down */
```

## Component-Specific Tokens

### Button System
```css
/* Button heights */
--button-height-xs: 24px;               /* Extra small buttons */
--button-height-sm: 32px;               /* Small buttons */
--button-height-base: 40px;             /* Standard buttons */
--button-height-lg: 48px;               /* Large buttons */

/* Button padding */
--button-padding-x-xs: 8px;             /* XS horizontal padding */
--button-padding-x-sm: 12px;            /* SM horizontal padding */
--button-padding-x-base: 16px;          /* Base horizontal padding */
--button-padding-x-lg: 20px;            /* LG horizontal padding */

/* Button border radius */
--button-radius: 8px;                   /* Standard button radius */
```

### Input System
```css
/* Input heights */
--input-height-xs: 24px;                /* Extra small inputs */
--input-height-sm: 32px;                /* Small inputs */
--input-height-base: 40px;              /* Standard inputs */
--input-height-lg: 48px;                /* Large inputs */

/* Input padding */
--input-padding-x: 16px;                /* Horizontal padding */
--input-padding-y: 12px;                /* Vertical padding */

/* Input border */
--input-border-width: 1px;              /* Border thickness */
--input-border-color: #3f464b;          /* Default border color */
--input-border-focus: #0094ff;          /* Focus border color */
```

### Card System
```css
/* Card padding */
--card-padding-xs: 8px;                 /* Extra small cards */
--card-padding-sm: 12px;                /* Small cards */
--card-padding-base: 16px;              /* Standard cards */
--card-padding-lg: 24px;                /* Large cards */
--card-padding-xl: 32px;                /* Extra large cards */

/* Card border radius */
--card-radius: 16px;                    /* Standard card radius */
--card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
```

### Modal System
```css
/* Modal sizes */
--modal-width-sm: 400px;                /* Small modals */
--modal-width-base: 600px;              /* Standard modals */
--modal-width-lg: 800px;                /* Large modals */
--modal-width-xl: 1200px;               /* Extra large modals */
--modal-width-full: 100vw;              /* Full screen modals */

/* Modal positioning */
--modal-padding: 24px;                  /* Modal content padding */
--modal-border-radius: 16px;            /* Modal corner radius */
--modal-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
```

### Grid System
```css
/* Grid gaps */
--grid-gap-xs: 4px;                     /* Extra small gaps */
--grid-gap-sm: 8px;                     /* Small gaps */
--grid-gap-base: 16px;                  /* Standard gaps */
--grid-gap-lg: 24px;                    /* Large gaps */
--grid-gap-xl: 32px;                    /* Extra large gaps */

/* Grid columns */
--grid-columns-xs: 1;                   /* Extra small screens */
--grid-columns-sm: 2;                   /* Small screens */
--grid-columns-md: 3;                   /* Medium screens */
--grid-columns-lg: 4;                   /* Large screens */
--grid-columns-xl: 6;                   /* Extra large screens */
```

## Breakpoints
**Responsive breakpoint system**

```css
/* Screen sizes */
--breakpoint-xs: 320px;                 /* Extra small devices */
--breakpoint-sm: 640px;                 /* Small devices */
--breakpoint-md: 768px;                 /* Medium devices */
--breakpoint-lg: 1024px;                /* Large devices */
--breakpoint-xl: 1280px;                /* Extra large devices */
--breakpoint-2xl: 1536px;               /* 2X large devices */

/* Container widths */
--container-xs: 100%;                   /* Full width on mobile */
--container-sm: 640px;                  /* Small container */
--container-md: 768px;                  /* Medium container */
--container-lg: 1024px;                 /* Large container */
--container-xl: 1280px;                 /* Extra large container */
--container-2xl: 1536px;                /* 2X large container */
```

## Focus & Interaction States
**Accessibility and interaction specifications**

### Focus Indicators
```css
--focus-ring-width: 2px;                /* Focus ring thickness */
--focus-ring-color: #0094ff;            /* Focus ring color */
--focus-ring-offset: 2px;               /* Focus ring offset */
--focus-ring-opacity: 0.5;              /* Focus ring opacity */
```

### Interactive States
```css
/* Hover states */
--interactive-hover-scale: 1.05;        /* Scale on hover */
--interactive-hover-opacity: 0.8;       /* Opacity on hover */
--interactive-hover-bg: rgba(255, 255, 255, 0.05); /* Background on hover */

/* Active states */
--interactive-active-scale: 0.98;       /* Scale when pressed */
--interactive-active-bg: rgba(0, 148, 255, 0.1); /* Background when active */

/* Disabled states */
--interactive-disabled-opacity: 0.5;    /* Disabled element opacity */
--interactive-disabled-cursor: not-allowed; /* Disabled cursor */
```

## Export Formats

### CSS Custom Properties
```css
/* Complete CSS custom properties file */
:root {
  /* Colors */
  --background-primary: #16191b;
  --background-secondary: #1a1d1f;
  --background-tertiary: #222629;
  --background-surface: #2a2f32;

  --text-primary: #ffffff;
  --text-secondary: #f9fbfd;
  --text-tertiary: #d2dbe0;
  --text-muted: #bbc7ce;

  --brand-primary: #0094ff;
  --brand-primary-hover: #0080e6;

  --status-success: #18ac24;
  --status-warning: #f68500;
  --status-error: #ea0556;

  /* Typography */
  --font-family-primary: 'Open Sans', sans-serif;
  --font-size-base: 14px;
  --font-weight-regular: 400;
  --line-height-normal: 1.4;

  /* Spacing */
  --spacing-4: 16px;
  --spacing-6: 24px;
  --spacing-8: 32px;

  /* Borders */
  --radius-base: 4px;
  --radius-lg: 8px;
  --radius-xl: 12px;

  /* Shadows */
  --shadow-base: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  /* Transitions */
  --duration-base: 200ms;
  --easing-out: cubic-bezier(0, 0, 0.2, 1);
}
```

### JavaScript/TypeScript Export
```typescript
export const designTokens = {
  colors: {
    background: {
      primary: '#16191b',
      secondary: '#1a1d1f',
      tertiary: '#222629',
      surface: '#2a2f32',
    },
    text: {
      primary: '#ffffff',
      secondary: '#f9fbfd',
      tertiary: '#d2dbe0',
      muted: '#bbc7ce',
    },
    brand: {
      primary: '#0094ff',
      primaryHover: '#0080e6',
    },
    status: {
      success: '#18ac24',
      warning: '#f68500',
      error: '#ea0556',
    },
  },
  typography: {
    fontFamily: {
      primary: 'Open Sans, sans-serif',
      secondary: 'Lato, sans-serif',
    },
    fontSize: {
      xs: '10px',
      sm: '12px',
      base: '14px',
      lg: '16px',
      xl: '18px',
    },
    fontWeight: {
      regular: 400,
      semibold: 600,
      bold: 700,
    },
  },
  spacing: {
    1: '4px',
    2: '8px',
    4: '16px',
    6: '24px',
    8: '32px',
  },
  borderRadius: {
    base: '4px',
    lg: '8px',
    xl: '12px',
    card: '16px',
  },
  shadows: {
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    duration: {
      fast: '150ms',
      base: '200ms',
      slow: '300ms',
    },
    easing: {
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
} as const;
```

## Usage Guidelines

### Implementation Priority
1. **Exact Color Matching**: Use provided hex values, no approximations
2. **Typography Consistency**: Apply exact font sizes and weights
3. **Spacing Accuracy**: Use the 4px grid system precisely
4. **Interactive States**: Implement all hover/focus/active states
5. **Responsive Design**: Apply breakpoints and mobile optimizations

### Quality Assurance
- **Visual Testing**: Compare implementations against Figma designs
- **Accessibility**: Ensure WCAG AA compliance
- **Performance**: Optimize for smooth interactions
- **Cross-browser**: Test across all supported browsers

### Maintenance
- **Version Control**: Track token changes with design updates
- **Documentation**: Keep this document synchronized with Figma
- **Automated Testing**: Use visual regression testing
- **Design Reviews**: Regular alignment with design team

---

*This design token system provides the foundation for pixel-perfect implementation of the entire design system. All values are extracted directly from the Figma specifications.*
