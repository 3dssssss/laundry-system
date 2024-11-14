<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "laundry_db";

// Establish the database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection error: " . $conn->connect_error);
}

// Get the search term from the POST request
$search = isset($_POST['search']) ? $conn->real_escape_string($_POST['search']) : '';

// Prepare the SQL query based on the search term
$sql = "SELECT user_id, username, first_name, last_name, user_role, last_active, 
        CASE 
            WHEN DATEDIFF(NOW(), last_active) < 30 THEN 'Active' 
            ELSE 'Inactive' 
        END AS user_status, date_created 
        FROM user 
        WHERE username LIKE '%$search%' 
        OR first_name LIKE '%$search%' 
        OR last_name LIKE '%$search%'";

$result = $conn->query($sql);

// If results are found, output the user data as table rows
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>" . $row['user_id'] . "</td>
                <td>" . $row['username'] . "</td>
                <td>" . $row['first_name'] . "</td>
                <td>" . $row['last_name'] . "</td>
                <td>" . $row['user_role'] . "</td>
                <td>" . $row['last_active'] . "</td>
                <td>" . $row['user_status'] . "</td>
                <td>" . $row['date_created'] . "</td>
              </tr>";
    }
} else {
    echo "<tr><td colspan='8'>No results found</td></tr>";
}

$conn->close();
?>
