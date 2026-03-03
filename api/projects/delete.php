<?php
require_once '../lib/db.php';
verifyToken();

if (!isset($_GET['id'])) {
    jsonResponse(['error' => 'Missing project ID'], 400);
}

$stmt = $pdo->prepare("DELETE FROM projects WHERE id = ?");
$stmt->execute([$_GET['id']]);

jsonResponse(['message' => 'Project deleted successfully']);
?>
