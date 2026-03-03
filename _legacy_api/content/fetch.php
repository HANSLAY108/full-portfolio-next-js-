<?php
require_once '../lib/db.php';

$type = isset($_GET['type']) ? $_GET['type'] : 'home';
$table = '';

switch ($type) {
    case 'home':
        $table = 'home_content';
        break;
    case 'about':
        $table = 'about_content';
        break;
    case 'contact':
        $table = 'contact_info';
        break;
    case 'seo':
        $table = 'seo';
        break;
    default:
        jsonResponse(['error' => 'Invalid content type'], 400);
}

if ($table === 'seo' && isset($_GET['page'])) {
    $stmt = $pdo->prepare("SELECT * FROM $table WHERE page = ?");
    $stmt->execute([$_GET['page']]);
} else {
    $stmt = $pdo->prepare("SELECT * FROM $table LIMIT 1");
    $stmt->execute();
}

$content = $stmt->fetch();

// Parse social_links JSON if needed
if ($type === 'contact' && $content) {
    $content['socialLinks'] = json_decode($content['social_links'], true);
}

jsonResponse($content ? $content : []);
?>
