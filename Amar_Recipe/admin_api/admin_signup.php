<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$conn = new mysqli("localhost", "root", "", "amar_recipe");

if ($conn->connect_error) die("Connection failed");

if (!isset($data['password']) || empty($data['password'])) {
  echo json_encode(["message" => "Password is required"]);
  exit;
}

$stmt = $conn->prepare("INSERT INTO admin_requests (name, phone, email, date, area, city, state, postcode, experience, specialty, portfolio, certification, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

$hashed_password = password_hash($data['password'], PASSWORD_DEFAULT);

$stmt->bind_param("sssssssisssss", 
  $data['name'], $data['phone'], $data['email'], $data['date'],
  $data['area'], $data['city'], $data['state'], $data['postcode'],
  $data['experience'], $data['specialty'], $data['portfolio'], 
  $data['certification'], $hashed_password
);

if ($stmt->execute()) {
    echo json_encode(["message" => "Signup request submitted"]);
} else {
    echo json_encode(["message" => "Error submitting request"]);
}

$stmt->close();
$conn->close();
?>
