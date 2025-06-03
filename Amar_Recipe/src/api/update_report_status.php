<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id']) || !isset($data['status'])) {
    echo json_encode(['success' => false]);
    exit;
}

$id = intval($data['id']);
$status = $data['status'];

$validStatuses = ['pending', 'reviewed', 'resolved'];
if (!in_array($status, $validStatuses)) {
    echo json_encode(['success' => false]);
    exit;
}

$mysqli = new mysqli("localhost", "root", "", "Amar_Recipe");
if ($mysqli->connect_errno) {
    echo json_encode(['success' => false]);
    exit;
}

$stmt = $mysqli->prepare("UPDATE reports SET status = ? WHERE id = ?");
$stmt->bind_param("si", $status, $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
$stmt->close();
$mysqli->close();
