<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$mysqli = new mysqli("localhost", "root", "", "Amar_Recipe");
if ($mysqli->connect_errno) {
    echo json_encode(['success' => false, 'data' => []]);
    exit;
}

// Join reports with recipes to get full recipe data
$query = "
    SELECT r.*, rr.id AS report_id, rr.reasons, rr.other_reason, rr.reporter_email, rr.reported_at, rr.status AS report_status
    FROM reports rr
    JOIN recipes r ON rr.recipe_id = r.id
    ORDER BY rr.reported_at DESC
";

$result = $mysqli->query($query);

$data = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode(['success' => true, 'data' => $data]);

$mysqli->close();
?>
