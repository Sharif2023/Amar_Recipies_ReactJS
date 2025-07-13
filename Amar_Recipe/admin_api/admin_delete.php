<?php

// Allow all origins (for development purposes)
header("Access-Control-Allow-Origin: *");

// Allow specific methods
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Allow the content type header
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight request (for browsers sending OPTIONS request)
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

$adminId = isset($data['adminId']) ? intval($data['adminId']) : 0;
$loggedInEmail = isset($data['loggedInEmail']) ? $data['loggedInEmail'] : '';

// Check if logged-in admin is root admin
$rootAdminEmail = "sharifislam0505@gmail.com"; // Define the root admin's email
if ($loggedInEmail !== $rootAdminEmail) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized action']);
    exit;
}

if ($adminId <= 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid admin ID']);
    exit;
}

$stmt = $conn->prepare("DELETE FROM admin_requests WHERE id = ?");
$stmt->bind_param("i", $adminId);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to delete admin']);
}

$stmt->close();
$conn->close();
?>
