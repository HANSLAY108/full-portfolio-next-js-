-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 03, 2026 at 10:14 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hans_portfolio`
--

-- --------------------------------------------------------

--
-- Table structure for table `about_content`
--

CREATE TABLE `about_content` (
  `id` varchar(50) NOT NULL DEFAULT 'about',
  `bio` text DEFAULT NULL,
  `years_experience` int(11) DEFAULT NULL,
  `projects_completed` int(11) DEFAULT NULL,
  `clients` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `about_content`
--

INSERT INTO `about_content` (`id`, `bio`, `years_experience`, `projects_completed`, `clients`) VALUES
('about', 'Multidisciplinary Designer & Developer. I translate complex ideas into elegant digital realities. From visual identity to full-stack execution, I create cohesive products that help brands grow and connect with their audience.', 3, 120, 85);

-- --------------------------------------------------------

--
-- Table structure for table `blog_posts`
--

CREATE TABLE `blog_posts` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `featured_image` varchar(500) DEFAULT NULL,
  `status` enum('draft','published') DEFAULT 'draft',
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog_posts`
--

INSERT INTO `blog_posts` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `status`, `meta_title`, `meta_description`, `created_at`, `updated_at`) VALUES
('blog_69a6a0b654ef9', 'The Digital Decoupling: How Technology Redefined the Modern Workplace', 'the-digital-decoupling-how-technology-redefined-the-modern-workplace', 'In less than a decade, the definition of \"going to work\" has shifted from a physical commute to a digital login. Technology has not just improved our tools; it has fundamentally rewired the architecture of the professional world. Here is how the transformation has unfolded.', '1. Geography is No Longer Destiny\nThe most visible change is the \"untethering\" of the workforce. High-speed connectivity and cloud computing have transformed work into an activity rather than a destination.\nThe Hybrid Revolution: Companies now use Microsoft Teams and Slack to maintain culture across time zones, allowing 74% of organizations to adopt flexible models that prioritize output over \"desk time.\"\nA Global Talent Pool: Businesses are no longer restricted to local hiring. Platforms like Upwork have democratized access to specialized skills, creating a borderless \"gig economy\" where the best person for the job might be halfway across the globe.\n2. From \"Busy Work\" to \"Brain Work\"\nArtificial Intelligence (AI) and automation have stepped in to handle the cognitive heavy lifting of repetitive tasks, allowing humans to focus on strategy and creativity.\nAutomation of Routine: In sectors like finance and logistics, AI handles up to 80% of data entry and customer queries, reducing human error and freeing up staff for high-value problem-solving.\nThe Intelligence Layer: Leaders now use Google Analytics and Big Data to move from \"gut feeling\" decisions to data-backed strategies, predicting market shifts before they happen.\n3. The Rise of the \"Smart\" Environment\nEven the physical office has evolved into a data-driven ecosystem. The \"Internet of Things\" (IoT) has turned buildings into responsive organisms.\nOptimized Space: With tools like deskbird, employees can book \"hot desks\" and sync their office days with teammates, allowing companies to reduce their real estate footprint while maintaining collaboration.\nImmersive Training: Through Meta Quest for Work, high-risk industries like medicine and manufacturing now use VR to train employees in safe, simulated environments, drastically reducing on-the-job accidents.\n4. The New Digital Burden\nDespite the gains, this transformation brings a set of modern stressors that require active management.\nThe \"Always-On\" Trap: The same smartphone that grants flexibility also makes it difficult to \"clock out,\" leading to higher burnout rates.\nSecurity & Literacy: As work goes digital, cybersecurity has become a boardroom priority. Furthermore, the rapid pace of change has created a \"skills gap,\" making lifelong learning a requirement rather than a choice.\n', '/hans_portfolio/uploads/img_69a6a0b1983da.jpg', 'published', '', '', '2026-03-03 08:49:58', '2026-03-03 08:49:58');

-- --------------------------------------------------------

--
-- Table structure for table `contact_info`
--

CREATE TABLE `contact_info` (
  `id` varchar(50) NOT NULL DEFAULT 'contact',
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `social_links` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`social_links`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_info`
--

INSERT INTO `contact_info` (`id`, `email`, `phone`, `social_links`) VALUES
('contact', 'tohhanslay@gmail.com', '+237 683,11,32,16', '{\"Twitter\":\"#\",\"LinkedIn\":\"#\",\"Github\":\"#\"}');

-- --------------------------------------------------------

--
-- Table structure for table `home_content`
--

CREATE TABLE `home_content` (
  `id` varchar(50) NOT NULL DEFAULT 'home',
  `hero_title` varchar(255) DEFAULT NULL,
  `hero_subtitle` text DEFAULT NULL,
  `hero_image` varchar(255) DEFAULT NULL,
  `cta_primary` varchar(255) DEFAULT NULL,
  `cta_secondary` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `home_content`
--

INSERT INTO `home_content` (`id`, `hero_title`, `hero_subtitle`, `hero_image`, `cta_primary`, `cta_secondary`) VALUES
('home', 'DESIGNING THE', 'Creative developer and designer specializing in immersive digital experiences.', '/hans_portfolio/uploads/img_69a69f143289f.png', 'Hire Me', 'Explore Work');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `featured` tinyint(1) DEFAULT 0,
  `status` varchar(50) DEFAULT 'DRAFT',
  `tags` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `seo`
--

CREATE TABLE `seo` (
  `id` varchar(255) NOT NULL,
  `page` varchar(255) NOT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(100) DEFAULT 'Zap',
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `title`, `description`, `icon`, `sort_order`, `created_at`, `updated_at`) VALUES
('svc_1', 'Frontend Development', 'Building blazing-fast, responsive UIs with React, Next.js, and Tailwind CSS — pixel-perfect on every device.', 'Monitor', 1, '2026-03-02 21:01:48', '2026-03-02 21:01:48'),
('svc_2', 'Backend Development', 'Scalable REST APIs, secure authentication, and robust database architecture using Node.js, PHP, and MySQL.', 'Server', 2, '2026-03-02 21:01:48', '2026-03-02 21:01:48'),
('svc_3', 'UI/UX Design', 'End-to-end product design from wireframes to polished prototypes that delight users and drive conversions.', 'Figma', 3, '2026-03-02 21:01:48', '2026-03-02 21:01:48'),
('svc_4', 'CMS & Hosting Setup', 'Custom CMS integrations and cloud deployment so you can manage content without touching a single line of code.', 'Globe', 4, '2026-03-02 21:01:48', '2026-03-02 21:01:48'),
('svc_5', 'Website Optimization', 'Core Web Vitals tuning, SEO audits, and performance profiling for measurable speed improvements.', 'Zap', 5, '2026-03-02 21:01:48', '2026-03-02 21:01:48'),
('svc_6', 'AI Integration', 'Embedding LLMs, recommendation engines, and automation workflows into your existing product stack.', 'Cpu', 6, '2026-03-02 21:01:48', '2026-03-02 21:01:48');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` varchar(50) DEFAULT 'ADMIN',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `role`, `created_at`) VALUES
('admin-1', 'Admin', 'admin@portfolio.pro', '$2y$10$rDL6V2zv7NMyAwMI0rnEMO/.5J5ml5qx3FJPdCNZ5UlAhmAZzBJni', 'ADMIN', '2026-03-02 21:02:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_content`
--
ALTER TABLE `about_content`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `contact_info`
--
ALTER TABLE `contact_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_content`
--
ALTER TABLE `home_content`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seo`
--
ALTER TABLE `seo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `page` (`page`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
