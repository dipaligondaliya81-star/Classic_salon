import "./Home.css";
import { Link } from "react-router-dom";
import VipCard from "../components/VipCard";
import StylistTeam from "../components/StylistTeam";
import { getWhatsAppUrl } from "../apiConfig";

export default function Home() {
  const whatsappUrl = getWhatsAppUrl("Hello Classic Salon! I'm interested in booking a session. Please guide me.");

  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="animate-fade-up">Elegance in Every Detail</h1>
          <p className="animate-fade-up-delay">
            Experience the pinnacle of luxury hair and beauty care.
            Where expertise meets comfort in the heart of our community.
          </p>
          <div className="hero-btns animate-fade-up-delay-2">
            <Link to="/services" className="cta-primary">Our Services</Link>
            <Link to="/contact" className="cta-secondary">Book Appointment</Link>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div className="stats-strip">
        <div className="stat-box">
          <h3>15+</h3>
          <p>Years Experience</p>
        </div>
        <div className="stat-box">
          <h3>200k+</h3>
          <p>Happy Clients</p>
        </div>
        <div className="stat-box">
          <h3>15+</h3>
          <p>Global Awards</p>
        </div>
        <div className="stat-box">
          <h3>50+</h3>
          <p>Expert Artists</p>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <section className="why-us">
        <div className="section-header">
          <h2>Why <span>Classic Salon</span>?</h2>
          <div className="line"></div>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Expert Artists</h3>
            <p>Over 15 years of excellence with certified professional stylists.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧼</div>
            <h3>Hygiene First</h3>
            <p>We maintain the highest standards of sterilization and cleanliness.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <h3>Premium Products</h3>
            <p>Only the best international brands used for your skin and hair.</p>
          </div>
        </div>
      </section>

      {/* ARTISTIC TEAM SECTION (NEW ADVANCED FEATURE) */}
      <StylistTeam />

      {/* POPULAR SERVICES */}
      <section className="popular-services">
        <div className="popular-overlay"></div>
        <div className="section-header white">
          <h2>Our Best <span>Categories</span></h2>
        </div>
        <div className="popular-grid">
          <div className="pop-card">
            <img src="/images/123.JPG" alt="Makeup" />
            <div className="pop-info">
              <h3>Bridal Makeup</h3>
              <p>Royal Wedding Looks</p>
              <Link to="/services">Explore</Link>
            </div>
          </div>
          <div className="pop-card">
            <img src="/images/botox.jpg" alt="Skin" />
            <div className="pop-info">
              <h3>Skin Care</h3>
              <p>Botox & Glow</p>
              <Link to="/services">Explore</Link>
            </div>
          </div>
          <div className="pop-card">
            <img src="/images/Services-Men-.jpg" alt="Hair" />
            <div className="pop-info">
              <h3>Men's Grooming</h3>
              <p>Sharp & Stylish</p>
              <Link to="/services">Explore</Link>
            </div>
          </div>
        </div>
      </section>

      {/* WORK GALLERY */}
      <section className="work-gallery">
        <div className="section-header">
          <h2>Work <span>Showcase</span></h2>
          <div className="line"></div>
        </div>
        <div className="gallery-container">
          <div className="gallery-item"><img src="/images/12345.jpg" alt="Work" /></div>
          <div className="gallery-item"><img src="/images/123456.jpg" alt="Work" /></div>
          <div className="gallery-item"><img src="/images/salon2.jpg" alt="Work" /></div>
          <div className="gallery-item"><img src="/images/salon 4.jpg" alt="Work" /></div>
          <div className="gallery-item"><img src="/images/botox2.jpg" alt="Work" /></div>
          <div className="gallery-item"><img src="/images/Salon.jpg.PNG" alt="Work" /></div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="experience-gallery">
        <div className="experience-content">
          <div className="exp-left">
            <h2>Trusted by <span>Thousands</span></h2>
            <p>
              Our salon is a buzzing hub of beauty and transformation.
              Join the hundreds of happy clients who visit us daily for
              that perfect "Classic" look.
            </p>
            <Link to="/about" className="learn-more">Our Full Story</Link>
          </div>
          <div className="exp-right">
            <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80" alt="Professional Salon Experience" className="crowd-img" />
          </div>
        </div>
      </section>

      {/* VIP MEMBERSHIP INSIDE HOME */}
      <VipCard />

      {/* LUXURY GIFT CARDS (NEW PROFESSIONAL FEATURE) */}
      <section className="gift-cards-section">
        <div className="gift-content">
          <div className="gift-text">
            <h4>THE PERFECT GIFT</h4>
            <h2>Luxury <span>Experience</span> Vouchers</h2>
            <p>Give the gift of beauty and relaxation. Our exclusive gift cards grant access to premium hair rituals, skin therapies, and artistic styling.</p>
            <div className="gift-actions">
              <button className="buy-gift-btn">PURCHASE NOW</button>
              <span className="gift-disclaimer">* Valid at all Classic Salon branches</span>
            </div>
          </div>
          <div className="gift-visual">
            <div className="virtual-card">
              <div className="card-logo">CLASSIC</div>
              <div className="card-val">₹ 5,000</div>
              <div className="card-tag">GIFT VOUCHER</div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="section-header">
          <h2>Client <span>Love</span></h2>
        </div>
        <div className="testimonial-cards">
          <div className="test-card">
            <p>"Best salon in the city! Their bridal makeup made my day unforgettable."</p>
            <h4>- Priya Sharma</h4>
            <div className="stars">★★★★★</div>
          </div>
          <div className="test-card">
            <p>"Professional artists and amazing hygiene. Highly recommend for hair treatments."</p>
            <h4>- Rahul Varma</h4>
            <div className="stars">★★★★★</div>
          </div>
          <div className="test-card">
            <p>"I've been coming here for 5 years. Always consistent and world-class service."</p>
            <h4>- Anjali Patel</h4>
            <div className="stars">★★★★★</div>
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section className="booking-cta">
        <div className="booking-box">
          <h2>Ready for Your <span>Transformation</span>?</h2>
          <p>Book your slot today and experience the classic touch.</p>
          <Link to="/contact">Book Now</Link>
        </div>
      </section>

      {/* FLOATING ICONS */}
      <div className="floating-icons">
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="float-icon whatsapp">💬</a>
        <a href="tel:9737671768" className="float-icon call">📞</a>
        <a href="/contact" className="float-icon enquiry">✉️</a>
      </div>
    </div>
  );
}
