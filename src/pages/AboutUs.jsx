import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className="about-page">
      {/* Editorial Page Header */}
      <section className="page-hero-header" aria-labelledby="about-page-heading">
        <div className="container">
          <span className="editorial-subtitle">OUR HERITAGE & PHILOSOPHY</span>
          <h1 id="about-page-heading" className="page-title">
            The Story of Little Lemon
          </h1>
          <p className="page-description">
            Generations of family recipes, sun-drenched coastal memories, and the vibrant warmth
            of Mediterranean hospitality brought to downtown Chicago.
          </p>
        </div>
      </section>

      {/* Main Story Narrative */}
      <section className="about-main-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <span className="editorial-subtitle">MEET MARIO & ADRIAN</span>
              <h2>Two Friends, One Shared Culinary Dream</h2>
              <p className="about-location">From the Aegean Coast to the Heart of Chicago</p>

              <p className="about-text">
                Little Lemon was established in 2012 by two childhood friends, Mario and Adrian.
                Growing up in idyllic coastal villages bordering Greece and Italy, their lives were
                shaped by kitchens where cooking was never a chore—it was an all-day communal celebration.
              </p>
              <p className="about-text">
                Mario’s passion lay in pasta and bread-making. Trained under his grandmother in southern
                Italy, he mastered the delicate alchemy of kneading semolina dough, simmering slow-cooked
                sugo, and baking sourdough with blistered, airy crusts.
              </p>
              <p className="about-text">
                Adrian grew up on the Greek islands, where his family owned an olive press and vineyard.
                He brought an intimate understanding of cold-pressed oils, wild mountain herbs, whole-grilled
                fish, and Aegean wine pairings.
              </p>
              <p className="about-text">
                When they reunited in Chicago, they saw an opportunity to introduce honest, unpretentious
                Mediterranean dining: food that tastes like the sun, sea, and countryside, prepared
                with care and served with warmth.
              </p>

              <div className="about-chef-pills">
                <div className="chef-pill">
                  <strong>Mario</strong>
                  <span>Head Chef & Pasta Artisan</span>
                </div>
                <div className="chef-pill">
                  <strong>Adrian</strong>
                  <span>Sommelier & Culinary Director</span>
                </div>
              </div>
            </div>

            <div className="about-image-wrapper">
              <div className="about-image-frame">
                <img
                  src="/images/mario-and-adrian.jpg"
                  alt="Head chefs Mario and Adrian happily cooking in the open kitchen at Little Lemon"
                  className="about-image"
                  width="500"
                  height="450"
                />
                <div className="about-floating-quote">
                  <p>“Real Mediterranean cooking is never rushed. It is shared with warmth and genuine heart.”</p>
                  <cite>— Mario & Adrian</cite>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culinary Principles Grid */}
      <section className="about-principles-section" aria-labelledby="principles-heading">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 3rem auto', maxWidth: '650px' }}>
            <span className="editorial-subtitle">HOW WE COOK</span>
            <h2 id="principles-heading" className="section-title">
              Our Culinary Principles
            </h2>
          </div>

          <div className="principles-grid">
            <div className="principle-card">
              <span className="principle-icon" aria-hidden="true">🫒</span>
              <h3>Pure Extra Virgin Oils</h3>
              <p>
                We exclusively source first cold-pressed extra virgin olive oil from Greek and Italian
                family groves, used raw over salads or for finishing warm dishes.
              </p>
            </div>

            <div className="principle-card">
              <span className="principle-icon" aria-hidden="true">🌿</span>
              <h3>Fresh Garden Herbs</h3>
              <p>
                Oregano, wild mint, rosemary, and sweet basil are hand-picked daily to deliver bright,
                intense herbal aromatics in every plate.
              </p>
            </div>

            <div className="principle-card">
              <span className="principle-icon" aria-hidden="true">🔥</span>
              <h3>Wood-Fired Hearth</h3>
              <p>
                Our kitchen features an open hearth fueled by natural hardwood embers, imparting a gentle
                smoky char to our lamb chops, pita breads, and fresh fish.
              </p>
            </div>

            <div className="principle-card">
              <span className="principle-icon" aria-hidden="true">🍋</span>
              <h3>Amalfi Coast Citrus</h3>
              <p>
                True to our name, fresh Meyer and Amalfi lemons add vibrant, palate-cleansing brightness
                to our marinades, salad dressings, and signature desserts.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="about-bottom-cta">
            <h3>Experience Little Lemon Tonight</h3>
            <p>Join us for dinner in our main dining room or outdoor garden patio.</p>
            <div className="about-cta-buttons">
              <Link to="/reservations" className="btn btn-primary">
                Reserve a Table
              </Link>
              <Link to="/menu" className="btn btn-secondary">
                Explore Full Menu
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
