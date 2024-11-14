<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);  

    if (isset($input['id'])) {  
        $categoryId = $input['id'];

        $conn = new mysqli('localhost', 'root', '', 'laundry_db');
        if ($conn->connect_error) {
            error_log("Database connection failed: " . $conn->connect_error);
            echo json_encode(['success' => false, 'error' => 'Database connection failed']);
            exit();
        }

        // Query category table
        $sql = "SELECT * FROM category WHERE category_id = ?";
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            error_log("Prepare failed: " . $conn->error);
            echo json_encode(['success' => false, 'error' => 'Failed to prepare SQL statement']);
            exit();
        }
        
        $stmt->bind_param("i", $categoryId);
        $stmt->execute();
        $result = $stmt->get_result();
        $category = $result->fetch_assoc();

        if ($category) {
            // Insert into archived_category table
            $archiveSql = "INSERT INTO archived_category (category_id, laundry_category_option, archived_at) VALUES (?, ?, NOW())";
            $archiveStmt = $conn->prepare($archiveSql);
            if (!$archiveStmt) {
                error_log("Prepare failed for archive: " . $conn->error);
                echo json_encode(['success' => false, 'error' => 'Failed to prepare archive SQL']);
                exit();
            }
            $archiveStmt->bind_param("is", $category ['category_id'], $category ['laundry_category_option']);
            $archiveStmt->execute();

            if ($archiveStmt->affected_rows > 0) {
                // Delete category from the category table
                $deleteSql = "DELETE FROM category WHERE category_id = ?";
                $deleteStmt = $conn->prepare($deleteSql);
                if (!$deleteStmt) {
                    error_log("Prepare failed for delete: " . $conn->error);
                    echo json_encode(['success' => false, 'error' => 'Failed to prepare delete SQL']);
                    exit();
                }
                $deleteStmt->bind_param("i", $categoryId);
                $deleteStmt->execute();

                if ($deleteStmt->affected_rows > 0) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false, 'error' => 'Failed to delete laundry category option']);
                }
            } else {
                echo json_encode(['success' => false, 'error' => 'Failed to archive laundry category option']);
            }
        } else {
            echo json_encode(['success' => false, 'error' => 'Laundry category option not found']);
        }

        $stmt->close();
        $archiveStmt->close();
        $deleteStmt->close();
        $conn->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'Category ID missing']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}
?>