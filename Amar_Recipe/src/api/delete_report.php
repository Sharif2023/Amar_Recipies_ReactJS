<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
if (!isset($_GET['id'])) {
    echo json_encode(['success' => false]);
    exit;
}

$id = intval($_GET['id']);
$mysqli = new mysqli("localhost", "root", "", "Amar_Recipe");
if ($mysqli->connect_errno) {
    echo json_encode(['success' => false]);
    exit;
}

$stmt = $mysqli->prepare("DELETE FROM reports WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
$stmt->close();
$mysqli->close();
