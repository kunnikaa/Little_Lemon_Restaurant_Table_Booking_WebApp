import React from 'react';

const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: 'Sarah Montgomery',
    city: 'Lincoln Park, Chicago',
    rating: 5,
    avatar: 'SM',
    comment:
      'The grilled sea bass was an absolute revelation! The table reservation process was effortless, and the staff greeted us warmly right upon arrival.',
  },
  {
    id: 2,
    name: 'David Richardson',
    city: 'River North, Chicago',
    rating: 5,
    avatar: 'DR',
    comment:
      'Celebrated our 5th anniversary here on the garden patio. The lamb chops and Amalfi lemon dessert made it unforgettable. A true Chicago gem!',
  },
  {
    id: 3,
    name: 'Elena Kostas',
    city: 'West Loop, Chicago',
    rating: 5,
    avatar: 'EK',
    comment:
      'Authentic Mediterranean flavors just like back home in Greece. Crisp feta, real olive oil, and the warmest hospitality in the city.',
  },
  {
    id: 4,
    name: 'Marcus Thornton',
    city: 'Streeterville, Chicago',
    rating: 5,
    avatar: 'MT',
    comment:
      'Effortless online table reservation. We booked for a party of six and our table was ready with customized menus. 10/10 dining experience!',
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="testimonials-header">
          <span className="editorial-subtitle" style={{ color: 'var(--color-primary-yellow)' }}>
            GUEST EXPERIENCES
          </span>
          <h2 id="testimonials-heading">What Our Guests Say</h2>
          <p style={{ color: '#DDE5D8', maxWidth: '580px', margin: '0.5rem auto 0 auto' }}>
            Stories from patrons who have shared unforgettable evenings around our Mediterranean tables.
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS_DATA.map((item) => (
            <article key={item.id} className="testimonial-card">
              <div
                className="testimonial-stars"
                aria-label={`Rating: ${item.rating} out of 5 stars`}
              >
                {'★'.repeat(item.rating)}
              </div>
              <p className="testimonial-quote">“{item.comment}”</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" aria-hidden="true">
                  {item.avatar}
                </div>
                <div>
                  <span className="testimonial-name">{item.name}</span>
                  <div className="testimonial-verified">
                    <span>✓ Verified Diner</span> • <small>{item.city}</small>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
