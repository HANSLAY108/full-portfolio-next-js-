<?php
require_once '../lib/db.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->email) || !isset($data->password)) {
    jsonResponse(['error' => 'Invalid input'], 400);
}

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$data->email]);
$user = $stmt->fetch();

if ($user && password_verify($data->password, $user['password_hash'])) {
    // In a production app, use a real JWT library. 
    // For this XAMPP pivot, we'll return a simple token and user data.
    jsonResponse([
        'message' => 'Login successful',
        'token' => 'valid_token_placeholder',
        'user' => [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
            'role' => $user['role']
        ]
    ]);
} else {
    jsonResponse(['error' => 'Invalid credentials'], 401);
}
?>
