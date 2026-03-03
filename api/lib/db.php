<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

$host = 'localhost';
$db   = 'hans_portfolio';
$user = 'root';
$pass = ''; // Default XAMPP password is empty
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
     $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
     throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

function jsonResponse($data, $status = 200) {
    header("Content-Type: application/json");
    http_response_code($status);
    echo json_encode($data);
    exit;
}

function verifyToken() {
    $headers = apache_request_headers();
    if (isset($headers['Authorization'])) {
        $token = str_replace('Bearer ', '', $headers['Authorization']);
        // Simplified token check for now (implementation of JWT will follow)
        if ($token === 'valid_token_placeholder') {
            return true;
        }
    }
    jsonResponse(['error' => 'Unauthorized'], 401);
}
?>
