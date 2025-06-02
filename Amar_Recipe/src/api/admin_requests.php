<?php
$conn = new mysqli("localhost", "root", "", "amar_recipe");
$result = $conn->query("SELECT * FROM admin_requests WHERE status = 'pending'");
$rows = [];

while($row = $result->fetch_assoc()) {
    $rows[] = $row;
}
echo json_encode($rows);
?>
