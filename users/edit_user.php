<? /*php
$servername = 'localhost';
$username = 'root';
$password = '';
$db_name = "laundry_db";

$conn = new mysqli($servername, $username, $password, $db_name);

if ($conn->connect_error) {
    die("Connection error: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user_id = trim($_POST['user_id']); // Assuming the user ID is passed through the form
    $username = trim($_POST['username']);
    $fname = trim($_POST['fname']);
    $lname = trim($_POST['lname']);
    $user_role = trim($_POST['user_role']);
    $password = trim($_POST['password']);

    if (empty($user_id) || empty($username) || empty($fname) || empty($lname)) {
        $error_message = "Error: All fields except password are required.";
    } else {
        $check_username_sql = "SELECT * FROM user WHERE username = ? AND user_id != ?";
        $stmt = $conn->prepare($check_username_sql);
        $stmt->bind_param("si", $username, $user_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $error_message = "Error: Username already exists!";
        } else {
            if (!empty($password)) {
                $hashed_password = password_hash($password, PASSWORD_BCRYPT);
                $update_user_sql = "UPDATE user SET username = ?, first_name = ?, last_name = ?, user_role = ?, password = ? WHERE user_id = ?";
                $stmt = $conn->prepare($update_user_sql);
                $stmt->bind_param("sssssi", $username, $fname, $lname, $user_role, $hashed_password, $user_id);
            } else {
                $update_user_sql = "UPDATE user SET username = ?, first_name = ?, last_name = ?, user_role = ? WHERE user_id = ?";
                $stmt = $conn->prepare($update_user_sql);
                $stmt->bind_param("ssssi", $username, $fname, $lname, $user_role, $user_id);
            }

            if ($stmt->execute()) {
                header("Location: users.php?success=1");
            } else {
                $error_message = "Error: Could not update the user information.";
            }
        }
        $stmt->close();
    }
}

$conn->close();
?> */
