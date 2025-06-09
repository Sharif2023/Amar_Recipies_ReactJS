<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
$mysqli = new mysqli("localhost", "root", "", "Amar_Recipe");
if ($mysqli->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed"]);
    exit;
}
$sql = "SELECT COUNT(*) as count FROM submission_requests WHERE status = 'Pending'";
$result = $mysqli->query($sql);
$row = $result->fetch_assoc();
echo json_encode(["success" => true, "count" => (int)$row['count']]);
?>
