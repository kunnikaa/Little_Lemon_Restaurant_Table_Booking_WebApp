import React from 'react';

export default function About() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <div className="container">
        <div className="about-grid">
          {/* About Text Content */}
          <div className="about-content">
            <h2 id="about-heading">Little Lemon</h2>
            <p className="about-location">Chicago</p>
            <p className="about-text">
              Little Lemon was founded in 2012 by two lifelong friends, Mario and Adrian.
              Growing up in seaside Mediterranean villages, both chefs spent their childhoods
              learning authentic culinary secrets passed down through generations.
            </p>
            <p className="about-text">
              After moving to Chicago, they realized that authentic Mediterranean food—rooted in
              virgin olive oils, garden herbs, fresh seafood, and slow-cooked roasts—was hard to find
              in the heart of the Midwest.
            </p>
            <p className="about-text">
              Together, they built Little Lemon to combine centuries-old family recipes with contemporary
              techniques. Every meal is a celebration of warmth, hospitality, and unforgettable flavor.
            </p>
          </div>

          {/* About Image */}
          <div className="about-image-wrapper">
            <img
              src="/images/mario-and-adrian.jpg"
              alt="Mario and Adrian, founders and head chefs of Little Lemon Chicago, happily cooking in the open kitchen"
              className="about-image"
              width="500"
              height="380"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
