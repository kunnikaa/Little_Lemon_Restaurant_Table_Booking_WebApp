import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    try {
      setIsSubmitting(true);
      await signup({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      navigate('/profile');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to create account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <span className="editorial-subtitle">BECOME A MEMBER</span>
            <h1 className="auth-title">Create an Account</h1>
            <p className="auth-subtitle">
              Join Little Lemon to save your favorite dishes, track reservations, and enjoy fast pre-orders.
            </p>
          </div>

          <div className="demo-auth-notice" role="note">
            <span className="notice-icon" aria-hidden="true">💡</span>
            <div>
              <strong>Frontend Demonstration Registration</strong>
              <p>
                Your profile information is securely stored locally in your browser session for this assignment.
              </p>
            </div>
          </div>

          {errorMessage && (
            <div className="auth-error-alert" role="alert">
              <span>⚠️ {errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="form-group">
              <label htmlFor="signup-name">Full Name</label>
              <input
                type="text"
                id="signup-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Mario Rossi"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-email">Email Address</label>
              <input
                type="email"
                id="signup-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-phone">Phone Number (Optional)</label>
              <input
                type="tel"
                id="signup-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(312) 555-0199"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-password">Password (min 6 characters)</label>
              <input
                type="password"
                id="signup-password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-confirm-password">Confirm Password</label>
              <input
                type="password"
                id="signup-confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="form-input"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Complete Registration'}
            </button>
          </form>

          <div className="auth-footer-links">
            <span>Already have an account?</span>{' '}
            <Link to="/login" className="auth-switch-link">
              Sign in here →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
