<?php
$conn = mysqli_connect('localhost', 'root', '', 'laundry_db');

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Check if prices key is set in POST data
if (isset($_POST['price']) && isset($_POST['service_id']) && isset($_POST['category_id'])) {
    $price = $_POST['price'];
    $service_id = $_POST['service_id'];
    $category_id = $_POST['category_id'];

    // Update the database
    $query = "UPDATE service_category_price SET price = '$price' WHERE service_id = $service_id AND category_id = $category_id";
    $result = mysqli_query($conn, $query);

    if ($result) {
      echo json_encode(['status' => 'success', 'message' => 'Data updated successfully!']);
        
    } else {
       echo json_encode(['status' => 'error', 'message' => 'Error updating data: ' . mysqli_error($conn)]);
    }
} else {
  echo json_encode(['status' => 'error', 'message' => 'Invalid data sent to the server.']);
}

mysqli_close($conn);
?>