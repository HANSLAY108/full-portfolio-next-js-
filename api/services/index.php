<?php
require_once '../lib/db.php';

$stmt = $pdo->query("SELECT * FROM services ORDER BY sort_order ASC");
$services = $stmt->fetchAll();

jsonResponse($services);
?>
