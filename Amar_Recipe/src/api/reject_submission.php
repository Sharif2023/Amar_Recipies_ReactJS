<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Amar_Recipe";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => "DB Connection failed"]);
    exit;
}

$id = isset($_POST['id']) ? intval($_POST['id']) : 0;
$reason = isset($_POST['reason']) ? trim($_POST['reason']) : '';

if ($id <= 0 || empty($reason)) {
    echo json_encode(['success' => false, 'message' => 'Invalid parameters']);
    exit;
}

$stmt = $conn->prepare("UPDATE submission_requests SET status = 'Rejected', comment = ? WHERE id = ?");
$stmt->bind_param('si', $reason, $id);
if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => $stmt->error]);
}
$stmt->close();
$conn->close();
