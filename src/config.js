const PROD_URL = "https://classic-salon-backend.vercel.app";

export const API_BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : PROD_URL;
