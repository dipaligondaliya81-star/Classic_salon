import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Services.css";

const treatmentData = {
    hair: {
        title: "Master Hair Artistry",
        image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=1200",
        categories: [
            {
                name: "Editorial Cut & Finish",
                items: [
                    { name: "Master Stylist Precision Cut", price: "800" },
                    { name: "Architectural Hair Sculpting", price: "1200" },
                    { name: "Signature Blow-Dry & Sculpt", price: "600" }
                ]
            },
            {
                name: "Advanced Bond Therapy",
                items: [
                    { name: "Olaplex™ Bond-Building Ritual", price: "4000" },
                    { name: "Molecular Hair Reconstruction", price: "5500" },
                    { name: "Elite Keratin Smoothing", price: "6500" }
                ]
            },
            {
                name: "Chromatic Narrative",
                items: [
                    { name: "Global Chromatic Saturation", price: "3500" },
                    { name: "Master Balayage / Ombré Mastery", price: "6000" },
                    { name: "Luxe Glossing & Toning", price: "2500" }
                ]
            }
        ]
    },
    skin: {
        title: "Clinical Skin Aesthetics",
        image: "/images/images789.jpg",
        categories: [
            {
                name: "Dermatological Facials",
                items: [
                    { name: "Molecular Hydra-Facial Ritual", price: "7500" },
                    { name: "Clinical Bio-Hydra Glow Therapy", price: "4500" },
                    { name: "Diamond Micro-Glow Infusion", price: "3500" }
                ]
            },
            {
                name: "Advanced Body Rituals",
                items: [
                    { name: "Silk Touch Body Polishing", price: "4500" },
                    { name: "Botanical Essence Detox", price: "3500" },
                    { name: "Deep Tissue Rejuvenation", price: "4000" }
                ]
            },
            {
                name: "Aesthetic Sciences",
                items: [
                    { name: "LED Cellular Regeneration", price: "2500" },
                    { name: "Non-Invasive Laser Contouring", price: "8000" }
                ]
            }
        ]
    },
    nails: {
        title: "Nail Couture",
        image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=1200",
        categories: [
            {
                name: "Sculpted Extensions",
                items: [
                    { name: "Gel Sculpting (Full Set)", price: "2500" },
                    { name: "Elite Acrylic Extensions", price: "3000" },
                    { name: "Signature Overlay Ritual", price: "1500" }
                ]
            },
            {
                name: "Artisanal Nail Art",
                items: [
                    { name: "Hand-Painted Masterpiece (per nail)", price: "500" },
                    { name: "Minimalist Chrome Finish", price: "300" },
                    { name: "Swarovski™ Bespoke Installation", price: "1000" }
                ]
            }
        ]
    },
    men: {
        title: "The Men's Collective",
        image: "/images/Services-Men-.jpg",
        categories: [
            {
                name: "Architectural Grooming",
                items: [
                    { name: "Master Barber Fade / Sculpture", price: "600" },
                    { name: "Beard Preservation & Design", price: "400" },
                    { name: "The Executive Cut", price: "800" }
                ]
            },
            {
                name: "Men's Skin & Scalp",
                items: [
                    { name: "Deep Cleansing Ritual for Men", price: "2500" },
                    { name: "Scalp Revitalization Therapy", price: "1500" },
                    { name: "Men's Pedicure Ritual", price: "1200" }
                ]
            }
        ]
    },
    bridal: {
        title: "Bridal Couture",
        image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200",
        categories: [
            {
                name: "Heritage Bridal Rituals",
                items: [
                    { name: "Imperial Bridal Make-up", price: "25000" },
                    { name: "Royal by Creative Director", price: "45000" },
                    { name: "Bridal Party Concierge", price: "On Request" }
                ]
            },
            {
                name: "HD & Airbrush Mastery",
                items: [
                    { name: "Cinematic HD Artistry", price: "18000" },
                    { name: "3D Airbrush Finish", price: "22000" }
                ]
            }
        ]
    }
};

export default function Services() {
    const navigate = useNavigate();
    const [openCategory, setOpenCategory] = useState(null);

    const toggleAccordion = (id) => {
        setOpenCategory(openCategory === id ? null : id);
    };

    return (
        <div className="services-v2-root">
            {/* CINEMATIC HERO */}
            <header className="services-v2-hero-visual">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h4>ESTABLISHED 2009</h4>
                    <h1>The Art of <span>Bespoke Beauty</span></h1>
                    <p>Experience the ultimate sanctuary where heritage meets modern luxury. Every ritual is curated to tell <i>your</i> personal story.</p>
                    <button className="hero-cta-btn" onClick={() => navigate("/contact")}>BOOK YOUR RITUAL</button>
                </div>
                {/* Scroll Indicator */}
                <div className="hero-scroll-hint">
                    <span className="line"></span>
                    <span className="text">SCROLL TO DISCOVER</span>
                </div>
            </header>

            {/* BRAND MARQUEE */}
            <div className="brand-strip">
                <div className="marquee-content">
                    <span>L'ORÉAL PROFESSIONNEL</span>
                    <span>OLAPLEX™</span>
                    <span>DYSON HAIR CARE</span>
                    <span>KÉRASTASE PARIS</span>
                    <span>SCHWARZKOPF</span>
                    <span>BALMAIN PARIS</span>
                    <span>L'ORÉAL PROFESSIONNEL</span>
                    <span>OLAPLEX™</span>
                    <span>DYSON HAIR CARE</span>
                    <span>KÉRASTASE PARIS</span>
                    <span>SCHWARZKOPF</span>
                    <span>BALMAIN PARIS</span>
                </div>
            </div>

            {/* SECTIONS */}
            <section className="treatment-block hair-block">
                <div className="section-indicator">EST. 2024 — COLLECTION I</div>
                <div className="content-container">
                    <div className="visual-side">
                        <h2>{treatmentData.hair.title}</h2>
                        <div className="image-wrap">
                            <img src={treatmentData.hair.image} alt="Hair" />
                            <div className="expert-tag">EXPERT</div>
                            <div className="luxe-badge">LUXE CONCIERGE</div>
                        </div>
                    </div>
                    <div className="list-side">
                        {treatmentData.hair.categories.map((cat, i) => (
                            <div className="accordion-item" key={i}>
                                <div className="accordion-header" onClick={() => toggleAccordion(`hair-${i}`)}>
                                    <div className="header-left">
                                        <span className="index">0{i + 1}</span>
                                        <span>{cat.name}</span>
                                    </div>
                                    <span className="icon">{openCategory === `hair-${i}` ? "−" : "+"}</span>
                                </div>
                                <div className={`accordion-body ${openCategory === `hair-${i}` ? "open" : ""}`}>
                                    {cat.items.map((item, idx) => (
                                        <div className="service-sub-item" key={idx}>
                                            <div className="item-details"><b>{item.name}</b></div>
                                            <div className="item-action">
                                                <span className="price">₹{item.price}</span>
                                                <button onClick={() => navigate("/contact")}>BOOK</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="treatment-block skin-block">
                <div className="section-indicator">EST. 2024 — COLLECTION II</div>
                <div className="content-container">
                    <div className="list-side">
                        {treatmentData.skin.categories.map((cat, i) => (
                            <div className="accordion-item" key={i}>
                                <div className="accordion-header" onClick={() => toggleAccordion(`skin-${i}`)}>
                                    <div className="header-left">
                                        <span className="index">0{i + 1}</span>
                                        <span>{cat.name}</span>
                                    </div>
                                    <span className="icon">{openCategory === `skin-${i}` ? "−" : "+"}</span>
                                </div>
                                <div className={`accordion-body ${openCategory === `skin-${i}` ? "open" : ""}`}>
                                    {cat.items.map((item, idx) => (
                                        <div className="service-sub-item" key={idx}>
                                            <div className="item-details"><b>{item.name}</b></div>
                                            <div className="item-action">
                                                <span className="price">₹{item.price}</span>
                                                <button onClick={() => navigate("/contact")}>BOOK</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="visual-side">
                        <h2>{treatmentData.skin.title}</h2>
                        <div className="image-wrap">
                            <img src={treatmentData.skin.image} alt="Skin" />
                            <div className="expert-tag">EXPERT</div>
                            <div className="luxe-badge">LUXE CONCIERGE</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="treatment-block nails-block">
                <div className="section-indicator">EST. 2024 — COLLECTION III</div>
                <div className="content-container">
                    <div className="visual-side">
                        <h2>{treatmentData.nails.title}</h2>
                        <div className="image-wrap">
                            <img src={treatmentData.nails.image} alt="Nails" />
                            <div className="expert-tag">EXPERT</div>
                            <div className="luxe-badge">LUXE CONCIERGE</div>
                        </div>
                    </div>
                    <div className="list-side">
                        {treatmentData.nails.categories.map((cat, i) => (
                            <div className="accordion-item" key={i}>
                                <div className="accordion-header" onClick={() => toggleAccordion(`nails-${i}`)}>
                                    <div className="header-left">
                                        <span className="index">0{i + 1}</span>
                                        <span>{cat.name}</span>
                                    </div>
                                    <span className="icon">{openCategory === `nails-${i}` ? "−" : "+"}</span>
                                </div>
                                <div className={`accordion-body ${openCategory === `nails-${i}` ? "open" : ""}`}>
                                    {cat.items.map((item, idx) => (
                                        <div className="service-sub-item" key={idx}>
                                            <div className="item-details"><b>{item.name}</b></div>
                                            <div className="item-action">
                                                <span className="price">₹{item.price}</span>
                                                <button onClick={() => navigate("/contact")}>BOOK</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="treatment-block men-block">
                <div className="section-indicator">EST. 2024 — COLLECTION IV</div>
                <div className="content-container">
                    <div className="list-side">
                        {treatmentData.men.categories.map((cat, i) => (
                            <div className="accordion-item" key={i}>
                                <div className="accordion-header" onClick={() => toggleAccordion(`men-${i}`)}>
                                    <div className="header-left">
                                        <span className="index">0{i + 1}</span>
                                        <span>{cat.name}</span>
                                    </div>
                                    <span className="icon">{openCategory === `men-${i}` ? "−" : "+"}</span>
                                </div>
                                <div className={`accordion-body ${openCategory === `men-${i}` ? "open" : ""}`}>
                                    {cat.items.map((item, idx) => (
                                        <div className="service-sub-item" key={idx}>
                                            <div className="item-details"><b>{item.name}</b></div>
                                            <div className="item-action">
                                                <span className="price">₹{item.price}</span>
                                                <button onClick={() => navigate("/contact")}>BOOK</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="visual-side">
                        <h2>{treatmentData.men.title}</h2>
                        <div className="image-wrap">
                            <img src={treatmentData.men.image} alt="Men" />
                            <div className="expert-tag">EXPERT</div>
                            <div className="luxe-badge">LUXE CONCIERGE</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="treatment-block bridal-block">
                <div className="section-indicator">EST. 2024 — COLLECTION V</div>
                <div className="content-container">
                    <div className="visual-side">
                        <h2>{treatmentData.bridal.title}</h2>
                        <div className="image-wrap">
                            <img src={treatmentData.bridal.image} alt="Bridal" />
                            <div className="expert-tag">EXPERT</div>
                            <div className="luxe-badge">LUXE CONCIERGE</div>
                        </div>
                    </div>
                    <div className="list-side">
                        {treatmentData.bridal.categories.map((cat, i) => (
                            <div className="accordion-item" key={i}>
                                <div className="accordion-header" onClick={() => toggleAccordion(`bridal-${i}`)}>
                                    <div className="header-left">
                                        <span className="index">0{i + 1}</span>
                                        <span>{cat.name}</span>
                                    </div>
                                    <span className="icon">{openCategory === `bridal-${i}` ? "−" : "+"}</span>
                                </div>
                                <div className={`accordion-body ${openCategory === `bridal-${i}` ? "open" : ""}`}>
                                    {cat.items.map((item, idx) => (
                                        <div className="service-sub-item" key={idx}>
                                            <div className="item-details"><b>{item.name}</b></div>
                                            <div className="item-action">
                                                <span className="price">₹{item.price}</span>
                                                <button onClick={() => navigate("/contact")}>BOOK</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AWARDS & RECOGNITION SECTION */}
            <section className="awards-repro-section">
                <div className="section-indicator">RECOGNITION — EXCELLENCE</div>
                <div className="awards-container">
                    <div className="awards-text">
                        <h4>A LEGACY OF RECOGNITION</h4>
                        <h2>Our <span>Distinctions</span></h2>
                        <p>We are honored to be recognized by industry leaders for our commitment to excellence, innovation, and supreme service quality in the beauty industry.</p>
                    </div>
                    <div className="awards-grid">
                        <div className="award-card highlight">
                            <div className="award-img-wrap">
                                <img src="/images/ppp.png" alt="India 5000 Best MSME Award 2017" />
                            </div>
                            <div className="award-info">
                                <h3>India 5000 Best MSME Award</h3>
                                <p>Nominated for excellence in salon management and service standards in 2017.</p>
                            </div>
                        </div>
                        <div className="award-card">
                            <div className="award-img-wrap">
                                <img src="/images/yyy.png" alt="Lotus Professional Premium Chain Award" />
                            </div>
                            <div className="award-info">
                                <h3>Lotus Professional Award</h3>
                                <p>Recognized as a Premium Chain of Salons for uncompromising quality and artistry.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA FOOTER */}
            <section className="services-v2-footer">
                <div className="footer-content">
                    <h3>Your Journey<span>Begins Here</span></h3>
                    <p>Experience the pinnacle of beauty and wellness with our curated rituals and master artistry.</p>
                    <button className="book-all-btn" onClick={() => navigate("/contact")}>RESERVE YOUR COLLECTION</button>
                </div>
            </section>
        </div>
    );
}
