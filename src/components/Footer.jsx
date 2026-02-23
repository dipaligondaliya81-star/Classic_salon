import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="luxury-footer">
            {/* TOP DECORATIVE LOGO SECTION */}
            <div className="footer-deco-logo">
                <div className="deco-line"></div>
                <div className="footer-logo-wrap">
                    <h2 className="footer-brand">C<span>L</span>ASSIC<span>™</span> SALON</h2>
                    <p className="footer-sub">PREMIUM LADIES SALON</p>
                </div>
                <div className="deco-line"></div>
            </div>

            {/* DETAILED INFO GRID */}
            <div className="footer-info-grid">

                {/* NAVIGATION COLUMN */}
                <div className="footer-col">
                    <h4 className="col-title">NAVIGATION</h4>
                    <div className="col-links">
                        <Link to="/">Home</Link>
                        <Link to="/products">Shop</Link>
                        <Link to="/about">About Us</Link>
                        <Link to="/services">FAQ's</Link>
                        <Link to="/contact">Contact Us</Link>
                    </div>
                </div>

                <div className="vertical-sep"></div>

                {/* STORE LOCATIONS COLUMN */}
                <div className="footer-col">
                    <h4 className="col-title">STORE</h4>
                    <div className="col-links">
                        <span>Rajkot</span>
                        <span>Upleta</span>
                    </div>
                </div>

                <div className="vertical-sep"></div>

                {/* NEWSLETTER COLUMN (CENTERED) */}
                <div className="footer-col newsletter-col">
                    <h4 className="col-title">Sign up for Newsletter</h4>
                    <p className="newsletter-p">We have high standards for emails too.</p>
                    <div className="newsletter-input-wrap">
                        <input type="email" placeholder="Enter your email" className="footer-input" />
                        <button className="subscribe-btn">SUBSCRIBE</button>
                    </div>
                    <div className="social-icons">
                        <div className="icon-circle">f</div>
                        <div className="icon-circle">w</div>
                        <div className="icon-circle">i</div>
                        <div className="icon-circle">y</div>
                    </div>
                </div>

                <div className="vertical-sep"></div>

                {/* CONTACT INFO COLUMN */}
                <div className="footer-col contact-col">
                    <h4 className="col-title">CLASSIC THE BEAUTY LOUNGE, RAJKOT</h4>
                    <p className="address-text">
                        Golden Plaza, Shop No.01
                        Nr. Netri Pani Puri, 150 ft Ring Road
                        Indira Circle, Rajkot, Gujarat, 360001
                    </p>

                    <div className="contact-detail">
                        <h5>Telephone</h5>
                        <p>+91 9737671768</p>
                    </div>

                    <div className="contact-detail">
                        <h5>E-Mail</h5>
                        <p>info@classicsalon.com</p>
                    </div>
                </div>

            </div>

            {/* BOTTOM COPYRIGHT */}
            <div className="footer-bottom">
                <p>© 2024 Classic Premium Ladies Salon. All Rights Reserved.</p>
                <div className="footer-bottom-links">
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                </div>
            </div>
        </footer>
    );
}
