<?php
require_once '../lib/db.php';
verifyToken();

$id = $_GET['id'] ?? null;
if (!$id) {
    jsonResponse(['error' => 'ID required'], 400);
}

$stmt = $pdo->prepare("DELETE FROM blog_posts WHERE id=?");
$stmt->execute([$id]);

jsonResponse(['message' => 'Post deleted']);
?>
