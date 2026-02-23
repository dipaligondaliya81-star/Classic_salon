import { useState } from "react";
import "./Contact.css";
import { API_BASE_URL, getWhatsAppUrl } from "../apiConfig";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    date: "",
    service: "Bridal Signature Ritual",
    timeSlot: "10:00 AM - 12:00 PM",
    stylistPreference: "No Preference",
    skinHairType: "Normal",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.phone || !formData.date) {
      alert("Please provide the essential details (Name, Phone, and Date) for our records.");
      return;
    }

    setIsSubmitting(true);

    // 1. Prepare the Message
    const msg =
      `🌸 *NEW BOOKING — CLASSIC SALON* 🌸\n\n` +
      `👤 Name: ${formData.firstName} ${formData.lastName}\n` +
      `📞 Phone: ${formData.phone}\n` +
      `📅 Date: ${formData.date}\n` +
      `🕐 Time: ${formData.timeSlot}\n` +
      `💄 Service: ${formData.service}\n` +
      `✂️ Stylist: ${formData.stylistPreference}\n` +
      `🧴 Type: ${formData.skinHairType}\n` +
      `📝 Notes: ${formData.message || "No notes"}\n\n` +
      `Please confirm the appointment.`;

    const whatsappUrl = getWhatsAppUrl(msg);

    // 2. IMMEDIATE REDIRECT (Best for Mobile)
    window.location.href = whatsappUrl;

    // 3. Optional: Background Sync (Silent)
    try {
      fetch(`${API_BASE_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: "Appointment"
        }),
      }).catch(err => console.log("Silent background sync failed:", err));
    } catch (e) { }

    // 4. Reset Form
    setFormData({
      firstName: "", lastName: "", phone: "", email: "", date: "",
      service: "Bridal Signature Ritual", timeSlot: "10:00 AM - 12:00 PM",
      stylistPreference: "No Preference", skinHairType: "Normal", message: ""
    });
    setIsSubmitting(false);
  };

  return (
    <div className="pro-contact-container">

      {/* PROFESSIONAL CINEMATIC HERO */}
      <section className="contact-cinematic-hero">
        <div className="hero-gradient"></div>
        <div className="hero-inner">
          <div className="pro-tag">BOUTIQUE RESERVATIONS</div>
          <h1>The Art of <span>Transformation</span> Starts Here</h1>
          <p>Classic Salon operates on a priority scheduling model to ensure every client receives our master stylists' undivided focus.</p>
          <div className="hero-stats">
            <div className="h-stat"><span>98%</span> MATCH ACCURACY</div>
            <div className="h-stat"><span>24H</span> RESPONSE VOW</div>
          </div>
        </div>
      </section>

      {/* BOOKING RITUAL SECTION */}
      <section className="booking-ritual-section">
        <div className="ritual-grid">

          {/* LEFT: INFORMATION ARCHITECTURE */}
          <div className="ritual-info-panel">
            <div className="panel-badge">SINCE 2009</div>
            <h2>The <span>Consultation</span> Sanctuary</h2>
            <p className="panel-desc">We don't just book appointments; we design aesthetic strategies. Your journey begins with a professional analysis of your unique features.</p>

            <div className="ritual-features">
              <div className="r-feat">
                <div className="rf-icon">🕯️</div>
                <div className="rf-text">
                  <b>Bespoke Strategy</b>
                  <p>Every service includes a professional anatomical analysis.</p>
                </div>
              </div>
              <div className="r-feat">
                <div className="rf-icon">🕰️</div>
                <div className="rf-text">
                  <b>Priority Scheduling</b>
                  <p>Elite members receive access to exclusive weekend slots.</p>
                </div>
              </div>
            </div>

            <div className="flagship-location-box">
              <h4>FLAGSHIP BOUTIQUE</h4>
              <p>Golden Plaza, Rajkot, Gujarat</p>
              <div className="contact-links">
                <a href="tel:+919737671768" className="c-link">DIRECT LINE: +91 97376 71768</a>
                <a href="https://wa.me/919737671768" className="c-link gold">WHATSAPP CONCIERGE</a>
              </div>
            </div>
          </div>

          {/* RIGHT: PROFESSIONAL RESERVATION PORTAL */}
          <div className="reservation-portal">
            <div className="portal-header">
              <h3>Reservation Request</h3>
              <p>Entries marked with (*) are required for boutique synchronization.</p>
            </div>

            <form className="pro-booking-form" onSubmit={handleBooking}>
              <div className="p-form-row">
                <div className="p-field">
                  <label>FIRST NAME *</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Gondaliya" required />
                </div>
                <div className="p-field">
                  <label>LAST NAME</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Dipali" />
                </div>
              </div>

              <div className="p-form-row">
                <div className="p-field">
                  <label>MOBILE NUMBER *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91" required />
                </div>
                <div className="p-field">
                  <label>EMAIL ADDRESS</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="client@elite.com" />
                </div>
              </div>

              <div className="p-form-row">
                <div className="p-field">
                  <label>DESIRED DATE *</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div className="p-field">
                  <label>SERVICE CATEGORY</label>
                  <select name="service" value={formData.service} onChange={handleChange}>
                    <option>Bridal Signature Ritual</option>
                    <option>Keratin Precision Therapy</option>
                    <option>Aesthetic Skin Botox</option>
                    <option>Hair Spa & Couture Cut</option>
                    <option>Luxury Nail Artistry</option>
                  </select>
                </div>
              </div>

              <div className="p-form-row">
                <div className="p-field">
                  <label>TIME SLOT *</label>
                  <select name="timeSlot" value={formData.timeSlot} onChange={handleChange}>
                    <option>10:00 AM - 12:00 PM</option>
                    <option>12:00 PM - 02:00 PM</option>
                    <option>02:00 PM - 04:00 PM</option>
                    <option>04:00 PM - 06:00 PM</option>
                    <option>06:00 PM - 08:30 PM</option>
                  </select>
                </div>
                <div className="p-field">
                  <label>STYLIST PREFERENCE</label>
                  <select name="stylistPreference" value={formData.stylistPreference} onChange={handleChange}>
                    <option>No Preference</option>
                    <option>Senior Master (Female)</option>
                    <option>Master Artist (Male)</option>
                    <option>Founder Special (Dipali)</option>
                  </select>
                </div>
              </div>

              <div className="p-field full">
                <label>SKIN / HAIR TYPE (FOR PRE-ANALYSIS)</label>
                <input type="text" name="skinHairType" value={formData.skinHairType} onChange={handleChange} placeholder="e.g. Oily Skin / Color-Treated Hair" />
              </div>

              <div className="p-field full">
                <label>CLIENT INSIGHT / ADDITIONAL NOTES</label>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Kindly share any specific concerns or past salon history."></textarea>
              </div>

              <button type="submit" className="portal-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? "SYNCHRONIZING..." : "REQUEST RESERVATION"}
                <div className="btn-shine"></div>
              </button>

              <p className="portal-disclaimer">By submitting, you agree to our professional hygiene and cancellation protocols.</p>
            </form>

            {showSuccess && (
              <div className="pro-success-toast">
                <div className="toast-icon">✓</div>
                <div className="toast-content">
                  <b>Request Synchronized</b>
                  <p>Our concierge will contact you shortly to finalize your ritual.</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* INSTITUTIONAL CONTACT GRID */}
      <section className="institutional-contact-grid">
        <div className="inst-box">
          <div className="inst-num">01</div>
          <h3>General Enquiries</h3>
          <p>For boutique hours and service questions.</p>
          <a href="mailto:info@classicsalon.com">info@classicsalon.com</a>
        </div>
        <div className="inst-box">
          <div className="inst-num">02</div>
          <h3>Bridal Concierge</h3>
          <p>For dedicated wedding day transformation strategy.</p>
          <a href="mailto:bridal@classicsalon.com">bridal@classicsalon.com</a>
        </div>
        <div className="inst-box">
          <div className="inst-num">03</div>
          <h3>Career Path</h3>
          <p>Join our elite team of master artists.</p>
          <a href="/careers">Join the Institution</a>
        </div>
      </section>

    </div>
  );
}
