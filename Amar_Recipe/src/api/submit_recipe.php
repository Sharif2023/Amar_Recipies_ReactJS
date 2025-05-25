<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

// Database config
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Amar_Recipe";

// Connect to DB
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => "DB Connection failed"]);
    exit;
}

// Helper function to sanitize input
function sanitize($conn, $data) {
    return $conn->real_escape_string(trim($data));
}

// Check required fields
$required_fields = ['title', 'category', 'description', 'location', 'organizerName', 'organizerEmail', 'organizerAddress'];
foreach ($required_fields as $field) {
    if (empty($_POST[$field])) {
        echo json_encode(['success' => false, 'message' => "Missing field: $field"]);
        exit;
    }
}

// Handle image upload
$image_url = null;
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = __DIR__ . '/uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $fileTmpPath = $_FILES['image']['tmp_name'];
    $fileName = basename($_FILES['image']['name']);
    $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    $allowedExts = ['png', 'jpg', 'jpeg', 'gif'];

    if (!in_array($fileExt, $allowedExts)) {
        echo json_encode(['success' => false, 'message' => "Invalid image format"]);
        exit;
    }

    // Generate unique file name to avoid conflicts
    $newFileName = uniqid('img_', true) . '.' . $fileExt;
    $destPath = $uploadDir . $newFileName;

    if (move_uploaded_file($fileTmpPath, $destPath)) {
        // Assuming your backend URL is http://yourdomain.com/
        $image_url = "uploads/" . $newFileName;
    } else {
        echo json_encode(['success' => false, 'message' => "Failed to move uploaded image"]);
        exit;
    }
}

// Prepare and sanitize all inputs
$title = sanitize($conn, $_POST['title']);
$category = sanitize($conn, $_POST['category']);
$description = sanitize($conn, $_POST['description']);
$location = sanitize($conn, $_POST['location']);
$organizerName = sanitize($conn, $_POST['organizerName']);
$organizerEmail = sanitize($conn, $_POST['organizerEmail']);
$organizerAddress = sanitize($conn, $_POST['organizerAddress']);
$source = isset($_POST['source']) ? sanitize($conn, $_POST['source']) : '';
$tags = isset($_POST['tags']) ? sanitize($conn, $_POST['tags']) : '';
$reference = isset($_POST['reference']) ? sanitize($conn, $_POST['reference']) : '';
$tutorialVideo = isset($_POST['tutorialVideo']) ? sanitize($conn, $_POST['tutorialVideo']) : '';
$comment = isset($_POST['comment']) ? sanitize($conn, $_POST['comment']) : '';

// Insert into DB
$sql = "INSERT INTO recipes (
    title, category, description, image_url, location, organizerName, organizerEmail,
    organizerAddress, source, tags, reference, tutorialVideo, comment
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";


$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => "Prepare failed: " . $conn->error]);
    exit;
}
$stmt->bind_param(
    'sssssssssssss',
    $title,
    $category,
    $description,
    $image_url,
    $location,
    $organizerName,
    $organizerEmail,
    $organizerAddress,
    $source,
    $tags,
    $reference,
    $tutorialVideo,
    $comment
);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => "Insert failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
