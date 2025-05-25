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
