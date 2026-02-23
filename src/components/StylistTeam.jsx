import "./StylistTeam.css";

const stylists = [
    {
        name: "Elara Vance",
        role: "Creative Director & Color Specialist",
        img: "https://images.unsplash.com/photo-1594744803329-a584af1cb51e?auto=format&fit=crop&w=600&q=80",
        bio: "With over 12 years in London's fashion scene, Elara brings avant-garde coloring techniques to Rajkot."
    },
    {
        name: "Sophia Chen",
        role: "Senior Skin Aesthetician",
        img: "https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=600&q=80",
        bio: "Specializing in Russian Botox and advanced hydra-facials, Sophia ensures your skin reflects pure luxury."
    },
    {
        name: "Marco Rossi",
        role: "Master Hair Sculptor",
        img: "https://images.unsplash.com/photo-1622286332618-f2802b9c56ca?auto=format&fit=crop&w=600&q=80",
        bio: "The king of precision cuts. Marco's transformational styling has been featured in international magazines."
    }
];

export default function StylistTeam() {
    return (
        <section className="stylist-section">
            <div className="section-header">
                <h4>THE ARTISTS</h4>
                <h2>Meet Our <span>Artistic Team</span></h2>
                <div className="gold-dash"></div>
            </div>

            <div className="stylist-grid">
                {stylists.map((stylist, index) => (
                    <div className="stylist-card" key={index}>
                        <div className="stylist-img-wrap">
                            <img src={stylist.img} alt={stylist.name} />
                            <div className="stylist-overlay">
                                <p>{stylist.bio}</p>
                                <div className="social-links">
                                    <span>Instagram</span> • <span>Portfolio</span>
                                </div>
                            </div>
                        </div>
                        <div className="stylist-info">
                            <h3>{stylist.name}</h3>
                            <p className="stylist-role">{stylist.role}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="stylist-cta">
                <p>Want a consultation with a specific expert?</p>
                <button className="book-stylist-btn">REQUEST SPECIALIST</button>
            </div>
        </section>
    );
}
