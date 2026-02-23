import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("All fields required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      if (!res.ok) {
        alert("Server not responding");
        return;
      }

      const data = await res.json();

      if (data.user.role !== "admin") {
        alert("Not an admin account");
        return;
      }

      // save admin session
      localStorage.setItem("admin", JSON.stringify(data.user));

      navigate("/admin");

    } catch (error) {
      console.log(error);
      alert("Server not responding");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)"
    }}>
      <form onSubmit={handleLogin}
        style={{
          background: "#111",
          padding: "40px",
          borderRadius: "12px",
          width: "350px"
        }}
      >
        <h2 style={{ color: "white", textAlign: "center" }}>
          Admin Login
        </h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "20px",
            borderRadius: "6px"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
            borderRadius: "6px"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "12px",
            background: "crimson",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
