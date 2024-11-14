<?php
session_start();

$conn = new mysqli('localhost', 'root', '', 'laundry_db');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// check if user is logged in
if (!isset($_SESSION['user_role'])) {
    header('location: /laundry_system/homepage/homepage.php');
    exit();  
}

// check if user is admin, restrict access based on role.
if ($_SESSION['user_role'] !== 'admin') {
    header('location: /laundry_system/homepage/homepage.php');
    exit();
} 

$user_role = $_SESSION['user_role'];

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Archived Users</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link href="https://cdn.lineicons.com/4.0/lineicons.css" rel="stylesheet" />
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="archive_users.css">
</head>

<body>
    <div class="progress"></div>

    <div class="wrapper">
        <aside id="sidebar">
            <div class="d-flex">
                <button id="toggle-btn" type="button">
                    <i class="bx bx-menu-alt-left"></i>
                </button>

                <div class="sidebar-logo">
                    <a href="/laundry_system/dashboard/dashboard.php">Azia Skye</a>
                </div>
            </div>

            <ul class="sidebar-nav">
                <?php if($user_role === 'admin') : ?>
                    <li class="sidebar-item">
                        <a href="/laundry_system/dashboard/dashboard.php" class="sidebar-link">
                            <i class="lni lni-grid-alt"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>

                    <li class="sidebar-item">
                        <a href="/laundry_system/profile/profile.php" class="sidebar-link">
                            <i class="lni lni-user"></i>
                            <span>Profile</span>
                        </a>
                    </li>

                    <li class="sidebar-item">
                        <a href="/laundry_system/users/users.php" class="sidebar-link">
                            <i class="lni lni-users"></i>
                            <span>Users</span>
                        </a>
                    </li>

                    <li class="sidebar-item">
                        <a href="#" class="sidebar-link has-dropdown collapsed" data-bs-toggle="collapse"
                            data-bs-target="#records" aria-expanded="false" aria-controls="records">
                            <i class="lni lni-files"></i>
                            <span>Records</span>
                        </a>

                        <ul id="records" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            <li class="sidebar-item">
                                <a href="/laundry_system/records/customer.php" class="sidebar-link">Customer</a>
                            </li>

                            <li class="sidebar-item">
                                <a href="/laundry_system/records/service.php" class="sidebar-link">Service</a>
                            </li>

                            <li class="sidebar-item">
                                <a href="/laundry_system/records/category.php" class="sidebar-link">Category</a>
                            </li>
                        </ul>
                    </li>

                    <li class="sidebar-item">
                        <a href="/laundry_system/transaction/transaction.php" class="sidebar-link">
                            <i class="lni lni-coin"></i>
                            <span>Transaction</span>
                        </a>
                    </li>

                    <li class="sidebar-item">
                        <a href="/laundry_system/sales_report/report.php" class="sidebar-link">
                            <i class='bx bx-line-chart'></i>
                            <span>Sales Report</span>
                        </a>
                    </li>

                    <li class="sidebar-item">
                        <a href="/laundry_system/settings/setting.php" class="sidebar-link">
                            <i class="lni lni-cog"></i>
                            <span>Settings</span>
                        </a>
                    </li>

                    <hr style="border: 1px solid #b8c1ec; margin: 8px">

                    <li class="sidebar-item">
                        <a href="/laundry_system/archived/archived.php" class="sidebar-link">
                            <i class='bx bxs-archive-in'></i>
                            <span class="nav-item">Archived</span>
                        </a>
                    </li>
                <?php endif; ?>
            </ul>

            <div class="sidebar-footer">
                <a href="javascript:void(0)" class="sidebar-link" id="btn_logout">
                    <i class="lni lni-exit"></i>
                    <span>Logout</span>
                </a>
            </div>
        </aside>

        <div class="main-content">
            <nav>
                <div class="d-flex justify-content-between align-items-center">
                    <h1>Archived Users</h1>

                    <div class="search_bar" m-1>
                        <input class="form-control" type="text" id="filter_user" placeholder="Search users...">
                    </div>    
                </div>
            </nav>

            <div class="buttons">
                <div class="user_button">
                    <a href="archive_users.php" class="button" id="userBtn"><b>Users</b></a>
                </div>

                <div class="customer_button">
                    <a href="archive_customer.php" class="button" id="customerBtn">Customer</a>
                </div>

                <div class="service_button">
                    <a href="archive_service.php" class="button" id="serviceBtn">Service</a>
                </div>

                <div class="category_button">
                    <a href="archive_category.php" class="button" id="categoryBtn">Category</a>
                </div>
            </div>

            <!-- table -->
            <div class="table-responsive">
                <table class="table table-bordered text-center">
                        <thead>
                            <tr class="bg-dark text-white">
                                <th>Archived ID</th>
                                <th>User ID</th>
                                <th>Username</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>User Role</th>
                                <th>Date Archived</th>
                            </tr>    
                        </thead>    

                        <tbody id = "archive_users_table">
                            <?php
                            $query = "SELECT * FROM archived_users";
                            $result = mysqli_query($conn, $query);

                            if ($result && $result->num_rows > 0) {
                                while ($row = mysqli_fetch_assoc($result)) {
                                ?>    
                                    <tr>
                                        <td><?php echo $row['archive_id']; ?></td>
                                        <td><?php echo $row['user_id']; ?></td>
                                        <td><?php echo $row['username']; ?></td>
                                        <td><?php echo $row['first_name']; ?></td>
                                        <td><?php echo $row['last_name']; ?></td>
                                        <td><?php echo $row['user_role']; ?></td>
                                        <td><?php echo $row['archived_at']; ?></td>
                                    </tr>
                                <?php
                                   }
                            } else {
                            ?>
                        <tr>
                            <td colspan="7">No archived users found.</td>
                        </tr>
                            <?php
                            }
                            ?>
                        </tbody>    
                </table>
            </div> <!-- end of table -->

            <nav aria-label="Page navigation">
                <ul class="pagination justify-content-center" id="pagination">
                    <!--PAGINATION LINK-->
                </ul>
            </nav>

            <div id="logoutModal" class="modal" style="display: none;">
                <div class="modal-cont">
                    <span class="close">&times;</span>
                    <h2>Do you want to logout?</h2>
                    <div class="modal-buttons">
                        <a href="/laundry_system/homepage/logout.php" class="btn btn-yes">Yes</a>
                        <button class="btn btn-no">No</button>
                    </div>
                </div>
            </div>
        </div> <!-- closing tag of main-content -->
    </div> <!-- wrapper -->

</body>

<script type="text/javascript" src="archive_users.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
</html>

<?php
$conn->close();
?>