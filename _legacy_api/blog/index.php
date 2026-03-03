<?php
require_once '../lib/db.php';

$page  = max(1, (int)($_GET['page'] ?? 1));
$limit = 9;
$offset = ($page - 1) * $limit;

$where  = "WHERE status = 'published'";
$search = $_GET['search'] ?? '';
if ($search) {
    $where .= " AND (title LIKE ? OR excerpt LIKE ?)";
    $like = "%{$search}%";
    $stmt = $pdo->prepare("SELECT SQL_CALC_FOUND_ROWS * FROM blog_posts {$where} ORDER BY created_at DESC LIMIT {$limit} OFFSET {$offset}");
    $stmt->execute([$like, $like]);
} else {
    $stmt = $pdo->prepare("SELECT SQL_CALC_FOUND_ROWS * FROM blog_posts {$where} ORDER BY created_at DESC LIMIT {$limit} OFFSET {$offset}");
    $stmt->execute();
}

$posts = $stmt->fetchAll();
$total = $pdo->query("SELECT FOUND_ROWS()")->fetchColumn();

jsonResponse([
    'posts'      => $posts,
    'total'      => (int)$total,
    'page'       => $page,
    'totalPages' => ceil($total / $limit),
]);
?>
