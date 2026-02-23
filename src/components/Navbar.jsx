import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
    const navigate = useNavigate();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchSubmit = async (e) => {
        if (e.key === "Enter" && searchQuery.trim()) {
            const query = searchQuery.trim().toLowerCase();

            try {
                const res = await fetch(`http://localhost:5000/products`);
                if (res.ok) {
                    const prods = await res.json();
                    const directMatch = prods.find(p => p.name.toLowerCase() === query);

                    if (directMatch) {
                        navigate(`/product/${directMatch.id}`);
                    } else {
                        navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
                    }
                } else {
                    navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
                }
            } catch (err) {
                navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
            }

            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    return (
        <nav className="luxury-navbar">
            <div className="nav-container">
                {/* LEFT LINKS */}
                <div className="nav-group left-links">
                    <Link to="/about">ABOUT</Link>
                    <Link to="/products">SHOP</Link>
                    <Link to="/services">SERVICES</Link>
                    <Link to="/contact">CONTACT US</Link>
                </div>

                {/* CENTER LOGO */}
                <div className="nav-logo-centered" onClick={() => navigate("/")}>
                    <div className="logo-text-wrap">
                        <h1 className="main-logo-title">
                            C<span className="gold-letter">L</span>ASSIC
                            <span className="brand-tm">™</span> SALON
                        </h1>
                        <p className="logo-tagline">PREMIUM LADIES SALON</p>
                    </div>
                </div>

                {/* RIGHT ACTIONS */}
                <div className="nav-group right-actions">
                    <div className="nav-icon wishlist-icon">
                        <i className="far fa-heart">♡</i>
                    </div>
                    {localStorage.getItem("user") ? (
                        <Link to="/account" className="login-text gold-member-link">LOGIN</Link>
                    ) : (
                        <Link to="/login" className="login-text">LOGIN</Link>
                    )}
                    <div className="nav-divider"></div>

                    <div className="search-module">
                        {isSearchOpen ? (
                            <div className="search-active-wrap">
                                <span className="search-icon-fixed">🔍</span>
                                <input
                                    type="text"
                                    className="nav-search-input"
                                    placeholder="FIND A RITUAL..."
                                    autoFocus
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleSearchSubmit}
                                    onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                                />
                                <button className="search-close" onClick={() => setIsSearchOpen(false)}>×</button>
                            </div>
                        ) : (
                            <div className="search-trigger-pro" onClick={() => setIsSearchOpen(true)}>
                                <span className="search-ico">🔍</span>
                                <span className="search-txt">SEARCH</span>
                            </div>
                        )}
                    </div>

                    <Link to="/admin-login" className="admin-circle-link">A</Link>
                </div>
            </div>
        </nav>
    );
}
