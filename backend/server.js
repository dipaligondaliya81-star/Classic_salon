const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const path = require("path");
const multer = require("multer");

const {
  initDb,
  createUser,
  findUserByLogin,
  createProduct,
  listProducts,
  sanitizeUser,
  getAllUsers,
  deleteUser,
  updateProduct,
  deleteProduct,
  createOrder,
  createFeedback,
  listFeedbacks,
  deleteFeedback,
  getCategories,
} = require("./db");

const PORT = 5000;
const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= MULTER (IMAGE UPLOAD) ================= */
// Ensure uploads directory exists
const fs = require('fs');
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads/");
  },
  filename: (_, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

/* ================= HEALTH ================= */
app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

/* ================= AUTH ================= */

app.post("/register", async (req, res) => {
  const { fullName, email, username, password, role = "user" } = req.body || {};

  if (!fullName || !email || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
      fullName,
      email,
      username,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "Registered successfully",
      user,
    });
  } catch (error) {
    if (error.code === "USER_EXISTS") {
      return res.status(409).json({
        message: "Email or username already in use",
      });
    }
    console.error("Register error", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userRecord = await findUserByLogin(username);

    if (!userRecord) {
      return res.status(401).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, userRecord.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({ user: sanitizeUser(userRecord) });
  } catch (error) {
    console.error("Login error", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= CATEGORIES ================= */

app.get("/categories", async (_req, res) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (error) {
    console.error("Fetch categories error", error);
    res.status(500).json({ message: "Failed to load categories" });
  }
});

/* ================= PRODUCTS ================= */

// 🔹 GET products (with category name)
app.get("/products", async (_req, res) => {
  try {
    const products = await listProducts(); // JOIN inside db.js
    res.json(products);
  } catch (error) {
    console.error("Fetch products error", error);
    res.status(500).json({ message: "Failed to load products" });
  }
});

// 🔹 ADD product (IMAGE + CATEGORY)
app.post("/products", upload.single("image"), async (req, res) => {
  const { name, price, category_id } = req.body;
  const img = req.file?.filename;

  if (!name || !price || !img || !category_id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const numericPrice = Number(price);
  if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
    return res.status(400).json({ message: "Price must be a positive number" });
  }

  try {
    const product = await createProduct({
      name,
      price: numericPrice,
      img,
      category_id,
    });

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Create product error", error);
    res.status(500).json({ message: "Failed to add product" });
  }
});

/* ================= BUY / ORDERS ================= */

app.post("/orders", async (req, res) => {
  const { userId, items, total } = req.body || {};

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  try {
    const order = await createOrder({
      userId,
      items,
      total,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Order error", error);
    res.status(500).json({ message: "Failed to place order" });
  }
});

/* ================= ADMIN ================= */

app.get("/admin/users", async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Fetch users error", error);
    res.status(500).json({ message: "Failed to load users" });
  }
});

app.put("/admin/products/:id", async (req, res) => {
  const { userId, name, price, img, category_id } = req.body;
  const productId = req.params.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const product = await updateProduct(productId, {
      name,
      price,
      img,
      category_id,
    });

    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Update product error", error);
    res.status(500).json({ message: "Failed to update product" });
  }
});

app.delete("/admin/products/:id", async (req, res) => {
  const { userId } = req.body;
  const productId = req.params.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const deleted = await deleteProduct(productId);
    if (deleted) {
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Delete product error", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

/* ================= EMAIL CONFIG ================= */
const nodemailer = require("nodemailer");

// NOTE: The salon owner needs to set their REAL credentials here
// or use environment variables for security.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "classicsalon@gmail.com", // 👈 Salon Owner Email
    pass: "YOUR_APP_PASSWORD"       // 👈 Gmail App Password
  }
});

const sendNotificationEmail = async (data) => {
  const isAppointment = data.type === "Appointment";
  const subject = isAppointment
    ? `🚨 NEW APPOINTMENT REQUEST: ${data.firstName}`
    : `📩 New Customer Feedback: ${data.firstName}`;

  const mailOptions = {
    from: '"Classic Salon System" <classicsalon@gmail.com>',
    to: "classicsalon@gmail.com", // Send to OWNER
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; border: 1px solid #eee; padding: 20px; max-width: 600px;">
        <h2 style="color: #a47c48; border-bottom: 2px solid #f2ede4; padding-bottom: 10px;">
          ${isAppointment ? 'Appointment Request' : 'Customer Feedback'}
        </h2>
        <p><b>Client Name:</b> ${data.firstName} ${data.lastName || ''}</p>
        <p><b>Phone:</b> ${data.phone}</p>
        <p><b>Email:</b> ${data.email || 'Not provided'}</p>
        <p><b>Date Requested:</b> ${data.date || 'N/A'}</p>
        <p><b>Message:</b></p>
        <div style="background: #fdfaf7; padding: 15px; border-radius: 5px;">
          ${data.message}
        </div>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #888;">This is an automated notification from your Classic Salon Boutique system.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✓ Email notification sent for: ${data.firstName}`);
  } catch (err) {
    console.error("✗ Mail send error (Likely credentials missing):", err.message);
    // We don't crash the server if mail fails, but we log it.
  }
};

/* ================= FEEDBACK ================= */
app.post("/feedback", async (req, res) => {
  const { firstName, lastName, phone, email, type, date, message } = req.body;

  try {
    const feedback = await createFeedback({
      firstName, lastName, phone, email, type, date, message
    });

    // 🚀 TRIGGER EMAIL NOTIFICATION
    sendNotificationEmail({ firstName, lastName, phone, email, type, date, message });

    res.status(201).json({ message: "Feedback sent!", feedback });
  } catch (error) {
    console.error("Feedback error", error);
    res.status(500).json({ message: "Failed to send feedback" });
  }
});

app.get("/admin/feedback", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });
  try {
    const feedbacks = await listFeedbacks();
    res.json(feedbacks);
  } catch (error) {
    console.error("Fetch feedbacks error", error);
    res.status(500).json({ message: "Failed to load feedbacks" });
  }
});

app.put("/admin/feedback/:id", async (req, res) => {
  const { userId, status } = req.body;
  const feedbackId = req.params.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });
  try {
    const { pool } = require("./db");
    const [result] = await pool.query("UPDATE feedbacks SET status = ? WHERE id = ?", [status, feedbackId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No record found with that ID" });
    }
    res.json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Update feedback error DETAILS:", error);
    res.status(500).json({ message: `Database error: ${error.message}` });
  }
});

app.delete("/admin/feedback/:id", async (req, res) => {
  const { userId } = req.body;
  const feedbackId = req.params.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });
  try {
    const deleted = await deleteFeedback(feedbackId);
    if (deleted) {
      res.json({ message: "Record deleted successfully" });
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    console.error("Delete feedback error", error);
    res.status(500).json({ message: "Failed to delete record" });
  }
});

/* ================= ERROR ================= */

app.use((err, _req, res, _next) => {
  console.error("Unexpected error", err);
  res.status(500).json({ message: "Unexpected server error" });
});

/* ================= START SERVER ================= */

const server = app.listen(PORT, () => {
  console.log(`✓ Server listening on http://localhost:${PORT}`);

  initDb()
    .then(() => {
      console.log("✓ Database initialized successfully");
    })
    .catch((error) => {
      console.error("✗ Database initialization error:", error.message);
    });
});

server.on("error", (error) => {
  console.error("✗ Server error:", error.message);
  process.exit(1);
});
