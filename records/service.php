<?php
include 'connect.php';
session_start();
require_once('service_db.php');

if(!isset($_SESSION['user_role'])) {
    header('location: /laundry_system/homepage/homepage.php');
    exit();
}

$user_role = $_SESSION['user_role'];

if ($_SESSION['user_role'] !== 'admin') {
    header('location: /laundry_system/homepage/homepage.php');
    exit();
} 
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Records - Service</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link href="https://cdn.lineicons.com/4.0/lineicons.css" rel="stylesheet" />
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="service.css">
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

                <?php if ($user_role === 'admin') : ?>
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
                <?php endif; ?>

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

                <?php if ($user_role === 'admin') : ?>
                    <li class="sidebar-item">
                        <a href="/laundry_system/settings/setting.php" class="sidebar-link">
                            <i class="lni lni-cog"></i>
                            <span>Settings</span>
                        </a>
                    </li>

                    <hr style="border: 1px solid #b8c1ec; margin: 8px">

                    <li class="sidebar-item">
                        <a href="#" class="sidebar-link has-dropdown collapsed" data-bs-toggle="collapse"
                        data-bs-target="#archived" aria-expanded="false" aria-controls="archived">
                            <i class='bx bxs-archive-in'></i>
                            <span>Archived</span>
                        </a>

                        <ul id="archived" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            <li class="sidebar-item">
                                <a href="/laundry_system/archived/archive_users.php" class="sidebar-link">Archived Users</a>
                            </li>

                            <li class="sidebar-item">
                                <a href="/laundry_system/archived/archive_customer.php" class="sidebar-link">Archived Customer</a>
                            </li>

                            <li class="sidebar-item">
                                <a href="/laundry_system/archived/archive_service.php" class="sidebar-link">Archived Service</a>
                            </li>

                            <li class="sidebar-item">
                                <a href="/laundry_system/archived/archive_category.php" class="sidebar-link">Archived Category</a>
                            </li>
                        </ul>
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
                    <h1>Records</h1>

                <div class="search_bar" m-1>
                    <input class="form-control" type="text" id="filter_service" placeholder="Search service...">
                </div>   
            </nav>

            <div class="buttons">
                <!-- <form action="customer.php" method="POST" id="cust-btn-form">
                    <div class="customer_button">
                         <button type="button" class="btn-primary" id="customerBtn">Customer</button>
                    </div>
                </form> 

               <form action="service.php" method="POST">
                    <div class="service_button">
                        <button type="button" class="btn-primary" id="serviceBtn">Service</button>
                    </div>
                </form>

                <form action="category.php" method="POST">
                    <div class="category_button">
                        <button type="button" class="btn-primary" id="categoryBtn">Category</button>
                    </div>
                </form> -->
                
                <div class="customer_button">
                    <a href="customer.php" class="button" id="customerBtn">Customer</a>
                </div>
             
                <div class="service_button">
                    <a href="service.php" class="button" id="serviceBtn"><b>Service</b></a>
                </div>

                <div class="category_button">
                    <a href="category.php" class="button" id="categoryBtn">Category</a>
                </div>
            </div> <!-- buttons -->

            <div class="table-responsive">
                <table class="table table-bordered text-center">
                    <thead>
                        <tr class="bg-dark text-white">
                            <th>Service ID</th>
                            <th>Laundry Service Option</th>
                            <th>Archive</th>
                        </tr>
                    </thead>
                    <tbody id = "service_table">
                        <?php
                        $query = "SELECT * FROM service";
                        $result = mysqli_query($con, $query);

                        if ($result && $result->num_rows > 0) {
                            while($row = mysqli_fetch_assoc($result)) {
                        ?>
                            <tr>
                                <td><?php echo $row["service_id"]; ?></td>
                                <td><?php echo $row["laundry_service_option"]; ?></td>
                                <td>
                                    <a href='javascript:void(0);' class='archive-btn'
                                        data-id="<?php echo $row['service_id']; ?>"
                                        data-option="<?php echo $row['laundry_service_option']; ?>">
                                        <i class='bx bxs-archive-in'></i>
                                    </a>
                                </td>
                            </tr>
                        <?php
                            }
                        } else {
                        ?>
                    <tr>
                        <td colspan="3">No laundry service option found.</td>
                    </tr>
                    <?php
                        }
                        ?>
                    </tbody>
                </table>
            </div>

            <div class="add_button d-flex justify-content-center">
                <button type="button" class="btn btn-primary" id="addServiceButton">Add Service</button>
                <i class="lni lni-plus"></i>
            </div>

            <div class="modal" id="addModal" style="display: none;">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1>Add Service</h1>
                            <span class="close">&times;</span>
                        </div>

                        <div class="modal-body">
                            <form method="POST" action="add_service.php" id="form">
                                <div class="form-group">
                                    <h3>Laundry Service</h3>
                                    <input type="text" class="form-control" style="width:117%;" placeholder="Create laundry service option" name="laundry_service_option" required>
                                </div>

                                <button type="submit" class="btn btn-success">Submit</button>
                                <button type="button" class="btn btn-info">Clear</button>
                            </form>    
                        </div>
                    </div> <!-- modal-dialog closing tag -->
                </div> <!-- modal-content closing tag -->
                
            </div> <!-- modal closing tag -->

            <div class="Archvmodal" id="archiveModal">
                <div class="modal-cnt">
                    <span class="close" id="closeArchiveModal">&times;</span>
                    <p>Do you want to archive this laundry service option?</p>
                    <button type="button" id="confirmArchiveButton" class="btn btn-success">YES</button>
                    <button type="button" id="cancelArchiveButton" class="btn btn-danger">NO</button>
                </div>
            </div>

            <div class="Archvmodal" id="successModal">
                <div class="modal-cnt">
                    <span class="close" id="closeSuccessModal">&times;</span>
                    <p>You have successfully archived this laundry service option.</p>
                    <button id="closeSuccessButton" class="btn btn-primary">OK</button>
                </div>
            </div>

            <div id="logoutModal" class="modal" style="display: none;">
                <div class="modal-cont">
                    <span class="close">&times;</span>
                    <h2>Do you want to logout?</h2>
                    <div class="modal-buttons">
                        <a href="/laundry_system/homepage/logout.php" class="btns btn-yes">Yes</a>
                        <button class="btns btn-no">No</button>
                    </div>
                </div>
            </div>

        </div> <!--main content-->
    </div> <!-- wrapper -->

    <script type="text/javascript" src="service.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
</body>

</html>

<?php
$con->close();
?>