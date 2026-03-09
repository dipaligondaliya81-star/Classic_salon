const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "auth_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

let useFallback = false;
let dbJson = null;
try {
  dbJson = require("./db-json");
} catch(e) {}

// Helper to check connection
async function checkConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✓ Connected to MySQL database");
    connection.release();
    useFallback = false;
    return true;
  } catch (error) {
    console.error("✗ Failed to connect to MySQL:", error.message);
    if (dbJson) {
      console.log("⚠️ Switching to JSON FALLBACK MODE (Demo Mode)");
      useFallback = true;
      return true; // Return true to allow init to continue
    }
    return false;
  }
}

async function initDb() {
  const isConnected = await checkConnection();
  if (!isConnected) {
    throw new Error("Database connection failed. Is MySQL running?");
  }
  
  if (useFallback) return; // Skip SQL init if in fallback mode

  // Create Users Table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      fullName VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role ENUM('user', 'admin') DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create Categories Table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE
    )
  `);

  // Validate if 'categories' table is empty, seed it
  const [categories] = await pool.query("SELECT COUNT(*) as count FROM categories");
  if (categories[0].count === 0) {
    const defaultCategories = ["Shampoo", "Hair Mask", "Serum", "Treatment", "Face Wash"];
    for (const cat of defaultCategories) {
      await pool.query("INSERT INTO categories (name) VALUES (?)", [cat]);
    }
    console.log("✓ Seeded default categories");
  } else {
    // Ensure 'Face Wash' exists even if other categories are there
    await pool.query("INSERT IGNORE INTO categories (name) VALUES (?)", ["Face Wash"]);
  }

  // Create Products Table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      img VARCHAR(255),
      category_id INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
    )
  `);

  // Create Orders Table (Simple version)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      total DECIMAL(10, 2) NOT NULL,
      items TEXT NOT NULL, 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
  // Create Feedback Table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS feedbacks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(255),
      lastName VARCHAR(255),
      phone VARCHAR(20),
      email VARCHAR(255),
      type VARCHAR(50),
      message TEXT,
      date VARCHAR(100),
      status VARCHAR(50) DEFAULT 'Pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  // Ensure 'status' column exists (migration)
  try {
    const [columns] = await pool.query("SHOW COLUMNS FROM feedbacks LIKE 'status'");
    if (columns.length === 0) {
      await pool.query("ALTER TABLE feedbacks ADD COLUMN status VARCHAR(50) DEFAULT 'Pending' AFTER date");
      console.log("✓ Added status column to feedbacks table");
    }
  } catch (err) {
    console.error("! Feedback migration warning:", err.message);
  }
  // Seed Products if empty
  const [prods] = await pool.query("SELECT COUNT(*) as count FROM products");
  if (prods[0].count === 0) {
    const [catRows] = await pool.query("SELECT id, name FROM categories");
    const catMap = {};
    catRows.forEach(c => catMap[c.name] = c.id);

    const initialProducts = [
      { name: "Gondaliya Signature Glow Face Wash", price: 1250, cat: "Face Wash", img: "facewash1.jpg" },
      { name: "Ultra-Purifying Charcoal Ritual", price: 950, cat: "Face Wash", img: "facewash2.jpg" },
      { name: "Himalayan Rose Infusion Wash", price: 1100, cat: "Face Wash", img: "facewash3.jpg" },
      { name: "Vitamin C Aura Brightening", price: 1400, cat: "Face Wash", img: "facewash4.jpg" },
      { name: "Argan Oil Luxury Shampoo", price: 1800, cat: "Shampoo", img: "shampoo1.jpg" },
      { name: "Deep Repair Keratin Mask", price: 2100, cat: "Hair Mask", img: "mask1.jpg" }
    ];

    for (const p of initialProducts) {
      const cid = catMap[p.cat] || null;
      await pool.query("INSERT INTO products (name, price, img, category_id) VALUES (?, ?, ?, ?)",
        [p.name, p.price, p.img, cid]);
    }
    console.log("✓ Seeded professional boutique products");
  }
}

// User Functions
async function createUser({ fullName, email, username, password, role }) {
  if (useFallback) return dbJson.createUser({ fullName, email, username, password, role });
  try {
    const [res] = await pool.query(
      "INSERT INTO users (fullName, email, username, password, role) VALUES (?, ?, ?, ?, ?)",
      [fullName, email, username, password, role]
    );
    return { id: res.insertId, fullName, email, username, role };
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      const err = new Error('User exists');
      err.code = 'USER_EXISTS';
      throw err;
    }
    throw error;
  }
}

async function findUserByLogin(login) {
  if (useFallback) return dbJson.findUserByLogin(login);
  // Allow login by email or username
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ? OR username = ?",
    [login, login]
  );
  return rows[0];
}

async function getAllUsers() {
  if (useFallback) return dbJson.getAllUsers();
  const [rows] = await pool.query("SELECT id, fullName, email, username, role, created_at FROM users");
  return rows;
}

async function deleteUser(id) {
  if (useFallback) return dbJson.deleteUser(id);
  const [res] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
  return res.affectedRows > 0;
}

function sanitizeUser(user) {
  const { password, ...rest } = user;
  return rest;
}

// Category Functions
async function getCategories() {
  if (useFallback) return dbJson.getCategories();
  const [rows] = await pool.query("SELECT * FROM categories");
  return rows;
}

async function createCategory(name) {
  if (useFallback) return dbJson.createCategory(name);
  const [res] = await pool.query("INSERT INTO categories (name) VALUES (?)", [name]);
  return { id: res.insertId, name };
}

// Product Functions
async function createProduct({ name, price, img, category_id }) {
  if (useFallback) return dbJson.createProduct({ name, price, img, category_id });
  const [res] = await pool.query(
    "INSERT INTO products (name, price, img, category_id) VALUES (?,?,?,?)",
    [name, price, img, category_id]
  );
  return { id: res.insertId, name, price, img, category_id };
}

async function listProducts() {
  if (useFallback) return dbJson.listProducts();
  const [rows] = await pool.query(`
    SELECT p.id, p.name, p.price, p.img, p.category_id, c.name AS category
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    ORDER BY p.id DESC
  `);
  return rows;
}

async function updateProduct(id, { name, price, img, category_id }) {
  if (useFallback) return dbJson.updateProduct(id, { name, price, img, category_id });
  // Dynamic update
  const fields = [];
  const values = [];
  if (name) { fields.push("name = ?"); values.push(name); }
  if (price) { fields.push("price = ?"); values.push(price); }
  if (img) { fields.push("img = ?"); values.push(img); }
  if (category_id) { fields.push("category_id = ?"); values.push(category_id); }

  if (fields.length === 0) return null;

  values.push(id);
  await pool.query(`UPDATE products SET ${fields.join(", ")} WHERE id = ?`, values);
  return { id, name, price, img, category_id };
}

async function deleteProduct(id) {
  if (useFallback) return dbJson.deleteProduct(id);
  const [res] = await pool.query("DELETE FROM products WHERE id = ?", [id]);
  return res.affectedRows > 0;
}

// Order Functions
async function createOrder({ userId, items, total, customer_name, customer_phone, paymentMethod }) {
  if (useFallback) return dbJson.createOrder({ userId, items, total, customer_name, customer_phone, paymentMethod });
  const itemsJson = JSON.stringify(items);
  const [res] = await pool.query(
    "INSERT INTO orders (user_id, total, items) VALUES (?, ?, ?)",
    [userId, total, itemsJson]
  );
  return { id: res.insertId, total };
}

async function listOrders() {
  if (useFallback) return dbJson.listOrders();
  const [rows] = await pool.query(`
    SELECT o.id, o.user_id, o.total, o.items, o.created_at, u.fullName AS customer_name
    FROM orders o
    LEFT JOIN users u ON o.user_id = u.id
    ORDER BY o.created_at DESC
  `);
  return rows;
}

// Feedback Functions
async function createFeedback(data) {
  if (useFallback) return dbJson.createFeedback(data);
  const { firstName, lastName, phone, email, type, date, message } = data;
  const [res] = await pool.query(
    "INSERT INTO feedbacks (firstName, lastName, phone, email, type, date, message) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [firstName, lastName, phone, email, type, date, message]
  );
  return { id: res.insertId, ...data };
  return { id: res.insertId, ...data };
}

async function listFeedbacks() {
  if (useFallback) return dbJson.listFeedbacks();
  const [rows] = await pool.query("SELECT * FROM feedbacks ORDER BY created_at DESC");
  return rows;
}

async function deleteFeedback(id) {
  if (useFallback) return dbJson.deleteFeedback(id);
  const [res] = await pool.query("DELETE FROM feedbacks WHERE id = ?", [id]);
  return res.affectedRows > 0;
}

module.exports = {
  // Core
  initDb,
  pool,
  // User
  createUser,
  findUserByLogin,
  getAllUsers,
  deleteUser,
  sanitizeUser,
  // Product
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  // Category
  getCategories,
  createCategory,
  // Order
  createOrder,
  listOrders,
  // Feedback
  createFeedback,
  listFeedbacks,
  deleteFeedback,
};
