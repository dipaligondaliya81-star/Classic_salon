import { Link } from "react-router-dom";
import "./Pages.css";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="user-panel">
      <aside className="sidebar">
        <Link to="/orders">My Orders</Link>
        <Link to="/profile">My Profile</Link>
        <Link to="/products">Products</Link>
      </aside>

      <main className="content">
        <h2>My Profile</h2>
        <p><b>Name:</b> {user?.name}</p>
        <p><b>Username:</b> {user?.username}</p>
      </main>
    </div>
  );
}
