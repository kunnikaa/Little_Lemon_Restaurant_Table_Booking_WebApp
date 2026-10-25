# Little Lemon Restaurant — Modern Mediterranean Editorial Web Application

![Little Lemon Hero](public/images/hero.jpg)

A modern, responsive, accessible React web application for **Little Lemon**, a Mediterranean family-owned restaurant located in Chicago. Developed for the **Coursera Meta Front-End Developer Professional Certificate Capstone Project**.

Visual Theme: **“Modern Mediterranean Editorial — The Little Lemon Experience.”**

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Visual Identity & Creative Theme](#visual-identity--creative-theme)
- [Key Features](#key-features)
- [Extensive Culinary Menu](#extensive-culinary-menu)
- [Table Reservation Experience (Core)](#table-reservation-experience-core)
- [Accessibility (a11y)](#accessibility-a11y)
- [Technical Architecture](#technical-architecture)
- [API Integration & State Management](#api-integration--state-management)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
  - [Running Automated Unit Tests](#running-automated-unit-tests)
  - [Building for Production](#building-for-production)
- [Automated Testing Suite (28 Tests)](#automated-testing-suite-28-tests)
- [Coursera Peer-Review Rubric Checklist](#coursera-peer-review-rubric-checklist)
- [Known Limitations & Disclaimers](#known-limitations--disclaimers)
- [License & Acknowledgments](#license--acknowledgments)

---

## 🌟 Project Overview

Little Lemon is an authentic Mediterranean bistro in downtown Chicago, founded by lifelong friends Mario and Adrian. The website balances editorial elegance with practical utility, featuring an extensive 16-dish culinary menu with category tabs and real-time search, signature culinary highlights, and a comprehensive table booking application powered by dynamic availability algorithms and client-side validation.

---

## 🎨 Visual Identity & Creative Theme

Designed under the **“Modern Mediterranean Editorial”** aesthetic:

- **Color Palette**:
  - Primary Lemon Yellow: `#F4CE14`
  - Deep Olive Green: `#495E57`
  - Dark Forest Green: `#344E41`
  - Warm Cream: `#F8F5ED`
  - Soft Off-White: `#FFFFFF`
  - Charcoal: `#252525`
  - Muted Sage: `#DDE5D8`
  - Warm Neutral Gray: `#77736B`
  - Warm Peach Accent: `#EE9972`
- **Typography**:
  - Headlines: `Markazi Text` (Georgia serif fallback)
  - UI, Forms, Body: `Karla` (system-ui fallback)
- **Imagery**: High-resolution Mediterranean food photography, grilled dishes, pastas, mezze platters, lemon desserts, and authentic kitchen documentary photos of the founders.

---

## ✨ Key Features

1. **Top Announcement Bar**:
   - Dismissible banner highlighting seasonal specials and reservation availability.
2. **Responsive Editorial Header**:
   - Polished brand wordmark, quick links (*Home, About, Specials, Menu, Reservations, Order Online*), mobile drawer navigation, and prominent "Book a Table" button.
3. **Hero Section**:
   - Headline: *"A Little Taste of the Mediterranean"*.
   - Call-to-action buttons for table reservations and menu exploration.
   - Highlights strip (*Fresh Organic Herbs, Imported Amalfi Citrus, Outdoor Garden Patio*).
4. **Signature Culinary Highlights (Featured Dishes)**:
   - Top 4 signature creations with high visual emphasis and order delivery actions.
5. **Extensive Culinary Menu**:
   - 16 demonstration dishes across 7 courses (*Starters, Salads, Mains, Pasta, Specials, Desserts, Drinks*).
   - Real-time category filter tabs (*All, Starters, Salads, Mains, Pasta, Specials, Desserts, Drinks*).
   - Instant search filter by ingredient or title.
   - Dietary badges (*Vegetarian, Vegan, Gluten-Free, Seafood, Chef's Signature*).
   - Interactive order delivery preview with toast notifications.
6. **Story Section (About)**:
   - Mario and Adrian's generational culinary heritage in Chicago.
7. **Social Proof & Reviews**:
   - Testimonials with verified diner badges and star ratings.
8. **Table Reservation System (Core Feature)**:
   - Full Name, Email, Phone, Date, Time, Guests, Occasion, Seating Area, and Special Requests.
   - Dynamic available times via `fetchAPI(date)` and `useReducer`.
   - Past-date prevention and comprehensive validation.
   - Instant booking confirmation with reference ID and reset option.

---

## ♿ Accessibility (a11y)

Built strictly adhering to **WCAG 2.1 AA** standards:

- **Semantic Landmarks**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
- **Form Controls & Labels**: Explicit label bindings using `htmlFor` and `id` (`res-date`, `res-time`, `guests`, `occasion`, `full-name`, `email`).
- **ARIA Attributes**: `aria-required="true"`, `aria-invalid`, `aria-describedby` linking error paragraphs, `role="alert"`, `aria-live="polite"`.
- **Keyboard Navigation**:
  - Skip link (`.skip-link`) allows keyboard users to jump straight to `#main-content`.
  - Prominent `:focus-visible` outline rings on all interactive elements.
  - Tablist/Tab navigation for menu categories.
- **Color Contrast**: All text satisfies or exceeds the 4.5:1 minimum contrast ratio requirement.

---

## 🏗 Technical Architecture

- **React 19**: Modern functional components and hooks (`useState`, `useReducer`, `useEffect`).
- **Vite 8**: Ultra-fast build tool and development server.
- **Vitest & React Testing Library (RTL)**: Full automated test suite with `@testing-library/jest-dom` and `jsdom`.
- **Styling**: Pure CSS3 with CSS Custom Properties, CSS Grid, Flexbox, and fluid typography.

---

## 🔌 API Integration & State Management

### 1. `availableTimes` State & Reducer
Managed in [App.jsx](src/App.jsx) via `useReducer`:
```javascript
const [availableTimes, dispatchTimes] = useReducer(updateTimes, undefined, initializeTimes);
```
- `initializeTimes()`: Calls `fetchAPI(new Date())` to seed the initial time slots for today.
- `updateTimes(state, action)`: Dispatches `{ type: 'UPDATE_TIMES', payload: selectedDate }` when the user selects a new date, invoking `fetchAPI(selectedDate)` to provide date-specific availability.

### 2. `fetchAPI` & `submitAPI`
Implemented in [src/utils/bookingApi.js](src/utils/bookingApi.js):
- Uses deterministic pseudo-random distribution matching the official Meta Front-End Capstone algorithm.
- Checks for `window.fetchAPI` and `window.submitAPI` if injected by an external test environment, seamlessly falling back to the local implementation.
- `submitAPI(formData)` simulates saving the reservation locally to `localStorage` and returns `true`.

---

## 📂 Directory Structure

```text
Little_Lemon_Restaurant_Table_Booking_WebApp/
├── public/
│   ├── favicon.svg                       # Brand lemon icon
│   └── images/
│       ├── hero.jpg                      # Gourmet Mediterranean dish
│       ├── greek-salad.jpg               # Classic Greek Salad
│       ├── bruschetta.jpg                # Artisan Bruschetta
│       ├── lemon-dessert.jpg             # Traditional Lemon Dessert
│       ├── mario-and-adrian.jpg          # Chefs Mario & Adrian in kitchen
│       ├── mediterranean-pasta.jpg       # Lemon Garlic Prawn Linguine
│       ├── mezze-platter.jpg             # Santorini Mezze Platter
│       ├── lamb-chops.jpg                # Herb-Crusted Lamb Chops
│       └── lemon-spritz.jpg              # Limoncello Coastal Spritz
├── src/
│   ├── components/
│   │   ├── AnnouncementBar.jsx           # Top seasonal notice with dismiss
│   │   ├── Header.jsx                    # Header & responsive mobile drawer
│   │   ├── Hero.jsx                      # Editorial hero with dual CTAs
│   │   ├── FeaturedDishes.jsx            # 4 highlighted chef specials
│   │   ├── MenuSection.jsx               # Extensive menu with category tabs & search
│   │   ├── MenuCard.jsx                  # Individual dish card
│   │   ├── About.jsx                     # Restaurant history & chef story
│   │   ├── Testimonials.jsx              # Guest reviews with star ratings
│   │   ├── BookingForm.jsx               # Table reservation form with validation
│   │   ├── BookingConfirmation.jsx       # Detailed reservation receipt card
│   │   └── Footer.jsx                    # Editorial footer with hours & links
│   ├── data/
│   │   └── menuItems.js                  # 16 dishes across 7 categories
│   ├── utils/
│   │   ├── bookingApi.js                 # Coursera fetchAPI & submitAPI
│   │   └── bookingUtils.js               # Reducer, validation, date helpers
│   ├── tests/
│   │   ├── bookingUtils.test.js          # Tests for reducer, api & validation
│   │   ├── MenuSection.test.jsx          # Tests for menu category tabs & search
│   │   ├── BookingForm.test.jsx          # Tests for form controls & validation
│   │   └── App.test.jsx                  # End-to-end integration tests
│   ├── setupTests.js                     # Testing environment configuration
│   ├── index.css                         # Modern Mediterranean Editorial theme
│   ├── App.jsx                           # Root component with state management
│   └── main.jsx                          # React application entrypoint
├── index.html                            # HTML template with metadata & Google Fonts
├── package.json                          # Scripts & dependencies
├── vite.config.js                        # Vite and Vitest configuration
├── .gitignore                            # Excludes node_modules, dist, logs
└── README.md                             # Comprehensive project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and **npm** installed:
```bash
node -v
npm -v
```

### Installation

Clone the repository and install all dependencies:
```bash
git clone <YOUR-GITHUB-REPO-URL>
cd Little_Lemon_Restaurant_Table_Booking_WebApp
npm install
```

### Running the Development Server

Start the local Vite development server:
```bash
npm run dev
```
Open your browser and navigate to:
```text
http://localhost:5173/
```

### Running Automated Unit Tests

Run the full automated test suite:
```bash
npm run test
```
To run tests in interactive watch mode:
```bash
npm run test:watch
```

### Building for Production

Compile optimized production assets into the `dist/` directory:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

---

## 🧪 Automated Testing Suite (28 Tests)

The project includes **28 automated tests** across 4 test suites:

| Test File | Tests | Coverage / Tested Behaviors |
| :--- | :---: | :--- |
| **`bookingUtils.test.js`** | 14 | `initializeTimes` non-empty slots, `updateTimes` reducer date changes, deterministic `fetchAPI`, `submitAPI` validation, `validateBookingForm` edge cases (email regex, past dates, guest limits 1–10), date formatting helpers. |
| **`MenuSection.test.jsx`** | 5 | Category tabs rendering, dynamic filtering by category, search filtering by keyword, empty state when no items match, delivery toast notification on click. |
| **`BookingForm.test.jsx`** | 7 | All required form labels rendered, HTML5 validation attributes (`res-date`, `res-time`, `guests`, `occasion`), `dispatchTimes` called on date change, inline error messages on invalid submit, submit button disabled while submitting. |
| **`App.test.jsx`** | 2 | End-to-end rendering of all page landmarks, announcement bar dismissal, complete table reservation flow (filling form, submitting, displaying confirmation summary), and resetting form via "Book Another Table". |

---

## 📑 Coursera Peer-Review Rubric Checklist

| Rubric Criterion | Status | Verification Detail |
| :--- | :---: | :--- |
| **1. UI/UX Design** | **VERIFIED** | Modern Mediterranean Editorial theme, typography (`Markazi Text` + `Karla`), professional photography, and responsive layouts. |
| **2. Semantic Elements** | **VERIFIED** | HTML5 landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<form>`. |
| **3. Booking Form Fields** | **VERIFIED** | Name, Email, Phone, Date (`#res-date`), Time (`#res-time`), Guests (`#guests`), Occasion (`#occasion`), Seating preferences, Special requests. |
| **4. Available Times Reducer** | **VERIFIED** | `useReducer(updateTimes, undefined, initializeTimes)` with dynamic time recalculation on date change. |
| **5. Form Validation** | **VERIFIED** | Validates empty fields, email format, past dates, guest limits (1–10) with inline error messages. |
| **6. Confirmation Display** | **VERIFIED** | Displays booking details with unique reference ID. |
| **7. Reset Option** | **VERIFIED** | "Book Another Table" button restores the form cleanly. |
| **8. Accessibility** | **VERIFIED** | Visible labels (`htmlFor`), ARIA attributes, skip link, visible focus rings, image `alt` tags. |
| **9. Unit Tests** | **VERIFIED** | 28 automated tests covering reducer, validation, menu filtering, form component, and integration flow. |
| **10. Git & README** | **VERIFIED** | Clean git history; `README.md` includes setup commands, architecture, and feature descriptions. |

---

## ⚠️ Known Limitations & Disclaimers

- **Frontend Demonstration**: As specified for the Coursera Meta Front-End Capstone, submitted reservations are saved to demonstration local storage (`localStorage`) and do not connect to a live restaurant database or payment gateway.
- **Informational Pricing**: Menu prices and delivery buttons are for demonstration preview and do not process live monetary payments.

---

## 📄 License & Acknowledgments

- Built as part of the **Meta Front-End Developer Professional Certificate** on Coursera.
- Inspired by the Little Lemon brand assets provided by Coursera and Meta.
