const express = require("express");
const cors = require("cors");

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

// Simple health check
app.get("/health", (req, res) => {
  console.log("Health check requested");
  res.json({ status: "ok", timestamp: new Date() });
});

// Start server
const server = app.listen(PORT, "127.0.0.1", () => {
  console.log(`✓ Server started on port ${PORT}`);
  console.log(`✓ Visit: http://127.0.0.1:${PORT}/health`);
});

server.on("error", (error) => {
  console.error("✗ Server error:", error.message);
  process.exit(1);
});
