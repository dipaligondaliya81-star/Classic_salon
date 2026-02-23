import { Link } from "react-router-dom";
import "./Pages.css";

export default function Orders() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="user-panel">
      <aside className="sidebar">
        <h3>User Panel</h3>

        <Link to="/orders">My Orders</Link>
        <Link to="/profile">My Profile</Link>
        <Link to="/products">Products</Link>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </aside>

      <main className="content">
        <h2>Hello, {user?.name}</h2>

        <table>
          <thead>
            <tr>
              <th>Order No</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Bill</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#1001</td>
              <td>06-02-2026</td>
              <td>₹1450</td>
              <td>Delivered</td>
              <td><Link to="/bill">View</Link></td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
}
