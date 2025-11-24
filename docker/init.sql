-- Create database if not exists
CREATE DATABASE IF NOT EXISTS approvalservice CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE approvalservice;

-- Optional: Add initial tables or data here
-- Example:
-- CREATE TABLE IF NOT EXISTS users (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   username VARCHAR(255) NOT NULL,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- Grant privileges
GRANT ALL PRIVILEGES ON approvalservice.* TO 'root'@'%';
FLUSH PRIVILEGES;
