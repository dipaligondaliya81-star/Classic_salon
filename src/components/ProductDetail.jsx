import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";

export default function ProductDetail({ addToCart }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeAcc, setActiveAcc] = useState("description");
    const [pincode, setPincode] = useState("");
    const [pincodeStatus, setPincodeStatus] = useState("");

    useEffect(() => {
        fetchData();
        window.scrollTo(0, 0);
    }, [id]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:5000/products`);
            if (res.ok) {
                const prods = await res.json();
                const found = prods.find(p => p.id === parseInt(id));
                setProduct(found);
                if (found) {
                    const similar = prods
                        .filter(p => p.category === found.category && p.id !== found.id)
                        .slice(0, 4);
                    setRelated(similar);
                }
            }
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handlePincodeCheck = () => {
        if (pincode.length === 6) {
            setPincodeStatus("PREMIUM DELIVERY AVAILABLE");
        } else {
            setPincodeStatus("INVALID PINCODE");
        }
    };

    const getImageUrl = (img) => {
        if (!img) return "https://via.placeholder.com/600";
        if (img.startsWith("/images/")) return img;
        if (img.startsWith("http")) return img;
        return `http://localhost:5000/uploads/${img}`;
    };

    if (loading) return <div className="pdp-loader-overlay"><div className="loader-orbit"></div></div>;
    if (!product) return <div className="pdp-error">Institution Record Not Found.</div>;

    const price = Number(product.price) || 0;
    const discount = Number(product.discount) || 20; // Default discount for premium feel
    const finalPrice = discount > 0 ? price - (price * discount) / 100 : price;

    return (
        <div className="luxe-pdp-wrapper animate-fade-in">

            {/* HERO PRODUCT SECTION */}
            <section className="pdp-hero-grid">

                {/* LEFT: GALLERY SYSTEM */}
                <div className="pdp-gallery-column">
                    <div className="main-stage">
                        <img src={getImageUrl(product.img)} alt={product.name} />
                        <div className="image-zoom-hint">SCROLL TO ENLARGE</div>
                    </div>
                    <div className="thumb-strip">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="mini-thumb">
                                <img src={getImageUrl(product.img)} alt="view" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: BUYER INTELLIGENCE */}
                <div className="pdp-commerce-column">
                    <div className="pdp-brand-header">
                        <h2>CLASSIC<span>™</span> PROFESSIONAL</h2>
                        <div className="pdp-wishlist-trigger">♡</div>
                    </div>

                    <h1 className="pdp-main-title">{product.name}</h1>
                    <p className="pdp-short-desc">
                        Advanced Professional Formula • {product.category || "Professional Series"} • Pure Extracts
                    </p>

                    <div className="pdp-price-suite">
                        <div className="price-primary">₹{finalPrice.toFixed(2)}</div>
                        <div className="price-secondary">
                            MRP <span className="strike">₹{price.toFixed(2)}</span>
                            <span className="discount-pill">({discount}% OFF)</span>
                        </div>
                        <p className="tax-hint">Inclusive of all taxes</p>
                    </div>

                    {/* PINCODE MODULE */}
                    <div className="pdp-pincode-module">
                        <label>Use pincode to check delivery info</label>
                        <div className="pincode-input-wrap">
                            <span className="loc-icon">📍</span>
                            <input
                                type="text"
                                placeholder="Enter a pin code"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                maxLength={6}
                            />
                            <button onClick={handlePincodeCheck}>CHECK</button>
                        </div>
                        {pincodeStatus && <p className={`pin-status ${pincodeStatus.includes('AVAILABLE') ? 'green' : 'red'}`}>{pincodeStatus}</p>}
                    </div>

                    <div className="pdp-actions">
                        <button className="primary-buy-btn" onClick={() => addToCart(product)}>
                            ADD TO CART
                        </button>
                        <button className="secondary-wish-btn">ADD TO WISHLIST</button>
                    </div>

                    <div className="pdp-assurance-grid">
                        <div className="ass-item">
                            <img src="https://cdn-icons-png.flaticon.com/512/2769/2769257.png" alt="" />
                            <span>FREE SHIPPING</span>
                        </div>
                        <div className="ass-item">
                            <img src="https://cdn-icons-png.flaticon.com/512/1554/1554401.png" alt="" />
                            <span>CASH ON DELIVERY</span>
                        </div>
                        <div className="ass-item">
                            <img src="https://cdn-icons-png.flaticon.com/512/709/709790.png" alt="" />
                            <span>EXPRESS DELIVERY</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* DETAILS & REVIEWS ARCHITECTURE */}
            <section className="pdp-details-architecture">
                <div className="details-container">

                    <div className="acc-section">
                        <div className="acc-trigger" onClick={() => setActiveAcc(activeAcc === 'description' ? '' : 'description')}>
                            Product description <span>{activeAcc === 'description' ? '−' : '+'}</span>
                        </div>
                        {activeAcc === 'description' && (
                            <div className="acc-panel">
                                <p>The Classic™ Professional series represents our highest achievement in cosmetic science.
                                    Precisely engineered for elite results, this formula provides deep nourishment and revitalization.</p>
                                <ul>
                                    <li>Dermatologically Tested</li>
                                    <li>Paraben & Sulfate Free</li>
                                    <li>Professional Salon Grade Quality</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="acc-section">
                        <div className="acc-trigger" onClick={() => setActiveAcc(activeAcc === 'about' ? '' : 'about')}>
                            About this item <span>{activeAcc === 'about' ? '−' : '+'}</span>
                        </div>
                        {activeAcc === 'about' && (
                            <div className="acc-panel">
                                <p>• While we work to ensure that product information is correct, on occasion manufacturers may alter their ingredient lists. Actual product packaging and materials may contain more and/or different information than that shown on our web site. We recommend that you do not solely rely on the information presented and that you always read labels, warnings, and directions before using or consuming a product.</p>
                            </div>
                        )}
                    </div>

                    {/* REVIEW SNAPSHOT */}
                    <div className="review-snapshot-box">
                        <div className="rev-header">
                            <span className="sub-rev">REVIEW</span>
                            <h2>Snapshot</h2>
                        </div>
                        <div className="rev-grid">
                            <div className="rev-score-col">
                                <h1>0.0</h1>
                                <div className="stars-placeholder">★★★★★</div>
                                <p>Based on 0 reviews</p>
                            </div>
                            <div className="rev-bars-col">
                                {[5, 4, 3, 2, 1].map(num => (
                                    <div key={num} className="rev-bar-row">
                                        <span>{num} star</span>
                                        <div className="bar-bg"><div className="bar-fill" style={{ width: '0%' }}></div></div>
                                        <span>0%</span>
                                    </div>
                                ))}
                            </div>
                            <div className="rev-action-col">
                                <button className="add-review-btn">ADD A REVIEW</button>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* RELATED PRODUCTS */}
            {related.length > 0 && (
                <section className="pdp-related-section">
                    <h2 className="related-title">Complete the <span>Ritual</span></h2>
                    <div className="related-flex">
                        {related.map(rp => (
                            <div className="rel-card" key={rp.id} onClick={() => navigate(`/product/${rp.id}`)}>
                                <div className="rel-img">
                                    <img src={getImageUrl(rp.img)} alt="" />
                                </div>
                                <h4>{rp.name}</h4>
                                <div className="rel-price">₹{rp.price}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

        </div>
    );
}
