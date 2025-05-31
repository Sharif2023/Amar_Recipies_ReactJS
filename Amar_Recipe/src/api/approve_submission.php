<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Amar_Recipe";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => "DB Connection failed"]);
    exit;
}

$id = isset($_POST['id']) ? intval($_POST['id']) : 0;
if ($id <= 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid submission id']);
    exit;
}

// Fetch submission request details
$stmt = $conn->prepare("SELECT * FROM submission_requests WHERE id = ?");
$stmt->bind_param('i', $id);
$stmt->execute();
$result = $stmt->get_result();
$submission = $result->fetch_assoc();
$stmt->close();

if (!$submission) {
    echo json_encode(['success' => false, 'message' => 'Submission not found']);
    exit;
}

// Insert into recipes table
$sql = "INSERT INTO recipes 
(title, category, description, image_url, location, organizerName, organizerEmail, organizerAddress, source, tags, reference, tutorialVideo, comment)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => "Prepare failed: " . $conn->error]);
    exit;
}
$stmt->bind_param(
    'sssssssssssss',
    $submission['title'],
    $submission['category'],
    $submission['description'],
    $submission['image'],
    $submission['location'],
    $submission['organizerName'],
    $submission['organizerEmail'],
    $submission['organizerAddress'],
    $submission['source'],
    $submission['tags'],
    $submission['reference'],
    $submission['tutorialVideo'],
    $submission['comment']
);

if (!$stmt->execute()) {
    echo json_encode(['success' => false, 'message' => 'Insert into recipes failed: ' . $stmt->error]);
    exit;
}
$stmt->close();

// Update submission_requests status to Approved
$update = $conn->prepare("UPDATE submission_requests SET status = 'Approved' WHERE id = ?");
$update->bind_param('i', $id);
$update->execute();
$update->close();

echo json_encode(['success' => true]);
$conn->close();
