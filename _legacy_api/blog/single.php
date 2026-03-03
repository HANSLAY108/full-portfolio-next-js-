<?php
require_once '../lib/db.php';

$slug = $_GET['slug'] ?? '';
if (!$slug) {
    jsonResponse(['error' => 'Slug required'], 400);
}

$stmt = $pdo->prepare("SELECT * FROM blog_posts WHERE slug = ? AND status = 'published' LIMIT 1");
$stmt->execute([$slug]);
$post = $stmt->fetch();

if (!$post) {
    jsonResponse(['error' => 'Post not found'], 404);
}

jsonResponse($post);
?>
