import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // 🔹 Validation
    if (!fullName || !email || !phone || !username || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          username,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registered successfully");
        navigate("/login"); // ✅ back to login
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Register Account</h2>

        {error && <div className="register-error">{error}</div>}

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="register-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
