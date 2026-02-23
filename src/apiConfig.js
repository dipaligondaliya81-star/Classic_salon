const PROD_URL = "https://classic-salon-backend.vercel.app";

export const API_BASE_URL = window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : PROD_URL;

export const WHATSAPP_NUMBER = "919737671768";

export const getWhatsAppUrl = (msg) => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};
