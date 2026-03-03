<?php
require_once '../lib/db.php';
verifyToken();

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['id'])) {
    jsonResponse(['error' => 'Invalid input'], 400);
}

$stmt = $pdo->prepare("UPDATE services SET title=?, description=?, icon=?, sort_order=?, updated_at=NOW() WHERE id=?");
$stmt->execute([
    $data['title'],
    $data['description'] ?? '',
    $data['icon'] ?? 'Zap',
    $data['sort_order'] ?? 0,
    $data['id'],
]);

jsonResponse(['message' => 'Service updated']);
?>
