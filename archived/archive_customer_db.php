<?php
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$host = 'localhost'; 
$db = 'laundry_db';
$user = 'root'; 
$pass = ''; 
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    // Handle connection error
    $response = ["success" => false, "error" => "Database connection failed: " . $e->getMessage()];
    echo json_encode($response);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (isset($data['id'])) {
        $customerId = $data['id'];

        // Prepare and execute your archiving query here
        try {
            $stmt = $pdo->prepare("INSERT INTO archived_customers (customer_id, customer_name, contact_number, province, city, address, brgy, archived_at) SELECT customer_id, customer_name, contact_number,province, city, address, brgy, NOW() FROM customer WHERE customer_id = :customer_id");
            $stmt->bindParam(':customer_id', $customerId, PDO::PARAM_INT);
            $stmt->execute();

            // Optionally delete from the customer table
            $deleteStmt = $pdo->prepare("DELETE FROM customer WHERE customer_id = :customer_id");
            $deleteStmt->bindParam(':customer_id', $customerId, PDO::PARAM_INT);
            $deleteStmt->execute();

            $response['success'] = true;
        } catch (Exception $e) {
            $response['error'] = "Failed to archive customer: " . $e->getMessage();
        }
    } else {
        $response['error'] = "Customer ID not provided.";
    }

    echo json_encode($response);
}
