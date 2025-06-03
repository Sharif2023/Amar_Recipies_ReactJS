<?php
header("Content-Type: application/json");
$mysqli = new mysqli("localhost", "root", "", "Amar_Recipe");
if ($mysqli->connect_errno) {
    echo json_encode(['success' => false, 'count' => 0]);
    exit;
}

$result = $mysqli->query("SELECT COUNT(*) as count FROM reports WHERE status = 'pending'");
$count = 0;
if ($result) {
    $row = $result->fetch_assoc();
    $count = intval($row['count']);
}

echo json_encode(['success' => true, 'count' => $count]);
$mysqli->close();
