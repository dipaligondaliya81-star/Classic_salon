import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import "./Auth.css";

export default function Auth() {
    const navigate = useNavigate();

    // Login States
    const [loginUser, setLoginUser] = useState("");
    const [loginPass, setLoginPass] = useState("");
    const [loginMsg, setLoginMsg] = useState("");

    // Register States
    const [regEmail, setRegEmail] = useState("");
    const [regPass, setRegPass] = useState("");
    const [regFullName, setRegFullName] = useState("");
    const [regPhone, setRegPhone] = useState("");
    const [regUser, setRegUser] = useState("");
    const [regError, setRegError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginMsg("");
        if (!loginUser || !loginPass) {
            setLoginMsg("Username and password required");
            return;
        }

        try {
            setLoading(true);
            const res = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: loginUser,
                    password: loginPass,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/products");
            } else {
                setLoginMsg(data.message || "Invalid credentials");
            }
        } catch (err) {
            setLoginMsg("Server communication failed");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegError("");
        if (!regEmail || !regPass || !regFullName || !regPhone || !regUser) {
            setRegError("All fields are required");
            return;
        }

        try {
            setLoading(true);
            const res = await fetch(`${API_BASE_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: regFullName,
                    email: regEmail,
                    phone: regPhone,
                    username: regUser,
                    password: regPass,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                // Auto login after register
                localStorage.setItem("user", JSON.stringify({ username: regUser }));
                navigate("/products");
            } else {
                setRegError(data.message || "Registration failed");
            }
        } catch (err) {
            setRegError("Server error");
        } finally {
            setLoading(false);
        }
    };

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        return (
            <div className="auth-portal-active">
                <div className="portal-card">
                    <h1>Welcome, <span>{user.username}</span></h1>
                    <p>You are part of our elite circle. Head to the boutique to explore rituals.</p>
                    <div className="portal-actions">
                        <button onClick={() => navigate("/products")}>SHOP PRODUCTS</button>
                        <button className="logout" onClick={() => { localStorage.removeItem("user"); window.location.reload(); }}>LOGOUT</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-proper-page">
            <div className="auth-proper-grid">

                {/* LOGIN COLUMN */}
                <div className="auth-proper-col">
                    <h2 className="auth-proper-title">Login</h2>
                    <div className="auth-proper-card">
                        <form onSubmit={handleLogin}>
                            <div className="proper-input-group">
                                <label>Username or email address <span>*</span></label>
                                <input
                                    type="text"
                                    value={loginUser}
                                    onChange={(e) => setLoginUser(e.target.value)}
                                />
                            </div>
                            <div className="proper-input-group">
                                <label>Password <span>*</span></label>
                                <input
                                    type="password"
                                    value={loginPass}
                                    onChange={(e) => setLoginPass(e.target.value)}
                                />
                            </div>
                            {loginMsg && <p className="proper-err">{loginMsg}</p>}

                            <div className="proper-form-footer">
                                <button type="submit" className="proper-auth-btn">LOG IN</button>
                                <label className="proper-checkbox">
                                    <input type="checkbox" /> Remember me
                                </label>
                            </div>
                            <a href="#" className="proper-lost-link">Lost your password?</a>
                        </form>
                    </div>
                </div>

                {/* REGISTER COLUMN */}
                <div className="auth-proper-col">
                    <h2 className="auth-proper-title">Register</h2>
                    <div className="auth-proper-card">
                        <form onSubmit={handleRegister}>
                            <div className="proper-input-group">
                                <label>Email address <span>*</span></label>
                                <input
                                    type="email"
                                    value={regEmail}
                                    onChange={(e) => setRegEmail(e.target.value)}
                                />
                            </div>
                            <div className="proper-input-group">
                                <label>Password <span>*</span></label>
                                <input
                                    type="password"
                                    value={regPass}
                                    onChange={(e) => setRegPass(e.target.value)}
                                />
                            </div>

                            <p className="proper-privacy-note">
                                Your personal data will be used to support your experience throughout this website,
                                to manage access to your account, and for other purposes described in our privacy policy.
                            </p>

                            {regError && <p className="proper-err">{regError}</p>}

                            <button type="submit" className="proper-auth-btn" disabled={loading}>
                                {loading ? "REGISTERING..." : "REGISTER"}
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}
