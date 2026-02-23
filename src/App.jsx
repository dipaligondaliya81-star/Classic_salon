import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/AdminLogin";
import Services from "./pages/Services";
import Account from "./pages/Account";

import Welcome from "./components/Welcome";
import Auth from "./components/Auth";
import Bill from "./components/Bill";
import ProductDetail from "./components/ProductDetail";

// Advanced Global Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Concierge from "./components/Concierge";
import BeautyAI from "./components/BeautyAI";

export default function App() {
  const [scrollWidth, setScrollWidth] = useState(0);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Scroll Progress Logic
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollProgress = (totalScroll / windowHeight) * 100;
      setScrollWidth(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Global Cart Logic
  const addToCart = (p) => {
    setCart(prev => {
      const found = prev.find(i => i.id === p.id);
      if (found) {
        const updated = prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
        return updated;
      }
      return [...prev, { ...p, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  return (
    <div className="luxury-app-main">
      {/* PROFESSIONAL SCROLL PROGRESS */}
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" style={{ width: `${scrollWidth}%` }}></div>
      </div>

      <Navbar />

      <main className="content-area">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/products"
            element={<Welcome cart={cart} setCart={setCart} isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} addToCart={addToCart} />}
          />
          <Route
            path="/product/:id"
            element={<ProductDetail addToCart={addToCart} />}
          />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/account" element={<Account />} />
          <Route path="/bill" element={<Bill />} />

          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>

      {/* High-End Global Footer */}
      <Footer />
    </div>
  );
}
