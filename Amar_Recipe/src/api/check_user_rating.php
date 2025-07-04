<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle OPTIONS request for preflight check
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Stop further processing for OPTIONS request
}

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Amar_Recipe";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => "DB Connection failed: " . $conn->connect_error]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$recipeId = $data['recipeId'];
$email = $data['email'];

// Check if email has already rated the recipe
$sql = "SELECT id FROM ratings WHERE recipe_id = ? AND email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $recipeId, $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Rating already exists
    echo json_encode(['success' => true, 'exists' => true]);
} else {
    // Rating does not exist
    echo json_encode(['success' => true, 'exists' => false]);
}
?>
