<?php
session_start();
require_once('transaction_db.php');

if(!isset($_SESSION['user_role'])) {
    header('location: /laundry_system/homepage/homepage.php');
    exit();
}

$user_role = $_SESSION['user_role'];


$search = "";
if(isset($_POST['search'])) {
    $search = $con->real_escape_string($_POST['search']);
    $query = "SELECT * FROM transaction WHERE customer_name LIKE '%$search%'
    OR laundry_service_option LIKE '%$search%' 
    OR laundry_category_option LIKE '%$search%'";
} else {
    $query = "SELECT * FROM transaction";
}

$result = mysqli_query($con, $query);

if (!$result) {
    die("Query error: " . mysqli_error($con));
}

//table
$data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transaction</title>
    <link rel="stylesheet" href="transactions.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        integrity="SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossorigin="anonymous">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        crossorigin="anonymous">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link href="https://cdn.lineicons.com/4.0/lineicons.css" rel="stylesheet" />
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
                    <a href="#">Azia Skye</a>
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

                <li class="sidebar-item">
                    <a href="/laundry_system/users/user.php" class="sidebar-link">
                        <i class="lni lni-users"></i>
                        <span>Users</span>
                    </a>
                </li>

                <li class="sidebar-item">
                    <a href="/laundry_system/records/customer.php" class="sidebar-link has-dropdown collapsed"
                        data-bs-toggle="collapse" data-bs-target="#records" aria-expanded="false"
                        aria-controls="records">
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
                    <a href="/laundry_system/settings/settings.php" class="sidebar-link">
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
                    <h1>Transaction</h1>

                    <form action="transaction.php" method="POST" class="d-flex">
                        <div class="input-group">
                            <input type="text" name="search" required value="<?php echo htmlspecialchars($search); ?>"
                                class="form-control" placeholder="Search">
                            <button type="submit" class="btn btn-primary"> <i class='bx bx-search'></i> </button>
                        </div>
                    </form>
                </div>
            </nav>

            <div class="table-container">
                <table class="table table-bordered text-center">
                    <thead>
                        <tr class="bg-dark text-white">
                            <th>Transaction ID</th>
                            <th>Customer Name</th>
                            <th>customer_address</th>
                            <th>Laundry Service Option</th>
                            <th>Laundry Category Option</th>
                            <th>Price</th>
                            <th>Weight</th>
                            <th>Laundry Cycle</th>
                            <th>Delivery Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        if (!empty($data)) {
                            foreach ($data as $row) {
                                echo "<tr>";
                                echo "<td data-label='Transaction ID'>" . $row["transaction_id"] . "</td>";
                                echo "<td data-label='Customer Name'>" . $row["customer_name"] . "</td>";
                                echo "<td data-label='Customer Address'>" . $row["customer_address"] . "</td>";
                                echo "<td data-label='Laundry Service Option'>" . $row["laundry_service_option"] . "</td>";
                                echo "<td data-label='Laundry Category Option'>" . $row["laundry_category_option"] . "</td>";
                                echo "<td data-label='Price'>" . $row["price"] . "</td>";
                                echo "<td data-label='Weight'>" . $row["weight"] . "</td>";
                                echo "<td data-label='Laundry Cycle'>" . $row["laundry_cycle"] . "</td>";
                                echo "<td data-label='Delivery Fee'>" . $row["delivery_fee"] . "</td>";
                                echo "</tr>";
                            }
                        } else {
                            echo "<tr><td colspan='15'>No transaction found.</td></tr>";
                        }
                        ?>
                    </tbody>
                </table>
            </div> <!-- 1st table container -->

            <!-- 2nd table container -->
            <div class="table-container">
                <table class="table table-bordered text-center">
                    <thead>
                        <tr class="bg-dark text-white">
                            <th>Transaction ID</th>
                            <th>Rush Fee</th>
                            <th>Total Amount</th>
                            <th>Amount Tendered</tH>
                            <th>Change</th>
                            <th>Order Status</th>
                            <th>Transaction Date</th>
                            <th>Request Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        // should be the same $data array 
                        if (!empty($data)) {
                            foreach ($data as $row) {
                                echo "<tr>";
                                echo "<td data-label='Transaction ID'>" . $row["transaction_id"] . "</td>";
                                echo "<td data-label='Rush Fee'>" . $row["rush_fee"] . "</td>";
                                echo "<td data-label='Total Amount'>" . $row["total_amount"] . "</td>";
                                echo "<td data-label='Amount Tendered'>" . $row["amount_tendered"] . "</td>";
                                echo "<td data-label='Change'>" . $row["money_change"] . "</td>";
                                echo "<td data-label='Order Status'>" . $row["order_status"] . "</td>";
                                echo "<td data-label='Transaction Date'>" . $row["transaction_date"] . "</td>";
                                echo "<td data-label='Request Date'>" . $row["request_date"] . "</td>";
                                echo "<td data-label='Actions'>
                                <a href='javascript:void(0);' class='archive-btn' 
                                  data-id='" . $row['transaction_id'] . "' 
                                  data-name='" . $row['customer_name'] . "'
                                  data-service='" . $row['laundry_service_option'] . "'
                                  data-category='" . $row['laundry_category_option'] . "'
                                  data-price='" . $row['price'] . "'
                                  data-weight='" . $row['weight'] . "'
                                  data-cycle='" . $row['laundry_cycle'] . "'
                                  data-delivery='" . $row['delivery_fee'] . "'
                                  data-rush='" . $row['rush_fee'] . "'
                                  data-amount='" . $row['total_amount'] . "'
                                  data-change='" . $row['money_change'] . "'
                                  data-status='" . $row['order_status'] . "'
                                  data-transactiondate='" . $row['transaction_date'] . "'
                                  data-requestdate='" . $row['request_date'] . "'>
                                   <i class='bx bxs-archive-in'></i>
                                </a>
                            </td>";
                                echo "</tr>";
                            }
                        } else {
                            echo "<tr><td colspan='15'>No transaction found.</td></tr>";
                        }
                        ?>
                    </tbody>
                </table>
            </div> <!-- 2nd table container -->

            <div class="Archvmodal" id="archiveModal">
                <div class="modal-cnt">
                    <span class="close" id="closeArchiveModal">&times;</span>
                    <p>Do you want to archive this customer?</p>
                    <button type="button" id="confirmArchiveButton" class="btn btn-success">Yes</button>
                    <button type="button" id="cancelArchiveButton" class="btn btn-danger">No</button>
                </div>
            </div>

            <div class="Archvmodal" id="successModal">
                <div class="modal-cnt">
                    <span class="close" id="closeSuccessModal">&times;</span>
                    <p>You have successfully archived this customer's details.</p>
                    <button id="closeSuccessButton" class="btn btn-primary">OK</button>
                </div>
            </div>

        </div> <!-- closing tag of main content -->
    </div> <!-- closing tag of wrapper -->
</body>

<script type="text/javascript" src="transactions.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>

</html>

<?php
$con->close();
?>