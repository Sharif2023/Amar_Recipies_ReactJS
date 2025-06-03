<?php
// ✅ no whitespace or empty lines before <?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");
ini_set("display_errors", 0); // ✅ hide PHP warnings in production
error_reporting(0);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = new mysqli("localhost", "root", "", "amar_recipe");
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'DB connection failed']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$id = isset($data['id']) ? intval($data['id']) : 0;
$reason = isset($data['reason']) ? trim($data['reason']) : '';

if ($id <= 0 || empty($reason)) {
    echo json_encode(['success' => false, 'message' => 'Missing or invalid ID or reason']);
    exit;
}

$stmt = $conn->prepare("UPDATE admin_requests SET status = 'rejected', comment = ? WHERE id = ?");
$stmt->bind_param("si", $reason, $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => $stmt->error]);
}

$stmt->close();
$conn->close();
exit;
