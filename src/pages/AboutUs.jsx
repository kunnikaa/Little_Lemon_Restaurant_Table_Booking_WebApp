import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className="about-page">
      {/* 1. Full-Width Premium About Hero Section */}
      <section className="about-hero-section" aria-labelledby="about-hero-heading">
        <div className="container about-hero-container">
          <div className="about-hero-content">
            <span className="editorial-subtitle hero-subtitle">OUR STORY</span>
            <h1 id="about-hero-heading" className="about-hero-title">
              A Little Taste of the Mediterranean
            </h1>
            <p className="about-hero-lead">
              Little Lemon brings the sun-drenched flavors, coastal heritage, and heartfelt hospitality 
              of the Mediterranean to the heart of downtown Chicago. Founded on cherished family recipes 
              passed down across generations, we blend time-honored artisanal traditions with modern 
              culinary finesse.
            </p>
            <div className="about-hero-ctas">
              <Link to="/menu" className="btn btn-primary hero-btn-menu">
                Explore Our Menu
              </Link>
              <Link to="/reservations" className="btn btn-outline-hero hero-btn-reserve">
                Reserve a Table
              </Link>
            </div>
          </div>

          <div className="about-hero-media">
            <div className="about-hero-image-frame">
              <img
                src="/images/hero.jpg"
                alt="Bountiful Mediterranean spread with fresh dishes, grilled meats, and citrus at Little Lemon"
                className="about-hero-image"
                width="560"
                height="420"
                loading="eager"
              />
              <div className="about-hero-badge" aria-hidden="true">
                <span className="badge-year">EST. 2012</span>
                <span className="badge-city">CHICAGO, IL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Founders' Story Section */}
      <section className="about-founders-section" aria-labelledby="founders-heading">
        <div className="container">
          <div className="about-founders-grid">
            <div className="about-founders-media">
              <div className="founders-image-card">
                <img
                  src="/images/mario-and-adrian.jpg"
                  alt="Co-founders and chefs Mario and Adrian in the Little Lemon kitchen"
                  className="founders-image"
                  width="540"
                  height="480"
                  loading="lazy"
                />
                <div className="founders-floating-quote">
                  <p>“Real Mediterranean cooking is never rushed. It is shared with warmth and genuine heart.”</p>
                  <cite>— Mario & Adrian</cite>
                </div>
              </div>
            </div>

            <div className="about-founders-text">
              <span className="editorial-subtitle">THE FOUNDERS</span>
              <h2 id="founders-heading" className="about-section-heading">
                Two Friends, One Shared Culinary Dream
              </h2>
              <p className="about-narrative-lead">
                From idyllic coastal villages bordering Italy and Greece to a bustling Chicago neighborhood.
              </p>

              <div className="about-narrative-paragraphs">
                <p>
                  Little Lemon was established in 2012 by lifelong friends Mario and Adrian. Growing up in 
                  coastal Mediterranean villages, their childhoods were shaped by kitchen tables where cooking 
                  was never a chore—it was an all-day communal celebration of harvest and family.
                </p>
                <p>
                  Mario spent his formative years in southern Italy, mastering the delicate art of pasta-making 
                  from his grandmother. He honed the tactile instinct for kneading fresh semolina dough, simmering 
                  slow-cooked sugos, and baking crusty rustic breads with blistered, airy crusts.
                </p>
                <p>
                  Adrian was raised among the sun-bleached vineyards and olive groves of the Greek islands. 
                  His passion centered on first cold-pressed extra virgin oils, wild mountain herbs, charcoal-grilled 
                  whole seafood, and the rich traditions of Aegean winemaking and pairings.
                </p>
                <p>
                  When their paths crossed again in Chicago, they united their culinary memories to create 
                  Little Lemon: an inviting neighborhood sanctuary celebrating honest cooking, authentic recipes, 
                  and true Mediterranean hospitality.
                </p>
              </div>

              <div className="about-chef-profiles">
                <div className="chef-profile-item">
                  <div className="chef-avatar-icon" aria-hidden="true">👨‍🍳</div>
                  <div className="chef-info">
                    <strong className="chef-name">Mario</strong>
                    <span className="chef-role">Head Chef & Pasta Artisan</span>
                  </div>
                </div>

                <div className="chef-profile-item">
                  <div className="chef-avatar-icon" aria-hidden="true">🍇</div>
                  <div className="chef-info">
                    <strong className="chef-name">Adrian</strong>
                    <span className="chef-role">Sommelier & Culinary Director</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Three Culinary Principles Feature Cards */}
      <section className="about-principles-section" aria-labelledby="principles-heading">
        <div className="container">
          <div className="section-header-centered">
            <span className="editorial-subtitle">OUR FOUNDATION</span>
            <h2 id="principles-heading" className="about-section-heading">
              Our Culinary Principles
            </h2>
            <p className="section-header-desc">
              Three foundational commitments that guide every recipe, ingredient selection, and plate leaving our kitchen.
            </p>
          </div>

          <div className="principles-cards-grid">
            {/* Card 1: Fresh, Seasonal Ingredients */}
            <article className="principle-card">
              <div className="principle-icon-wrapper" aria-hidden="true">
                <span className="principle-emoji">🌿</span>
              </div>
              <h3 className="principle-card-title">1. Fresh, Seasonal Ingredients</h3>
              <p className="principle-card-desc">
                We partner with local organic purveyors and sustainable Mediterranean family producers to source 
                heirloom vegetables, ripe lemons, and wild mountain herbs hand-picked at peak ripeness.
              </p>
              <div className="principle-tag">Farm & Sea Sourced</div>
            </article>

            {/* Card 2: Mediterranean Traditions */}
            <article className="principle-card">
              <div className="principle-icon-wrapper" aria-hidden="true">
                <span className="principle-emoji">🏺</span>
              </div>
              <h3 className="principle-card-title">2. Mediterranean Traditions</h3>
              <p className="principle-card-desc">
                From open wood-fired hearth grilling and slow stone-ground pestos to handmade bronze-die pasta, 
                our cooking respects artisanal methods refined across generations.
              </p>
              <div className="principle-tag">Ancestral Methods</div>
            </article>

            {/* Card 3: Made with Heart */}
            <article className="principle-card">
              <div className="principle-icon-wrapper" aria-hidden="true">
                <span className="principle-emoji">💛</span>
              </div>
              <h3 className="principle-card-title">3. Made with Heart</h3>
              <p className="principle-card-desc">
                In Mediterranean culture, feeding people is an act of love. Every sauce is tasted, every dish is 
                crafted to order, and every guest is welcomed as an honored family friend.
              </p>
              <div className="principle-tag">Hospitality First</div>
            </article>
          </div>
        </div>
      </section>

      {/* 4. Restaurant Experience Section (Image-led) */}
      <section className="about-experience-section" aria-labelledby="experience-heading">
        <div className="container">
          <div className="experience-wrapper">
            <div className="experience-media">
              <img
                src="/images/restaurant-interior.jpg"
                alt="Sunlit dining room of Little Lemon restaurant with arched windows and olive trees"
                className="experience-image"
                width="640"
                height="440"
                loading="lazy"
              />
            </div>
            <div className="experience-content">
              <span className="editorial-subtitle">THE ATMOSPHERE</span>
              <h2 id="experience-heading" className="about-section-heading">
                The Little Lemon Experience
              </h2>
              <p className="experience-lead">
                An inviting neighborhood sanctuary inspired by coastal tavernas and rustic trattorias.
              </p>
              <p className="experience-body">
                Step inside our warm, sunlit dining room adorned with limestone accents, olive trees in terracotta pots, 
                and glowing lantern light. Whether joining us for a lively midday lunch, an intimate anniversary dinner, 
                or handcrafted cocktails on the garden patio, our space is designed for lingering conversations and shared laughter.
              </p>
              <div className="experience-actions">
                <Link to="/menu" className="btn btn-primary">
                  Explore Full Menu
                </Link>
                <Link to="/reservations" className="btn btn-outline">
                  Reserve a Table
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Closing CTA Section */}
      <section className="about-closing-cta-section" aria-labelledby="closing-cta-heading">
        <div className="container">
          <div className="closing-cta-box">
            <span className="editorial-subtitle cta-subtitle">JOIN US IN CHICAGO</span>
            <h2 id="closing-cta-heading" className="closing-cta-heading">
              Your Table Is Waiting
            </h2>
            <p className="closing-cta-desc">
              Whether you are craving crisp bruschetta, handmade pasta, or whole grilled sea bass, 
              we look forward to welcoming you to the Little Lemon family table.
            </p>
            <div className="closing-cta-actions">
              <Link to="/reservations" className="btn btn-primary cta-primary-btn">
                Reserve a Table
              </Link>
              <Link to="/menu" className="btn btn-secondary cta-secondary-btn">
                Explore the Menu
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
