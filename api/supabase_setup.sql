-- PostgreSQL Database Setup for Portfolio (Supabase)

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'ADMIN',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'DRAFT',
    tags TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- HomeContent table
CREATE TABLE IF NOT EXISTS home_content (
    id TEXT PRIMARY KEY DEFAULT 'home',
    hero_title TEXT,
    hero_subtitle TEXT,
    hero_image TEXT,
    cta_primary TEXT,
    cta_secondary TEXT
);

-- AboutContent table
CREATE TABLE IF NOT EXISTS about_content (
    id TEXT PRIMARY KEY DEFAULT 'about',
    bio TEXT,
    years_experience INTEGER,
    projects_completed INTEGER,
    clients INTEGER
);

-- ContactInfo table
CREATE TABLE IF NOT EXISTS contact_info (
    id TEXT PRIMARY KEY DEFAULT 'contact',
    email TEXT,
    phone TEXT,
    social_links JSONB
);

-- SEO table
CREATE TABLE IF NOT EXISTS seo (
    id TEXT PRIMARY KEY,
    page TEXT UNIQUE NOT NULL,
    meta_title TEXT,
    meta_description TEXT
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT DEFAULT 'Zap',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    featured_image TEXT,
    status TEXT DEFAULT 'draft',
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Default Admin User (password: 'admin123')
INSERT INTO users (id, name, email, password_hash) 
VALUES ('admin-1', 'Admin', 'admin@portfolio.pro', '$2y$10$rDL6V2zv7NMyAwMI0rnEMO/.5J5ml5qx3FJPdCNZ5UlAhmAZzBJni')
ON CONFLICT (id) DO NOTHING;

-- Initial Content
INSERT INTO home_content (id, hero_title, hero_subtitle, cta_primary, cta_secondary)
VALUES ('home', 'DESIGNING THE', 'Creative developer and designer specializing in immersive digital experiences.', 'Hire Me', 'Explore Work')
ON CONFLICT (id) DO NOTHING;

INSERT INTO about_content (id, bio, years_experience, projects_completed, clients)
VALUES ('about', 'I am a multidisciplinary designer and developer...', 8, 120, 85)
ON CONFLICT (id) DO NOTHING;

INSERT INTO contact_info (id, email, phone, social_links)
VALUES ('contact', 'hello@portfolio.com', '+1 (555) 000-0000', '{"Twitter": "#", "LinkedIn": "#", "Github": "#"}')
ON CONFLICT (id) DO NOTHING;

-- Seed default services
INSERT INTO services (id, title, description, icon, sort_order) VALUES
('svc_1','Frontend Development','Building blazing-fast, responsive UIs with React, Next.js, and Tailwind CSS — pixel-perfect on every device.','Monitor',1),
('svc_2','Backend Development','Scalable REST APIs, secure authentication, and robust database architecture using Node.js, PHP, and MySQL.','Server',2),
('svc_3','UI/UX Design','End-to-end product design from wireframes to polished prototypes that delight users and drive conversions.','Figma',3),
('svc_4','CMS & Hosting Setup','Custom CMS integrations and cloud deployment so you can manage content without touching a single line of code.','Globe',4),
('svc_5','Website Optimization','Core Web Vitals tuning, SEO audits, and performance profiling for measurable speed improvements.','Zap',5),
('svc_6','AI Integration','Embedding LLMs, recommendation engines, and automation workflows into your existing product stack.','Cpu',6)
ON CONFLICT (id) DO NOTHING;
