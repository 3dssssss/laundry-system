<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['laundry_category_option'])) {
        $laundry_category_option = $_POST['laundry_category_option'];

        $conn = new mysqli('localhost', 'root', '', 'laundry_db');

        if ($conn->connect_error) {
            echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
            exit;
        }

        $stmt = $conn->prepare("INSERT INTO category (laundry_category_option) VALUES (?)");
        $stmt->bind_param("s", $laundry_category_option);

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error: ' . $stmt->error]);
        }

        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Missing form data.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
