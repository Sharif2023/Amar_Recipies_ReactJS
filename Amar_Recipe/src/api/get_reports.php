<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
$mysqli = new mysqli("localhost", "root", "", "Amar_Recipe");
if ($mysqli->connect_errno) {
    echo json_encode(['success' => false, 'data' => []]);
    exit;
}

$result = $mysqli->query("SELECT * FROM reports ORDER BY reported_at DESC");
$data = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}
echo json_encode(['success' => true, 'data' => $data]);
$mysqli->close();
