import { Link } from "react-router-dom";
import "./About.css";

export default function About() {
  return (
    <div className="about-wrapper">
      {/* PROFESSIONAL HERO SECTION WITH CROWD BACKGROUND */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-header-meta">
            <h4 className="animate-up">SINCE 2009</h4>
            <div className="professional-certification">
              <span className="cert-dot"></span> ISO 9001:2015 CERTIFIED
            </div>
          </div>
          <h1 className="animate-up">The Pinnacle of <span>Bespoke Beauty</span></h1>
          <p className="animate-up">Welcome to Classic Salon, where we blend time-honored traditions with modern luxury to create an unparalleled sanctuary of elegance.</p>
          <div className="hero-cta-group animate-up">
            <Link to="/services" className="gold-outline-btn">EXPLORE SERVICES</Link>
            <div className="hero-play-link">
              <div className="play-icon">▶</div> OVERVIEW
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION STRIP */}
      <section className="mission-vision-grid">
        <div className="mv-card">
          <div className="mv-icon">⦿</div>
          <h3>Our Mission</h3>
          <p>To empower women by unveiling their authentic beauty through personalized care and uncompromising excellence in artistry.</p>
        </div>
        <div className="mv-divider"></div>
        <div className="mv-card">
          <div className="mv-icon">◎</div>
          <h3>Our Vision</h3>
          <p>To be the global benchmark for boutique luxury salons, recognized for innovation, sustainability, and transformative experiences.</p>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="about-philosophy">
        <div className="philosophy-container">
          <div className="philosophy-text">
            <h4>OUR PHILOSOPHY</h4>
            <h2>Crafting Beauty as an <span>Elite Ritual</span></h2>
            <div className="gold-dash"></div>
            <p>We believe that beauty is not a service, but a sacred ritual. Every interaction in our boutique is designed to be a transformative experience that celebrates the individual.</p>
            <div className="philosophy-grid">
              <div className="p-item">
                <span className="p-num">01.</span>
                <b>Editorial Precision</b>
                <p>Every cut, color, and treatment is executed with the meticulous attention of a high-fashion editorial set.</p>
              </div>
              <div className="p-item">
                <span className="p-num">02.</span>
                <b>Curated Assets</b>
                <p>We only use world-class formulas from L'Oréal, Olaplex, and Dyson to ensure the integrity of your beauty.</p>
              </div>
            </div>
          </div>
          <div className="philosophy-image-group">
            <div className="p-img-main">
              <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80" alt="Salon Interior" />
            </div>
            <div className="p-img-sub">
              <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80" alt="Stylist Working" />
            </div>
            <div className="p-badge">
              <span>15+</span>
              <p>Years of Elegance</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="core-values">
        <div className="section-header-cntr">
          <h4>OUR ECOSYSTEM</h4>
          <h2>The Pillars of <span>Classic Salon</span></h2>
        </div>
        <div className="values-grid">
          <div className="value-card">
            <h3>Excellence</h3>
            <p>We never settle for "good enough." Our goal is perfection in every ritual we perform.</p>
          </div>
          <div className="value-card active">
            <h3>Integrity</h3>
            <p>Transparent pricing, honest consultations, and the highest ethical standards in beauty.</p>
          </div>
          <div className="value-card">
            <h3>Innovation</h3>
            <p>Continuously evolving our techniques and technology to stay ahead of the beauty curve.</p>
          </div>
          <div className="value-card">
            <h3>Bespoke</h3>
            <p>No two clients are the same. Every treatment is custom-tailored to your unique persona.</p>
          </div>
        </div>
      </section>

      {/* LEADERSHIP / FOUNDER MESSAGE */}
      <section className="leadership-section">
        <div className="leadership-container-centered">
          <div className="leadership-content-full">
            <div className="founder-header">
              <div className="decorative-line"></div>
              <h4>A MESSAGE FROM THE FOUNDER</h4>
              <div className="decorative-line"></div>
            </div>
            <h2>The Vision Behind the <span>Atmosphere</span></h2>
            <div className="quote-mark">“</div>
            <p className="founder-quote">
              "Classic Salon was born from a desire to create a sanctuary where women could escape the noise and rediscover their confidence. We don't just change how you look; we change how you feel when you step back into the world."
            </p>
            <div className="founder-signature">
              <div className="sig-line"></div>
              <div className="founder-details">
                <span className="f-name">Dipali Gondaliya</span>
                <span className="f-title">Founder & Creative Director</span>
                <span className="f-year">EST. 2009</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERT STATS STRIP */}
      <section className="experts-stats">
        <div className="stat-box">
          <h2>5K+</h2>
          <p>Clients Served</p>
        </div>
        <div className="stat-box active">
          <h2>150+</h2>
          <p>Global Awards</p>
        </div>
        <div className="stat-box">
          <h2>20+</h2>
          <p>Master Stylists</p>
        </div>
        <div className="stat-box">
          <h2>100%</h2>
          <p>Satisfaction</p>
        </div>
      </section>

      {/* BRAND PARTNERS STRIP */}
      <section className="partners-strip">
        <h3>OUR GLOBAL PARTNERS</h3>
        <div className="partners-flex">
          <span className="brand-logo">L'ORÉAL</span>
          <span className="brand-logo">OLAPLEX</span>
          <span className="brand-logo">DYSON</span>
          <span className="brand-logo">KÉRASTASE</span>
          <span className="brand-logo">SCHWARZKOPF</span>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="about-final-cta">
        <div className="cta-box">
          <h2>Ready to Experience <span>Absolute Luxury?</span></h2>
          <p>Join the elite circle of women who trust Classic Salon for their most important rituals. Book your personalized consultation today.</p>
          <Link to="/contact" className="premium-btn">RESERVE YOUR RITUAL</Link>
        </div>
      </section>
    </div>
  );
}
