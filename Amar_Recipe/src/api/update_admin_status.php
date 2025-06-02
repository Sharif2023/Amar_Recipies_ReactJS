<?php
$data = json_decode(file_get_contents("php://input"), true);
$conn = new mysqli("localhost", "root", "", "amar_recipes");

$stmt = $conn->prepare("UPDATE admin_requests SET status=? WHERE id=?");
$stmt->bind_param("si", $data['status'], $data['id']);
$stmt->execute();

echo json_encode(["message" => "Status updated"]);
?>
