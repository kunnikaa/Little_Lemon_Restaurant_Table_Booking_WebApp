import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }} aria-hidden="true">
          🍋
        </span>
        <span className="editorial-subtitle">404 ERROR</span>
        <h1 className="page-title" style={{ fontSize: '3rem' }}>
          Page Not Found
        </h1>
        <p style={{ maxWidth: '500px', margin: '1rem auto 2.5rem auto', color: 'var(--color-warm-gray)' }}>
          We looked in our Mediterranean kitchen, pantry, and wine cellar, but could not find the page you requested.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">
            Return to Homepage
          </Link>
          <Link to="/menu" className="btn btn-secondary">
            View Restaurant Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
