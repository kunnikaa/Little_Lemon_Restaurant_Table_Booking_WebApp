import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleQuickDemoFill = () => {
    setEmail('elena.contos@example.com');
    setPassword('lemon123');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    try {
      setIsSubmitting(true);
      await login({ email, password });
      navigate('/profile');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <span className="editorial-subtitle">WELCOME BACK</span>
            <h1 className="auth-title">Sign In to Little Lemon</h1>
            <p className="auth-subtitle">
              Access your personalized Mediterranean favorites, order history, and table reservations.
            </p>
          </div>

          {/* Demonstration Notice */}
          <div className="demo-auth-notice" role="note">
            <span className="notice-icon" aria-hidden="true">💡</span>
            <div>
              <strong>Frontend Demonstration Authentication</strong>
              <p>
                For testing, any valid email and 6+ character password will work, or click below to auto-fill:
              </p>
              <button
                type="button"
                className="btn-quick-fill"
                onClick={handleQuickDemoFill}
              >
                Auto-Fill Demo Account
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="auth-error-alert" role="alert">
              <span>⚠️ {errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="form-group">
              <label htmlFor="signin-email">Email Address</label>
              <input
                type="email"
                id="signin-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                autoComplete="email"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label htmlFor="signin-password">Password</label>
              </div>
              <input
                type="password"
                id="signin-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="form-input"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In to Your Account'}
            </button>
          </form>

          <div className="auth-footer-links">
            <span>Don't have an account yet?</span>{' '}
            <Link to="/register" className="auth-switch-link">
              Create an account →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
