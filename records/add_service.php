<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['laundry_service_option'])) {
        $laundry_service_option = $_POST['laundry_service_option'];

        $conn = new mysqli('localhost', 'root', '', 'laundry_db');

        if ($conn->connect_error) {
            echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
            exit;
        }

        $stmt = $conn->prepare("INSERT INTO service (laundry_service_option) VALUES (?)");
        $stmt->bind_param("s", $laundry_service_option);

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