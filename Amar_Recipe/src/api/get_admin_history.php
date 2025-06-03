<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

$conn = new mysqli("localhost", "root", "", "amar_recipe");
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => "DB connection failed"]);
    exit;
}

$sql = "SELECT id, name, email, specialty, status, comment, date FROM admin_requests WHERE status IN ('approved', 'rejected') ORDER BY date DESC";
$result = $conn->query($sql);

$history = [];
while ($row = $result->fetch_assoc()) {
    $history[] = $row;
}

echo json_encode(['success' => true, 'data' => $history]);
$conn->close();
