import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "../pages/Page.css";

const images = [
  "/images/slide1.jpg",
  "/images/slide2.jpg",
  "/images/slide3.jpg",
];

export default function BackgroundLayout() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="page-bg"
      style={{ backgroundImage: `url(${images[index]})` }}
    >
      <div className="overlay"></div>

      {/* 🔥 WITHOUT Outlet PAGE WILL BE BLANK */}
      <Outlet />
    </div>
  );
}
