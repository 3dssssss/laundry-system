<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);  // Decode JSON input

    if (isset($input['id'])) {  
        $userId = $input['id'];

        $conn = new mysqli('localhost', 'root', '', 'laundry_db');
        if ($conn->connect_error) {
            error_log("Database connection failed: " . $conn->connect_error);
            echo json_encode(['success' => false, 'error' => 'Database connection failed']);
            exit();
        }

        // Query users table
        $sql = "SELECT * FROM user WHERE user_id = ?";
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            error_log("Prepare failed: " . $conn->error);
            echo json_encode(['success' => false, 'error' => 'Failed to prepare SQL statement']);
            exit();
        }
        
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        if ($user) {
            // Insert into archived_users table
            $archiveSql = "INSERT INTO archived_users (archive_id, user_id, username, first_name, last_name, user_role, archived_at) VALUES (?, ?, ?, ?, ?, ?, NOW())";
            $archiveStmt = $conn->prepare($archiveSql);
            if (!$archiveStmt) {
                error_log("Prepare failed for archive: " . $conn->error);
                echo json_encode(['success' => false, 'error' => 'Failed to prepare archive SQL']);
                exit();
            }
            $archiveStmt->bind_param("iissss", $user['archive_id'], $user['user_id'], $user['username'], $user['first_name'], $user['last_name'], $user['user_role']);
            $archiveStmt->execute();

            if ($archiveStmt->affected_rows > 0) {
                // Delete user from the users table
                $deleteSql = "DELETE FROM user WHERE user_id = ?";
                $deleteStmt = $conn->prepare($deleteSql);
                if (!$deleteStmt) {
                    error_log("Prepare failed for delete: " . $conn->error);
                    echo json_encode(['success' => false, 'error' => 'Failed to prepare delete SQL']);
                    exit();
                }
                $deleteStmt->bind_param("i", $userId);
                $deleteStmt->execute();

                if ($deleteStmt->affected_rows > 0) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false, 'error' => 'Failed to delete user']);
                }
            } else {
                echo json_encode(['success' => false, 'error' => 'Failed to archive user']);
            }
        } else {
            echo json_encode(['success' => false, 'error' => 'User not found']);
        }

        $stmt->close();
        $archiveStmt->close();
        $deleteStmt->close();
        $conn->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'User ID missing']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}
?>