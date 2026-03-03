-- Database Setup for PortfolioPro
CREATE DATABASE IF NOT EXISTS hans_portfolio;
USE hans_portfolio;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'ADMIN',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'DRAFT',
    tags TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- HomeContent table
CREATE TABLE IF NOT EXISTS home_content (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'home',
    hero_title VARCHAR(255),
    hero_subtitle TEXT,
    hero_image VARCHAR(255),
    cta_primary VARCHAR(255),
    cta_secondary VARCHAR(255)
);

-- AboutContent table
CREATE TABLE IF NOT EXISTS about_content (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'about',
    bio TEXT,
    years_experience INT,
    projects_completed INT,
    clients INT
);

-- ContactInfo table
CREATE TABLE IF NOT EXISTS contact_info (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'contact',
    email VARCHAR(255),
    phone VARCHAR(255),
    social_links JSON
);

-- SEO table
CREATE TABLE IF NOT EXISTS seo (
    id VARCHAR(255) PRIMARY KEY,
    page VARCHAR(255) UNIQUE NOT NULL,
    meta_title VARCHAR(255),
    meta_description TEXT
);

-- Default Admin User (password: 'admin123')
REPLACE INTO users (id, name, email, password_hash) 
VALUES ('admin-1', 'Admin', 'admin@portfolio.pro', '$2y$10$rDL6V2zv7NMyAwMI0rnEMO/.5J5ml5qx3FJPdCNZ5UlAhmAZzBJni');

-- Initial Content
INSERT IGNORE INTO home_content (id, hero_title, hero_subtitle, cta_primary, cta_secondary)
VALUES ('home', 'DESIGNING THE', 'Creative developer and designer specializing in immersive digital experiences.', 'Hire Me', 'Explore Work');

INSERT IGNORE INTO about_content (id, bio, years_experience, projects_completed, clients)
VALUES ('about', 'I am a multidisciplinary designer and developer...', 8, 120, 85);

INSERT IGNORE INTO contact_info (id, email, phone, social_links)
VALUES ('contact', 'hello@portfolio.com', '+1 (555) 000-0000', '{"Twitter": "#", "LinkedIn": "#", "Github": "#"}');

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100) DEFAULT 'Zap',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content LONGTEXT,
    featured_image VARCHAR(500),
    status ENUM('draft','published') DEFAULT 'draft',
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seed default services
INSERT IGNORE INTO services (id, title, description, icon, sort_order) VALUES
('svc_1','Frontend Development','Building blazing-fast, responsive UIs with React, Next.js, and Tailwind CSS — pixel-perfect on every device.','Monitor',1),
('svc_2','Backend Development','Scalable REST APIs, secure authentication, and robust database architecture using Node.js, PHP, and MySQL.','Server',2),
('svc_3','UI/UX Design','End-to-end product design from wireframes to polished prototypes that delight users and drive conversions.','Figma',3),
('svc_4','CMS & Hosting Setup','Custom CMS integrations and cloud deployment so you can manage content without touching a single line of code.','Globe',4),
('svc_5','Website Optimization','Core Web Vitals tuning, SEO audits, and performance profiling for measurable speed improvements.','Zap',5),
('svc_6','AI Integration','Embedding LLMs, recommendation engines, and automation workflows into your existing product stack.','Cpu',6);
