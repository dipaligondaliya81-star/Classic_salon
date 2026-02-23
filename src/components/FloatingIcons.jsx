import "./FloatingIcons.css";

export default function FloatingIcons() {
  return (
    <div className="floating-icons">
      {/* WHATSAPP */}
      <a
        href="https://wa.me/919737671768"
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
