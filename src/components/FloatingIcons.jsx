import "./FloatingIcons.css";
import { getWhatsAppUrl } from "../apiConfig";

export default function FloatingIcons() {
  const whatsappUrl = getWhatsAppUrl("Hello Classic Salon! I'm interested in booking a session. Please guide me.");
  return (
    <div className="floating-icons">
      {/* WHATSAPP */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="icon whatsapp"
        title="Chat on WhatsApp"
      >
        <span>💬</span>
      </a>

      {/* CALL */}
      <a
        href="tel:9737671768"
        className="icon call"
        title="Call Now"
      >
        <span>📞</span>
      </a>

      {/* ENQUIRY */}
      <a
        href="/contact"
        className="icon enquiry"
        title="Enquiry"
      >
        <span>✉️</span>
      </a>
    </div>
  );
}
