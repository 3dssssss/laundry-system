<?php
header('Content-Type: application/json');
$conn = new mysqli('localhost', 'root', '', 'laundry_db');

if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
    exit;
}

$qry = "
    SELECT COUNT(DISTINCT sr.customer_id) AS total_requests
    FROM service_request sr
    JOIN transaction t 
    ON sr.customer_id = t.customer_id
    WHERE DATE(sr.request_date) = CURDATE()
    AND t.laundry_cycle = 'Rush'
";

$qry_run = $conn->query($qry);
if (!$qry_run) {
    echo json_encode(['status' => 'error', 'message' => 'Query failed: ' . $conn->error]);
    exit;
}

$row = $qry_run->fetch_assoc();
$conn->close();

echo json_encode(['status' => 'success', 'total_requests' => $row['total_requests']]);
?>
