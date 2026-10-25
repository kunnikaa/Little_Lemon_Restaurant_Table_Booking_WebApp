import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import FeaturedDishes from '../components/FeaturedDishes';
import Testimonials from '../components/Testimonials';

export default function Home() {
  return (
    <div className="home-page">
      {/* Editorial Hero */}
      <Hero />

      {/* Signature Dishes Highlights */}
      <FeaturedDishes />

      {/* Story Introduction Teaser */}
      <section className="home-story-teaser" aria-labelledby="home-story-heading">
        <div className="container">
          <div className="home-story-grid">
            <div className="home-story-text">
              <span className="editorial-subtitle">A TASTE OF HERITAGE</span>
              <h2 id="home-story-heading" className="section-title">
                Handcrafted with Love, Shared with Passion
              </h2>
              <p>
                Founded in 2012 by Mario and Adrian, Little Lemon is a celebration of centuries-old
                Mediterranean family traditions brought to life in Chicago. From cold-pressed Greek
                olive oils to hand-pinched pasta and fragrant Amalfi lemons, we prepare every plate
                with care and heartfelt hospitality.
              </p>
              <div className="home-story-actions">
                <Link to="/about" className="btn btn-secondary">
                  Read Our Full Story →
                </Link>
                <Link to="/reservations" className="btn btn-primary">
                  Reserve a Table
                </Link>
              </div>
            </div>

            <div className="home-story-media">
              <img
                src="/images/mario-and-adrian.jpg"
                alt="Head chefs Mario and Adrian smiling in the Little Lemon open kitchen"
                className="home-story-img"
                width="500"
                height="380"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Verified Guest Reviews */}
      <Testimonials />

      {/* Quick Location & Hours Banner */}
      <section className="location-banner-section" aria-label="Location and Hours">
        <div className="container">
          <div className="location-banner-box">
            <div className="location-banner-item">
              <span className="location-icon" aria-hidden="true">📍</span>
              <div>
                <strong>Find Us in Downtown Chicago</strong>
                <p>123 Mediterranean Way, Chicago, IL 60601</p>
              </div>
            </div>

            <div className="location-banner-item">
              <span className="location-icon" aria-hidden="true">🕒</span>
              <div>
                <strong>Daily Dining Hours</strong>
                <p>Mon–Fri: 11:30 AM – 10:30 PM • Sat–Sun: 10:30 AM – 11:00 PM</p>
              </div>
            </div>

            <div className="location-banner-item">
              <span className="location-icon" aria-hidden="true">📞</span>
              <div>
                <strong>Reservations & Enquiries</strong>
                <p>(312) 555-0199 • Table bookings online</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
