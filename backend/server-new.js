const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

console.log("Loading database module...");
const { initDb } = require("./db");
console.log("Database module loaded");

const PORT = 5000;
const app = express();

console.log("Setting up middleware...");
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

console.log("Starting server...");
const server = app.listen(PORT, "127.0.0.1", () => {
  console.log(`✓ Server listening on http://127.0.0.1:${PORT}`);
  
  // Initialize database in background (don't wait for it)
  console.log("Initializing database in background...");
  initDb()
    .then(() => {
      console.log("✓ Database initialized");
    })
    .catch((error) => {
      console.error("✗ Database error:", error.message);
    });
});

server.on("error", (error) => {
  console.error("✗ Server error:", error);
  process.exit(1);
});
