import React from 'react';

const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: 'Sarah M.',
    rating: 5,
    avatar: 'SM',
    comment:
      'The grilled sea bass was an absolute revelation! The table reservation process was effortless, and the staff greeted us warmly right upon arrival.',
  },
  {
    id: 2,
    name: 'David R.',
    rating: 5,
    avatar: 'DR',
    comment:
      'Celebrated our 5th anniversary here last weekend. The romantic patio seating and the lemon dessert made it unforgettable. A Chicago gem!',
  },
  {
    id: 3,
    name: 'Elena K.',
    rating: 5,
    avatar: 'EK',
    comment:
      'Authentic Mediterranean flavors just like back home in Greece. Crisp feta, real olive oil, and the warmest hospitality in the city.',
  },
  {
    id: 4,
    name: 'Marcus T.',
    rating: 5,
    avatar: 'MT',
    comment:
      'Super easy online table booking. We booked for 6 people and our table was ready with customized menus. 10/10 dining experience!',
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="testimonials-header">
          <h2 id="testimonials-heading">What Our Guests Say</h2>
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
                  <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: '600' }}>
                    ✓ Verified Diner
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
