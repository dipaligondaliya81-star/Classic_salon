// Script to migrate existing database to add role column
// Run: node migrate-db.js

const mysql = require("mysql2/promise");

const {
  DB_HOST = "localhost",
  DB_USER = "root",
  DB_PASSWORD = "",
  DB_NAME = "auth_app",
  DB_PORT = 3306,
} = process.env;

async function migrateDatabase() {
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

    // Check if role column exists
    const [columns] = await connection.query(
      `SHOW COLUMNS FROM users LIKE 'role'`
    );

    if (columns.length > 0) {
      console.log("✓ Role column already exists");
      return;
    }

    console.log("Adding role column to users table...");

    // Add role column
    await connection.query(
      `ALTER TABLE users 
       ADD COLUMN role ENUM('user', 'admin') DEFAULT 'user' 
       AFTER password`
    );

    console.log("✓ Database migration completed successfully!");
    console.log("  - Added 'role' column to users table");
  } catch (error) {
    console.error("Migration error:", error.message);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
}

migrateDatabase()
  .then(() => {
    console.log("\n✓ All migrations completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n✗ Migration failed:", error);
    process.exit(1);
  });
