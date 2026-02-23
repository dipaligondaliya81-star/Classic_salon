import { useState } from "react";
import "./Concierge.css";

export default function Concierge() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`concierge-container ${isOpen ? "active" : ""}`}>
            {/* Floating Button */}
            <div className="concierge-fab" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <span className="close-icon">×</span> : <span className="sparkle-icon">✨</span>}
                {!isOpen && <span className="concierge-label">LUXE CONCIERGE</span>}
            </div>

            {/* Concierge Menu */}
            <div className="concierge-menu">
                <div className="menu-header">
                    <h3>Classic Salon <span>Concierge</span></h3>
                    <p>How may we assist you today?</p>
                </div>

                <div className="menu-options">
                    <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noreferrer" className="menu-item">
                        <span className="icon">💬</span>
                        <div className="text">
                            <b>Consult an Expert</b>
                            <p>Chat with us on WhatsApp</p>
                        </div>
                    </a>

                    <a href="tel:+91XXXXXXXXXX" className="menu-item">
                        <span className="icon">📞</span>
                        <div className="text">
                            <b>Instant Callback</b>
                            <p>Speak with our receptionist</p>
                        </div>
                    </a>

                    <div className="menu-item" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <span className="icon">🏩</span>
                        <div className="text">
                            <b>Book Appointment</b>
                            <p>Reserve your luxury slot</p>
                        </div>
                    </div>

                    <div className="menu-item status-check">
                        <span className="icon">📦</span>
                        <div className="text">
                            <b>Track Boutique Order</b>
                            <p>Check your order status</p>
                        </div>
                    </div>
                </div>

                <div className="menu-footer">
                    <p>Open Mon - Sun: 10:00 AM - 08:00 PM</p>
                </div>
            </div>

            {/* Backdrop */}
            {isOpen && <div className="concierge-backdrop" onClick={() => setIsOpen(false)}></div>}
        </div>
    );
}
