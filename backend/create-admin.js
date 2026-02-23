// Script to create first admin user
// Run: node create-admin.js

const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");

const {
  DB_HOST = "localhost",
  DB_USER = "root",
  DB_PASSWORD = "",
  DB_NAME = "auth_app",
  DB_PORT = 3306,
} = process.env;

async function createAdmin() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: Number(DB_PORT),
    });

    console.log("Connected to database");

    // Check if admin already exists
    const [existing] = await connection.query(
      "SELECT id FROM users WHERE email = ? OR username = ?",
      ["admin@gmail.com", "admin"]
    );

    if (existing.length > 0) {
      console.log("Admin user already exists!");
      return;
    }

    // Create admin user
    const password = "admin123";
    const hashedPassword = await bcrypt.hash(password, 10);

    // FIXED: Column name is fullName, not full_name
    await connection.query(
      `INSERT INTO users (fullName, email, username, password, role)
       VALUES (?, ?, ?, ?, ?)`,
      ["Admin User", "admin@gmail.com", "admin", hashedPassword, "admin"]
    );

    console.log("✓ Admin user created successfully!");
    console.log("  Email: admin@gmail.com");
    console.log("  Username: admin");
    console.log("  Password: admin123");
  } catch (error) {
    console.error("Error creating admin:", error.message);
  } finally {
    if (connection) await connection.end();
  }
}

createAdmin();
