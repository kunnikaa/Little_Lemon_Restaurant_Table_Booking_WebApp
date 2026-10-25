# Little Lemon Restaurant — Modern Mediterranean Editorial Web Application

![Little Lemon Logo](public/images/little-lemon-logo-cropped.png)

A comprehensive, multi-page, responsive, and accessible React web application for **Little Lemon**, an authentic family-owned Mediterranean bistro located in Chicago. Developed for the **Coursera Meta Front-End Developer Professional Certificate Capstone Project**.

Design Theme: **“Modern Mediterranean Editorial — Little Lemon”**

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Official Logo Integration (Enhanced 25%)](#official-logo-integration-enhanced-25)
- [Professional Typography & Design Tokens](#professional-typography--design-tokens)
- [Dual Restaurant Ordering Journeys](#dual-restaurant-ordering-journeys)
  - [Journey A: Table Reservation with Optional Food Pre-Order](#journey-a-table-reservation-with-optional-food-pre-order)
  - [Journey B: Independent Online Takeout & Delivery Pre-Orders](#journey-b-independent-online-takeout--delivery-pre-orders)
- [Working Favorites Feature](#working-favorites-feature)
- [Authentication & Profile Menu](#authentication--profile-menu)
- [My Profile & Saved Delivery Addresses](#my-profile--saved-delivery-addresses)
- [Order & Table Reservation History](#order--table-reservation-history)
- [Multi-Page Route Architecture](#multi-page-route-architecture)
- [Coursera Table Reservation API & Reducer](#coursera-table-reservation-api--reducer)
- [Accessibility (WCAG 2.1 AA)](#accessibility-wcag-21-aa)
- [Automated Testing Suite (39 Tests Passing)](#automated-testing-suite-39-tests-passing)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
  - [Running Automated Unit Tests](#running-automated-unit-tests)
  - [Building for Production](#building-for-production)
- [Coursera Capstone Rubric Checklist](#coursera-capstone-rubric-checklist)
- [Security, Payment & Authentication Disclaimers](#security-payment--authentication-disclaimers)
- [GitHub Submission Guide](#github-submission-guide)

---

## 🌟 Project Overview

**Little Lemon** is an authentic Mediterranean bistro in downtown Chicago, founded by lifelong friends Mario and Adrian. 

This project elevates the restaurant web experience into an art-directed **Modern Mediterranean Editorial** destination. It features an enhanced multi-page architecture powered by **React Router**, rich culinary photography, working dish favorites with persistent storage, demonstration authentication, saved delivery addresses, history views for orders and reservations, and two independent restaurant ordering journeys.

---

## 🍋 Official Logo Integration (Enhanced 25%)

The visual identity is derived directly from the user's reference branding:
- **Optimal Sizing**: Display size increased by approximately **25%** (`height: 65px; max-width: 230px` on desktop) for clear brand legibility and elegance.
- **Vertical Alignment**: Centered vertically with the navbar items, maintaining visual balance with navigation links, cart badge, and profile menu.
- **Responsive Mobile Sizing**: Intentionally adjusted to `height: 50px; max-width: 175px` on mobile devices to prevent header clipping or horizontal overflow.
- **Clickable Navigation**: Clickable at all times, routing users back to the homepage (`/`).
- **Footer Sizing**: Scaled cleanly in the site-wide footer with high-contrast legibility.

---

## 🎨 Professional Typography & Design Tokens

### Typography Hierarchy
- **Headings**: `Playfair Display` (with `Markazi Text` and Georgia serif fallbacks) — sophisticated, editorial, and welcoming.
- **Body, Navigation, Forms & Buttons**: `Inter` (with `Karla` and system-ui sans-serif fallbacks) — clean, readable, high-contrast.

### Curated Brand Color Palette
- **Lemon Yellow**: `#F4CE14` (Highlights, primary CTAs, active badge states)
- **Deep Olive Green**: `#495E57` (Primary brand color, dark headers)
- **Forest Green**: `#344E41` (Deep accents, footer background, contrast)
- **Warm Cream**: `#F8F5ED` (Editorial page background, warmth)
- **Pure White**: `#FFFFFF` (Card surfaces, clean contrast)
- **Charcoal**: `#252525` (High-contrast typography)
- **Muted Sage**: `#DDE5D8` (Borders, dividers, chip backgrounds)
- **Warm Peach**: `#EE9972` (Dietary accents, subtitles)

---

## 🍽 Dual Restaurant Ordering Journeys

The application strictly preserves and separates two distinct ordering workflows:

### Journey A: Table Reservation with Optional Food Pre-Order
- Customers reserve a table at Little Lemon Chicago by selecting a date, available time, guest count, occasion, and seating area.
- **Optional Dine-in Food Pre-Order**: Guests can optionally check *"Pre-select dishes for your table"*, choosing signature courses (Greek Salad, Bruschetta, Lemon Dessert, Prawn Linguine, Limoncello Spritz) to be prepared and served upon arrival.
- **Independent Booking**: Guests can reserve a table without ordering any food; no dishes are forced.
- **Official API Preservation**: Uses the course-provided `fetchAPI(date)` and `submitAPI(formData)` functions with deterministic availability.
- **Booking History**: Confirmed reservations are automatically stored and visible in [`My Reservations`](#order--table-reservation-history).

### Journey B: Independent Online Takeout & Delivery Pre-Orders
- Customers can order food without making a restaurant table reservation.
- Features category filtering, real-time search, price sorting, quantity steppers, cart persistence across browser tabs, and takeout vs. pickup options.
- Transparent demonstration checkout with clear disclaimers and immediate receipt generation.
- **Order History**: Confirmed pre-orders are stored and viewable in [`My Orders`](#order--table-reservation-history).

---

## ❤️ Working Favorites Feature

- **Heart-Shaped Button**: Integrated on every menu card (`/menu`), featured showcase (`FeaturedDishes`), and dish detail view (`/menu/:dishId`).
- **Clear Visual State**: Outlined when unselected, animating to vibrant warm crimson (`#E63946`) with a gentle pulse when favorited.
- **Accessible Attributes**: Explicit `aria-label` (e.g., `Add Greek Salad to favorites` / `Remove Greek Salad from favorites`) and `aria-pressed`.
- **Dedicated Route**: [`/favorites`](#multi-page-route-architecture) renders all saved dishes with images, names, prices, remove buttons, and quick *+ Add to Cart* actions.
- **Empty State**: Clear fallback when no dishes are favorited with an *Explore Full Menu* link.
- **Profile Menu Access**: Accessible directly through the profile dropdown menu without cluttering the main navbar.
- **Persistence**: Saved locally in `localStorage` under `little_lemon_favorites`.

---

## 👤 Authentication & Profile Menu

- **Desktop Navbar Profile Icon**: Positioned on the right side of the navbar beside the cart.
- **Accessible Dropdown Menu**:
  - **For Signed-in Users**:
    - User avatar circle with initials, full name, email, and demonstration badge.
    - 👤 **My Profile** (`/profile`)
    - ❤️ **My Favorites** (`/favorites`) with dynamic count badge
    - 📦 **My Orders** (`/orders`)
    - 📅 **My Reservations** (`/my-reservations`)
    - 🚪 **Log Out**
  - **For Signed-out Users**:
    - 🔑 **Sign In** (`/login`)
    - ✨ **Create Account** (`/register`)
    - ❤️ **View Saved Dishes** (`/favorites`)
- **Keyboard & Click-Outside Handling**: Closes on `Escape` key or clicks outside.
- **Mobile Integration**: Integrated into the mobile drawer navigation.

---

## 🏠 My Profile & Saved Delivery Addresses

The dedicated Profile page ([`/profile`](#multi-page-route-architecture)) features:
- **Account Summary**: Name, email, phone number, and member date.
- **Quick Stats Strip**: Clickable stat cards for Favorites count, Orders count, and Table Bookings count.
- **Saved Delivery Addresses Manager**:
  - View saved addresses (e.g. Home, Office).
  - Add new delivery address form with validation.
  - Set default address and delete saved addresses.
- **Architectural Transparency**: Clearly labeled as a frontend demonstration with local browser storage.

---

## 📦 Order & Table Reservation History

- **My Orders (`/orders`)**:
  - Displays all orders saved from checkout or the demonstration session.
  - Shows order reference ID (`LL-ORD-XXXX`), placement date, dining preference (Takeout / Dine-in), itemized dishes and quantities, subtotal, tax, and final amount.
  - Empty state when no orders have been placed.
- **My Reservations (`/my-reservations`)**:
  - Displays all confirmed bookings from the reservation form.
  - Shows reference ID (`LL-RES-XXXX`), date, time slot, guest count, occasion, seating area, and any attached dine-in pre-ordered dishes.
  - Quick action to book another table.

---

## 🗺 Multi-Page Route Architecture

| Route | Page | Purpose & Key Features |
| :--- | :--- | :--- |
| **`/`** | `Home.jsx` | Hero with dual CTAs, logo, highlights, 4 featured dishes with quick add, founder story, testimonials, and hours. |
| **`/about`** | `AboutUs.jsx` | Mario & Adrian's Chicago culinary story, 4 culinary pillars, documentary photography. |
| **`/menu`** | `Menu.jsx` | 20 dishes across 8 categories, category filter tabs, search, price sorting, dietary tags, and favorite buttons. |
| **`/menu/:dishId`** | `DishDetails.jsx` | Dynamic dish parameter route with ingredients, prep time, calories, favorite button, and quantity selector. |
| **`/reservations`** | `Reservations.jsx` | Table booking with `fetchAPI` / `useReducer`, validation, and optional food pre-order. |
| **`/order`** | `OrderOnline.jsx` | Pre-order takeaway cart with dining mode, pickup time selector, and quantity adjustments. |
| **`/checkout`** | `Checkout.jsx` | Order review, contact form, demonstration payment mode selector, and order recording. |
| **`/order-confirmation`** | `OrderConfirmation.jsx` | Itemized order confirmation with reference ID and demonstration disclaimer. |
| **`/favorites`** | `Favorites.jsx` | Saved favorite dishes, quick add-to-cart, remove action, and empty state. |
| **`/login`** | `SignIn.jsx` | Sign-in portal with validation, demo auto-fill button, and session management. |
| **`/register`** | `SignUp.jsx` | Member registration portal with password match validation. |
| **`/profile`** | `Profile.jsx` | Profile dashboard, quick stat links, saved delivery address management, and logout. |
| **`/orders`** | `MyOrders.jsx` | Order history with itemized dish breakdowns and status badges. |
| **`/my-reservations`** | `MyReservations.jsx` | Table reservation history with attached pre-order dishes. |
| **`*`** | `NotFound.jsx` | 404 Not Found fallback with navigation back to Home or Menu. |

---

## ⚙️ Coursera Table Reservation API & Reducer

The table reservation mechanism strictly implements the Meta Front-End Capstone requirements:

```javascript
// State initialization and reducer dispatch
const [availableTimes, dispatchTimes] = useReducer(updateTimes, undefined, initializeTimes);
```

- **`initializeTimes()`**: Calls `fetchAPI(new Date())` to seed the initial available time slots.
- **`updateTimes(state, action)`**: When the user selects a new date in `#res-date`, dispatches `{ type: 'UPDATE_TIMES', payload: selectedDate }` to fetch date-specific slots.
- **Deterministic Availability**: Uses the official Meta seeded random algorithm so identical dates yield consistent slots.
- **Validation**: Validates required fields, past dates, guest limits (1–10), and email format.

---

## ♿ Accessibility (WCAG 2.1 AA)

- **Semantic Landmarks**: Proper HTML5 structural elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<form>`).
- **Form Controls & Labels**: All inputs paired with visible `<label htmlFor="...">` elements; inputs utilize required attributes (`required`, `aria-required="true"`).
- **Focus Rings**: Prominent `:focus-visible` outline rings for keyboard tab navigation.
- **Skip Link**: Keyboard-accessible `.skip-link` immediately jumps focus to `#main-content`.
- **Live Regions**: Live regions (`aria-live="polite"`, `role="alert"`) for inline validation errors, empty filter states, and cart updates.
- **Color Contrast**: Exceeds WCAG 2.1 AA 4.5:1 contrast standards across all text and UI elements.

---

## 🧪 Automated Testing Suite (39 Tests Passing)

The project includes **39 automated unit and integration tests** across **7 test suites** using **Vitest** and **React Testing Library**:

```bash
npm run test
```

### Test Suite Summary

| Test File | Tests | Validated Behaviors |
| :--- | :---: | :--- |
| **`bookingUtils.test.js`** | 14 | `initializeTimes`, `updateTimes` reducer date updates, `fetchAPI` determinism, `submitAPI`, past-date rejection, email format regex, guest range (1–10). |
| **`CartContext.test.jsx`** | 1 | Cart additions, quantity updates, item removal, and subtotal/tax calculations. |
| **`Favorites.test.jsx`** | 3 | Favorites additions, toggle, removals, localStorage persistence, FavoriteButton aria states, and Favorites page empty state. |
| **`AuthAndProfile.test.jsx`** | 5 | SignIn demo auto-fill, SignUp password validation, Profile rendering with address list, MyOrders rendering, and MyReservations rendering. |
| **`BookingForm.test.jsx`** | 7 | Accessible labels, HTML5 validation attributes (`#res-date`, `#res-time`, `#guests`, `#occasion`), reducer dispatch on date change, submission handling. |
| **`MenuSection.test.jsx`** | 5 | Category filter tabs, dish search input, empty state handling, and 1-click filter reset. |
| **`App.test.jsx`** | 4 | Multi-page routing, navbar user logo rendering, navigation to Menu, and full reservation flow with receipt verification. |
| **Total** | **39** | **100% Pass Rate (0 Failures)** |

---

## 📂 Directory Structure

```text
Little_Lemon_Restaurant_Table_Booking_WebApp/
├── public/
│   ├── favicon.svg                       # Lemon brand favicon
│   └── images/
│       ├── little-lemon-logo-cropped.png # Official user logo (transparent horizontal)
│       ├── lemon-emblem.png              # Compact lemon icon
│       ├── hero.jpg                      # Mediterranean hero presentation
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
│   │   ├── AnnouncementBar.jsx           # Top seasonal notice
│   │   ├── Header.jsx                    # Responsive navbar with user logo & cart count
│   │   ├── ProfileDropdown.jsx           # Accessible user profile menu
│   │   ├── FavoriteButton.jsx            # Reusable heart favorite toggle button
│   │   ├── Footer.jsx                    # Site footer with brand details & navigation
│   │   ├── Hero.jsx                      # Editorial hero with dual CTAs
│   │   ├── FeaturedDishes.jsx            # Highlighted signature creations
│   │   ├── MenuCard.jsx                  # Reusable dish card with cart action
│   │   ├── Testimonials.jsx              # Guest reviews with star ratings
│   │   ├── BookingForm.jsx               # Table booking form with optional food pre-order
│   │   ├── BookingConfirmation.jsx       # Booking receipt display with pre-ordered dishes
│   │   └── ScrollToTop.jsx               # Scroll restoration on route change
│   ├── pages/
│   │   ├── Home.jsx                      # Homepage
│   │   ├── AboutUs.jsx                   # Dedicated restaurant story page
│   │   ├── Menu.jsx                      # Dedicated 20-dish menu with filters & search
│   │   ├── DishDetails.jsx               # Dynamic dish parameter route
│   │   ├── Reservations.jsx              # Table booking page
│   │   ├── OrderOnline.jsx               # Interactive pre-order cart page
│   │   ├── Checkout.jsx                  # Checkout & educational payment demo
│   │   ├── OrderConfirmation.jsx         # Demo order confirmation receipt
│   │   ├── Favorites.jsx                 # User saved favorite dishes page
│   │   ├── SignIn.jsx                    # Sign-in portal with demo auto-fill
│   │   ├── SignUp.jsx                    # Registration portal with validation
│   │   ├── Profile.jsx                   # User profile & saved delivery addresses
│   │   ├── MyOrders.jsx                  # Pre-order and takeaway history page
│   │   ├── MyReservations.jsx            # Table reservations history page
│   │   └── NotFound.jsx                  # 404 Not Found fallback
│   ├── context/
│   │   ├── CartContext.jsx               # Pre-order cart state & localStorage provider
│   │   ├── AuthContext.jsx               # Authentication, user profile & addresses provider
│   │   └── FavoritesContext.jsx          # Dish favorites state & localStorage provider
│   ├── data/
│   │   └── menuItems.js                  # 20 illustrative Mediterranean dishes
│   ├── utils/
│   │   ├── bookingApi.js                 # Coursera fetchAPI & submitAPI
│   │   ├── bookingUtils.js               # Reducer, validation, date helpers
│   │   ├── orderStorage.js               # Orders & reservations localStorage persistence
│   │   └── currency.js                   # USD formatting helper
│   ├── tests/
│   │   ├── bookingUtils.test.js          # API, reducer, and validation unit tests
│   │   ├── CartContext.test.jsx          # Cart provider unit tests
│   │   ├── Favorites.test.jsx            # Favorites context and toggle tests
│   │   ├── AuthAndProfile.test.jsx       # Auth, profile, and history tests
│   │   ├── MenuSection.test.jsx          # Menu filtering and search tests
│   │   ├── BookingForm.test.jsx          # Form validation & accessibility tests
│   │   └── App.test.jsx                  # Multi-page routing integration tests
│   ├── setupTests.js                     # Jest-DOM environment setup
│   ├── index.css                         # Modern Mediterranean Editorial stylesheet
│   ├── App.jsx                           # Route definitions & global providers
│   └── main.jsx                          # React application root entrypoint
├── index.html                            # HTML entrypoint with metadata & fonts
├── package.json                          # Scripts & dependencies
├── vite.config.js                        # Vite build & Vitest test configuration
├── .gitignore                            # Standard git ignores
└── README.md                             # Comprehensive project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure **Node.js** (v18 or higher) and **npm** are installed:
```bash
node -v
npm -v
```

### Installation

Clone the repository and install all dependencies:
```bash
git clone <YOUR-GITHUB-REPOSITORY-URL>
cd Little_Lemon_Restaurant_Table_Booking_WebApp
npm install
```

### Running the Development Server

Start the local Vite development server:
```bash
npm run dev
```

Visit the application in your browser:
```text
http://localhost:5173/
```

### Running Automated Unit Tests

Execute the full Vitest suite in single-run mode:
```bash
npm run test
```

Or run tests in interactive watch mode during development:
```bash
npm run test:watch
```

### Building for Production

Compile optimized production assets into `dist/`:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## 📑 Coursera Capstone Rubric Checklist

| Rubric Criterion | Status | Verification & Implementation Detail |
| :--- | :---: | :--- |
| **1. UI/UX Design** | **EXCEEDS** | Modern Mediterranean Editorial design system, official user logo increased 25%, Playfair Display typography, responsive layouts. |
| **2. Multi-Page Architecture** | **EXCEEDS** | 14 dedicated routes using React Router with scroll restoration. |
| **3. Semantic HTML** | **EXCEEDS** | HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<form>`). |
| **4. Booking Form Fields** | **EXCEEDS** | Full Name, Email, Phone, Date (`#res-date`), Time (`#res-time`), Guests (`#guests`), Occasion (`#occasion`), Seating Preference, and Special Requests. |
| **5. Available Times Reducer** | **EXCEEDS** | `useReducer(updateTimes, undefined, initializeTimes)` with dynamic time recalculation on date change. |
| **6. Form Validation** | **EXCEEDS** | Real-time client-side validation for empty fields, past dates, email regex, and guest range (1–10). |
| **7. Booking Confirmation** | **EXCEEDS** | Detailed receipt with booking reference ID, summary table, and "Book Another Table" reset. |
| **8. Dual Ordering Journeys** | **EXCEEDS** | Journey A (table booking with optional food pre-order) and Journey B (independent takeaway cart). |
| **9. Favorites Feature** | **EXCEEDS** | Heart toggle button on all dishes, localStorage persistence, dedicated `/favorites` view, profile dropdown integration. |
| **10. Profile & Authentication** | **EXCEEDS** | Profile dropdown, `/login`, `/register`, `/profile`, saved delivery address management, and history views. |
| **11. Accessibility** | **EXCEEDS** | Visible `<label htmlFor>`, skip link, focus indicators, ARIA alerts, and contrast compliance. |
| **12. Automated Tests** | **EXCEEDS** | 39 automated tests passing across 7 test suites. |
| **13. Clean Git & Documentation** | **EXCEEDS** | Clean git history, detailed setup commands, and architecture documentation. |

---

## 🔒 Security, Payment & Authentication Disclaimers

1. **Frontend Demonstration Mode**: As an educational capstone project, user sessions, table reservations, pre-orders, and saved favorites are stored locally in browser storage (`localStorage`).
2. **Simulated Authentication**: The authentication feature operates in demonstration mode for testing purposes. Real passwords are not transmitted to or stored on an external database.
3. **Payment Processing**: The checkout flow includes an educational **Demonstration Payment Mode**. **No real card numbers are collected, stored, or processed.** No claims of live monetary transactions are made.
4. **Real-World Integration Roadmap**: Connecting live services in production would require:
   - An authentication provider (e.g., Supabase Auth, Firebase, Auth0, or JWT backend).
   - A trusted backend service (Node.js/Express, Python/FastAPI) to validate orders and manage database records.
   - An accredited payment gateway (e.g., Stripe, PayPal) using client tokens or Elements.

---

## 📤 GitHub Submission Guide

Follow these steps to submit your project for the Coursera Peer-Graded Assignment:

### 1. Create a New Public Repository on GitHub
1. Log in to [GitHub](https://github.com/).
2. Click the **+** icon in the top right and select **New repository**.
3. Name your repository: `Little-Lemon-Restaurant-Table-Booking-WebApp`.
4. Ensure the repository visibility is set to **Public** (required for peer reviewers).
5. Do **not** initialize with a README, `.gitignore`, or license (as they are already present locally).
6. Click **Create repository**.

### 2. Push Your Local Code to GitHub
Run the following commands in your project directory:
```bash
git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/Little-Lemon-Restaurant-Table-Booking-WebApp.git
git branch -M main
git push -u origin main
```

### 3. Submit on Coursera
1. Copy your GitHub repository URL (e.g., `https://github.com/<YOUR-USERNAME>/Little-Lemon-Restaurant-Table-Booking-WebApp`).
2. Navigate to your Coursera course assignment page.
3. Paste the repository URL into the submission field and submit!
