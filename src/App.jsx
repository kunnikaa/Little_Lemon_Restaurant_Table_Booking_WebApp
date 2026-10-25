import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import ScrollToTop from './components/ScrollToTop';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Menu from './pages/Menu';
import DishDetails from './pages/DishDetails';
import Reservations from './pages/Reservations';
import OrderOnline from './pages/OrderOnline';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Favorites from './pages/Favorites';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import MyOrders from './pages/MyOrders';
import MyReservations from './pages/MyReservations';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <FavoritesProvider>
          <CartProvider>
            <ScrollToTop />
            <div className="app-root">
              {/* Accessibility Skip Link */}
              <a href="#main-content" className="skip-link">
                Skip to main content
              </a>

              {/* Top Announcement Bar */}
              <AnnouncementBar />

              {/* Persistent Responsive Header */}
              <Header />

              {/* Main Content Multi-Page Routing */}
              <main id="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/menu/:dishId" element={<DishDetails />} />
                  <Route path="/reservations" element={<Reservations />} />
                  <Route path="/order" element={<OrderOnline />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/login" element={<SignIn />} />
                  <Route path="/register" element={<SignUp />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/orders" element={<MyOrders />} />
                  <Route path="/my-reservations" element={<MyReservations />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              {/* Persistent Editorial Footer */}
              <Footer />
            </div>
          </CartProvider>
        </FavoritesProvider>
      </AuthProvider>
    </Router>
  );
}
