<?php
require_once '../lib/db.php';
verifyToken();

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['id'])) {
    jsonResponse(['error' => 'Invalid input'], 400);
}

$stmt = $pdo->prepare("UPDATE blog_posts SET title=?, excerpt=?, content=?, featured_image=?, status=?, meta_title=?, meta_description=?, updated_at=NOW() WHERE id=?");
$stmt->execute([
    $data['title'],
    $data['excerpt'] ?? '',
    $data['content'] ?? '',
    $data['featured_image'] ?? '',
    $data['status'] ?? 'draft',
    $data['meta_title'] ?? $data['title'],
    $data['meta_description'] ?? '',
    $data['id'],
]);

jsonResponse(['message' => 'Post updated']);
?>
