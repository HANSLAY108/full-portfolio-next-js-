<?php
require_once '../lib/db.php';
verifyToken();

$data = json_decode(file_get_contents("php://input"), true);
$type = isset($_GET['type']) ? $_GET['type'] : '';

if (!$data) {
    jsonResponse(['error' => 'Invalid input'], 400);
}

switch ($type) {
    case 'home':
        $stmt = $pdo->prepare("REPLACE INTO home_content (id, hero_title, hero_subtitle, hero_image, cta_primary, cta_secondary) VALUES ('home', ?, ?, ?, ?, ?)");
        $stmt->execute([$data['heroTitle'], $data['heroSubtitle'], $data['heroImage'], $data['ctaPrimary'], $data['ctaSecondary']]);
        break;
        
    case 'about':
        $stmt = $pdo->prepare("REPLACE INTO about_content (id, bio, years_experience, projects_completed, clients) VALUES ('about', ?, ?, ?, ?)");
        $stmt->execute([$data['bio'], $data['yearsExperience'], $data['projectsCompleted'], $data['clients']]);
        break;
        
    case 'contact':
        $socialLinks = json_encode($data['socialLinks']);
        $stmt = $pdo->prepare("REPLACE INTO contact_info (id, email, phone, social_links) VALUES ('contact', ?, ?, ?)");
        $stmt->execute([$data['email'], $data['phone'], $socialLinks]);
        break;
        
    case 'seo':
        $stmt = $pdo->prepare("REPLACE INTO seo (id, page, meta_title, meta_description) VALUES (?, ?, ?, ?)");
        $id = isset($data['id']) ? $data['id'] : uniqid();
        $stmt->execute([$id, $data['page'], $data['metaTitle'], $data['metaDescription']]);
        break;
        
    default:
        jsonResponse(['error' => 'Invalid content type'], 400);
}

jsonResponse(['message' => 'Content updated successfully']);
?>
