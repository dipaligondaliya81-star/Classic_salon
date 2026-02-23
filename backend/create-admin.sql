-- First Admin User Setup
-- Run this SQL in your MySQL client to create the first admin

USE auth_app;

-- Create first admin user (password: admin123)
INSERT INTO users (full_name, email, username, password, role) 
VALUES (
  'Admin User',
  'admin@admin.com',
  'admin',
  '$2a$10$YourHashedPasswordHere',
  'admin'
);

-- Note: You need to hash the password using bcrypt
-- You can use the register endpoint with role='admin' for the first admin
-- Or run this Node.js script to generate hash:
-- const bcrypt = require('bcryptjs');
-- bcrypt.hash('admin123', 10).then(hash => console.log(hash));
