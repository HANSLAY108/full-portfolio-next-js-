<?php
require_once '../lib/db.php';

$stmt = $pdo->query("SELECT * FROM projects ORDER BY created_at DESC");
$projects = $stmt->fetchAll();

jsonResponse($projects);
?>
