<?php
require_once '../lib/db.php';
verifyToken();

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['title'])) {
    jsonResponse(['error' => 'Invalid input'], 400);
}

$id = uniqid('proj_');
$stmt = $pdo->prepare("INSERT INTO projects (id, title, description, image_url, featured, status, tags) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->execute([
    $id,
    $data['title'],
    $data['description'],
    $data['imageUrl'],
    $data['featured'] ? 1 : 0,
    $data['status'],
    $data['tags']
]);

jsonResponse(['message' => 'Project created successfully', 'id' => $id]);
?>
