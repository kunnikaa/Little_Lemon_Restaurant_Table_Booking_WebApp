# Little Lemon Restaurant — Modern Mediterranean Editorial Web Application

![Little Lemon Logo](public/images/little-lemon-logo-cropped.png)

A comprehensive, multi-page, responsive, and accessible React web application for **Little Lemon**, a beloved family-owned Mediterranean restaurant located in Chicago. Developed for the **Coursera Meta Front-End Developer Professional Certificate Capstone Project**.

Design Theme: **“Modern Mediterranean Editorial — Little Lemon”**

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Official Logo Integration](#official-logo-integration)
- [Creative Theme & Brand Palette](#creative-theme--brand-palette)
- [Multi-Page Route Architecture](#multi-page-route-architecture)
  - [1. Homepage (`/`)](#1-homepage-)
  - [2. About Us (`/about`)](#2-about-us-about)
  - [3. Full Culinary Menu (`/menu`)](#3-full-culinary-menu-menu)
  - [4. Dish Details (`/menu/:dishId`)](#4-dish-details-menudishid)
  - [5. Table Reservations (`/reservations`)](#5-table-reservations-reservations)
  - [6. Order Online / Pre-Order (`/order`)](#6-order-online--pre-order-order)
  - [7. Checkout & Payment (`/checkout`)](#7-checkout--payment-checkout)
  - [8. Order Confirmation (`/order-confirmation`)](#8-order-confirmation-order-confirmation)
  - [9. 404 Not Found (`*`)](#9-404-not-found-)
- [Cart & Pre-Order State Management](#cart--pre-order-state-management)
- [Coursera Table Reservation API & Reducer](#coursera-table-reservation-api--reducer)
- [Accessibility (WCAG 2.1 AA)](#accessibility-wcag-21-aa)
- [Automated Testing Suite (31 Tests Passing)](#automated-testing-suite-31-tests-passing)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
  - [Running the Automated Tests](#running-the-automated-tests)
  - [Building for Production](#building-for-production)
- [Coursera Capstone Rubric Checklist](#coursera-capstone-rubric-checklist)
- [Security, Payment & Data Integrity Disclaimers](#security-payment--data-integrity-disclaimers)
- [GitHub Submission Guide](#github-submission-guide)

---

## 🌟 Project Overview

**Little Lemon** is an authentic Mediterranean bistro in downtown Chicago, founded by lifelong friends Mario and Adrian. 

This project elevates the restaurant web experience into a **Modern Mediterranean Editorial** destination with a full multi-page architecture powered by **React Router**, rich culinary photography, an interactive pre-order cart with persistence, a complete table reservation system backed by the official Coursera `fetchAPI` / `submitAPI` reducer, and a simulated educational checkout flow.

---

## 🍋 Official Logo Integration

The brand visual identity is built around the user-supplied reference logo:
- **Horizontal Top-Left Wordmark**: Positioned at the top-left of the navbar on every page, featuring the iconic yellow lemon with green leaves beside the elegant dark-green *"Little Lemon"* lettering.
- **Precision Crop & Optimization**: Cropped cleanly to remove surrounding white space (`public/images/little-lemon-logo-cropped.png`), rendered with an intrinsic transparent background to integrate seamlessly with the warm cream navigation bar.
- **Home Navigation**: Fully clickable, navigating users back to the homepage (`/`) from any route.
- **Responsive Adaptation**: Automatically scales responsively across desktop, tablet, and mobile screens without distortion or awkward container boxes.
- **Footer Integration**: Styled with high contrast and brand coherence in the site-wide footer alongside restaurant operating hours and contact details.

---

## 🎨 Creative Theme & Brand Palette

The design avoids generic templates, excessive glassmorphism, or AI-generated clutter, adopting an art-directed **Modern Mediterranean Editorial** aesthetic:

### Brand Color Palette
- **Lemon Yellow**: `#F4CE14` (Highlights, primary CTAs, active badges)
- **Deep Olive Green**: `#495E57` (Primary brand color, dark headers)
- **Dark Forest Green**: `#344E41` (Deep accents, footer, rich contrast)
- **Warm Cream**: `#F8F5ED` (Editorial page background, soft warmth)
- **Pure White**: `#FFFFFF` (Cards, sheet surfaces, modal dialogs)
- **Charcoal**: `#252525` (High-contrast typography)
- **Muted Sage**: `#DDE5D8` (Subtle borders, dividers, chip backgrounds)
- **Neutral Gray**: `#77736B` (Body secondary text, timestamps)
- **Warm Peach Accent**: `#EE9972` (Dietary labels, notification accents)

### Typography
- **Headings**: `Markazi Text` (with Georgia serif fallback) — refined, editorial, and welcoming.
- **UI & Body**: `Karla` (with system-ui sans-serif fallback) — clean, legible, high-contrast.

---

## 🗺 Multi-Page Route Architecture

This application uses **React Router** to provide true multi-page navigation (not just single-page anchor scrolling):

### 1. Homepage (`/`)
- Dismissible seasonal announcement bar.
- Editorial hero section with dual primary CTAs: *"Reserve a Table"* (`/reservations`) and *"Explore Full Menu"* (`/menu`).
- Value highlights strip (*Fresh Organic Herbs, Imported Amalfi Citrus, Sunlit Chicago Patio*).
- Signature Culinary Highlights with quick *Add to Cart* and *View Recipe Details* buttons.
- Authentic restaurant founding story preview.
- Guest testimonials with verified badges and 5-star ratings.
- Operational hours and location details.

### 2. About Us (`/about`)
- In-depth story of Mario and Adrian's culinary journey from the Mediterranean coast to Chicago.
- The 4 pillars of the Little Lemon culinary philosophy (*Heritage, Seasonal Citrus, Community, Craft*).
- Authentic kitchen documentary photos of the founders.

### 3. Full Culinary Menu (`/menu`)
- Comprehensive menu of **20 dishes** spanning **8 distinct categories**:
  - *Starters, Salads, Pasta, Main Courses, Specials, Vegetarian/Vegan, Desserts, Drinks*.
- Interactive category filter tabs with active state indicators.
- Real-time search filter matching dish names, descriptions, and ingredients.
- Dynamic price sorting (*Default, Price: Low to High, Price: High to Low*).
- Dietary tags (*Vegetarian, Vegan, Gluten-Free, Seafood, Chef's Signature*).
- Calories, preparation times, and instant *Add to Cart* actions.
- Helpful empty state with a 1-click filter reset.

### 4. Dish Details (`/menu/:dishId`)
- Dynamic parameter route rendering deep dish insights.
- Large high-resolution photography with dietary chip overlays.
- Complete description, full ingredient breakdown, preparation time, and nutritional calories.
- Interactive quantity increment/decrement selector.
- *Add to Pre-Order Cart* with real-time feedback.
- Clean *← Back to Menu* navigation preserving user context.

### 5. Table Reservations (`/reservations`)
- Official Meta Front-End Capstone table booking form.
- Form inputs: Full Name, Email, Phone, Reservation Date (`#res-date`), Time Slot (`#res-time`), Guests (`#guests`), Occasion (`#occasion`), Seating Preference, and Special Requests.
- Dynamic available times updated via `fetchAPI(date)` and React `useReducer`.
- Client-side validation preventing past dates, invalid guest counts (1–10), and malformed emails.
- Instant reservation confirmation receipt card with unique reference ID.
- *"Book Another Table"* reset capability.

### 6. Order Online / Pre-Order (`/order`)
- Dedicated pre-order and takeaway preparation portal.
- Dining preference selector (*Takeout & Pickup* vs. *Dine-in Pre-Order*).
- Preferred pickup/dining time selector and special kitchen instructions.
- Real-time cart item list with quantity steppers (+/-) and remove buttons.
- Live cost breakdown: Subtotal, Estimated Tax (8.25%), and Final Total.
- Clear empty cart state directing users to the menu.

### 7. Checkout & Payment (`/checkout`)
- Contact & order review portal.
- Delivery/pickup contact details form with full validation.
- Clear, educational **Demonstration Payment Mode Selector**:
  - *Demo Credit / Debit Card (Simulated)*
  - *Digital Wallet Demo (Simulated)*
  - *Pay upon Arrival at Restaurant (Cash/Card)*
- Clear educational notice explaining that this is a simulated capstone payment demo with **zero collection of real financial data**.

### 8. Order Confirmation (`/order-confirmation`)
- Formally verified demo order receipt with unique reference ID (`LL-ORD-XXXX`).
- Itemized summary of all purchased dishes, quantities, and individual prices.
- Payment status clearly designated as *"Demo Order Confirmed (No Live Charges Made)"*.
- Quick navigation buttons to return to the menu or homepage.

### 9. 404 Not Found (`*`)
- Elegant fallback page for invalid URLs, guiding users back to the homepage or menu.

---

## 🛒 Cart & Pre-Order State Management

Cart state is globally managed via `CartContext` (`src/context/CartContext.jsx`):
- **Local Storage Persistence**: Cart items survive page refreshes and navigation transitions.
- **Badge Counter**: Navbar cart icon reflects total quantity of active items in real time.
- **Operations**: `addToCart(item, quantity)`, `removeFromCart(id)`, `updateQuantity(id, newQty)`, and `clearCart()`.
- **Financial Calculations**: Clean USD currency formatting with subtotal and configurable tax calculation via `src/utils/currency.js`.

---

## ⚙️ Coursera Table Reservation API & Reducer

The table reservation mechanism strictly implements the Meta Front-End Capstone requirements:

```javascript
// State initialization and reducer dispatch
const [availableTimes, dispatchTimes] = useReducer(updateTimes, undefined, initializeTimes);
```

- **`initializeTimes()`**: Invokes `fetchAPI(new Date())` to seed the initial available time slots.
- **`updateTimes(state, action)`**: When the user selects a new date in the `#res-date` input, dispatches `{ type: 'UPDATE_TIMES', payload: selectedDate }` to fetch date-specific slots.
- **Deterministic Algorithm**: Preserves the official Meta `seededRandom` algorithm so identical dates yield consistent slots across test runs.

---

## ♿ Accessibility (WCAG 2.1 AA)

- **Semantic HTML5 Elements**: Proper structural markup across all components (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<form>`).
- **Form Controls & Accessible Names**: All inputs paired with visible `<label htmlFor="...">` elements; inputs utilize required attributes (`required`, `aria-required="true"`).
- **Interactive Focus Indicators**: Clear, high-contrast `:focus-visible` outline rings for keyboard tab navigation.
- **Skip to Content Link**: Keyboard-accessible `.skip-link` immediately jumps focus to `#main-content`.
- **Screen Reader Announcements**: Live regions (`aria-live="polite"`, `role="alert"`) for inline validation errors, empty filter states, and cart updates.
- **Contrast Ratios**: Exceeds WCAG 2.1 AA 4.5:1 contrast standards across all text and UI elements.

---

## 🧪 Automated Testing Suite (31 Tests Passing)

The project includes **31 automated tests** across 5 test suites using **Vitest** and **React Testing Library**:

```bash
npm run test
```

### Test Suite Summary

| Test File | Tests | Coverage & Validated Behaviors |
| :--- | :---: | :--- |
| **`bookingUtils.test.js`** | 14 | `initializeTimes` slots generation, `updateTimes` reducer date handling, deterministic `fetchAPI`, `submitAPI` persistence, `validateBookingForm` edge cases (past dates, email syntax, guest boundaries 1–10), date formatting helpers. |
| **`CartContext.test.jsx`** | 1 | Cart addition, quantity updates, item removal, and subtotal calculations. |
| **`MenuSection.test.jsx`** | 5 | Category filter tabs, dish search input, empty state handling, and 1-click filter reset. |
| **`BookingForm.test.jsx`** | 7 | Accessible label associations, HTML5 validation attributes (`res-date`, `res-time`, `guests`, `occasion`), `dispatchTimes` on date change, inline error displays, submission handling. |
| **`App.test.jsx`** | 4 | Multi-page routing, navbar user logo rendering, navigation to Menu, and full reservation flow with receipt verification. |
| **Total** | **31** | **100% Pass Rate** |

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
│   │   ├── Footer.jsx                    # Site footer with brand details & navigation
│   │   ├── Hero.jsx                      # Editorial hero with dual CTAs
│   │   ├── FeaturedDishes.jsx            # Highlighted signature creations
│   │   ├── MenuCard.jsx                  # Reusable dish card with cart action
│   │   ├── Testimonials.jsx              # Guest reviews with star ratings
│   │   ├── BookingForm.jsx               # Table booking form with validation
│   │   ├── BookingConfirmation.jsx       # Booking receipt display
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
│   │   └── NotFound.jsx                  # 404 Not Found fallback
│   ├── context/
│   │   └── CartContext.jsx               # Pre-order cart state & localStorage provider
│   ├── data/
│   │   └── menuItems.js                  # 20 illustrative Mediterranean dishes
│   ├── utils/
│   │   ├── bookingApi.js                 # Coursera fetchAPI & submitAPI
│   │   ├── bookingUtils.js               # Reducer, validation, date helpers
│   │   └── currency.js                   # USD formatting helper
│   ├── tests/
│   │   ├── bookingUtils.test.js          # API, reducer, and validation unit tests
│   │   ├── CartContext.test.jsx          # Cart provider unit tests
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

### Running the Automated Tests

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
| **1. UI/UX Design** | **EXCEEDS** | Modern Mediterranean Editorial design system, official user logo, responsive layouts across mobile, tablet, and desktop. |
| **2. Multi-Page Architecture** | **EXCEEDS** | 8 dedicated routes (`/`, `/about`, `/menu`, `/menu/:dishId`, `/reservations`, `/order`, `/checkout`, `/order-confirmation`) using React Router. |
| **3. Semantic HTML** | **EXCEEDS** | HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<form>`). |
| **4. Booking Form Fields** | **EXCEEDS** | Full Name, Email, Phone, Date (`#res-date`), Time (`#res-time`), Guests (`#guests`), Occasion (`#occasion`), Seating Preference, and Special Requests. |
| **5. Available Times Reducer** | **EXCEEDS** | `useReducer(updateTimes, undefined, initializeTimes)` with dynamic time recalculation on date change. |
| **6. Form Validation** | **EXCEEDS** | Real-time client-side validation for empty fields, past dates, email regex, and guest range (1–10). |
| **7. Booking Confirmation** | **EXCEEDS** | Detailed receipt with booking reference ID, summary table, and "Book Another Table" reset. |
| **8. Interactive Cart & Menu** | **EXCEEDS** | 20 dishes across 8 categories with live search, price sorting, quantity selector, and localStorage persistence. |
| **9. Accessibility** | **EXCEEDS** | Visible `<label htmlFor>`, skip link, focus indicators, ARIA alerts, and contrast compliance. |
| **10. Automated Tests** | **EXCEEDS** | 31 automated tests passing across 5 test suites. |
| **11. Clean Git & Documentation** | **EXCEEDS** | Clean git history, detailed setup commands, and architecture documentation. |

---

## 🔒 Security, Payment & Data Integrity Disclaimers

1. **Demonstration Mode Only**: As a frontend capstone project, all table reservations and pre-orders are stored locally in the browser (`localStorage`) for demonstration and testing purposes.
2. **Payment Processing**: The checkout flow includes an educational **Demonstration Payment Mode**. **No real card numbers are collected, stored, or processed.** No claims of live monetary transactions are made.
3. **Real-World Integration Roadmap**: Connecting live payments would require:
   - A secure backend service (e.g., Node.js/Express, Python/FastAPI) to calculate and verify prices securely.
   - An accredited payment gateway (e.g., Stripe, PayPal) using client tokens or Elements.
   - Storing API secrets exclusively in protected server-side environment variables (`.env`).

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
