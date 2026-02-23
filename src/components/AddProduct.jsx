import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import "./AddProduct.css";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  /* 🔹 LOAD COLLECTIONS */
  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        // Ensure "Face Wash" is always present for the user and sorted
        setCategories(data);
      });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmitRitual = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!name || !price || !image || !categoryId) {
      setFormError("ATTENTION: All institutional metadata is required.");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("image", image);
      formData.append("category_id", categoryId);

      const res = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("SUCCESS: New Ritual synchronized with Boutique Catalog.");
        navigate("/products");
      } else {
        const data = await res.json();
        setFormError(data.message || "SYNC ERROR: Command rejected by Vault.");
      }
    } catch {
      setFormError("FATAL ERROR: Vault communication failure.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="luxe-add-wrapper animate-fade-in">
      <div className="institutional-header">
        <h1>ASSET<span>SYNCHRONIZATION</span></h1>
        <p>Command interface for adding new professional rituals to the boutique.</p>
      </div>

      <div className="add-ritual-grid">

        {/* PREVIEW BLOCK */}
        <div className="visual-documentation">
          <h3>VISUAL DOCUMENTATION</h3>
          <div className="preview-frame">
            {preview ? (
              <img src={preview} alt="Asset Preview" />
            ) : (
              <div className="empty-preview">
                <span>AWAITING ASSET VISUAL</span>
              </div>
            )}
          </div>
          <div className="upload-btn-wrapper">
            <button className="fake-upload-btn">SELECT FROM VAULT</button>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
        </div>

        {/* METADATA BLOCK */}
        <div className="metadata-ledger">
          <h3>ASSET METADATA</h3>
          <form onSubmit={handleSubmitRitual}>
            <div className="pro-field">
              <label>PRODUCT IDENTIFICATION (NAME)</label>
              <input
                placeholder="e.g. Signature Glow Face Wash"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="pro-row">
              <div className="pro-field">
                <label>VALUATION (₹)</label>
                <input
                  type="number"
                  placeholder="2450"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
              <div className="pro-field">
                <label>COLLECTION LEDGER</label>
                <select value={categoryId} onChange={e => setCategoryId(e.target.value)}>
                  <option value="">Select Collection</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {formError && <div className="pro-error-msg">⚠ {formError}</div>}

            <button type="submit" className="pro-sync-btn" disabled={isSubmitting}>
              {isSubmitting ? "SYNCHRONIZING..." : "UPLOAD TO BOUTIQUE"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
