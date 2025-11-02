# Component Specifications - Pixel-Perfect Details

## Overview
Detailed specifications for each component in the design system, including exact measurements, positioning, colors, and interactive states.

---

## Header Component - Global Navigation

### Layout Specifications
- **Position**: Fixed at top of viewport
- **Dimensions**: 1512px width × 56px height
- **Z-Index**: 1050 (modal level)
- **Background**: #16191b (dark theme primary)

### Section Breakdown

#### Left Section - Logo (0px to 72px)
**Logo container specifications:**
```css
position: absolute;
left: 0px;
top: 0px;
width: 72px;
height: 56px;
display: flex;
align-items: center;
justify-content: center;
```

**Logo SVG specifications:**
```css
width: 40px;
height: 40px;
viewBox: 0 0 28.85 32;
fill: none;
```

**Logo path specifications:**
```css
/* Main body path */
d: "M4 8 L24.85 8 L20.85 24 L8 24 Z";
fill: #ffffff;
opacity: 0.9;

/* Inner cutout path */
d: "M7.96 12 L20.85 12 L18.85 20 L9.96 20 Z";
fill: #ffffff;
opacity: 0.7;

/* Design element path */
d: "M12.96 16 L16.85 16 L15.85 18 L13.96 18 Z";
fill: #ffffff;
opacity: 0.5;
```

#### Center Section - Search (72px to 1382px)
**Search container specifications:**
```css
position: absolute;
left: 72px;
top: 0px;
width: 1310px;
height: 56px;
display: flex;
align-items: center;
justify-content: center;
```

**Search input specifications:**
```css
width: 370px;
height: 40px;
background: #101314;
border: 1px solid #3f464b;
border-radius: 12px;
padding: 0 16px 0 48px;
font-family: 'Open Sans', sans-serif;
font-size: 14px;
font-weight: 400;
color: #ffffff;
```

**Search icon specifications:**
```css
position: absolute;
left: 16px;
top: 50%;
transform: translateY(-50%);
width: 16px;
height: 16px;
color: #727b83;
```

**Filter dropdown specifications:**
```css
position: absolute;
right: 8px;
top: 50%;
transform: translateY(-50%);
width: 58px;
height: 28px;
background: #0094ff;
border-radius: 100px;
color: #ffffff;
font-size: 12px;
font-weight: 400;
display: flex;
align-items: center;
justify-content: center;
gap: 4px;
```

#### Right Section - Notifications & User (1382px to 1512px)
**Container specifications:**
```css
position: absolute;
right: 0px;
top: 0px;
width: 130px;
height: 56px;
display: flex;
align-items: center;
gap: 16px;
```

### Notification Icons
**Icon specifications (each 24px × 24px):**

1. **Search Icon**
   ```css
   position: relative;
   width: 24px;
   height: 24px;
   color: #bbc7ce;
   cursor: pointer;
   ```

2. **Events Icon**
   ```css
   position: relative;
   width: 24px;
   height: 24px;
   color: #bbc7ce;
   cursor: pointer;
   ```

3. **Issues Icon with Badge**
   ```css
   position: relative;
   width: 24px;
   height: 24px;
   color: #bbc7ce;
   cursor: pointer;
   ```

   **Badge specifications:**
   ```css
   position: absolute;
   top: -4px;
   right: -4px;
   width: 18px;
   height: 18px;
   background: #0094ff;
   border-radius: 50%;
   color: #ffffff;
   font-size: 9px;
   font-weight: 600;
   display: flex;
   align-items: center;
   justify-content: center;
   content: "3";
   ```

4. **Collaboration Icon**
   ```css
   position: relative;
   width: 24px;
   height: 24px;
   color: #bbc7ce;
   cursor: pointer;
   ```

5. **Mail Icon**
   ```css
   position: relative;
   width: 24px;
   height: 24px;
   color: #bbc7ce;
   cursor: pointer;
   ```

6. **Alerts Icon with Badge**
   ```css
   position: relative;
   width: 24px;
   height: 24px;
   color: #bbc7ce;
   cursor: pointer;
   ```

   **Complex badge with gradient:**
   ```css
   position: absolute;
   top: -4px;
   right: -4px;
   width: 18px;
   height: 18px;
   background: #0094ff;
   border-radius: 50%;
   display: flex;
   align-items: center;
   justify-content: center;
   ```

### User Profile Section
**Profile container specifications:**
```css
position: relative;
width: auto;
height: 56px;
display: flex;
align-items: center;
gap: 12px;
padding: 8px 12px;
border-radius: 8px;
cursor: pointer;
```

**Avatar specifications:**
```css
width: 32px;
height: 32px;
background: #d2dbe0;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
```

**Avatar text specifications:**
```css
font-family: 'Open Sans', sans-serif;
font-size: 10px;
font-weight: 400;
color: #243945;
text-align: center;
content: "TM";
```

**User info container:**
```css
display: flex;
flex-direction: column;
align-items: flex-start;
```

**Name text specifications:**
```css
font-family: 'Lato', sans-serif;
font-size: 12px;
font-weight: 700;
color: #ffffff;
line-height: 14.4px;
```

**Role text specifications:**
```css
font-family: 'Lato', sans-serif;
font-size: 12px;
font-weight: 400;
color: #ffffff;
opacity: 0.5;
line-height: 14.4px;
```

**Status container:**
```css
display: flex;
align-items: center;
gap: 4px;
```

**Status icon (call icon):**
```css
width: 12px;
height: 12px;
color: #242645;
```

**Status text:**
```css
font-family: 'Lato', sans-serif;
font-size: 12px;
font-weight: 400;
color: #242645;
content: "On Call";
```

**Dropdown arrow:**
```css
width: 12px;
height: 12px;
color: #bbc7ce;
transform: rotate(0deg);
```

### Interactive States

#### Hover Effects
```css
/* Search input hover */
.search-input:hover {
  border-color: #50516a;
}

/* Icon hover */
.notification-icon:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

/* User profile hover */
.user-profile:hover {
  background: rgba(255, 255, 255, 0.05);
}
```

#### Focus Effects
```css
/* Search input focus */
.search-input:focus {
  border-color: #0094ff;
  box-shadow: 0 0 0 2px rgba(0, 148, 255, 0.2);
}

/* Icon focus */
.notification-icon:focus {
  outline: 2px solid #0094ff;
  outline-offset: 2px;
}
```

#### Active Effects
```css
/* Icon active */
.notification-icon:active {
  transform: scale(0.98);
  background: rgba(0, 148, 255, 0.1);
}
```

---

## Sidebar Component - Collapsible Navigation

### Layout Specifications
- **Position**: Fixed left side of viewport
- **Collapsed Width**: 56px
- **Expanded Width**: 256px (configurable)
- **Height**: 100vh (full viewport height)
- **Background**: #16191b
- **Border**: 1px solid #2a2f32 (right border)

### Section Breakdown

#### Header Section (0px to 56px)
**Hamburger menu button:**
```css
position: absolute;
top: 0px;
left: 0px;
width: 56px;
height: 56px;
display: flex;
align-items: center;
justify-content: center;
background: transparent;
border: none;
cursor: pointer;
color: #bbc7ce;
border-bottom: 1px solid #2a2f32;
```

**Hamburger icon SVG:**
```css
width: 16px;
height: 16px;
viewBox: 0 0 16 16;
stroke: currentColor;
stroke-width: 1.33333;
stroke-linecap: round;
stroke-linejoin: round;
```

#### Navigation Section (56px to 448px)
**Container specifications:**
```css
position: absolute;
top: 56px;
left: 0px;
width: 56px;
height: 392px;
display: flex;
flex-direction: column;
padding: 8px 0px;
gap: 4px;
overflow-y: auto;
```

**Navigation items (56px × 56px each):**

1. **Dashboard 1** (56px to 112px)
   ```css
   position: absolute;
   top: 56px;
   left: 0px;
   width: 56px;
   height: 56px;
   display: flex;
   align-items: center;
   justify-content: center;
   background: transparent;
   border: none;
   cursor: pointer;
   color: #ffffff;
   ```

2. **Dashboard 2** (112px to 168px)
3. **Dashboard 3** (168px to 224px)
4. **Dashboard 4** (224px to 280px)
5. **Plan List** (280px to 336px)
6. **Services** (336px to 392px)

**Icon specifications:**
```css
width: 24px;
height: 24px;
color: #ffffff;
```

#### Settings Section (448px to 504px)
**Settings container:**
```css
position: absolute;
top: 448px;
left: 0px;
width: 56px;
height: 56px;
display: flex;
align-items: center;
justify-content: center;
border-top: 1px solid #2a2f32;
```

### Interactive States

#### Hover Effects
```css
/* Navigation item hover */
.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

/* Active navigation item */
.nav-item.active {
  background: #0094ff;
  color: #ffffff;
  border-radius: 8px;
}
```

#### Expanded State
**When sidebar is expanded:**
```css
width: 256px;
transition: width 200ms cubic-bezier(0, 0, 0.2, 1);
```

**Text labels appear:**
```css
.nav-item-text {
  display: block;
  margin-left: 12px;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
}
```

---

## KPI Cards Component

### Layout Specifications
- **Container**: Grid layout with responsive columns
- **Card Size**: 210px × 94px (each card)
- **Spacing**: 24px gap between cards
- **Border Radius**: 16px

### Card Structure

#### Header Section (0px to 62px)
**Header container:**
```css
position: absolute;
top: 0px;
left: 0px;
width: 210px;
height: 62px;
display: flex;
flex-direction: column;
padding: 16px 16px 8px 16px;
```

**Icon container:**
```css
position: absolute;
top: 16px;
left: 16px;
width: 18px;
height: 18px;
display: flex;
align-items: center;
justify-content: center;
color: #ffffff;
```

**Title text:**
```css
position: absolute;
top: 16px;
left: 42px;
width: 152px;
height: 22px;
font-family: 'Open Sans', sans-serif;
font-size: 16px;
font-weight: 600;
color: #ffffff;
line-height: 22px;
```

**Icon right (more button):**
```css
position: absolute;
top: 16px;
right: 16px;
width: 18px;
height: 18px;
color: #ffffff;
cursor: pointer;
```

#### Value Section (62px to 94px)
**Value container:**
```css
position: absolute;
top: 62px;
left: 0px;
width: 210px;
height: 32px;
display: flex;
align-items: center;
padding: 0px 16px;
```

**Currency symbol:**
```css
position: absolute;
top: 70px;
left: 16px;
width: 14px;
height: 32px;
font-family: 'Open Sans', sans-serif;
font-size: 24px;
font-weight: 400;
color: #ffffff;
opacity: 0.5;
line-height: 32px;
```

**Main value:**
```css
position: absolute;
top: 70px;
left: 30px;
width: 48px;
height: 32px;
font-family: 'Open Sans', sans-serif;
font-size: 24px;
font-weight: 600;
color: #ffffff;
line-height: 32px;
```

**Unit text:**
```css
position: absolute;
top: 70px;
left: 86px;
width: 35px;
height: 32px;
font-family: 'Open Sans', sans-serif;
font-size: 24px;
font-weight: 400;
color: #ffffff;
opacity: 0.5;
line-height: 32px;
```

### Color Variations
**Different KPI card types:**

1. **Consumption Card**: Background #222629
2. **Autonomy Card**: Background #222629
3. **Self Consumption Card**: Background #222629
4. **Generation Card**: Background #222629

### Interactive States

#### Hover Effects
```css
.kpi-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: all 200ms cubic-bezier(0, 0, 0.2, 1);
}
```

#### Active Effects
```css
.kpi-card:active {
  transform: translateY(0px);
}
```

---

## Button Component System

### Button Sizes
**Standard button dimensions:**

1. **Small Button** (32px × 32px)
   ```css
   width: 32px;
   height: 32px;
   padding: 0px;
   border-radius: 8px;
   ```

2. **Medium Button** (40px × 40px)
   ```css
   width: 40px;
   height: 40px;
   padding: 0px;
   border-radius: 8px;
   ```

3. **Large Button** (48px × 48px)
   ```css
   width: 48px;
   height: 48px;
   padding: 0px;
   border-radius: 8px;
   ```

### Button Variants

#### Primary Button
```css
background: #0094ff;
color: #ffffff;
border: none;
font-family: 'Open Sans', sans-serif;
font-size: 14px;
font-weight: 600;
```

#### Secondary Button
```css
background: #222629;
color: #ffffff;
border: 1px solid #3f464b;
font-family: 'Open Sans', sans-serif;
font-size: 14px;
font-weight: 400;
```

#### Outline Button
```css
background: transparent;
color: #0094ff;
border: 1px solid #0094ff;
font-family: 'Open Sans', sans-serif;
font-size: 14px;
font-weight: 400;
```

#### Ghost Button
```css
background: transparent;
color: #ffffff;
border: none;
font-family: 'Open Sans', sans-serif;
font-size: 14px;
font-weight: 400;
```

### Interactive States

#### Hover Effects
```css
/* Primary button hover */
.primary-button:hover {
  background: #0080e6;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 148, 255, 0.3);
}

/* Secondary button hover */
.secondary-button:hover {
  background: #2a2f32;
  border-color: #50516a;
}

/* Outline button hover */
.outline-button:hover {
  background: rgba(0, 148, 255, 0.1);
}

/* Ghost button hover */
.ghost-button:hover {
  background: rgba(255, 255, 255, 0.05);
}
```

#### Focus Effects
```css
button:focus {
  outline: 2px solid #0094ff;
  outline-offset: 2px;
}
```

#### Active Effects
```css
button:active {
  transform: translateY(0px);
  box-shadow: none;
}
```

---

## Input Component System

### Input Sizes
**Standard input dimensions:**

1. **Small Input** (24px height)
   ```css
   height: 24px;
   padding: 0px 8px;
   font-size: 12px;
   ```

2. **Medium Input** (32px height)
   ```css
   height: 32px;
   padding: 0px 12px;
   font-size: 14px;
   ```

3. **Large Input** (40px height)
   ```css
   height: 40px;
   padding: 0px 16px;
   font-size: 14px;
   ```

4. **Extra Large Input** (48px height)
   ```css
   height: 48px;
   padding: 0px 20px;
   font-size: 16px;
   ```

### Input States

#### Default State
```css
background: #101314;
border: 1px solid #3f464b;
border-radius: 8px;
color: #ffffff;
font-family: 'Open Sans', sans-serif;
```

#### Focus State
```css
border-color: #0094ff;
box-shadow: 0 0 0 2px rgba(0, 148, 255, 0.2);
```

#### Error State
```css
border-color: #ea0556;
box-shadow: 0 0 0 2px rgba(234, 5, 86, 0.2);
```

#### Disabled State
```css
background: #1a1d1f;
border-color: #2a2f32;
color: #727b83;
cursor: not-allowed;
opacity: 0.6;
```

### Search Input Specifics
**Advanced search input with filter dropdown:**

```css
/* Search container */
position: relative;
width: 370px;
height: 40px;

/* Input field */
padding-left: 48px; /* Space for search icon */
padding-right: 74px; /* Space for filter button */

/* Search icon */
position: absolute;
left: 16px;
top: 50%;
transform: translateY(-50%);
width: 16px;
height: 16px;
color: #727b83;

/* Filter button */
position: absolute;
right: 8px;
top: 50%;
transform: translateY(-50%);
width: 58px;
height: 28px;
background: #0094ff;
border-radius: 100px;
color: #ffffff;
font-size: 12px;
font-weight: 400;
display: flex;
align-items: center;
justify-content: center;
gap: 4px;
```

---

## Card Component System

### Card Sizes
**Standard card dimensions:**

1. **Small Card** (180px × 114px)
   ```css
   width: 180px;
   height: 114px;
   padding: 16px;
   border-radius: 16px;
   ```

2. **Medium Card** (210px × 94px)
   ```css
   width: 210px;
   height: 94px;
   padding: 16px;
   border-radius: 16px;
   ```

3. **Large Card** (436px × 350px)
   ```css
   width: 436px;
   height: 350px;
   padding: 24px;
   border-radius: 16px;
   ```

4. **Extra Large Card** (615px × 877px)
   ```css
   width: 615px;
   height: 877px;
   padding: 24px;
   border-radius: 16px;
   ```

### Card Structure

#### Card Container
```css
position: relative;
background: #222629;
border-radius: 16px;
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
overflow: hidden;
```

#### Header Section
```css
position: absolute;
top: 0px;
left: 0px;
width: 100%;
height: 64px;
padding: 16px 16px 8px 16px;
border-bottom: 1px solid #2a2f32;
```

#### Content Section
```css
position: absolute;
top: 64px;
left: 0px;
width: 100%;
height: calc(100% - 64px);
padding: 0px 16px 16px 16px;
```

### Card Variants

#### Default Card
```css
background: #222629;
border: 1px solid transparent;
```

#### Elevated Card
```css
background: #2a2f32;
border: 1px solid #3f464b;
box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
```

#### Outline Card
```css
background: transparent;
border: 1px solid #3f464b;
```

---

## Modal Component System

### Modal Sizes

#### Small Modal (400px × auto)
```css
width: 400px;
max-height: 80vh;
```

#### Medium Modal (600px × auto)
```css
width: 600px;
max-height: 80vh;
```

#### Large Modal (800px × auto)
```css
width: 800px;
max-height: 80vh;
```

#### Extra Large Modal (1200px × auto)
```css
width: 1200px;
max-height: 80vh;
```

#### Full Screen Modal (100vw × 90vh)
```css
width: 100vw;
height: 90vh;
border-radius: 0px;
```

### Modal Structure

#### Backdrop
```css
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
background: rgba(0, 0, 0, 0.5);
z-index: 1040;
display: flex;
align-items: center;
justify-content: center;
padding: 16px;
```

#### Modal Container
```css
position: relative;
background: #16191b;
border-radius: 16px;
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
max-height: 90vh;
overflow: hidden;
```

#### Close Button
```css
position: absolute;
top: 16px;
right: 16px;
width: 32px;
height: 32px;
background: #222629;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
color: #ffffff;
cursor: pointer;
z-index: 1060;
```

### EV Charger Modal Specifics

#### Layout
- **2-column layout**: 1/3 details, 2/3 controls & data
- **Left column width**: 639px
- **Right column width**: Flexible (remaining space)
- **Section gaps**: 24px vertical spacing

#### Left Column Structure
1. **Charger Details Card** (615px × 123px)
2. **EV Usage Time Card** (615px × variable)

#### Right Column Structure
1. **Time Period Controls** (full width)
2. **KPI Cards Row** (4 cards × 207.5px each)
3. **Chart Area** (full width, flexible height)
4. **Events Section** (full width, scrollable)

---

## Animation & Transition System

### Transition Definitions

#### Fast Transitions (150ms)
```css
transition: all 150ms cubic-bezier(0, 0, 0.2, 1);
```

#### Standard Transitions (200ms)
```css
transition: all 200ms cubic-bezier(0, 0, 0.2, 1);
```

#### Slow Transitions (300ms)
```css
transition: all 300ms cubic-bezier(0, 0, 0.2, 1);
```

#### Bounce Animation
```css
transition: all 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Keyframe Animations

#### Fade In
```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

#### Slide Up
```css
@keyframes slideUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

#### Scale In
```css
@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
```

### Hover Animations
```css
/* Scale on hover */
.hover-scale:hover {
  transform: scale(1.05);
}

/* Lift on hover */
.hover-lift:hover {
  transform: translateY(-2px);
}

/* Glow on hover */
.hover-glow:hover {
  box-shadow: 0 0 20px rgba(0, 148, 255, 0.3);
}
```

---

## Typography Scale

### Heading Hierarchy
```css
/* Page titles */
h1 {
  font-family: 'Lato', sans-serif;
  font-size: 28px;
  font-weight: 700;
  line-height: 36px;
  color: #ffffff;
}

/* Section headings */
h2 {
  font-family: 'Lato', sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  color: #ffffff;
}

/* Subsection headings */
h3 {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: #ffffff;
}

/* Component headings */
h4 {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: #ffffff;
}
```

### Body Text Hierarchy
```css
/* Primary body text */
.body-primary {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #f9fbfd;
}

/* Secondary body text */
.body-secondary {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #d2dbe0;
}

/* Caption text */
.caption {
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: #bbc7ce;
}
```

### Data Display Typography
```css
/* Large KPI values */
.kpi-value {
  font-family: 'Open Sans', sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  color: #ffffff;
}

/* Medium data values */
.data-value {
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  color: #ffffff;
}

/* Small data labels */
.data-label {
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: #bbc7ce;
}
```

---

*This comprehensive specification provides pixel-perfect measurements and implementation details for every component in the design system. All values are extracted directly from the Figma specifications.*
