<?php
require_once '../lib/db.php';
verifyToken();

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['title'])) {
    jsonResponse(['error' => 'Invalid input'], 400);
}

$id = uniqid('svc_');
$stmt = $pdo->prepare("INSERT INTO services (id, title, description, icon, sort_order) VALUES (?, ?, ?, ?, ?)");
$stmt->execute([
    $id,
    $data['title'],
    $data['description'] ?? '',
    $data['icon'] ?? 'Zap',
    $data['sort_order'] ?? 0,
]);

jsonResponse(['message' => 'Service created', 'id' => $id]);
?>
