import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import { API_BASE_URL } from "../config";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", price: "", img: "" });

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      navigate("/");
      return;
    }

    const parsed = JSON.parse(stored);
    if (parsed.role !== "admin") {
      alert("Admin access required");
      navigate("/welcome");
      return;
    }

    setUser(parsed);
  }, [navigate]);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    if (!user) return;

    if (activeTab === "users") fetchUsers();
    if (activeTab === "products") fetchProducts();
  }, [user, activeTab]);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/admin/users?userId=${user.id}`);
      const data = await res.json();
      res.ok ? setUsers(data) : setError(data.message);
    } catch {
      setError("Server not responding");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
      const data = await res.json();
      res.ok ? setProducts(data) : setError(data.message);
    } catch {
      setError("Server not responding");
    } finally {
      setLoading(false);
    }
  };

  /* ================= USER DELETE ================= */
  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;
    await fetch(`${API_BASE_URL}/admin/users/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id }),
    });
    fetchUsers();
  };

  /* ================= PRODUCT EDIT ================= */
  const startEdit = (p) => {
    setEditingProduct(p.id);
    setEditForm({ name: p.name, price: p.price, img: p.img });
  };

  const updateProduct = async (id) => {
    await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editForm, userId: user.id }),
    });
    setEditingProduct(null);
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id }),
    });
    fetchProducts();
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="admin-page">
      {/* HEADER */}
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <div>
          <button className="btn-user" onClick={() => navigate("/welcome")}>
            User View
          </button>
          <button className="btn-logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="admin-tabs">
        <button onClick={() => setActiveTab("users")} className={activeTab==="users"?"active":""}>Users</button>
        <button onClick={() => setActiveTab("products")} className={activeTab==="products"?"active":""}>Products</button>
        <button onClick={() => setActiveTab("stats")} className={activeTab==="stats"?"active":""}>Stats</button>
      </div>

      {/* CONTENT */}
      <div className="admin-content">
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        {/* USERS */}
        {activeTab==="users" && (
          <table>
            <thead>
              <tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th></th></tr>
            </thead>
            <tbody>
              {users.map(u=>(
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    {u.id!==user.id && (
                      <button className="btn-delete" onClick={()=>deleteUser(u.id)}>Delete</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* PRODUCTS */}
        {activeTab==="products" && (
          <table>
            <thead>
              <tr><th>ID</th><th>Image</th><th>Name</th><th>Price</th><th></th></tr>
            </thead>
            <tbody>
              {products.map(p=>(
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td><img src={p.img} className="thumb" /></td>
                  <td>
                    {editingProduct===p.id
                      ? <input value={editForm.name} onChange={e=>setEditForm({...editForm,name:e.target.value})}/>
                      : p.name}
                  </td>
                  <td>
                    {editingProduct===p.id
                      ? <input value={editForm.price} onChange={e=>setEditForm({...editForm,price:e.target.value})}/>
                      : `₹${p.price}`}
                  </td>
                  <td>
                    {editingProduct===p.id ? (
                      <>
                        <button className="btn-save" onClick={()=>updateProduct(p.id)}>Save</button>
                        <button onClick={()=>setEditingProduct(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button className="btn-edit" onClick={()=>startEdit(p)}>Edit</button>
                        <button className="btn-delete" onClick={()=>deleteProduct(p.id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* STATS */}
        {activeTab==="stats" && (
          <div className="stats">
            <div>Total Users: {users.length}</div>
            <div>Total Products: {products.length}</div>
          </div>
        )}
      </div>
    </div>
  );
}
