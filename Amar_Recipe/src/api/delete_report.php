<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Allow all domains (you can restrict it to specific domains)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Handle preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Check if ID is provided in the query string
if (!isset($_GET['id'])) {
    echo json_encode(['success' => false, 'message' => 'No ID provided']);
    exit;
}

// Get and sanitize the ID from the query string
$id = intval($_GET['id']);  // Ensure ID is an integer

// Check if the ID is valid
if ($id <= 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid ID provided']);
    exit;
}

// Create a new database connection
$mysqli = new mysqli("localhost", "root", "", "Amar_Recipe");

// Check if the connection was successful
if ($mysqli->connect_errno) {
    echo json_encode(['success' => false, 'message' => 'Database connection error: ' . $mysqli->connect_error]);
    exit;
}

// Check if ID exists in the database before deletion
$query = "SELECT * FROM reports WHERE id = ?";
$stmt = $mysqli->prepare($query);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

// If no report is found, return an error
if ($result->num_rows == 0) {
    echo json_encode(['success' => false, 'message' => 'No report found with that ID']);
    exit;
}

// Proceed with deletion if the record exists
$stmt->close();

// Prepare the DELETE query
$stmt = $mysqli->prepare("DELETE FROM reports WHERE id = ?");
$stmt->bind_param("i", $id);

// Execute the DELETE query
if ($stmt->execute()) {
    // Check if a row was actually deleted
    if ($stmt->affected_rows > 0) {
        echo json_encode(['success' => true, 'message' => 'Report deleted successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'No report found with that ID']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to delete report: ' . $stmt->error]);
}

// Close the prepared statement and database connection
$stmt->close();
$mysqli->close();
?>
