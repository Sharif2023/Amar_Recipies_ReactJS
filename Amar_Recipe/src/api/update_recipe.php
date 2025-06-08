<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'])) {
    echo json_encode(['success' => false, 'message' => 'Missing recipe ID']);
    exit;
}

$mysqli = new mysqli("localhost", "root", "", "Amar_Recipe");
if ($mysqli->connect_errno) {
    echo json_encode(['success' => false, 'message' => 'DB connection failed']);
    exit;
}

$stmt = $mysqli->prepare("
    UPDATE recipes SET 
        title = ?, 
        image_url = ?, 
        description = ?, 
        comment = ?, 
        location = ?, 
        organizerName = ?, 
        organizerEmail = ?
    WHERE id = ?
");

$stmt->bind_param(
    "sssssssi",
    $data['title'],
    $data['image_url'],
    $data['description'],
    $data['comment'],
    $data['location'],
    $data['organizerName'],
    $data['organizerEmail'],
    $data['id']
);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Recipe updated successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Update failed: ' . $stmt->error]);
}

$stmt->close();
$mysqli->close();
?>
