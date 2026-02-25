import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig";
import "./Welcome.css";

export default function Welcome({ cart, setCart, isCartOpen, setIsCartOpen, addToCart }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= STATES ================= */
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("DEFAULT");
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "", note: "" });
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [addedId, setAddedId] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Bag, 2: Details, 3: Review

  // Sync search with URL query param 'q'
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    if (q) {
      setSearch(q);
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  }, [location.search]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([
        fetch(`${API_BASE_URL}/categories`),
        fetch(`${API_BASE_URL}/products`)
      ]);

      let prods = [];
      if (catRes.ok && prodRes.ok) {
        prods = await prodRes.json();
      }

      // 🌟 FULL BOUTIQUE CATALOG (Fallback for Vercel/Empty DB)
      if (!Array.isArray(prods) || prods.length === 0) {
        prods = [
          // SHAMPOOS
          { id: 'f1', name: "L'Oréal Professionnel Repair Shampoo", price: 1800, category: "Shampoo", img: "/images/loreal-shampoo.jpg", discount: 10 },
          { id: 'f2', name: "L'Oréal Professionnel Smooth Ritual", price: 1950, category: "Shampoo", img: "/images/smoth shampooo.jpg" },
          { id: 'f10', name: "Anti-Hairfall Control Shampoo", price: 1650, category: "Shampoo", img: "/images/hairfall sampo.jpg" },
          { id: 'f11', name: "Nourishing Growth Shampoo", price: 1750, category: "Shampoo", img: "/images/Nourish hair cowth sampo.jpg" },
          { id: 'f12', name: "Dry Hair Rescue Shampoo", price: 1550, category: "Shampoo", img: "/images/dry hair sampo.jpg" },
          { id: 'f13', name: "Tresemmé Smooth & Shine", price: 1200, category: "Shampoo", img: "/images/Tresme shmpoo.jpg" },

          // FACE WASH & SKIN
          { id: 'f3', name: "Gondaliya Signature Glow Wash", price: 1250, category: "Face Wash", img: "/images/facewash.jpg", discount: 15 },
          { id: 'f4', name: "Vitamin C Aura Brightening", price: 1400, category: "Face Wash", img: "/images/facewash4.jpg" },
          { id: 'f14', name: "Ultra-Purifying Charcoal Ritual", price: 1100, category: "Face Wash", img: "/images/SHOWERJEL.jpg" },

          // SERUMS & OILS
          { id: 'f5', name: "L'Oréal Professional Serum", price: 2100, category: "Serum", img: "/images/loreal-serum.jpg", discount: 5 },
          { id: 'f6', name: "Xtenso Care Professional", price: 2250, category: "Serum", img: "/images/xtensho shiram.jpg" },
          { id: 'f15', name: "Streax Professional Shine Serum", price: 1350, category: "Serum", img: "/images/streax professional serum.jpg" },
          { id: 'f16', name: "Global Tresemmé Serum", price: 1850, category: "Serum", img: "/images/tresemme globle serum.jpg" },

          // HAIR MASKS & TREATMENTS
          { id: 'f7', name: "Deep Repair Keratin Mask", price: 2800, category: "Hair Mask", img: "/images/ketatin mask.jpg", discount: 20 },
          { id: 'f8', name: "Kerasmooth Master Mask", price: 3200, category: "Hair Mask", img: "/images/kerasmoth mask.jpg" },
          { id: 'f9', name: "Botox Hair Ritual Therapy", price: 4500, category: "Hair Treatment", img: "/images/botox.jpg" },
          { id: 'f17', name: "Elite Bond Repair Mask", price: 3500, category: "Hair Treatment", img: "/images/plex bond repair sampo.jpg" },
          { id: 'f18', name: "Kanpeki Professional Ritual", price: 4200, category: "Hair Treatment", img: "/images/mask-kanpeki.jpg" },
          { id: 'f19', name: "Hair Color Protection Mask", price: 2400, category: "Hair Mask", img: "/images/professional  hair mask.jpg" }
        ];
      }

      const uniqueCats = ["ALL", ...new Set(prods.map(p => (p.category || "GENERAL").toUpperCase()))];
      setCategories(uniqueCats);
      setProducts(prods.map(p => ({
        ...p,
        rating: p.rating || (Math.random() * (5 - 4.5) + 4.5).toFixed(1),
        stock: p.stock || (Math.floor(Math.random() * 15) + 3),
        brand: "CLASSIC BOUTIQUE"
      })));
    } catch (err) {
      console.error("Failed to fetch shop data, using fallback:", err);
      const fallbacks = [
        { id: 'f1', name: "L'Oréal Professionnel Repair Shampoo", price: 1800, category: "Shampoo", img: "/images/loreal-shampoo.jpg", discount: 10 },
        { id: 'f3', name: "Gondaliya Signature Glow Wash", price: 1250, category: "Face Wash", img: "/images/facewash.jpg", discount: 15 },
        { id: 'f5', name: "L'Oréal Professional Serum", price: 2100, category: "Serum", img: "/images/loreal-serum.jpg" },
        { id: 'f7', name: "Deep Repair Keratin Mask", price: 2800, category: "Hair Mask", img: "/images/ketatin mask.jpg", discount: 20 },
        { id: 'f9', name: "Botox Hair Ritual Therapy", price: 4500, category: "Hair Treatment", img: "/images/botox.jpg" },
        { id: 'f19', name: "Hair Color Protection Mask", price: 2400, category: "Hair Mask", img: "/images/professional  hair mask.jpg" }
      ];
      setProducts(fallbacks.map(p => ({ ...p, rating: "4.9", stock: 10, brand: "CLASSIC BOUTIQUE" })));
      setCategories(["ALL", "SHAMPOO", "FACE WASH", "SERUM", "HAIR MASK", "HAIR TREATMENT"]);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/300";
    if (img.startsWith("/images/") || img.startsWith("http")) return img;
    return `${API_BASE_URL}/uploads/${img}`;
  };

  /* ================= HELPERS ================= */
  const filteredProducts = products
    .filter(p => {
      const matchesCat = selectedCategory === "ALL" || (p.category || "").toUpperCase() === selectedCategory;
      const matchesSearch = p.name ? p.name.toLowerCase().includes(search.toLowerCase()) : false;
      return matchesCat && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOption === "PRICE_LOW") return a.price - b.price;
      if (sortOption === "PRICE_HIGH") return b.price - a.price;
      if (sortOption === "RATING") return b.rating - a.rating;
      return 0;
    });

  const handleAddToCart = (p) => {
    setAddedId(p.id);
    addToCart(p);
    setTimeout(() => {
      setAddedId(null);
      setIsCartOpen(true);
      setCheckoutStep(1); // Reset to first step when adding
    }, 600);
  };

  const calculateTotalPrice = (item) => {
    const price = Number(item.price) || 0;
    const discount = Number(item.discount) || 0;
    const finalPrice = discount > 0 ? price - (price * discount) / 100 : price;
    return finalPrice * (item.qty || 1);
  };

  const totalAmount = cart.reduce((sum, item) => sum + calculateTotalPrice(item), 0);

  const handlePlaceOrder = async () => {
    if (!customer.name || !customer.phone) {
      alert("Please provide the customer name and mobile number.");
      return;
    }
    setOrderSuccess(true);
    // Mimic API processing
    setTimeout(() => {
      localStorage.setItem("bill", JSON.stringify({
        customer, items: cart, total: totalAmount, paymentMethod, date: new Date().toLocaleString()
      }));
      navigate("/bill");
    }, 2800);
  };

  if (loading) return (
    <div className="boutique-main-loader">
      <div className="loader-inner">
        <div className="luxury-orbit"></div>
        <h2>SYNCING WITH BOUTIQUE...</h2>
      </div>
    </div>
  );

  return (
    <div className="shop-pro-container">

      {/* PROFESSIONAL SHOP HERO */}
      <section className="shop-pro-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge-pro">GENUINE PROFESSIONAL CARE</div>
          <h1>The <span>Boutique</span> Collection</h1>
          <p>Curated by Dipali Gondaliya. Professional-grade formulas for transformative results at home.</p>
          <div className="professional-search">
            <input
              type="text"
              placeholder="Search by product name or concern..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* LUXURY TRUST STRIP */}
      <section className="boutique-trust-strip">
        <div className="trust-item">
          <span className="t-icon">✧</span>
          <div className="t-text">
            <b>ARTISAN CURATED</b>
            <p>Master Approved Formulas</p>
          </div>
        </div>
        <div className="trust-divider"></div>
        <div className="trust-item">
          <span className="t-icon">◈</span>
          <div className="t-text">
            <b>CRUELTY FREE</b>
            <p>Ethical Beauty Standards</p>
          </div>
        </div>
        <div className="trust-divider"></div>
        <div className="trust-item">
          <span className="t-icon">⚛</span>
          <div className="t-text">
            <b>SKIN SCIENCE</b>
            <p>High-Performance Rituals</p>
          </div>
        </div>
      </section>

      {/* ARCHITECTURAL CATEGORY NAV */}
      <div className="pro-category-nav">
        <div className="nav-label-main">FILTER BY COLLECTION</div>
        <div className="nav-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={selectedCategory === cat ? "active" : ""}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
              <div className="active-dot"></div>
            </button>
          ))}
        </div>

        <div className="pro-sort-control">
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="DEFAULT">SORT BY: RELEVANCE</option>
            <option value="PRICE_LOW">PRICE: LOW TO HIGH</option>
            <option value="PRICE_HIGH">PRICE: HIGH TO LOW</option>
            <option value="RATING">TOP RATED ASSETS</option>
          </select>
        </div>
      </div>

      {/* PRODUCTS MASTER GRID */}
      <main className="shop-pro-main">
        {filteredProducts.length === 0 ? (
          <div className="no-result-pro">
            <h2>Collection unavailable</h2>
            <p>Our artisans haven't curated this selection yet. Try another search.</p>
          </div>
        ) : (
          <div className="professional-grid">
            {filteredProducts.map(p => {
              const price = Number(p.price) || 0;
              const discount = Number(p.discount) || 0;
              const finalPrice = discount > 0 ? price - (price * discount) / 100 : price;

              return (
                <div className={`pro-product-card ${addedId === p.id ? "is-added" : ""}`} key={p.id}>
                  <div className="card-top">
                    <div className="pro-badges">
                      {discount > 0 && <div className="pro-discount-pill">-{discount}%</div>}
                      {p.rating >= 4.9 && <div className="pro-bestseller-badge">BOUTIQUE CHOICE</div>}
                    </div>
                    <div className="stock-hint">{p.stock} LEFT</div>
                  </div>

                  <div className="card-media" onClick={() => navigate(`/product/${p.id}`)}>
                    <img src={getImageUrl(p.img)} alt={p.name} />
                    <div className="media-overlay">
                      <button onClick={(e) => { e.stopPropagation(); handleAddToCart(p); }}>
                        {addedId === p.id ? "✓ ADDED" : "ADD TO BAG"}
                      </button>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="brand-marker">{p.brand} <span className="m-approved">• MASTER APPROVED</span></div>
                    <h3 onClick={() => navigate(`/product/${p.id}`)}>{p.name}</h3>
                    <div className="rating-star">★ {p.rating} <span>(MASTER PICK)</span></div>

                    <div className="card-footer-pro">
                      <div className="price-tag-pro">
                        {discount > 0 && <span className="old-val">₹{price.toFixed(0)}</span>}
                        <span className="current-val">₹{finalPrice.toFixed(0)}</span>
                      </div>
                      <button className="pro-detail-btn" onClick={() => navigate(`/product/${p.id}`)}>VIEW DETAIL</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* FLOATING CART SUMMARY */}
      {cart.length > 0 && (
        <div className="floating-pro-cart" onClick={() => setIsCartOpen(true)}>
          <div className="pro-cart-label">YOUR BAG</div>
          <div className="pro-cart-val">₹{totalAmount.toFixed(0)}</div>
          <div className="pro-cart-count">{cart.length}</div>
        </div>
      )}

      {/* PROFESSIONAL MULTI-STEP CHECKOUT SIDEBAR */}
      <div className={`pro-sidebar-overlay ${isCartOpen ? "open" : ""}`} onClick={() => setIsCartOpen(false)}>
        <div className="pro-checkout-sidebar" onClick={e => e.stopPropagation()}>

          <div className="sidebar-header">
            <div className="header-text">
              <h2>Boutique <span>Bag</span></h2>
              <div className="step-indicator">STEP 0{checkoutStep} OF 03</div>
            </div>
            <button className="close-sidebar" onClick={() => setIsCartOpen(false)}>×</button>
          </div>

          <div className="sidebar-main-content">

            {/* STEP 1: REVIEW BAG */}
            {checkoutStep === 1 && (
              <div className="checkout-view animate-fade">
                {cart.length === 0 ? (
                  <div className="empty-state-pro">
                    <p>Your bag is currently empty.</p>
                    <button onClick={() => setIsCartOpen(false)}>CONTINUE BROWSING</button>
                  </div>
                ) : (
                  <>
                    <div className="checkout-items-list">
                      {cart.map(item => (
                        <div className="mini-item-row" key={item.id}>
                          <img src={getImageUrl(item.img)} alt="" />
                          <div className="mini-info">
                            <h4>{item.name}</h4>
                            <div className="mini-price">₹{calculateTotalPrice(item).toFixed(0)}</div>
                            <div className="mini-qty-control">
                              <button onClick={() => setCart(cart.map(c => c.id === item.id ? { ...c, qty: Math.max(1, c.qty - 1) } : c))}>−</button>
                              <span>{item.qty}</span>
                              <button onClick={() => setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c))}>+</button>
                            </div>
                          </div>
                          <button className="mini-remove" onClick={() => setCart(cart.filter(i => i.id !== item.id))}>×</button>
                        </div>
                      ))}
                    </div>
                    <div className="checkout-footer-action">
                      <div className="subtotal-row"><span>SUBTOTAL</span><b>₹{totalAmount.toFixed(0)}</b></div>
                      <button className="pro-next-btn" onClick={() => setCheckoutStep(2)}>PROCEED TO DETAILS →</button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* STEP 2: CUSTOMER DETAILS */}
            {checkoutStep === 2 && (
              <div className="checkout-view animate-fade">
                <div className="details-form-pro">
                  <h3>Contact Information</h3>
                  <p className="form-hint">Please provide your details for the boutique dispatch record.</p>

                  <div className="pro-input-group">
                    <label>FULL NAME</label>
                    <input
                      placeholder="Enter your name"
                      value={customer.name}
                      onChange={e => setCustomer({ ...customer, name: e.target.value })}
                    />
                  </div>
                  <div className="pro-input-group">
                    <label>MOBILE NUMBER</label>
                    <input
                      placeholder="Enter 10-digit mobile"
                      type="tel"
                      value={customer.phone}
                      onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                    />
                  </div>
                  <div className="pro-input-group">
                    <label>SELECT PAYMENT</label>
                    <div className="pro-payment-toggles">
                      <button className={paymentMethod === 'Cash' ? 'active' : ''} onClick={() => setPaymentMethod('Cash')}>CASH</button>
                      <button className={paymentMethod === 'Online' ? 'active' : ''} onClick={() => setPaymentMethod('Online')}>ONLINE</button>
                    </div>
                  </div>
                </div>
                <div className="checkout-footer-action">
                  <button className="pro-back-btn" onClick={() => setCheckoutStep(1)}>← BACK TO BAG</button>
                  <button className="pro-next-btn" onClick={() => setCheckoutStep(3)}>REVIEW ORDER</button>
                </div>
              </div>
            )}

            {/* STEP 3: REVIEW & CONFIRM */}
            {checkoutStep === 3 && (
              <div className="checkout-view animate-fade">
                <div className="order-summary-pro">
                  <h3>Order Review</h3>
                  <div className="summary-block">
                    <b>CUSTOMER</b>
                    <p>{customer.name} ({customer.phone})</p>
                  </div>
                  <div className="summary-block">
                    <b>ITEMS ({cart.length})</b>
                    <p>Totaling ₹{totalAmount.toFixed(0)} via {paymentMethod}</p>
                  </div>
                  <div className="final-notice">
                    <p>By clicking complete, you verify that your boutique selection and contact details are accurate.</p>
                  </div>
                </div>
                <div className="checkout-footer-action">
                  <button className="pro-back-btn" onClick={() => setCheckoutStep(2)}>← EDIT DETAILS</button>
                  <button className="pro-final-btn" onClick={handlePlaceOrder}>COMPLETE ORDER</button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* SUPREME SUCCESS OVERLAY */}
      {orderSuccess && (
        <div className="supreme-success-overlay">
          <div className="success-ritual">
            <div className="success-icon-wrap">
              <div className="pulse-order"></div>
              <span>✓</span>
            </div>
            <h2>Ritual Finalized</h2>
            <p>Our artisans are preparing your professional boutique invoice. You will be redirected shortly.</p>
            <div className="ritual-progress-bar"><div className="progress-fill"></div></div>
          </div>
        </div>
      )}

    </div>
  );
}