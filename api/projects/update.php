<?php
require_once '../lib/db.php';
verifyToken();

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['id'])) {
    jsonResponse(['error' => 'Invalid input'], 400);
}

$stmt = $pdo->prepare("UPDATE projects SET title = ?, description = ?, image_url = ?, featured = ?, status = ?, tags = ? WHERE id = ?");
$stmt->execute([
    $data['title'],
    $data['description'],
    $data['imageUrl'],
    $data['featured'] ? 1 : 0,
    $data['status'],
    $data['tags'],
    $data['id']
]);

jsonResponse(['message' => 'Project updated successfully']);
?>
