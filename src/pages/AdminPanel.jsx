import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPanel.css";
import { API_BASE_URL, getWhatsAppUrl } from "../apiConfig";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showConcierge, setShowConcierge] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const adminUser = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {
    if (!adminUser) {
      navigate("/admin-login");
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const [catRes, prodRes, feedRes] = await Promise.all([
        fetch(`${API_BASE_URL}/categories`),
        fetch(`${API_BASE_URL}/products`),
        fetch(`${API_BASE_URL}/admin/feedback?userId=${adminUser.id}`)
      ]);

      if (!catRes.ok || !prodRes.ok) throw new Error("Connection Failure");

      const cats = await catRes.json();
      const prods = await prodRes.json();
      const feeds = await feedRes.json();

      setCategories(cats);
      setProducts(prods);
      setFeedbacks(Array.isArray(feeds) ? feeds : []);
    } catch (err) {
      console.error(err);
      if (!silent) setError("COMMUNICATION ERROR: Secure server link unavailable.");
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("CONFIRM REMOVAL: This asset will be permanently purged from the boutique database. Proceed?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: adminUser.id })
      });

      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert("COMMAND REJECTED: Internal database error.");
      }
    } catch (err) {
      console.error(err);
      alert("SYSTEM FAILURE: Asset removal interrupted.");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!name || !price || !categoryId || !imageFile) {
      alert("ATTENTION: Complete all asset metadata (Name, Price, Category, Visual).");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category_id", categoryId);
    formData.append("image", imageFile);

    try {
      const res = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("SUCCESS: New boutique asset synchronized.");
        fetchData();
        setName("");
        setPrice("");
        setCategoryId("");
        setImageFile(null);
      } else {
        const err = await res.json();
        alert(err.message || "SYNC ERROR: Database rejected the entry.");
      }
    } catch (err) {
      console.error(err);
      alert("NETWORK FAILURE: Boutique gateway timed out.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className="admin-master-loader">
      <div className="loader-orbit-box">
        <div className="orbit"></div>
        <p>ESTABLISHING SECURE ADMIN LINK...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="admin-fatal-error">
      <h2>CORE SYSTEM FAILURE</h2>
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>RETRY SECURE CONNECT</button>
    </div>
  );

  return (
    <div className="admin-pro-layout">

      {/* PROFESSIONAL SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <div className="logo-sq">C</div>
          <div className="brand-text">
            <h3>CLASSIC™</h3>
            <span>Admin Suite</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            <span className="nav-icon">🏢</span> EXECUTIVE DASHBOARD
          </button>
          <button className={activeTab === 'inventory' ? 'active' : ''} onClick={() => setActiveTab('inventory')}>
            <span className="nav-icon">📊</span> INVENTORY DATA
          </button>
          <button className={activeTab === 'analytics' ? 'active' : ''} onClick={() => setActiveTab('analytics')}>
            <span className="nav-icon">📈</span> SALES ANALYTICS
          </button>
          <button className={activeTab === 'appointments' ? 'active' : ''} onClick={() => setActiveTab('appointments')}>
            <span className="nav-icon">📅</span> APPOINTMENTS
          </button>
        </nav>

        <div className="sidebar-actions">
          <button className="luxe-concierge-btn" onClick={() => setShowConcierge(true)}>
            <span className="star-icon">✦</span> LUXE CONCIERGE
          </button>
        </div>

        <div className="sidebar-footer">
          <div className="profile-strip">
            <div className="avatar">{adminUser?.fullName?.charAt(0) || "D"}</div>
            <div className="details">
              <b>{adminUser?.fullName || "Boutique Manager"}</b>
              <p>Owner Access Level</p>
            </div>
          </div>
          <button className="pro-logout-btn" onClick={() => { localStorage.removeItem("admin"); navigate("/"); }}>
            PURGE SESSION (LOGOUT)
          </button>
        </div>
      </aside>

      {/* MAIN COMMAND CENTER */}
      <main className="admin-main-content">

        {/* STATS STRIP */}
        <div className="pro-stats-strip">
          {activeTab === 'appointments' ? (
            <>
              <div className="stat-card gold">
                <div className="label">PENDING REQUESTS</div>
                <div className="val">{feedbacks.filter(f => (f.status || 'Pending') === 'Pending').length}</div>
              </div>
              <div className="stat-card">
                <div className="label">CONFIRMED RITUALS</div>
                <div className="val">{feedbacks.filter(f => f.status === 'Confirmed').length}</div>
              </div>
              <div className="stat-card">
                <div className="label">TOTAL LOGS</div>
                <div className="val">{feedbacks.length}</div>
              </div>
            </>
          ) : activeTab === 'dashboard' ? (
            <>
              <div className="stat-card gold">
                <div className="label">MONTHLY FORECAST</div>
                <div className="val">₹{(products.reduce((acc, p) => acc + Number(p.price), 0) * 1.5).toLocaleString()}</div>
              </div>
              <div className="stat-card">
                <div className="label">CLIENT SATISFACTION</div>
                <div className="val">98.4%</div>
              </div>
              <div className="stat-card">
                <div className="label">BOUTIQUE REACH</div>
                <div className="val">1.2K+</div>
              </div>
            </>
          ) : (
            <>
              <div className="stat-card gold">
                <div className="label">TOTAL EQUITY</div>
                <div className="val">₹{products.reduce((acc, p) => acc + Number(p.price), 0).toLocaleString()}</div>
              </div>
              <div className="stat-card">
                <div className="label">ACTIVE ASSETS</div>
                <div className="val">{products.length}</div>
              </div>
              <div className="stat-card">
                <div className="label">CATEGORIES</div>
                <div className="val">{categories.length}</div>
              </div>
            </>
          )}
        </div>

        {activeTab === 'dashboard' && (
          <div className="dashboard-ritual-view animate-fade">
            <div className="view-header">
              <h2>Executive <span>Overview</span></h2>
              <p>State of the Classic Salon boutique and ritual schedule.</p>
            </div>

            <div className="dashboard-grid">
              <div className="db-main-panel">
                <div className="db-chart-placeholder">
                  <div className="chart-header">
                    <h4>Revenue Performance</h4>
                    <span>Real-time tracking</span>
                  </div>
                  <div className="chart-bars">
                    {[60, 85, 45, 95, 70, 100, 80].map((h, i) => (
                      <div key={i} className="bar-wrap">
                        <div className="bar" style={{ height: `${h}%` }}></div>
                        <span className="day">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="recent-rituals-card">
                  <h4>Recent <span>Activity</span></h4>
                  <div className="activity-list">
                    {feedbacks.slice(0, 4).map(f => (
                      <div key={f.id} className="activity-item">
                        <div className="act-dot"></div>
                        <div className="act-details">
                          <b>{f.firstName} {f.lastName}</b>
                          <p>{f.type} - {f.status || 'Pending'}</p>
                        </div>
                        <span className="act-time">{new Date(f.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="db-side-panel">
                <div className="quick-action-card gold">
                  <h4>Admin Insight</h4>
                  <p>You have <b>{feedbacks.filter(f => (f.status || 'Pending') === 'Pending').length} pending</b> rituals to finalize today.</p>
                  <button className="jump-btn" onClick={() => setActiveTab('appointments')}>GO TO APPOINTMENTS</button>
                </div>

                <div className="inventory-summary-card">
                  <h4>Asset Distribution</h4>
                  <div className="cat-usage-list">
                    {categories.slice(0, 5).map(c => (
                      <div key={c.id} className="cat-usage-item">
                        <span>{c.name}</span>
                        <div className="usage-track">
                          <div className="usage-fill" style={{ width: `${Math.random() * 80 + 20}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="stock-alerts-card">
                  <h4>Stock <span>Alerts</span></h4>
                  <div className="alert-item">
                    <div className="alert-info">
                      <b>Elite Serum</b>
                      <span>3 units left</span>
                    </div>
                    <button className="restock-btn" onClick={() => setActiveTab('inventory')}>RESTOCK NOW</button>
                  </div>
                  <div className="alert-item">
                    <div className="alert-info">
                      <b>Olaplex Ritual Kit</b>
                      <span>Low Supply</span>
                    </div>
                    <button className="restock-btn" onClick={() => setActiveTab('inventory')}>RESTOCK NOW</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="inventory-ritual-view animate-fade">
            <div className="view-header">
              <h2>Inventory <span>Control</span></h2>
              <p>Management of elite assets and boutique products.</p>
            </div>
            <div className="inventory-grid">
              <div className="asset-entry-card">
                <h3>Sync New Asset</h3>
                <form className="pro-entry-form" onSubmit={handleAddProduct}>
                  <div className="input-group">
                    <label>ASSET DESIGNATION (NAME)</label>
                    <input placeholder="e.g. Keratin Repair Formula" value={name} onChange={e => setName(e.target.value)} required />
                  </div>
                  <div className="input-row">
                    <div className="input-group">
                      <label>BASE VALUATION (₹)</label>
                      <input placeholder="2500" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
                    </div>
                    <div className="input-group">
                      <label>COLLECTION</label>
                      <select value={categoryId} onChange={e => setCategoryId(e.target.value)} required>
                        <option value="">Select Collection</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="input-group">
                    <label>VISUAL DOCUMENTATION (IMAGE)</label>
                    <div className="file-upload-wrap">
                      <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} required />
                      <span>{imageFile ? imageFile.name : "Select Image from Vault"}</span>
                    </div>
                  </div>
                  <button type="submit" className="pro-sync-btn" disabled={isSubmitting}>
                    {isSubmitting ? "SYNCHRONIZING..." : "UPLOAD TO BOUTIQUE"}
                  </button>
                </form>
              </div>

              <div className="asset-table-card">
                <h3>Live Assets ({products.length})</h3>
                <div className="table-responsive">
                  <table className="pro-asset-table">
                    <thead>
                      <tr>
                        <th>ASSET VISUAL</th>
                        <th>IDENTIFICATION</th>
                        <th>VALUATION</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p.id}>
                          <td>
                            <img
                              src={p.img ? `${API_BASE_URL}/uploads/${p.img}` : "https://via.placeholder.com/50"}
                              alt=""
                              className="table-img"
                            />
                          </td>
                          <td>
                            <div className="asset-id">
                              <b>{p.name}</b>
                              <span>{p.category || "General Boutique"}</span>
                            </div>
                          </td>
                          <td><b className="price-b">₹{p.price}</b></td>
                          <td>
                            <button className="asset-delete-btn" onClick={() => handleDelete(p.id)}>PURGE</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {products.length === 0 && <div className="empty-assets">NO ASSETS REGISTERED IN SYSTEM</div>}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="appointments-ritual-view animate-fade">
            <div className="view-header pro-view-header">
              <div>
                <h2>Client <span>Appointments</span></h2>
                <p>Review and finalize boutique reservations and inquiries. <button className="mini-refresh-btn" onClick={() => fetchData(true)}>↻ SYNC</button></p>
              </div>
              <div className="view-filters">
                <button className={filterStatus === 'All' ? 'active' : ''} onClick={() => setFilterStatus('All')}>ALL</button>
                <button className={filterStatus === 'Pending' ? 'active' : ''} onClick={() => setFilterStatus('Pending')}>PENDING</button>
                <button className={filterStatus === 'Confirmed' ? 'active' : ''} onClick={() => setFilterStatus('Confirmed')}>ACCEPTED</button>
              </div>
            </div>

            <div className="feedback-grid">
              {feedbacks
                .filter(f => filterStatus === 'All' || (f.status || 'Pending').toLowerCase() === filterStatus.toLowerCase())
                .length === 0 ? (
                <div className="empty-assets">NO {filterStatus.toUpperCase()} RECORDS FOUND</div>
              ) : (
                feedbacks
                  .filter(f => filterStatus === 'All' || (f.status || 'Pending').toLowerCase() === filterStatus.toLowerCase())
                  .map(f => (
                    <div key={f.id} className={`feedback-item-card status-${(f.status || 'pending').toLowerCase()}`}>
                      <div className="f-header">
                        <span className="f-type">{f.type || 'Inquiry'}</span>
                        <div className="f-status-badge">{(f.status || 'Pending').toUpperCase()}</div>
                        <span className="f-date">{new Date(f.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="f-client-info">
                        <h3>{f.firstName} {f.lastName}</h3>
                        <div className="f-meta">
                          <span>📞 {f.phone}</span>
                          <span>📧 {f.email || 'No Email'}</span>
                        </div>
                      </div>
                      <div className="f-appointment-details">
                        <div className="f-requested-date"><b>REQUESTED DATE:</b> <span>{f.date || 'TBD'}</span></div>
                        <div className="f-message-box"><p>{f.message}</p></div>
                      </div>
                      <div className="f-actions-row">
                        <div className="f-main-actions">
                          {(f.status || 'Pending') === 'Pending' && (
                            <button className="pro-accept-btn" onClick={async (e) => {
                              const btn = e.currentTarget;
                              btn.disabled = true;
                              btn.innerText = "ACCEPTING...";
                              try {
                                const res = await fetch(`${API_BASE_URL}/admin/feedback/${f.id}`, {
                                  method: 'PUT',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ userId: adminUser.id, status: 'Confirmed' })
                                });
                                if (res.ok) {
                                  // Open WhatsApp to notify client
                                  const notifyMsg = `🌸 *Classic Salon - Appointment Confirmed* 🌸\n\nHello ${f.firstName}!\nWe are happy to confirm your appointment for: \n📅 Date: ${f.date || "TBD"}\n${f.message ? "\n" + f.message : ""}\n\nSee you soon! ✨`;
                                  window.open(`https://wa.me/${f.phone.replace(/\D/g, '')}?text=${encodeURIComponent(notifyMsg)}`, "_blank");

                                  await new Promise(resolve => setTimeout(resolve, 500));
                                  await fetchData(true);
                                  setFilterStatus('Confirmed');
                                } else {
                                  const errData = await res.json().catch(() => ({}));
                                  alert(`System Sync Error: ${errData.message || res.statusText || 'Unknown Error'}. Please retry.`);
                                  btn.disabled = false;
                                  btn.innerText = `✓ ACCEPT ${f.firstName}`;
                                }
                              } catch (err) {
                                console.error(err);
                                btn.disabled = false;
                                btn.innerText = `✓ ACCEPT ${f.firstName}`;
                              }
                            }}>✓ ACCEPT & WHATSAPP</button>
                          )}
                          <select className="status-selector" value={f.status || 'Pending'} onChange={async (e) => {
                            const newStatus = e.target.value;
                            try {
                              const res = await fetch(`${API_BASE_URL}/admin/feedback/${f.id}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ userId: adminUser.id, status: newStatus })
                              });
                              if (res.ok) fetchData();
                            } catch (err) { console.error(err); }
                          }}>
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                        <button className="pro-delete-small-btn" onClick={async () => {
                          if (window.confirm("Purge this record?")) {
                            await fetch(`${API_BASE_URL}/admin/feedback/${f.id}`, {
                              method: 'DELETE',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ userId: adminUser.id })
                            });
                            fetchData();
                          }
                        }}>DELETE RECORD</button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-intelligence-view animate-fade">
            <div className="view-header">
              <h2>Boutique <span>Intelligence</span></h2>
              <p>Advanced metrics and financial performance of Classic Salon.</p>
            </div>
            <div className="analytics-grid">
              <div className="metrics-row">
                <div className="intelligence-card">
                  <div className="card-lbl">INVENTORY VALUATION</div>
                  <div className="card-val">₹{products.reduce((acc, p) => acc + Number(p.price), 0).toLocaleString()}</div>
                  <div className="card-trend up">↑ 12% vs last month</div>
                </div>
                <div className="intelligence-card">
                  <div className="card-lbl">RITUAL CONVERSION</div>
                  <div className="card-val">74.2%</div>
                  <div className="card-trend up">↑ 5.4% efficiency</div>
                </div>
                <div className="intelligence-card">
                  <div className="card-lbl">AVG. SERVICE BASKET</div>
                  <div className="card-val">₹4,850</div>
                  <div className="card-trend down">↓ 2% seasonality</div>
                </div>
              </div>
              <div className="intelligence-main-row">
                <div className="distribution-card">
                  <h4>Category <span>Penetration</span></h4>
                  <div className="pie-chart-sim">
                    {categories.slice(0, 4).map((c, i) => {
                      const count = products.filter(p => p.category_id === c.id).length;
                      const percent = products.length ? (count / products.length) * 100 : 0;
                      return (
                        <div key={i} className="pie-slice-wrap">
                          <div className="slice-info"><span>{c.name}</span><b>{percent.toFixed(1)}%</b></div>
                          <div className="slice-bar-bg"><div className="slice-bar-fill" style={{ width: `${percent}%` }}></div></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="growth-heatmap-card">
                  <h4>Service <span>Growth Matrix</span></h4>
                  <div className="heatmap-grid">
                    {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'].map((m, i) => (
                      <div key={i} className="heat-cell">
                        <div className="cell-sq" style={{ opacity: 0.3 + (Math.random() * 0.7) }}></div>
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                  <div className="heat-legend"><span>Low Demand</span><div className="legend-gradient"></div><span>Peak Ritual</span></div>
                </div>
              </div>
              <div className="insights-footer-row">
                <div className="ai-strategy-card">
                  <span className="strategy-tag">STRATEGIC INSIGHT</span>
                  <p>Based on <b>{feedbacks.length}</b> client interactions, there is a strong preference for <b>Weekend Rituals</b>. Recommend implementing a "Saturday Sunset" premium surcharge or membership tier.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {showConcierge && (
        <div className="concierge-drawer-overlay" onClick={() => setShowConcierge(false)}>
          <div className="concierge-drawer" onClick={e => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>Luxe <span>Concierge</span></h3>
              <button className="close-drawer" onClick={() => setShowConcierge(false)}>×</button>
            </div>
            <div className="drawer-content">
              <div className="ai-insight-bubble">
                <span className="ai-tag">AI ANALYSIS</span>
                <p>Client demand for <b>Bridal Rituals</b> has increased by <b>22%</b> this week. Suggesting promotion of premium skin treatments.</p>
              </div>
              <div className="concierge-checklist">
                <h4>Daily Masterclass</h4>
                <label className="check-item"><input type="checkbox" defaultChecked /> Review premium asset stock</label>
                <label className="check-item"><input type="checkbox" /> Finalize Dipali's VIP schedule</label>
                <label className="check-item"><input type="checkbox" defaultChecked /> Synchronize boutique pricing</label>
              </div>
              <div className="concierge-footer"><p>Classic Admin AI • Active</p></div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
