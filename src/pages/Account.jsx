import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Account.css";

export default function Account() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeSection, setActiveSection] = useState("overview");

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
            navigate("/login");
        } else {
            setUser(storedUser);
        }
    }, [navigate]);

    if (!user) return null;

    return (
        <div className="elite-dashboard-layout">

            {/* LEFT NAVIGATION: THE MEMBER SIDEBAR */}
            <aside className="member-sidebar">
                <div className="member-status-card">
                    <div className="status-orb platinum"></div>
                    <div className="status-info">
                        <p className="status-label">LOYALTY STATUS</p>
                        <h4 className="status-value">PLATINUM MEMBER</h4>
                    </div>
                </div>

                <nav className="member-nav">
                    <button className={activeSection === "overview" ? "active" : ""} onClick={() => setActiveSection("overview")}>
                        <span className="m-icon">🏛️</span> OVERVIEW
                    </button>
                    <button className={activeSection === "history" ? "active" : ""} onClick={() => setActiveSection("history")}>
                        <span className="m-icon">📜</span> RITUAL HISTORY
                    </button>
                    <button className={activeSection === "prescriptions" ? "active" : ""} onClick={() => setActiveSection("prescriptions")}>
                        <span className="m-icon">🧪</span> BESPOKE REGIMEN
                    </button>
                    <button className={activeSection === "settings" ? "active" : ""} onClick={() => setActiveSection("settings")}>
                        <span className="m-icon">⚙️</span> VAULT SETTINGS
                    </button>
                </nav>

                <button className="member-logout" onClick={() => { localStorage.removeItem("user"); navigate("/"); }}>
                    SIGN OUT OF VAULT
                </button>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="member-main-content">

                {/* HEADER SECTION */}
                <header className="member-header">
                    <div className="welcome-text">
                        <h1>Welcome back, <span>{user.username}</span></h1>
                        <p>Your elite beauty records are synchronized and ready.</p>
                    </div>
                    <div className="member-badge">
                        <img src="https://cdn-icons-png.flaticon.com/512/6941/6941697.png" alt="Seal" />
                        <span>VERIFIED SINCE 2026</span>
                    </div>
                </header>

                {activeSection === "overview" && (
                    <div className="section-content animate-fade-in">

                        {/* TOP STATS */}
                        <div className="member-stats-grid">
                            <div className="m-stat-card">
                                <h6>SIGNATURE POINTS</h6>
                                <h3>2,450</h3>
                                <div className="stat-progress"><div className="fill" style={{ width: '75%' }}></div></div>
                                <p>550 pts to Diamond Status</p>
                            </div>
                            <div className="m-stat-card">
                                <h6>ACTIVE RITUALS</h6>
                                <h3>04</h3>
                                <p>Currently in regimen</p>
                            </div>
                            <div className="m-stat-card gold">
                                <h6>EXCLUSIVE OFFERS</h6>
                                <h3>{">"} 03</h3>
                                <p>Priority access available</p>
                            </div>
                        </div>

                        {/* NEXT APPOINTMENT PREVIEW */}
                        <div className="member-next-ritual">
                            <div className="next-text">
                                <h5>UPCOMING APPOINTMENT</h5>
                                <h2>Bridal Signature Glow Ritual</h2>
                                <p>📅 February 28, 2026 at 4:30 PM • Main Branch</p>
                            </div>
                            <button className="manage-btn">MANAGE BOOKING</button>
                        </div>

                        {/* RECENT ACTIVITY */}
                        <div className="member-recent-activity">
                            <h4>Recent Vault Activity</h4>
                            <div className="activity-list">
                                <div className="activity-item">
                                    <div className="a-dot"></div>
                                    <div className="a-info">
                                        <b>Regimen Updated</b>
                                        <span>Added "Gondaliya Signature Glow Face Wash" to morning ritual.</span>
                                    </div>
                                    <div className="a-time">2h ago</div>
                                </div>
                                <div className="activity-item">
                                    <div className="a-dot"></div>
                                    <div className="a-info">
                                        <b>Points Earned</b>
                                        <span>Acquired 450 pts for Keratin Precision Therapy.</span>
                                    </div>
                                    <div className="a-time">Yesterday</div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}

                {activeSection === "prescriptions" && (
                    <div className="section-content animate-fade-in">
                        <div className="presc-header">
                            <h2>Bespoke <span>Regimen</span></h2>
                            <p>Scientifically curated products based on your last anatomical analysis.</p>
                        </div>

                        <div className="presc-list">
                            <div className="presc-card">
                                <div className="p-cat">AM RITUAL</div>
                                <h4>Gondaliya Signature Glow Face Wash</h4>
                                <p>Cleanse with lukewarm water. Focus on T-zone for 60 seconds.</p>
                                <button className="buy-now-btn">RESTOCK NOW</button>
                            </div>
                            <div className="presc-card grey">
                                <div className="p-cat">PM RITUAL</div>
                                <h4>Ultra-Purifying Charcoal Ritual</h4>
                                <p>Apply after makeup removal. Leave for 30 seconds to stimulate pores.</p>
                                <button className="buy-now-btn">RESTOCK NOW</button>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === "history" && (
                    <div className="section-content animate-fade-in">
                        <h2>Ritual <span>History</span></h2>
                        <table className="history-table">
                            <thead>
                                <tr>
                                    <th>DATE</th>
                                    <th>RITUAL TYPE</th>
                                    <th>STATUS</th>
                                    <th>POINTS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Feb 12, 2026</td>
                                    <td>Keratin Precision Therapy</td>
                                    <td><span className="tag complete">COMPLETED</span></td>
                                    <td>+450</td>
                                </tr>
                                <tr>
                                    <td>Jan 30, 2026</td>
                                    <td>Boutique Purchase (Face Wash)</td>
                                    <td><span className="tag dev">DELIVERED</span></td>
                                    <td>+120</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

            </main>

        </div>
    );
}
