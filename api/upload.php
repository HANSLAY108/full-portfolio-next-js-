<?php
require_once 'lib/db.php';

// Ensure the user is authenticated
verifyToken();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

if (!isset($_FILES['image'])) {
    jsonResponse(['error' => 'No image uploaded'], 400);
}

$file = $_FILES['image'];
$allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
$maxSize = 5 * 1024 * 1024; // 5MB

if (!in_array($file['type'], $allowedTypes)) {
    jsonResponse(['error' => 'Invalid file type. Only JPG, PNG, WEBP, and GIF are allowed.'], 400);
}

if ($file['size'] > $maxSize) {
    jsonResponse(['error' => 'File size exceeds 5MB limit'], 400);
}

// Ensure uploads directory exists
$uploadDir = '../uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = uniqid('img_') . '.' . $extension;
$targetPath = $uploadDir . $filename;

if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    // Return the relative URL from the root of the project
    // Since the app is in /hans_portfolio/out, and API is in /hans_portfolio/api
    // The uploads should ideally be visible to the public.
    // In XAMPP, if htdocs/hans_portfolio contains /uploads, it will be /hans_portfolio/uploads/file.png
    jsonResponse([
        'message' => 'Upload successful',
        'url' => '/hans_portfolio/uploads/' . $filename
    ]);
} else {
    jsonResponse(['error' => 'Failed to save uploaded file'], 500);
}
?>
