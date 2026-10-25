import React from 'react';

export default function About() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <div className="container">
        <div className="about-grid">
          {/* About Text Content */}
          <div className="about-content">
            <span className="editorial-subtitle">OUR CULINARY HERITAGE</span>
            <h2 id="about-heading">The Story of Little Lemon</h2>
            <p className="about-location">Founded by Mario & Adrian • Chicago</p>
            
            <p className="about-text">
              Little Lemon was born from a shared Mediterranean childhood. Growing up in sun-drenched
              coastal towns, Mario and Adrian were immersed in kitchens where olive oil flowed like
              liquid gold, lemons were plucked straight from hillside groves, and family dinners lasted
              well into the twilight hours.
            </p>
            <p className="about-text">
              When they reunited in Chicago, they saw an opportunity to bring those honest, sun-soaked
              flavors to the Midwest. Rather than following cookie-cutter culinary trends, they built
              Little Lemon around generational Mediterranean principles: whole seasonal ingredients,
              charcoal embers, fragrant herbs, and slow-braised sauces.
            </p>
            <p className="about-text">
              Today, Little Lemon stands as a welcoming gathering place where friends and families
              come together to celebrate life's moments over generous shared tables.
            </p>

            {/* Chef signature pills */}
            <div className="about-chef-pills">
              <div className="chef-pill">
                <strong>Mario</strong>
                <span>Head Chef & Pasta Specialist</span>
              </div>
              <div className="chef-pill">
                <strong>Adrian</strong>
                <span>Culinary Director & Wine Sommelier</span>
              </div>
            </div>
          </div>

          {/* About Image with Editorial Frame */}
          <div className="about-image-wrapper">
            <div className="about-image-frame">
              <img
                src="/images/mario-and-adrian.jpg"
                alt="Mario and Adrian, founders and head chefs of Little Lemon Chicago, happily cooking in the open kitchen"
                className="about-image"
                width="500"
                height="420"
                loading="lazy"
              />
              <div className="about-floating-quote">
                <span className="quote-mark" aria-hidden="true">“</span>
                <p>Real Mediterranean cooking is never rushed. It is shared with warmth and genuine heart.</p>
                <cite>— Mario & Adrian</cite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
