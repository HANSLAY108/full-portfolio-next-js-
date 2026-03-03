<?php
require_once '../lib/db.php';
verifyToken();

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['title'])) {
    jsonResponse(['error' => 'Invalid input'], 400);
}

// Auto-generate slug from title
$slug = strtolower(preg_replace('/[^a-zA-Z0-9]+/', '-', $data['title']));
$slug = trim($slug, '-');

// Ensure slug uniqueness
$base = $slug;
$i = 1;
while (true) {
    $check = $pdo->prepare("SELECT id FROM blog_posts WHERE slug = ?");
    $check->execute([$slug]);
    if (!$check->fetch()) break;
    $slug = $base . '-' . $i++;
}

$id = uniqid('blog_');
$stmt = $pdo->prepare("INSERT INTO blog_posts (id, title, slug, excerpt, content, featured_image, status, meta_title, meta_description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->execute([
    $id,
    $data['title'],
    $slug,
    $data['excerpt'] ?? '',
    $data['content'] ?? '',
    $data['featured_image'] ?? '',
    $data['status'] ?? 'draft',
    $data['meta_title'] ?? $data['title'],
    $data['meta_description'] ?? $data['excerpt'] ?? '',
]);

jsonResponse(['message' => 'Post created', 'id' => $id, 'slug' => $slug]);
?>
