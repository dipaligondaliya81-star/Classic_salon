import { useState } from "react";
import "./VipCard.css";

export default function VipCard() {
    const [isJoined, setIsJoined] = useState(false);
    const [showCard, setShowCard] = useState(false);

    return (
        <section className="vip-membership">
            <div className="vip-overlay"></div>
            <div className="vip-container">
                {!isJoined ? (
                    <div className="vip-invite">
                        <h2 className="section-title">Classic <span>Elite Circle</span></h2>
                        <p>Access exclusive salon privileges, priority bookings, and luxury rewards.</p>
                        <button className="join-btn" onClick={() => {
                            setIsJoined(true);
                            setTimeout(() => setShowCard(true), 600);
                        }}>JOIN THE ELITE</button>
                    </div>
                ) : (
                    <div className={`exclusive-reveal ${showCard ? 'active' : ''}`}>
                        <div className="elite-card">
                            <div className="card-inner">
                                <div className="card-front">
                                    <div className="card-header">
                                        <span className="chip"></span>
                                        <span className="logo-text">CLASSIC ELITE</span>
                                    </div>
                                    <div className="card-body">
                                        <p className="member-label">VIP PASS</p>
                                        <h3 className="member-name">GOLD MEMBER</h3>
                                    </div>
                                    <div className="card-footer">
                                        <div className="points">
                                            <span>REWARD POINTS</span>
                                            <b>2,450</b>
                                        </div>
                                        <div className="expiry">
                                            <span>VALID UNTIL</span>
                                            <b>12 / 2026</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="elite-perks">
                            <h3>Welcome to Excellence!</h3>
                            <ul>
                                <li>✨ 10% Off on all L'Oréal Boutique products</li>
                                <li>🧖‍♀️ Free Monthly Hair Spa Consultation</li>
                                <li>📅 Priority Weekend Booking</li>
                                <li>☕ Complimentary Luxury Lounge Access</li>
                            </ul>
                            <button className="view-dashboard-btn">Open My Dashboard</button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
