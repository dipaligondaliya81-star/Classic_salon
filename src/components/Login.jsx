import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMsg("Username and password required");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ username }));

    // ✅ Direct user panel
    navigate("/products");
  };
 

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>

        {msg && <p style={{ color: "red" }}>{msg}</p>}

        <form onSubmit={handleLogin}>
          <input
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        <p style={{ marginTop: 15 }}>
          <span
            style={{ color: "#2563eb", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}
