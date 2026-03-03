<?php
require_once '../lib/db.php';

// Admin: list ALL posts regardless of status
$stmt = $pdo->query("SELECT id, title, slug, status, created_at, updated_at FROM blog_posts ORDER BY created_at DESC");
$posts = $stmt->fetchAll();

jsonResponse($posts);
?>
