<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['recipeId']) || (!isset($data['reasons']) && !isset($data['otherReason']))) {
    echo json_encode(['success' => false, 'message' => 'Invalid data']);
    exit;
}

$recipeId = intval($data['recipeId']);
$reasons = isset($data['reasons']) ? json_encode($data['reasons']) : json_encode([]);
$otherReason = isset($data['otherReason']) ? trim($data['otherReason']) : '';
$reporterEmail = isset($data['reporterEmail']) ? trim($data['reporterEmail']) : '';

$mysqli = new mysqli("localhost", "root", "", "Amar_Recipe");

if ($mysqli->connect_errno) {
    echo json_encode(['success' => false, 'message' => 'DB Connection failed']);
    exit;
}

$stmt = $mysqli->prepare("INSERT INTO reports (recipe_id, reasons, other_reason, reporter_email) VALUES (?, ?, ?, ?)");
$stmt->bind_param("isss", $recipeId, $reasons, $otherReason, $reporterEmail);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Insert failed']);
}
$stmt->close();
$mysqli->close();
