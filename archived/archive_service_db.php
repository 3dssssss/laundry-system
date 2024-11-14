<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);  // Decode JSON input

    if (isset($input['id'])) {  
        $serviceId = $input['id'];

        $conn = new mysqli('localhost', 'root', '', 'laundry_db');
        if ($conn->connect_error) {
            error_log("Database connection failed: " . $conn->connect_error);
            echo json_encode(['success' => false, 'error' => 'Database connection failed']);
            exit();
        }

        // Query service table
        $sql = "SELECT * FROM service WHERE service_id = ?";
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            error_log("Prepare failed: " . $conn->error);
            echo json_encode(['success' => false, 'error' => 'Failed to prepare SQL statement']);
            exit();
        }
        
        $stmt->bind_param("i", $serviceId);
        $stmt->execute();
        $result = $stmt->get_result();
        $service = $result->fetch_assoc();

        if ($service) {
            // Insert into archived_service table
            $archiveSql = "INSERT INTO archived_service (service_id, laundry_service_option, archived_at) VALUES (?, ?, NOW())";
            $archiveStmt = $conn->prepare($archiveSql);
            if (!$archiveStmt) {
                error_log("Prepare failed for archive: " . $conn->error);
                echo json_encode(['success' => false, 'error' => 'Failed to prepare archive SQL']);
                exit();
            }
            $archiveStmt->bind_param("is", $service ['service_id'], $service ['laundry_service_option']);
            $archiveStmt->execute();

            if ($archiveStmt->affected_rows > 0) {
                // Delete service from the service table
                $deleteSql = "DELETE FROM service WHERE service_id = ?";
                $deleteStmt = $conn->prepare($deleteSql);
                if (!$deleteStmt) {
                    error_log("Prepare failed for delete: " . $conn->error);
                    echo json_encode(['success' => false, 'error' => 'Failed to prepare delete SQL']);
                    exit();
                }
                $deleteStmt->bind_param("i", $serviceId);
                $deleteStmt->execute();

                if ($deleteStmt->affected_rows > 0) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false, 'error' => 'Failed to delete laundry service option']);
                }
            } else {
                echo json_encode(['success' => false, 'error' => 'Failed to archive laundry service option']);
            }
        } else {
            echo json_encode(['success' => false, 'error' => 'Laundry service option not found']);
        }

        $stmt->close();
        $archiveStmt->close();
        $deleteStmt->close();
        $conn->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'Service ID missing']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}
?>