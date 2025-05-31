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

$sql = "SELECT * FROM submission_requests ORDER BY submission_date DESC";
$result = $conn->query($sql);

$requests = [];
while ($row = $result->fetch_assoc()) {
    $requests[] = $row;
}

echo json_encode(['success' => true, 'data' => $requests]);

$conn->close();
