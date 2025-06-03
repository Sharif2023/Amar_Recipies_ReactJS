CREATE DATABASE Amar_Recipe;

CREATE TABLE recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255) DEFAULT NULL,
    location VARCHAR(255) NOT NULL,
    organizerName VARCHAR(255) NOT NULL,
    organizerEmail VARCHAR(255) NOT NULL,
    organizerAddress VARCHAR(255) NOT NULL,
    source VARCHAR(100),
    tags VARCHAR(255),
    reference VARCHAR(255),
    tutorialVideo VARCHAR(255),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE submission_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  description TEXT,
  image VARCHAR(255),
  location VARCHAR(255),
  organizerName VARCHAR(255),
  organizerEmail VARCHAR(255),
  organizerAddress VARCHAR(255),
  status VARCHAR(50),
  tags TEXT,
  reference VARCHAR(255),
  tutorialVideo VARCHAR(255),
  comment TEXT,
  source VARCHAR(100),
  submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(100),
  date DATETIME,
  area VARCHAR(100),
  city VARCHAR(100),
  state VARCHAR(100),
  postcode VARCHAR(20),
  experience INT,
  specialty VARCHAR(100),
  portfolio TEXT,
  certification TEXT,
  password VARCHAR(255),
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  comment TEXT
);

