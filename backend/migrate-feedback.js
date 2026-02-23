const mysql = require("mysql2/promise");

const {
    DB_HOST = "localhost",
    DB_USER = "root",
    DB_PASSWORD = "",
    DB_NAME = "auth_app",
    DB_PORT = 3306,
} = process.env;

async function migrate() {
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

        // Check feedbacks table
        const [rows] = await connection.query("SHOW TABLES LIKE 'feedbacks'");
        if (rows.length === 0) {
            console.log("Creating feedbacks table...");
            await connection.query(`
        CREATE TABLE feedbacks (
          id INT AUTO_INCREMENT PRIMARY KEY,
          firstName VARCHAR(255),
          lastName VARCHAR(255),
          phone VARCHAR(20),
          email VARCHAR(255),
          type VARCHAR(50),
          message TEXT,
          date VARCHAR(100),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
            console.log("✓ Feedbacks table created");
        } else {
            console.log("Feedbacks table already exists");
        }

    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        if (connection) await connection.end();
    }
}

migrate();
