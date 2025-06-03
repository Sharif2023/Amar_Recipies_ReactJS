<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

$conn = new mysqli("localhost", "root", "", "amar_recipe");

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'DB Connection failed']);
    exit;
}

if (!isset($data['id'], $data['status'])) {
    echo json_encode(['success' => false, 'message' => 'Missing id or status']);
    exit;
}

$id = intval($data['id']);
$status = $data['status'];

$stmt = $conn->prepare("UPDATE admin_requests SET status = ? WHERE id = ?");
$stmt->bind_param('si', $status, $id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Status updated"]);
} else {
    echo json_encode(['success' => false, 'message' => $stmt->error]);
}

$stmt->close();
$conn->close();
