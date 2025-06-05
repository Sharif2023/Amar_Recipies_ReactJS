<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);

// Check if required fields are present
if (!isset($data['id']) || !isset($data['title']) || !isset($data['description']) || !isset($data['location']) || !isset($data['image_url']) || !isset($data['organizerName']) || !isset($data['organizerEmail'])) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

// Get the data from the request
$id = $data['id'];
$title = $data['title'];
$description = $data['description'];
$location = $data['location'];
$image_url = $data['image_url'];
$organizerName = $data['organizerName'];
$organizerEmail = $data['organizerEmail'];

// Establish database connection
$mysqli = new mysqli("localhost", "root", "", "Amar_Recipe");

// Check connection
if ($mysqli->connect_errno) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// Prepare the update query with all fields
$stmt = $mysqli->prepare("UPDATE recipes SET title = ?, description = ?, location = ?, image_url = ?, organizerName = ?, organizerEmail = ? WHERE id = ?");
$stmt->bind_param("ssssssi", $title, $description, $location, $image_url, $organizerName, $organizerEmail, $id);

// Execute the query and check if it was successful
if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to update recipe']);
}

// Close the statement and connection
$stmt->close();
$mysqli->close();
?>
